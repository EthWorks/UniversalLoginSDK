import {asAnyOf, asObject, asString, cast} from '@restless/sanitizers';
import {ApplicationWallet, asExactly, SerializableFutureWallet} from '@unilogin/commons';
import {WalletStorage, SerializedWalletState, SerializedDeployingWallet} from '../models/WalletService';
import {IStorageService} from '../models/IStorageService';
import {StorageEntry} from './StorageEntry';

const STORAGE_KEY = 'wallet';

export class WalletStorageService implements WalletStorage {
  private storage: StorageEntry<SerializedWalletState>;

  constructor(private storageService: IStorageService) {
    this.storage = new StorageEntry(
      STORAGE_KEY,
      asSerializedState,
      storageService,
    );
  }

  private migrateStoredState() {
    try {
      const data = this.storageService.get(STORAGE_KEY);
      if (data === null) {
        return;
      }
      const wallet = cast(JSON.parse(data), asApplicationWallet);
      this.storage.set({kind: 'Deployed', wallet});
    } catch {
    }
  }

  load(): SerializedWalletState {
    this.migrateStoredState();
    return this.storage.get() || {kind: 'None'};
  }

  save(state: SerializedWalletState): void {
    this.storage.set(state);
  }
}

const asSerializableFutureWallet = asObject<SerializableFutureWallet>({
  contractAddress: asString,
  privateKey: asString,
  gasPrice: asString,
  ensName: asString,
  gasToken: asString,
});

const asApplicationWallet = asObject<ApplicationWallet>({
  name: asString,
  contractAddress: asString,
  privateKey: asString,
});

const asSerializedDeployingWallet = asObject<SerializedDeployingWallet>({
  deploymentHash: asString,
  name: asString,
  contractAddress: asString,
  privateKey: asString,
});

const asSerializedState = asAnyOf([
  asObject<SerializedWalletState>({
    kind: asExactly('None'),
  }),
  asObject<SerializedWalletState>({
    kind: asExactly('Future'),
    name: asString,
    wallet: asSerializableFutureWallet,
  }),
  asObject<SerializedWalletState>({
    kind: asExactly('Deploying'),
    wallet: asSerializedDeployingWallet,
  }),
  asObject<SerializedWalletState>({
    kind: asExactly('Connecting'),
    wallet: asApplicationWallet,
  }),
  asObject<SerializedWalletState>({
    kind: asExactly('Deployed'),
    wallet: asApplicationWallet,
  }),
], 'wallet state');
