import React from 'react'
import {
  Container,
} from "@chakra-ui/react"
interface LoggedinHeaderProps {

}

export const LoggedinHeader: React.FC<LoggedinHeaderProps> = ({}) => {
    return (
      <nav data-user-id="<%= userid %>">
      <Container>
        <h1><a href="/snippets/all">Feed</a></h1>
        <ul>
          <li><a href="/snippets/favs">Favs</a></li>
          <li><a href="/snippets/all">Explore</a></li>
          <li><a href="/snippet/add">Add</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </Container>
    </nav>
    );
}