export type AdsterraWebPage =
  | 'landing'
  | 'listajogos'
  | 'truco'
  | 'cacheta'
  | 'marcador'
  | 'como-jogar-truco'
  | 'como-jogar-cacheta';

export type AdsterraViewport = 'web' | 'webmobile';

export type AdsterraPlacementName =
  | 'socialBarWebMobile'
  | 'banner320x50WebMobile'
  | 'banner728x90Web'
  | 'banner300x250Web'
  | 'banner160x600Web'
  | 'banner160x300Web'
  | 'banner468x60Web'
  | 'nativeBannerWeb';

type AdsterraPlacementType = 'social-bar' | 'banner' | 'native-banner';

interface AdsterraBannerOptions {
  key: string;
  format?: 'iframe' | 'banner' | 'interstitial';
  width: number;
  height: number;
  params?: Record<string, string | number | boolean>;
}

interface AdsterraBasePlacementConfig {
  zoneId: string;
  label: string;
  enabled: boolean;
  type: AdsterraPlacementType;
  scriptSrc: string;
}

interface AdsterraBannerPlacementConfig extends AdsterraBasePlacementConfig {
  type: 'banner';
  options: AdsterraBannerOptions;
}

interface AdsterraSocialBarPlacementConfig extends AdsterraBasePlacementConfig {
  type: 'social-bar';
}

interface AdsterraNativeBannerPlacementConfig extends AdsterraBasePlacementConfig {
  type: 'native-banner';
  containerId: string;
}

export type AdsterraPlacementConfig =
  | AdsterraBannerPlacementConfig
  | AdsterraSocialBarPlacementConfig
  | AdsterraNativeBannerPlacementConfig;

interface AdsterraPagePlan {
  globalPlacements: AdsterraPlacementName[];
  contentPlacement?: AdsterraPlacementName;
  footerPlacement?: AdsterraPlacementName;
  reservedPlacements?: AdsterraPlacementName[];
}

export const ADSTERRA_CONFIG: Record<AdsterraPlacementName, AdsterraPlacementConfig> = {
  socialBarWebMobile: {
    zoneId: '29261850',
    label: 'SocialBar_1',
    enabled: true,
    type: 'social-bar',
    scriptSrc: 'https://pl29362349.profitablecpmratenetwork.com/4d/a6/2b/4da62b20bb9048cb6022f744069ed6ab.js',
  },
  banner320x50WebMobile: {
    zoneId: '29261846',
    label: '320x50_1',
    enabled: false,
    type: 'banner',
    scriptSrc: 'https://www.highperformanceformat.com/d326ebf439aaee7fd7add7e12c54b732/invoke.js',
    options: {
      key: 'd326ebf439aaee7fd7add7e12c54b732',
      format: 'iframe',
      width: 320,
      height: 50,
      params: {},
    },
  },
  banner728x90Web: {
    zoneId: '29261847',
    label: '728x90_1',
    enabled: false,
    type: 'banner',
    scriptSrc: 'https://www.highperformanceformat.com/d42643ed8653d521c26692b0a3ed0346/invoke.js',
    options: {
      key: 'd42643ed8653d521c26692b0a3ed0346',
      format: 'iframe',
      width: 728,
      height: 90,
      params: {},
    },
  },
  banner300x250Web: {
    zoneId: '29261848',
    label: '300x250_1',
    enabled: false,
    type: 'banner',
    scriptSrc: 'https://www.highperformanceformat.com/38957d5408e329a0d34658a7d0210087/invoke.js',
    options: {
      key: '38957d5408e329a0d34658a7d0210087',
      format: 'iframe',
      width: 300,
      height: 250,
      params: {},
    },
  },
  banner160x600Web: {
    zoneId: '29261844',
    label: '160x600_1',
    enabled: false,
    type: 'banner',
    scriptSrc: 'https://www.highperformanceformat.com/68738778477679b0fae60a0ca7f23bfb/invoke.js',
    options: {
      key: '68738778477679b0fae60a0ca7f23bfb',
      format: 'iframe',
      width: 160,
      height: 600,
      params: {},
    },
  },
  banner160x300Web: {
    zoneId: '29261845',
    label: '160x300_1',
    enabled: false,
    type: 'banner',
    scriptSrc: 'https://www.highperformanceformat.com/6dcb66a73f67c1d86b550613afb59b89/invoke.js',
    options: {
      key: '6dcb66a73f67c1d86b550613afb59b89',
      format: 'iframe',
      width: 160,
      height: 300,
      params: {},
    },
  },
  banner468x60Web: {
    zoneId: '29261849',
    label: '468x60_1',
    enabled: false,
    type: 'banner',
    scriptSrc: 'https://www.highperformanceformat.com/c7f03ba793c2bbc8dee4d9a6969f9496/invoke.js',
    options: {
      key: 'c7f03ba793c2bbc8dee4d9a6969f9496',
      format: 'iframe',
      width: 468,
      height: 60,
      params: {},
    },
  },
  nativeBannerWeb: {
    zoneId: '29261843',
    label: 'NativeBanner_1',
    enabled: true,
    type: 'native-banner',
    scriptSrc: 'https://pl29362342.profitablecpmratenetwork.com/16cb7af06e67301f297511265efa8c7e/invoke.js',
    containerId: 'container-16cb7af06e67301f297511265efa8c7e',
  },
};

const MOBILE_PLAN: AdsterraPagePlan = {
  globalPlacements: ['socialBarWebMobile'],
};

const DESKTOP_CONTENT_PLAN: AdsterraPagePlan = {
  globalPlacements: [],
  reservedPlacements: ['nativeBannerWeb', 'banner300x250Web', 'banner160x600Web', 'banner160x300Web'],
};

const DESKTOP_GAME_PLAN: AdsterraPagePlan = {
  globalPlacements: [],
  reservedPlacements: ['banner468x60Web'],
};

export const ADSTERRA_PAGE_PLAN: Record<AdsterraWebPage, Record<AdsterraViewport, AdsterraPagePlan>> = {
  landing: {
    web: DESKTOP_CONTENT_PLAN,
    webmobile: MOBILE_PLAN,
  },
  listajogos: {
    web: DESKTOP_CONTENT_PLAN,
    webmobile: MOBILE_PLAN,
  },
  'como-jogar-truco': {
    web: DESKTOP_CONTENT_PLAN,
    webmobile: MOBILE_PLAN,
  },
  'como-jogar-cacheta': {
    web: DESKTOP_CONTENT_PLAN,
    webmobile: MOBILE_PLAN,
  },
  truco: {
    web: DESKTOP_GAME_PLAN,
    webmobile: MOBILE_PLAN,
  },
  cacheta: {
    web: DESKTOP_GAME_PLAN,
    webmobile: MOBILE_PLAN,
  },
  marcador: {
    web: DESKTOP_GAME_PLAN,
    webmobile: MOBILE_PLAN,
  },
};

export const getAdsterraPlacementConfig = (placement: AdsterraPlacementName) => ADSTERRA_CONFIG[placement];

export const getAdsterraPagePlan = (page: AdsterraWebPage, viewport: AdsterraViewport) => {
  return ADSTERRA_PAGE_PLAN[page][viewport];
};