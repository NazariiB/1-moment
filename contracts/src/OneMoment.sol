// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./OneMomentNFT.sol";
import "./interfaces/IOneMoment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OneMoment is Ownable, IOneMoment {
    uint256 private _nextMomentId = 1;
    uint256 private constant MIN_ETH = 500000000000000;
    uint256 private constant FEE_PERCENTAGE = 222; // 2.22%
    uint256 private constant FEE_DENOMINATOR = 10000;

    OneMomentNFT private immutable oneMomentNFT;

    uint256 public accumulatedEthFees;
    mapping(uint256 => MomentInfo) public moment;
    mapping(address => uint256) public accumulatedTokenFees;
    mapping(address => SupportedToken) public supportedTokens;

    constructor(address _oneMomentNFT) Ownable(msg.sender) {
        oneMomentNFT = OneMomentNFT(_oneMomentNFT);
        supportedTokens[0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913] = SupportedToken({
            minAmount: 1000000,
            active: true
        });
    }

    function createMoment(address token, uint256 amount, address receiver) public payable returns (uint256) {
        require(userOwnsNFT(msg.sender), "User must own an NFT");
        SupportedToken memory _token = supportedTokens[token];
        if (!_token.active) {
            revert("Token not supported");
        }

        if (amount < _token.minAmount) {
            revert("Amount must be greater than minAmount");
        }

        (uint256 fee, uint256 amountAfterFee) = calculateFee(amount);

        // Accumulate the fee
        accumulateFee(token, fee);

        IERC20(token).transferFrom(msg.sender, address(this), amount);
        uint256 momentId = _createMoment(
            token,
            receiver,
            amountAfterFee
        );
        emit MomentCreated(momentId);
        return momentId;
    }

    function createMomentEth(uint256 amount, address receiver) public payable returns (uint256) {
        require(userOwnsNFT(msg.sender), "User must own an NFT");
        if (amount < MIN_ETH) {
            revert("Amount must be greater than 0.0005 ETH");
        }

        if (msg.value != amount) {
            revert("Amount must be equal to msg.value");
        }

        (uint256 fee, uint256 amountAfterFee) = calculateFee(amount);

        // Accumulate the fee
        accumulateFee(address(0), fee);

        uint256 momentId = _createMoment(
            address(0),
            receiver,
            amountAfterFee
        );

        emit MomentCreated(momentId);
        return momentId;
    }

    function getMoment(uint256 id) view public returns (MomentInfo memory) {
        return moment[id];

    }

    function claimMoment(uint256 id) public {
        require(userOwnsNFT(msg.sender), "User must own an NFT");

        MomentInfo memory _moment = moment[id];

        if (_moment.status != Status.Active) {
            revert("Moment not active");
        }

        if(msg.sender != _moment.receiver && msg.sender != _moment.creator) {
            revert("Only receiver or creator can claim");
        }

        if (msg.sender == _moment.creator && block.timestamp < _moment.deadline) {
            revert("Creator cannot claim before deadline");
        }

        if (msg.sender != _moment.receiver && block.timestamp < _moment.deadline) {
            revert("Only receiver can claim");
        }

        if (_moment.token == address(0)) {
            (bool success,) = msg.sender.call{value: _moment.amount}("");
            require(success, "ETH transfer failed");
        } else {
            IERC20(_moment.token).transfer(msg.sender, _moment.amount);
        }

        if (msg.sender == _moment.creator) {
            _moment.status = Status.ClaimedByCreator;
        } else {
            _moment.status = Status.Claimed;
        }

        emit MomentClaimed(id, msg.sender);
        moment[id] = _moment;
    }

    function withdrawFees(address token, address to) external onlyOwner {
        if (token == address(0)) {
            uint256 amount = accumulatedEthFees;
            accumulatedEthFees = 0;
            (bool success,) = to.call{value: amount}("");
            require(success, "ETH transfer failed");
        } else {
            uint256 amount = accumulatedTokenFees[token];
            accumulatedTokenFees[token] = 0;
            IERC20(token).transfer(to, amount);
        }
    }

    function updateSupportedTokens(address token, uint256 minAmount, bool active) external onlyOwner {
        supportedTokens[token] = SupportedToken({
            minAmount: minAmount,
            active: active
        });
    }

    function _createMoment(address token, address receiver, uint256 amount) internal returns (uint256) {
        uint256 momentId = _nextMomentId;
        _nextMomentId += 1;

        moment[momentId] = MomentInfo({
            creator: msg.sender,
            receiver: receiver,
            amount: amount,
            token: token,
            deadline: block.timestamp + 2 days,
            status: Status.Active
        });

        return momentId;
    }

    function calculateFee(uint256 amount) private pure returns (uint256 fee, uint256 amountAfterFee) {
        fee = (amount * FEE_PERCENTAGE) / FEE_DENOMINATOR;
        amountAfterFee = amount - fee;
        return (fee, amountAfterFee);
    }

    /**
 * @dev Accumulates token fees
     * @param token The token address (address(0) for ETH)
     * @param feeAmount The fee amount to accumulate
     */
    function accumulateFee(address token, uint256 feeAmount) private {
        if (token == address(0)) {
            accumulatedEthFees += feeAmount;
        } else {
            accumulatedTokenFees[token] += feeAmount;
        }
    }

    function userOwnsNFT(address user) public view returns (bool) {
        // Check if the user has a balance greater than 0
        return oneMomentNFT.balanceOf(user) > 0;
    }
}
