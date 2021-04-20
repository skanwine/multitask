function determineWinLossDraw(): string {
    
    if (Choose == ChooseReceived) {
        result = "Draw"
    } else if (ChooseReceived == 10) {
        result = "Wait"
    } else if (ChooseReceived == 88) {
        result = "Loss"
    } else if (ChooseReceived == 55) {
        result = "Draw"
    } else if (Choose == 10) {
        if (Math.randomBoolean()) {
            result = "Win"
        } else {
            result = "Draw"
        }
        
    } else if (Choose == 5 && ChooseReceived == 0 || Choose == 2 && ChooseReceived == 5 || Choose == 0 && ChooseReceived == 2) {
        result = "Win"
    } else {
        result = "Loss"
    }
    
    return result
}

radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    ChooseReceived = receivedNumber
    soundExpression.mysterious.play()
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
            Choose = 10
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
        Choose = 5
        basic.showIcon(IconNames.Square)
        State = "Chosen"
    }
    
})
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    
    if (State == "Chosen" || State == "Send") {
        State = "Send"
        radio.sendNumber(Choose)
        soundExpression.hello.play()
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
        Choose = 0
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
        Choose = 2
        basic.showIcon(IconNames.Scissors)
        State = "Chosen"
    }
    
})
let lossCount = 0
let winLossDraw = ""
let trumpQuota = 0
let State = ""
let result = ""
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
basic.forever(function on_forever() {
    
    if (State == "Send") {
        showWait()
        if (Choose == 5) {
            basic.showIcon(IconNames.Square)
        } else if (Choose == 2) {
            basic.showIcon(IconNames.Scissors)
        } else if (Choose == 0) {
            basic.showIcon(IconNames.SmallSquare)
        } else {
            basic.showIcon(IconNames.Pitchfork)
        }
        
        basic.pause(50)
        if (ChooseReceived >= 0) {
            if (Choose == 10) {
                trumpQuota += -1
            }
            
            winLossDraw = determineWinLossDraw()
            if (winLossDraw == "Win") {
                winCount += 1
                if (Choose == 10) {
                    radio.sendNumber(88)
                }
                
                basic.showIcon(IconNames.Happy)
                soundExpression.giggle.play()
            } else if (winLossDraw == "Loss") {
                lossCount += 1
                if (lossCount % 3 == 0) {
                    trumpQuota += 1
                }
                
                basic.showIcon(IconNames.Sad)
                soundExpression.sad.play()
            } else if (winLossDraw == "Draw") {
                if (Choose == 10) {
                    radio.sendNumber(55)
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
