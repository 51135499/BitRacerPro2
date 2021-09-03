enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters
}
//% weight=0 color=#f98020 icon="\uf1ba" block="BitRacer"
namespace BitRacer {
    let N76_ADDR = 0x10
    export enum Motors {
        //% block="left"
        M_R = 0,
        //% block="right"
        M_L = 1,
        //% block="all"
        All = 2
    }
    export enum IR_Sensors {
        //% block="IR1"
        IR1 = 0x03,
        //% block="IR2"
        IR2 = 0x04,
        //% block="IR3"
        IR3 = 0x05,
        //% block="IR4"
        IR4 = 0x06,
        //% block="IR5"
        IR5 = 0x07
    }
    export enum LineColor {
        //% block="White"
        White = 0x0A,
        //% block="Black"
        Black = 0x0B
    }
    export enum LEDs {
        //% block="right"
        LED_R = 8,
        //% block="left"
        LED_L = 16
    }
    export enum Switch {
        //% block="on"
        on = 0x00,
        //% block="off"
        off = 0x01
    }
    export enum control {
        //% block="stop"
        stop = 0x00,
        //% block="acc"
        acc = 0x01,
        //% block="con"
        con = 0x02,
        //% block="dec"
        dec = 0x03
    }
    export enum direction {
        //% block="right"
        right = 0x00,
        //% block="left"
        left = 0x01
    }
    /**
    * 控制馬達
    * @param index 馬達選擇
    * @param PWM 控制速度
    */
    //% weight=100
    //% block="motor|%index|at speed|%PWM"
    //% PWM.min=-1000 PWM.max=1000
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=3
    export function motorRun(index: Motors, PWM: number): void {
        let i2cbuf = pins.createBuffer(3);
        if (index == 0) {
            i2cbuf[0] = 0x02;
            i2cbuf[1] = PWM >> 8;
            i2cbuf[2] = PWM;
            pins.i2cWriteBuffer(N76_ADDR, i2cbuf);
        }
        if (index == 1) {
            i2cbuf[0] = 0x00;
            i2cbuf[1] = PWM >> 8;
            i2cbuf[2] = PWM;
            pins.i2cWriteBuffer(N76_ADDR, i2cbuf);
        }
        if (index == 2) {
            i2cbuf[0] = 0x00;
            i2cbuf[1] = PWM >> 8;
            i2cbuf[2] = PWM;
            pins.i2cWriteBuffer(N76_ADDR, i2cbuf);
            i2cbuf[0] = 0x02;
            pins.i2cWriteBuffer(N76_ADDR, i2cbuf);
        }
    }
    /**
    * 讀取紅外線數值
    * @param SensorIDs 第x顆紅外線
    */
    //% weight=99
    //% block="read |%SensorID sensor"
    //% SensorID.fieldEditor="gridpicker" SensorID.fieldOptions.columns=3
    export function readIR(SensorID: IR_Sensors): number {
        pins.i2cWriteNumber(N76_ADDR, SensorID, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.UInt16BE, false)
    }
    /**
    * 讀取紅外線數值
    * @param SensorIDs 第x顆紅外線
    */
    //% weight=98
    //% block="read |%SensorID sensor"
    //% SensorIDs.min=0 SensorIDs.max=4
    export function readIR2(SensorIDs: number): number {
        pins.i2cWriteNumber(N76_ADDR, SensorIDs + 3, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.UInt16BE, false)
    }
    /**
    * 設定LED燈
    * @param LedPin LED燈腳位
    * @param status LED燈狀態
    */
    //% weight=97
    //% block="LED|%LedPin|%status"
    //% LedPin.fieldEditor="gridpicker" LedPin.fieldOptions.columns=1
    //% status.fieldEditor="gridpicker" status.fieldOptions.columns=1
    export function LED(LedPin: LEDs, status: Switch): void {
        if (LedPin == LEDs.LED_R) {
            pins.digitalWritePin(DigitalPin.P8, status)
        }
        else if (LedPin == LEDs.LED_L) {
            pins.digitalWritePin(DigitalPin.P16, status)
        }
    }

