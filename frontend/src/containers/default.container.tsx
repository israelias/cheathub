import React from 'react';

import { Flex, Box, useMediaQuery } from '@chakra-ui/react';

import { Copyright } from '../components/shared/copyright';

import { Secondary } from './secondary.container';
import { Primary } from './primary.container';

import {
  PrimaryHeader,
  SecondaryHeader,
  PrimaryFooter,
  SecondaryFooter,
} from '../components/shared/particulars';

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
  secondaryFooterSubheading?: string | React.ReactNode;
  modals?: React.ReactNode;
  drawers?: React.ReactNode;
  pagination?: React.ReactNode;
  search?: React.ReactNode;
  preSecondaryChildren?: React.ReactNode;
  postSecondaryChildren?: React.ReactNode;
  icon?: React.ReactNode;
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
  secondaryFooterSubheading = <Copyright />,
  preSecondaryChildren,
  postSecondaryChildren,
  modals,
  drawers,
  pagination,
  search,
  icon,
}) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  return (
    <>
      <Secondary>
        <Flex
          overflow={['hidden auto']}
          css={{
            '&::-webkit-scrollbar': {
              width: '0px',
            },
            '&::-webkit-scrollbar-track': {
              width: '0px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#252945',
              borderRadius: '0px',
            },
          }}
          flexDirection="column"
          p={0}
          m={0}
        >
          <SecondaryHeader icon={icon} heading={secondaryHeading}>
            {secondaryChildren}
          </SecondaryHeader>
          {preSecondaryChildren}
          <Box>{secondary}</Box>
          {postSecondaryChildren}
          <PrimaryFooter
            heading={secondaryFooterHeading}
            subheading={secondaryFooterSubheading}
          />
        </Flex>
      </Secondary>
      <Primary>
        {search && !baseLg ? (
          search
        ) : (
          <PrimaryHeader heading={primaryHeading}>
            {primaryChildren}
          </PrimaryHeader>
        )}

        <Box
          display="flex"
          flexDirection="column"
          mt="atuo"
          mb="auto"
        >
          {baseLg ? (
            <Box
              p={{
                base: '10px 10px 0px 10px',
                lg: '10px 0px 0px 0px',
                width: '100%',
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
        </Box>
        <Box height="100%"> </Box>

        {pagination && (
          <Box
            position="sticky"
            width="100%"
            // mt="auto"
            mt="80vh"
            bottom={0}
          >
            <SecondaryFooter>{pagination}</SecondaryFooter>
          </Box>
        )}
      </Primary>

      {modals}
      {drawers}
    </>
  );
};

export default Page;
