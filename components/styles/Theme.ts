export interface Theme {
  padding: string;
  fontMain: string;
  fontSecondary: string;
  bgColor: string;
  textPrimary: string;
  textSecondary: string;
  colorUnfocused: string;
  borderColor: string;
  textPrimaryDimmed: string;
  minWidthSmall: number;
  maxWidthSmall: number;
  minWidthMedium: number;
  maxWidthMedium: number;
  nprogress: string;
  textSpecial: string;
}

const theme = {
  padding: '10',
  fontMain: 'Fira Mono',
  fontSecondary: 'Playfair Display',
  minWidthSmall: 320,
  maxWidthSmall: 479,
  minWidthMedium: 480,
  maxWidthMedium: 767,
  nprogress: 'red'
};

export const LightTheme: Theme = {
  ...theme,
  bgColor: 'rgb(255, 255, 255)',
  textPrimary: 'rgb(45,45, 45)',
  textPrimaryDimmed: 'rgb(70, 70, 70)',
  borderColor: 'white',
  textSecondary: 'rgb(50,50,50)',
  textSpecial: 'rgb(255, 22, 0)',
  colorUnfocused: 'rgb(150,150,150)'
};
