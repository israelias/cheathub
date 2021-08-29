/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  FormControl,
  FormHelperText,
  Box,
  Input,
  Flex,
  useMediaQuery,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import Select from 'react-select';

import { AnimatePresence } from 'framer-motion';

import { BrandButton } from '../../shared/brand-button';
import { StyledLabel } from '../../snippet/crud/form-label';
import { MotionForm, MotionBar } from '../../shared/motion';
import { SecondaryFooter } from '../../shared/particulars';
import './styles.css';
import { useProfileData } from '../../../context/profiledata.context';

/**
 * Component for CRUD operations of a collection.
 *
 * A form counterpart of CollectionItem
 * Relies on State and setState props passed by Collection page.
 * TODO Update default value of MultiSelect
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
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  // React.useEffect(() => {
  //   if (snippets.length < 1) {
  //     setSnippets([]);
  //   }
  // }, [snippets]);

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

              <FormControl mt="10px" id="snippets">
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
                  maxHeight="200"
                  customStyles={{
                    menu: (provided: any, state: any) => ({
                      ...provided,
                      width: state.selectProps.width,
                      color: state.selectProps.menuColor,

                      padding: 10,
                      control: (provided: any) => ({
                        ...provided,
                        minHeight: '30px',
                        height: 32,
                        fontSize: 16,
                        borderRadius: 0,
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer',
                        padding: '2px',
                        onFocus: {
                          borderColor:
                            color === 'light' ? '#ff5470' : '#fde24f',
                        },
                        focusBorderColor:
                          color === 'light' ? '#ff5470' : '#fde24f',
                        borderColor:
                          color === 'light' ? '#7e88c3' : '#786e89',
                      }),
                      indicatorsContainer: (provided: any) => ({
                        ...provided,
                        height: '30px',
                        borderRadius: '10px',
                      }),
                      clearIndicator: (provided: any) => ({
                        ...provided,
                        padding: '5px',
                      }),
                      dropdownIndicator: (provided: any) => ({
                        ...provided,
                        padding: '5px',
                        display: 'none',
                      }),
                      indicatorSeparator: (provided: any) => ({
                        ...provided,
                        borderColor:
                          color === 'light' ? '#dfe3fa' : '#252945',
                        display: 'none',
                      }),
                      multiValue: (provided: any) => ({
                        ...provided,
                        borderColor:
                          color === 'light' ? '#dfe3fa' : '#252945',
                        borderRadius: '20px',
                      }),
                      valueContainer: (base: any) => ({
                        ...provided,
                        paddingLeft: 2,
                        borderRadius: '10px',
                      }),
                      singleValue: (provided: any, state: any) => {
                        const opacity = state.isDisabled ? 0.5 : 1;
                        const transition = 'opacity 300ms';
                        const borderRadius = '10px';
                        return {
                          ...provided,
                          opacity,
                          transition,
                          borderRadius,
                        };
                      },
                    }),
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 10,
                    borderColor:
                      color === 'light' ? '#d8d9da' : '#252945',
                    spacing: {
                      ...theme.spacing,
                      baseUnit: 0,
                      controlHeight: 20,
                    },
                    colors: {
                      ...theme.colors,
                      neutral20:
                        color === 'light' ? '#7e88c3' : '#786e89',
                      neutral80:
                        color === 'light' ? '#0c0e16' : '#fff',

                      primary25:
                        color === 'light'
                          ? '#fffde24f5470'
                          : '#ff5470',

                      neutral10:
                        color === 'light' ? '#fafafa' : '#141625',

                      neutral0:
                        color === 'light' ? '#fff' : '#141625',
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
        <Box height="100%"> </Box>
      </AnimatePresence>
      <Box
        position="sticky"
        // width="100%"
        mt="auto"
        pt="16px"
        top="80vh"
        ml={baseLg ? 0 : '-8px'}
        mr={baseLg ? 0 : '-8px'}
        bottom={0}
      >
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
    </>
  );
};
export default CollectionCrud;
