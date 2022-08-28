//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16)
    return randomColor
}

function genColors() {
    var colors = []
    for (var i = 0; i < 99; i++) {
        var color = getColor()
        colors[i] = color
    }
    return colors
}

function element1Color(color, code) {
    $(".triceps, .head, .forearm, .shoulder, .leg, .biceps").css("background", "#" + color) //This changes the color of the robot
    $("#element1Slider").html("code: " + code) //This updates text of the badge next to the slider
    $("#element1").html(code) //This updates the body color part of the ID that is displayed below the robot
}

function element2Color(color, code) {
    $(" .chest").css("background", "#" + color) //This changes the color of the robot
    $("#element2Slider").html("code: " + code) //This updates text of the badge next to the slider
    $("#element2").html(code) //This updates the body color part of the ID that is displayed below the robot
}

function element3Color(color, code) {
    $(".body, .finger").css("background", "#" + color) //This changes the color of the robot
    $("#elemen3Slider").html("code: " + code) //This updates text of the badge next to the slider
    $("#element3").html(code) //This updates the body color part of the ID that is displayed below the robot
}

function element4Color(color, code) {
    $(".pupils2, .pupils3").css("background", "#" + color) //This changes the color of the robot
    $("#element4Slider").html("code: " + code) //This updates text of the badge next to the slider
    $("#element4").html(code) //This updates the body color part of the ID that is displayed below the robot
}

function element5Color(color, code) {
    $(".decor1").css("background-color", "#" + color) //This changes the color of the robot
    $("#element5Slider").html("code: " + code) //This updates text of the badge next to the slider
    $("#element5").html(code) //This updates the body color part of the ID that is displayed below the robot
}

function element6Color(color, code) {
    $(".decor2").css("background-color", "#" + color) //This changes the color of the robot
    $("#element6Slider").html("code: " + code) //This updates text of the badge next to the slider
    $("#element6").html(code) //This updates the body color part of the ID that is displayed below the robot
}

function eyeVariation(num) {
    $("#eyeshape").html(num)
    $("#eyesShape").html(num)
    switch (num) {
        case 1:
            normalEyes()
            $("#eyeName").html("Pop-eyed") // Set the badge to 'Pop-eyed'
            break
        case 2:
            normalEyes()
            $("#eyeName").html("Angry")
            eyes2()
            break
        case 3:
            normalEyes()
            $("#eyeName").html("Smoked Up")
            eyes3()
            break
        case 4:
            normalEyes()
            $("#eyeName").html("Panda")
            eyes4()
            break
        case 5:
            normalEyes()
            $("#eyeName").html("Determined")
            eyes5()
            break
        case 6:
            normalEyes()
            $("#eyeName").html("Suspicious")
            eyes6()
            break
        case 7:
            normalEyes()
            $("#eyeName").html("Sleepy")
            eyes7()
            break
        case 8:
            normalEyes()
            $("#eyeName").html("Cute")
            eyes8()
            break
        case 9:
            normalEyes()
            $("#eyeName").html("Inquiring")
            eyes9()
            break
    }
}

async function normalEyes() {
    await $(".eyes").find("span").css({
        "border-radius": "50%",
        width: "38px",
        height: "53px",
        margin: "19px",
        "background-color": "rgb(238, 238, 238)",
        position: "relative",
        border: "3px solid black",
    })
    await $(".eye").find("aside").css({
        "border-radius": "50%",
        width: "19px",
        height: "30px",
        "background-color": "#101111",
        position: "relative",
        top: "9px",
        left: "7px",
    })
    await $(".pupils")
        .find("section")
        .css({ width: "9px", height: "7px", "border-radius": "31%", position: "relative", top: "12px", left: "1px" })
}

async function eyes2() {
    await $(".eyes").find("span").css({ "border-radius": "25%", height: "18px", "background-color": "rgb(255 68 68)" })
    await $(".eye").find("aside").css({ "border-radius": "33%", width: "17px", height: "13px", top: "0", left: "5px" })
    await $(".pupils").find("section").css({ width: "7px", height: "5px", top: "4px", left: "3px" })
}

async function eyes3() {
    await $(".eyes").find("span").css({ height: "37px", "background-color": "rgb(155, 27, 27)" })
    await $(".eye")
        .find("aside")
        .css({ "border-radius": "100% 100% 0% 0%", width: "31px", height: "13px", top: "0", left: "0" })
    await $(".pupils")
        .find("section")
        .css({ width: "9px", height: "7px", "border-radius": "31%", top: "14px", left: "11px" })
}

