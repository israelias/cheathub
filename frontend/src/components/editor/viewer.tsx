import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface ViewerProps {
  id: string;
  value: string;
  language: string;
}

export const Viewer: React.FC<ViewerProps> = ({
  id,
  value = 'code',
  language = 'python',
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
    >
      {value}
    </SyntaxHighlighter>
  );
};
