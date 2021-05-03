import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface BrandButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export const BrandButton: React.FC<BrandButtonProps> = ({
  children,
  ...props
}) => (
  <Button size="sm" variant="outline" borderRadius="32px" {...props}>
    {children}
  </Button>
);
