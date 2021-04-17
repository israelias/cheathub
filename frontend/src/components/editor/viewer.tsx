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
import { useColorModeValue } from '@chakra-ui/react';

interface ViewerProps extends SyntaxHighlighterProps {
  id: string;
  value: string;
  language: string;
}

export const Viewer: React.FC<ViewerProps> = ({
  id,
  value = 'code',
  language = 'python',
  ...props
}) => {
  const wtf = 'wtf';
  return (
    <SyntaxHighlighter
      id={id}
      language={language}
      style={tomorrow}
      customStyle={{
        backgroundColor: '#211E2F',
        color: '#939598',
        fontSize: '0.875em',
        whitespace: 'pre-line',
      }}
      {...props}
    >
      {value}
    </SyntaxHighlighter>
  );
};
