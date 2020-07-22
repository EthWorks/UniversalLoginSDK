import {expect} from 'chai';
import sinon from 'sinon';
import {getMinimalAmountForFiatProvider, getMinimalAmount} from '../../../src/core/utils/getMinimalAmountForFiatProvider';
import {TopUpProvider} from '../../../src/core/models/TopUpProvider';
import {TokenPricesService, TEST_TOKEN_PRICE_IN_ETH, TEST_DAI_TOKEN} from '@unilogin/commons';

describe('getMinimalAmountForFiatProvider', () => {
  describe('RAMP provider', () => {
    const paymentMethod = TopUpProvider.RAMP;
    const tokenPricesService = new TokenPricesService();

    before(() => {
      sinon.stub(tokenPricesService, 'getEtherPriceInCurrency').resolves('150');
    });

    it('return provider minimal amount', async () => {
      const bigMinimalAmount = '2';
      expect((await getMinimalAmountForFiatProvider(paymentMethod, bigMinimalAmount, tokenPricesService))[0]).to.eq('2');
    });

    it('return UniLogin minimal amount', async () => {
      const smallMinimalAmount = '0.0001';
      expect((await getMinimalAmountForFiatProvider(paymentMethod, smallMinimalAmount, tokenPricesService))[0]).to.eq('0.004');
    });

    it('return correct UniLogin minimal amount for DAI', async () => {
      const smallMinimalAmount = '0.0000002';
      (tokenPricesService.getTokenPriceInEth as any) = () => TEST_TOKEN_PRICE_IN_ETH;
      expect((await getMinimalAmountForFiatProvider(paymentMethod, smallMinimalAmount, tokenPricesService, TEST_DAI_TOKEN))[0]).to.eq('0.8');
    });

    it('return correct minimal amount for DAI', async () => {
      const bigMinimalAmount = '1500.5';
      (tokenPricesService.getTokenPriceInEth as any) = () => TEST_TOKEN_PRICE_IN_ETH;
      expect((await getMinimalAmountForFiatProvider(paymentMethod, bigMinimalAmount, tokenPricesService, TEST_DAI_TOKEN))[0]).to.eq('1500.5');
    });

    it('return rounded provider minimal amount for Wyre', async () => {
      const bigMinimalAmount = '2.000000156565';
      const paymentMethod = TopUpProvider.WYRE;
      expect(await getMinimalAmountForFiatProvider(paymentMethod, bigMinimalAmount, tokenPricesService)).to.eq('2.0001');
    });

    after(() => {
      sinon.restore();
    });
  });
});

describe('UNIT: getMinimalAmount', () => {
  const tokenPricesService = new TokenPricesService();

  before(() => {
    sinon.stub(tokenPricesService, 'getEtherPriceInCurrency').resolves('1');
  });

  it('returns 2 for Ramp and future wallet', async () => {
    const walletService = {
      getRequiredDeploymentBalance: () => '2',
      isKind: (state: string) => state === 'Future',
    };
    const paymentMethod = TopUpProvider.RAMP;
    expect((await getMinimalAmount(walletService as any, paymentMethod, tokenPricesService))[0]).to.eq('2');
  });

  it('returns 30 for Safello and future wallet', async () => {
    const walletService = {
      getRequiredDeploymentBalance: () => '2',
      isKind: (state: string) => state === 'Future',
    };
    const paymentMethod = TopUpProvider.SAFELLO;
    expect(await getMinimalAmount(walletService as any, paymentMethod, tokenPricesService)).to.eq('30');
  });

  it('returns 30 for Safello and deployed wallet', async () => {
    const walletService = {
      isKind: (state: string) => state === 'Deployed',
    };
    const paymentMethod = TopUpProvider.SAFELLO;
    expect(await getMinimalAmount(walletService as any, paymentMethod, tokenPricesService)).to.eq('30');
  });

  it('returns 0.6 for Ramp and deployed wallet', async () => {
    const walletService = {
      isKind: (state: string) => state === 'Deployed',
    };
    const paymentMethod = TopUpProvider.RAMP;
    expect((await getMinimalAmount(walletService as any, paymentMethod, tokenPricesService))[0]).to.eq('0.6');
  });

  it('Throw error if invalid wallet state', async () => {
    const walletService = {
      state: {kind: 'None'},
      isKind: (state: string) => state === 'None',
    };
    const paymentMethod = TopUpProvider.RAMP;
    expect(() => getMinimalAmount(walletService as any, paymentMethod, tokenPricesService)).to.throw('Wallet state is None, but expected Future or Deployed');
  });

  after(() => {
    sinon.restore();
  });
});
