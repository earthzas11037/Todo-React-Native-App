module.exports = {
  white: '#ffffff',
  black: '#000000',
  neutral: {
    // Stronger neutrals for better contrast
    100: '#F0F2F5',
    200: '#E4E6EB',
    300: '#C9CED4',
    400: '#AFB8C2',
    500: '#8E98A6',
    600: '#6B707B',
    700: '#4D535C',
    800: '#32373F',
    900: '#1A1E24'
  },
  primary: {
    // Rich, Deep Blue
    100: '#CCE5F5',
    200: '#99CCE6',
    300: '#66B3D6',
    400: '#3399C7',
    500: '#0080B8', // Main primary color
    600: '#0073A6',
    700: '#006694',
    800: '#005982',
    900: '#004C70',
    o: {
      // Opacity variants based on primary 500
      lighter: '#0080B814',
      light: '#0080B829',
      main: '#0080B83D',
      dark: '#0080B852',
      darker: '#0080B861'
    }
  },
  secondary: {
    // Muted, Earthy Green-Gray
    100: '#E6EAE4',
    200: '#CCD3C8',
    300: '#B3BDAE',
    400: '#99A894',
    500: '#80937A', // Main secondary color
    600: '#73856F',
    700: '#667764',
    800: '#596959',
    900: '#4C5C4E',
    o: {
      // Opacity variants based on secondary 500
      lighter: '#80937A14',
      light: '#80937A29',
      main: '#80937A3D',
      dark: '#80937A52',
      darker: '#80937A61'
    }
  },
  success: {
    // Vibrant Emerald Green
    100: '#D4F7D4',
    200: '#AAEEAB',
    300: '#80E681',
    400: '#55DC58',
    500: '#2BCD2D', // Main success color
    600: '#26B928',
    700: '#23A824',
    800: '#209620',
    900: '#1D851C',
    o: {
      // Opacity variants based on success 500
      lighter: '#2BCD2D14',
      light: '#2BCD2D29',
      main: '#2BCD2D3D',
      dark: '#2BCD2D52',
      darker: '#2BCD2D61'
    }
  },
  warning: {
    // Bold Amber Orange
    100: '#FFEECC',
    200: '#FFDD99',
    300: '#FFCC66',
    400: '#FFBB33',
    500: '#FFAA00', // Main warning color
    600: '#E69900',
    700: '#CC8800',
    800: '#B37700',
    900: '#996600',
    o: {
      // Opacity variants based on warning 500
      lighter: '#FFAA0014',
      light: '#FFAA0029',
      main: '#FFAA003D',
      dark: '#FFAA0052',
      darker: '#FFAA0061'
    }
  },
  error: {
    // Strong Crimson Red
    100: '#FFCCCC',
    200: '#FF9999',
    300: '#FF6666',
    400: '#FF3333',
    500: '#FF0000', // Main error color
    600: '#E60000',
    700: '#CC0000',
    800: '#B30000',
    900: '#990000',
    o: {
      // Opacity variants based on error 500
      lighter: '#FF000014',
      light: '#FF000029',
      main: '#FF00003D',
      dark: '#FF000052',
      darker: '#FF000061'
    }
  },
  info: {
    // Vivid Cyan Blue
    100: '#CCF3FF',
    200: '#99E8FF',
    300: '#66DCFF',
    400: '#33D1FF',
    500: '#00C5FF', // Main info color
    600: '#00B0E6',
    700: '#009CCA',
    800: '#0088AE',
    900: '#007597',
    o: {
      // Opacity variants based on info 500
      lighter: '#00C5FF14',
      light: '#00C5FF29',
      main: '#00C5FF3D',
      dark: '#00C5FF52',
      darker: '#00C5FF61'
    }
  },
  special: {
    primary: {
      // Rich Purple
      100: '#E5CCFF',
      200: '#CC99FF',
      300: '#B366FF',
      400: '#9933FF',
      500: '#8000FF', // Main special primary color
      600: '#7300E6',
      700: '#6600CC',
      800: '#5900B3',
      900: '#4C0099',
      o: {
        // Opacity variants based on special.primary 500
        lighter: '#8000FF14',
        light: '#8000FF29',
        main: '#8000FF3D',
        dark: '#8000FF52',
        darker: '#8000FF61'
      }
    }
  },
  action: {
    // Action states with clearer contrast
    focus: '#DBDFE5',
    disabled: '#BFC5CC',
    active: '#7F8791',
    hover: '#F5F7FA',
    selected: '#ECEEF2'
  },
  main: {
    color: '#24292E' // Very dark gray, almost black, for main text
  },
  divider: '#D5D9DF',
  outline: {
    border: '#BCC2C9'
  },
  input: {
    border: '#C1C7CE'
  },
  backdrop: {
    overlay: '#6D747D' // Darker overlay
  },
  gray: {
    // Based on main.color with opacity
    o: {
      lighter: '#24292E14',
      light: '#24292E29',
      main: '#24292E3D',
      dark: '#24292E52',
      darker: '#24292E61'
    }
  },
  snackbar: '#24292E', // Matches main.color
  body: {
    bg: '#F9FAFB' // Slightly off-white background
  },
  paper: {
    bg: '#FFFFFF' // Keep white for paper
  },
  table: {
    header: '#F5F7FA' // Light gray for table headers
  },
  chat: {
    bg: '#EAF0F5' // Light, cool gray for chat background
  },
  track: {
    bg: '#E0E5EB' // Medium light gray for track
  },
  grey: {
    light: '#F5F5F5' // Standard light grey
  },
  text: {
    primary: '#33383F', // Darker primary text
    secondary: '#5C6269', // Stronger secondary text
    disabled: '#A0A6AD' // Clearer disabled text
  },
  gradient: {
    primary: {
      colors: ['#0080B8', '#3399C7', '#66B3D6'], // Gradient using new primary shades
      start: [0, 0],
      end: [1, 0]
    }
  },
  // Box shadows updated to use the new 500-level strong colors for clear visibility
  boxShadow: {
    'primary-small': '0px 2px 6px 0px rgba(0, 128, 184, 0.30)',
    'primary-medium': '0px 4px 16px 0px rgba(0, 128, 184, 0.40)',
    'primary-large': '0px 6px 20px 0px rgba(0, 128, 184, 0.50)',
    'secondary-small': '0px 2px 6px 0px rgba(128, 147, 122, 0.30)',
    'secondary-medium': '0px 4px 16px 0px rgba(128, 147, 122, 0.40)',
    'secondary-large': '0px 6px 20px 0px rgba(128, 147, 122, 0.50)',
    'info-small': '0px 2px 6px 0px rgba(0, 197, 255, 0.30)',
    'info-medium': '0px 4px 16px 0px rgba(0, 197, 255, 0.40)',
    'info-large': '0px 6px 20px 0px rgba(0, 197, 255, 0.50)',
    'warning-small': '0px 2px 6px 0px rgba(255, 170, 0, 0.30)',
    'warning-medium': '0px 4px 16px 0px rgba(255, 170, 0, 0.40)',
    'warning-large': '0px 6px 20px 0px rgba(255, 170, 0, 0.50)',
    'error-small': '0px 2px 6px 0px rgba(255, 0, 0, 0.30)',
    'error-medium': '0px 4px 16px 0px rgba(255, 0, 0, 0.40)',
    'error-large': '0px 6px 20px 0px rgba(255, 0, 0, 0.50)',
    'special-small': '0px 2px 6px 0px rgba(128, 0, 255, 0.30)',
    'special-medium': '0px 4px 16px 0px rgba(128, 0, 255, 0.40)',
    'special-large': '0px 6px 20px 0px rgba(128, 0, 255, 0.50)',
    'gray-small': '0px 2px 6px 0px rgba(36, 41, 46, 0.30)',
    'gray-medium': '0px 4px 16px 0px rgba(36, 41, 46, 0.40)',
    'gray-large': '0px 6px 20px 0px rgba(36, 41, 46, 0.50)'
  }
}
