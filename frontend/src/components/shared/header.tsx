import React from 'react'
import {
  Container,
} from "@chakra-ui/react";

interface Props {
  loggedIn: Boolean;
  username: String;
}

export const LoggedinHeader: React.FC<Props> = ({
  loggedIn,
  username
}) => {
    return (
      <nav data-user-id="<%= userid %>">
      <Container>
        {
          loggedIn
          ? (
          <>
            <h1><a href="/snippet s/all">Feed</a></h1>
            {username && <p>{ username }</p>}
            <ul>
              <li><a href="/snippets/favs">Favs</a></li>
              <li><a href="/snippets/all">Explore</a></li>
              <li><a href="/snippet/add">Add</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </>
        ):(
          <>
            <h1><a href="/">Cheat-Hub</a></h1>
            <ul>
              <li><a href="/register/tour">Take a tour!</a></li>
            </ul>
          </>
          )
        }
      </Container>
    </nav>
    );
}