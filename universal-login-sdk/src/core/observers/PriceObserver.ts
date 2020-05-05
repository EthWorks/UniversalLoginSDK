import {TokensPrices, TokenPricesService} from '@unilogin/commons';
import ObserverRunner from './ObserverRunner';
import {TokensDetailsStore} from '../services/TokensDetailsStore';
const deepEqual = require('deep-equal');
import cloneDeep from 'lodash.clonedeep';

export type OnTokenPricesChange = (data: TokensPrices) => void;

export class PriceObserver extends ObserverRunner {
  private lastTokenPrices: TokensPrices = {};
  private callbacks: OnTokenPricesChange[] = [];
  private tokenPricesService: TokenPricesService;

  constructor(private tokensDetailsStore: TokensDetailsStore, tick: number) {
    super();
    this.tick = tick;
    this.tokenPricesService = new TokenPricesService(tokensDetailsStore.tokensDetails);
  }

  subscribe(callback: OnTokenPricesChange) {
    this.callbacks.push(callback);

    if (this.isStopped()) {
      this.start();
    }
    callback(this.lastTokenPrices);

    const unsubscribe = () => {
      this.callbacks = this.callbacks.filter((element) => callback !== element);
      if (this.callbacks.length === 0) {
        this.lastTokenPrices = {};
        this.stop();
      }
    };
    return unsubscribe;
  }

  async execute() {
    await this.checkTokenPricesNow();
  }

  async checkTokenPricesNow() {
    const newTokenPrices = await this.getCurrentPrices();
    if (!(deepEqual(this.lastTokenPrices, newTokenPrices))) {
      this.lastTokenPrices = cloneDeep(newTokenPrices);
      this.callbacks.forEach((callback) => callback(this.lastTokenPrices));
    }
  }

  getCurrentPrices(): Promise<TokensPrices> {
    return this.tokenPricesService.getPrices();
  }
}
