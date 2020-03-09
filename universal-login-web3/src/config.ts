import {Provider} from 'web3/providers';
import {HttpProvider} from './services/HttpProvider';
import {Network} from '@unilogin/commons';

export interface Config {
  network: Network;
  provider: Provider;
  relayerUrl: string;
  ensDomains: string[];
}

export function getConfigForNetwork(network: Network): Config {
  switch (network) {
    case '1':
    case 'mainnet':
      return {
        network: 'mainnet',
        provider: new HttpProvider('https://mainnet.infura.io/v3/b3026fc5137a4bd18e5d5906ed49f77d'),
        relayerUrl: 'https://relayer-mainnet.herokuapp.com',
        ensDomains: ['unibeta.eth', 'unitest.eth'],
      };
    case '3':
    case 'ropsten':
      return {
        network: 'ropsten',
        provider: new HttpProvider('https://ropsten.infura.io/v3/b3026fc5137a4bd18e5d5906ed49f77d'),
        relayerUrl: 'https://relayer-ropsten.herokuapp.com',
        ensDomains: ['unilogin.test'],
      };
    case '4':
    case 'rinkeby':
      return {
        network: 'rinkeby',
        provider: new HttpProvider('https://rinkeby.infura.io/v3/b3026fc5137a4bd18e5d5906ed49f77d'),
        relayerUrl: 'https://relayer-rinkeby.herokuapp.com',
        ensDomains: ['unilogin.test'],
      };
    case '42':
    case 'kovan':
      return {
        network: 'kovan',
        provider: new HttpProvider('https://kovan.infura.io/v3/b3026fc5137a4bd18e5d5906ed49f77d'),
        relayerUrl: 'https://relayer-kovan.herokuapp.com',
        ensDomains: ['unilogin.test'],
      };
    case '8545':
    case 'ganache':
      return {
        network: 'ganache',
        provider: new HttpProvider('http://localhost:18545'),
        relayerUrl: 'http://localhost:3311',
        ensDomains: ['mylogin.eth', 'universal-id.eth', 'popularapp.eth'],
      };
    default:
      throw new Error(`Invalid network: ${network}`);
  }
}
