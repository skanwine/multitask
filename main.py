def on_received_number(receivedNumber):
    global ChooseReceived
    ChooseReceived = receivedNumber
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    global Choose, State
    if State == "Init" or State == "Chosen":
        Choose = 5
        basic.show_icon(IconNames.SQUARE)
        State = "Chosen"
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global Choose, State
    if State == "Init" or State == "Chosen":
        Choose = 0
        basic.show_icon(IconNames.SMALL_SQUARE)
        State = "Chosen"
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global Choose, State
    if State == "Init" or State == "Chosen":
        Choose = 2
        basic.show_icon(IconNames.SCISSORS)
        State = "Chosen"
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_shake():
    global State
    if State == "Chosen":
        radio.send_number(Choose)
        State = "Send"
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

Result = ""
ChooseReceived = 0
Choose = 0
State = ""
State = "Init"
Choose = -1
ChooseReceived = -1
radio.set_group(58)
basic.show_icon(IconNames.HEART)

def on_forever():
    global State, Result, Choose, ChooseReceived
    if State == "Send":
        basic.show_icon(IconNames.DIAMOND)
        basic.pause(200)
        basic.show_icon(IconNames.SMALL_DIAMOND)
        basic.pause(200)
        if ChooseReceived >= 0:
            if Choose == ChooseReceived:
                basic.show_icon(IconNames.ASLEEP)
            elif Choose == 5 and ChooseReceived == 0 or Choose == 2 and ChooseReceived == 5 or Choose == 0 and ChooseReceived == 2:
                basic.show_icon(IconNames.HAPPY)
            else:
                basic.show_icon(IconNames.SAD)
            State = "Init"
            Result = ""
            Choose = -1
            ChooseReceived = -1
basic.forever(on_forever)
