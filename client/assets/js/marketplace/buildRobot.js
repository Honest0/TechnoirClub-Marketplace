// CSS properties to build each robot depending on the ID

var colors = Object.values(allColors())

function element1Color(code, id) {
    var color
    if (code.substring(0, 1) == 0) {
        color = colors[code.substring(1, 2)]
    } else {
        color = colors[code]
    }
    $(
        "#triceps" +
            id +
            ", #triceps1" +
            id +
            ", #head" +
            id +
            ", #forearm" +
            id +
            ", #forearm1" +
            id +
            ", #shoulder" +
            id +
            ", #shoulder1" +
            id +
            ", #leg" +
            id +
            ", #leg1" +
            id +
            ", #biceps" +
            id +
            ", #biceps1" +
            id
    ).css("background", "#" + color)
}

function element2Color(code, id) {
    var color
    if (code.substring(0, 1) == 0) {
        color = colors[code.substring(1, 2)]
    } else {
        color = colors[code]
    }
    $("#chest" + id).css("background", "#" + color)
    $("#chest1" + id).css("background", "#" + color)
}

function element3Color(code, id) {
    var color
    if (code.substring(0, 1) == 0) {
        color = colors[code.substring(1, 2)]
    } else {
        color = colors[code]
    }
    $("#body" + id + ", #finger" + id).css("background", "#" + color)
}

function element4Color(code, id) {
    var color
    if (code.substring(0, 1) == 0) {
        color = colors[code.substring(1, 2)]
    } else {
        color = colors[code]
    }
    $("#pupils2" + id).css("background", "#" + color)
    $("#pupils3" + id).css("background", "#" + color)
}

function element5Color(code, id) {
    var color
    if (code.substring(0, 1) == 0) {
        color = colors[code.substring(1, 2)]
    } else {
        color = colors[code]
    }
    $("#decor1" + id).css("background", "#" + color)
}

function element6Color(code, id) {
    var color
    if (code.substring(0, 1) == 0) {
        color = colors[code.substring(1, 2)]
    } else {
        color = colors[code]
    }
    $("#decor2" + id).css("background", "#" + color)
}

// Variation functions for range-bars

//9 eye types
function eyeVariation(num, id) {
    switch (num) {
        case "1":
            normalEyes(id)
            $("#eyeName" + id).html("Pop-eyed")
            break
        case "2":
            normalEyes(id)
            $("#eyeName" + id).html("Angry")
            return eyes2(id)
            break
        case "3":
            normalEyes(id)
            $("#eyeName" + id).html("Smoked Up")
            return eyes3(id)
            break
        case "4":
            normalEyes(id)
            $("#eyeName" + id).html("Panda")
            return eyes4(id)
            break
        case "5":
            normalEyes(id)
            $("#eyeName" + id).html("Determined")
            return eyes5(id)
            break
        case "6":
            normalEyes(id)
            $("#eyeName" + id).html("Suspicious")
            return eyes6(id)
            break
        case "7":
            normalEyes(id)
            $("#eyeName" + id).html("Sleepy")
            return eyes7(id)
            break
        case "8":
            normalEyes(id)
            $("#eyeName" + id).html("Cute")
            return eyes8(id)
        case "9":
            normalEyes(id)
            $("#eyeName" + id).html("Inquiring")
            return eyes9(id)
            break
    }
}

//9 decorations types
function decorationVariation(num, id) {
    switch (num) {
        case "1":
            normaldecoration(id)
            $("#decorationName" + id).html("Bion")
            normaldecoration(id)
            break
        case "2":
            normaldecoration(id)
            $("#decorationName" + id).html("Machine")
            decoration2(id)
            break
        case "3":
            normaldecoration(id)
            $("#decorationName" + id).html("Droid")
            decoration3(id)
            break
        case "4":
            normaldecoration(id)
            $("#decorationName" + id).html("Sample 4044")
            decoration4(id)
            break
        case "5":
            normaldecoration(id)
            $("#decorationName" + id).html("Object 2305")
            decoration5(id)
            break
        case "6":
            normaldecoration(id)
            $("#decorationName" + id).html("Сyborg")
            decoration6(id)
            break
        case "7":
            normaldecoration(id)
            $("#decorationName" + id).html("Humanoid")
            decoration7(id)
            break
        case "8":
            normaldecoration(id)
            $("#decorationName" + id).html("Terminator")
            decoration8(id)
            break
        case "9":
            normaldecoration(id)
            $("#decorationName" + id).html("Mutant")
            decoration9(id)
            break
    }
}

//9 Animations
function animationVariation(num, id) {
    switch (num) {
        case "1":
            animationType1(id)
            $("#animationName" + id).html("laser eyes")
            break
        case "2":
            animationType2(id)
            $("#animationName" + id).html("great interest in communication")
            break
        case "3":
            animationType3(id)
            $("#animationName" + id).html("puffed up breasts")
            break
        case "4":
            animationType4(id)
            $("#animationName" + id).html("big shoulders")
            break
        case "5":
            animationType5(id)
            $("#animationName" + id).html("big tricepses")
            break
        case "6":
            animationType6(id)
            $("#animationName" + id).html("huge bazookas")
        case "7":
            animationType7(id)
            $("#animationName" + id).html("big legs")
            break
        case "8":
            animationType8(id)
            $("#animationName" + id).html("big forearms")
            break
        case "9":
            animationType9(id)
            $("#animationName" + id).html("bulging eyes")
            break
    }
}

