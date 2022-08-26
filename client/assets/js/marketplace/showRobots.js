// File for fetching all the robots from smart contrat
// into the marketplace

//Append each Robot card as a marketplace
function robotAppend(id, index, generation) {
    //1 return robot ID into readable string
    var RobotId = idRobot(id)
    //2 build the robotBox into HTML
    robotBox(index)
    //3 Render the robots CSS style depending on ID string
    renderRobot(RobotId, index)
    $("#robotview" + index).attr("onclick", 'go_to("robotDetails.html?robotId=' + index + '")')
    $("#robotId" + index).html(
        `
    <span><h4 class="tsp-2 m-0"><b>GENERATION:</b>` +
            generation +
            `</h4></span>
    <br>
    <span><h4 class="tsp-2 m-0"><b>ID:</b>` +
            id +
            `</h4></span>`
    )
}

//Append robot for breeding
function modifyAppend(id, index, generation, firstOrSecond) {
    //1 return robot ID into readable string
    var RobotId = idRobot(id)
    //2 build the robotBox into HTML
    robotBox(index)
    //3 Render the robots CSS style depending on ID string
    renderRobot(RobotId, index)
    $("#robotId" + index).html(
        `
    <span><h4 class="tsp-2 m-0"><b>GENERATION:</b>` +
            generation +
            `</h4></span>
    <br>
    <span><h4 class="tsp-2 m-0"><b>ID:</b>` +
            id +
            `</h4></span>`
    )

    $("#robotview" + index).attr(
        "onclick",
        'selectModify("' + id + '","' + index + '","' + generation + '","' + firstOrSecond + '")'
    )
}

function selectModify(id, index, generation, firstOrSecond) {
    var place
    var RobotId = idRobot(id)
    //2 build the robotSingle into HTML
    var body = robotBody(firstOrSecond)
    var Attributes = attributes(firstOrSecond)
    $("#attributes" + firstOrSecond).html(Attributes)
    $("#" + firstOrSecond).html(body)
    //3 Render the robots CSS style depending on ID string
    renderRobot(RobotId, firstOrSecond)
    $("#" + firstOrSecond).addClass("modifySelect")
    $("#" + firstOrSecond).attr("data-robotid", index)
    $("#" + firstOrSecond).attr("onclick", 'modifyRobots("' + firstOrSecond + '")')
    $("#robotId" + firstOrSecond).html(
        `
    <span><h4 class="tsp-2 m-0"><b>GENERATION:</b>` +
            generation +
            `</h4><input class="hidden" id="` +
            firstOrSecond +
            `Id" type="number" value=` +
            index +
            `></span>
    <br>
    <span><h4 class="tsp-2 m-0"><b>ID:</b>` +
            id +
            `</h4></span>`
    )
    $("#robotSelection").modal("hide")
    removeSelection(index, firstOrSecond)
    readyToModify()
}

function readyToModify() {
    var firstRobotParentId = $("#FirstId").val()
    var secondRobotParentId = $("#SecondId").val()

    if (!empty(firstRobotParentId) && !empty(secondRobotParentId)) {
        $("#modify").css("filter", "none")
        $("#modify").prop("disabled", false)
        $("#modify").attr("onclick", 'modify("' + secondRobotParentId + '","' + firstRobotParentId + '")')
        return true
    }
    $("#modify").prop("disabled", true)
    $("#modify").css("filter", " grayscale()")
    return false
}

//If user select a selected robot from any firstOrSecond parameter, its remove it from the selection box
function removeSelection(id, firstOrSecond) {
    var selectionDiv =
        `<div align="center">
                                <div class="scheme">
                                </div>
                                <h4>Select a robot as ` +
        firstOrSecond +
        `</h4>
                            </div>
                        </div>`

    if (firstOrSecond == "FirstParent") {
        var robotData = $("#SecondParent").attr("data-robotid")
        if (robotData == id) {
            $("#SecondParent").attr("data-robotid", 0)
            $("#SecondParent").attr("onclick", "modifyRobots(this.id)")
            $("#SecondParent").html(selectionDiv)
            $("#SecondParent").removeClass("modifySelect")
            $("#robotIdSecond").html("")
        }
    }
    if (firstOrSecond == "SecondParent") {
        var robotData = $("#FirstParent").attr("data-robotid")
        if (robotData == id) {
            $("#FirstParent").attr("data-robotid", 0)
            $("#FirstParent").attr("onclick", "modifyRobots(this.id)")
            $("#FirstParent").html(selectionDiv)
            $("#FirstParent").removeClass("modifySelect")
            $("#robotIdFirst").html("")
        }
    }
}

