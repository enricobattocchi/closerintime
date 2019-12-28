import React from "react"
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#fa7921' },
  secondary: { main: '#ffffff' },
};

const theme = createMuiTheme({ typography: {
    fontWeight: 'normal'
  },palette });

theme.typography.h1 = {
  fontFamily: [
    'Fredoka One',
    'Raleway',
    'sans-serif',
  ].join(','),
  fontWeight: 400,
  fontSize: '2.5em'
}
theme.typography.h2 = {
  fontFamily: [
    'Fredoka One',
    'Raleway',
    'sans-serif',
  ].join(','),
  fontWeight: 400,
  fontSize: '2em',
  color: '#757575'
}

theme.typography.body1 = {
  fontFamily: [
    'Raleway',
    'sans-serif',
  ].join(','),
  fontWeight: 400
}

theme.typography.body2 = {
  fontFamily: [
    'Raleway',
    'sans-serif',
  ].join(','),
  fontWeight: 400,
  color: theme.palette.primary.main
}

export default ({ element }) => {
  return <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
}
