import { extendTheme } from '@chakra-ui/react';
import theme, { Theme } from '@chakra-ui/theme';
import { mode, Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  ...theme.styles,
  global: (props) => ({
    ...theme.styles.global,
    body: {
      bg: mode('#ebeced', '#0b0914')(props),
    },
    '*': {
      borderColor: mode('#d8d9da', '#252945')(props),
    },
    '&::-webkit-scrollbar': {
      width: '0px',
    },
    '&::-webkit-scrollbar-track': {
      width: '0px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#252945',
      borderRadius: '0px',
    },
    button: {
      color: mode('#252945', '#7e88c3')(props),
      _hover: {
        backgroundColor: mode('#f5f2f0', '#252945')(props),
        color: mode('#0c0e16', '#DFE3FA')(props),
      },
    },
    a: {
      color: mode('#888eb0', '#dfe3Fa')(props),
      _hover: {
        color: mode('#0c0e16', '#1e2139')(props),
      },
    },
    input: {
      backgroundColor: mode('#ebeced', '#0b0914')(props),
      background: mode('#ebeced', '#0b0914')(props),
      borderColor: mode('#DFE3FA', '#252945')(props),
      _hover: {
        color: mode('#0c0e16', '#ffffff')(props),
      },
    },
    fontFamily: 'body',
    fontWeight: 'light',
    color: mode('gray.100', 'whiteAlpha.900')(props),
    bg: mode('gray.700', 'gray.900')(props),
    borderColor: mode('#d8d9da', '#252945')(props),
    th: {
      borderColor: mode('#d8d9da', '#252945')(props),
    },
  }),
};
// borderColor="#d8d9da"
// #252945
const globalTheme = extendTheme({
  components: {
    Box: {
      baseStyle: {
        borderColor: '#d8d9da',
      },
    },
    Table: {
      baseStyle: {
        borderColor: '#d8d9da',
      },
    },
    table: {
      baseStyle: {
        th: {
          // borderColor: mode('#d8d9da', '#252945')(props)
        },
      },
    },
  },
  colors: {
    gray: {
      100: '#d8d9da',
    },
    test: {
      100: '#f6f6f6',
      200: '#ddd',
      300: '#DFE3FA',
      400: '#7e88c3', // border color hightlight
      500: '#888eb0',
      600: '#373B53',
      700: '#6400e4',
      800: '#252945', // bg
      900: '#141625', // bg
    },
    invtest2erse: {
      100: '#f6f6f6',
      200: '#ddd',
      300: '#252945',
      400: '#ddd', // border color hightlight
      800: '#f6f6f6', // bg
      900: '#f9fafe', // bg
      1000: '#aaa3ae',
    },
    pbase: {
      50: '#f4e3ff',
      100: '#d5b2ff',
      200: '#b77fff',
      300: '#9b4cff',
      400: '#7e1aff',
      500: '#6500e6',
      600: '#4e00b4',
      700: '#380082',
      800: '#220050',
      900: '#0d0020',
    },
    dark: {
      50: '#f0eefa',
      100: '#d3d0e1',
      200: '#b6b1cb',
      300: '#9992b6',
      400: '#7c74a2', // borde color
      500: '#625a88',
      600: '#4c466a',
      700: '#37324c',
      800: '#211e2f', // base editor
      900: '#0b0914', // body bg
    },
    brand: {
      mid50bg: '#f6f1ef', // high bg
      light200bg: '#bdbfc4', // md bg
      light400bd: '#8a8c8f', // high bd
      mid400bd: '#a28275', // md bd
      yellow: '#f8c554',
      orange: '#d4825c', // bo
      verge: '#030303',
      purple: '#aa647c', // hl3
      ppl: '#786e89', // bds
      dark400bd: '#7c74a2',
      green: '#9d9c7b',
      highlightgreen: '#83c89d', // hl1
      editor: '#211e2f', // base editor
      dark: '#141625', // low bg
      dark900bg: '#0b0914', // body bg
    },
    highlight: {
      green: '#00ebc7',
      red: '#ff5470', // !!!!!!
      yellow: '#fde24f',
      black: '#1b2d45',
      vlue: '#00214d', // !!!
      dark: '#222',
      gray: '#bfbfbf',
      light: '#f2f4f6',
      white: '#fff',
    },
  },
  config: {
    ...theme.config,
    cssVarPrefix: 'ch',
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
  styles,
});

export default globalTheme;
