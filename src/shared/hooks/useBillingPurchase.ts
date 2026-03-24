import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { PRODUCT_ID, setPurchaseStatus } from '../services/billing';
import { usePurchase } from '../contexts/PurchaseContext';

export const useBillingPurchase = () => {
  const [loading, setLoading] = useState(false);
  const { refreshPurchaseStatus } = usePurchase();

  const launchBillingFlow = async () => {
    try {
      if (Platform.OS !== 'android') {
        Alert.alert('Não disponível', 'Compras estão disponíveis apenas no Android.');
        return;
      }

      setLoading(true);

      // Nota: A integração real com Play Billing Library requer:
      // 1. Usar BillingClient da Play Billing Library v6.0.1+
      // 2. Chamar queryProductDetailsAsync() para obter detalhes do produto
      // 3. Chamar launchBillingFlow() para iniciar o fluxo de compra
      // 4. Verificar o resultado com acknowledgePurchase()

      // Por enquanto, simularemos com um fluxo simplificado
      Alert.alert(
        'Remover Anúncios',
        'Compre "Remover Anúncios" para aproveitar um marcador sem interrupções.\n\nVocê será redirecionado para a Play Store.',
        [
          {
            text: 'Cancelar',
            onPress: () => setLoading(false),
            style: 'cancel',
          },
          {
            text: 'Comprar',
            onPress: async () => {
              try {
                // Após compra bem-sucedida na Play Store, atualizar o status
                // (isso seria feito automaticamente pela Play Billing Library)
                await setPurchaseStatus(true);
                await refreshPurchaseStatus();
                
                Alert.alert('Sucesso', 'Compra realizada! Anúncios removidos.');
              } catch (error) {
                Alert.alert('Erro', 'Não foi possível completar a compra.');
              } finally {
                setLoading(false);
              }
            },
          },
        ]
      );
    } catch (error) {
      console.log('Erro ao iniciar compra:', error);
      Alert.alert('Erro', 'Erro ao processar compra.');
      setLoading(false);
    }
  };

  return {
    launchBillingFlow,
    loading,
  };
};
