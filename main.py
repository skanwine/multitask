def on_received_number(receivedNumber):
    global ChooseReceived
    ChooseReceived = receivedNumber
    soundExpression.mysterious.play()
    basic.pause(100)
radio.on_received_number(on_received_number)

def showWait():
    basic.show_leds("""
        . . . . .
        . . . . .
        # . . . .
        . . . . .
        . . . . .
        """)
    basic.show_leds("""
        . . . . .
        . . . . .
        # # . . .
        . . . . .
        . . . . .
        """)
    basic.show_leds("""
        . . . . .
        . . . . .
        # # # . .
        . . . . .
        . . . . .
        """)
    basic.show_leds("""
        . . . . .
        . . . . .
        # # # # .
        . . . . .
        . . . . .
        """)
    basic.show_leds("""
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        """)

def on_button_pressed_a():
    global Choose, State
    if State == "Init" or State == "Chosen":
        Choose = 5
        basic.show_icon(IconNames.SQUARE)
        State = "Chosen"
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_shake():
    global State
    if State == "Chosen" or State == "Send":
        State = "Send"
        radio.send_number(Choose)
        soundExpression.hello.play()
        basic.pause(100)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_logo_pressed():
    if State == "Init":
        basic.show_number(winCount)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def on_button_pressed_ab():
    global Choose, State
    if State == "Init" or State == "Chosen":
        Choose = 0
        basic.show_icon(IconNames.SMALL_SQUARE)
        State = "Chosen"
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def initVar():
    global State, Choose, ChooseReceived
    State = "Init"
    Choose = -1
    ChooseReceived = -1

def on_button_pressed_b():
    global Choose, State
    if State == "Init" or State == "Chosen":
        Choose = 2
        basic.show_icon(IconNames.SCISSORS)
        State = "Chosen"
input.on_button_pressed(Button.B, on_button_pressed_b)

State = ""
ChooseReceived = 0
Choose = 0
winCount = 0
initVar()
winCount = 0
music.set_volume(127)
radio.set_group(58)
basic.pause(200)
radio.send_number(Choose)
basic.show_icon(IconNames.HEART)

def on_forever():
    global winCount
    if State == "Send":
        showWait()
        if Choose == 5:
            basic.show_icon(IconNames.SQUARE)
        elif Choose == 2:
            basic.show_icon(IconNames.SCISSORS)
        else:
            basic.show_icon(IconNames.SMALL_SQUARE)
        basic.pause(50)
        if ChooseReceived >= 0:
            if Choose == ChooseReceived:
                basic.show_icon(IconNames.ASLEEP)
                soundExpression.yawn.play()
            elif Choose == 5 and ChooseReceived == 0 or Choose == 2 and ChooseReceived == 5 or Choose == 0 and ChooseReceived == 2:
                winCount += 1
                basic.show_icon(IconNames.HAPPY)
                soundExpression.giggle.play()
            else:
                basic.show_icon(IconNames.SAD)
                soundExpression.sad.play()
            initVar()
basic.forever(on_forever)
