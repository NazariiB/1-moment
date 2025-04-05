// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

interface IOneMoment {
    struct MomentInfo {
        address creator;
        address receiver;
        uint256 amount;
        address token;
        uint256 deadline;
        Status status;
    }

    struct SupportedToken {
        uint256 minAmount;
        bool active;
    }

    enum Status {
        Active,
        Claimed,
        ClaimedByCreator
    }

    event MomentCreated(uint256 indexed momentId);
    event MomentClaimed(uint256 indexed momentId, address claimer);
}