function determineWinLossDraw(): string {
    
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

radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    ChooseReceived = receivedNumber
    basic.pause(200)
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function on_logo_long_pressed() {
    
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
function showWait() {
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

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (State == "Init" || State == "Chosen") {
        Choose = PAPER
        basic.showIcon(IconNames.Square)
        State = "Chosen"
    }
    
})
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    
    if (State == "Chosen" || State == "Send") {
        State = "Send"
        radio.sendNumber(Choose)
        basic.pause(100)
    }
    
})
input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_pressed() {
    if (State == "Init") {
        basic.showNumber(winCount)
    }
    
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (State == "Init" || State == "Chosen") {
        Choose = ROCK
        basic.showIcon(IconNames.SmallSquare)
        State = "Chosen"
    }
    
})
function initVar() {
    
    State = "Init"
    Choose = -1
    ChooseReceived = -1
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (State == "Init" || State == "Chosen") {
        Choose = SCISSORS
        basic.showIcon(IconNames.Scissors)
        State = "Chosen"
    }
    
})
let lossCount = 0
let winLossDraw = ""
let State = ""
let result = ""
let ChooseReceived = 0
let Choose = 0
let winCount = 0
let trumpQuota = 0
let TRUMP_DRAW = 0
let TRUMP_WIN = 0
let TRUMP = 0
let SCISSORS = 0
let PAPER = 0
let ROCK = 0
let TRUMP_FEQ = 3
ROCK = 0
PAPER = 5
SCISSORS = 2
TRUMP = 10
TRUMP_WIN = 88
TRUMP_DRAW = 55
trumpQuota = 1
winCount = 0
music.setVolume(127)
radio.setGroup(58)
initVar()
basic.pause(200)
radio.sendNumber(Choose)
basic.showIcon(IconNames.Heart)
basic.forever(function on_forever() {
    
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
            } else if (winLossDraw == "Loss") {
                lossCount += 1
                if (lossCount % TRUMP_FEQ == 0) {
                    trumpQuota += 1
                }
                
                if (ChooseReceived == TRUMP_WIN) {
                    basic.showIcon(IconNames.Sad)
                    basic.showIcon(IconNames.Pitchfork)
                    basic.pause(200)
                }
                
                basic.showIcon(IconNames.Sad)
            } else if (winLossDraw == "Draw") {
                if (Choose == TRUMP) {
                    radio.sendNumber(TRUMP_DRAW)
                }
                
                if (ChooseReceived == TRUMP_DRAW) {
                    basic.showIcon(IconNames.Asleep)
                    basic.showIcon(IconNames.Pitchfork)
                    basic.pause(200)
                }
                
                basic.showIcon(IconNames.Asleep)
            }
            
            if (winLossDraw != "Wait") {
                initVar()
            }
            
        }
        
    }
    
})
