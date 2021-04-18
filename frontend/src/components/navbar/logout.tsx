import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { LogoutRequest } from '../../lib/fetcher';
import { useUserContext } from '../../context/user.context';

interface Props extends RouteComponentProps {
  asLink?: boolean;
}

export const LogoutButton = withRouter(
  ({ history, asLink }: Props) => {
    const user = useUserContext();
    return (
      <Button
        variant={asLink ? 'link' : 'solid'}
        colorScheme="teal"
        fontSize="sm"
        onClick={async (e) => {
          e.preventDefault();
          await LogoutRequest({
            setLoggedIn: user!.setLoggedIn,
            setUsername: user!.setUsername,
            accessToken: user!.accessToken,
            setAccessToken: user!.setAccessToken,
            history,
            redirectTo: '/',
          });
        }}
      >
        Log Out
      </Button>
    );
  }
);