//   Eyes

function normalEyes(id) {
    $("#eyes" + id)
        .find("span")
        .css({
            "border-radius": "50%",
            width: "38px",
            height: "53px",
            margin: "19px",
            "background-color": "rgb(238, 238, 238)",
            position: "relative",
            border: "3px solid black",
        })
    $(".eye" + id)
        .find("aside")
        .css({
            "border-radius": "50%",
            width: "19px",
            height: "30px",
            "background-color": "#101111",
            position: "relative",
            top: "9px",
            left: "7px",
        })
    $(".pupils" + id)
        .find("section")
        .css({ width: "9px", height: "7px", "border-radius": "31%", position: "relative", top: "12px", left: "1px" })
}

function eyes2(id) {
    $("#eyes" + id)
        .find("span")
        .css({ "border-radius": "25%", height: "18px", "background-color": "rgb(255 68 68)" })
    $(".eye" + id)
        .find("aside")
        .css({ "border-radius": "33%", width: "17px", height: "13px", top: "0", left: "5px" })
    $(".pupils" + id)
        .find("section")
        .css({ width: "7px", height: "5px", top: "4px", left: "3px" })
}

function eyes3(id) {
    $("#eyes" + id)
        .find("span")
        .css({ height: "37px", "background-color": "rgb(155, 27, 27)" })
    $(".eye" + id)
        .find("aside")
        .css({ "border-radius": "100% 100% 0% 0%", width: "31px", height: "13px", top: "0", left: "0" })
    $(".pupils" + id)
        .find("section")
        .css({ width: "9px", height: "7px", "border-radius": "31%", top: "14px", left: "11px" })
}

function eyes4(id) {
    $("#eyes" + id)
        .find("span")
        .css({ height: "44px", "background-color": "rgb(6 6 7)" })
    $(".eye" + id)
        .find("aside")
        .css({ "background-color": "rgb(6 6 7)" })
    $(".pupils" + id)
        .find("section")
        .css({ width: "5px", height: "4px", top: "7px", left: "6px" })
}

function eyes5(id) {
    $("#eyes" + id)
        .find("span")
        .css({ "border-radius": "35%", height: "33px", "background-color": "#822029" })
    $(".eye" + id)
        .find("aside")
        .css({ width: "20px", height: "15px", top: "7px", left: "5px" })
    $(".pupils" + id)
        .find("section")
        .css({ width: "4px", height: "7px", "border-radius": "31%", top: "4px", left: "7px" })
}

function eyes6(id) {
    $("#eyes" + id)
        .find("span")
        .css({ "border-radius": "25%", height: "44px", "background-color": "rgb(186 182 182)" })
    $(".eye" + id)
        .find("aside")
        .css({ width: "30px", height: "13px", top: "13px", left: "0px" })
    $(".pupils" + id)
        .find("section")
        .css({ "border-radius": "100%", top: "3px", left: "13px" })
}

function eyes7(id) {
    $("#eyes" + id)
        .find("span")
        .css({ height: "13px", "background-color": "rgb(255 0 0)" })
    $(".eye" + id)
        .find("aside")
        .css({ width: "0px", height: "0px" })
    $(".pupils" + id)
        .find("section")
        .css({ width: "6px", height: "6px", top: "-9px", left: "5px" })
}

function eyes8(id) {
    $("#eyes" + id)
        .find("span")
        .css({ height: "38px" })
    $(".eye" + id)
        .find("aside")
        .css({ top: "1px", left: "11px", width: "21px", height: "30px" })
    $(".pupils" + id)
        .find("section")
        .css({ left: "9px" })
}

function eyes9(id) {
    $("#eyes" + id)
        .find("span")
        .css({ height: "38px", "border-radius": "38%" })
    $(".eye" + id)
        .find("aside")
        .css({ top: "2px", left: "1px", "border-radius": "38%", width: "28px", height: "28px" })
    $(".pupils" + id)
        .find("section")
        .css({ top: "5px", left: "5px", width: "18px", height: "18px" })
}

//   Decoration

