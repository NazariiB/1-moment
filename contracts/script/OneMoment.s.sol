// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../src/OneMomentNFT.sol";
import "../src/OneMoment.sol";
import {Script, console} from "forge-std/Script.sol";

contract OneMomentDeployScript is Script {
    function run() public {
        uint256 admin = vm.envUint("PK");

        vm.startBroadcast(admin);
        OneMoment oneMoment = new OneMoment(0x530Ea65654F26DaC155f3D4d530D72c3617fD914);
        vm.stopBroadcast();
    }
}
//
//RPC_URL=https://1rpc.io/base
//
//forge script --via-ir script/OneMoment.s.sol:OneMomentDeployScript \
//--rpc-url $RPC_URL \
//-vvvv