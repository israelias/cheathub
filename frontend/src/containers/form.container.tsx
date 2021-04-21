import React from 'react';

import { Secondary } from './secondary.container';
// import { Snippet } from '../pages/snippets';

export const FormContainer: React.FC<LayoutProps> = ({
  children,
}) => <Secondary>{children}</Secondary>;
