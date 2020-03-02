import {NotifySdk} from './NotifySdk';
import {CurrencyValue, ETHER_NATIVE_TOKEN} from '@unilogin/commons';
import {State} from 'reactive-properties';
import {TransactionData} from 'bnc-sdk/dist/types/src/interfaces';
import {utils} from 'ethers';
import {BigNumberish} from 'ethers/utils';

export interface TopUpTransaction {
  transactionHash: string;
  value: CurrencyValue;
}

export class TopUpTransactionObserver {
  constructor(
    notifySdk: NotifySdk,
    private readonly address: string,
  ) {
    this.transactions = new State([]);
    const transactionObserver = notifySdk.watchAccount(address);
    transactionObserver.onPool(data => this.handleEvent(data));
    transactionObserver.onSent(data => this.handleEvent(data));
    transactionObserver.onConfirmed(data => this.handleEvent(data));
  }

  private handleEvent(data: TransactionData) {
    const transaction = tryExtractTopUpTransaction(data, this.address);
    if (transaction) {
      this.addTransaction(transaction);
    }
  }

  private addTransaction(transaction: TopUpTransaction) {
    if (this.transactions.get().every(tx => tx.transactionHash !== transaction.transactionHash)) {
      this.transactions.set([...this.transactions.get(), transaction]);
    }
  }

  readonly transactions: State<TopUpTransaction[]>;
}

export function tryExtractTopUpTransaction(data: TransactionData, receiver: string): TopUpTransaction | undefined {
  if (
    isEthTransferTo(receiver, data) &&
    data.value &&
    !isZero(data.value)
  ) {
    return {
      transactionHash: data.hash,
      value: CurrencyValue.fromWei(data.value as string, ETHER_NATIVE_TOKEN.address),
    };
  } else if (isErc20TransferTo(receiver, data)) {
    const value = CurrencyValue.fromWei((data.contractCall!.params as any)['_value'], data.contractCall!.contractAddress);
    if (!value.isZero()) {
      return {
        transactionHash: data.hash,
        value,
      };
    }
  }
  return undefined;
}

const isEthTransferTo = (receiver: string, data: TransactionData) =>
  data.asset === 'ETH' && data.to && addressEquals(data.to, receiver);

const isErc20TransferTo = (receiver: string, data: TransactionData) =>
  data.contractCall !== undefined &&
  data.contractCall.contractType === 'erc20' &&
  data.contractCall.methodName === 'transfer' &&
  addressEquals((data.contractCall.params as any)['_to'], receiver);

const addressEquals = (a: string, b: string) =>
  a.toLowerCase() === b.toLowerCase();

const isZero = (val: BigNumberish) =>
  utils.bigNumberify(val).eq(0);
