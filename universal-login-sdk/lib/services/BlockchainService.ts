import {providers} from 'ethers';

export class BlockchainService {
  constructor(private provider: providers.Provider){
  }

  getCode(contractAddress: string) {
    return this.provider.getCode(contractAddress);
  }
}
