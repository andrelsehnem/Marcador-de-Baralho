import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../shared/contexts/ThemeContext';
import { COLOR_THEME_OPTIONS } from '../../shared/constants/colors';
import { usePurchase } from '../../shared/contexts/PurchaseContext';
import { useBillingPurchase } from '../../shared/hooks/useBillingPurchase';

interface SettingsScreenProps { onBack: () => void; }

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { theme, effectiveTheme, toggleTheme, colorTheme, setColorTheme, colors, appearance, isModeConfigurable } = useTheme();
  const { isPurchased, loading: purchaseStatusLoading } = usePurchase();
  const { launchBillingFlow, loading: purchaseLoading } = useBillingPurchase();
  const isDark = effectiveTheme === 'dark';
  const backgroundColor = appearance.background;
  const surfaceColor = appearance.surface;
  const textColor = appearance.text;
  const surfaceTextColor = appearance.surfaceText;
  const secondaryTextColor = appearance.mutedText;
  const accentColor = appearance.action;
  const borderColor = appearance.border;
  const normalThemeOptions = COLOR_THEME_OPTIONS.filter((option) => option.fixedMode === null);
  const teamThemeOptions = COLOR_THEME_OPTIONS.filter((option) => option.fixedMode !== null);
  const displayedDarkMode = isModeConfigurable ? theme === 'dark' : isDark;

  const renderThemeOption = (option: (typeof COLOR_THEME_OPTIONS)[number]) => {
    const isSelected = colorTheme === option.id;
    const isTeamTheme = option.fixedMode !== null;
    const isLocked = isTeamTheme && !isPurchased;
    const isLoadingPurchase = isLocked && purchaseLoading;
    const isCheckingPurchase = isTeamTheme && purchaseStatusLoading;
    return (
      <TouchableOpacity
        key={option.id}
        style={[styles.themeCard, isLocked && styles.lockedThemeCard, { backgroundColor: surfaceColor, borderColor: isSelected ? accentColor : borderColor, borderWidth: isSelected ? 2 : 1 }]}
        onPress={() => isLocked ? launchBillingFlow() : setColorTheme(option.id)}
        disabled={isLoadingPurchase || isCheckingPurchase}
        activeOpacity={0.75}
        accessibilityRole={isLocked ? 'button' : 'radio'}
        accessibilityState={{ checked: isSelected, disabled: isLoadingPurchase || isCheckingPurchase }}
        accessibilityLabel={`Tema ${option.name}${isLocked ? ', bloqueado' : ''}`}
        accessibilityHint={isLocked ? 'Compre o produto Remover anúncios para liberar este tema' : undefined}
      >
        <View style={styles.preview}>
          {option.preview.map((previewColor) => <View key={previewColor} style={[styles.previewColor, { backgroundColor: previewColor }]} />)}
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.optionTitle, { color: surfaceTextColor }]}>{option.name}</Text>
          <Text style={[styles.optionDescription, { color: surfaceTextColor }]}>{option.description}</Text>
        </View>
        {isLoadingPurchase ? (
          <ActivityIndicator size="small" color={accentColor} />
        ) : isLocked ? (
          <View style={[styles.lockBadge, { borderColor }]}>
            <Text style={[styles.lockIcon, { color: surfaceTextColor }]}>🔒</Text>
          </View>
        ) : (
          <View style={[styles.radio, { borderColor: isSelected ? accentColor : borderColor }]}>
            {isSelected && <View style={[styles.radioDot, { backgroundColor: accentColor }]} />}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: surfaceColor, borderColor: accentColor }]} onPress={onBack} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Voltar para a tela inicial">
          <Text style={[styles.backIcon, { color: accentColor }]}>‹</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Configurações</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: textColor }]}>Personalização</Text>
        <Text style={[styles.sectionDescription, { color: secondaryTextColor }]}>Escolha as cores e a luminosidade do marcador.</Text>
        <Text style={[styles.groupLabel, { color: secondaryTextColor }]}>TEMAS NORMAIS</Text>
        <View style={styles.optionsList}>
          {normalThemeOptions.map(renderThemeOption)}
        </View>

        <Text style={[styles.groupLabel, styles.appearanceLabel, { color: secondaryTextColor }]}>APARÊNCIA</Text>
        <View style={[styles.modeCard, !isModeConfigurable && styles.modeCardDisabled, { backgroundColor: surfaceColor, borderColor }]}>
          <View style={styles.modeCopy}>
            <View style={[styles.iconBadge, { backgroundColor: isDark ? colors.secondary : colors.background.light2 }]}>
              <Text style={[styles.modeIcon, { color: accentColor }]}>{displayedDarkMode ? '☾' : '☀'}</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.optionTitle, { color: surfaceTextColor }]}>Tema claro ou escuro</Text>
              <Text style={[styles.optionDescription, { color: surfaceTextColor }]}>
                {isModeConfigurable ? (theme === 'dark' ? 'Escuro' : 'Claro') : 'Definido pelo tema do time'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.themeToggle, { backgroundColor: displayedDarkMode ? accentColor : colors.background.light2 }]}
            onPress={toggleTheme}
            disabled={!isModeConfigurable}
            activeOpacity={0.8}
            accessibilityRole="switch"
            accessibilityState={{ checked: displayedDarkMode, disabled: !isModeConfigurable }}
            accessibilityLabel="Tema claro ou escuro"
          >
            <View style={[styles.toggleThumb, displayedDarkMode && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.groupLabel, styles.teamThemesLabel, { color: secondaryTextColor }]}>TEMAS DE TIMES</Text>
        {!isPurchased && (
          <Text style={[styles.premiumHint, { color: secondaryTextColor }]}>Disponíveis após adquirir “Remover anúncios”. Toque em um tema para liberar.</Text>
        )}
        <View style={styles.optionsList}>
          {teamThemeOptions.map(renderThemeOption)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 26, gap: 16 },
  backButton: { width: 46, height: 46, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 38, lineHeight: 38, marginTop: -4 },
  title: { fontSize: 27, fontWeight: '800' },
  scrollView: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 36 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginBottom: 6 },
  sectionDescription: { fontSize: 14, lineHeight: 20, marginBottom: 26 },
  groupLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 10 },
  optionsList: { gap: 10 },
  themeCard: { minHeight: 82, borderRadius: 18, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center' },
  lockedThemeCard: { opacity: 0.68 },
  preview: { width: 48, height: 48, borderRadius: 15, overflow: 'hidden', flexDirection: 'row' },
  previewColor: { flex: 1 },
  cardText: { marginLeft: 13, flex: 1 },
  optionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 3 },
  optionDescription: { fontSize: 13 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  lockBadge: { width: 26, height: 26, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  lockIcon: { fontSize: 13 },
  appearanceLabel: { marginTop: 26 },
  modeCard: { minHeight: 82, borderRadius: 18, borderWidth: 1, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  modeCardDisabled: { opacity: 0.58 },
  modeCopy: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBadge: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  modeIcon: { fontSize: 25 },
  themeToggle: { width: 52, height: 30, borderRadius: 15, padding: 3, justifyContent: 'center' },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },
  toggleThumbActive: { alignSelf: 'flex-end' },
  teamThemesLabel: { marginTop: 26 },
  premiumHint: { fontSize: 13, lineHeight: 18, marginTop: -3, marginBottom: 12 },
});

export default SettingsScreen;
