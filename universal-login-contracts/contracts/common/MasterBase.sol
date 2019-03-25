pragma solidity ^0.5.0;

import "./IMaster.sol";
import "./MasterStorage.sol";


contract MasterBase is IMaster, MasterStorage {
    // Need this to handle deposit call forwarded by the proxy
    function () external payable {}

    function master() external view returns (address) {
        return m_master;
    }

    function masterId() external pure returns (bytes32) {
        return 0x26b8c8548d7daec1fffc293834f2cee70c6b9ca8d5c456721fc1fdf9b10dd909;
    }

    function getData(bytes32 _key) external view returns (bytes32) {
        return m_store[_key];
    }

    function setData(bytes32 _key, bytes32 _value) external protected {
        m_store[_key] = _value;
        emit DataChanged(_key, _value);
    }
}
