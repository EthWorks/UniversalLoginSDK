import {expect} from 'chai';
import {ReactWrapper} from 'enzyme';
import {providers, utils, Contract} from 'ethers';
import {createFixtureLoader, getWallets, createMockProvider} from 'ethereum-waffle';
import {waitExpect} from '@universal-login/commons';
import {deployMockToken} from '@universal-login/commons/testutils';
import {WalletService} from '@universal-login/sdk';
import {setupSdk, createAndSetWallet} from '@universal-login/sdk/testutils';
import {Services} from '../../../src/ui/createServices';
import {setupUI} from '../helpers/setupUI';
import {AppPage} from '../pages/AppPage';

describe('UI: Transfer', () => {
  let appWrapper: ReactWrapper;
  let services: Services;
  let relayer: any;
  let appPage: AppPage;
  let provider: providers.Provider;
  let mockTokenContract: Contract;
  let receiverAddress: string;
  const receiverEnsName = 'receiver.mylogin.eth';
  let initialReceiverEthBalance: utils.BigNumber;
  let senderAddress: string;

  const transferFlow = async (
    appPage: AppPage,
    symbol: string,
    amount: string,
    receiver: string,
  ) => {
    appPage.dashboard().clickTransferButton();
    await appPage.transfer().chooseCurrency(symbol);
    appPage.transfer().enterTransferAmount(amount);
    appPage.transfer().enterRecipient(receiver);
    await appPage.notifications().waitForGasMode();
    appPage.notifications().selectGasMode();
    appPage.transfer().transfer();
  };

  beforeEach(async () => {
    const [wallet] = await getWallets(createMockProvider());
    ({relayer, provider} = await setupSdk(wallet, '33113'));
    ({mockTokenContract} = await createFixtureLoader(provider as providers.Web3Provider)(deployMockToken));
    ({appWrapper, appPage, services} = await setupUI(relayer, mockTokenContract.address));
    ({contractAddress: receiverAddress} = await createAndSetWallet(receiverEnsName, new WalletService(services.sdk), wallet, services.sdk));
    initialReceiverEthBalance = await provider.getBalance(receiverAddress);
    senderAddress = services.walletService.state.kind === 'Deployed'
      ? services.walletService.getDeployedWallet().contractAddress
      : '0x0';
  });

  it('send ETH => invalid ensName', async () => {
    await transferFlow(appPage, 'ETH', '1', 'pascal.mylogin.eth');
    await waitExpect(() => expect(appPage.transfer().getErrorMessage())
      .to.be.eq('Something went wrong.. Try again.Error: pascal.mylogin.eth is not valid'));
    expect(appPage.dashboard().getWalletBalance()).to.eq('$1.99');
  });

  it('send ETH => proper contractAddress', async () => {
    await transferFlow(appPage, 'ETH', '1', receiverAddress);
    await appPage.dashboard().waitForHideModal();
    expect(appPage.dashboard().getWalletBalance()).to.eq('$0.99');
    expect((await provider.getBalance(receiverAddress)).toString())
      .to.be.eq(initialReceiverEthBalance.add(utils.parseEther('1')));
  });

  it('ETH => proper ensName', async () => {
    await transferFlow(appPage, 'ETH', '1', receiverEnsName);
    await appPage.dashboard().waitForHideModal();
    expect(appPage.dashboard().getWalletBalance()).to.eq('$0.99');
    expect((await provider.getBalance(receiverAddress)).toString())
      .to.be.eq(initialReceiverEthBalance.add(utils.parseEther('1')));
  });

  it('token => proper contractAddress', async () => {
    await mockTokenContract.transfer(senderAddress, utils.parseEther('2.0'));
    await waitExpect(async () => {
      expect((await mockTokenContract.balanceOf(senderAddress)).toString())
        .to.be.eq(utils.parseEther('2'));
      expect(appPage.dashboard().getWalletBalance()).to.eq('$3.99');
    });
    await transferFlow(appPage, 'DAI', '1', receiverAddress);
    await appPage.dashboard().waitForHideModal();
    expect(appPage.dashboard().getWalletBalance()).to.eq('$2.99');
    expect((await mockTokenContract.balanceOf(receiverAddress)).toString())
      .to.be.eq(utils.parseEther('1'));
  });

  it('token => proper ensName', async () => {
    await mockTokenContract.transfer(senderAddress, utils.parseEther('2.0'));
    await waitExpect(async () => {
      expect((await mockTokenContract.balanceOf(senderAddress)).toString())
        .to.be.eq(utils.parseEther('2'));
      expect(appPage.dashboard().getWalletBalance()).to.eq('$3.99');
    });
    await transferFlow(appPage, 'DAI', '1', receiverEnsName);
    await appPage.dashboard().waitForHideModal();
    expect(appPage.dashboard().getWalletBalance()).to.eq('$2.99');
    expect((await mockTokenContract.balanceOf(receiverAddress)).toString())
      .to.be.eq(utils.parseEther('1'));
  });

  afterEach(async () => {
    appWrapper.unmount();
    await relayer.stop();
  });
});
