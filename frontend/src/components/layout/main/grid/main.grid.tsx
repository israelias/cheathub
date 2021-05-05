import React from 'react';
import { Grid } from '@chakra-ui/react';

/**
 * Grid setout for 'primary' and 'secondary' grid template areas.
 * Parent of primary and secondary layouts
 *
 * @since 4.21.21
 * @example
 * // children
 *
 * <SecondaryArea
 *  children={
 *    <SideNav
 *      children={
 *        <Collections />
 *        }
 *      />
 *    }
 *  />
 * <PrimaryArea
 *  children={
 *    <Content
 *      children={
 *        <SubNav />
 *        <SearchBar />
 *        }
 *      />
 *    }
 * />
 */

const MainGrid: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    <Grid
      templateAreas={[`'secondary primary'`]}
      gridTemplateColumns={{
        base: '1fr',
        lg: 'minmax(200px, 400px) minmax(400px, 968px)',
      }}
      gridTemplateRows={{ base: '1fr', lg: '100%' }}
      gap={{ base: '0px', lg: '24px' }}
      maxWidth={{ base: '100%', lg: '1392px' }}
      minWidth={{ base: '100%' }}
      margin={['0px 24px']}
      justifySelf="center"
    >
      {children}
    </Grid>
  </>
);

export default MainGrid;