async function eyes4() {
    await $(".eyes").find("span").css({ height: "44px", "background-color": "rgb(6 6 7)" })
    await $(".eye").find("aside").css({ "background-color": "rgb(6 6 7)" })
    await $(".pupils").find("section").css({ width: "5px", height: "4px", top: "7px", left: "6px" })
}

async function eyes5() {
    await $(".eyes").find("span").css({ "border-radius": "35%", height: "33px", "background-color": "#822029" })
    await $(".eye").find("aside").css({ width: "20px", height: "15px", top: "7px", left: "5px" })
    await $(".pupils")
        .find("section")
        .css({ width: "4px", height: "7px", "border-radius": "31%", top: "4px", left: "7px" })
}

async function eyes6() {
    await $(".eyes")
        .find("span")
        .css({ "border-radius": "25%", height: "44px", "background-color": "rgb(186 182 182)" })
    await $(".eye").find("aside").css({ width: "30px", height: "13px", top: "13px", left: "0px" })
    await $(".pupils").find("section").css({ "border-radius": "100%", top: "3px", left: "13px" })
}

async function eyes7() {
    await $(".eyes").find("span").css({ height: "13px", "background-color": "rgb(255 0 0)" })
    await $(".eye").find("aside").css({ width: "0px", height: "0px" })
    await $(".pupils").find("section").css({ width: "6px", height: "6px", top: "-9px", left: "5px" })
}

async function eyes8() {
    await $(".eyes").find("span").css({ height: "38px" })
    await $(".eye").find("aside").css({ top: "1px", left: "11px", width: "21px", height: "30px" })
    await $(".pupils").find("section").css({ left: "9px" })
}

async function eyes9() {
    await $(".eyes").find("span").css({ height: "38px", "border-radius": "38%" })
    await $(".eye")
        .find("aside")
        .css({ top: "2px", left: "1px", "border-radius": "38%", width: "28px", height: "28px" })
    await $(".pupils").find("section").css({ top: "5px", left: "5px", width: "18px", height: "18px" })
}

function decorationVariation(num) {
    $("#decorationShape").html(num)
    switch (num) {
        case 1:
            normalDecoration()
            $("#decorationName").html("Bion")
            break
        case 2:
            normalDecoration()
            $("#decorationName").html("Machine")
            decoration2()
            break
        case 3:
            normalDecoration()
            $("#decorationName").html("Droid")
            decoration3()
            break
        case 4:
            normalDecoration()
            $("#decorationName").html("Sample 4044")
            decoration4()
            break
        case 5:
            normalDecoration()
            $("#decorationName").html("Object 2305")
            decoration5()
            break
        case 6:
            normalDecoration()
            $("#decorationName").html("Сyborg")
            decoration6()
            break
        case 7:
            normalDecoration()
            $("#decorationName").html("Humanoid")
            decoration7()
            break
        case 8:
            normalDecoration()
            $("#decorationName").html("Terminator")
            decoration8()
            break
        case 9:
            normalDecoration()
            $("#decorationName").html("Mutant")
            decoration9()
            break
    }
}

async function normalDecoration() {
    //Remove all style from other decorations
    //In this way normalDecoration() is used to reset the decoration style
    await $(".decoration").find("section").css({
        width: "0px",
        height: "43px",
        "background-color": "#101111",
        border: "1px solid black",
        position: "relative",
        bottom: "403px",
        left: "98px",
        "z-index": "1",
        transform: "rotate(0deg)",
    })
    await $(".robot_scheme").find("aside").css({
        width: "43px",
        height: "0px",
        "background-color": "#101111",
        border: "1px solid black",
        position: "absolute",
        left: "-2px",
        "z-index": "1",
        top: "34px",
        transform: "rotate(0deg)",
    })
    await $(".robot_scheme1").find("span").css({
        width: "0px",
        height: "72px",
        "background-color": "#101111",
        border: "1px solid black",
        position: "absolute",
        left: "36px",
        "z-index": "1",
        "border-radius": "0 0 50% 50%",
        top: "0px",
        transform: "rotate(0deg)",
        bottom: "0px",
    })
}

async function decoration2() {
    await $(".decoration").find("section").css({ height: "51px", left: "98px", bottom: "240px" })
    await $(".robot_scheme").find("aside").css({ width: "39px", left: "0px", "z-index": "1", top: "-1px" })
    await $(".robot_scheme1")
        .find("span")
        .css({ height: "31px", left: "7px", top: "103px", transform: "rotate(90deg)" })
}

async function decoration3() {
    await $(".decoration").find("section").css({ left: "38px", bottom: "401px", height: "48px" })
    await $(".robot_scheme").find("aside").css({})
    await $(".robot_scheme1").find("span").css({ top: "0px", left: "94px", height: "31px", transform: "rotate(90deg)" })
}

