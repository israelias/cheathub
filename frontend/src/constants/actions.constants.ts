import {
  GoSignOut,
  GoBookmark,
  GoFileDirectory,
  GoFileSubmodule,
  GoGist,
  GoTelescope,
  GoDiffAdded,
  GoSignIn,
  GoX,
  GoStar,
  GoSearch,
  GoTag,
  GoPlus,
  GoDiffRemoved,
  GoDiffRenamed,
  GoPlusSmall,
  GoLightBulb,
  GoPerson,
  GoInfo,
} from 'react-icons/go';
import { FaMoon, FaSun } from 'react-icons/fa';

const ICONS = {
  about: {
    main: GoInfo,
    sub: GoInfo,
    dark: GoInfo,
  },
  collections: {
    main: GoFileDirectory,
    sub: GoFileSubmodule,
    dark: GoFileDirectory,
  },
  explore: {
    main: GoTelescope,
    sub: GoSearch,
    dark: GoTelescope,
  },
  faves: {
    main: GoGist,
    sub: GoStar,
    dark: GoBookmark,
  },
  add: {
    main: GoPlus,
    sub: GoPlus,
    dark: GoDiffAdded,
  },
  mode: {
    main: FaMoon,
    sub: GoLightBulb,
    dark: FaSun,
  },
  signin: {
    main: GoSignIn,
    sub: GoPlus,
    dark: GoSignIn,
  },
  signout: {
    main: GoSignOut,
    sub: GoPlus,
    dark: GoSignOut,
  },
  signup: {
    main: GoSignIn,
    sub: GoPlus,
    dark: GoSignIn,
  },
  account: {
    main: GoPerson,
    sub: GoPerson,
    dark: GoPerson,
  },
  deleteAccount: {
    main: GoDiffRemoved,
    sub: GoDiffRemoved,
    dark: GoDiffRemoved,
  },
  create: {
    main: GoDiffAdded,
    sub: GoDiffAdded,
    dark: GoDiffAdded,
  },
  edit: {
    main: GoDiffRenamed,
    sub: GoDiffRenamed,
    dark: GoDiffRenamed,
  },
  delete: {
    main: GoDiffRemoved,
    sub: GoDiffRemoved,
    dark: GoDiffRemoved,
  },
  cancel: {
    main: GoX,
    sub: GoX,
    dark: GoX,
  },
  fave: {
    main: GoPlus,
    sub: GoPlus,
    dark: GoPlus,
  },
  unfave: {
    main: GoPlus,
    sub: GoPlus,
    dark: GoPlus,
  },
  tag: {
    main: GoTag,
    sub: GoPlusSmall,
    dark: GoPlusSmall,
  },
};

const PATHS = {
  about: {
    label: 'About',
    path: '/about',
    auth: 'about the app',
  },
  collections: {
    label: 'Collections',
    path: '/collections',
    auth: 'see your collections',
  },
  explore: {
    label: 'Explore',
    path: '/explore',
    auth: 'explore code snippets',
  },
  collection: {
    label: 'New Collection',
    path: '/collection/add',
    auth: 'add to your collections',
  },
  add: {
    label: 'New Snippet',
    path: '/snippets/add',
    auth: 'create new code snippets',
  },
  mode: {
    label: 'Switch modes',
    labels: {
      main: 'Switch to dark mode',
      dark: 'Switch to light mode',
    },
    path: '/explore/add',
  },
  signin: {
    label: 'Sign In',
    path: '/signin',
  },
  signout: {
    label: 'Sign Out',
    path: '/',
  },
  signup: {
    label: 'Sign Up',
    path: '/signup',
  },
  account: {
    label: 'Your Account',
    path: '/',
  },
  deleteAccount: {
    label: 'Delete Account',
    path: '/',
  },
  create: {
    label: 'Add',
    path: '/:',
  },
  edit: {
    label: 'Edit',
    path: '/:',
  },
  delete: {
    label: 'Delete',
    path: '/:',
  },
  cancel: {
    label: 'Cancel',
    path: '/:',
  },
  fave: {
    label: 'Fave',
    path: '/:',
  },
  unfave: {
    label: 'Unfave',
    path: '/:',
  },
  tag: {
    label: 'Tag',
    path: '/:',
  },
};

