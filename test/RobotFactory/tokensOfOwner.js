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
    await RobotCore.createRobotGen0(977768765433336)
    await RobotCore.connect(user2).modifying(3, 7)
})

describe("tokensOfOwner tests", function () {
    describe("should return correctly tokens of owner", function () {
        it("should return id of first token correctly", async () => {
            expect((await RobotCore.tokensOfOwner(owner.address))[0]).to.equal(0)
        })
        it("should return id of second token correctly", async () => {
            expect((await RobotCore.tokensOfOwner(owner.address))[1]).to.equal(2)
        })
        it("should return id of third token correctly", async () => {
            expect((await RobotCore.tokensOfOwner(owner.address))[2]).to.equal(6)
        })
        it("should return id of fourth token correctly", async () => {
            expect((await RobotCore.tokensOfOwner(owner.address))[3]).to.equal(8)
        })
    })
    describe("should return correctly tokens of user1", function () {
        it("should return id of first token correctly", async () => {
            expect((await RobotCore.connect(user2).tokensOfOwner(user1.address))[0]).to.equal(1)
        })
        it("should return id of second token correctly", async () => {
            expect((await RobotCore.tokensOfOwner(user1.address))[1]).to.equal(4)
        })
        it("should return id of third token correctly", async () => {
            expect((await RobotCore.tokensOfOwner(user1.address))[2]).to.equal(5)
        })
    })
    describe("should return correctly tokens of user2", function () {
        it("should return id of first token correctly", async () => {
            expect((await RobotCore.connect(user1).tokensOfOwner(user2.address))[0]).to.equal(3)
        })
        it("should return id of second token correctly", async () => {
            expect((await RobotCore.tokensOfOwner(user2.address))[1]).to.equal(7)
        })
        it("should return id of third token correctly", async () => {
            expect((await RobotCore.tokensOfOwner(user2.address))[2]).to.equal(9)
        })
    })
    describe("should return an empty array if the user doesn't have robots yet", function () {
        it("user3 doenst have any robots", async () => {
            expect((await RobotCore.connect(user1).tokensOfOwner(user3.address))[0]).to.equal(undefined)
        })
    })
})
