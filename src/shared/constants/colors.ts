export const COLORS = {
  primary: '#FF6B35',
  primaryLight: '#FF8555',
  primaryDark: '#E55A25',
  secondaryDark: '#3b43b3',
  secondary: '#3B82F6',
  secondaryLight: '#0EA5E9',
  danger: '#D63031',
  warning: '#FDCB6E',
  background: {
    dark: '#0F172A',
    dark2: '#1E293B',
    light: '#F8FAFC',
    light2: '#E5E7EB',
  },
  surface: '#FFFFFF',
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    light: '#0F172A',
    dark : '#F1F5F9',
  },
  border: '#E0E0E0',
};

export type ColorPalette = typeof COLORS;

export type ColorThemeType =
  | 'default'
  | 'blackAndWhite'
  | 'rubroNegroCarioca'
  | 'timao'
  | 'verdao'
  | 'tricolorPaulista'
  | 'giganteDaColina'
  | 'tricolorGaucho'
  | 'colorado'
  | 'raposa'
  | 'galo'
  | 'peixe';

export interface ColorThemeDefinition {
  id: ColorThemeType;
  name: string;
  description: string;
  preview: [string, string, string];
  palette: ColorPalette;
  fixedMode: 'light' | 'dark' | null;
  fixedAppearance: ThemeAppearance | null;
}

export interface ThemeAppearance {
  background: string;
  surface: string;
  text: string;
  surfaceText: string;
  mutedText: string;
  action: string;
  onAction: string;
  border: string;
  danger: string;
  warning: string;
}

const createFixedAppearance = (
  background: string,
  surface: string,
  text: string,
  surfaceText: string,
  action: string,
  border: string,
  danger = action,
  warning = border,
): ThemeAppearance => ({
  background,
  surface,
  text,
  surfaceText,
  mutedText: text,
  action,
  onAction: getContrastTextColor(action),
  border,
  danger,
  warning,
});

const createTeamPalette = (
  darkAction: string,
  lightAction: string,
  darkBase: string,
  lightBase: string,
  accent: string,
): ColorPalette => ({
  primary: darkAction,
  primaryLight: accent,
  primaryDark: darkBase,
  secondaryDark: lightAction,
  secondary: darkBase,
  secondaryLight: accent,
  danger: accent,
  warning: accent,
  background: {
    dark: darkBase,
    dark2: darkBase,
    light: lightBase,
    light2: lightBase,
  },
  surface: lightBase,
  text: {
    primary: darkBase,
    secondary: darkBase,
    light: darkBase,
    dark: lightBase,
  },
  border: accent,
});

export const BLACK_AND_WHITE_COLORS: ColorPalette = {
  primary: '#525252',
  primaryLight: '#737373',
  primaryDark: '#262626',
  secondaryDark: '#171717',
  secondary: '#404040',
  secondaryLight: '#737373',
  danger: '#262626',
  warning: '#D4D4D4',
  background: {
    dark: '#050505',
    dark2: '#171717',
    light: '#FAFAFA',
    light2: '#E5E5E5',
  },
  surface: '#FFFFFF',
  text: {
    primary: '#0A0A0A',
    secondary: '#525252',
    light: '#0A0A0A',
    dark: '#FAFAFA',
  },
  border: '#A3A3A3',
};

