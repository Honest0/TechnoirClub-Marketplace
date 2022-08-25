const hre = require("hardhat")

async function main() {
    const RobotCore = await hre.ethers.getContractFactory("RobotCore")
    const robotCore = await RobotCore.deploy(40)

    console.log("RobotCore deployed to:", robotCore.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
