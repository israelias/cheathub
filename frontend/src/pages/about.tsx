import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Image,
  Link,
  SpaceProps,
  HStack,
  Tag,
  Center,
  Flex,
  Stack,
  Button,
  Avatar,
  Icon,
  useColorModeValue as mode,
  useMediaQuery,
} from '@chakra-ui/react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconType } from 'react-icons';
import {
  GoMarkGithub as GithubIcon,
  GoRepoForked as CollaborateIcon,
} from 'react-icons/go';
import {
  FaPatreon as PatreonIcon,
  FaLinkedin as LinkedinIcon,
  FaWpforms as FormIcon,
} from 'react-icons/fa';

import {
  MotionBar,
  MotionSection,
} from '../components/shared/motion';

import { Logo } from '../components/shared/logo';

import Page from '../containers/default.container';

/**
 * The main card component that represents all items in a Snippet article.
 *
 * TODO organize components
 * @file defines the About page and elements within About page.
 * @date 2021-08-31
 */

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

interface BlogAuthorProps {
  date: Date;
  name: string;
}

interface AboutProps extends RouteComponentProps<{ id: string }> {}

/**
 * Frontend public endpoint that represents the About route.
 *
 * @file defines the secure '/about' path
 * @since 2021-08-31
 * @return {=>}
 */
const About: React.FC<AboutProps> = ({ match }) => {
  const [baseXs, baseSm, baseMd, baseLg] = useMediaQuery([
    '(max-width: 28em)',
    '(min-width: 30em)',
    '(min-width: 58em)',
    '(min-width: 62em)',
  ]);
  const primary = <AboutSummary />;

  const secondary = (
    <>
      <Wrap marginTop="5">
        <WrapItem
          p={['10px']}
          w="100%"
          width={{ base: '100%', sm: '100%', md: '45%', lg: '100%' }}
        >
          <ProfileCard />
        </WrapItem>
        <WrapItem
          width={{ base: '100%', sm: '100%', md: '45%', lg: '100%' }}
        >
          {baseSm && <BlogPost />}
        </WrapItem>
      </Wrap>
    </>
  );

  const icon = <Logo />;

  const preSecondaryChildren = (
    <Box p="10px" fontSize="xs" fontWeight="light">
      <Box> </Box>
    </Box>
  );

  const primaryChildren = (
    <Box p="10px" fontSize="sm" fontWeight="light">
      <Box as="h2">
        All about sharing our cheat sheets (and scaing this app).
      </Box>
    </Box>
  );

  const primaryHeading = 'About (beta)';

  return (
    <Page
      // icon={icon}
      primary={primary}
      preSecondaryChildren={preSecondaryChildren}
      secondary={secondary}
      secondaryHeading="About (beta)"
      primaryHeading={primaryHeading}
      primaryChildren={primaryChildren}
    />
  );
};

export default About;

/**
 * Frontend component that defines a beta Blogpost.
 *
 * @tutorial https://chakra-templates.dev
 * @since 2021-08-31
 */
const BlogPost: React.FC = () => (
  <Box p={['10px']} w="100%">
    <Box borderRadius="lg" overflow="hidden">
      <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
        <Image
          transform="scale(1.0)"
          src="https://github.com/israelias/cheathub/blob/master/public/screenshots._collection_add_web.png?raw=true"
          alt="some text"
          objectFit="contain"
          width="100%"
          transition="0.3s ease-in-out"
          _hover={{
            transform: 'scale(1.05)',
          }}
        />
      </Link>
    </Box>
    <BlogTags
      tags={['react-relect', 'select input', 'collection']}
      marginTop="3"
    />
    <Heading fontSize="xl" marginTop="2">
      <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
        New Demo Images in Docs
      </Link>
    </Heading>
    <Text as="p" fontSize="md" marginTop="2">
      We recently added demo gifs to the repo to better loop through
      our user testing.
    </Text>
    <Text as="p" fontSize="md" marginTop="2">
      Bugs that prevented an empty collection (no snippets) from being
      created is now fixed.
    </Text>
    <BlogAuthor
      name="Joem Elias Sanez"
      date={new Date('2021-08-31T19:01:27Z')}
    />
  </Box>
);

