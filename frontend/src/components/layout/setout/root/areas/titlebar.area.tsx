import React from 'react';
import {
  GridItem,
  useColorModeValue as mode,
} from '@chakra-ui/react';

/**
 * Layout for 'titlebar' grid template area.
 * Parent of Navbar
 *
 * @see Navbar
 * @since 4.21.21
 */

const TitleBarArea: React.FC<LayoutProps> = ({ children }) => (
  <>
    <GridItem
      // TITLEBAR.AREAS
      id="main-header"
      gridArea={['titlebar']}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      zIndex={9996}
      pr="16px"
      pl="8px"
      display={{ base: 'flex', lg: 'none' }}
      flex={['0 0 auto']}
      height="62px"
      maxHeight="62px"
      bg={mode('aquamarine', 'white')}
    >
      {children}
    </GridItem>
  </>
);

export default TitleBarArea;
