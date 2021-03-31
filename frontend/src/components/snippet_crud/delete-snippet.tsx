import React from 'react';
import { useHistory } from 'react-router-dom'
import {
  Button,
  Container,
} from "@chakra-ui/react"

interface Props {
  snippet: Snippet;
}

export const DeleteSnippet: React.FC<Props> = ({
  snippet
}) => {
  const history = useHistory();
  return (
      <div>
        <Container>
          <div>
            <h1>Are you sure you want to delete your code snippet {snippet.title}?</h1>
            <form action={`/delete/${snippet.id}`} method="POST">
              <Button type="submit">YES, DELETE</Button>
            </form>
            <Button onClick={() => {
              history.push("/snippets/all")
            }}>
              NEVERMIND
            </Button>
          </div>
        </Container>
    </div>
  );
}