export const COLOR_THEMES: Record<ColorThemeType, ColorThemeDefinition> = {
  default: {
    id: 'default', name: 'Padrão', description: 'As cores originais do aplicativo',
    preview: ['#FF6B35', '#3B82F6', '#F8FAFC'], palette: COLORS, fixedMode: null, fixedAppearance: null,
  },
  blackAndWhite: {
    id: 'blackAndWhite', name: 'Preto e Branco', description: 'Visual monocromático e alto contraste',
    preview: ['#050505', '#737373', '#FAFAFA'], palette: BLACK_AND_WHITE_COLORS, fixedMode: null, fixedAppearance: null,
  },
  rubroNegroCarioca: {
    id: 'rubroNegroCarioca', name: 'Rubro-Negro Carioca', description: 'Vermelho, preto e branco',
    preview: ['#C52613', '#000000', '#FFFFFF'], palette: createTeamPalette('#C52613', '#C52613', '#000000', '#FFFFFF', '#C52613'),
    fixedMode: 'dark', fixedAppearance: createFixedAppearance('#000000', '#FFFFFF', '#FFFFFF', '#000000', '#C52613', '#C52613'),
  },
  timao: {
    id: 'timao', name: 'Timão', description: 'Preto, branco e vermelho',
    preview: ['#000000', '#FFFFFF', '#CE1126'], palette: createTeamPalette('#CE1126', '#000000', '#000000', '#FFFFFF', '#CE1126'),
    fixedMode: 'light', fixedAppearance: createFixedAppearance('#FFFFFF', '#000000', '#000000', '#FFFFFF', '#CE1126', '#CE1126'),
  },
  verdao: {
    id: 'verdao', name: 'Verdão', description: 'Verde e branco',
    preview: ['#006437', '#FFFFFF', '#003B21'], palette: createTeamPalette('#006437', '#006437', '#003B21', '#FFFFFF', '#006437'),
    fixedMode: 'light', fixedAppearance: createFixedAppearance('#FFFFFF', '#FFFFFF', '#003B21', '#003B21', '#006437', '#003B21'),
  },
  tricolorPaulista: {
    id: 'tricolorPaulista', name: 'Tricolor Paulista', description: 'Branco, vermelho e preto',
    preview: ['#FFFFFF', '#E30613', '#000000'], palette: createTeamPalette('#E30613', '#E30613', '#000000', '#FFFFFF', '#E30613'),
    fixedMode: 'light', fixedAppearance: createFixedAppearance('#FFFFFF', '#FFFFFF', '#000000', '#000000', '#E30613', '#000000'),
  },
  giganteDaColina: {
    id: 'giganteDaColina', name: 'Gigante da Colina', description: 'Preto, branco e vermelho',
    preview: ['#000000', '#FFFFFF', '#D71920'], palette: createTeamPalette('#D71920', '#000000', '#000000', '#FFFFFF', '#D71920'),
    fixedMode: 'light', fixedAppearance: createFixedAppearance('#FFFFFF', '#FFFFFF', '#000000', '#000000', '#000000', '#D71920'),
  },
  tricolorGaucho: {
    id: 'tricolorGaucho', name: 'Tricolor Gaúcho', description: 'Azul, preto e branco',
    preview: ['#00AEEF', '#000000', '#FFFFFF'], palette: createTeamPalette('#00AEEF', '#00AEEF', '#000000', '#FFFFFF', '#00AEEF'),
    fixedMode: 'dark', fixedAppearance: createFixedAppearance('#000000', '#000000', '#FFFFFF', '#FFFFFF', '#00AEEF', '#FFFFFF'),
  },
  colorado: {
    id: 'colorado', name: 'Colorado', description: 'Vermelho e branco',
    preview: ['#E30613', '#FFFFFF', '#8B0000'], palette: createTeamPalette('#E30613', '#E30613', '#8B0000', '#FFFFFF', '#E30613'),
    fixedMode: 'light', fixedAppearance: createFixedAppearance('#FFFFFF', '#FFFFFF', '#8B0000', '#8B0000', '#E30613', '#8B0000'),
  },
  raposa: {
    id: 'raposa', name: 'Raposa', description: 'Azul e branco',
    preview: ['#003DA5', '#FFFFFF', '#1A2F70'], palette: createTeamPalette('#003DA5', '#003DA5', '#1A2F70', '#FFFFFF', '#003DA5'),
    fixedMode: 'light', fixedAppearance: createFixedAppearance('#FFFFFF', '#FFFFFF', '#1A2F70', '#1A2F70', '#003DA5', '#1A2F70'),
  },
  galo: {
    id: 'galo', name: 'Galo', description: 'Preto, branco e dourado',
    preview: ['#000000', '#FFFFFF', '#D4AF37'], palette: createTeamPalette('#D4AF37', '#000000', '#000000', '#FFFFFF', '#D4AF37'),
    fixedMode: 'dark', fixedAppearance: createFixedAppearance('#000000', '#000000', '#D4AF37', '#D4AF37', '#FFFFFF', '#D4AF37', '#FFFFFF', '#D4AF37'),
  },
  peixe: {
    id: 'peixe', name: 'Peixe', description: 'Branco, preto e cinza',
    preview: ['#FFFFFF', '#000000', '#B3B3B3'], palette: createTeamPalette('#B3B3B3', '#000000', '#000000', '#FFFFFF', '#B3B3B3'),
    fixedMode: 'light', fixedAppearance: createFixedAppearance('#FFFFFF', '#FFFFFF', '#000000', '#000000', '#000000', '#B3B3B3'),
  },
};

export const COLOR_THEME_OPTIONS = Object.values(COLOR_THEMES);

export const isColorThemeType = (value: string | null): value is ColorThemeType =>
  value !== null && Object.prototype.hasOwnProperty.call(COLOR_THEMES, value);

export function getContrastTextColor(hexColor: string): '#000000' | '#FFFFFF' {
  const hex = hexColor.replace('#', '');
  const normalized = hex.length === 3
    ? hex.split('').map((character) => character + character).join('')
    : hex;
  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
  return luminance >= 150 ? '#000000' : '#FFFFFF';
}
