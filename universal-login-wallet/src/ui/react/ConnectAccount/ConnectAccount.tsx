import React, {useState} from 'react';
import {ConnectionFlow} from '@universal-login/react';
import {ConnectSelector} from './ConnectSelector';
import {useServices} from '../../hooks';
import {useHistory} from 'react-router';
import {Switch, Route} from 'react-router-dom';

export type ConnectModal = 'connectionFlow' | 'selector';

export const ConnectAccount = () => {
  const {sdk, walletService} = useServices();
  const history = useHistory();
  const [name, setName] = useState<string | undefined>(undefined);
  return <Switch>
    <Route exact path="/connect/selector">
      <ConnectSelector setName={setName}/>
    </Route>
    <Route path="/connect/">
      <div className="main-bg">
        <div className="box-wrapper">
          <div className="box">
            <ConnectionFlow
              basePath="/connect/"
              name={name!}
              sdk={sdk}
              walletService={walletService}
              onCancel={() => history.push('/connect/selector')}
              onSuccess={() => history.push('/connectionSuccess')}
              className="jarvis-styles"
            />
          </div>
        </div>
      </div>
    </Route>
  </Switch>;
};
