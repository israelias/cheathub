import React from 'react';
import {
  FormControl,
  FormHelperText,
  Input,
} from '@chakra-ui/react';
import Select from 'react-select';
import { StyledLabel } from '../../snippet/crud/form-label';
import { MotionForm } from '../../shared/motion';
import { useProfileData } from '../../../context/profiledata.context';

interface CollectionFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  snippets: Options[];
  setSnippets: (snippetz: Options[]) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const CollectionForm: React.FC<CollectionFormProps> = ({
  name,
  setName,
  snippets,
  setSnippets,
  handleSubmit,
}) => {
  const { snippetsOptions } = useProfileData();
  const color = mode('light', 'dark');

    const mode = (light: string, dark: string) => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : light;
    };

  return (
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
                  borderColor: color === 'light' ? '#ff5470' : '#fde24f',
                },
                focusBorderColor: color === 'light' ? '#ff5470' : '#fde24f',
                borderColor: color === 'light' ? '#7e88c3' : '#786e89',
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
                borderColor: color === 'light' ? '#dfe3fa' : '#252945',
                display: 'none',
              }),
              multiValue: (provided: any) => ({
                ...provided,
                borderColor: color === 'light' ? '#dfe3fa' : '#252945',
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
            borderColor: color === 'light' ? '#d8d9da' : '#252945',
            spacing: {
              ...theme.spacing,
              baseUnit: 0,
              controlHeight: 20,
            },
            colors: {
              ...theme.colors,
              neutral20: color === 'light' ? '#7e88c3' : '#786e89',
              neutral80: color === 'light' ? '#0c0e16' : '#fff',
              primary25: color === 'light' ? '#fffde24f5470' : '#ff5470',
              neutral10: color === 'light' ? '#fafafa' : '#141625',
              neutral0: color === 'light' ? '#fff' : '#141625',
              primary: color === 'light' ? '#000' : '#fff',
              dangerLight: color === 'light' ? '#ebeced' : '#fde24f',
            },
          })}
        />
      </FormControl>
    </MotionForm>
  );
};

export default CollectionForm;