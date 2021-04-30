/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Box } from '@chakra-ui/react';
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
} from 'framer-motion';

import SnippetCard from '../card';

const MotionDiv = motion(Box);

interface SnippetFeedProps {
  snippets: Snippet[];
  tagParam?: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

const SnippetFeed: React.FC<SnippetFeedProps> = ({
  snippets,
  setTags,
  loading,
}) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  // if (!snippets || snippets.length === 0) {
  //   return <p>No code snippets found.</p>;
  // }

  return (
    <AnimateSharedLayout type="crossfade">
      <MotionDiv
        // padding={['0 10px']}
        variants={{
          open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
          },
          closed: {
            transition: {
              staggerChildren: 0.05,
              staggerDirection: -1,
            },
          },
        }}
      >
        {snippets &&
          snippets.map(
            (snippet) =>
              // snippet[searchBy].indexOf(searchTerm) !== -1
              true && (
                <AnimatePresence exitBeforeEnter>
                  {/* <SnippetCard
                    key={snippet._id}
                    snippet={snippet}
                    setTagParam={setTags}
                  /> */}
                </AnimatePresence>
              )
          )}
      </MotionDiv>
    </AnimateSharedLayout>
  );
};

export default SnippetFeed;