function normaldecoration(id) {
    //Remove all style from other decorations
    //In this way normalDecoration() is used to reset the decoration style
    $("#robot_scheme" + id).css({
        width: "2px",
        height: "43px",
        "background-color": "#101111",
        border: "1px solid black",
        position: "relative",
        bottom: "403px",
        left: "98px",
        "z-index": "1",
        transform: "rotate(0deg)",
    })
    $("#robot_scheme1" + id).css({
        width: "43px",
        height: "2px",
        "background-color": "#101111",
        border: "1px solid black",
        position: "absolute",
        left: "-2px",
        "z-index": "1",
        top: "34px",
        transform: "rotate(0deg)",
    })
    $("#robot_scheme2" + id).css({
        width: "2px",
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

function decoration2(id) {
    $("#robot_scheme" + id).css({ height: "51px", left: "98px", bottom: "240px" })
    $("#robot_scheme1" + id).css({ width: "39px", left: "0px", "z-index": "1", top: "-1px" })
    $("#robot_scheme2" + id).css({ height: "31px", left: "7px", top: "103px", transform: "rotate(90deg)" })
}

function decoration3(id) {
    $("#robot_scheme" + id).css({ left: "38px", bottom: "401px", height: "48px" })
    $("#robot_scheme1" + id).css({})
    $("#robot_scheme2" + id).css({ top: "0px", left: "94px", height: "31px", transform: "rotate(90deg)" })
}

function decoration4(id) {
    $("#robot_scheme" + id).css({ left: "39px", bottom: "401px", height: "49px" })
    $("#robot_scheme1" + id).css({ transform: "rotate(90deg)", top: "123px", left: "-14px", width: "31px" })
    $("#robot_scheme2" + id).css({ height: "55px", top: "35px" })
}

function decoration5(id) {
    $("#robot_scheme" + id).css({ left: "53px" })
    $("#robot_scheme1" + id).css({ width: "93px" })
    $("#robot_scheme2" + id).css({ height: "111px" })
}

function decoration6(id) {
    $("#robot_scheme" + id).css({ left: "16px", bottom: "387px", height: "106px" })
    $("#robot_scheme1" + id).css({ left: "1px", top: "34px" })
    $("#robot_scheme2" + id).css({ left: "40px", height: "41px" })
}

function decoration7(id) {
    $("#robot_scheme" + id).css({ border: "0px", width: "0px", height: "0px" })
    $("#robot_scheme1" + id).css({ border: "0px", width: "0px", height: "0px" })
    $("#robot_scheme2" + id).css({ border: "0px", width: "0px", height: "0px" })
}

function decoration8(id) {
    $("#robot_scheme" + id).css({ height: "30px", left: "23px", bottom: "394px" })
    $("#robot_scheme1" + id).css({ left: "-22px", width: "146px" })
    $("#robot_scheme2" + id).css({ transform: "rotate(82deg)", height: "81px", left: "79px", top: "50px" })
}

function decoration9(id) {
    $("#robot_scheme" + id).css({ left: "37px", bottom: "400px", height: "47px" })
    $("#robot_scheme1" + id).css({ width: "142px", left: "-35px", top: "31px" })
    $("#robot_scheme2" + id).css({ left: "58px", top: "-36px", height: "75px" })
}

//  Animations

async function resetAnimation(id) {
    $("#pupils2" + id).removeClass("movingPupils")
    $("#pupils3" + id).removeClass("movingPupils")
    $("#mouth" + id).removeClass("movingMouth")
    $("#chest1" + id).removeClass("movingChestR")
    $("#chest" + id).removeClass("movingChestL")
    $("#shoulder" + id).removeClass("movingShoulders")
    $("#shoulder1" + id).removeClass("movingShoulders")
    $("#triceps" + id).removeClass("movingTriceps")
    $("#triceps1" + id).removeClass("movingTriceps")
    $("#biceps" + id).removeClass("movingBiceps")
    $("#biceps1" + id).removeClass("movingBiceps")
    $("#leg" + id).removeClass("movingLegs")
    $("#leg1" + id).removeClass("movingLegs")
    $("#forearm" + id).removeClass("movingForeArm_R")
    $("#forearm1" + id).removeClass("movingForeArm_L")
    $("#eyes" + id).removeClass("movingEyes")
}

function animationType1(id) {
    resetAnimation(id)
    $("#pupils2" + id).addClass("movingPupils")
    $("#pupils3" + id).addClass("movingPupils")
}

function animationType2(id) {
    resetAnimation(id)
    $("#mouth" + id).addClass("movingMouth")
}

function animationType3(id) {
    resetAnimation(id)
    $("#chest1" + id).addClass("movingChestR")
    $("#chest" + id).addClass("movingChestL")
}

function animationType4(id) {
    resetAnimation(id)
    $("#shoulder" + id).addClass("movingShoulders")
    $("#shoulder1" + id).addClass("movingShoulders")
}

function animationType5(id) {
    resetAnimation(id)
    $("#triceps" + id).addClass("movingTriceps")
    $("#triceps1" + id).addClass("movingTriceps")
}

function animationType6(id) {
    resetAnimation(id)
    $("#biceps" + id).addClass("movingBiceps")
    $("#biceps1" + id).addClass("movingBiceps")
}

function animationType7(id) {
    resetAnimation(id)
    $("#leg" + id).addClass("movingLegs")
    $("#leg1" + id).addClass("movingLegs")
}

function animationType8(id) {
    resetAnimation(id)
    $("#forearm" + id).addClass("movingForeArm_R")
    $("#forearm1" + id).addClass("movingForeArm_L")
}

function animationType9(id) {
    resetAnimation(id)
    $("#eyes" + id).addClass("movingEyes")
}
