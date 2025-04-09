// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract OneMomentNFT is ERC721URIStorage, Ownable {
    address private constant USDC = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;

    // Track the next token ID manually
    uint256 private _nextTokenId = 1;

    // Mapping from token ID to its creator
    mapping(uint256 => address) public tokenCreators;

    uint256 public ethFeeForMint;
    uint256 public usdcFeeForMint;

    // Events
    event NFTMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string tokenURI
    );

    constructor() Ownable(msg.sender) ERC721("OneMoment", "OMNT") {
        ethFeeForMint = 700000000000000;
        usdcFeeForMint = 1110000;
    }

    /**
     * @dev Creates a new token with a tokenURI that points to metadata
     * @param _tokenURI The token URI pointing to the metadata (typically includes image URL)
     * @return The new token ID
     */
    function mintNFT(string memory _tokenURI, bool native) public payable returns (uint256) {
        redeemMintFee(native);
        uint256 tokenId = _nextTokenId;
        _nextTokenId += 1;

        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        tokenCreators[tokenId] = msg.sender;

        emit NFTMinted(tokenId, msg.sender, _tokenURI);

        return tokenId;
    }

    /**
     * @dev Get the creator of a token
     * @param tokenId The token ID
     * @return The address of the token creator
     */
    function getTokenCreator(uint256 tokenId) external view returns (address) {
        require(_exists(tokenId), "Token does not exist");
        return tokenCreators[tokenId];
    }

    /**
     * @dev Returns current token count
     * @return The current token count (next token ID minus 1)
     */
    function getCurrentTokenCount() external view returns (uint256) {
        return _nextTokenId - 1;
    }

    /**
     * @dev Returns the next token ID that will be used
     * @return The next token ID
     */
    function getNextTokenId() external view returns (uint256) {
        return _nextTokenId;
    }

    function withdrawFees(bool native, address to) external onlyOwner {
        if (native) {
            uint256 amount = address(this).balance;
            (bool success,) = to.call{value: amount}("");
            require(success, "ETH transfer failed");
        } else {
            IERC20 token = IERC20(USDC);
            IERC20(token).transfer(to, token.balanceOf(address(this)));
        }
    }

    function updateMinEthFee(uint256 fee) external onlyOwner {
        ethFeeForMint = fee;
    }

    function updateMinUSDCFee(uint256 fee) external onlyOwner {
        usdcFeeForMint = fee;
    }

    function redeemMintFee(bool native) internal {
        if (native) {
            if (msg.value != ethFeeForMint) {
                revert("msg.value must be equal to ethFeeForMint");
            }
        } else {
            IERC20(USDC).transferFrom(msg.sender, address(this), usdcFeeForMint);
        }
    }


    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return tokenCreators[tokenId] != address(0);
    }
}
