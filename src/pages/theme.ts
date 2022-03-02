import { createTheme } from '@mui/material/styles'
import { lightGreen, red } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      light: '#000000',
      main: '#000000',
      dark: '#000000'
    },
    secondary: {
      light: lightGreen.A200,
      main: lightGreen.A400,
      dark: lightGreen.A700
    },
    error: {
      main: red.A400
    }
  }
})

export default theme
