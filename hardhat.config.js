require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-solhint")
require("@nomiclabs/hardhat-etherscan")
require("solidity-coverage")
require("dotenv").config()
require("solidity-docgen")
require("hardhat-contract-sizer")

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

module.exports = {
    solidity: {
        version: "0.8.15",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        hardhat: {
            initialBaseFeePerGas: 0,
        },
        goerli: {
            url: process.env.GOERLI_API,
            accounts: process.env.PRIVATE_KEY,
        },
        ethereum: {
            chainId: 1,
            url: process.env.MAINNET_API,
            accounts: process.env.PRIVATE_KEY},
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_KEY,
    },
}
