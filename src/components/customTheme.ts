import {
  orangeA200, orangeA100, orangeA400,
  grey900,
  fullWhite
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#315B85',
    primary2Color: '#315B85',
    accent1Color: '#DEA326',
    accent2Color: '#DEA326',
    accent3Color: '#DEA326',
    textColor: '#212121',

    alternateTextColor: fullWhite,
    canvasColor: fullWhite,
    borderColor: fade(grey900, 0.3),
    disabledColor: fade(grey900, 0.3),
    pickerHeaderColor: fade(grey900, 0.12),
    clockCircleColor: fade(grey900, 0.12)
  }
};


