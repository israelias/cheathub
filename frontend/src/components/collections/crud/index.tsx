import React from 'react';
import { Box, useMediaQuery, useColorModeValue as mode } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { MotionBar } from '../../shared/motion';
import CollectionForm from './CollectionForm';
import CollectionFooter from './CollectionFooter';

const CollectionCrud: React.FC<{
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  snippets: Options[];
  setSnippets: (snippetz: Options[]) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleDelete: React.FormEventHandler<HTMLFormElement>;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  editing: boolean;
  deleting: boolean;
  submitting: boolean;
}> = ({
  name,
  setName,
  handleSubmit,
  handleDelete,
  snippets,
  setSnippets,
  handleCancel,
  setAlert,
  editing,
  deleting,
  submitting,
}) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <MotionBar
          as="section"
          borderRadius="10px"
          padding={['0 10px']}
          mt="10px"
          display="flex"
          flexDirection="column"
          width="100%"
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
        >
          <CollectionForm
            name={name}
            setName={setName}
            snippets={snippets}
            setSnippets={setSnippets}
            handleSubmit={handleSubmit}
          />
        </MotionBar>
        <Box height="100%"> </Box>
      </AnimatePresence>
      <CollectionFooter
        editing={editing}
        deleting={deleting}
        submitting={submitting}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        setAlert={setAlert}
      />
    </>
  );
};

export default CollectionCrud;