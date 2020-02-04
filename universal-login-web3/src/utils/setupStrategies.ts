import Web3 from 'web3';
import {Web3ProviderFactory} from '../models/Web3ProviderFactory';
import {setupUniLogin} from '../integration/setupUniLogin';
import {Strategy} from '../api/UniLogin';

export const setupStrategies = (web3: Web3, strategies: Strategy[]) => {
  const provider = web3.currentProvider;
  return strategies.map(strategy => {
    switch (strategy) {
      case 'UniLogin':
        return setupUniLogin(web3);
      case 'Metamask':
        const defaultStrategy: Web3ProviderFactory = {icon: 'Metamask logo', name: 'Metamask', create: () => provider};
        return defaultStrategy;
      default:
        return strategy;
    }
  });
};
