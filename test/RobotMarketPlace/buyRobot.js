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

describe("buyRobot tests", function () {
    describe("negative tests", function () {
        it("should revert if buyer doesnt pay", async () => {
            await RobotCore.modifying(0, 1)
            await RobotCore.setOffer(1000000000000000, 10)
            await expect(RobotCore.connect(user1).buyRobot(10)).to.be.revertedWith("The price is not correct")
        })
        it("should revert if buyer specify price incorrectly", async () => {
            await RobotCore.modifying(0, 1)
            await RobotCore.setOffer(1000000000000000, 10)
            await expect(
                RobotCore.connect(user1).buyRobot(10, { value: ethers.utils.parseEther("0.2") })
            ).to.be.revertedWith("The price is not correct")
        })
    })
    describe("positive tests", function () {
        it("should return seller address correctly", async () => {
            await RobotCore.modifying(0, 1)
            await RobotCore.setOffer(100000000000000, 10)
            await RobotCore.connect(user1).buyRobot(3, { value: ethers.utils.parseEther("0.2") })
            expect((await RobotCore.connect(user1).getAllTokensOnSale())[3]).to.equal(10)
        })
        it("should check ownership before buying", async () => {
            expect(await RobotCore.connect(user1).ownerOf(3)).to.equal(owner.address)
        })
        it("should check transfer of ownership after buying", async () => {
            await RobotCore.connect(user1).buyRobot(3, { value: ethers.utils.parseEther("0.2") })
            expect(await RobotCore.connect(user1).ownerOf(3)).to.equal(user1.address)
        })
    })
})
