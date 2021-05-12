import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Button,
  ButtonProps,
  useColorModeValue as mode,
} from '@chakra-ui/react';

interface BrandButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export const BrandButton: React.FC<BrandButtonProps> = ({
  children,
  ...props
}) => (
  <Button
    bg={mode('#fafafa', '#252945')}
    borderColor={mode('#bdbfc4', '#786e89')}
    color={mode('#252945', '#fafafa')}
    _hover={{ bg: mode('#f5f2f0', '#373B53') }}
    size="sm"
    variant="outline"
    borderRadius="32px"
    {...props}
  >
    {children}
  </Button>
);

export const AddSnippetButton: React.FC<BrandButtonProps> = ({
  children,
  ...props
}) => (
  <Button
    size="sm"
    as={RouterLink}
    variant="outline"
    to="/snippets/add"
    borderRadius="32px"
    {...props}
  >
    {children}
  </Button>
);

export const AddCollectionButton: React.FC<BrandButtonProps> = ({
  children,
  ...props
}) => (
  <Button
    size="sm"
    as={RouterLink}
    variant="outline"
    to="/collection/add"
    borderRadius="32px"
    {...props}
  >
    {children}
  </Button>
);

export const GoBackButton: React.FC<BrandButtonProps> = ({
  children,
  ...props
}) => {
  const history = useHistory();
  return (
    <BrandButton
      size="sm"
      variant="outline"
      borderRadius="32px"
      onClick={() => history.goBack()}
      {...props}
    >
      {children}
    </BrandButton>
  );
};
