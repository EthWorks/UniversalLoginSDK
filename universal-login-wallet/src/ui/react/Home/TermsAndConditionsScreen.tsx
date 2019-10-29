/* eslint-disable max-len */
import React, {useState} from 'react';
import {useHistory} from 'react-router';

export const TermsAndConditionsScreen = () => {
  const [isRead, setIsRead] = useState(false);
  const history = useHistory();

  return (
    <div className="main-bg">
      <div className="terms-box-wrapper">
        <div className="box terms-box">
          <div className="terms-box-header">
            <h1 className="terms-box-title">Terms Of Service</h1>
          </div>
          <div className="terms-description">

            <h3>Last updated: October 28, 2019</h3>

            <p>Jarvis OOD (outlined as “Jarvis”, “we”, “us” or “our” in this document) provides a service (outlined as "Service" or "Services" in this document) to allow to interact with the Ethereum Blockchain (outlined as "Blockchain” in this document) and manage a personal smartcontract on the Blockchain (outlined as "Account” in this document) through its website located at jarvis.network (outlined as "Site” in this document), and a mobile, web, and desktop application (outlined as "Applications” in this document), which includes text, images, audio, code and other materials (outlined as "Content” in this document) and all of the features and services provided. </p>
            <p>Jarvis has developed these Terms of Service (outlined as “Terms” in this document) that govern your use of the Site, the Service and the Applications. You should acknowledge that cryptocurrencies, tokens, Blockchain related assets (outlined as "Digital Assets” in this document) and services, and more generally our Service, carry a lot of risks due to but not limited to, Digital Assets price volatility and low liquidity, experimental technology, software breach, that could result in losses of your funds; you are sole responsible and liable of any action initiated by you or a third party, whether it is malicious or not, that will occur a loss, including the loss of your credential. Therefore, you will need to carefully read the following Terms.</p>
            <p>By creating an Account through our Applications, or visiting our website, you acknowledge that you have read, understood, and agreed to these Terms, as well as the accompanying Risk and Privacy Policy.</p>

            <h1>Change of the Terms</h1>
            <p>We may modify the Terms at any time, in our sole discretion, without any notice. Any such changes will take effect immediately when posted on the Site or on our Applications. You will be notified of such changes either by posting the modified Terms on the Site, by providing you a notice through the Applications, or through other methods of communication which we deem reasonable. You may be required to read and accept the updated Terms in order to continue your use of the Service. </p>
            <p>If you continue to use our Service after we have modified the Terms, you are agreeing to be bound by the modified Terms. If you don’t agree to be bound by the modified Terms, then you may not use the Service. Because our Service is evolving over time we may change or discontinue all or any part of the Services, at any time and without notice, at our sole discretion. You shall be responsible for reviewing and becoming familiar with any such modifications. Please check the effective date above to determine if there have been any changes since you have last reviewed these Terms. If you do not agree to this Agreement or any modifications to this Agreement, you should not use the Service. </p>

            <h1>Eligibility to use our Service</h1>
            <p>To be eligible to use the Service, you must be able to form legally binding contracts in your jurisdiction and such service should be permitted under its laws. Please make sure that these Terms are in compliance with all laws, rules, and regulations that apply to you. By using our Service, you represent and warrant that you meet all eligibility requirements that we outline in these Terms. We may still refuse to let certain people access or use our Applications and Service, however, we reserve the right to change our eligibility criteria at any time.</p>
            <p>If you are using our Service on behalf of a legal entity, you further represent and warrant that the legal entity is duly organized and validly existing under the applicable laws of the jurisdiction of its organization; and you are duly authorized by such legal entity to act on its behalf. </p>

            <h1>Your Account</h1>
            <p>Jarvis enables the management of an Account which could be controlled and owned by one or multiple personal devices with an Internet functionnality including but limited to a telephone, tablet, computer, and/or other devices (outlined as "Device" or "Devices” in this document). Each Device hosts an encrypted private key which allows to interact with the Account.</p>
            <h2>Account creation</h2>
            <p>In order to receive the Service you must register and create an Account using the functionality provided via the Applications and following the instructions. When you create a new Account, a public address (outlined as "Address” in this document) is assigned to you; your Account will not be active until you execute a deposit of any supported Digital Asset mentioned in the Applications, to the Address. The activation of your Account requires to initiate a Blockchain transaction (outlined as "Transaction” in this document). There may be a delay between your initiation of that Transaction and its execution, resulting in a delay to activate your Account. Such delays may be caused by delays inherent in the functioning of the underlying Blockchain network across which the Transaction will be executed. We do not have any control over this network and shall have no responsibility for any such delays. You will be notified at the execution of the transaction and the completion of your Account creation.</p>
            <h2>Account Security</h2>
            <p>The security of your Account and of your Device(s) are your own personal responsibility and we shall have no liability whatsoever for any failure by you to keep your passwords, pin code, or any other security keys or login information secure and private.</p>
            <h2>Account functionality</h2>
            <p>The Applications provide you the functionality to interact with your Account, to facilitate Transaction of supported Digital Assets. Neither supporting, not supporting, or stop supporting a Digital Asset should be understood as a recommendation or not a recommendation to buy or not to buy, sell or not to sell such asset. Jarvis do not store, send, or receive Digital Asset. Any transfer that occurs in any Digital Asset occurs on the underlying Blockchain that we do not control or own. We cannot and do not ensure that any Transaction that you submit via our Services will be confirmed and processed. By using our Services, you acknowledge and agree that the Transaction you submit may not be completed, or may be substantially delayed, by the Blockchain network. You acknowledge that Transaction cannot be reverted or cancelled; that you choose with who you are entering in a Transaction; that we do not verify and have no control over with who you are entering into a Transaction; that we cannot prevent you from sending Digital Asset to an unintended recipient by mistyping an address; that if you are paying for a good or a service and you are not satisfied with it, we do not facilitate any form of refund or assistance; that delay can happen between the time you initiate a Transaction and the time it is executed; that the value in fiat of a Transaction can differ from the value seen in our Applications to the value seen on another application, site, or service; that the price of a Digital Asset is highly volatile and can dramatically change between the moment a Transaction is initiated and the moment it is executed.</p>
            <p>The Application provides functionality enabling you to appoint more than one Device to control your Account. In order to add another Device, you will need to launch the Applications from it and go through the connection button and follow the instructions. The appointment of such Device is your personal choice and sole responsibility. Appointing such Device is optional, but strongly recommended as it would allow to increase the security of your Account. If you lose one of the Device controlling your Account, you should revoke its access to your Account from another Device controlling it to avoid any malicious and/or undesired access. We suggest measures which include, but are not limited to, ensuring that the Devices you appoint are secure and trustworthy and with an access limited by a strong pin code, password, biometric login, or a multi-factor authenticator (outlined as "Security credential” in this document) as well as adding as many Devices as the Applications allow to control your Account, one of the Device being inaccessible remotely, and securely kept in a safe, at home, or any place with a limited and controlled access (outlined as "Secure place” in this document).</p>
            <p>The Application also provides you the functionality to generate a seed phrase (outlined as "Backup code” in this document) which will allow to recover the access to your Account in the case you have lost the access to all your Devices. Jarvis does not receive or store your Backup code, encrypted private key or unencrypted private key associated with your Account. We cannot, therefore, assist you to recover the access to your Account. If you have not safely stored the Backup code of your Account, you accept and acknowledge that any Digital Asset you have associated with such an Account will become inaccessible. We suggest using the backup functionality provided by the Applications and to save your Backup code on an external hard drive and/or any resistant material and to safeguard it in a Secure place.</p>
            <p>We will not be liable for any loss or damage arising from your failure to comply with this paragraph or for any loss that will occur while performing a Transaction, nor held liable for any dispute that result from a Transaction between you and a recipient. When you create an Account, you are strongly advised to take precautions in order to avoid loss of access to and/or control over your Account and Devices and to use a Secure place to safeguard your Backup code. In any cases, you should promptly notify us if you discover or otherwise suspect any security breaches related to your Account.</p>
            <h2>Use of the Services</h2>
            <p>Generally, you agree to do not use our Services in ways that violate any laws or regulation, including but not limited to any local, provincial, state, federal, national, or international laws (outlined as "Laws” in this document) that may apply to you and you further agree not to encourage or induce any third party to violate such Laws.</p>
            <p>You agree to not use our Services in ways that pay for, support, or otherwise engage in any illegal activities including, but not limited to, illegal gambling, fraud, money laundering, or terrorist activities; violate, misappropriate, or infringe the rights of Jarvis OOD, its partners, employees, affiliates, users, or others, including privacy, publicity, intellectual property, or other proprietary rights; interfere with, or attempt to interfere with, the access of any user, host or network, including, without limitation, sending a virus, overloading, flooding, spamming, or mail-bombing the Services; avoid, bypass, remove, deactivate, impair, descramble or otherwise circumvent any technological measure implemented by us or any of our service providers or any other third party (including another user) to protect the Services or Content; or, that disguise your location through IP proxying or other methods.</p>
            <p>If we discover that you have violated this Agreement or other regulatory requirements we will take proportional disciplinary action. </p>

            <h1>Third party services and content</h1>
            <p>The Services and the Applications may contain links to third-party services, products, website, resources (“Third Party Materials” in this document). </p>
            <p>We provide these links only as a convenience and we do not have control over their content, do not warrant or endorse, and are not responsible for the availability or legitimacy of, or the content, products, services or their privacy policies (if any) on or accessible from, those websites or resources or links displayed therein. We may no warranties or representations, express or implied about such linked Third Party Materials, the third parties they are owned and operated by, the information contained on them or the suitability of their products or services. You acknowledge sole responsibility for and assume all risk arising from your use of any third-party websites, applications, or resources.</p>
            <p>In no event shall a description or reference to a Third Party Materials (including, but not limited to, providing a description or reference via hyperlink) be construed as an endorsement or promotion of such Third Party Materials by us. We retain the exclusive right to add to, modify, or cancel the availability of any Third Party Materials. You will need to make your own independent judgement regarding your interaction with any third party, including the purchase and use of any products or services accessible through them. You accept that any transaction, transfer, or contract which you may enter into with any third party shall be a private arrangement between you and that entity. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such Third Party Materials.</p>

            <h1>License</h1>
            <h2>Open-source license</h2>
            <p>The Applications were developed under the open-source GNU General Public Licence (outlined as "GPL” in this document). It can be accessed, used, and shared, in modified or unmodified form, by anyone. Please be aware that GPL is a copyleft license, which means that any derivative works can only be distributed under the same license terms as the original software. Please review GBP's terms and conditions at https://www.gnu.org/licenses/gpl-3.0.en.html.</p>
            <h2>Intellectual property</h2>
            <p>The Site and Applications also contains copyrighted material and trademarks including, but not limited the Content, which is protected by copyright law, registered and unregistered trademarks, and other intellectual property rights. Unless otherwise provided, we exclusively own the Content. Your use of the Services does not grant you any right, title, or interest in the Content. You agree that you will not copy, transmit, distribute, sell, license, create derivative works from, or, in any other way, exploit any of the Content, in whole or in part.</p>
            <h2>Feedback</h2>
            <p>Jarvis invites you to send us feedback, comments, ideas, and suggestions for improvements to the Services (“Feedback”). You can submit Feedback by emailing us at feedback@jarvis.network. You grant to us a non-exclusive, worldwide, perpetual, irrevocable, fully-paid, royalty-free, sublicensable and transferable license under any and all intellectual property rights that you own or control to use, copy, modify, create derivative works based upon and otherwise exploit the Feedback for any purpose.</p>

            <h1>Warranty disclaimer</h1>
            <p>The Service is provided "as is" and "as available" and without warranty of any kind. To the maximum extent permitted by law, we disclaim all representations and warranties, express or implied, relating to the Services and underlying software or any Content on the Services, whether provided or owned by us or by any third party, including without limitation, warranties of merchantability, fitness for a particular purpose, title, non-infringement, freedom from computer virus, and any implied warranties arising from course of dealing, course of performance, or usage in trade, all of which are expressly disclaimed. In addition, we do not represent or warrant that the Content accessible via the Services is accurate, error-free, complete, available, current, free of viruses or other harmful components, or that the results of using the services will meet your requirements.</p>
            <p>Some jurisdiction do not allow the disclaimer of implied warranties, so the foregoing disclaimers may not apply to you.</p>

            <h1>Limitation of liability</h1>
            <p>You acknowledge and agree that you assume full responsibility for your use of the Site, the Applications and the Service and that you use them at your own risk.</p>
            <p>To the maximum extent not prohibited by law, Jarvis shall not be liable for damages of any type, whether direct or indirect, arising out of or in any way related to your use or inability to use the services, including but not limited to damages allegedly arising from the compromise or loss of your Security credentials or funds or unauthorized access to or alteration of your transmissions or data; or due to the loss of or inability to restore access from your Backup code; or to mistakes, omissions, human errors, interruptions, delays, defects, and/or errors in the transmission of Transactions to the underlying Blockchain network, and/or to risk of unknown vulnerabilities in or unanticipated changes to such network; or to failure of hardware, software, and Internet connections, including public utility or telephone outages, deletions or defects of any Device or network, providers, or software or the risk of malicious software being introduced or found in the software underlying our Applications or your Devices; or for diminution of value of any digital token or digital asset on held in your Account; or by statements or conduct of any third party on the site, the app or the service; or by any actions we take or fail to take as a result of communications you send to us; or by any injury or damage to your Devices; typographical, printing or other errors, or any combination thereof; failure in performance, or interruptions of Service which result directly or indirectly from any cause or condition beyond our reasonable control, including but not limited to any delay or failure due to any case of force majeure; or any other matter relating to the site, the Applications or the Service.</p>
            <p>Jarvis shall not be liable under any circumstances for any lost profits or any special, incidental, indirect, intangible, or consequential damages, whether based in contract, tort, negligence, strict liability, or otherwise, arising out of or in connection with authorized or unauthorized use of the Services, even if an authorized representative of Jarvis has been advised of or knew or should have known of the possibility of such damages.</p>
            <p>Jarvis shall not be liable under any circumstances for damages arising out of or in any way related to software, products, Services, and/or information offered or provided by third parties and accessed through the Applications. Any other terms, conditions, warranties, or representations associated with such content, are solely between you and such organizations and/or individuals.</p>
            <p>Some jurisdictions do not allow the limitation of liability for personal injury, or of incidental or consequential damages, so this limitation may not apply to you.</p>

            <h1>Indemnity</h1>
            <p>To the extent permitted by applicable law, you agree to defend, indemnify and hold harmless Jarvis and its officers, directors, employees and agents, from and against any claims, obligations, disputes, demands, liabilities, damages, losses, costs, debt, and expenses, including, but not limited to, reasonable legal and accounting fees arising out of or in any way connected with your access to or use of the Services or Content, Third Party Materials, or your violation of these Terms, or your violation of any Law.</p>

            <h1>Termination</h1>
            <p>We may terminate or suspend your access and your use to all or part of the Services, at our sole discretion, at any time and without prior notice or liability. You may cancel your Account at any time by following the account closure instructions in the Applications. Your access to the funds in your Account after termination will depend on your access to your Backup code. Upon any termination, discontinuation or cancellation of Services or your Account, the following provisions will survive: Intellectual property, Termination, Warranty Disclaimers, Indemnity, Limitation of Liability, Dispute Resolution, and General Terms.</p>

            <h1>Governing law</h1>
            <p>Bulgarian law will apply to all disputes and the interpretation of these Terms. The Bulgarian courts will have non-exclusive jurisdiction over any dispute arising from or related to your use of the Services. This does not affect your rights under the law of the country in which you are resident, including (where applicable) your right to have a dispute in relation to your use of the Services heard in the courts of that country.</p>
            <p>The parties further agree that any arbitration shall be conducted in their individual capacities only and not as a class action or other representative action, and the parties expressly waive their right to file a class action or seek relief on a class basis. If any court or arbitrator determines that the class action waiver set forth in this paragraph is void or unenforceable for any reason or that an arbitration can proceed on a class basis, then the arbitration provision set forth above shall be deemed null and void in its entirety and the parties shall be deemed to have not agreed to arbitrate disputes.</p>

            <h1>No waiver</h1>
            <p>Our failure to exercise or delay in exercising any right, power, or privilege under this Agreement shall not operate as a waiver; nor shall any single or partial exercise of any right, power, or privilege preclude any other or further exercise thereof.</p>

            <h1>Severability</h1>
            <p>If it turns out that any part of this Agreement is invalid, void, or for any reason unenforceable, that term will be deemed severable and limited or eliminated to the minimum extent necessary. The limitation or elimination of the term will not affect any other terms.</p>

            <h1>Entire agreement</h1>
            <p>This Agreement sets forth the entire understanding and agreement as to the subject matter hereof and supersedes any and all prior discussions, agreements, and understandings of any kind (including, without limitation, any prior versions of this Agreement) and every nature between us. Except as provided for above, any modification to this Agreement must be in writing and must be signed by both parties.</p>

          </div>
          <div className="terms-box-footer">
            <p className="terms-text">Read the full text above. When you have scrolled the bottom, click the check box below to mark that you understand and agree</p>
            <label className="checkbox terms-checkbox">
              <input type="checkbox" checked={isRead} onChange={() => setIsRead(!isRead)} />
              <div className="checkbox-text terms-checkbox-text">I have read and understood the above</div>
            </label>
            <div className="row">
              <button onClick={() => history.push('/welcome')} className="terms-btn button-secondary">I refuse</button>
              <button onClick={() => history.push('/create')} className="terms-btn button-secondary" disabled={!isRead}>I agree</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