export const ACTIONS = [
  {
    primary: false,
    label: PATHS.about.label,
    path: PATHS.about.path,
    auth: PATHS.about.auth,
    icon: GoInfo,
    icons: {
      main: ICONS.about.main,
      sub: ICONS.about.sub,
      dark: ICONS.about.dark,
    },
  },
  {
    primary: true,
    label: PATHS.collections.label,
    path: PATHS.collections.path,
    auth: PATHS.collections.auth,
    icon: GoFileDirectory,
    icons: {
      main: ICONS.collections.main,
      sub: ICONS.collections.sub,
      dark: ICONS.collections.dark,
    },
  },
  {
    primary: true,
    label: PATHS.explore.label,
    path: PATHS.explore.path,
    auth: PATHS.explore.auth,
    icon: GoTelescope,
    icons: {
      main: ICONS.explore.main,
      sub: ICONS.explore.sub,
      dark: ICONS.explore.dark,
    },
  },
  {
    primary: true,
    label: PATHS.collection.label,
    path: PATHS.collection.path,
    auth: PATHS.collection.auth,
    icon: GoTelescope,
    icons: {
      main: ICONS.create.main,
      sub: ICONS.create.sub,
      dark: ICONS.create.dark,
    },
  },
  {
    primary: true,
    label: PATHS.add.label,
    path: PATHS.add.path,
    auth: PATHS.add.auth,
    icon: GoTelescope,
    icons: {
      main: ICONS.add.main,
      sub: ICONS.add.sub,
      dark: ICONS.add.dark,
    },
  },
];

export const MODES = [
  {
    labels: {
      main: PATHS.mode.labels.main,
      dark: PATHS.mode.labels.dark,
    },
    icons: {
      main: ICONS.mode.main,
      sub: ICONS.mode.sub,
      dark: ICONS.mode.dark,
    },
  },
  {
    labels: {
      main: PATHS.signout.label,
      dark: PATHS.signout.label,
    },
    path: PATHS.signout.path,
    icons: {
      main: ICONS.signout.main,
      sub: ICONS.signout.sub,
      dark: ICONS.signout.dark,
    },
  },
];

export const AUTH0 = [
  {
    label: PATHS.signin.label,
    path: PATHS.signin.path,
    icons: {
      main: ICONS.signin.main,
      sub: ICONS.signin.sub,
      dark: ICONS.signin.dark,
    },
  },
  {
    label: PATHS.signup.label,
    path: PATHS.signup.path,
    icons: {
      main: ICONS.signup.main,
      sub: ICONS.signup.sub,
      dark: ICONS.signup.dark,
    },
  },
];

export const AUTH = [
  {
    label: PATHS.signout.label,
    path: PATHS.signout.path,
    icons: {
      main: ICONS.signout.main,
      sub: ICONS.signout.sub,
      dark: ICONS.signout.dark,
    },
  },
  {
    label: PATHS.deleteAccount.label,
    path: PATHS.deleteAccount.path,
    icons: {
      main: ICONS.deleteAccount.main,
      sub: ICONS.deleteAccount.sub,
      dark: ICONS.deleteAccount.dark,
    },
  },
];

export const CRUD = [
  {
    label: PATHS.create.label,
    path: PATHS.create.path,
    icons: {
      main: ICONS.create.main,
      sub: ICONS.create.sub,
      dark: ICONS.create.dark,
    },
  },
  {
    label: PATHS.edit.label,
    path: PATHS.edit.path,
    icons: {
      main: ICONS.edit.main,
      sub: ICONS.edit.sub,
      dark: ICONS.edit.dark,
    },
  },
  {
    label: PATHS.delete.label,
    path: PATHS.delete.path,
    icons: {
      main: ICONS.delete.main,
      sub: ICONS.delete.sub,
      dark: ICONS.delete.dark,
    },
  },
];
