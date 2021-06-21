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
	export enum analog_pin {
        P0,
        P1,
        P2,
        P3,
        P4,
        P10
    }
	export enum digital_pin {
        P0,
        P1,
        P2,
        P3,
        P4,
	P5,
	P6,
	P7,
	P8,
	P9,
        P10,
	P11,
	P12,
	P13,
	P14,
	P15,
	P16
    }
	/**
     * TODO: AnalogRead
     * @param e describe value here, eg: 0
     */
    //% block
    export function analog(pin: analog_pin): number {
        return pins.analogReadPin(AnalogPin.pin);
    }
	
	/**
     * TODO: digitalRead
     * @param e describe value here, eg: 0
     */
    //% block
    export function DigitalRead(pin: digital_pin): number {
        return pins.digitalReadPin(DigitalPin.pin);
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
