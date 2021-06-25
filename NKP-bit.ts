/**
  * Coding for control of Motor.
  */
enum motorSEL {
    //% block="A"
    M1,
    //% block="B"
    M2,
     //% block="AB"
    M12
}


enum motorDIR {
    //% block="Forward"
    Forward,
    //% block="Reverse"
    Reverse
}
enum motorTurn {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}
enum lineColor {
    //% block="Black"
    Black,
    //% block="White"
    White
}

enum StopMode {
        //% block="brake"
        Brake,
        //% block="coast"
        Coast
}

enum Turn {
        //% block="left"
        Left,
        //% block="right"
        Right
    }
enum Servo {
    
    //% block="P13"
    Servo13,
    //% block="P14"
    Servo14,
    //% block="P15"
    Servo15,
    //% block="P16"
    Servo16
    }

   
/**
 * Custom blocks
 */
//% weight=10 color=#ff9900 weight=10 icon="\uf11b"
namespace NKP_BIT {
    let Color_Line = 0;  //0 = black, 1 = white 
    let minValue = [0, 0, 0, 0, 0, 0, 0, 0];
    let maxValue = [0, 0, 0, 0, 0, 0, 0, 0];
    let Num_Sensor = 0;
    let _lastPosition = 0;
    let returnValue = 0;
    let integral = 0;
    let derivative = 0;
    let previous_error = 0;
    export enum analogPort {
        P0,
        P1,
        P2,
        P3,
        P4,
        P10
    }
    export enum digitalPort {
        P0,
        P1,
        P2,
        P3,
        P4,
        P10
    }
    /**
     * read analog sensor value from P0 -P4 and P10
     * @param selectpin         select analog pin to read
     * @return number           returns analog value from 0 to 1023
     */
    //% blockId=MySensor_analogRead
    //% block="analog read |%selectpin|"
    //% weight=100
    export function analogRead(selectpin: analogPort): number {
        switch (selectpin) {
            case analogPort.P0:
                return pins.analogReadPin(AnalogPin.P0);
            case analogPort.P1:
                return pins.analogReadPin(AnalogPin.P1);
            case analogPort.P2:
                return pins.analogReadPin(AnalogPin.P2);
            case analogPort.P3:
                return pins.analogReadPin(AnalogPin.P3);
            case analogPort.P4:
                return pins.analogReadPin(AnalogPin.P4);
            case analogPort.P10:
                return pins.analogReadPin(AnalogPin.P10);
            default:
                return 0;
        }
    }

    /**
     * read Digital sensor value from P0-P12
     * @param selectpins         select digital pin to read
     * @return number           returns digital value  0 or 1
     */
    //% blockId=MySensor_digitalRead
    //% block="digital read |%selectpins|"
    //% weight=99
    export function digitalRead(selectpins:digitalPort): number {
        switch (selectpins) {
            case digitalPort.P0:
                if(pins.analogReadPin(AnalogPin.P0) > 511 ){return 1;}else{return 0;}
            case digitalPort.P1:
                if(pins.analogReadPin(AnalogPin.P1) > 511 ){return 1;}else{return 0;}
            case digitalPort.P2:
                if(pins.analogReadPin(AnalogPin.P2) > 511 ){return 1;}else{return 0;}
            case digitalPort.P3:
                if(pins.analogReadPin(AnalogPin.P3) > 511 ){return 1;}else{return 0;}
            case digitalPort.P4:
                if(pins.analogReadPin(AnalogPin.P4) > 511 ){return 1;}else{return 0;}
            case digitalPort.P10:
                if(pins.analogReadPin(AnalogPin.P10) > 511 ){return 1;}else{return 0;}
        }
    }
    /**
     * Write a HIGH or a LOW value to a digital pin.
     * @param selectpins         select digital pin to read
     * @param Status           status HIGH to 3.3-5v and LOW 0v
     */
    //% blockId=digitalWriteStatus
    //% block="digital write %selectpins | status %Pinstatus "
    //% weight=98
    export function digitalWrite(selectpins:digitalPort ,Status:number): void {
        switch (selectpins) {
            case digitalPort.P0:
                pins.digitalWritePin(DigitalPin.P0,Status);
            case digitalPort.P1:
                pins.digitalWritePin(DigitalPin.P1,Status);
            case digitalPort.P2:
                pins.digitalWritePin(DigitalPin.P2,Status);
            
        }
        // body...
    }
    

