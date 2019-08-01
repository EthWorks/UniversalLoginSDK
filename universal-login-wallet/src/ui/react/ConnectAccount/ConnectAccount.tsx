import React, {useState} from 'react';
import {ConnectSelector} from './ConnectSelector';
import {ChooseConnectionMethod} from './ChooseConnectionMethod';
import {ConnectWithPassphrase} from './ConnectWithPassphrase';

export type ConnectModal = 'connectionMethod' | 'selector' | 'recover';

export const ConnectAccount = () => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [connectModal, setConnectModal] = useState<ConnectModal>('selector');
  if (connectModal === 'connectionMethod') {
    return <ChooseConnectionMethod name={name!} setConnectModal={setConnectModal}/>;
  } else if (connectModal === 'recover') {
    return <ConnectWithPassphrase name={name!}/>;
  } else {
    return <ConnectSelector setName={setName} setConnectModal={setConnectModal}/>;
  }
};
