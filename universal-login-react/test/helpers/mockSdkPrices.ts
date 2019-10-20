import UniversalLoginSDK from '@universal-login/sdk';

export const mockSdkPrices = (sdk: UniversalLoginSDK) => {
  sdk.priceObserver.getCurrentPrices = () => {
    return Promise.resolve({ETH: {USD: 100, DAI: 99, ETH: 1}});
  };
  return sdk.priceObserver.getCurrentPrices;
};
