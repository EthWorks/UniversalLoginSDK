pragma solidity ^0.5.2;

import "./common/MasterBase.sol";
import "./Wallet.sol";

contract WalletMaster is MasterBase, ENSRegistered, ERC1077
{
	constructor()
		ERC1077(address(0))
		public
	{}


	function initializeWithENS(address _key)
		external initialization
	{
		// ERC1836 nonce
		lastNonce = m_nonce;
		// ERC1077 → KeyHolder
		keys[_key].key = _key;
		keys[_key].purpose = MANAGEMENT_KEY;
		emit KeyAdded(keys[_key].key,  keys[_key].purpose);
	}

	function initializeWithENS(address _key, bytes32 _hashLabel, string calldata _name, bytes32 _node, ENS ens, FIFSRegistrar registrar, PublicResolver resolver)
		external initialization
	{
		// ERC1836 nonce
		lastNonce = m_nonce;
		// ERC1077 → KeyHolder
		keys[_key].key = _key;
		keys[_key].purpose = MANAGEMENT_KEY;
		emit KeyAdded(keys[_key].key,  keys[_key].purpose);
		// ENSRegistered
		ENSregister(_hashLabel, _name, _node, ens, registrar, resolver);
	}

	function updateMaster(address _newMaster, bytes calldata _callback)
		external protected
	{
		// ERC1836 nonce
		m_nonce = lastNonce;

		// TODO: reset memory space

		// set next master
		setMaster(_newMaster, _callback);
	}
}
