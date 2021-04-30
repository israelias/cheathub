import React from 'react';
import {
  Grid,
  GridItem,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { Content } from '../connectors/main';
import { SideNav } from '../connectors/side';
import Navbar from '../components/navigation/navbar';
// import Collections from '../components/collections';
import Actions from '../components/navigation/actions';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const wtf = 'wtf';
  return (
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
        <GridItem
          // NAVIGATION.AREA
          gridArea={['navigation']}
          position={{ base: 'fixed', lg: 'sticky' }}
          display={{ base: 'none', lg: 'inherit' }}
          overflow={['hidden auto']}
          height="100vh"
          width={{ base: '100%', lg: '72px' }}
          zIndex={{ base: 9997, lg: 'unset' }}
          bg="#fff"
          top={0}
        >
          <Actions />
        </GridItem>

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
          <Navbar />
        </GridItem>

        <GridItem
          // MAIN.AREA
          id="main-content"
          gridArea={['main']}
          height="100%"
          maxHeight={{ base: 'calc(100vh - 62px)', lg: '100vh' }}
          overflow={['hidden auto']}
          display="grid"
        >
          <Grid
            // MAINGRID.LAYOUT
            id="main-secondary"
            templateAreas={[`'secondary primary'`]}
            gridTemplateColumns={{
              base: '1fr',
              lg: 'minmax(320px, 400px) minmax(600px, 968px)',
            }}
            gridTemplateRows={{ base: '1fr', lg: '100%' }}
            gap={{ base: '0px', lg: '24px' }}
            maxWidth={{ base: '100%', lg: '1392px' }}
            minWidth={{ base: '100%' }}
            margin={['0px 24px']}
            justifySelf="center"
          >
            <GridItem
              // SECONDARY.AREA
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
              <SideNav>{/* <Collections /> */}</SideNav>
            </GridItem>

            <GridItem
              // PRIMARY.AREA
              id="main-primary"
              gridArea={['primary']}
              gridTemplateRows={['1fr']}
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
