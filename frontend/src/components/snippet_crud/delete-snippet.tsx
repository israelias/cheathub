import React from 'react'
import {
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Select,
  Button,
  Container,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react"

interface deleteSnippetProps {

}

export const DeleteSnippet: React.FC<deleteSnippetProps> = ({}) => {
    return (
      <div>
        <Container>

          <div>
            <h1>Are you sure you want to delete your code snippet ___"?</h1>
            <form action="/delete/<%= snippet._id %>" method="POST">
              <Button type="submit">YES, DELETE</Button>
            </form>
            <Button onclick="window.location.href='/snippets/all'">NEVERMIND</Button>
          </div>

          </Container>
      </div>
    );
}