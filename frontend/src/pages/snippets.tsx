import * as React from "react";
import { RouteComponentProps } from "react-router";
import { AddSnippet } from '../components/snippet_crud/add-snippet'
import { DeleteSnippet } from '../components/snippet_crud/delete-snippet'

interface Props extends RouteComponentProps<{ id: string }> {}

export const Snippet: React.FC<Props> = ({ match }) => {
  // React.useEffect(() => {
  //   fetch(`api.example.com/posts/${match.params.id}`)
  // }, [match.params.id])

  return (
    <div>
      <div>rendering post {match.params.id}</div>
      <AddSnippet />
      {/* <DeleteSnippet snippet={snippet} /> */}
    </div>
  );
};