import chai, {expect} from 'chai';
import {getWallets, createMockProvider, solidity} from 'ethereum-waffle';
import Relayer from '@universal-login/relayer';
import {setupSdk} from '../../helpers/setupSdk';
import UniversalLoginSDK from '../../../lib/api/sdk';
import {WalletService} from '../../../lib/core/services/WalletService';

chai.use(solidity);

describe('INT: WalletService', async () => {
  let walletService: WalletService;
  let sdk: UniversalLoginSDK;
  let relayer: Relayer;

  before(async () => {
    const [wallet] = await getWallets(createMockProvider());
    ({sdk, relayer} = await setupSdk(wallet));
    walletService = new WalletService(sdk);
  });

  it('create wallet', async () => {
    expect(walletService.state).to.deep.eq({kind: 'None'});
    const name = 'name.mylogin.eth';
    const futureWallet = await walletService.createFutureWallet(name);
    expect(futureWallet.contractAddress).to.be.properAddress;
    expect(futureWallet.privateKey).to.be.properPrivateKey;
    expect(futureWallet.deploy).to.be.a('function');
    expect(futureWallet.waitForBalance).to.be.a('function');
    expect(walletService.state).to.deep.eq({kind: 'Future', name, wallet: futureWallet});
  });

  after(async () => {
    await relayer.stop();
  });
});
