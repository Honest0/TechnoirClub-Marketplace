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

describe("removeOffer tests", function () {
    describe("negative tests", function () {
        it("should revert caller is not the owner of the token", async () => {
            await expect(RobotCore.connect(user1).removeOffer(1)).to.be.revertedWith("The user doesn't own this token")
        })
        it("should revert caller is not the owner of the token", async () => {
            await RobotCore.removeOffer(1)
            await expect(RobotCore.removeOffer(1)).to.be.revertedWith("No such offer exists")
        })
    })
    describe("positive tests", function () {
        it("should return seller address correctly", async () => {
            await RobotCore.modifying(0, 1)
            await RobotCore.setOffer(100000000000000, 10)
            await RobotCore.removeOffer(1)
            expect((await RobotCore.connect(user1).getAllTokensOnSale())[1]).to.equal(10)
        })
        it("should check ownership before removing offer", async () => {
            expect(await RobotCore.connect(user1).ownerOf(3)).to.equal(owner.address)
        })
        it("should check ownership after removing offer", async () => {
            await RobotCore.removeOffer(1)
            expect(await RobotCore.connect(user1).ownerOf(1)).to.equal(owner.address)
        })
    })
})
