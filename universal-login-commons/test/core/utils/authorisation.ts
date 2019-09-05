import {expect} from 'chai';
import {utils} from 'ethers';
import {AuthorisationRequest} from '../../../lib/core/models/authorisation';
import {signAuthorisationRequest, verifyAuthorisationRequest, hashAuthorisationRequest, recoverFromAuthorisationRequest} from '../../../lib/core/utils/authorisation';

describe('UNIT: CancelAuthorisationRequest', () => {
  const privateKey = '0x9e0f0ab35e7b8d8efc554fa0e9db29235e7c52ea5e2bb53ed50d24ff7a4a6f65';
  const signerAddress = utils.computeAddress(privateKey);
  const expectedSignature = '0xbb32164e253c9f92b5ca5c2e11c169e9630ce5b3bd7c7881f035d1c3e609a71e208b0c9cebb780a381432cf206b42b959fc77b49134c8d8643187826f5aa4cab1b';

  const contractAddress = '0x14791697260E4c9A71f18484C9f997B308e59325';
  let authorisationRequest: AuthorisationRequest;

  beforeEach(() => {
    authorisationRequest = {
      contractAddress,
      signature: ''
    };
  });

  describe('signAuthorisationRequest', () => {
    it('valid signature', () => {
      signAuthorisationRequest(authorisationRequest, privateKey);

      expect(authorisationRequest.signature).to.deep.equal(expectedSignature);

      const payloadDigest = utils.arrayify(hashAuthorisationRequest(authorisationRequest));
      expect(utils.verifyMessage(payloadDigest, authorisationRequest.signature!)).to.eq(signerAddress);
    });

    it('forged signature', () => {
      const attackerPrivateKey = '0x8e0f0ab35e7b8d8efc554fa0e9db29235e7c52ea5e2bb53ed50d24ff7a4a6f65';

      signAuthorisationRequest(authorisationRequest, attackerPrivateKey);

      expect(authorisationRequest.signature).to.not.deep.equal(expectedSignature);
    });
  });

  it('verifyAuthorisationRequest', () => {
    signAuthorisationRequest(authorisationRequest, privateKey);

    expect(verifyAuthorisationRequest(authorisationRequest, signerAddress)).to.be.true;

    const computedAddress = recoverFromAuthorisationRequest(authorisationRequest);
    expect(computedAddress).to.equal(signerAddress);
  });

  it('hashAuthorisationRequest', () => {
    const expectedPayloadDigest = '0x513741ffb1226167f112de55d110bf11ff18ebc0afe0068c899d583a66d755c8';

    const payloadDigest = hashAuthorisationRequest(authorisationRequest);

    expect(payloadDigest).to.equal(expectedPayloadDigest);
  });
});
