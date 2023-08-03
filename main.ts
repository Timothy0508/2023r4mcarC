/**
 * 13/14 -> left
 * 
 * 15/16 -> right
 */
function RightBack () {
    PWM += change_value
    if (PWM >= MAX) {
        PWM = MAX
    }
    sensors.DDMmotor(
    AnalogPin.P13,
    1,
    AnalogPin.P14,
    PWM / 2
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    1,
    AnalogPin.P16,
    0
    )
}
function RightTurn () {
    PWM += change_value
    if (PWM >= MAX) {
        PWM = MAX
    }
    sensors.DDMmotor(
    AnalogPin.P13,
    1,
    AnalogPin.P14,
    PWM / 4
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    1,
    AnalogPin.P16,
    PWM / 2
    )
}
function last () {
    Go()
    basic.pause(500)
    while (!(pins.digitalReadPin(DigitalPin.P1) == 1)) {
        LeftTurn()
    }
    Back()
    basic.pause(1000)
    Go()
    basic.pause(500)
    while (!(pins.digitalReadPin(DigitalPin.P1) == 1)) {
        LeftTurn()
    }
    Go()
    basic.pause(5000)
    STOP()
    basic.pause(9999999999999999999999999999999)
}
input.onButtonPressed(Button.A, function () {
    control2 += 1
    basic.showNumber(control2)
    basic.pause(100)
})
function Back () {
    PWM = 120
    sensors.DDMmotor(
    AnalogPin.P13,
    0,
    AnalogPin.P14,
    100
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    1,
    AnalogPin.P16,
    100
    )
}
function STOP () {
    sensors.DDMmotor(
    AnalogPin.P13,
    0,
    AnalogPin.P14,
    0
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    0,
    AnalogPin.P16,
    0
    )
}
function LeftBack () {
    PWM += change_value
    if (PWM >= MAX) {
        PWM = MAX
    }
    sensors.DDMmotor(
    AnalogPin.P13,
    0,
    AnalogPin.P14,
    0
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    0,
    AnalogPin.P16,
    PWM / 2
    )
}
function Go () {
    PWM = 120
    sensors.DDMmotor(
    AnalogPin.P13,
    1,
    AnalogPin.P14,
    120
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    0,
    AnalogPin.P16,
    120
    )
}
/**
 * P1 -> left
 * 
 * P8 -> right
 * 
 * 0,0 雙白
 * 
 * 1,0 左黑右白
 * 
 * 0,1 左白右黑
 * 
 * 1,1 雙黑
 */
function LeftTurn () {
    PWM += change_value
    if (PWM >= MAX) {
        PWM = MAX
    }
    sensors.DDMmotor(
    AnalogPin.P13,
    0,
    AnalogPin.P14,
    PWM / 2
    )
    sensors.DDMmotor(
    AnalogPin.P15,
    0,
    AnalogPin.P16,
    PWM / 4
    )
}
let LINE = 0
let control2 = 0
let change_value = 0
let PWM = 0
let MAX = 0
basic.showIcon(IconNames.Giraffe)
MAX = 180
PWM = 120
change_value = 2
let TIME = 0
control2 = 0
let LBlack = 0
basic.forever(function () {
    while (pins.digitalReadPin(DigitalPin.P20) == 0) {
        basic.showIcon(IconNames.Duck)
        basic.pause(2000)
        Go()
        basic.pause(500)
        STOP()
        basic.pause(500)
        basic.showIcon(IconNames.Snake)
        LBlack += 1
        LINE = 1
        basic.clearScreen()
    }
    while (LINE == 1) {
        if (!(pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 1)) {
            if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                Go()
            }
            if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                LeftTurn()
            }
            if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 1) {
                RightTurn()
            }
        } else {
            STOP()
            basic.pause(2000)
            Go()
            basic.pause(200)
            STOP()
            basic.pause(100)
            LBlack += 1
            if (LBlack == control2) {
                if (control2 == 6) {
                    last()
                } else {
                    LINE = 2
                }
            }
        }
    }
    while (LINE == 2) {
        for (let index = 0; index < 10; index++) {
            LeftBack()
            basic.pause(100)
            if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                break;
            }
        }
        STOP()
        basic.pause(1000)
        LINE = 3
    }
    while (LINE == 3) {
        if (!(pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 1 || TIME == 10)) {
            if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                Go()
                basic.pause(100)
                TIME += 1
            }
            if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P8) == 0) {
                LeftTurn()
                basic.pause(100)
                TIME += 1
            }
            if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P8) == 1) {
                RightTurn()
                basic.pause(100)
                TIME += 1
            }
        } else {
            STOP()
            basic.pause(500)
            LINE = 4
        }
        break;
    }
    while (LINE == 4) {
        Back()
        basic.pause(2000)
        STOP()
        basic.pause(100)
        LINE = 5
    }
})
