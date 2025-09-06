// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PassportNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) public tierLevel;
    
    // RISE Testnet için event'ler
    event PassportMinted(address indexed to, uint256 tokenId, string tier);
    event TierUpdated(uint256 tokenId, string newTier);

    constructor() ERC721("YAWZ Passport", "YAWZPASS") Ownable(msg.sender) {}

    function mint(address to, string memory uri, string memory tier) public onlyOwner {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
        tierLevel[tokenId] = tier;
        
        emit PassportMinted(to, tokenId, tier);
    }

    function getTier(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tierLevel[tokenId];
    }
    
    function updateTier(uint256 tokenId, string memory newTier) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        tierLevel[tokenId] = newTier;
        emit TierUpdated(tokenId, newTier);
    }
    
    // Kullanıcının sahip olduğu tüm token'ları getir
    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokens = new uint256[](balance);
        uint256 index = 0;
        
        for (uint256 i = 0; i < nextTokenId; i++) {
            if (_ownerOf(i) == owner) {
                tokens[index] = i;
                index++;
            }
        }
        
        return tokens;
    }
}