    /**MotorON          Control motor channel direction and speed.   
    * @param Speed        Percent of motor speed, eg: 50
    */
    //% blockId="Motor_MotorRun" block="motor %motorSEL | direction %motorDIR | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=97
    export function MotorRun(Channel:motorSEL, Direction:motorDIR, Speed:number): void {
        led.enable(false)
        let motorspeed = pins.map(Speed, 0, 100, 0, 1023)  
        
        if (Channel == motorSEL.M1 && Direction == motorDIR.Forward) {
           pins.analogWritePin(AnalogPin.P8, motorspeed)
           pins.digitalWritePin(DigitalPin.P9, 1)
        }
     else if (Channel == motorSEL.M1 && Direction == motorDIR.Reverse) {
           pins.analogWritePin(AnalogPin.P9, motorspeed)
           pins.digitalWritePin(DigitalPin.P8, 1)
        }
        else if (Channel == motorSEL.M2 && Direction == motorDIR.Forward) {
           pins.analogWritePin(AnalogPin.P7, motorspeed)
           pins.digitalWritePin(DigitalPin.P6, 1)
        }
        else if (Channel == motorSEL.M2 && Direction == motorDIR.Reverse) {
           pins.analogWritePin(AnalogPin.P6, motorspeed)
           pins.digitalWritePin(DigitalPin.P7, 1)  
        }
        else if (Channel == motorSEL.M12 && Direction == motorDIR.Forward) {
           pins.analogWritePin(AnalogPin.P8, motorspeed)
           pins.digitalWritePin(DigitalPin.P9, 1)
           pins.analogWritePin(AnalogPin.P7, motorspeed)
           pins.digitalWritePin(DigitalPin.P6, 1)
        }
        else if (Channel == motorSEL.M12 && Direction == motorDIR.Reverse) {
           pins.analogWritePin(AnalogPin.P9, motorspeed)
           pins.digitalWritePin(DigitalPin.P8, 1)
           pins.analogWritePin(AnalogPin.P6, motorspeed)
           pins.digitalWritePin(DigitalPin.P7, 1)       
        }
    }


    /**MotorTurn.   
    * @param Speed        Percent of motor speed, eg: 50
    */
    //% blockId="Motor_Turn" block="motor_turn direction %motorTurn | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=96
    export function Motor_turn(Direction:motorTurn, Speed:number): void {
        led.enable(false)
        let motorspeed = pins.map(Speed, 0, 100, 0, 1023)
        if (Direction == motorTurn.Left) {
           pins.analogWritePin(AnalogPin.P7, motorspeed)
           pins.digitalWritePin(DigitalPin.P6, 1)
        }
        else if(Direction == motorTurn.Right){
           pins.analogWritePin(AnalogPin.P8, motorspeed)
           pins.digitalWritePin(DigitalPin.P9, 1)
        }
    }

    /**MotorSpin.   
    * @param Speed        Percent of motor speed, eg: 50
    */
    //% blockId="Motor_spin" block="motor_spin direction %motorTurn | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=95
    export function Motor_spin(Direction:motorTurn, Speed:number): void {
        led.enable(false)
        let motorspeed = pins.map(Speed, 0, 100, 0, 1023)
        if (Direction == motorTurn.Left) {
           pins.analogWritePin(AnalogPin.P9, motorspeed)
           pins.digitalWritePin(DigitalPin.P8, 1)
           pins.analogWritePin(AnalogPin.P7, motorspeed)
           pins.digitalWritePin(DigitalPin.P6, 1)
        }
        else if(Direction == motorTurn.Right){
           pins.analogWritePin(AnalogPin.P8, motorspeed)
           pins.digitalWritePin(DigitalPin.P9, 1)
           pins.analogWritePin(AnalogPin.P6, motorspeed)
           pins.digitalWritePin(DigitalPin.P7, 1) 
        }
    }

    /**MotorStop.   
    * 
    */
    //% blockId="Motor_Stop" block="motor Stop %motorSEL"
    //% weight=96
    export function Motor_Stop(Channel:motorSEL): void {
        led.enable(false)
        if(Channel == motorSEL.M1){
            pins.digitalWritePin(DigitalPin.P8, 0)
            pins.digitalWritePin(DigitalPin.P9, 0)
        }
        else if(Channel == motorSEL.M2){
            pins.digitalWritePin(DigitalPin.P6, 0)
            pins.digitalWritePin(DigitalPin.P7, 0)
        }
    }

    /**
     * Execute puase time
     * @param pausetime     mSec to delay; eg: 100
    */
     //% pausetime.min=1  pausetime.max=100000
     //% blockId=Motor_TimePAUSE block="pause | %pausetime | mS"
     //% color=#0033cc
     //% weight=94
     export function TimePAUSE(pausetime: number): void {
        basic.pause(pausetime)
     }

    /**
     * Control Servo P0 to P12 degree 0 - 180 degree 
     * @param Degree   Servo degree 0-180, eg: 90
     */

