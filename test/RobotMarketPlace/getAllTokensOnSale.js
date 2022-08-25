const { expect } = require("chai")
const { BigNumber } = require("ethers")
const { ethers } = require("hardhat")

let owner, RobotCore

beforeEach(async () => {
    ;[owner, user1, user2, user3] = await ethers.getSigners()

    let robotCore = await ethers.getContractFactory("RobotCore")
    RobotCore = await robotCore.deploy(10)
})

describe("getAllTokensOnSale tests", function () {
    it("should return empty array if there are no offers", async () => {
        result = (await RobotCore.connect(user1).getAllTokensOnSale())[0] == undefined
        expect(result).to.equal(true)
    })
    it("should check ownership before buying", async () => {
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
        await RobotCore.connect(user2).removeOffer(4)
        expect((await RobotCore.connect(user1).getAllTokensOnSale())[4]).to.equal(9)
    })
    it("should check ownership before buying", async () => {
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
        await RobotCore.connect(user2).removeOffer(4)
        expect((await RobotCore.connect(user1).getAllTokensOnSale())[5]).to.equal(5)
    })
})
