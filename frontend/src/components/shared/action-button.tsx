import { IconButton, ButtonProps } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface ResetDataButtonProps extends ButtonProps {}

const ResetDataButton: React.FC<ResetDataButtonProps> = ({
  ...props
}) => (
  <IconButton
    unstyled
    isRounded
    variant="link"
    verticalAlign="center"
    bg="#fff"
    ml="10px"
    mr="-10px"
    p={0}
    size="sm"
    aria-label="Reset Search Text"
    {...props}
    icon={<CloseIcon p={0} fontSize="12px" />}
  />
);

export default ResetDataButton;
