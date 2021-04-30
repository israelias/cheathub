// import { useColorModeValue as mode } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import type {
  GlobalStyleProps,
  Styles,
} from '@chakra-ui/theme-tools';
import {
  useColorModeValue,
  ColorModeProvider,
  extendTheme,
} from '@chakra-ui/react';

// example theme object
export const exampleTheme = {
  colors: {},
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
    mono: 'Menlo, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: '2',
    '3': '.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const main = {
  bg: { light: '#f8f8fb', dark: '#141625' },
};

export const panel = {
  bg: { light: '#f9fafe', dark: '#252945' },
};

export const navigation = {
  bg: { light: '#f8f8fb', dark: '#1e2139' },
};

export const forms = {
  bg: { light: '#373b53', dark: '#141625' },
  fields: { light: '#ffffff', dark: '#1e2139' },
  bd: { light: '#dfe3fa', dark: '#252945' },
};

export const collection = {
  // link item
  bgItem: { light: '#ffffff', dark: '#1e2139' },
  statBg: {
    light: 'rgba(55, 59, 83, 0.06)',
    dark: 'rgba(223, 227, 250, .06)',
  },
  statText: { light: '#373B53', dark: '#dfe3fa' },
  tableBg: { light: '#f9fafe', dark: '#252945' },
  footerbg: { light: '#373b53', dark: '#0C0e16' },
};

export const modals = {
  bg: { light: '#ffffff', dark: '#1e2139' },
};

export const dropdown = {
  bg: { light: '#ffffff', dark: '#252945' },
  shadow: {
    light: 'rgba(72, 84, 159, 0.25)',
    dark: 'rgba(0, 0, 0, 0.25)',
  },
};

export const special = {
  pagebg: { light: '#f8f8fb', dark: 'rgb(16, 22, 47)' },
  bg: { light: '#f9fafe', dark: '#141c3a' },
  bd: { light: '#0a0e1d', dark: '#0a0e1d' },
  btn: { light: '#6400e4', dark: '#6400e4' },
  alertHeading: mode('#fd4d3f', '#fd4d3f'),
  alertHeadffing: mode('#fd4d3f', '#ffd71a'),
};

export const body = {
  heading: { light: '#0C0E16', dark: '#ffffff' },
  titleA: { light: '#888eb0', dark: '#dfe3Fa' },
  titleB: { light: '#858BB2', dark: '#ffffff' },
  label: { light: '#7E88C3', dark: '#dfe3fa' },
  link: { light: '#0c0e16', dark: '#ffffff' },
  hover: { light: '#7e88c3', dark: '#888eb0' },
  placeHolder: { light: 'rgba(12, 14, 22, .4)', dark: '#fff' },
  accent: { light: '#fd4d3f', dark: '#fd4d3f' },
  sub: { light: '#ffd71a', dark: '#ffd71a' },
};

export const checkbox = {
  bg: { light: '#dfe3fa', dark: '#1e2139' },
};

export const primary = {
  bg: { light: 'rgb(124, 93, 250)', dark: 'rgb(124, 93, 250)' },
  hover: { light: '#7e88c3', dark: '#7e88c3' },
  text: { light: '#ffffff', dark: '#ffffff' },
};

export const secondary = {
  bg: { light: '#f9fafe', dark: '#252945' },
  hover: { light: '#dfe3fa', dark: '#ffffff' },
  text: { light: '#7e88c3', dark: '#dfe3fa' },
};

export const terciary = {
  bg: { light: '#363b53', dark: '#363b53' },
  hover: { light: '#0c0e16', dark: '#1e2139' },
  text: { light: '#888eb0', dark: '#dfe3fa' },
};

export const quarternary = {
  bg: { light: '#F9FAFE', dark: '#252945' },
  hover: { light: '#DFE3FA', dark: '#1e2139' },
  text: { light: '#7E88C3', dark: '#DFE3FA' },
};

export const layerStyles = {
  body: {
    bg: mode('#f8f8fb', '#141625'),
  },
  sidebar: {
    // bg: mode('#373b53', '#1e2139'),
    bg: ['#373b53', '#1e2139'],
    light: { bg: '#373b53' },
    dark: { bg: '#1e2139' },
  },
  pagebg: mode('#f8f8fb', 'rgb(16, 22, 47)'),
  innerbg: mode('#f9fafe', '#141c3a'),
  innerbgborder: mode('#0a0e1d', '#0a0e1d'),
  btnsuxx: mode('#6400e4', '#6400e4'),
  alertHeading: mode('#fd4d3f', '#fd4d3f'),
  alertHeadffing: mode('#fd4d3f', '#ffd71a'),

  form: {
    bg: mode('#ffffff', '#141625'),
    fieldBg: mode('#ffffff', '#1e2139'),
    fieldBorder: mode('#DFE3FA', '#252945'),
  },
  btn: {
    primary: {
      bg: mode('rgb(124, 93, 250)', 'rgb(124, 93, 250)'),
      hover: mode('#7e88c3', '#7e88c3'),
      text: mode('#ffffff', '#ffffff'),
    },
    secondary: {
      bg: mode('#f9fafe', '#252945'),
      hover: mode('#dfe3fa', '#ffffff'),
      text: mode('#7e88c3', '#dfe3fa'),
    },
    tertiary: {
      bg: mode('#363b53', '#363b53'),
      hover: mode('#0c0e16', '#1e2139'),
      text: mode('#888eb0', '#dfe3fa'),
    },
    quaternary: {
      bg: mode('#F9FAFE', '#252945'),
      hover: mode('#DFE3FA', '#1e2139'),
      text: mode('#7E88C3', '#DFE3FA'),
    },
  },
  invoiceItem: {
    bg: mode('#ffffff', '#1e2139'),
  },
  invoiceStatus: {
    bg: mode('rgba(55, 59, 83, 0.06)', 'rgba(223, 227, 250, .06)'),
    text: mode('#373B53', '#dfe3fa'),
  },
  invoiceTable: {
    bg: mode('#f9fafe', '#252945'),
    footerBg: mode('#373b53', '#0C0e16'),
  },
  popup: {
    bg: mode('#ffffff', '#1e2139'),
  },
  dropdown: {
    bg: mode('#ffffff', '#252945'),
    shadow: mode('rgba(72, 84, 159, 0.25)', 'rgba(0, 0, 0, 0.25)'),
  },
  checkbox: {
    bg: mode('#dfe3fa', '#1e2139'),
  },
  text: {
    heading: mode('#0C0E16', '#ffffff'),
    bodyA: mode('#888eb0', '#dfe3Fa'),
    bodyB: mode('#858BB2', '#ffffff'),
    formLabel: mode('#7E88C3', '#dfe3fa'),
    link: mode('#0c0e16', '#ffffff'),
    linkHover: mode('#7e88c3', '#888eb0'),
    placeholder: mode('rgba(12, 14, 22, .4)', '#fff'),
  },
};
