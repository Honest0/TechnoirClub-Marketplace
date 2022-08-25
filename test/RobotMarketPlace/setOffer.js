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

describe("setOffer tests", function () {
    describe("negative tests", function () {
        it("should revert if price for setting offer is lower than required", async () => {
            await RobotCore.modifying(0, 1)
            await expect(RobotCore.setOffer(0, 10)).to.be.revertedWith("Price cannot be zero")
        })
        it("should revert if price for setting offer is lower than required", async () => {
            await RobotCore.modifying(0, 1)
            await RobotCore.setOffer(1000000000000000, 10)
            await expect(RobotCore.setOffer(1000000000000000, 10)).to.be.revertedWith(
                "You can't sell twice the same offers"
            )
        })
    })
    describe("positive tests", function () {
        it("should return seller address correctly", async () => {
            await RobotCore.modifying(0, 1)
            await RobotCore.setOffer(1000000000000000, 10)
            expect((await RobotCore.connect(user1).getOffer(10))[0]).to.equal(owner.address)
        })
        it("should return price correctly", async () => {
            await RobotCore.modifying(0, 1)
            await RobotCore.setOffer(1000000000000000, 10)
            expect((await RobotCore.connect(user1).getOffer(10))[1]).to.equal(1000000000000000)
        })
        it("should return tokenId correctly", async () => {
            await RobotCore.modifying(0, 1)
            await RobotCore.setOffer(1000000000000000, 10)
            expect((await RobotCore.connect(user1).getOffer(10))[2]).to.equal(10)
        })
    })
})