    //% blockId="NKP_ServoRun" block="Servo %Servo|degree %Degree"
    //% Degree.min=0 Degree.max=180
    //% weight=93
    export function ServoRun(ServoSelect:Servo, Degree:number): void{
        led.enable(false)
        if(ServoSelect == Servo.Servo13){
            pins.servoWritePin(AnalogPin.P13, Degree)
        }
        if(ServoSelect == Servo.Servo14){
            pins.servoWritePin(AnalogPin.P14, Degree)
        }
    if(ServoSelect == Servo.Servo15){
            pins.servoWritePin(AnalogPin.P15, Degree)
        }
        if(ServoSelect == Servo.Servo16){
            pins.servoWritePin(AnalogPin.P16, Degree)
        }
        
    }
    
    /**
     * TODO: describe your function here
     * @param e describe parameter here
     */
    //% block
    //% weight=92
    export function Set_Line_Color(e: lineColor): void {
        if (e == lineColor.Black) {
            Color_Line = 0;
        }
        else {
            Color_Line = 1;
        }
        // Add code here
    }

    /**
  * Set_Min_Value
  * @param min1 Value of Sensor; eg: 0
  * 
  */
    //% blockId=Set_Min_Value block="Set_Min_Value %min1|"
    //% weight=80
    export function Set_Min_Value(min1: number[]): void {
        Num_Sensor = min1.length;
        for (let NumOfSensor = 0; NumOfSensor < min1.length; NumOfSensor++) {
            minValue[NumOfSensor] = min1[NumOfSensor];
        }
        // Add code here
    }

    /**
  * Set_Max_Value
  * @param max1 Value of Sensor; eg: 0
  * 
  */
    //% blockId=Set_Max_Value block="Set_Max_Value %max1|"
    //% weight=80
    export function Set_Max_Value(max1: number[]): void {
        Num_Sensor = max1.length;
        for (let NumOfSensor = 0; NumOfSensor < max1.length; NumOfSensor++) {
            maxValue[NumOfSensor] = max1[NumOfSensor];
        }
        // Add code here
    }



    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 0
     */
    //% block
    export function ReadMin(value: number): number {
        return minValue[value];
    }
    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 0
     */
    //% block
    export function ReadMax(value: number): number {
        return maxValue[value];
    }


    /**
     * TODO: Read_Position
     * @param SensorRead Value of Sensor; eg: 0
     */
    //% blockId=Read_Position block="Read_Position %SensorRead|"
    export function Read_Position(SensorRead: number[]): number {
        let ON_Line = 0;
        let avg = 0;
        let sum = 0;

        if (Color_Line == 0) {
            for (let numSen = 0; numSen < Num_Sensor; numSen++) {
                let value = Math.map(SensorRead[numSen], minValue[numSen], maxValue[numSen], 100, 0);
                if (value > 20) {
                    ON_Line = 1;
                }
                if (value > 5) {
                    avg += value * (numSen * 100);
                    sum += value;
                }
            }
        }
        else {
            for (let numSen = 0; numSen < Num_Sensor; numSen++) {
                let value = Math.map(SensorRead[numSen], minValue[numSen], maxValue[numSen], 0, 100);
                if (value > 200) {
                    ON_Line = 1;
                }
                if (value > 5) {
                    avg += value * (numSen * 100);
                    sum += value;
                }
            }
        }
        if (ON_Line == 0) {
            if (_lastPosition < (Num_Sensor - 1) * 100 / 2) {
                return 0;
            }
            else {
                return (Num_Sensor - 1) * 100;
            }
        }
        _lastPosition = avg / sum;
        return (_lastPosition);
    }
    export function Motor(_ch:number ,_Speed : number): void{
        if(_ch == 1){
            if(_Speed >= 0){NKP_BIT.MotorRun(motorSEL.M1, motorDIR.Forward, _Speed);}
            else{NKP_BIT.MotorRun(motorSEL.M1, motorDIR.Reverse,Math.abs(_Speed));}
        }
        else if(_ch == 2){
            if(_Speed >= 0){NKP_BIT.MotorRun(motorSEL.M2, motorDIR.Forward, _Speed);}
            else{NKP_BIT.MotorRun(motorSEL.M2, motorDIR.Reverse,Math.abs(_Speed));}
        }
    }
    /**
     * @param Kp Value of Sensor; eg: 1
     * @param Kd Value of Sensor; eg: 0
     * @param _Speed Value of Sensor; eg: 50
     */
    //% blockId=PID block=" PID Function speed%_Speed|KP%kp|KD%kd|Pin%SensorRead|"
    export function PID(_Speed : number,kp: number,kd: number,SensorRead:number[]): void {
        let setpoint = ((Num_Sensor-1)/2) * 100;
        let errors = setpoint - NKP_BIT.Read_Position(SensorRead);
        integral = integral + errors;
        derivative = (errors - previous_error);
        let output = kp * errors + kd * derivative;
        let speed_motor = _Speed;
        if(output > 100 ){output = 100;}
        else if(output <-100){output = -100;}
        Motor(1,speed_motor - output);
        Motor(2,speed_motor + output);
        previous_error = errors;
        
        //return kp * errors + kd * derivative;
    }
}
