pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol";
import "@kitsune-wallet/contracts/contracts/masters/MasterBase.sol";
import "@kitsune-wallet/contracts/contracts/interfaces/IERC1271.sol";
import "./ENSRegistered.sol";
import "./ERC1077.sol";


/* solium-disable no-empty-blocks */
contract WalletMaster is MasterBase, ENSRegistered, ERC1077, IERC1271, IERC721Receiver {
    constructor()
        ERC1077(address(0))
        public
    {}

    function initialize(address _key) external onlyInitializing() {
        // TODO: sync persistent nonce
        // lastNonce = _nonce;
        // ERC1077 → KeyHolder
        keys[_key].key = _key;
        keys[_key].purpose = MANAGEMENT_KEY;
        keyCount = 1;
        requiredSignatures = 1;
        emit KeyAdded(keys[_key].key,  keys[_key].purpose);
    }

    function initializeWithENS(
        address _key,
        bytes32 _hashLabel,
        string calldata _name,
        bytes32 _node, ENS ens,
        FIFSRegistrar registrar,
        PublicResolver resolver) external onlyInitializing()
    {
        // TODO: sync persistent nonce
        // lastNonce = _nonce;
        // ERC1077 → KeyHolder
        keys[_key].key = _key;
        keys[_key].purpose = MANAGEMENT_KEY;
        keyCount = 1;
        requiredSignatures = 1;
        emit KeyAdded(keys[_key].key,  keys[_key].purpose);
        // ENSRegistered
        registerENS(_hashLabel, _name, _node, ens, registrar, resolver);
    }

    // Update built-in by default → update controller
    function _controller() internal view returns(address) {
      return address(this);
    }

    // Update built-in by default → default internal cleanup function reverts
    // function cleanup() internal { ... }

    function isValidSignature(bytes32 _data, bytes memory _signature) public view returns (bool isValid) {
        return keyExist(_data.recover(_signature));
    }

    function onERC721Received(address, address, uint256, bytes memory) public returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
