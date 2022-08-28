const hre = require("hardhat")
require("dotenv").config()
const { GEN_0_LIMIT } = process.env

async function main() {
    const RobotCore = await hre.ethers.getContractFactory("RobotCore")
    const robotCore = await RobotCore.deploy(GEN_0_LIMIT)

    console.log("RobotCore deployed to:", robotCore.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
