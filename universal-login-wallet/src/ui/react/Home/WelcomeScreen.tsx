import React, {useState, useEffect} from 'react';
import {useRouter, useServices} from '../../hooks';
import {Notice} from '@universal-login/react';
import {setBetaNotice} from '@universal-login/sdk';

export const WelcomeScreen = () => {
  const {history} = useRouter();
  const {sdk} = useServices();

  const [notice, setNotice] = useState('');
  useEffect(() => {
    setBetaNotice(sdk);
    setNotice(sdk.getNotice());
  });

  return (
    <div className="main-bg">
      <div className="welcome-box-wrapper">
        <div className="box welcome-box">
          <Notice message={notice} />
          <div className="welcome-box-content">
            <h1 className="welcome-box-title">Welcome in the<br/> <span>Jarvis Network</span></h1>
            <button onClick={() => history.push('/connect')} className="welcome-box-connect">Connect to existing account</button>
            <div className="row justify-content-center align-items-center">
              <p className="welcome-box-text">No account yet?</p>
              <button onClick={() => history.push('/terms')} className="welcome-box-create">Create one</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
