pragma solidity ^0.4.0;

import "./Interface.sol";  

contract AutoFax is Interface 
{

    string public VIN;
    string public model;
    string public owner;
    uint   public milage;
    struct MaintanceObject
    {
        address owner;
        address entryPerson;
        string desc;
        uint milage;
        uint time;
    }
    
    mapping (string => MaintanceObject[]) maintanceHistory;
    
    constructor (string _VIN, 
        string _model)
    {
        VIN = _VIN;
        owner = "";
        milage = 0;
    }

    function setMaintance(address _owner, string _VIN, string maintanceDesc, uint milage) 
    {
        MaintanceObject memory object = MaintanceObject(_owner, msg.sender, maintanceDesc, milage, now);
        maintanceHistory[_VIN].push(object);
        
        
    }
    
    function getLength(string _VIN) public view returns(uint)
    {
        return maintanceHistory[_VIN].length;
    }
    
    function getHistory(string _VIN, uint index) public view returns (address, address, string, uint, uint)
    {
        return (maintanceHistory[_VIN][index].owner, maintanceHistory[_VIN][index].entryPerson, maintanceHistory[_VIN][index].desc, maintanceHistory[_VIN][index].milage, maintanceHistory[_VIN][index].time);
    }

  
}
