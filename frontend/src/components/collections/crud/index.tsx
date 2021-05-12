/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  FormControl,
  FormHelperText,
  Box,
  Input,
  Flex,
  useColorMode,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import Select from 'react-select';

import { AnimatePresence, motion } from 'framer-motion';

import { BrandButton } from '../../shared/brand-button';
import { StyledLabel } from '../../snippet/crud/form-label';
import {
  MotionBox,
  MotionForm,
  MotionBar,
} from '../../shared/motion';
import {
  PrimaryFooter,
  SecondaryFooter,
} from '../../shared/particulars';

import { useProfileData } from '../../../context/profiledata.context';

/**
 * Component for CRUD operations of a collection.
 *
 * A form counterpart of CollectionItem
 * Relies on State and setState props passed by Collection page.
 * @see CollectionItem
 * @file defines Collection form.
 * @date 2021-05-03
 */
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
  const color = mode('light', 'dark');
  return (
    <AnimatePresence exitBeforeEnter>
      <MotionBar
        as="section"
        borderRadius="10px"
        padding={['0 10px']}
        // border={['1px solid']}
        // borderColor={mode('#9992b6', '#b6b1cb')}
        mt="10px"
        // display="flex"
        // flexDirection="column"
        // height={['calc(100vh - 400px)']}
        // pl="10px"
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
        <>
          <MotionForm
            id="collection"
            border={['1px solid']}
            borderRadius="10px"
            padding={['0 10px']}
            borderColor={mode('#9992b6', '#b6b1cb')}
            height={['calc(100vh - 400px)']}
            onSubmit={handleSubmit}
          >
            <FormControl pt="10px" isRequired id="name">
              <StyledLabel label="Name" />
              <Input
                mt="10px"
                type="text"
                fontSize="sm"
                placeHolder="My New Collection"
                borderColor={mode('#7e88c3', '#786e89')}
                focusBorderColor={mode('#ff5470', '#fde24f')}
                bg={mode('#fafafa', '#0b0914')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText hidden>Name.</FormHelperText>
            </FormControl>

            <FormControl
              // display="flex"
              // flexDirection="column"
              mt="10px"
              id="snippets"
            >
              <Select
                defaultValue={snippets}
                isMulti
                isClearable
                borderColor={mode('#7e88c3', '#786e89')}
                focusBorderColor={mode('#ff5470', '#fde24f')}
                bg={mode('#fafafa', '#0b0914')}
                position="relative"
                fontSize="12px"
                name="snippets"
                options={snippetsOptions}
                setValue
                onChange={(value: any, actionMeta: any) => {
                  setSnippets(value);
                }}
                classNamePrefix="select"
                pageSize={3}
                css={{
                  fontSize: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 10,
                  spacing: {
                    ...theme.spacing,
                    baseUnit: 6,
                    controlHeight: 40,
                    menuGutter: 2,
                  },
                  colors: {
                    ...theme.colors,
                    neutral20:
                      color === 'light' ? '#ebeced' : '#ebeced',
                    // tag text
                    neutral80:
                      color === 'light' ? '#0c0e16' : '#0c0e16',
                    // dopdown select highlight
                    primary25:
                      color === 'light' ? '#fffde24f5470' : '#ff5470',
                    // tag inner bg
                    neutral10:
                      color === 'light' ? '#fafafa' : '#7e88c3',
                    // bg
                    neutral0: color === 'light' ? '#fff' : '#141625',
                    primary: color === 'light' ? '#000' : '#fff',
                    dangerLight:
                      color === 'light' ? '#ebeced' : '#fde24f',
                  },
                })}
              />
            </FormControl>
          </MotionForm>
        </>
      </MotionBar>
      {/* <Box height="100%"> </Box> */}
      <Box
        // position={{ base: 'unset', lg: 'absolute' }}
        position="absolute"
        width="100%"
        mt="auto"
        bottom={0}
      >
        {' '}
        <SecondaryFooter>
          {editing && (
            <MotionForm
              ml="8px"
              id="delete-collection"
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
        </SecondaryFooter>
      </Box>
    </AnimatePresence>
  );
};
export default CollectionCrud;
