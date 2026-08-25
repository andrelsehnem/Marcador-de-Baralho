import { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useThemeStyles = () => {
  const { theme, colors } = useTheme();

  return useMemo(() => {
    const isDark = theme === 'dark';

    return {
      theme,
      isDark,
      containerBg: isDark ? colors.background.dark : colors.background.light,
      containerBg2: isDark ? colors.background.dark2 : colors.background.light2,
      textPrimary: isDark ? colors.text.dark : colors.text.light,
      textSecondary: isDark ? colors.text.dark : colors.text.light,
      buttonPrimary: {
        bg: colors.primary,
        text: '#ffffff',
      },
      buttonPrimaryAlt: {
        bg: colors.primaryLight,
        text: '#ffffff',
      },
      buttonSecondary: {
        bg: colors.secondary,
        text: isDark ? colors.text.dark : colors.text.primary,
        border: colors.border,
        borderWidth: 1,
      },
      surface: isDark ? colors.background.dark2 : colors.surface,
    };
  }, [colors, theme]);
};
