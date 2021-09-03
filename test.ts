input.onButtonPressed(Button.A, function () {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    BitRacerPro2.AllControlClear()
    BitRacerPro2.SetZeropoint()
    basic.pause(1100)
    while (BitRacerPro2.readPosCommand() <= 25) {
        BitRacerPro2.positionFlag(BitRacerPro2.control.acc)
    }
    while (BitRacerPro2.readPosCommand() <= 175) {
        BitRacerPro2.positionFlag(BitRacerPro2.control.con)
    }
    while (BitRacerPro2.readVelCommand() > 0) {
        BitRacerPro2.positionFlag(BitRacerPro2.control.dec)
    }
    basic.pause(200)
    BitRacerPro2.positionFlag(BitRacerPro2.control.stop)
    music.playTone(330, music.beat(BeatFraction.Quarter))
})
input.onButtonPressed(Button.AB, function () {
    music.playTone(262, music.beat(BeatFraction.Quarter))
    BitRacerPro2.AllControlClear()
    BitRacerPro2.SetZeropoint()
    basic.pause(1100)
    BitRacerPro2.correctionMode(BitRacerPro2.Switch.on)
    while (BitRacerPro2.readPosCommand() <= 25) {
        BitRacerPro2.positionFlag(BitRacerPro2.control.acc)
    }
    while (true) {
        BitRacerPro2.positionFlag(BitRacerPro2.control.con)
    }
    while (BitRacerPro2.readVelCommand() > 0) {
        BitRacerPro2.positionFlag(BitRacerPro2.control.dec)
    }
    basic.pause(200)
    BitRacerPro2.positionFlag(BitRacerPro2.control.stop)
    music.playTone(330, music.beat(BeatFraction.Quarter))
})
input.onButtonPressed(Button.B, function () {
    serial.writeValue("D", BitRacerPro2.ReadObserverDistance())
})
serial.redirectToUSB()
BitRacerPro2.carControl(BitRacerPro2.Switch.on)
BitRacerPro2.correctionMode(BitRacerPro2.Switch.off)
BitRacerPro2.setWheel(22.8)
basic.forever(function () {

})
