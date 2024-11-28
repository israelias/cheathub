import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrandButton } from '../../shared/brand-button';
import { MotionForm } from '../../shared/motion';
import { SecondaryFooter } from '../../shared/particulars';

interface CollectionFooterProps {
  editing: boolean;
  deleting: boolean;
  submitting: boolean;
  handleDelete: React.FormEventHandler<HTMLFormElement>;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollectionFooter: React.FC<CollectionFooterProps> = ({
  editing,
  deleting,
  submitting,
  handleDelete,
  handleCancel,
  setAlert,
}) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');

  return (
    <Box
      position="sticky"
      mt="auto"
      pt="16px"
      top="80vh"
      ml={baseLg ? 0 : '-8px'}
      mr={baseLg ? 0 : '-8px'}
      bottom={0}
    >
      <SecondaryFooter>
        {editing && (
          <MotionForm ml="8px" id="delete-collection" onSubmit={handleDelete}>
            <BrandButton
              type="button"
              isLoading={deleting}
              loadingText="Deleting"
              onClick={() => setAlert(true)}
            >
              Delete
            </BrandButton>
          </MotionForm>
        )}

        <BrandButton type="button" onClick={handleCancel}>
          Cancel
        </BrandButton>

        <BrandButton
          mr="16px"
          type="submit"
          form="collection"
          isLoading={submitting}
          loadingText="Submitting"
        >
          {editing ? 'Update' : 'Add'}
        </BrandButton>
      </SecondaryFooter>
    </Box>
  );
};

export default CollectionFooter;