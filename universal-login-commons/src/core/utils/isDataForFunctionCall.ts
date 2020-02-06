import {utils} from 'ethers';

export const isDataForFunctionCall = (data: string, contractInterface: utils.Interface, functionName: string) => {
  const functionSignature = contractInterface.functions[functionName].sighash;
  return functionSignature === data.slice(0, functionSignature.length);
};
