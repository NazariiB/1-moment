// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract OneMomentNFT is ERC721URIStorage {
    // Track the next token ID manually
    uint256 private _nextTokenId = 1;

    // Mapping from token ID to its creator
    mapping(uint256 => address) public tokenCreators;

    // Events
    event NFTMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string tokenURI
    );

    constructor() ERC721("OneMoment", "OMNT") {}

    /**
     * @dev Creates a new token with a tokenURI that points to metadata
     * @param _tokenURI The token URI pointing to the metadata (typically includes image URL)
     * @return The new token ID
     */
    function mintNFT(string memory _tokenURI) public payable returns (uint256) {
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

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return tokenCreators[tokenId] != address(0);
    }
}
