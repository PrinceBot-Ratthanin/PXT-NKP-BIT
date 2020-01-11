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

/**
 * Custom blocks
 */
//% weight=10 color=#ff9900 weight=10 icon="\uf11e"
namespace NKP_BIT {

    /**MotorON          Control motor channel direction and speed.   
    * @param Speed  	  Percent of motor speed, eg: 50
    */
    //% blockId="Motor_MotorON" block="motor %motorSEL | direction %motorDIR | speed %Speed"
    //% Speed.min=0 Speed.max=100
    //% weight=90
    export function MotorON(Channel:motorSEL, Direction:motorDIR, Speed:number): void {
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

// //     /**MotorAB  Control motor AB with direction and motor speed, separate A, B.   
// //       * @param speedA   Percent of motor speed A, eg: 50
// //       * @param speedB   Percent of motor speed B, eg: 50
// //       */
// //     //% blockId="Motor_MotorAB" block="motor[AB] direction %motorDIR |speed[A] %speedA |speed[B] %speedB"
// //     //% speedA.min=0 speedA.max=100
// //     //% speedB.min=0 speedB.max=100
// //     //% weight=80
// //     export function MotorAB(Direction:motorDIR, speedA:number, speedB:number): void {
// //         let motorspeedA = pins.map(speedA, 0, 100, 1023, 0)
// //         let motorspeedB = pins.map(speedB, 0, 100, 1023, 0)  
        
// //         if (Direction == motorDIR.Forward) {
// //             pins.analogWritePin(AnalogPin.P14, motorspeedA)
// //             pins.digitalWritePin(DigitalPin.P13, 1)
// // 	    pins.analogWritePin(AnalogPin.P16, motorspeedB)
// //             pins.digitalWritePin(DigitalPin.P15, 1)
// //         }
// //         if (Direction == motorDIR.Reverse) {
// //             pins.analogWritePin(AnalogPin.P13, motorspeedA)
// //             pins.digitalWritePin(DigitalPin.P14, 1)
// //             pins.analogWritePin(AnalogPin.P15, motorspeedB)
// //             pins.digitalWritePin(DigitalPin.P16, 1)
// //         }
// //     }

// //     /**
// //      * Turn off the motor
// //      * @param motor   Which motor to turn off
// //      */
// //     //% blockId="Motor_motoroff" block="motor %motorSEL | stop mode %StopMode"
// //     //% weight=40
// //     export function motorOFF(Channel:motorSEL, stop:StopMode): void {
// //         if (Channel == motorSEL.M12 && stop == StopMode.Brake) {
// // 		pins.digitalWritePin(DigitalPin.P13, 1)
// // 		pins.digitalWritePin(DigitalPin.P14, 1)
// // 		pins.digitalWritePin(DigitalPin.P15, 1)
// // 		pins.digitalWritePin(DigitalPin.P16, 1) 
// //         }
// //         else if (Channel == motorSEL.M12 && stop == StopMode.Coast) {
// // 		pins.digitalWritePin(DigitalPin.P13, 0)
// // 		pins.digitalWritePin(DigitalPin.P14, 0)
// // 		pins.digitalWritePin(DigitalPin.P15, 0)
// // 		pins.digitalWritePin(DigitalPin.P16, 0)  
// //         }
// //         else if (Channel == motorSEL.M1 && stop == StopMode.Brake) {
// // 		pins.digitalWritePin(DigitalPin.P13, 1)
// // 		pins.digitalWritePin(DigitalPin.P14, 1) 
// //         }
// //         else if (Channel == motorSEL.M1 && stop == StopMode.Coast) {
// // 		pins.digitalWritePin(DigitalPin.P13, 0)
// // 		pins.digitalWritePin(DigitalPin.P14, 0) 
// //         }
// //         else if (Channel == motorSEL.M2 && stop == StopMode.Brake) {
// // 		pins.digitalWritePin(DigitalPin.P15, 1)
// // 		pins.digitalWritePin(DigitalPin.P16, 1) 
// //         }
// //         else if (Channel == motorSEL.M2 && stop == StopMode.Coast) {
// //  		pins.digitalWritePin(DigitalPin.P15, 0)
// // 		pins.digitalWritePin(DigitalPin.P16, 0)
// //         }
// //     }

// // /**
// //  * Control motor for linefollow or turn direction of robot.
// //  * @param turnDIR      Turn Left or Right
// //  * @param speedturn    Motor speed; eg: 40
// // */
// // //% blockId="Motor_followlineTurn" block="turn %Turn | speed %speedturn"
// // //% speedturn.min=0 speedturn.max=100
// // //% weight=50
// // export function followlineTurn(turnDIR:Turn, speedturn:number): void {
// //       let motorspeedturn = pins.map(speedturn,0,100,1023, 0)   
// //       if (turnDIR == Turn.Left) {
// //  	    pins.digitalWritePin(DigitalPin.P13, 0)
// // 	    pins.digitalWritePin(DigitalPin.P14, 0) 
// // 	    pins.analogWritePin(AnalogPin.P16, motorspeedturn)
// //             pins.digitalWritePin(DigitalPin.P15, 1)
// //        }
// //       if (turnDIR == Turn.Right) {
// //             pins.analogWritePin(AnalogPin.P14, motorspeedturn)
// //             pins.digitalWritePin(DigitalPin.P13, 1)
// //  	    pins.digitalWritePin(DigitalPin.P15, 0)
// // 	    pins.digitalWritePin(DigitalPin.P16, 0)
// //        }
// //     }

// // /**
// //  * Execute dual motor to rotate with delay time mS to brake mode.
// //  * @param rotateDIR       Rotate robot direction.
// //  * @param speedrotate   	Speed of motor; eg: 50
// //  * @param pausems       	Time to brake; eg: 400
// //  */
// //  //% blockId="Motor_rotate" block="rotate  %Turn | speed %speedrotate | pause %pausems |mS"
// //  //% speedrotate.min=0 speedrotate.max=100
// //  //% weight=70
// //  export function Rotate(rotateDIR:Turn, speedrotate:number, pausems: number): void {
// //       let motorspeedrotate = pins.map(speedrotate,0,100,1023, 0)      
// //       if (rotateDIR == Turn.Left) {
// //            pins.analogWritePin(AnalogPin.P13, motorspeedrotate)
// //            pins.digitalWritePin(DigitalPin.P14, 1) 
// //            pins.analogWritePin(AnalogPin.P16, motorspeedrotate)
// //            pins.digitalWritePin(DigitalPin.P15, 1)
// // 	   basic.pause(pausems)	   
// // 	   pins.digitalWritePin(DigitalPin.P13, 1)
// // 	   pins.digitalWritePin(DigitalPin.P14, 1)
// // 	   pins.digitalWritePin(DigitalPin.P15, 1)
// // 	   pins.digitalWritePin(DigitalPin.P16, 1) 
// //       }
// //       if (rotateDIR == Turn.Right) {
// //            pins.analogWritePin(AnalogPin.P14, motorspeedrotate)
// //            pins.digitalWritePin(DigitalPin.P13, 1) 
// //            pins.analogWritePin(AnalogPin.P15, motorspeedrotate)
// //            pins.digitalWritePin(DigitalPin.P16, 1)
// // 	   basic.pause(pausems)	   
// // 	   pins.digitalWritePin(DigitalPin.P13, 1)
// // 	   pins.digitalWritePin(DigitalPin.P14, 1)
// // 	   pins.digitalWritePin(DigitalPin.P15, 1)
// // 	   pins.digitalWritePin(DigitalPin.P16, 1)  
// //        }
// //     }

// // /**
// //  * Execute dual motor to rotate Left and Right, non stop for use linefollow mode.
// //  * @param rotateLINE     	rotate robot direction.
// //  * @param speedline     	motor speed; eg: 50
// //  */
// //  //% blockId="Motor_rotatenotime"  block="rotate %Turn |speed %speedline"
// //  //% speedline.min=0 speedline.max=100
// //  //% weight=60
// //  export function RotateNOTIME(rotateLINE:Turn, speedline:number): void {
// //       let motorspeedline = pins.map(speedline,0,100,1023, 0)      
// //       if (rotateLINE == Turn.Left) {
// //            pins.analogWritePin(AnalogPin.P13, motorspeedline)
// //            pins.digitalWritePin(DigitalPin.P14, 1) 
// //            pins.analogWritePin(AnalogPin.P16, motorspeedline)
// //            pins.digitalWritePin(DigitalPin.P15, 1)
// //       }
// //       if (rotateLINE == Turn.Right) {
// //            pins.analogWritePin(AnalogPin.P14, motorspeedline)
// //            pins.digitalWritePin(DigitalPin.P13, 1) 
// //            pins.analogWritePin(AnalogPin.P15, motorspeedline)
// //            pins.digitalWritePin(DigitalPin.P16, 1)
// //        }
// //     }

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
