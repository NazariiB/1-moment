export const oneMomentContract = {
  oneMomentAddress: ('0x90305300546A53B881F96BbDE67dCbb9bB269205' as `0x${string}`),
  oneMomentNFTAddress: ('0x530Ea65654F26DaC155f3D4d530D72c3617fD914' as `0x${string}`),
  oneMomentContractAbi: [
    {
      "type": "constructor", "inputs": [{ "name": "_oneMomentNFT", "type": "address", "internalType": "address" }], "stateMutability": "nonpayable"
    }, {
      "type": "function", "name": "accumulatedEthFees", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view"
    }, {
      "type": "function", "name": "accumulatedTokenFees", "inputs": [{ "name": "", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view"
    }, {
      "type": "function", "name": "claimMoment", "inputs": [{ "name": "id", "type": "uint256", "internalType": "uint256" }], "outputs": [], "stateMutability": "nonpayable"
    }, {
      "type": "function", "name": "createMoment", "inputs": [{ "name": "token", "type": "address", "internalType": "address" }, { "name": "amount", "type": "uint256", "internalType": "uint256" }, { "name": "receiver", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "payable"
    }, {
      "type": "function", "name": "createMomentEth", "inputs": [{ "name": "amount", "type": "uint256", "internalType": "uint256" }, { "name": "receiver", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "payable"
    }, {
      "type": "function", "name": "getMoment", "inputs": [{ "name": "id", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "", "type": "tuple", "internalType": "struct IOneMoment.MomentInfo", "components": [{ "name": "creator", "type": "address", "internalType": "address" }, { "name": "receiver", "type": "address", "internalType": "address" }, { "name": "amount", "type": "uint256", "internalType": "uint256" }, { "name": "token", "type": "address", "internalType": "address" }, { "name": "deadline", "type": "uint256", "internalType": "uint256" }, { "name": "status", "type": "uint8", "internalType": "enum IOneMoment.Status" }] }], "stateMutability": "view"
    }, {
      "type": "function", "name": "mintNFT", "inputs": [{ "name": "_tokenURI", "type": "string", "internalType": "string" }], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "payable"
    }, {
      "type": "function", "name": "moment", "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "outputs": [{ "name": "creator", "type": "address", "internalType": "address" }, { "name": "receiver", "type": "address", "internalType": "address" }, { "name": "amount", "type": "uint256", "internalType": "uint256" }, { "name": "token", "type": "address", "internalType": "address" }, { "name": "deadline", "type": "uint256", "internalType": "uint256" }, { "name": "status", "type": "uint8", "internalType": "enum IOneMoment.Status" }], "stateMutability": "view"
    }, {
      "type": "function", "name": "owner", "inputs": [], "outputs": [{ "name": "", "type": "address", "internalType": "address" }], "stateMutability": "view"
    }, {
      "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable"
    }, {
      "type": "function", "name": "supportedTokens", "inputs": [{ "name": "", "type": "address", "internalType": "address" }], "outputs": [{ "name": "minAmount", "type": "uint256", "internalType": "uint256" }, { "name": "active", "type": "bool", "internalType": "bool" }], "stateMutability": "view"
    }, {
      "type": "function", "name": "transferOwnership", "inputs": [{ "name": "newOwner", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable"
    }, {
      "type": "function", "name": "updateSupportedTokens", "inputs": [{ "name": "token", "type": "address", "internalType": "address" }, { "name": "minAmount", "type": "uint256", "internalType": "uint256" }, { "name": "active", "type": "bool", "internalType": "bool" }], "outputs": [], "stateMutability": "nonpayable"
    }, {
      "type": "function", "name": "userOwnsNFT", "inputs": [{ "name": "user", "type": "address", "internalType": "address" }], "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }], "stateMutability": "view"
    }, {
      "type": "function", "name": "withdrawFees", "inputs": [{ "name": "token", "type": "address", "internalType": "address" }, { "name": "to", "type": "address", "internalType": "address" }], "outputs": [], "stateMutability": "nonpayable"
    }, {
      "type": "event", "name": "MomentClaimed", "inputs": [{ "name": "momentId", "type": "uint256", "indexed": true, "internalType": "uint256" }, { "name": "claimer", "type": "address", "indexed": false, "internalType": "address" }], "anonymous": false
    }, {
      "type": "event", "name": "MomentCreated", "inputs": [{ "name": "momentId", "type": "uint256", "indexed": true, "internalType": "uint256" }], "anonymous": false
    }, {
      "type": "event", "name": "OwnershipTransferred", "inputs": [{ "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" }, { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }], "anonymous": false
    }, {
      "type": "error", "name": "OwnableInvalidOwner", "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }]
    }, {
      "type": "error", "name": "OwnableUnauthorizedAccount", "inputs": [{ "name": "account", "type": "address", "internalType": "address" }]
    }],
  oneMomentNFTAbi: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
};
