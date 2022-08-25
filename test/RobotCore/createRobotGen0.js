const { expect } = require("chai")
const { BigNumber } = require("ethers")
const { ethers } = require("hardhat")

let owner, RobotCore

beforeEach(async () => {
    ;[owner, user1, user2, user3] = await ethers.getSigners()

    let robotCore = await ethers.getContractFactory("RobotCore")
    RobotCore = await robotCore.deploy(10)

    await RobotCore.createRobotGen0(977794796923336)
    await RobotCore.createRobotGen0(877425646443336)
    await RobotCore.createRobotGen0(977768765433336)
})

describe("createRobotGen0 tests", function () {
    describe("negative test", function () {
        it("should revert if owner created already maximum of gen0 robots", async () => {
            await RobotCore.createRobotGen0(101396103113131)
            await RobotCore.createRobotGen0(934567898765336)
            await RobotCore.createRobotGen0(977723456787656)
            await RobotCore.createRobotGen0(123454321233656)
            await RobotCore.createRobotGen0(443434446787656)
            await RobotCore.createRobotGen0(577723456787656)
            await RobotCore.createRobotGen0(677723456787656)
            await expect(RobotCore.createRobotGen0(777723456787656)).to.be.revertedWith(
                "Gen0 the number of robots has reached its maximum"
            )
        })
    })
    describe("positive tests", function () {
        it("should increment gen 0 robot amount after every createRobotGe0 call success", async () => {
            expect(await RobotCore.getCreatedGen0()).to.equal(3)
        })
        it("should return gen0 robot id properly", async () => {
            expect((await RobotCore.getRobot(1))[0]).to.equal(877425646443336)
        })
        it("should return gen0 robot build time properly", async () => {
            blockNumAfter = await ethers.provider.getBlockNumber()
            blockAfter = await ethers.provider.getBlock(blockNumAfter)
            timestampAfter = blockAfter.timestamp
            await RobotCore.createRobotGen0(977768765433336)
            expect((await RobotCore.getRobot(3))[1]).to.equal(timestampAfter + 1)
        })
        it("should call return gen0t robot first paren properly", async () => {
            expect((await RobotCore.getRobot(2))[2]).to.equal(0)
        })
        it("should call return gen0t robot second parent properly", async () => {
            expect((await RobotCore.getRobot(1))[3]).to.equal(0)
        })
        it("should call return gen0 robot generation properly", async () => {
            expect((await RobotCore.getRobot(0))[4]).to.equal(0)
        })
        it("should call return gen0 robot token id properly", async () => {
            expect((await RobotCore.getRobot(2))[5]).to.equal(2)
        })
    })
})
