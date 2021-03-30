import React from 'react'
import {
  Container,
} from "@chakra-ui/react"
interface FooterProps {

}

export const Footer: React.FC<FooterProps> = ({}) => {
    return (
      <footer>
      <Container>
        <p><a target="_blank" href="/api/codesnippets">API Endpoint</a></p>
        <p>Copyright</p>
        <p>&copy; 2021 J Sanez</p>
      </Container>
    </footer>
    );
}