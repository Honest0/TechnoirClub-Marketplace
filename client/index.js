var web3 = new Web3(Web3.givenProvider)
var instance
var user
var IdStr = "457896541299"

var contract = "0x24695FB2D2fC68cC88AA18bA68BCc41C9EecA39D"
var contractOwner

$(document).ready(function () {
    window.ethereum.enable().then(function (accounts) {
        instance = new web3.eth.Contract(abi, contract, { from: accounts[0] })
        instance.methods
            .owner()
            .call()
            .then((test) => {
                contractOwner = test
            })
        user = accounts[0]
        /*     
    EVENTS
    *   Listen for the `Build` event, and update the UI
    *   This event is generate in the RobotBase contract
    *   when the _createRobot internal method is called
    */

        instance.events
            .Build()
            .on("data", (event) => {
                console.log(event)
                let owner = event.returnValues.owner
                let robotId = event.returnValues.robotId
                let firstRobotParentId = event.returnValues.firstRobotParentId
                let secondRobotParentId = event.returnValues.secondRobotParentId
                let generation = event.returnValues.generation
                let id = event.returnValues.tokenId
                alert_msg(
                    "owner:" +
                        owner +
                        " robotId: " +
                        robotId +
                        " firstRobotParentId: " +
                        firstRobotParentId +
                        " secondRobotParentId: " +
                        secondRobotParentId +
                        " generation: " +
                        generation +
                        " tokenId: " +
                        id,
                    "success"
                )
            })
            .on("error", console.error)

        instance.events
            .MarketTransaction()
            .on("data", (event) => {
                console.log(event)
                var eventType = event.returnValues["TxType"].toString()
                var tokenId = event.returnValues["tokenId"]
                if (eventType == "Buy") {
                    alert_msg("Succesfully Robot purchase! Now you own this Robot with TokenId: " + tokenId, "success")
                }
                if (eventType == "Create offer") {
                    alert_msg("Successfully Offer set for Robot id: " + tokenId, "success")
                    $("#cancelBox").removeClass("hidden")
                    $("#cancelBtn").attr("onclick", "deleteOffer(" + tokenId + ")")
                    $("#sellBtn").attr("onclick", "")
                    $("#sellBtn").addClass("btn-warning")
                    $("#sellBtn").html("<b>For sale at:</b>")
                    var price = $("#robotPrice").val()
                    $("#robotPrice").val(price)
                    $("#robotPrice").prop("readonly", true)
                }
                if (eventType == "Remove offer") {
                    alert_msg("Successfully Offer remove for Robot id: " + tokenId, "success")
                    $("#cancelBox").addClass("hidden")
                    $("#cancelBtn").attr("onclick", "")
                    $("#robotPrice").val("")
                    $("#robotPrice").prop("readonly", false)
                    $("#sellBtn").removeClass("btn-warning")
                    $("#sellBtn").addClass("btn-success")
                    $("#sellBtn").html("<b>Sell me</b>")
                    $("#sellBtn").attr("onclick", "sellRobot(" + tokenId + ")")
                }
            })
            .on("error", console.error)
    })
})

function createRobot() {
    var IdStr = getId()
    let createRobotGen0
    try {
        createRobotGen0 = instance.methods.createRobotGen0(IdStr).send()
    } catch (err) {
        console.log(err)
    }
}

async function checkOffer(id) {
    let getOffer
    try {
        getOffer = await instance.methods.getOffer(id).call()
        var price = getOffer["price"]
        var seller = getOffer["seller"]
        var onsale = false
        //If price more than 0 means that cat is for sale
        if (price > 0) {
            onsale = true
        }
        //Also might check that belong to someone
        price = Web3.utils.fromWei(price, "ether")
        var offer = { seller: seller, price: price, onsale: onsale }
        return offer
    } catch (err) {
        console.log(err)
        return
    }
}

// Get all the robots from address
async function robotByOwner(address) {
    let tokensOfOwner
    try {
        tokensOfOwner = await instance.methods.tokensOfOwner(address).call()
    } catch (err) {
        console.log(err)
    }
}

//Gen 0 robots for sale
async function contractCatalog() {
    var arrayId = await instance.methods.getAllTokensOnSale().call()
    for (i = 0; i < arrayId.length; i++) {
        appendRobot(arrayId[i])
    }
}

//Get robots of a current address
async function myRobots() {
    var arrayId = await instance.methods.tokensOfOwner(user).call()
    for (i = 0; i < arrayId.length; i++) {
        appendRobot(arrayId[i])
    }
}

//Get robots for modifying that are not selected
async function modifyRobots(firstOrSecond) {
    var arrayId = await instance.methods.tokensOfOwner(user).call()
    for (i = 0; i < arrayId.length; i++) {
        appendModify(arrayId[i], firstOrSecond)
    }
}

// Checks that the user address is same as the robot owner address
//This is use for checking if user can sell this robot
async function robotOwnership(id) {
    var address = await instance.methods.ownerOf(id).call()

    if (address.toLowerCase() == user.toLowerCase()) {
        return true
    }
    return false
}

//Appending robots to modify selection
async function appendModify(id, firstOrSecond) {
    var robot = await instance.methods.getRobot(id).call()
    modifyAppend(robot[0], id, robot["generation"], firstOrSecond)
}

//Appending robots to modify selection
async function modify(secondRobot, firstRobot) {
    try {
        await instance.methods.modifying(secondRobot, firstRobot).send()
    } catch (err) {
        log(err)
    }
}

//Appending robots for catalog
async function appendRobot(id) {
    var robot = await instance.methods.getRobot(id).call()
    robotAppend(robot[0], id, robot["generation"])
}

async function singleRobot() {
    var id = get_variables().robotId
    var robot = await instance.methods.getRobot(id).call()
    robotSingle(robot[0], id, robot["generation"])
}

async function deleteOffer(id) {
    try {
        await instance.methods.removeOffer(id).send()
    } catch (err) {
        console.log(err)
    }
}

async function sellRobot(id) {
    var price = $("#robotPrice").val()
    var amount = web3.utils.toWei(price, "ether")
    try {
        await instance.methods.setOffer(amount, id).send()
    } catch (err) {
        console.log(err)
    }
}

async function buyRobot(id, price) {
    var amount = web3.utils.toWei(price, "ether")
    try {
        await instance.methods.buyRobot(id).send({ value: amount })
    } catch (err) {
        console.log(err)
    }
}

async function totalRobots() {
    var robots = await instance.methods.totalSupply().call()
}

