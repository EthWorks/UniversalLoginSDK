import {utils} from 'ethers';
import {GasPriceOracle, StoredFutureWallet, ensure, safeMultiply} from '@unilogin/commons';

export class GasTokenValidator {
  constructor(private oracle: GasPriceOracle) {}

  async validate(futureWallet: StoredFutureWallet, tolerance = 0) {
    const {gasPrice, tokenPriceInETH} = futureWallet;
    const gasPriceInEth = utils.bigNumberify(gasPrice).mul(tokenPriceInETH);
    const gasPrices = await this.oracle.getGasPrices();
    const minimumGasPriceAllowed = calculateTolerancedValue(gasPrices.fast.gasPrice, tolerance);
    ensure(gasPriceInEth.gte(minimumGasPriceAllowed), Error, 'Gas price is not enough');
  }
}

const calculateTolerancedValue = (value: utils.BigNumber, tolerance: number) => {
  ensure(tolerance >= 0 && tolerance <= 1, Error, `Percentage should be between 0 and 1, but got: ${tolerance}`);
  const bigNumber100 = utils.bigNumberify(100);
  const multiplier = safeMultiply(bigNumber100, tolerance);
  const percentage = bigNumber100.sub(multiplier);
  return value.mul(percentage).div(100);
};