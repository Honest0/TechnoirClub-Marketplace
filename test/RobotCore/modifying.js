const { expect } = require("chai")
const { BigNumber } = require("ethers")
const { ethers } = require("hardhat")

let owner, RobotCore

beforeEach(async () => {
    ;[owner, user1, user2, user3] = await ethers.getSigners()

    let robotCore = await ethers.getContractFactory("RobotCore")
    RobotCore = await robotCore.deploy(10)

    await RobotCore.createRobotGen0(456776546923336)
    await RobotCore.createRobotGen0(977794796923336)
    await RobotCore.connect(user1).createRobotGen0(877425646443336)
    await RobotCore.createRobotGen0(877425646443336)
    await RobotCore.connect(user2).createRobotGen0(877425646443336)
    await RobotCore.connect(user1).createRobotGen0(877425646443336)
    await RobotCore.connect(user1).createRobotGen0(877425646443336)
    await RobotCore.createRobotGen0(877425646443336)
    await RobotCore.connect(user2).createRobotGen0(877425646443336)
    await RobotCore.createRobotGen0(977768765433336)
})

describe("modifying tests", function () {
    describe("negative tests", function () {
        it("should revert if first robot doesn't belong to the caller of function", async () => {
            await expect(RobotCore.modifying(2, 1)).to.be.revertedWith(
                "One or both of the tokens do not belong to caller"
            )
        })
        it("should revert if second robot doesn't belong to the caller of function", async () => {
            await expect(RobotCore.modifying(1, 2)).to.be.revertedWith(
                "One or both of the tokens do not belong to caller"
            )
        })
        it("should revert if both robots are not owned by the caller of the function", async () => {
            await expect(RobotCore.modifying(4, 2)).to.be.revertedWith(
                "One or both of the tokens do not belong to caller"
            )
        })
        it("should revert if caller of the function trying to modify one robot with one robot", async () => {
            await expect(RobotCore.modifying(1, 1)).to.be.revertedWith("The robot can't modify himself alone")
        })
    })
    describe("positive tests", function () {
        it("should return robot id properly after modifying", async () => {
            await RobotCore.connect(user2).modifying(4, 8)
            result = (await RobotCore.getRobot(10))[0] == 0
            expect(result).to.equal(false)
        })
        it("should return properly build time after modifying", async () => {
            blockNumAfter = await ethers.provider.getBlockNumber()
            blockAfter = await ethers.provider.getBlock(blockNumAfter)
            timestampAfter = blockAfter.timestamp
            await RobotCore.connect(user2).modifying(4, 8)
            expect((await RobotCore.getRobot(10))[1]).to.equal(timestampAfter + 1)
        })
        it("should return firstParent properly after modifying", async () => {
            await RobotCore.connect(user2).modifying(4, 8)
            expect((await RobotCore.getRobot(10))[2]).to.equal(4)
        })
        it("should return secondParent properly after modifying", async () => {
            await RobotCore.connect(user2).modifying(4, 8)
            expect((await RobotCore.getRobot(10))[3]).to.equal(8)
        })
        it("should set generation properly after modifying", async () => {
            await RobotCore.connect(user2).modifying(4, 8)
            expect((await RobotCore.getRobot(10))[4]).to.equal(1)
        })
        it("should return tokenId properly after modifying", async () => {
            await RobotCore.connect(user2).modifying(4, 8)
            await RobotCore.connect(user2).modifying(4, 8)
            expect((await RobotCore.getRobot(11))[5]).to.equal(11)
        })
        it("should return properly generation if firstParent generation is greater than second", async () => {
            await RobotCore.connect(user1).modifying(2, 5)
            await RobotCore.connect(user1).modifying(5, 2)
            await RobotCore.connect(user1).modifying(10, 11)
            await RobotCore.connect(user1).modifying(5, 11)
            await RobotCore.connect(user1).modifying(10, 2)
            expect((await RobotCore.getRobot(14))[4]).to.equal(1)
        })
        it("should return properly generation if secondParent generation is greater than first", async () => {
            await RobotCore.connect(user1).modifying(2, 5)
            await RobotCore.connect(user1).modifying(6, 2)
            await RobotCore.connect(user1).modifying(10, 11)
            await RobotCore.connect(user1).modifying(10, 5)
            await RobotCore.connect(user1).modifying(2, 11)
            expect((await RobotCore.getRobot(14))[4]).to.equal(1)
        })
        it("should return properly generation if secondParent generation is greater 2+ gens than first", async () => {
            await RobotCore.connect(user1).modifying(2, 5)
            await RobotCore.connect(user1).modifying(6, 2)
            await RobotCore.connect(user1).modifying(10, 11)
            await RobotCore.connect(user1).modifying(11, 12)
            await RobotCore.connect(user1).modifying(12, 13)
            await RobotCore.connect(user1).modifying(2, 14)
            expect((await RobotCore.getRobot(15))[4]).to.equal(1)
        })
    })
})
