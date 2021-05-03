import React from 'react';
import {
  GridItem,
  useColorModeValue as mode,
} from '@chakra-ui/react';

/**
 * Layout for 'navigation' grid template area.
 * Parent of Actions
 *
 * @see Actions
 * @since 4.21.21
 * @template T
 * @param {T} children - A generic parameter that flows through to the return type
 * @return {T}
 * @example
 * <NavigationArea>
 *  <!-- childen is a navigational component with speed dial actions -->
 * </NavigationArea>
 */

const NavigationArea: React.FC<LayoutProps> = ({ children }) => (
  <>
    <GridItem
      as="nav"
      gridArea={['navigation']}
      position={{ base: 'fixed', lg: 'sticky' }}
      display={{ base: 'none', lg: 'inherit' }}
      overflow={['hidden auto']}
      height="100vh"
      width={{ base: '100%', lg: '72px' }}
      zIndex={{ base: 9997, lg: 'unset' }}
      bg={mode('#fff', '#141625')}
      top={0}
    >
      {children}
    </GridItem>
  </>
);

export default NavigationArea;
