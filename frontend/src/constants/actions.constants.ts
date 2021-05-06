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
  GoSignIn,
  GoTrashcan,
  GoX,
  GoAlert,
  GoHeart,
  GoStar,
  GoSearch,
  GoTag,
  GoPlus,
  GoVersions,
  GoMention,
  GoDiffRemoved,
  GoDiffModified,
  GoDiffIgnored,
  GoDiffRenamed,
  GoPlusSmall,
  GoLock,
  GoLink,
  GoLinkExternal,
  GoHome,
  GoGear,
  GoLightBulb,
} from 'react-icons/go';
import { FaMoon, FaSun } from 'react-icons/fa';

const ICONS = {
  collections: {
    main: GoFileDirectory,
    sub: GoFileSubmodule,
    dark: GoFileDirectory,
  },
  faves: {
    main: GoBookmark,
    sub: GoStar,
    dark: GoBookmark,
  },
  explore: {
    main: GoTelescope,
    sub: GoSearch,
    dark: GoTelescope,
  },
  add: {
    main: GoDiffAdded,
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
  collections: {
    label: 'Collections',
    path: '/collections',
  },
  faves: {
    label: 'Faves',
    path: '/faves',
  },
  explore: {
    label: 'Explore',
    path: '/explore',
  },
  add: {
    label: 'Add',
    path: '/explore/add',
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
    path: '/registration/signin',
  },
  signout: {
    label: 'Sign Out',
    path: '/',
  },
  signup: {
    label: 'Sign Up',
    path: '/registration/signup',
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
    label: PATHS.collections.label,
    path: PATHS.collections.path,
    icon: GoFileDirectory,
    icons: {
      main: ICONS.collections.main,
      sub: ICONS.collections.sub,
      dark: ICONS.collections.dark,
    },
  },
  {
    label: PATHS.faves.label,
    path: PATHS.faves.path,
    icon: GoBookmark,
    icons: {
      main: ICONS.faves.main,
      sub: ICONS.faves.sub,
      dark: ICONS.faves.dark,
    },
  },
  {
    label: PATHS.explore.label,
    path: PATHS.explore.path,
    icon: GoTelescope,
    icons: {
      main: ICONS.explore.main,
      sub: ICONS.explore.sub,
      dark: ICONS.explore.dark,
    },
  },
  {
    label: PATHS.add.label,
    path: PATHS.add.path,
    icon: GoFileCode,
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