/**
 * Frontend component that defines a beta blog taglist.
 *
 * @tutorial https://chakra-templates.dev
 * @since 2021-08-31
 */
const BlogTags: React.FC<IBlogTags> = (props) => (
  <HStack spacing={2} marginTop={props.marginTop}>
    {props.tags.map((tag) => (
      <Tag
        size="md"
        variant="solid"
        color={mode('#fff', '#141625')}
        bg={mode('#9992b6', '#b6b1cb')}
        key={tag}
      >
        {tag}
      </Tag>
    ))}
  </HStack>
);

/**
 * Frontend component that defines a beta blog author footer.
 *
 * @tutorial https://chakra-templates.dev
 * @since 2021-08-31
 */
export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => (
  <HStack
    marginTop="2"
    spacing="2"
    display="flex"
    alignItems="center"
  >
    <Image
      borderRadius="full"
      boxSize="40px"
      src="https://github.com/israelias/resume-redux/blob/master/assets/images/joem_elias_sanez_thumbnail.png?raw=true"
      alt={`Avatar of ${props.name}`}
    />
    <Text fontWeight="medium">{props.name}</Text>
    <Text>—</Text>
    <Text>{props.date.toLocaleDateString()}</Text>
  </HStack>
);

/**
 * Frontend component that defines a beta user profile card.
 *
 * @tutorial https://chakra-templates.dev
 * @since 2021-08-31
 */
export function ProfileCard() {
  return (
    <AnimatePresence exitBeforeEnter>
      <MotionBar
        width="100%"
        bg={mode('#fff', '#141625')}
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 1, height: 'auto' },
          collapsed: { opacity: 0, height: '0' },
        }}
        transition={{
          duration: 0.5,
          ease: [0.04, 0.62, 0.23, 0.98],
        }}
        positionTransition
        rounded="md"
        overflow="hidden"
        borderWidth="1px"
        borderRadius="10px"
        padding={['10px']}
        border={['1px solid']}
        borderColor={mode('#bbb', '#7e88c3')}
      >
        <Image
          borderRadius={['10px 10px 0 0']}
          bg={mode('#f6f6f6', '#252945')}
          h="120px"
          w="full"
          src="https://github.com/israelias/cheathub/blob/master/public/featurescreanshot.png?raw=true"
          objectFit="cover"
        />
        <Flex justify="center" mt={-12}>
          <Avatar
            transform="scale(1.0)"
            transition="0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
            }}
            objectFit="contain"
            size="xl"
            src="https://github.com/israelias/resume-redux/blob/master/assets/images/joem_elias_sanez_thumbnail.png?raw=true"
            alt="Author"
            css={{
              border: '1px solid',
              borderColor: mode('#9992b6', '#b6b1cb'),
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align="center" mb={5}>
            <Heading
              fontSize="2xl"
              fontWeight={500}
              fontFamily="body"
            >
              Joem Elias Sanez
            </Heading>
            <Text color="gray.500">
              Architect & Full Stack Developer
            </Text>
          </Stack>

          <Stack direction="row" justify="center" spacing={6}>
            <Stack spacing={0} align="center">
              <Text fontWeight={600}>125</Text>
              <Text fontSize="sm" color="gray.500">
                Snippets
              </Text>
            </Stack>
            <Stack spacing={0} align="center">
              <Text fontWeight={600}>43</Text>
              <Text fontSize="sm" color="gray.500">
                Collections
              </Text>
            </Stack>
          </Stack>

          <Button
            w="full"
            mt={8}
            bg={mode('#151f21', 'gray.900')}
            color="white"
            rounded="md"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={() =>
              window.open('https://patreon.com/israelias')
            }
          >
            Support the Project
          </Button>
        </Box>

        <Box py="10px">
          <LinkItem
            text="Follow me"
            subtext="GitHub"
            url="https://github.com/israelias"
            icon={() => <GithubIcon />}
          />
          <LinkItem
            text="Add me"
            subtext="LinkedIn"
            url="https://www.linkedin.com/in/joem-elias-sanez/"
            icon={() => <LinkedinIcon />}
          />
          <LinkItem
            text="Contribute to the project"
            subtext="Patreon"
            url="https://patreon.com/israelias"
            icon={() => <PatreonIcon />}
          />
          <LinkItem
            text="Collaborate on the app"
            subtext="Repo"
            url="https://github.com/israelias/cheathub/blob/master/CONTRIBUTING.md"
            icon={() => <CollaborateIcon />}
          />
          <LinkItem
            text="Send feedback anonymously"
            subtext="Typeform"
            url="https://gvklqnr2996.typeform.com/to/xVAAK1V0"
            icon={() => <FormIcon />}
          />
        </Box>
      </MotionBar>
    </AnimatePresence>
  );
}

