import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import { AddSnippet } from '../components/snippet_crud/add-snippet';
import { getRequest, putRequest } from '../lib/fetcher';
import { CodeEditor } from '../components/editor/editor';

interface AddProps extends RouteComponentProps {}

export const AddPage: React.FC<AddProps> = ({ history }) => {
  const user = useUserContext();
  return (
    <div>
      <CodeEditor value="JOEM" />
      {/* <AddSnippet /> */}
    </div>
  );
};
