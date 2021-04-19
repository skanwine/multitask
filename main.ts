radio.onReceivedNumber(function (receivedNumber) {
    ChooseReceived = receivedNumber
    soundExpression.mysterious.play()
    basic.pause(100)
})
function showWait () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . # . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . # # # .
        . . . . .
        . . . . .
        `)
}
input.onButtonPressed(Button.A, function () {
    if (State == "Init" || State == "Chosen") {
        Choose = 5
        basic.showIcon(IconNames.Square)
        State = "Chosen"
    }
})
input.onGesture(Gesture.Shake, function () {
    if (State == "Chosen" || State == "Send") {
        State = "Send"
        radio.sendNumber(Choose)
        soundExpression.hello.play()
        basic.pause(100)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (State == "Init") {
        basic.showNumber(winCount)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (State == "Init" || State == "Chosen") {
        Choose = 0
        basic.showIcon(IconNames.SmallSquare)
        State = "Chosen"
    }
})
function initVar () {
    State = "Init"
    Choose = -1
    ChooseReceived = -1
}
input.onButtonPressed(Button.B, function () {
    if (State == "Init" || State == "Chosen") {
        Choose = 2
        basic.showIcon(IconNames.Scissors)
        State = "Chosen"
    }
})
let State = ""
let ChooseReceived = 0
let Choose = 0
let winCount = 0
initVar()
winCount = 0
music.setVolume(127)
radio.setGroup(58)
basic.pause(200)
radio.sendNumber(Choose)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (State == "Send") {
        showWait()
        if (Choose == 5) {
            basic.showIcon(IconNames.Square)
        } else if (Choose == 2) {
            basic.showIcon(IconNames.Scissors)
        } else {
            basic.showIcon(IconNames.SmallSquare)
        }
        basic.pause(50)
        if (ChooseReceived >= 0) {
            if (Choose == ChooseReceived) {
                basic.showIcon(IconNames.Asleep)
                soundExpression.yawn.play()
            } else if (Choose == 5 && ChooseReceived == 0 || Choose == 2 && ChooseReceived == 5 || Choose == 0 && ChooseReceived == 2) {
                winCount += 1
                basic.showIcon(IconNames.Happy)
                soundExpression.giggle.play()
            } else {
                basic.showIcon(IconNames.Sad)
                soundExpression.sad.play()
            }
            initVar()
        }
    }
})