/**
 * Frontend component that defines external links in a profile card.
 *
 * @tutorial https://chakra-templates.dev
 * @since 2021-08-31
 */
export function LinkItem({
  text,
  icon,
  url,
  subtext,
}: {
  text: string;
  icon: IconType;
  url: string;
  subtext: string;
}) {
  return (
    <Flex
      as="header"
      height="50px"
      borderRadius="6px"
      alignItems="center"
      padding="10px"
      fontSize="md"
      justifyContent="space-between"
      _hover={{
        bg: mode('#f6f6f6', '#252945'),
      }}
      bg={mode('#fff', '#141625')}
      onClick={() => {
        window.open(url);
      }}
    >
      <HStack maxWidth="80%">
        <Text
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {text}
        </Text>
      </HStack>
      <Box display="flex" alignItems="center">
        <Text
          justifySelf="end"
          as="span"
          color="gray.600"
          fontSize="sm"
          mr="14px"
        >
          {subtext}
        </Text>

        <Icon as={icon} />
      </Box>
    </Flex>
  );
}

/**
 * Frontend component that defines an about summary post.
 *
 * @tutorial https://chakra-templates.dev
 * @since 2021-08-31
 */
export function AboutSummary() {
  return (
    <AnimatePresence exitBeforeEnter>
      <MotionBar
        width="100%"
        bg={mode('#fff', '#141625')}
        as="article"
        p={['10px']}
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 1, height: 'auto' },
          collapsed: { opacity: 0, height: '0' },
        }}
        transition={{
          duration: 0.5,
          ease: [0.04, 0.62, 0.23, 0.98],
        }}
        positionTransition
        mx="auto"
        my={6}
        rounded="md"
        overflow="hidden"
        borderWidth="1px"
        borderRadius="lg"
        border={['1px solid']}
        borderColor={mode('#bbb', '#7e88c3')}
      >
        <Flex
          bg={mode('#f6f6f6', '#252945')}
          as="header"
          height="50px"
          borderRadius="6px"
          alignItems="center"
          padding="20px"
          justifyContent="space-between"
          _hover={{
            bg: mode('#f6f6f6', '#252945'),
          }}
          cursor="default"
        >
          <Heading as="h2" size="md">
            About The App
          </Heading>
        </Flex>
        <MotionSection
          pt="6px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.04, 0.62, 0.23, 0.98],
          }}
          py="2"
          alignItems="flex-start"
        >
          <Text
            as="p"
            p="10px"
            fontSize="16px"
            color={mode('#252945', '#fff')}
          >
            Thanks for visiting! This is a sample profile page for
            when we get around to making that happen! CheatHub was a
            school project that I've recently had more time to further
            develop as I've found it quite useful for my own cheat
            sheets.
          </Text>
          <Text
            as="p"
            p="10px"
            fontSize="16px"
            color={mode('#252945', '#fff')}
          >
            Whatever brought you here -- whether you found the website
            interesting or are finding the documentation useful for
            your own learning -- you should consider collaborating
            with me to maintain and grow this app.
          </Text>
          <Text
            as="p"
            p="10px"
            fontSize="16px"
            color={mode('#252945', '#fff')}
          >
            It's in early stages, but it's well-documented and has the
            potential to gain a large community. At the very least,
            it's a fresh shot to contribute to open source.
          </Text>
          <Flex
            ml="25%"
            flexDirection="column"
            justifyContent="flex-end"
          >
            <BlogAuthor
              name="Joem Elias Sanez"
              date={new Date('2021-08-31T19:01:27Z')}
            />
          </Flex>
        </MotionSection>
      </MotionBar>
    </AnimatePresence>
  );
}
