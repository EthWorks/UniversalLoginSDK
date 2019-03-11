import React from 'react';
import IdentitySelector from './IdentitySelector';
import Logo from './../../assets/logo-with-text.svg';
import Modal from '../Modals/Modal';
import {useServices, useRouter} from '../../hooks';

interface LoginProps {
  setAuthorized: () => void;
  location? : {state: {from: {pathname : string}}};
}

const Login = ({setAuthorized, location} : LoginProps) => {
  const {createWallet} = useServices();
  const {history} = useRouter();
  // TODO: location.state
  const {from} = location ? location.state : {from: {pathname: '/'}};

  const onCreateCLick = async (name: string) => {
    await createWallet(name);
    setAuthorized();
    history.push(from);
  };

  return(
    <div className="login">
      <img src={Logo} alt="Logo" className="login-logo"/>
      <p className="login-subtitle">The best place to put your money anywhere on the planet. Universal finance for everyone.</p>
      <IdentitySelector  onCreateClick={(name: string) => onCreateCLick(name)}/>
      <Modal />
    </div>
  );
};

export default Login;
