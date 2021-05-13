import React from 'react';
import {
  GridItem,
  useColorModeValue as mode,
} from '@chakra-ui/react';

/**
 * Grid layout for 'secondary'grid template area.
 * Parent of all content/nodes in secondary panel i.e. `Collections` section.
 *
 * @see SideNav
 * @since 4.21.21
 * @example 
 * // children
 *   <SideNav>
        <Collections />
      </SideNav>
 */

const SecondaryArea: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    <GridItem
      id="main-secondary"
      as="section"
      height={{ base: 'calc(100vh - 62px)', lg: '100vh' }}
      display={{ base: 'none', lg: 'grid' }}
      overflow={['hidden auto']}
      position="sticky"
      top="0px"
      borderLeft={mode('1px solid #ff5470', '1px solid #252945')}
      borderRight={mode('1px solid #ff5470', '1px solid #252945')}
      borderColor={mode('#d8d9da', '#252945')}
      bg={mode('#f6f6f6', '#0b0914')}
      pr={0}
      pl={0}
      gridArea={['secondary']}
      css={{
        '&::-webkit-scrollbar': {
          width: '0px',
        },
        '&::-webkit-scrollbar-track': {
          width: '0px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#252945',
          borderRadius: '0px',
        },
      }}
    >
      {children}
    </GridItem>
  </>
);

export default SecondaryArea;
