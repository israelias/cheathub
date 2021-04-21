import { FC, useEffect } from 'react';
import {
  motion,
  HTMLMotionProps,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import styled from 'styled-components';
// https://codesandbox.io/s/framer-motion-resize-panel-zs9tp?file=/src/App.tsx
// border-${({ side }) => ((side === 'left') ? ('right'): ('left'))}: 1px solid rgba(0,0,0,.1);

const PanelContainer = styled(motion.div)<{
  min: number;
  side?: 'left' | 'right';
}>`
  position: fixed;
  padding: 16px;
  top: 0px;
  ${({ side }) => side}: 0px;
  width: ${({ min }) => min}px;
  height: 100%;
  min-height: 100vh;
  background-color: #efefef;
  overflow: hidden;
`;

const DragHandle = styled(motion.div)<{
  min: number;
  side: 'left' | 'right';
}>`
  position: fixed;
  top: 0;
  ${({ min, side }) => `${side}: ${min - 3}px`};
  height: 100%;
  width: 5px;
  cursor: col-resize;
  background-color: transparent;
  transition: background-color 0.1;
`;

type Props = HTMLMotionProps<'div'> & {
  min?: number;
  max?: number;
  side?: 'left' | 'right';
};

const Panel: FC<Props> = ({
  children,
  style,
  min = 280,
  max = 420,
  side = 'left',
  ...props
}) => {
  // A motion value for the handles x-axis offset
  const mvOffset = useMotionValue(0);

  // A motion value for the width of the panel, based on the offset value
  const mvWidth = useTransform(mvOffset, (v) =>
    side === 'left' ? v + min : min - v
  );

  function startResizing() {
    // Set the global cursor
    document.body.style.cursor = 'col-resize';
  }

  function stopResizing() {
    // Reset the cursor
    document.body.style.cursor = 'default';

    // Save to local storage—be sure to save a clamped value!
    const offset = Math.max(
      0,
      Math.min(max - min, mvOffset.get())
    );
    localStorage.setItem(
      `${side}_sidebar_offset`,
      JSON.stringify({ offset })
    );
  }

  // On first mount, load a saved offset (if we have one)
  useEffect(() => {
    const saved = localStorage.getItem(
      `${side}_sidebar_offset`
    );
    if (saved !== null) {
      mvOffset.set(JSON.parse(saved).offset);
    }
  }, [side, mvOffset]);

  return (
    <PanelContainer
      side={side}
      min={min}
      style={{ width: mvWidth, ...style }}
      {...props}
    >
      {children}
      <DragHandle
        min={min}
        side={side}
        style={{ x: mvOffset }}
        drag="x"
        dragElastic={0.025}
        dragConstraints={{
          left: side === 'left' ? 0 : min - max,
          right: side === 'left' ? max - min : 0,
        }}
        dragMomentum={false}
        variants={{
          active: {
            backgroundColor: 'rgba(0,0,0,.2)',
          },
        }}
        whileTap="active"
        whileHover="active"
        onPointerDown={startResizing}
        onPointerUp={stopResizing}
        onPanEnd={stopResizing}
        onTap={stopResizing}
      />
    </PanelContainer>
  );
};

export default Panel;
