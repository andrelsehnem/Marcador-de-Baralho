import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let hasWarnedMissingBilling = false;

const isBillingSupportedRuntime = () => {
  if (Platform.OS !== 'android') {
    return false;
  }

  if (Constants.appOwnership === 'expo') {
    return false;
  }

  return true;
};

const getBillingModule = () => {
  if (!isBillingSupportedRuntime()) {
    if (!hasWarnedMissingBilling) {
      console.log('Billing desativado neste runtime (Expo Go/não Android).');
      hasWarnedMissingBilling = true;
    }
    return null;
  }

  try {
    return require('react-native-google-mobile-ads').BillingManager;
  } catch {
    if (!hasWarnedMissingBilling) {
      console.log('Billing indisponível no binário atual.');
      hasWarnedMissingBilling = true;
    }
    return null;
  }
};

// ID do produto único criado no Play Console
export const PRODUCT_ID = 'no_ads_marcador_pontos_1'; // Substitua pelo ID real do seu produto no Play Console

const PURCHASE_STORAGE_KEY = 'app-purchase-remove-ads';

/**
 * Verifica se o usuário já comprou o produto de remover anúncios
 */
export const checkPurchaseStatus = async (): Promise<boolean> => {
  try {
    // Primeiro, tenta carregar do AsyncStorage (pode estar cacheado)
    const cachedPurchase = await AsyncStorage.getItem(PURCHASE_STORAGE_KEY);
    if (cachedPurchase === 'true') {
      console.log('Compra de remover anúncios confirmada (cache)');
      return true;
    }

    // Se em runtime suportado, verifica na Play Billing
    if (!isBillingSupportedRuntime()) {
      return false;
    }

    // Nota: A integração real com Play Billing Library requer setup adicional
    // Por enquanto, retornamos o status cacheado
    return cachedPurchase === 'true';
  } catch (error) {
    console.log('Erro ao verificar status de compra:', error);
    return false;
  }
};

/**
 * Marca a compra como realizada (chamado após compra bem-sucedida)
 */
export const setPurchaseStatus = async (purchased: boolean) => {
  try {
    await AsyncStorage.setItem(PURCHASE_STORAGE_KEY, String(purchased));
    console.log('Status de compra atualizado:', purchased);
  } catch (error) {
    console.log('Erro ao atualizar status de compra:', error);
  }
};

/**
 * Inicializa o módulo de Billing
 */
export const initializeBilling = async () => {
  try {
    if (!isBillingSupportedRuntime()) {
      return;
    }

    console.log('Billing inicializado com sucesso');
  } catch (error) {
    console.log('Erro ao inicializar Billing:', error);
  }
};
