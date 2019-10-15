import React from 'react';
import {DeployedWallet} from '@universal-login/sdk';
import './../../styles/devices.sass';
import './../../styles/devicesDefault.sass';
import {getStyleForTopLevelComponent} from '../../../core/utils/getStyleForTopLevelComponent';
import {NewDeviceMessage} from './NewDeviceMessage';
import {ConnectedDevices} from './ConnectedDevices';
import {useAsync} from '../../hooks/useAsync';
import {devicesContentType} from './Devices';
import Spinner from '../../commons/Spinner';
import {useHistory} from 'react-router';
import {join} from 'path';

export interface DevicesListProps {
  deployedWallet: DeployedWallet;
  className?: string;
}

export const DevicesList = ({deployedWallet, className}: DevicesListProps) => {
  const [devices] = useAsync(async () => deployedWallet.getConnectedDevices(), []);

  const history = useHistory();

  return (
    <div className="universal-login-devices">
      <div className={getStyleForTopLevelComponent(className)}>
        <div className="devices">
          <div className="devices-inner">
            <NewDeviceMessage
              deployedWallet={deployedWallet}
              onClick={() => history.push(join(history.location.pathname, 'approveDevice'))}
              className={className}
            />
            {devices
              ? <ConnectedDevices
                devicesList={devices}
                deployedWallet={deployedWallet}
              />
              : <Spinner className="spinner-center"/>}
          </div>
          <button onClick={() => setDevicesContent('deleteAccount')} className="delete-account-link">Delete account</button>
        </div>
      </div>
    </div>
  );
};