    /**
    * 校正開始
    */
    //% color=#2080ff
    //% weight=30
    //% block="Calibrate Begin"
    export function CalibrateBegin(): void {
        pins.i2cWriteNumber(N76_ADDR, 0x09, NumberFormat.UInt8LE, false)
    }
    /**
    * 校正結束
    * @param Color 校正線條顏色
    */
    //% color=#2080ff                
    //% weight=29
    //% block="Calibrate End|%Color (Line)"
    //% Color.fieldEditor="gridpicker" Color.fieldOptions.columns=1
    export function CalibrateEnd(Color: LineColor): void {
        pins.i2cWriteNumber(N76_ADDR, Color, NumberFormat.UInt8LE, false)
    }
    /**
    * 讀取線位置
    */
    //% color=#2080ff
    //% weight=28
    //% block="read Line position"
    export function readLine(): number {
        pins.i2cWriteNumber(N76_ADDR, 0x08, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Int16BE, false)
    }
    /**
    * 陀螺儀零點校正(執行後須等待1秒)
    */
    //% color=#3dbf53
    //% weight=20
    //% block="Set Zero point"
    export function SetZeropoint(): void {
        pins.i2cWriteNumber(N76_ADDR, 0x20, NumberFormat.UInt8LE, false)
    }
    /**
    * 讀取Z軸角度數值
    */
    //% color=#3dbf53
    //% weight=20
    //% block="read Angle Z"
    export function ReadAngleZ(): number {
        pins.i2cWriteNumber(N76_ADDR, 0x21, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Float32BE, false)
    }
    /**
    * 讀取Z軸角速度數值
    */
    //% color=#3dbf53
    //% weight=20
    //% block="read Gyro Z"
    export function ReadGyroZ(): number {
        pins.i2cWriteNumber(N76_ADDR, 0x22, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Float32BE, false)
    }
    /**
    * 讀取Y軸加速度數值
    */
    //% color=#3dbf53
    //% weight=20
    //% block="read Accel Y"
    export function ReadAccelY(): number {
        pins.i2cWriteNumber(N76_ADDR, 0x23, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Float32BE, false)
    }
    /**
    * 清除觀測器數值
    */
    //% color=#40994f
    //% weight=20
    //% block="Observer Clear"
    export function ObserverClear(): void {
        pins.i2cWriteNumber(N76_ADDR, 0x30, NumberFormat.UInt8LE, false)
    }
    /**
    * 讀取距離(mm)
    */
    //% color=#40994f
    //% weight=20
    //% block="Read Observer Distance"
    export function ReadObserverDistance(): number {
        pins.i2cWriteNumber(N76_ADDR, 0x31, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Float32BE, false)
    }
    /**
    * 讀取速度(mm/ms)
    */
    //% color=#40994f
    //% weight=20
    //% block="Read Observer Velocity"
    export function ReadObserverVelocity(): number {
        pins.i2cWriteNumber(N76_ADDR, 0x32, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Float32BE, false)
    }
    /**
    * 設定紅外線控制PID參數
    * @param Kp 比例增益, eg: 0
    * @param Ki 積分增益, eg: 0
    * @param Kd 微分增益, eg: 0
    */
    //% weight=15
    //% block="PID IR Kp|%Kp Ki|%Ki Kd|%Kd"
    export function setIR(Kp: number, Ki: number, Kd: number): void {
        let i2cbuf = pins.createBuffer(5)
        i2cbuf[0] = 0x40
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, Kp)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
        i2cbuf[0] = 0x41
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, Ki)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
        i2cbuf[0] = 0x42
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, Kd)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
    }
    /**
    * 設定位置控制PID參數
    * @param Kp 比例增益, eg: 0
    * @param Ki 積分增益, eg: 0
    * @param Kd 微分增益, eg: 0
    */
    //% weight=15
    //% block="PID Pos Kp|%Kp Ki|%Ki Kd|%Kd"
    export function setPos(Kp: number, Ki: number, Kd: number): void {
        let i2cbuf = pins.createBuffer(5)
        i2cbuf[0] = 0x43
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, Kp)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
        i2cbuf[0] = 0x44
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, Ki)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
        i2cbuf[0] = 0x45
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, Kd)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
    }
    /**
    * 設定角度控制PID參數
    * @param Kp 比例增益, eg: 0
    * @param Ki 積分增益, eg: 0
    * @param Kd 微分增益, eg: 0
    */
    //% weight=15
    //% block="PID Theta Kp|%Kp Ki|%Ki Kd|%Kd"
    export function setTheta(Kp: number, Ki: number, Kd: number): void {
        let i2cbuf = pins.createBuffer(5)
        i2cbuf[0] = 0x46
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, Kp)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
        i2cbuf[0] = 0x47
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, Ki)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
        i2cbuf[0] = 0x48
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, Kd)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
    }
    /**
    * 設定輪直徑
    * @param n 輪直徑, eg: 23
    */
    //% weight=14
    //% block="Wheel |%n (mm)"
    export function setWheel(n: number): void {
        let i2cbuf = pins.createBuffer(5)
        i2cbuf[0] = 0x50
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, n)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
    }
    /**
    * 設定車寬
    * @param n 車寬, eg: 85
    */
    //% weight=14
    //% block="CarWidth |%n (mm)"
    export function setCarWidth(n: number): void {
        let i2cbuf = pins.createBuffer(5)
        i2cbuf[0] = 0x51
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, n)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
    }
    /**
    * 設定基礎速度(公尺/秒)
    * @param speed 速度, eg: 5
    */
    //% weight=14
    //% block="BaseSpeed |%speed (m/s)"
    export function setBaseSpeed(speed: number): void {
        let i2cbuf5 = pins.createBuffer(5)
        i2cbuf5[0] = 0x52
        i2cbuf5.setNumber(NumberFormat.Float32LE, 1, speed)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf5)
    }
    /**
    * 設定基礎速度(公尺/秒)
    * @param speed 速度, eg: 5
    */
    //% weight=14
    //% block="MaxSpeed |%speed (m/s)"
    export function setMaxSpeed(speed: number): void {
        let i2cbuf = pins.createBuffer(5)
        i2cbuf[0] = 0x53
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, speed)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
    }
    /**
    * 設定加速度(公尺/秒)
    * @param acc 加速度, eg: 5
    */
    //% weight=14
    //% block="Acceleration |%acc (m/s)"
    export function setAcc(acc: number): void {
        let i2cbuf = pins.createBuffer(5)
        i2cbuf[0] = 0x54
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, acc)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
    }
    /**
    * 設定角加速度(公尺/秒)
    * @param alpha 角加速度, eg: 5
    */
    //% weight=14
    //% block="Alpha |%alpha (m/s)"
    export function setAlpha(alpha: number): void {
        let i2cbuf = pins.createBuffer(5)
        i2cbuf[0] = 0x55
        i2cbuf.setNumber(NumberFormat.Float32LE, 1, alpha)
        pins.i2cWriteBuffer(N76_ADDR, i2cbuf)
    }
    /**
    * 自走車控制開關
    * @param status 開關
    */
    //% weight=14
    //% block="carControl |%status"
    export function carControl(status: Switch): void {
        pins.i2cWriteNumber(N76_ADDR, 0x56 + status, NumberFormat.UInt8LE, false)
    }
    /**
    * 紅外線吸線控制開關
    * @param status 開關
    */
    //% weight=14
    //% block="IR CorrectionMode |%status"
    export function correctionMode(status: Switch): void {
        pins.i2cWriteNumber(N76_ADDR, 0x58 + status, NumberFormat.UInt8LE, false)
    }
    /**
    * 位置控制
    * @param status 控制狀態
    */
    //% weight=14
    //% block="positionControl |%status"
    export function positionFlag(status: control): void {
        pins.i2cWriteNumber(N76_ADDR, 0x60 + status, NumberFormat.UInt8LE, false)
    }
    /**
    * 轉彎方向
    * @param status 方向
    */
    //% weight=14
    //% block="turnDirection |%status"
    export function turnDirection(status: direction): void {
        pins.i2cWriteNumber(N76_ADDR, 0x64 + status, NumberFormat.UInt8LE, false)
    }
    /**
    * 角度控制
    * @param status 控制狀態
    */
    //% weight=14
    //% block="thetaControl |%status"
    export function thetaFlag(status: control): void {
        pins.i2cWriteNumber(N76_ADDR, 0x66 + status, NumberFormat.UInt8LE, false)
    }
    /**
    * 讀取電池電壓
    */
    //% color=#3dbfa1
    //% weight=1
    //% block="read Battery Voltage"
    export function readBat(): number {
        pins.i2cWriteNumber(N76_ADDR, 0x2F, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.UInt16BE, false) / 1000
    }
    /**
    * 讀取版本號
    */
    //% color=#3dbfa1
    //% weight=0
    //% block="read Battery Voltage"
    export function readVersion(): number {
        pins.i2cWriteNumber(N76_ADDR, 0xFF, NumberFormat.UInt8LE, false)
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Float32BE, false)
    }
}
