import React, {useState, useEffect, useRef} from 'react';
import './../../styles/gasPrice.sass';
import './../../styles/gasPriceDefault.sass';
import UniversalLoginSDK, {DeployedWallet} from '@unilogin/sdk';
import {utils} from 'ethers';
import {useAsync} from '../../hooks/useAsync';
import {GasMode, GasOption, TokenDetailsWithBalance, EMPTY_GAS_OPTION, ensureNotFalsy, OnGasParametersChanged, ETHER_NATIVE_TOKEN, findGasMode, findGasOption, FAST_GAS_MODE_INDEX} from '@unilogin/commons';
import {getStyleForTopLevelComponent} from '../../../core/utils/getStyleForTopLevelComponent';
import {useAsyncEffect} from '../../hooks/useAsyncEffect';
import {GasPriceSpeedChoose} from './GasPriceSpeed';
import {TransactionFeeChoose} from './TransactionFeeChoose';
import {SelectedGasPrice} from './SelectedGasPrice';
import {useOutsideClick} from '../../hooks/useClickOutside';
import {Spinner} from '../Spinner';

interface GasPriceProps {
  deployedWallet?: DeployedWallet;
  sdk?: UniversalLoginSDK;
  isDeployed: boolean;
  gasLimit: utils.BigNumberish;
  onGasParametersChanged: OnGasParametersChanged;
  className?: string;
}

export const GasPrice = ({isDeployed = true, deployedWallet, sdk, gasLimit, onGasParametersChanged, className}: GasPriceProps) => {
  const [tokenDetailsWithBalance, setTokenDetailsWithBalance] = useState<TokenDetailsWithBalance[]>([]);

  useAsyncEffect(async () => {
    if (isDeployed) {
      ensureNotFalsy(deployedWallet, Error, 'Missing parameter: deployedWallet');
      return deployedWallet.subscribeToBalances(setTokenDetailsWithBalance);
    } else {
      ensureNotFalsy(sdk, Error, 'Missing parameter: sdk');
    }
  }, [isDeployed, deployedWallet]);

  const [gasModes] = useAsync<GasMode[]>(() => isDeployed ? deployedWallet!.getGasModes() : sdk!.getGasModes(), []);
  const [modeName, setModeName] = useState<string>('');
  const [usdAmount, setUsdAmount] = useState<utils.BigNumberish>('0');
  const [gasOption, setGasOption] = useState<GasOption>(EMPTY_GAS_OPTION);

  const onModeChanged = (name: string, usdAmount: utils.BigNumberish) => {
    const gasTokenAddress = gasOption.token.address;
    const gasOptions = findGasMode(gasModes!, name).gasOptions;

    setModeName(name);
    setUsdAmount(usdAmount);
    onGasOptionChanged(findGasOption(gasOptions, gasTokenAddress));
  };

  const onGasOptionChanged = (gasOption: GasOption) => {
    setGasOption(gasOption);
    onGasParametersChanged({
      gasPrice: gasOption.gasPrice,
      gasToken: gasOption.token.address,
    });
  };

  const onGasOptionSelected = (gasOption: GasOption) => {
    onGasOptionChanged(gasOption);
    setContentVisibility(visibility => !visibility);
  };

  useEffect(() => {
    if (gasModes) {
      const {name, usdAmount} = gasModes[FAST_GAS_MODE_INDEX];
      const gasOption = findGasOption(gasModes[FAST_GAS_MODE_INDEX].gasOptions, ETHER_NATIVE_TOKEN.address);
      setUsdAmount(usdAmount);
      setModeName(name);
      onGasOptionChanged(gasOption);
    }
  }, [gasModes]);
  const [contentVisibility, setContentVisibility] = useState(false);

  const ref = useRef(null);
  useOutsideClick(ref, () => {
    if (contentVisibility) {
      setContentVisibility(false);
    }
  });

  const renderComponent = (gasModes: GasMode[]) => (
    <div className="universal-login-gas">
      <div className={getStyleForTopLevelComponent(className)}>
        <div className="gas-price">
          <GasPriceTitle />
          <div className="gas-price-dropdown">
            <SelectedGasPrice
              modeName={modeName}
              gasLimit={gasLimit}
              usdAmount={usdAmount}
              gasOption={gasOption}
              onClick={() => setContentVisibility(!contentVisibility)}
            />
            {contentVisibility &&
              <div ref={ref} className="gas-price-selector">
                <GasPriceTitle />
                <GasPriceSpeedChoose
                  gasModes={gasModes}
                  modeName={modeName}
                  onModeChanged={onModeChanged}
                />
                <TransactionFeeChoose
                  gasModes={gasModes}
                  modeName={modeName}
                  tokenAddress={gasOption.token.address}
                  gasLimit={gasLimit}
                  usdAmount={usdAmount}
                  tokensDetailsWithBalance={tokenDetailsWithBalance}
                  onGasOptionChanged={onGasOptionSelected}
                />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
  return (
    gasModes ? renderComponent(gasModes) : <Spinner className="spinner-small" />
  );
};

const GasPriceTitle = () => (
  <div className="gas-price-top">
    <p className="gas-price-title">Transaction details</p>
    <div className="gas-price-hint">
      <p className="gas-price-tooltip">Choose transaction speed and token</p>
    </div>
  </div>
);
