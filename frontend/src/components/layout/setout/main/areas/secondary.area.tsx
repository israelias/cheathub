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

const SecondaryArea: React.FC<LayoutProps> = ({ children }) => (
  <>
    <GridItem
      id="side-nav"
      height={{ base: 'calc(100vh - 62px)', lg: '100vh' }}
      display={{ base: 'none', lg: 'grid' }}
      overflow={['hidden auto']}
      position="sticky"
      top="0px"
      pb="48px"
      gridArea={['secondary']}
      bg="papayawhip"
    >
      {children}
    </GridItem>
  </>
);

export default SecondaryArea;
