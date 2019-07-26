import {expect} from 'chai';
import {loadFixture} from 'ethereum-waffle';
import MessageExecutor from '../../../../lib/integration/ethereum/MessageExecutor';
import basicWalletContractWithMockToken from '../../../fixtures/basicWalletContractWithMockToken';
import {SignedMessage, createSignedMessage, TEST_ACCOUNT_ADDRESS} from '@universal-login/commons';
import {providers, Wallet, Contract} from 'ethers';
import {bigNumberify} from 'ethers/utils';

describe('INT: MessageExecutor', async () => {
  let messageExecutor: MessageExecutor;
  let signedMessage: SignedMessage;
  let provider: providers.Provider;
  let wallet: Wallet;
  let walletContract: Contract;
  const validator = {
    validate: async () => {}
  };

  before(async () => {
    ({wallet, walletContract, provider} = await loadFixture(basicWalletContractWithMockToken));
    messageExecutor = new MessageExecutor(wallet, async (tx: providers.TransactionResponse) => {}, validator as any);
    signedMessage = createSignedMessage({from: walletContract.address, to: TEST_ACCOUNT_ADDRESS, value: bigNumberify(2)}, wallet.privateKey);
  });

  it('should execute transaction and wait for it', async () =>  {
    const expectedBalance = (await provider.getBalance(signedMessage.to)).add(signedMessage.value);
    const transactionResponse = await messageExecutor.execute(signedMessage);
    const transactionReceipt = await messageExecutor.waitForTransaction(transactionResponse);
    expect(transactionReceipt).to.haveOwnProperty('gasUsed');
    expect(transactionReceipt).to.haveOwnProperty('blockHash');
    expect(transactionReceipt).to.haveOwnProperty('blockNumber');
    const balance = await provider.getBalance(signedMessage.to);
    expect(balance).to.be.eq(expectedBalance);
  });
});