async function robotSingle(id, index, generation) {
    var RobotId = idRobot(id)
    //2 build the robotSingle into HTML
    var body = robotBody(index)
    var Attributes = attributes(index)
    $("#attributes").html(Attributes)
    $("#robotSingle").html(body)
    //3 Render the robots CSS style depending on ID string
    renderRobot(RobotId, index)
    $("#idRobot").html(
        `
    <span><h4 class="tsp-2 m-0"><b>GENERATION:</b>` +
            generation +
            `</h4></span>
    <br>
    <span><h4 class="tsp-2 m-0"><b>ID:</b>` +
            id +
            `</h4></span>`
    )

    await robotOffer(index)
}

// Checks the Robot on market situation
async function robotOffer(id) {
    //Checking if this robot is for Sale
    var offer = await checkOffer(id)
    var seller = offer.seller.toLocaleLowerCase()
    if (offer.onsale == true && seller != user) {
        $("#buyBox").removeClass("hidden")
        $("#priceBtn").html("<b>" + offer.price + " ETH</b>")
        $("#buyBtn").attr("onclick", "buyRobot(" + id + ',"' + offer.price + '")')
    }

    var ownership = await robotOwnership(id)
    //If user owns the robot
    if (ownership == true) {
        //If is not on sale
        if (offer.onsale == false) {
            $("#sellBox").removeClass("hidden")
            $("#sellBtn").attr("onclick", "sellRobot(" + id + ")")
        } else {
            $("#sellBox").removeClass("hidden")
            $("#cancelBox").removeClass("hidden")
            $("#cancelBtn").attr("onclick", "deleteOffer(" + id + ")")
            $("#sellBtn").addClass("btn-success")
            $("#sellBtn").html("<b>For sale at:</b>")
            $("#robotPrice").val(offer.price)
            $("#robotPrice").prop("readonly", true)
        }
    }
}

//Apply robot CSS Styles from buidRobot.js

function renderRobot(id, index) {
    eyeVariation(id.eyesShape, index)
    decorationVariation(id.decorationPattern, index)
    element5Color(id.element5Color, index)
    element6Color(id.element6Color, index)
    animationVariation(id.animation, index)
    element1Color(id.element1Color, index)
    element2Color(id.element2Color, index)
    element3Color(id.element3Color, index)
    element4Color(id.element4Color, index)
}

//Splitting the robot ID to use it in render

function idRobot(idStr) {
    // var element5
    // if ($("#element5").html() < 10) {
    //     element5 = 3;
    // }else element5 = 4
    // var element6
    // if ($("#element6").html() < 10) {
    //     element6 = element5+1;
    // }else element5 = 4
    var id = {
        //Attributes
        eyesShape: idStr.substring(0, 1),
        decorationPattern: idStr.substring(1, 2),
        element5Color: idStr.substring(2, 4),
        element6Color: idStr.substring(4, 6),
        animation: idStr.substring(6, 7),
        //Colors
        element1Color: idStr.substring(7, 9),
        element2Color: idStr.substring(9, 11),
        element3Color: idStr.substring(11, 13),
        element4Color: idStr.substring(13, 15),
    }

    return id
}

//Robot HTML Div for marketplace
function robotBox(id) {
    var robotDiv =
        `<div class="col-lg-4 pointer fit-content" id="robotview` +
        id +
        `">
                 <div class="featureBox robotDiv">
                 ` +
        robotBody(id) +
        `                           
                 </div>
                 <div class="idDiv" id="robotId` +
        id +
        `"></div>
                 ` +
        attributes(id) +
        `
                </div>`
    var robotview = $("#robotview" + id)
    if (!robotview.length) {
        $("#robotsDiv").append(robotDiv)
    }
}

