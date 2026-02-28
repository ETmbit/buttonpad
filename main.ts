/*
File:      github.com/ETmbit/buttonpad.ts
Copyright: ETmbit, 2026

License:
This file is part of the ETmbit extensions for MakeCode for micro:bit.
It is free software and you may distribute it under the terms of the
GNU General Public License (version 3 or later) as published by the
Free Software Foundation. The full license text you find at
https://www.gnu.org/licenses.

Disclaimer:
ETmbit extensions are distributed without any warranty.

Dependencies:
ETmbit/general
*/

let buttonpadNoneHandler: handler
let buttonpadOkHandler: handler
let buttonpadUpHandler: handler
let buttonpadDownHandler: handler
let buttonpadLeftHandler: handler
let buttonpadRightHandler: handler
let buttonpadTopLeftHandler: handler
let buttonpadTopRightHandler: handler

enum Pad {
    //% block="no button"
    //% block.loc.nl="geen knop"
    None,
    //% block="button OK"
    //% block.loc.nl="de OK-knop"
    Ok,
    //% block="the up arrow"
    //% block.loc.nl="het pijltje omhoog"
    Up,
    //% block="the down arrow"
    //% block.loc.nl="het pijltje omlaag"
    Down,
    //% block="the left arrow"
    //% block.loc.nl="het pijltje naar links"
    Left,
    //% block="the right arrow"
    //% block.loc.nl="het pijltje naar rechts"
    Right,
    //% block="the top left button"
    //% block.loc.nl="de knop linksboven"
    TopLeft,
    //% block="the top right button"
    //% block.loc.nl="de knop rechtsboven"
    TopRight
}

let ETpad = Pad.None

basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P9) == 1 && ETpad != Pad.TopLeft) {
        ETpad = Pad.TopLeft
        if (buttonpadTopLeftHandler) buttonpadTopLeftHandler()
    } else
    if (pins.digitalReadPin(DigitalPin.P8) == 1 && ETpad != Pad.TopRight) {
        ETpad = Pad.TopRight
        if (buttonpadTopRightHandler) buttonpadTopRightHandler()
    } else
    if (pins.digitalReadPin(DigitalPin.P12) == 1 && ETpad != Pad.Ok) {
        ETpad = Pad.Ok
        if (buttonpadOkHandler) buttonpadOkHandler()
    } else
    if (pins.digitalReadPin(DigitalPin.P13) == 1 && ETpad != Pad.Up) {
        ETpad = Pad.Up
        if (buttonpadUpHandler) buttonpadUpHandler()
    } else
    if (pins.digitalReadPin(DigitalPin.P16) == 1 && ETpad != Pad.Left) {
        ETpad = Pad.Left
        if (buttonpadLeftHandler) buttonpadLeftHandler()
    } else
    if (pins.digitalReadPin(DigitalPin.P15) == 1 && ETpad != Pad.Down) {
        ETpad = Pad.Down
        if (buttonpadDownHandler) buttonpadDownHandler()
    } else
    if (pins.digitalReadPin(DigitalPin.P14) == 1 && ETpad != Pad.Right) {
        ETpad = Pad.Right
        if (buttonpadRightHandler) buttonpadRightHandler()
    } else {
        if (ETpad != Pad.None) {
            ETpad = Pad.None
            if (buttonpadNoneHandler) buttonpadNoneHandler()
        }
    }
})

//% color="#61CBF4" icon="\uf075"
//% block="Buttonpad"
//% block.loc.nl="Buttonpad"
namespace ButtonPad {

    //% block="when %button is pressed"
    //% block.loc.nl="wanneer %button wordt ingedrukt"
    export function onButton(button: Pad, code: () => void): void {
        switch (button) {
            case Pad.None: buttonpadNoneHandler = code; break;
            case Pad.TopLeft: buttonpadTopLeftHandler = code; break;
            case Pad.TopRight: buttonpadTopRightHandler = code; break;
            case Pad.Ok: buttonpadOkHandler = code; break;
            case Pad.Up: buttonpadUpHandler = code; break;
            case Pad.Left: buttonpadLeftHandler = code; break;
            case Pad.Down: buttonpadDownHandler = code; break;
            case Pad.Right: buttonpadRightHandler = code; break;
        }
    }
}