import React from 'react';
import Editor, {
  useMonaco,
  OnChange,
  EditorProps,
  OnMount,
} from '@monaco-editor/react';

interface IEditorProps extends EditorProps {}
export const CodeEditor: React.FC<IEditorProps> = ({
  value,
  ...props
}) => {
  const [editorValue, setEditorValue] = React.useState<string>(
    'print("Hello World")'
  );
  const monaco = useMonaco();

  const themeName = 'my-theme';

  React.useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme(themeName, {
        base: 'vs-dark',
        inherit: true,
        rules: [],
      });
      monaco.editor.setTheme(themeName);
    }
  }, [monaco]);

  const handleEditorChange: OnChange = (ev, newValue) => {
    setEditorValue(newValue);
  };

  React.useEffect(() => {
    if (value) {
      setEditorValue(value);
    }
  }, [value]);

  return (
    <Editor
      height="40vh"
      onChange={() => handleEditorChange}
      options={{
        minimap: {
          enabled: false,
        },
      }}
      value={editorValue}
      theme={themeName}
      {...props}
    />
  );
};
