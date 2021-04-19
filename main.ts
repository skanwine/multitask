radio.onReceivedNumber(function (receivedNumber) {
    ChooseReceived = receivedNumber
})
input.onButtonPressed(Button.A, function () {
    if (State == "Init" || State == "Chosen") {
        Choose = 5
        basic.showIcon(IconNames.Square)
        State = "Chosen"
    }
})
input.onButtonPressed(Button.AB, function () {
    if (State == "Init" || State == "Chosen") {
        Choose = 0
        basic.showIcon(IconNames.SmallSquare)
        State = "Chosen"
    }
})
input.onButtonPressed(Button.B, function () {
    if (State == "Init" || State == "Chosen") {
        Choose = 2
        basic.showIcon(IconNames.Scissors)
        State = "Chosen"
    }
})
input.onGesture(Gesture.Shake, function () {
    if (State == "Chosen") {
        radio.sendNumber(Choose)
        State = "Send"
    }
})
let Result = ""
let ChooseReceived = 0
let Choose = 0
let State = ""
State = "Init"
Choose = -1
ChooseReceived = -1
radio.setGroup(58)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (State == "Send") {
        basic.showIcon(IconNames.Diamond)
        basic.pause(200)
        basic.showIcon(IconNames.SmallDiamond)
        basic.pause(200)
        if (ChooseReceived >= 0) {
            if (Choose == ChooseReceived) {
                basic.showIcon(IconNames.Asleep)
            } else if (Choose == 5 && ChooseReceived == 0 || Choose == 2 && ChooseReceived == 5 || Choose == 0 && ChooseReceived == 2) {
                basic.showIcon(IconNames.Happy)
            } else {
                basic.showIcon(IconNames.Sad)
            }
            State = "Init"
            Result = ""
            Choose = -1
            ChooseReceived = -1
        }
    }
})
