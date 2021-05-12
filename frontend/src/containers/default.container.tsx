/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */

import React from 'react';
import { useHistory } from 'react-router';
import {
  Flex,
  Box,
  useMediaQuery,
  HStack,
  useDisclosure,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { Secondary } from './secondary.container';
import { Primary } from './primary.container';

import SearchBar from '../components/search/search-bar';
import SearchBox from '../components/search/search-box';

import { useUserContext } from '../context/user.context';
import { useAppData } from '../context/appdata.context';
import { useDataHandler } from '../context/datahandler.context';
import { SidePanel } from '../components/shared/drawer';
import { BrandButton } from '../components/shared/brand-button';
import {
  PrimaryHeader,
  SecondaryHeader,
  PrimaryFooter,
  SecondaryFooter,
} from '../components/shared/particulars';
import SnippetCard from '../components/snippet/card';

const Page: React.FC<{
  primary: React.ReactNode;
  primaryHeading?: string;
  primaryChildren?: React.ReactNode;
  primaryFooterHeading?: string;
  primaryFooterSubheading?: string;
  secondary: React.ReactNode;
  secondaryHeading?: string;
  secondaryChildren?: React.ReactNode;
  secondaryFooterHeading?: string;
  secondaryFooterSubheading?: string;
  modals?: React.ReactNode;
  drawers?: React.ReactNode;
}> = ({
  primary,
  primaryHeading = 'CheatHub',
  primaryChildren,
  primaryFooterHeading,
  primaryFooterSubheading = 'CH 2021',
  secondary,
  secondaryHeading,
  secondaryChildren,
  secondaryFooterHeading,
  secondaryFooterSubheading = 'CH 2021',
  modals,
  drawers,
}) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sidePanelRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <Secondary>
        <Flex
          // bg={mode('#fff', '#141625')}
          // borderColor={mode('rgb(235, 236, 237)', '#252945')}
          flexDirection="column"
          p={0}
          m={0}
        >
          <SecondaryHeader heading={secondaryHeading}>
            {secondaryChildren}
          </SecondaryHeader>

          <Box>{secondary}</Box>

          <PrimaryFooter
            heading={secondaryFooterHeading}
            subheading={secondaryFooterSubheading}
          />
        </Flex>
      </Secondary>

      <Primary>
        <PrimaryHeader heading={primaryHeading}>
          {primaryChildren}
        </PrimaryHeader>
        {baseLg ? (
          <Box
            p={{
              base: '10px 10px 0px 10px',
              lg: '10px 0px 0px 0px',
            }}
          >
            {primary}
          </Box>
        ) : (
          <Box
            p={{
              base: '10px 10px 0px 10px',
              lg: '10px 0px 0px 0px',
            }}
          >
            {secondary}
          </Box>
        )}

        {!baseLg && (
          <Box
            p={{
              base: '10px 10px 0px 10px',
              lg: '10px 0px 0px 0px',
            }}
          >
            {primary}
          </Box>
        )}

        <Flex>
          <Box height="100%"> </Box>
          <Box width="100%" mt="auto" position="sticky" bottom={0}>
            {' '}
            <PrimaryFooter
              heading={primaryFooterHeading}
              subheading={primaryFooterSubheading}
            />
            <SecondaryFooter>
              <BrandButton>Previous</BrandButton>
              <BrandButton>Next</BrandButton>
            </SecondaryFooter>
          </Box>
        </Flex>
      </Primary>
      {modals}
      {drawers}
    </>
  );
};

export default Page;
