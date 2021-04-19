/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import {
  VStack,
  HTMLChakraProps,
  Box,
  chakra,
} from '@chakra-ui/react';
import {
  RouteComponentProps,
  Link as RouterLink,
} from 'react-router-dom';

import {
  motion,
  AnimateSharedLayout,
  HTMLMotionProps,
} from 'framer-motion';

type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<
  HTMLChakraProps<'div'>,
  HTMLMotionProps<'div'>
>;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);
/**
 * This is an example of animating between different components in Framer Motion 2.
 *
 * By wrapping a tree with AnimateSharedLayout, children can be given a layoutId.
 *
 * When a component with a layoutId is removed and a new one with the same layoutId
 * is added elsewhere, the new component will animate from the old one.
 *
 * The outline being animated here is four different components, animated like one.
 */

const colors = ['#d4825c', '#d67968', '#aa647c', '#786e89'];

const Actions = () => {
  const [selected, setSelected] = useState(colors[0]);

  return (
    <AnimateSharedLayout>
      <VStack as="ul" listStyleType="none" margin={0} padding={0}>
        {colors.map((color) => (
          <Box
            as="li"
            display="block"
            key={color}
            onClick={() => setSelected(color)}
            style={{ backgroundColor: color }}
            width="43px"
            height="43px"
            borderRadius="0"
            margin="16px"
            position="relative"
            cursor="pointer"
            flexShrink={0}
          >
            {selected === color && (
              <MotionBox
                layoutId="outline"
                initial={false}
                animate={{ borderColor: color }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
                position="absolute"
                top="-6px"
                left="-6px"
                right="-6px"
                bottom="-6px"
                border={['1px solid']}
                borderColor="#fff"
                borderRadius="0%"
              />
            )}
          </Box>
        ))}
      </VStack>
    </AnimateSharedLayout>
  );
};

export default Actions;

const colorsi = {
  background: '#dcd9c8',
  text: '#363e53',
  custom: [
    '#d4825c',
    '#d67968',
    '#b76b5e',
    '#d17487',
    '#aa647c',
    '#a26c8e',
    '#786e89',
  ],
};

//  <Widget
//    key={color}
//    color={color}
//    isSelected={selected === color}
//    onClick={() => setColor(color)}
//  />;

// .item2 {
//   display: block;
//   width: 43px;
//   height: 43px;
//   border-radius: 0%;
//   margin: 16px;
//   position: relative;
//   cursor: pointer;
//   flex-shrink: 0;
// }

// .outline {
//   position: absolute;
//   top: -6px;
//   left: -6px;
//   right: -6px;
//   bottom: -6px;
//   border: 1px solid white;
//   border-radius: 0%;
// }
