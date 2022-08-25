const { expect } = require("chai")
const { BigNumber } = require("ethers")
const { ethers } = require("hardhat")

let owner, RobotCore

beforeEach(async () => {
    ;[owner, user1, user2, user3] = await ethers.getSigners()

    let robotCore = await ethers.getContractFactory("RobotCore")
    RobotCore = await robotCore.deploy(10)

    await RobotCore.createRobotGen0(977794796923336)
    await RobotCore.connect(user1).createRobotGen0(877425646443336)
    await RobotCore.createRobotGen0(877425646443336)
    await RobotCore.connect(user2).createRobotGen0(877425646443336)
    await RobotCore.connect(user1).createRobotGen0(877425646443336)
    await RobotCore.connect(user1).createRobotGen0(877425646443336)
    await RobotCore.createRobotGen0(877425646443336)
    await RobotCore.connect(user2).createRobotGen0(877425646443336)
})

describe("totalSupply test", function () {
    it("should return total supply correctly", async () => {
        expect(await RobotCore.connect(user1).totalSupply()).to.equal(7)
    })
})
