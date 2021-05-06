import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useUserContext } from '../../context/user.context';

interface Props extends RouteComponentProps {
  asLink?: boolean;
}

export const LogoutButton = withRouter(
  ({ history, asLink }: Props) => {
    const user = useUserContext();
    const { handleSignOut } = useUserContext();
    return (
      <Button
        variant={asLink ? 'link' : 'solid'}
        colorScheme="teal"
        fontSize="sm"
        onClick={handleSignOut}
      >
        Log Out
      </Button>
    );
  }
);
