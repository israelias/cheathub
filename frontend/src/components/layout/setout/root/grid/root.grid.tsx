import React from 'react';
import { Grid } from '@chakra-ui/react';

/**
 * Grid setout for 'titlebar', `main` grid template areas.
 * Switches to `navigation main` from `lg` up.
 *
 * Parent of all content.
 *
 * @since 4.21.21
 * @example
 * // children
 *  // All content residing in `navigation` template area
 * <NavigationArea>
 *   // All content residing in `navigation` template area
 *   <Actions />
 * </NavigationArea>
 * <TitleBarArea>
 *    // All content residing in `titlebar` template area
 *   <Navbar />
 * </TitleBarArea>;
 * <MainArea>
 *    // All content residing in `main` template area
 *    // a.k.a the entire main sub grid
 *   <MainGrid>
 *    <SecondaryArea>
 *      <SideNav>
 *         <Collections />
 *       </SideNav>
 *    </SecondaryArea>
 *    <PrimaryArea>
 *       <Content>{children}</Content>
 *    </PrimaryArea>
 *    </MainGrid>
 * </MainArea>
 */

const RootGrid: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Grid
      display="grid"
      gridTemplateColumns={{ base: '1fr', lg: '72px 1fr' }}
      templateAreas={{
        base: `'titlebar' 'main'`,
        lg: `'navigation main'`,
      }}
      gridTemplateRows={{ base: '62px 1fr', lg: 'unset' }}
      width="100%"
    >
      {children}
    </Grid>
  </>
);
export default RootGrid;
