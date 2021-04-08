import React from 'react';
import { Box, Text, Link, VStack, Code, Grid } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../components/actions/ColorModeSwitcher';
import { Logo } from '../components/actions/Logo';
import { LoggedinHeader } from '../components/shared/header';
import NavBar from '../containers/NavBar';

function Test() {
  return (
    <Box textAlign="center" fontSize="xl">
      <NavBar />
      <LoggedinHeader loggedIn={true} username="joem" />
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
          </Text>

          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack>
      </Grid>
    </Box>
  );
}

export default Test;
