import React, { useRef } from 'react';

interface Person {
  firstName: string;
  lastName: string;
}

interface Props {
  text: string;
  ok?: boolean;
  i: number;
  fn: (bob: string) => number;
  obj: {
    f1: string;
  };
  person: Person;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<Props> = ({ handleChange }) => {
  // const [count, setCount] = useState<
  //   number | null | undefined
  // >(5);
  // const [text, setText] = useState<TextNode>({
  //   text: 'hellow',
  // });
  // const [no, setNo] = useState<{ text: string }>({
  //   text: 'hellow',
  // });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input ref={inputRef} onChange={handleChange} type="text" />
    </div>
  );
};

export default TextField;
