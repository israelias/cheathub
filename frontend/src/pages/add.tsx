import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import { AddSnippet } from '../components/snippet/crud/add-snippet';
import { getRequest, putRequest } from '../lib/fetcher';

interface AddProps extends RouteComponentProps {}

/**
 * Frontend endpoint that represents the Add snippet operation.
 *
 * @file defines AddPage route
 * @since 2021-04-08
 * @param {any} {history}
 * @return {=>}
 */
export const AddPage: React.FC<AddProps> = ({ history }) => {
  const user = useUserContext();
  return (
    <div>
      <AddSnippet />
    </div>
  );
};
