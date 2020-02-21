import {Web3PickerProvider} from '../Web3PickerProvider';
import {setupStrategies} from '../api/setupStrategies';
import {combine, flatMap, Property, State} from 'reactive-properties';
import {ULWeb3Provider} from '../ULWeb3Provider';
import {IframeInitializerBase} from './IframeInitializerBase';
import {Provider} from 'web3/providers';
import {ApplicationInfo} from '@unilogin/commons';

export class PickerIframeInitializer extends IframeInitializerBase {
  private readonly provider: Web3PickerProvider;

  constructor(applicationInfo: ApplicationInfo) {
    super();
    const web3ProviderFactories = setupStrategies(this.bridge, ['UniLogin', 'Metamask'], {applicationInfo});
    this.provider = new Web3PickerProvider(web3ProviderFactories, this.bridge);
  }

  protected getProvider(): Provider {
    return this.provider;
  }

  protected getIsUiVisible(): Property<boolean> {
    return combine([
      this.provider.isVisible,
      this.provider.currentProvider.pipe(
        flatMap(provider => provider instanceof ULWeb3Provider ? provider.isUiVisible : new State(false)),
      ),
    ], (a, b) => a || b);
  }

  protected getHasNotifications(): Property<boolean> {
    return this.provider.currentProvider.pipe(
      flatMap(provider => provider instanceof ULWeb3Provider ? provider.hasNotifications : new State(false)),
    );
  }
}
