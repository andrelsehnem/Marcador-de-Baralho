import { AdsterraPlacementConfig } from '../constants/adsterra';

const normalizeAdsterraScriptSrc = (scriptSrc: string) => {
  if (!scriptSrc) {
    return '';
  }

  if (scriptSrc.startsWith('//')) {
    return `https:${scriptSrc}`;
  }

  return scriptSrc;
};

export const isAdsterraPlacementReady = (config?: AdsterraPlacementConfig | null) => {
  if (!config?.enabled || !config.scriptSrc) {
    return false;
  }

  if (config.type === 'banner') {
    return Boolean(config.options.key && config.options.width && config.options.height);
  }

  if (config.type === 'native-banner') {
    return Boolean(config.containerId);
  }

  return true;
};

export const mountAdsterraBanner = (
  container: HTMLDivElement,
  config: Extract<AdsterraPlacementConfig, { type: 'banner' }>
) => {
  const normalizedScriptSrc = normalizeAdsterraScriptSrc(config.scriptSrc);
  const payload = {
    ...config.options,
    params: config.options.params ?? {},
  };

  container.innerHTML = '';

  const optionsScript = document.createElement('script');
  optionsScript.type = 'text/javascript';
  optionsScript.text = `atOptions = ${JSON.stringify(payload)};`;

  const invokeScript = document.createElement('script');
  invokeScript.type = 'text/javascript';
  invokeScript.src = normalizedScriptSrc;
  invokeScript.async = false;

  container.appendChild(optionsScript);
  container.appendChild(invokeScript);

  return () => {
    container.innerHTML = '';
  };
};

export const mountAdsterraNativeBanner = (
  container: HTMLDivElement,
  config: Extract<AdsterraPlacementConfig, { type: 'native-banner' }>
) => {
  const normalizedScriptSrc = normalizeAdsterraScriptSrc(config.scriptSrc);

  container.innerHTML = '';

  const slotContainer = document.createElement('div');
  slotContainer.id = config.containerId;

  const invokeScript = document.createElement('script');
  invokeScript.async = true;
  invokeScript.setAttribute('data-cfasync', 'false');
  invokeScript.src = normalizedScriptSrc;

  container.appendChild(slotContainer);
  container.appendChild(invokeScript);

  return () => {
    container.innerHTML = '';
  };
};

export const mountAdsterraGlobalScript = (scriptId: string, scriptSrc: string) => {
  const normalizedScriptSrc = normalizeAdsterraScriptSrc(scriptSrc);

  if (!normalizedScriptSrc) {
    return () => undefined;
  }

  const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (existingScript) {
    if (existingScript.src !== normalizedScriptSrc) {
      existingScript.src = normalizedScriptSrc;
    }

    return () => undefined;
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.type = 'text/javascript';
  script.src = normalizedScriptSrc;
  script.async = true;

  document.body.appendChild(script);

  return () => {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
  };
};