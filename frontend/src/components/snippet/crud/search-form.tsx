import React from 'react';
import { SelectInput } from './select-input';
import { TextInput } from './text-search-input';
import { SEARCHFILTERS } from '../../../constants/languages.constants';

// const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
//   <div>{message}</div>
// );

// For <input type="text"> the event type is React.ChangeEvent<HTMLInputElement>
// const Input = (): JSX.Element => {
//   const [inputValue, setInputValue] = useState<string>("");
//   return (
//       <input
//           type="text"
//           value={inputValue}
//           onChange={(
//               ev: React.ChangeEvent<HTMLInputElement>,
//           ): void => setInputValue(ev.target.value)}
//       />
//   );
// };

// For <textarea> is React.ChangeEvent<HTMLTextAreaElement>
// const TextArea = (): JSX.Element => {
//   const [textAreaValue, setTextAreaValue] = useState<string>("");
//   return (
//       <textarea
//           value={textAreaValue}
//           onChange={(
//               ev: React.ChangeEvent<HTMLTextAreaElement>,
//           ): void => setTextAreaValue(ev.target.value)}
//       />
//   );
// };

// The HTML5 slider is an <input type="range"> , sharing the same event as the <input type="text"> , React.ChangeEvent<HTMLInputElement>
// As it’s counterpart, the value of ev.target.value will be a string, but the majority of cases we will want to use it to get a number. For that, notice how we’re using a parseInt to cast the string to a number .

// const Slider = (): JSX.Element => {
//   const [sliderValue, setSliderValue] = useState<number>(0);
//   return (
//       <input
//           type="range"
//           min={0}
//           max={100}
//           value={sliderValue}
//           onChange={(
//               ev: React.ChangeEvent<HTMLInputElement>,
//           ): void => {
//               setSliderValue(
//                   parseInt(ev.target.value, 10),
//               );
//           }}
//       />
//   );
// };

// For <select>we use React.ChangeEvent<HTMLInputSelect>

// const Select = (): JSX.Element => {
//   const [selectValue, setSelectValue] = useState<string>(
//       "optionA",
//   );
//   return (
//       <select
//           value={selectValue}
//           onBlur={(
//               ev: React.ChangeEvent<HTMLSelectElement>,
//           ): void => setSelectValue(ev.target.value)}
//       >
//           <option value="optionA">Option A</option>
//           <option value="optionB">Option B</option>
//           <option value="optionC">Option C</option>
//       </select>
//   );
// };

// functions that doesnt take args anddoesn't return value
// interface MyClassProps {
//   someProp: string;
//   onChange(): any;
// }
// class MyClass extends React.Component<MyClassProps, MyClassState> ...

// accepts args and returs value
// interface MyClassProps {
//   anotherProp: number;
//   onChange(name: string): any;
// }

// function thats optional
// interface MyClassProps {
//   onChange?(name: string): number;
//   niceProp: boolean;
// }

// using type keyword
// type MyFunctionType = (name: string) => number;
// interface MyClassProps {
//     onChange: MyFunctionType;
//     niceProp: string;
// }

export interface SearchProps {
  query?: string | null;
  searchTerm: SearchTerm;
  searchBy: SearchBy;
  onSearchTermChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onSearchByChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

export const Search: React.FC<SearchProps> = ({
  query,
  searchTerm,
  searchBy,
  onSearchByChange,
  onSearchTermChange,
}) => {
  const options = [{ value: '', label: 'All' }, ...SEARCHFILTERS];
  return (
    <form action={`/search_snippets/${query}`} method="POST">
      <div>
        <TextInput
          name="search"
          placeHolder="Search Snippets"
          value={searchTerm}
          onChange={(value) => onSearchTermChange(value)}
        />
        <SelectInput
          name="filter"
          label="Filter by:"
          value={searchBy}
          options={options}
          onChange={(value) => onSearchByChange(value)}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};
