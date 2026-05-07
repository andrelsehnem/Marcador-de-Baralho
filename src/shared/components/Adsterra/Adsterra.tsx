import React, { useEffect, useMemo, useRef } from 'react';
import { AdsterraPlacementName, getAdsterraPlacementConfig } from '../../constants/adsterra';
import {
  isAdsterraPlacementReady,
  mountAdsterraBanner,
  mountAdsterraGlobalScript,
  mountAdsterraNativeBanner,
} from '../../services/adsterra';

interface AdsterraProps {
  placement: AdsterraPlacementName;
  style?: React.CSSProperties;
}

export const AdsterraSlot: React.FC<AdsterraProps> = ({ placement, style }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const config = useMemo(() => getAdsterraPlacementConfig(placement), [placement]);

  useEffect(() => {
    if (!containerRef.current || !isAdsterraPlacementReady(config) || config.type === 'social-bar') {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      return undefined;
    }

    if (config.type === 'native-banner') {
      return mountAdsterraNativeBanner(containerRef.current, config);
    }

    return mountAdsterraBanner(containerRef.current, config);
  }, [config]);

  if (config.type === 'social-bar' || !isAdsterraPlacementReady(config)) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        ref={containerRef}
        style={{
          minWidth: config.type === 'banner' ? config.options.width : undefined,
          minHeight: config.type === 'banner' ? config.options.height : undefined,
          width: config.type === 'native-banner' ? '100%' : undefined,
        }}
      />
    </div>
  );
};

export const AdsterraGlobal: React.FC<{ placement: AdsterraPlacementName }> = ({ placement }) => {
  const config = useMemo(() => getAdsterraPlacementConfig(placement), [placement]);

  useEffect(() => {
    if (config.type !== 'social-bar' || !isAdsterraPlacementReady(config)) {
      return undefined;
    }

    return mountAdsterraGlobalScript(`adsterra-${placement}`, config.scriptSrc);
  }, [config, placement]);

  return null;
};

export default AdsterraSlot;