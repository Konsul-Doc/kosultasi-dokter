const mainColors = {
  green1: '#0BCAD4',
  green2: '#EDFCFD',
  dark1: '#112340',
  dark2: '#495A75',
  dark3: '#8092AF',
  grey1: '#7D8797',
  grey2: '#E9E9E9',
  grey3: '#EDEEF0',
  grey4: '#B1B7C2',
  grey5: '#D2DBE2',
  blue: '#0066CB',
  black1: '#000000',
  black2: 'rgba(0,0,0,0.5)',
  red: '#E06379',
};

export const colors = {
  primary: mainColors.green1,
  secondary: mainColors.dark1,
  tertiary: mainColors.blue,
  white: 'white',
  black: 'black',
  disable: mainColors.grey3,
  skeleton: mainColors.grey5,
  // color to text
  text: {
    primary: mainColors.dark1,
    secondary: mainColors.grey1,
    menuInActive: mainColors.dark2,
    menuActive: mainColors.green1,
    subTitle: mainColors.dark3,
  },
  // color to button
  button: {
    primary: {
      background: mainColors.green1,
      text: 'white',
    },
    secondary: {
      background: 'white',
      text: mainColors.dark1,
    },
    disable: {
      background: mainColors.grey3,
      text: mainColors.grey4,
    },
  },
  // color to border
  border: mainColors.grey2,
  cardLight: mainColors.green2,
  loadingBackground: mainColors.black2,
  error: mainColors.red,
};
