import {
  GoSignOut,
  GoBookmark,
  GoFileDirectory,
  GoFileSubmodule,
  GoFile,
  GoGist,
  GoFileCode,
  GoTelescope,
  GoPrimitiveSquare,
  GoPrimitiveDot,
  GoDiffAdded,
} from 'react-icons/go';

export const ACTIONS = [
  {
    label: 'Collections',
    path: '/collections',
    icon: GoFileDirectory,
  },
  { label: 'Faves', path: '/faves', icon: GoBookmark },
  { label: 'Explore', path: '/explore', icon: GoTelescope },
  { label: 'Add', path: '/add', icon: GoFileCode },
];

export const ADDING = [
  { label: 'Save', path: '/', icon: GoFileCode },
  { label: 'Cancel', path: '/faves', icon: GoFileCode },
];

export const EDITING = [
  { label: 'Save', path: '/', icon: GoFileCode },
  { label: 'Cancel', path: '/faves', icon: GoFileCode },
  { label: 'Delete', path: '/explore', icon: GoFileCode },
];
