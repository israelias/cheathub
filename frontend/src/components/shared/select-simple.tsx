/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Select, SelectProps, CheckboxProps } from '@chakra-ui/react';

interface SimpleSelectProps extends SelectProps {
  items: Array<string>;
}

export const SimpleSelect: React.FC<SimpleSelectProps> = ({
  items,
  value,
  onChange,
  ...props
}) => (
  <>
    <Select value={value} onChange={onChange} {...props}>
      {items.map((item, i) => (
        <option key={`${i}-${item}`} value={item}>
          {item}
        </option>
      ))}
    </Select>
  </>
);

// <>
//     <input type="text" name="city" list="taglist" />
//     <datalist
//       id="taglist"
//       value={value}
//       onChange={onChange}
//       {...props}
//     >
//       {items.map((item, i) => (
//         <option key={`${i}-${item}`} value={item}>
//           {item}
//         </option>
//       ))}
//     </datalist>
//   </>
// </>
// interface SimpleCheckboxProps extends CheckboxProps {
//   items: Array<string>;
// }
// export const SimpleCheckbox: React.FC<SimpleCheckboxProps> = ({
//   items,
//   value,
//   onChange,
//   ...props
// }) => (
//   <>
//     <div>
//       {items.map((item, i) => (
//         <form key={item}>
//           <label>item</label>
//           <input
//             type="checkbox"
//             onChange={onChange}
//             {...props}
//             key={`${i}-${item}`}
//             value={item}
//           />
//         </form>
//       ))}
//     </div>
//   </>
// );
