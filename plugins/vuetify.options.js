import IconsSvg from '~/constants/icons-svg'
import Icons from '~/constants/icons'

export default {
  theme: {
    dark: false,
    options: {
      customProperties: true
    },
    themes: {
      dark: {
        primary: '#00BBBF',
        primaryOne: '#33C9CC',
        primaryTwo: '#80DDDF',
        primaryThree: '#80DDDF',
        primaryFour: '#007073',
        secondary: '#E5f8f8',
        title: '#E5F8F8',
        broker: '#FF8B00',
        travel: '#FF0055',
        security: '#904AFF',
        mobile: '#00E1FF',
        data: '#FFE600',
        energy: '#1EF460',
        consulting: '#8DB9CC',
        white: '#E5F8F8',
        // original whiteblue #80DDDF
        whiteblue: '#007073',
        pureblack: '#0D0D0D',
        blackblue: '#001313',
        success: '#158D01',
        error: '#D61616',
        warning: '#F37B0C',
        background: '#1f2b33',
        placeholderBase: '#424C5A',
        placeholder: '#C4C4C4',
        expired: '#717D89',
        /* Extra Dark Mode Colors */
        container: '#232D36',
        backColor: '#262E35',
        card: '#101D25',
        header_menu: '#232D36',
        selected: '#29303D',
        /* Other Custom Colors */
        customText: '#158D01',
        btnText: '#FFFFFF'
      },
      light: {
        primary: '#00BBBF',
        primaryOne: '#33C9CC',
        primaryTwo: '#80DDDF',
        primaryThree: '#009699',
        primaryFour: '#007073',
        secondary: '#817F82',
        title: '#1C2D38',
        broker: '#FF8B00',
        travel: '#FF0055',
        security: '#904AFF',
        mobile: '#00E1FF',
        data: '#FFE600',
        energy: '#1EF460',
        consulting: '#8DB9CC',
        white: '#FFFFFF',
        whiteblue: '#E5F8F8',
        pureblack: '#060606',
        blackblue: '#001313',
        success: '#158D01',
        error: '#D61616',
        warning: '#F37B0C',
        background: '#F0F0F0',
        placeholderBase: '#424C5A',
        placeholder: '#C4C4C4',
        expired: '#B7B6BC',
        /* Extra Dark Mode Colors */
        container: '#FFFFFF',
        backColor: '#FFFFFF',
        card: '#FFFFFF',
        header_menu: '#FFFFFF',
        selected: '#FFFFFF',
        /* Other Custom Colors */
        customText: '#158D01',
        btnText: '#00BBBF'
      }
    }
  },
  icons: {
    values: { ...Icons, ...IconsSvg }
  }
}
