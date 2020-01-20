import {EventEmitter} from 'fbemitter';
import {providers} from 'ethers';
import {decodeDataForExecuteSigned} from '../../utils/messages/serialisation';
import {DevicesService} from '../DevicesService';
import {EMPTY_DEVICE_INFO, DecodedMessage} from '@universal-login/commons';
import AuthorisationStore from '../../../integration/sql/services/AuthorisationStore';
import {WalletContractService} from '../../../integration/ethereum/WalletContractService';

export class MinedTransactionHandler {
  constructor(
    private hooks: EventEmitter,
    private authorisationStore: AuthorisationStore,
    private devicesService: DevicesService,
    private walletContractService: WalletContractService,
  ) {}

  private async updateDevicesAndAuthorisations(contractAddress: string, key: string) {
    const authorisationEntry = await this.authorisationStore.get(contractAddress, key);
    const deviceInfo = authorisationEntry ? authorisationEntry.deviceInfo : EMPTY_DEVICE_INFO;
    await this.authorisationStore.removeRequest(contractAddress, key);
    await this.devicesService.add(contractAddress, key, deviceInfo);
  }

  async handle(sentTransaction: providers.TransactionResponse) {
    const {data, to} = sentTransaction;
    const message = decodeDataForExecuteSigned(data);
    if (message.to === to) {
      if (await this.walletContractService.isAddKeyCall(to, message.data as string)) {
        await this.handleAddKey(sentTransaction, message);
      } else if (await this.walletContractService.isRemoveKeyCall(to, message.data as string)) {
        await this.handleRemoveKey(message);
      } else if (await this.walletContractService.isAddKeysCall(to, message.data as string)) {
        await this.handleAddKeys(sentTransaction, message);
      }
    }
  }

  private async handleAddKey(sentTransaction: providers.TransactionResponse, message: DecodedMessage) {
    const [key] = await this.walletContractService.decodeKeyFromData(message.to, message.data as string);
    await this.updateDevicesAndAuthorisations(message.to, key);
    this.hooks.emit('added', {transaction: sentTransaction, contractAddress: message.to});
  }

  private async handleRemoveKey(message: DecodedMessage) {
    const [key] = await this.walletContractService.decodeKeyFromData(message.to, message.data as string);
    await this.devicesService.remove(message.to, key);
  }

  private async handleAddKeys(sentTransaction: providers.TransactionResponse, message: DecodedMessage) {
    const [keys] = await this.walletContractService.decodeKeysFromData(message.to, message.data as string);
    for (const key of keys) {
      await this.updateDevicesAndAuthorisations(message.to, key);
    }
    this.hooks.emit('keysAdded', {transaction: sentTransaction, contractAddress: message.to});
  }
}
