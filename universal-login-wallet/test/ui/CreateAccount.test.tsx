import 'jsdom-global/register';
import React from 'react';
import {expect} from 'chai';
import {ReactWrapper} from 'enzyme';
import {utils} from 'ethers';
import {MockProvider} from 'ethereum-waffle';
import {ETHER_NATIVE_TOKEN, TEST_DAI_TOKEN} from '@unilogin/commons';
import {setupSdk} from '@unilogin/sdk/testutils';
import App from '../../src/ui/react/App';
import {Services} from '../../src/ui/createServices';
import {createPreconfiguredServices} from '../testhelpers/ServicesUnderTests';
import {mountWithContext} from '../testhelpers/CustomMount';
import {AppPage} from '../pages/AppPage';

describe('UI: Creation flow', () => {
  let appWrapper: ReactWrapper;
  let services: Services;
  let relayer: any;
  let provider: MockProvider;
  const expectedHomeBalance = '$1.98';

  before(async () => {
    provider = new MockProvider();
    const [wallet] = provider.getWallets();
    ({relayer} = await setupSdk(wallet, '33113'));
    services = await createPreconfiguredServices(provider, relayer, [ETHER_NATIVE_TOKEN.address, TEST_DAI_TOKEN.address]);
  });

  it('create wallet and disconnect roundtrip', async () => {
    appWrapper = mountWithContext(<App/>, services, ['/dashboard']);
    const appPage = new AppPage(appWrapper);
    appPage.login().clickCreateOne();
    appPage.login().approveTerms();
    await appPage.login().createNew('super-name');
    appPage.creation().chooseTopUpMethod();
    const address = appPage.creation().getAddress();
    expect(address).to.be.an('string');
    const [wallet] = provider.getWallets();
    await wallet.sendTransaction({to: address as string, value: utils.parseEther('2.0')});
    await appPage.creation().waitAndGoToWallet(4000);
    await appPage.login().waitForHomeView(expectedHomeBalance);
    expect(appWrapper.text().includes(expectedHomeBalance)).to.be.true;
    expect(appWrapper.find('a.button-secondary')).to.have.length(0);
    await appPage.dashboard().disconnect();
    await appPage.dashboard().waitForWelcomeScreen();
    expect(appWrapper.text().includes('Welcome in the Jarvis Network')).to.be.true;
  });

  after(async () => {
    appWrapper.unmount();
    await services.sdk.finalizeAndStop();
    await relayer.stop();
  });
});
