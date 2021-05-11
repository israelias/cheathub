import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  SelectProps,
  Input,
  InputProps,
} from '@chakra-ui/react';

/**
 * Inputs that make up the search UI.
 *
 * State and setState hooks are passed to activate these components.
 * Auth inputs rely on these UI.
 * @see SearchBar
 * @see SearchBox
 * @file defines the Search input elementss..
 * @date 2021-05-11
 */

/**
 * Select input props interface.
 * @interface
 * @see SelectInput
 */
interface SelectInputProps extends SelectProps {
  name?: string;
  label?: string;
  value?: string;
  options: Options[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
/**
 * Select input.
 * @implements SelectInputProps
 * @see SelectInput
 */
const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  ...props
}) => (
  <FormControl id={name}>
    {label && <FormLabel>{label}</FormLabel>}
    <Select value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </FormControl>
);
/**
 * Text input props interface.
 * @interface
 * @see TextInput
 */
interface TextInputProps extends InputProps {
  name?: string;
  label?: string;
  placeHolder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Text input.
 * @implements TextInputProps
 * @see SelectInput
 */
const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeHolder,
  value,
  onChange,
  ...props
}) => (
  <FormControl id={name}>
    {label && <FormLabel>{label}</FormLabel>}
    <Input
      type="text"
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      {...props}
    />
  </FormControl>
);

export { TextInput, SelectInput };
