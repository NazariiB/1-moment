// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {CommonBase} from "../lib/forge-std/src/Base.sol";
import {StdAssertions} from "../lib/forge-std/src/StdAssertions.sol";
import {StdChains} from "../lib/forge-std/src/StdChains.sol";
import {StdCheats, StdCheatsSafe} from "../lib/forge-std/src/StdCheats.sol";
import {StdUtils} from "../lib/forge-std/src/StdUtils.sol";
import {Test} from "../lib/forge-std/src/Test.sol";
import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {OneMoment} from "../src/OneMoment.sol";
import {OneMomentNFT} from "../src/OneMomentNFT.sol";
import {IOneMoment} from "../src/interfaces/IOneMoment.sol";

contract OneMomentTest is Test {
    OneMoment public oneMoment;
    OneMomentNFT public oneMomentNFT;
    IERC20 public USDC = IERC20(0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913);
    address public admin;
    address public player1;
    address public player2;
    address public nftTester;

    function setUp() public {

        vm.createSelectFork(vm.rpcUrl("base"), 28528455);
        admin = makeAddr("admin");
        vm.startPrank(admin);
        oneMomentNFT = new OneMomentNFT();
        oneMoment = new OneMoment(address(oneMomentNFT));
        vm.stopPrank();

        player1 = makeAddr("player1");
        player2 = makeAddr("player2");
        nftTester = makeAddr("nftTester");

        vm.deal(admin, 10 ether);
        vm.deal(player1, 1 ether);
        vm.deal(player2, 1 ether);
        vm.deal(nftTester, 1 ether);

        uint256 usdcAmount = 1000 * 10 ** 6;

        deal(address(USDC), player1, usdcAmount);
        deal(address(USDC), player2, usdcAmount);
        deal(address(USDC), nftTester, usdcAmount);
    }

    function testNftMintWithEth() public {
        string memory tokenURI = "https://example.com/metadata.json";
        vm.startPrank(nftTester);
        uint256 tokenId = oneMomentNFT.mintNFT{value: 0.0007 ether}(tokenURI, true);
        vm.stopPrank();

        // Check that the token ID is valid
        assertEq(tokenId, 1, "Token ID should be 1");

        // Check that the token URI is set correctly
        string memory retrievedTokenURI = oneMomentNFT.tokenURI(tokenId);
        assertEq(retrievedTokenURI, tokenURI, "Token URI should match");
    }

    function testNftMintWithUSDC() public {
        string memory tokenURI = "https://example.com/metadata.json";
        vm.startPrank(nftTester);
        USDC.approve(address(oneMomentNFT), 1e18);
        uint256 tokenId = oneMomentNFT.mintNFT(tokenURI, false);
        vm.stopPrank();

        // Check that the token ID is valid
        assertEq(tokenId, 1, "Token ID should be 1");

        // Check that the token URI is set correctly
        string memory retrievedTokenURI = oneMomentNFT.tokenURI(tokenId);
        assertEq(retrievedTokenURI, tokenURI, "Token URI should match");
    }

    function testCreateMoment() public {
        string memory tokenURI = "https://example.com/metadata.json";
        oneMomentNFT.mintNFT{value: 0.0007 ether}(tokenURI, true);
        address user = address(0x123);
        vm.startPrank(user);
        vm.deal(user, 1 ether); // Give the user some ether
        vm.expectRevert("User must own an NFT");
        oneMoment.createMoment(address(0), 1000000, address(0));
        vm.stopPrank();
    }

    function testCreateMomentWithUSDC() public {
        // Mint an NFT for player1
        vm.startPrank(player1);
        string memory tokenURI = "https://example.com/metadata.json";
        oneMomentNFT.mintNFT{value: 0.0007 ether}(tokenURI, true);
        vm.stopPrank();

        // Player1 creates a moment with USDC
        vm.startPrank(player1);

        // Approve USDC transfer
        uint256 amount = 100 * 10 ** 6; // 100 USDC
        USDC.approve(address(oneMoment), amount);

        // Check player1's initial USDC balance
        uint256 initialBalance = USDC.balanceOf(player1);
        assertTrue(initialBalance >= amount, "Player1 should have enough USDC");

        // Create moment
        uint256 momentId = oneMoment.createMoment(address(USDC), amount, player2);
        vm.stopPrank();

        IOneMoment.MomentInfo memory moment = oneMoment.getMoment(momentId);

        // Calculate expected amount after fee (2.22%)
        uint256 expectedFee = (amount * 222) / 10000;
        uint256 expectedAmount = amount - expectedFee;

        // Assertions
        assertEq(moment.creator, player1, "Creator should be player1");
        assertEq(moment.receiver, player2, "Receiver should be player2");
        assertEq(moment.amount, expectedAmount, "Amount should be after fee deduction");
        assertEq(moment.token, address(USDC), "Token should be USDC");

        // Verify player1's USDC balance decreased
        uint256 finalBalance = USDC.balanceOf(player1);
        assertEq(finalBalance, initialBalance - amount, "Player1 should have spent the USDC");

        // Verify contract received USDC
        uint256 contractBalance = USDC.balanceOf(address(oneMoment));
        assertEq(contractBalance, amount, "Contract should have received the USDC");

        // Verify accumulated fees
        uint256 accumulatedFees = oneMoment.accumulatedTokenFees(address(USDC));
        assertEq(accumulatedFees, expectedFee, "Accumulated fees should match expected");
    }

    function testPlayerClaimsUSDCMoment() public {
        // Create a moment first
        testCreateMomentWithUSDC();

        vm.startPrank(player2);
        string memory tokenURI = "https://example.com/metadata.json";
        oneMomentNFT.mintNFT{value: 0.0007 ether}(tokenURI, true);
        vm.stopPrank();

        // Get the moment ID (should be 1 assuming it's the first moment)
        uint256 momentId = 1;

        // Check player2's initial USDC balance
        uint256 initialBalance = USDC.balanceOf(player2);

        // Player2 claims the moment
        vm.startPrank(player2);
        oneMoment.claimMoment(momentId);
        vm.stopPrank();

        // Get moment info after claim
        IOneMoment.MomentInfo memory moment = oneMoment.getMoment(momentId);

        // Verify status is now Claimed
        //assertEq(moment.status, IOneMoment.Status.Claimed, "Status should be Claimed");

        // Verify player2's USDC balance increased by the moment amount
        uint256 finalBalance = USDC.balanceOf(player2);
        assertEq(finalBalance, initialBalance + moment.amount, "Player2 should have received the USDC");
    }

    function testWithdrawFees() public {
        // First, create a moment to accumulate some fees
        testCreateMomentWithUSDC();

        // Check the accumulated fees
        uint256 expectedFee = (100 * 10 ** 6 * 222) / 10000; // 2.22% of 100 USDC
        uint256 accumulatedFees = oneMoment.accumulatedTokenFees(address(USDC));
        assertEq(accumulatedFees, expectedFee, "Accumulated fees should match expected");

        // Create a recipient address for the fees
        address feeRecipient = makeAddr("feeRecipient");

        // Check initial balance of the recipient
        uint256 initialBalance = USDC.balanceOf(feeRecipient);

        // Admin withdraws the fees
        vm.startPrank(admin);
        oneMoment.withdrawFees(address(USDC), feeRecipient);
        vm.stopPrank();

        // Check the recipient received the fees
        uint256 finalBalance = USDC.balanceOf(feeRecipient);
        assertEq(finalBalance, initialBalance + expectedFee, "Fee recipient should have received the fees");

        // Check the accumulated fees were reset
        uint256 remainingFees = oneMoment.accumulatedTokenFees(address(USDC));
        assertEq(remainingFees, 0, "Accumulated fees should be reset to 0");
    }

    function testWithdrawEthFees() public {
        // Create an ETH moment to accumulate ETH fees
        uint256 amount = 0.1 ether;

        // Mint an NFT for player1
        vm.startPrank(admin);
        string memory tokenURI = "https://example.com/metadata.json";
        uint256 tokenId = oneMomentNFT.mintNFT{value: 0.0007 ether}(tokenURI, true);

        // Transfer NFT to player1
        oneMomentNFT.transferFrom(admin, player1, tokenId);
        vm.stopPrank();

        // Player1 creates a moment with ETH
        vm.startPrank(player1);
        oneMoment.createMomentEth{value: amount}(amount, player2);
        vm.stopPrank();

        // Calculate expected fee
        uint256 expectedFee = (amount * 222) / 10000; // 2.22% of 0.1 ETH

        // Verify accumulated ETH fees
        uint256 accumulatedFees = oneMoment.accumulatedEthFees();
        assertEq(accumulatedFees, expectedFee, "Accumulated ETH fees should match expected");

        // Create a recipient address for the fees
        address feeRecipient = makeAddr("feeRecipient");
        uint256 initialBalance = feeRecipient.balance;

        // Admin withdraws the ETH fees
        vm.startPrank(admin);
        oneMoment.withdrawFees(address(0), feeRecipient);
        vm.stopPrank();

        // Check the recipient received the fees
        uint256 finalBalance = feeRecipient.balance;
        assertEq(finalBalance, initialBalance + expectedFee, "Fee recipient should have received the ETH fees");

        // Check the accumulated fees were reset
        uint256 remainingFees = oneMoment.accumulatedEthFees();
        assertEq(remainingFees, 0, "Accumulated ETH fees should be reset to 0");
    }

    function testOnlyOwnerCanWithdrawFees() public {
        // First, create a moment to accumulate some fees
        testCreateMomentWithUSDC();

        address feeRecipient = makeAddr("feeRecipient");

        vm.startPrank(player1);
        vm.expectRevert(); // Should revert with an "Ownable: caller is not the owner" message
        oneMoment.withdrawFees(address(USDC), feeRecipient);
        vm.stopPrank();
    }

    function testCreatorClaimExpiredMoment() public {
        // Mint an NFT for player1
        vm.startPrank(admin);
        string memory tokenURI = "https://example.com/metadata.json";
        uint256 tokenId = oneMomentNFT.mintNFT{value: 0.0007 ether}(tokenURI, true);

        // Transfer NFT to player1
        oneMomentNFT.transferFrom(admin, player1, tokenId);
        vm.stopPrank();

        // Player1 creates a moment with USDC
        vm.startPrank(player1);

        // Approve USDC transfer
        uint256 amount = 100 * 10 ** 6; // 100 USDC
        USDC.approve(address(oneMoment), amount);

        // Create moment
        uint256 momentId = oneMoment.createMoment(address(USDC), amount, player2);
        vm.stopPrank();

        // Calculate expected amount after fee (2.22%)
        uint256 expectedFee = (amount * 222) / 10000;
        uint256 expectedAmount = amount - expectedFee;

        // Check player1's initial USDC balance before claiming
        uint256 initialBalance = USDC.balanceOf(player1);

        // Fast forward time past the deadline (2 days + 1 second)
        vm.warp(block.timestamp + 2 days + 1);

        // Player1 (creator) tries to claim the moment
        vm.startPrank(player1);
        oneMoment.claimMoment(momentId);
        vm.stopPrank();

//        // Verify the moment status changed to ClaimedByCreator
//        (
//            ,
//            ,
//            ,
//            ,
//            ,
//            uint8 status
//        ) = oneMoment.moment(momentId);
//
//        assertEq(status, uint8(IOneMoment.Status.ClaimedByCreator), "Status should be ClaimedByCreator");

        // Verify player1 received the funds back
        uint256 finalBalance = USDC.balanceOf(player1);
        assertEq(finalBalance, initialBalance + expectedAmount, "Creator should have received the funds back");
    }

    function testCreatorCannotClaimBeforeDeadline() public {
        // Mint an NFT for player
        vm.startPrank(admin);
        string memory tokenURI = "https://example.com/metadata.json";
        uint256 tokenId = oneMomentNFT.mintNFT{value: 0.0007 ether}(tokenURI, true);

        // Transfer NFT to player1
        oneMomentNFT.transferFrom(admin, player1, tokenId);
        vm.stopPrank();

        // Player1 creates a moment with USDC
        vm.startPrank(player1);

        // Approve USDC transfer
        uint256 amount = 100 * 10 ** 6; // 100 USDC
        USDC.approve(address(oneMoment), amount);

        // Create moment
        uint256 momentId = oneMoment.createMoment(address(USDC), amount, player2);

        // Creator tries to claim before deadline - should revert
        vm.expectRevert("Creator cannot claim before deadline");
        oneMoment.claimMoment(momentId);

        vm.stopPrank();

        IOneMoment.MomentInfo memory moment = oneMoment.getMoment(momentId);

        assertEq(uint8(moment.status), uint8(IOneMoment.Status.Active), "Status should still be Active");
    }

    function testOnlyReceiverOrCreatorCanClaim() public {
        // Mint an NFT for player1
        vm.startPrank(admin);
        string memory tokenURI = "https://example.com/metadata.json";
        uint256 tokenId = oneMomentNFT.mintNFT{value: 0.0007 ether}(tokenURI, true);

        // Transfer NFT to player1
        oneMomentNFT.transferFrom(admin, player1, tokenId);
        vm.stopPrank();

        // Player1 creates a moment with USDC
        vm.startPrank(player1);
        uint256 amount = 100 * 10 ** 6; // 100 USDC
        USDC.approve(address(oneMoment), amount);
        uint256 momentId = oneMoment.createMoment(address(USDC), amount, player2);
        vm.stopPrank();

        // Create a random third user
        address player3 = makeAddr("player3");

        vm.deal(player3, 1 ether);
        vm.startPrank(player3);
        oneMomentNFT.mintNFT{value: 0.0007 ether}(tokenURI, true);
        vm.stopPrank();

        // Player3 tries to claim the moment - should revert
        vm.startPrank(player3);
        vm.expectRevert("Only receiver or creator can claim");
        oneMoment.claimMoment(momentId);
        vm.stopPrank();

        // Verify the moment is still active
        IOneMoment.MomentInfo memory moment = oneMoment.getMoment(momentId);

        assertEq(uint8(moment.status), uint8(IOneMoment.Status.Active), "Status should still be Active");
    }

}

