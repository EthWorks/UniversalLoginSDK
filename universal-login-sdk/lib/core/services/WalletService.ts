import {ApplicationWallet, ensure, Message, Procedure, walletFromBrain} from '@universal-login/commons';
import UniversalLoginSDK from '../../api/sdk';
import {FutureWallet} from '../../api/FutureWalletFactory';
import {FutureWalletNotSet, InvalidPassphrase, WalletOverridden} from '../utils/errors';
import {utils, Wallet} from 'ethers';
import {DeployedWallet, WalletStorage} from '../..';
import {map, State} from 'reactive-properties';
import {WalletState} from '../models/WalletService';
import {WalletSerializer} from './WalletSerializer';

type WalletFromBackupCodes = (username: string, password: string) => Promise<Wallet>;

export class WalletService {
  private readonly walletSerializer: WalletSerializer;

  stateProperty = new State<WalletState>({kind: 'None'});

  walletDeployed = this.stateProperty.pipe(map((state) => state.kind === 'Deployed'));
  isAuthorized = this.walletDeployed;

  get state() {
    return this.stateProperty.get();
  }

  constructor(
    public readonly sdk: UniversalLoginSDK,
    private readonly walletFromPassphrase: WalletFromBackupCodes = walletFromBrain,
    private readonly storage?: WalletStorage,
  ) {
    this.walletSerializer = new WalletSerializer(sdk);
  }

  getDeployedWallet(): DeployedWallet {
    if (this.state.kind !== 'Deployed') {
      throw new Error('Invalid state: expected deployed wallet');
    }
    return this.state.wallet;
  }

  getConnectingWallet(): ApplicationWallet {
    if (this.state.kind !== 'Connecting') {
      throw new Error('Invalid state: expected connecting wallet');
    }
    return this.state.wallet;
  }

  async createFutureWallet(): Promise<FutureWallet> {
    const futureWallet = await this.sdk.createFutureWallet();
    this.setFutureWallet(futureWallet);
    return futureWallet;
  }

  async deployFutureWallet(ensName: string, gasPrice: string, gasToken: string, onTransactionHash?: (txHash: string) => void) {
    if (this.state.kind !== 'Future') {
      throw new Error('Invalid state: expected future wallet');
    }
    const {deploy, contractAddress, privateKey} = this.state.wallet;

    const applicationWallet = {contractAddress, name: ensName, privateKey};
    this.stateProperty.set({kind: 'Deploying', wallet: applicationWallet});

    const {waitToBeSuccess, waitForTransactionHash} = await deploy(ensName, gasPrice, gasToken);
    const {transactionHash} = await waitForTransactionHash();
    onTransactionHash !== undefined && onTransactionHash(transactionHash!);
    const deployedWallet = await waitToBeSuccess();
    this.stateProperty.set({kind: 'Deployed', wallet: deployedWallet});
    this.saveToStorage();
    return deployedWallet;
  }

  setFutureWallet(wallet: FutureWallet) {
    if (this.state.kind !== 'None') {
      throw new WalletOverridden();
    }
    this.stateProperty.set({kind: 'Future', wallet});
    this.saveToStorage();
  }

  setDeployed(name: string) {
    if (this.state.kind !== 'Future') {
      throw new FutureWalletNotSet();
    }
    const {contractAddress, privateKey} = this.state.wallet;
    const wallet = new DeployedWallet(contractAddress, name, privateKey, this.sdk);
    this.stateProperty.set({kind: 'Deployed', wallet});
    this.saveToStorage();
  }

  setConnecting(wallet: ApplicationWallet) {
    if (this.state.kind !== 'None') {
      throw new WalletOverridden();
    }
    this.stateProperty.set({kind: 'Connecting', wallet});
  }

  setWallet(wallet: ApplicationWallet) {
    if (this.state.kind !== 'None' && this.state.kind !== 'Connecting') {
      throw new WalletOverridden();
    }
    this.stateProperty.set({
      kind: 'Deployed',
      wallet: new DeployedWallet(wallet.contractAddress, wallet.name, wallet.privateKey, this.sdk),
    });
    this.saveToStorage();
  }

  async recover(name: string, passphrase: string) {
    const contractAddress = await this.sdk.getWalletContractAddress(name);
    const wallet = await this.walletFromPassphrase(name, passphrase);
    ensure(await this.sdk.keyExist(contractAddress, wallet.address), InvalidPassphrase);
    const applicationWallet: ApplicationWallet = {contractAddress, name, privateKey: wallet.privateKey};
    this.setWallet(applicationWallet);
  }

  async connect(name: string, callback: Procedure) {
    const contractAddress = await this.sdk.getWalletContractAddress(name);
    const {privateKey, securityCode} = await this.sdk.connect(contractAddress);

    const applicationWallet: ApplicationWallet = {privateKey, contractAddress, name};
    this.setConnecting(applicationWallet);

    const filter = {
      contractAddress,
      key: utils.computeAddress(privateKey),
    };

    const subscription = this.sdk.subscribe('KeyAdded', filter, () => {
      this.setWallet(applicationWallet);
      subscription.remove();
      callback();
    });

    return {
      unsubscribe: () => subscription.remove(),
      securityCode,
    };
  }

  async removeWallet(transactionDetails: Partial<Message>) {
    if (this.state.kind !== 'Deployed') {
      this.disconnect();
      return;
    }
    const execution = await this.state.wallet.removeCurrentKey(transactionDetails);
    execution.waitToBeSuccess().then(() => this.disconnect());
    return execution;
  }

  disconnect(): void {
    this.stateProperty.set({kind: 'None'});
    this.saveToStorage();
  }

  saveToStorage() {
    if (!this.storage) {
      return;
    }
    const serialized = this.walletSerializer.serialize(this.state);
    if (serialized === 'remove') {
      this.storage.remove();
    } else if (serialized !== undefined) {
      this.storage.save(serialized);
    }
  }

  async loadFromStorage() {
    if (!this.storage) {
      return;
    }
    const state = this.storage.load();
    if (!state) {
      return;
    }
    ensure(this.state.kind === 'None', WalletOverridden);
    this.stateProperty.set(await this.walletSerializer.deserialize(state));
  }
}