//Simple body of a robot
function robotBody(id) {
    var single =
        ` <div id="head` +
        id +
        `" class="head">
                  <div id="mouth` +
        id +
        `" class="mouth"></div>
                  <div id="eyes` +
        id +
        `" class="eyes movingEyes">
                   <span class="eye` +
        id +
        ` left_eye">
                       <aside class="pupils` +
        id +
        `">
                         <section id="pupils2` +
        id +
        `" class="pupils2"></section>
                       </aside>
                    </span>
                   <span class="eye` +
        id +
        ` right_eye">
                       <aside class="pupils` +
        id +
        `">
                         <section id="pupils3` +
        id +
        `" class="pupils2"></section>
                       </aside>
                   </span>
                  </div>
                </div>

               <div id="body` +
        id +
        `" class="body">
                <div class="body_decoration">
                  <div id="chest` +
        id +
        `" class="chest left_chest">
                    <div class="nipple"></div>
                  </div>
                  <div id="chest1` +
        id +
        `" class="chest right_chest">
                    <div class="nipple"></div>
                  </div>
                </div>
               </div>      
               

               <div class="hands">                        
                <div class="tricepses">
                  <div id="triceps` +
        id +
        `" class="triceps right_triceps"></div>
                  <div id="triceps1` +
        id +
        `" class="triceps left_triceps">
                    <div id="decor2` +
        id +
        `" class="decor2">
                      <div class="decor3"></div>
                    </div>
                  </div>
                </div>
                <div class="bicepses">
                  <div id="biceps` +
        id +
        `" class="biceps right_biceps"></div>
                  <div id="biceps1` +
        id +
        `" class="biceps left_biceps"></div>
                </div>
                <div class="shoulders">
                  <div id="shoulder` +
        id +
        `" class="shoulder right_shoulder"></div>
                  <div id="shoulder1` +
        id +
        `" class="shoulder left_shoulder"></div>
                </div>
                <div class="forearms">
                  <div id="forearm` +
        id +
        `" class="forearm right_arm">
                   <div id="decor1` +
        id +
        `" class="decor1"></div>
                   <div class="fingers">
                     <div id="finger` +
        id +
        `" class="finger finger_R"></div>
                     <div id="finger` +
        id +
        `" class="finger finger_R"></div>
                     <div id="finger` +
        id +
        `" class="finger finger_R"></div>
                   </div>
                  </div>
                  <div id="forearm1` +
        id +
        `" class="forearm left_arm">
                   <div class="fingers">
                     <div id="finger` +
        id +
        `" class="finger finger_L"></div>
                     <div id="finger` +
        id +
        `" class="finger finger_L"></div>
                     <div id="finger` +
        id +
        `" class="finger finger_L"></div>
                   </div>
                  </div>
                </div>
              </div>
              
              <div class="legs">
                <div id="leg` +
        id +
        `" class="leg right_leg">
                  <div class="fingers">
                    <div id="finger` +
        id +
        `" class="finger finger_leg_R"></div>
                    <div id="finger` +
        id +
        `" class="finger finger_leg_R"></div>
                    <div id="finger` +
        id +
        `" class="finger finger_leg_R"></div>
                  </div>
                </div>
                <div id="leg1` +
        id +
        `" class="leg left_leg">
                  <div class="fingers">
                    <div id="finger` +
        id +
        `" class="finger finger_leg_L"></div>
                    <div id="finger` +
        id +
        `" class="finger finger_leg_L"></div>
                    <div id="finger` +
        id +
        `" class="finger finger_leg_L"></div>
                  </div>
                </div>
              </div>
              <div class="calfs">
                <div class="calf"></div>
                <div class="calf"></div>
              </div>
              <div id="decoration` +
        id +
        `" class="decoration">
                <section id="robot_scheme` +
        id +
        `" class="robot_scheme">
                 <aside id="robot_scheme1` +
        id +
        `" class="robot_scheme1">
                   <span id="robot_scheme2` +
        id +
        `" class="robot_scheme2"></span>
                 </aside>
               </section>
               </div>`
    return single
}

function attributes(id) {
    var Attributes =
        `<ul class="ml-5 attributes" style="color: antiquewhite;">
                            <li><span id="eyeName` +
        id +
        `"></span></li>
                            <li><span id="decorationName` +
        id +
        `"></span></li>
                            <li>With <span id="animationName` +
        id +
        `"></span></li>
                       </ul>`
    return Attributes
}
