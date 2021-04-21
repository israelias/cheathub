import React from 'react';
import { GridItem } from '@chakra-ui/react';
/**
 * Layout for 'main' grid template area.
 * Parent of main sub grid.
 *
 * @since 2021-04-21
 * @example
 * <MainArea>
 *  <AnotherGrid
 *    // ... Component sub-grid that sets out main content
 *    // Micro/Per-section layout adjustments occur further down this tree.
 *   />
 * </MainArea>
 */
const MainArea: React.FC<LayoutProps> = ({ children }) => (
  <GridItem
    // MAIN.AREA
    id="main-content"
    gridArea={['main']}
    height="100%"
    maxHeight={{ base: 'calc(100vh - 62px)', lg: '100vh' }}
    overflow={['hidden auto']}
    display="grid"
  >
    {children}
  </GridItem>
);

export default MainArea;
