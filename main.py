def determineWinLossDraw():
    global result
    if Choose == ChooseReceived:
        result = "Draw"
    elif ChooseReceived == 10:
        result = "Wait"
    elif ChooseReceived == 88:
        result = "Loss"
    elif ChooseReceived == 55:
        result = "Draw"
    elif Choose == 10:
        if Math.random_boolean():
            result = "Win"
        else:
            result = "Draw"
    elif Choose == 5 and ChooseReceived == 0 or Choose == 2 and ChooseReceived == 5 or Choose == 0 and ChooseReceived == 2:
        result = "Win"
    else:
        result = "Loss"
    return result

def on_received_number(receivedNumber):
    global ChooseReceived
    ChooseReceived = receivedNumber
    soundExpression.mysterious.play()
    basic.pause(200)
radio.on_received_number(on_received_number)

def on_logo_long_pressed():
    global Choose, State
    if State == "Init" or State == "Chosen":
        basic.show_icon(IconNames.PITCHFORK)
        basic.pause(100)
        basic.show_number(trumpQuota)
        basic.pause(100)
        if trumpQuota > 0:
            basic.show_icon(IconNames.PITCHFORK)
            Choose = 10
            State = "Chosen"
        else:
            basic.show_icon(IconNames.NO)
input.on_logo_event(TouchButtonEvent.LONG_PRESSED, on_logo_long_pressed)

def showWait():
    basic.show_leds("""
        . . . . .
        . . . . .
        . # . . .
        . . . . .
        . . . . .
        """)
    basic.show_leds("""
        . . . . .
        . . . . .
        . # # . .
        . . . . .
        . . . . .
        """)
    basic.show_leds("""
        . . . . .
        . . . . .
        . # # # .
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

lossCount = 0
winLossDraw = ""
trumpQuota = 0
State = ""
result = ""
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
    global trumpQuota, winLossDraw, winCount, lossCount
    if State == "Send":
        showWait()
        if Choose == 5:
            basic.show_icon(IconNames.SQUARE)
        elif Choose == 2:
            basic.show_icon(IconNames.SCISSORS)
        elif Choose == 0:
            basic.show_icon(IconNames.SMALL_SQUARE)
        else:
            basic.show_icon(IconNames.PITCHFORK)
        basic.pause(50)
        if ChooseReceived >= 0:
            if Choose == 10:
                trumpQuota += -1
            winLossDraw = determineWinLossDraw()
            if winLossDraw == "Win":
                winCount += 1
                if Choose == 10:
                    radio.send_number(88)
                basic.show_icon(IconNames.HAPPY)
                soundExpression.giggle.play()
            elif winLossDraw == "Loss":
                lossCount += 1
                if lossCount % 3 == 0:
                    trumpQuota += 1
                basic.show_icon(IconNames.SAD)
                soundExpression.sad.play()
            elif winLossDraw == "Draw":
                if Choose == 10:
                    radio.send_number(55)
                basic.show_icon(IconNames.ASLEEP)
                soundExpression.yawn.play()
            if winLossDraw != "Wait":
                initVar()
basic.forever(on_forever)
