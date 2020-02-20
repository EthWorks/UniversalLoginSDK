import Knex from 'knex';
import {loadFixture} from 'ethereum-waffle';
import {IMessageValidator} from '@universal-login/commons';
import MessageHandler from '../../src/core/services/execution/messages/MessageHandler';
import QueueSQLStore from '../../src/integration/sql/services/QueueSQLStore';
import AuthorisationStore from '../../src/integration/sql/services/AuthorisationStore';
import {basicWalletContractWithMockToken} from '../fixtures/basicWalletContractWithMockToken';
import MessageSQLRepository from '../../src/integration/sql/services/MessageSQLRepository';
import {getContractWhiteList} from '../../src/http/relayers/RelayerUnderTest';
import {MessageStatusService} from '../../src/core/services/execution/messages/MessageStatusService';
import {Beta2Service} from '../../src/integration/ethereum/Beta2Service';
import MessageExecutionValidator from '../../src/integration/ethereum/validators/MessageExecutionValidator';
import MessageExecutor from '../../src/integration/ethereum/MessageExecutor';
import {DevicesStore} from '../../src/integration/sql/services/DevicesStore';
import {DevicesService} from '../../src/core/services/DevicesService';
import RelayerRequestSignatureValidator from '../../src/integration/ethereum/validators/RelayerRequestSignatureValidator';
import {Config} from '../../src';
import ExecutionWorker from '../../src/core/services/execution/ExecutionWorker';
import DeploymentExecutor from '../../src/integration/ethereum/DeploymentExecutor';
import SQLRepository from '../../src/integration/sql/services/SQLRepository';
import Deployment from '../../src/core/models/Deployment';
import {MinedTransactionHandler} from '../../src/core/services/execution/MinedTransactionHandler';
import setupWalletService from './setupWalletService';
import {GasComputation} from '../../src/core/services/GasComputation';
import {BlockchainService} from '@universal-login/contracts';
import MessageHandlerValidator from '../../src/core/services/validators/MessageHandlerValidator';
import PendingMessages from '../../src/core/services/execution/messages/PendingMessages';
import {WalletContractService} from '../../src/integration/ethereum/WalletContractService';
import {GnosisSafeService} from '../../src/integration/ethereum/GnosisSafeService';

export default async function setupMessageService(knex: Knex, config: Config) {
  const {wallet, actionKey, provider, mockToken, walletContract, otherWallet} = await loadFixture(basicWalletContractWithMockToken);
  const authorisationStore = new AuthorisationStore(knex);
  const messageRepository = new MessageSQLRepository(knex);
  const deploymentRepository = new SQLRepository<Deployment>(knex, 'deployments');
  const devicesStore = new DevicesStore(knex);
  const executionQueue = new QueueSQLStore(knex);
  const beta2Service = new Beta2Service(wallet);
  const blockchainService = new BlockchainService(provider);
  const gasComputation = new GasComputation(blockchainService);
  const messageHandlerValidator = new MessageHandlerValidator(config.maxGasLimit, gasComputation, wallet.address);
  const gnosisSafeService = new GnosisSafeService(provider);
  const walletContractService = new WalletContractService(blockchainService, beta2Service, gnosisSafeService);
  const relayerRequestSignatureValidator = new RelayerRequestSignatureValidator(walletContractService);
  const devicesService = new DevicesService(devicesStore, relayerRequestSignatureValidator);
  const minedTransactionHandler = new MinedTransactionHandler(authorisationStore, devicesService, walletContractService);
  const messageExecutionValidator: IMessageValidator = new MessageExecutionValidator(wallet, getContractWhiteList(), walletContractService);
  const statusService = new MessageStatusService(messageRepository, walletContractService);
  const pendingMessages = new PendingMessages(messageRepository, executionQueue, statusService, walletContractService);
  const messageHandler = new MessageHandler(pendingMessages, messageHandlerValidator);
  const messageExecutor = new MessageExecutor(wallet, messageExecutionValidator, messageRepository, minedTransactionHandler, walletContractService);
  const {walletService} = await setupWalletService(wallet);
  const deploymentExecutor = new DeploymentExecutor(deploymentRepository, walletService);
  const executionWorker = new ExecutionWorker([messageExecutor, deploymentExecutor], executionQueue);
  return {wallet, actionKey, provider, mockToken, authorisationStore, devicesStore, messageHandler, walletContract, otherWallet, executionWorker, walletContractService};
}
