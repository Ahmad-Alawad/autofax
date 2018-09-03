

pragma solidity ^0.4.0;

contract Interface {
    
    function setMaintance(address _owner, string _VIN, string maintanceDesc, uint milage) public;
    
    function getLength(string _VIN) public view returns(uint);
    
    function getHistory(string _VIN, uint index) public view returns (address, address, string, uint, uint);
    
}