async function decoration4() {
    await $(".decoration").find("section").css({ left: "39px", bottom: "401px", height: "49px" })
    await $(".robot_scheme")
        .find("aside")
        .css({ transform: "rotate(90deg)", top: "123px", left: "-14px", width: "31px" })
    await $(".robot_scheme1").find("span").css({ height: "55px", top: "35px" })
}

async function decoration5() {
    await $(".decoration").find("section").css({ left: "53px" })
    await $(".robot_scheme").find("aside").css({ width: "93px" })
    await $(".robot_scheme1").find("span").css({ height: "111px" })
}

async function decoration6() {
    await $(".decoration").find("section").css({ left: "16px", bottom: "387px", height: "106px" })
    await $(".robot_scheme").find("aside").css({ left: "1px", top: "145" })
    await $(".robot_scheme1").find("span").css({ left: "40px", height: "41px" })
}

async function decoration7() {
    await $(".decoration").find("section").css({ border: "0px" })
    await $(".robot_scheme").find("aside").css({ border: "0px" })
    await $(".robot_scheme1").find("span").css({ border: "0px" })
}

async function decoration8() {
    await $(".decoration").find("section").css({ height: "30px", left: "23px", bottom: "394px" })
    await $(".robot_scheme").find("aside").css({ left: "-22px", width: "146px" })
    await $(".robot_scheme1")
        .find("span")
        .css({ transform: "rotate(82deg)", height: "81px", left: "79px", top: "50px" })
}

async function decoration9() {
    await $(".decoration").find("section").css({ left: "37px", bottom: "400px", height: "47px" })
    await $(".robot_scheme").find("aside").css({ width: "142px", left: "-35px", top: "31px" })
    await $(".robot_scheme1").find("span").css({ left: "58px", top: "-36px", height: "75px" })
}

function animationVariation(num) {
    $("#idanimation").html(num)
    switch (num) {
        case 1:
            animationType1()
            $("#AnimationSlider").html("With laser eyes")
            break
        case 2:
            animationType2()
            $("#AnimationSlider").html("With great interest in communirobotion")
            break
        case 3:
            animationType3()
            $("#AnimationSlider").html("With puffed up breasts")
            break
        case 4:
            animationType4()
            $("#AnimationSlider").html("With big shoulders")
            break
        case 5:
            animationType5()
            $("#AnimationSlider").html("With big tricepses")
            break
        case 6:
            animationType6()
            $("#AnimationSlider").html("With huge bazookas")
            break
        case 7:
            animationType7()
            $("#AnimationSlider").html("With big legs")
            break
        case 8:
            animationType8()
            $("#AnimationSlider").html("With big forearms")
            break
        case 9:
            animationType9()
            $("#AnimationSlider").html("With bulging eyes")
            break
    }
}

function resetAnimation() {
    $(".pupils2").removeClass("movingPupils")
    $(".pupils3").removeClass("movingPupils")
    $(".mouth").removeClass("movingMouth")
    $(".right_chest").removeClass("movingChestR")
    $(".left_chest").removeClass("movingChestL")
    $(".shoulder").removeClass("movingShoulders")
    $(".triceps").removeClass("movingTriceps")
    $(".biceps").removeClass("movingBiceps")
    $(".right_leg").removeClass("movingLegs")
    $(".left_leg").removeClass("movingLegs")
    $(".right_arm").removeClass("movingForeArm_R")
    $(".left_arm").removeClass("movingForeArm_L")
    $(".eyes").removeClass("movingEyes")
}

function animationType1() {
    resetAnimation()
    $(".pupils2, .pupils3").addClass("movingPupils")
}

function animationType2() {
    resetAnimation()
    $(".mouth").addClass("movingMouth")
}

function animationType3() {
    resetAnimation()
    $(".right_chest").addClass("movingChestR")
    $(".left_chest").addClass("movingChestL")
}

function animationType4() {
    resetAnimation()
    $(".shoulder").addClass("movingShoulders")
}

function animationType5() {
    resetAnimation()
    $(".triceps").addClass("movingTriceps")
}

function animationType6() {
    resetAnimation()
    $(".biceps").addClass("movingBiceps")
}

function animationType7() {
    resetAnimation()
    $(".right_leg").addClass("movingLegs")
    $(".left_leg").addClass("movingLegs")
}

function animationType8() {
    resetAnimation()
    $(".right_arm").addClass("movingForeArm_R")
    $(".left_arm").addClass("movingForeArm_L")
}

function animationType9() {
    resetAnimation()
    $(".eyes").addClass("movingEyes")
}


