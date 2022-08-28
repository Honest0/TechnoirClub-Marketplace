var colors = Object.values(allColors())

var defaultId = {
    element1Color: 10,
    element2Color: 13,
    element3Color: 96,
    element4Color: 10,
    //Attributes
    eyesShape: 3,
    decorationPattern: 1,
    element5Color: 13,
    element6Color: 13,
    animation: 1,
    lastNum: 1,
}

// when page load
$(document).ready(function () {
    renderRobot(defaultId)
})

function getId() {
    var id = ""
    id += $("#eyesShape").html()
    id += $("#decorationShape").html()
    var element5 = $("#element5").html()
    if ($("#element5").html() < 10) {
        element5 = "0" + $("#element5").html()
    }
    id += element5
    var element6 = $("#element6").html()
    if ($("#element6").html() < 10) {
        element6 = "0" + $("#element6").html()
    }
    id += element6
    id += $("#idanimation").html()
    var element1 = $("#element1").html()
    if ($("#element1").html() < 10) {
        element1 = "0" + $("#element1").html()
    }
    id += element1
    var element2 = $("#element2").html()
    if ($("#element2").html() < 10) {
        element2 = "0" + $("#element2").html()
    }
    id += element2
    var element3 = $("#element3").html()
    if ($("#element3").html() < 10) {
        element3 = "0" + $("#element3").html()
    }
    id += element3
    var element4 = $("#element4").html()
    if ($("#element4").html() < 10) {
        element4 = "0" + $("#element4").html()
    }
    id += element4

    return parseInt(id)
}

function renderRobot(id) {
    element1Color(colors[id.element1Color], id.element1Color)
    $("#element1_color").val(id.element1Color)
    element2Color(colors[id.element2Color], id.element2Color)
    $("#element2_color").val(id.element2Color)
    element3Color(colors[id.element3Color], id.element3Color)
    $("#element3_color").val(id.element3Color)
    element4Color(colors[id.element4Color], id.element4Color)
    $("#element4_color").val(id.element4Color)
    element5Color(colors[id.element5Color], id.element5Color)
    $("#element5_color").val(id.element5Color)
    element6Color(colors[id.element6Color], id.element6Color)
    $("#element6_color").val(id.element6Color)
    eyeVariation(id.eyesShape)
    $("#eyeshape").val(id.eyesShape)
    decorationVariation(id.decorationPattern)
    $("#decorationshape").val(id.decorationPattern)
    animationVariation(id.animation)
    $("#animations").val(id.animation)
}

//Settings to separate the color sliders and the attributes sliders.
$(".btn.robotColors").click(() => {
    $(".tab.robotColors").css("display", "block")
    $(".tab.robotAttributes").css("display", "none")
})

$(".btn.robotAttributes").click(() => {
    $(".tab.robotColors").css("display", "none")
    $(".tab.robotAttributes").css("display", "block")
})

// Changing element1 colors
$("#element1_color").change(() => {
    var colorVal = $("#element1_color").val()
    element1Color(colors[colorVal], colorVal)
})

// Changing element2 colors
$("#element2_color").change(() => {
    var colorVal = $("#element2_color").val()
    element2Color(colors[colorVal], colorVal)
})

// Changing element3 colors
$("#element3_color").change(() => {
    var colorVal = $("#element3_color").val()
    element3Color(colors[colorVal], colorVal)
})

// Changing element4 colors
$("#element4_color").change(() => {
    var colorVal = $("#element4_color").val()
    element4Color(colors[colorVal], colorVal)
})

// Changing eyes shape
$("#eyeshape").change(() => {
    var shape = parseInt($("#eyeshape").val()) //between 1 and 9
    eyeVariation(shape)
})

// Changing decoration shape
$("#decorationshape").change(() => {
    var shape = parseInt($("#decorationshape").val()) //between 1 and 9
    decorationVariation(shape)
})

// Changing decoration1 color
$("#element5_color").change(() => {
    var colorVal = $("#element5_color").val()
    element5Color(colors[colorVal], colorVal)
})

// Changing decoration2 color
$("#element6_color").change(() => {
    var colorVal = $("#element6_color").val()
    element6Color(colors[colorVal], colorVal)
})

// Changing animation
$("#animations").change(() => {
    var animationVal = parseInt($("#animations").val())
    animationVariation(animationVal)
})

// to reload default robot
$(".default").click(() => {
    renderRobot(defaultid)
})

// for random color from 10 up to 99 num
function randomNumber() {
    let random = Math.floor(Math.random() * 100)
    return random
}

// for random attributes from 1 up to 9 num
function randomNumber1() {
    let random = Math.floor(Math.random() * 9) + 1
    return random
}

function randomRobot() {
    let random1 = randomNumber()
    element1Color(colors[random1], random1)
    $("#element1_color").val(random1)
    let random2 = randomNumber()
    element2Color(colors[random2], random2)
    $("#element2_color").val(random2)
    let random3 = randomNumber()
    element3Color(colors[random3], random3)
    $("#element3_color").val(random3)
    let random4 = randomNumber()
    element4Color(colors[random4], random4)
    $("#element4_color").val(random4)
    let random5 = randomNumber()
    element5Color(colors[random5], random5)
    $("#element5_color").val(random5)
    let random6 = randomNumber()
    element6Color(colors[random6], random6)
    $("#element6_color").val(random6)
    let random7 = randomNumber1()
    parseInt(eyeVariation(random7))
    $("#eyeshape").val(random7)
    let random8 = randomNumber1()
    decorationVariation(random8)
    parseInt($("#decorationshape").val(random8))
    let random9 = randomNumber1()
    animationVariation(random9)
    parseInt($("#animations").val(random9))
}

//Showing Colors and Attribute Boxes

function showColors() {
    $("#robotColors").removeClass("hidden")
    $("#robotAttributes").addClass("hidden")
}

function showAttributes() {
    $("#robotAttributes").removeClass("hidden")
    $("#robotColors").addClass("hidden")
}

