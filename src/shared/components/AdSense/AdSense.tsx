import React, { useEffect } from 'react';
import { ADSENSE_CONFIG } from '../../constants/adsense';

interface AdSenseProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSense: React.FC<AdSenseProps> = ({ 
  slot, 
  format = 'auto', 
  responsive = true,
  style = { display: 'block', marginTop: '20px', marginBottom: '20px' }
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Se não tiver slot, usa auto ads (apenas script no head é suficiente)
  if (!slot) {
    return (
      <div style={style}>
        {/* Auto Ads - o script no head gerencia automaticamente */}
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={ADSENSE_CONFIG.CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive.toString()}
    />
  );
};

export default AdSense;
