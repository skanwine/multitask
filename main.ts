function determineWinLossDraw () {
    if (Choose == ChooseReceived) {
        result = "Draw"
    } else if (ChooseReceived == TRUMP) {
        result = "Wait"
    } else if (ChooseReceived == TRUMP_WIN) {
        result = "Loss"
    } else if (ChooseReceived == TRUMP_DRAW) {
        result = "Draw"
    } else if (Choose == TRUMP) {
        if (Math.randomBoolean()) {
            result = "Win"
        } else {
            result = "Draw"
        }
    } else if (Choose == PAPER && ChooseReceived == ROCK || Choose == SCISSORS && ChooseReceived == PAPER || Choose == ROCK && ChooseReceived == SCISSORS) {
        result = "Win"
    } else {
        result = "Loss"
    }
    return result
}
radio.onReceivedNumber(function (receivedNumber) {
    ChooseReceived = receivedNumber
    soundExpression.mysterious.play()
    basic.pause(200)
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    if (State == "Init" || State == "Chosen") {
        basic.showIcon(IconNames.Pitchfork)
        basic.pause(100)
        basic.showNumber(trumpQuota)
        basic.pause(100)
        if (trumpQuota > 0) {
            basic.showIcon(IconNames.Pitchfork)
            Choose = TRUMP
            State = "Chosen"
        } else {
            basic.showIcon(IconNames.No)
        }
    }
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
        Choose = PAPER
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
        Choose = ROCK
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
        Choose = SCISSORS
        basic.showIcon(IconNames.Scissors)
        State = "Chosen"
    }
})
let lossCount = 0
let winLossDraw = ""
let trumpQuota = 0
let State = ""
let result = ""
let ROCK = 0
let ChooseReceived = 0
let TRUMP_DRAW = 0
let TRUMP_WIN = 0
let TRUMP = 0
let SCISSORS = 0
let PAPER = 0
let Choose = 0
let winCount = 0
initVar()
winCount = 0
music.setVolume(127)
radio.setGroup(58)
basic.pause(200)
radio.sendNumber(Choose)
basic.showIcon(IconNames.Heart)
let TRUMP_FEQ = 3
PAPER = 5
SCISSORS = 2
TRUMP = 10
TRUMP_WIN = 88
TRUMP_DRAW = 55
basic.forever(function () {
    if (State == "Send") {
        showWait()
        if (Choose == PAPER) {
            basic.showIcon(IconNames.Square)
        } else if (Choose == SCISSORS) {
            basic.showIcon(IconNames.Scissors)
        } else if (Choose == ROCK) {
            basic.showIcon(IconNames.SmallSquare)
        } else {
            basic.showIcon(IconNames.Pitchfork)
        }
        basic.pause(50)
        if (ChooseReceived >= 0) {
            if (Choose == TRUMP) {
                trumpQuota += -1
            }
            winLossDraw = determineWinLossDraw()
            if (winLossDraw == "Win") {
                winCount += 1
                if (Choose == TRUMP) {
                    radio.sendNumber(TRUMP_WIN)
                }
                basic.showIcon(IconNames.Happy)
                soundExpression.giggle.play()
            } else if (winLossDraw == "Loss") {
                lossCount += 1
                if (lossCount % TRUMP_FEQ == 0) {
                    trumpQuota += 1
                }
                basic.showIcon(IconNames.Sad)
                soundExpression.sad.play()
            } else if (winLossDraw == "Draw") {
                if (Choose == TRUMP) {
                    radio.sendNumber(TRUMP_DRAW)
                }
                basic.showIcon(IconNames.Asleep)
                soundExpression.yawn.play()
            }
            if (winLossDraw != "Wait") {
                initVar()
            }
        }
    }
})
