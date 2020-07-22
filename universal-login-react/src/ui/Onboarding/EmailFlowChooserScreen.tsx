import React from 'react';
import {WalletService} from '@unilogin/sdk';
import {EmailFlowChooser, EmailFlowChooserProps} from './EmailFlowChooser';
import {OnboardingStepsWrapper} from './OnboardingStepsWrapper';

interface EmailFlowChooserScreen extends EmailFlowChooserProps {
  hideModal: () => void;
  walletService: WalletService;
}

export const EmailFlowChooserScreen = ({hideModal, walletService, onCreateClick, onConnectClick}: EmailFlowChooserScreen) => {
  return (
    <OnboardingStepsWrapper
      title='Create or connect account'
      className='onboarding-select-flow'
      hideModal={hideModal}
      message={walletService.sdk.getNotice()}
      steps={4}
      progress={1}>
      <div className="perspective">
        <EmailFlowChooser
          onConnectClick={onConnectClick}
          onCreateClick={onCreateClick}
        />
      </div>
    </OnboardingStepsWrapper>
  );
};
