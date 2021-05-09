import React from 'react';
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import {
  tomorrow,
  prism,
  solarizedlight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {
  useColorModeValue as mode,
  useMediaQuery,
} from '@chakra-ui/react';

interface ViewerProps extends SyntaxHighlighterProps {
  id: string;
  value: string;
  language: string;
  // style?: any;
  // customStyle?: any;
  // lineProps?: lineTagPropsFunction | React.HTMLProps<HTMLElement>;
  // codeTagProps?: React.HTMLProps<HTMLElement>;
  // useInlineStyles?: boolean;
  // showLineNumbers?: boolean;
  // startingLineNumber?: number;
  // lineNumberStyle?: any;
}

export const Viewer: React.FC<ViewerProps> = ({
  id,
  value = 'code',
  language = 'python',
  ...props
}) => {
  const wtf = 'wtf';
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  return (
    <SyntaxHighlighter
      id={id}
      language={language}
      style={tomorrow}
      showLineNumbers
      wrapLongLines
      customStyle={{
        backgroundColor: '#211E2F',
        color: '#939598',
        fontSize: baseLg ? '12px' : '13px',
        whitespace: 'pre-line',
        maxHeight: '400px',
      }}
      {...props}
    >
      {value}
    </SyntaxHighlighter>
  );
};
