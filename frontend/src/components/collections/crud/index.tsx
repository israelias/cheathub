/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  FormControl,
  FormHelperText,
  Box,
  Input,
  Flex,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import Select from 'react-select';
import { AnimatePresence } from 'framer-motion';

import { BrandButton } from '../../shared/brand-button';
import { StyledLabel } from '../../snippet/crud/form-label';
import { MotionBox, MotionForm } from '../../shared/motion-box';

import { useProfileData } from '../../../context/profiledata.context';

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
  const { snippetsOptions } = useProfileData();
  return (
    <Box
      borderRadius="10px"
      padding={['0 10px']}
      border={['1px solid #bbb']}
      mt="10px"
    >
      <AnimatePresence initial={false}>
        <MotionBox
          as="section"
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
        >
          <MotionForm id="collection" onSubmit={handleSubmit}>
            <FormControl height="100%" pt="10px" isRequired id="name">
              <StyledLabel label="Name" />
              <Input
                mt="10px"
                type="text"
                borderColor="#f6f6f6"
                fontSize="sm"
                placeHolder="My New Collection"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText hidden>Name.</FormHelperText>
            </FormControl>

            <FormControl mt="10px" id="snippets">
              <Select
                defaultValue={snippets}
                isMulti
                name="snippets"
                options={snippetsOptions}
                onChange={(value: any, actionMeta: any) => {
                  setSnippets(value);
                }}
                classNamePrefix="select"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 10,
                  colors: {
                    ...theme.colors,
                    primary25: 'hotpink',
                    primary: 'black',
                  },
                })}
              />
            </FormControl>
          </MotionForm>

          <Flex
            position="absolute"
            bottom={0}
            zIndex={10}
            width="100%"
            height="62px"
            justifyContent="space-between"
            alignItems="center"
            p={['0 10px']}
            maxWidth={{ base: '100vw' }}
            bg={mode('#fff', '#141625')}
          >
            {editing && (
              <MotionForm
                ml="8px"
                id="delete"
                onSubmit={handleDelete}
              >
                <BrandButton
                  type="button"
                  isLoading={deleting}
                  loadingText="Deleting"
                  onClick={() => setAlert(true)}
                >
                  Delete
                </BrandButton>
              </MotionForm>
            )}

            <BrandButton type="button" onClick={handleCancel}>
              Cancel
            </BrandButton>

            <BrandButton
              mr="16px"
              type="submit"
              form="collection"
              isLoading={submitting}
              loadingText="Submitting"
            >
              {editing ? 'Update' : 'Add'}
            </BrandButton>
          </Flex>
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
};
export default CollectionCrud;
