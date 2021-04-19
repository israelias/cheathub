import React from 'react';
import {
  SimpleGrid,
  Grid,
  GridItem,
  Box,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { Content } from './main';
import { SideNav } from './side';
import Navbar from '../navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const wtf = 'wtf';
  return (
    <>
      <Grid
        display="grid"
        templateColumns={{ base: '1fr', lg: '72px 1fr' }}
        templateAreas={{
          base: `'titlebar' 'main'`,
          lg: `'navigation' 'main'`,
        }}
        templateRows={{ base: '62px 1fr', lg: 'unset' }}
        width="100%"
      >
        <GridItem
          templateArea={['navigation']}
          position={{ base: 'fixed', lg: 'sticky' }}
          display={{ base: 'none', lg: 'inherit' }}
          overflow={['hidden auto']}
          height="100vh"
          width={{ base: '100%', lg: '72px' }}
          zIndex={{ base: 9997, lg: 'unset' }}
          bg="pink"
          top={0}
        >
          header nav
        </GridItem>

        <GridItem
          templateArea={['titlebar']}
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
          <Navbar />
        </GridItem>

        <GridItem
          templateArea={['main']}
          height="100%"
          maxHeight={{ base: 'calc(100vh - 62px)', lg: '100vh' }}
          overflow={['hidden auto']}
          display="grid"
        >
          <Grid
            templateAreas={[`'secondary primary'`]}
            templateColumns={{
              base: '1fr',
              lg: 'minmax(320px, 400px) minmax(600px, 968px)',
            }}
            templateRows={{ base: '1fr', lg: '100%' }}
            gap={{ base: '0px', lg: '24px' }}
            maxWidth={{ base: '100%', lg: '1392px' }}
            minWidth={{ base: '100%' }}
            margin={['0px 24px']}
            justifySelf="center"
          >
            <GridItem
              // as="section"
              height={{ base: 'calc(100vh - 62px)', lg: '100vh' }}
              display={{ base: 'none', lg: 'grid' }}
              overflow={['hidden auto']}
              position="sticky"
              top="0px"
              pb="48px"
              templateArea={['secondary']}
              bg="papayawhip"
            >
              <SideNav>
                {' '}
                dafafasfasf dafafasfasf
                dafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasf
                dafafasfasf dafafasfasf
                dafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasf
                dafafasfasf dafafasfasf
                dafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasf
                dafafasfasf dafafasfasf
                dafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasf
                dafafasfasf dafafasfasf
                dafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasfdafafasfasf
              </SideNav>
            </GridItem>

            <GridItem
              templateArea={['primary']}
              templateRows={['1fr']}
              maxWidth={{ base: '100vw', lg: '968px' }}
              height={{ base: 'calc(100vh - 62px)', lg: '100%' }}
              borderColor={['rgb(235, 236, 237)']}
              borderLeft={{
                base: '0px',
                lg: '1px solid rgb(235, 236, 237)',
              }}
              borderRight={{
                base: '0px',
                lg: '1px solid rgb(235, 236, 237)',
              }}
              borderBottom={{ base: '0px', lg: '1px solid' }}
              borderRadius={['0px 0px 4px 4px']}
              gridColumnStart={{ base: '1', lg: 'unset' }}
            >
              <Content>{children}</Content>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
};
export default Layout;
