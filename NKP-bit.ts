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
        P10,
        P6,
        P7,
        P8,
        P9,
        P12,
        P5,
        P11
    }

    /**
     * read analog sensor value from P0 -P4 and P10
     * @param selectpin         select analog pin to read
     * @return number           returns analog value from 0 to 1023
     */
    //% blockId=MySensor_analogRead
    //% block="analog read |%selectpin|"
    //% weight=80
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
    //% weight=79
    export function digitalRead(selectpins:digitalPort): number {
        switch (selectpins) {
            case digitalPort.P0:
                return pins.digitalReadPin(DigitalPin.P0);
            case digitalPort.P1:
                return pins.digitalReadPin(DigitalPin.P1);
            case digitalPort.P2:
                return pins.digitalReadPin(DigitalPin.P2);
            case digitalPort.P3:
                return pins.digitalReadPin(DigitalPin.P3);
            case digitalPort.P4:
                return pins.digitalReadPin(DigitalPin.P4);
            case digitalPort.P5:
                return pins.digitalReadPin(DigitalPin.P5);
            case digitalPort.P6:
                return pins.digitalReadPin(DigitalPin.P6);
            case digitalPort.P7:
                return pins.digitalReadPin(DigitalPin.P7);
            case digitalPort.P8:
                return pins.digitalReadPin(DigitalPin.P8);
            case digitalPort.P9:
                return pins.digitalReadPin(DigitalPin.P9);
            case digitalPort.P10:
                return pins.digitalReadPin(DigitalPin.P10);
            case digitalPort.P11:
                return pins.digitalReadPin(DigitalPin.P11);
            case digitalPort.P12:
                return pins.digitalReadPin(DigitalPin.P12);
            default:
                return 0;
        }
    }

    /**MotorON          Control motor channel direction and speed.   
    * @param Speed  	  Percent of motor speed, eg: 50
    */
    //% blockId="Motor_MotorRun" block="motor %motorSEL | direction %motorDIR | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=90
    export function MotorRun(Channel:motorSEL, Direction:motorDIR, Speed:number): void {
        let motorspeed = pins.map(Speed, 0, 100, 0, 1023)  
        
        if (Channel == motorSEL.M1 && Direction == motorDIR.Forward) {
           pins.analogWritePin(AnalogPin.P9, motorspeed)
           pins.digitalWritePin(DigitalPin.P8, 1)
        }
        else if (Channel == motorSEL.M2 && Direction == motorDIR.Forward) {
           pins.analogWritePin(AnalogPin.P7, motorspeed)
           pins.digitalWritePin(DigitalPin.P6, 1)
        }
        else if (Channel == motorSEL.M1 && Direction == motorDIR.Reverse) {
           pins.analogWritePin(AnalogPin.P8, motorspeed)
           pins.digitalWritePin(DigitalPin.P9, 1)
        }
        else if (Channel == motorSEL.M2 && Direction == motorDIR.Reverse) {
           pins.analogWritePin(AnalogPin.P6, motorspeed)
           pins.digitalWritePin(DigitalPin.P7, 1)  
        }
        else if (Channel == motorSEL.M12 && Direction == motorDIR.Forward) {
           pins.analogWritePin(AnalogPin.P9, motorspeed)
           pins.digitalWritePin(DigitalPin.P8, 1)
           pins.analogWritePin(AnalogPin.P7, motorspeed)
           pins.digitalWritePin(DigitalPin.P6, 1)
        }
        else if (Channel == motorSEL.M12 && Direction == motorDIR.Reverse) {
           pins.analogWritePin(AnalogPin.P8, motorspeed)
           pins.digitalWritePin(DigitalPin.P9, 1)
           pins.analogWritePin(AnalogPin.P6, motorspeed)
           pins.digitalWritePin(DigitalPin.P7, 1)  		
        }
    }
	/**
     * Control Servo P0 to P12 degree 0 - 180 degree 
     * @param Degree   Servo degree 0-180, eg: 90
     */

    //% blockId="NKP_ServoRun" block="Servo %Servo|degree %Degree"
    //% Degree.min=0 Degree.max=180
    //% weight=100
    export function ServoRun(ServoSelect:Servo, Degree:number): void{
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
 * Execute puase time
 * @param pausetime  	mSec to delay; eg: 100
*/
 //% pausetime.min=1  pausetime.max=100000
 //% blockId=Motor_TimePAUSE block="pause | %pausetime | mS"
 //% color=#0033cc
 //% weight=30
 export function TimePAUSE(pausetime: number): void {
	basic.pause(pausetime)
        }
}
