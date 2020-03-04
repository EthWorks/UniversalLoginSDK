import {createServices} from '../../src/ui/createServices';
import {providers} from 'ethers';
import {testJsonRpcUrl, TEST_SDK_CONFIG, Network} from '@unilogin/commons';
import {SdkConfig, MemoryStorageService} from '@unilogin/sdk';

export const createPreconfiguredServices = async (provider: providers.Provider, relayer: any, tokens: string[]) => {
  const domains = relayer.config.ensRegistrars;
  const config = {
    network: 'test' as Network,
    jsonRpcUrl: testJsonRpcUrl,
    relayerUrl: relayer.url(),
    domains,
    tokens,
  };
  const storageService = new MemoryStorageService();
  const sdkConfig = TEST_SDK_CONFIG as SdkConfig;
  const services = createServices(config, {provider, storageService, sdkConfig});
  services.sdk.priceObserver.getCurrentPrices = () => {
    return Promise.resolve({
      ETH: {USD: 1, DAI: 1, SAI: 1, ETH: 1},
      DAI: {USD: 1, DAI: 1, SAI: 1, ETH: 1},
    });
  };
  await services.sdk.tokensDetailsStore.fetchTokensDetails();
  await services.sdk.fetchRelayerConfig();
  return services;
};
