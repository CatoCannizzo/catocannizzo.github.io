
// include the library code:
#include <LiquidCrystal.h>

//Declare Pin Numbers
const int LED_RED = 8;
const int LED_IR = 9;
const int detectorPin = A0;

//LCD init
const int rs = 7, en = 6, d4 = 5, d5 = 4, d6 = 3, d7 = 2; //Ardino pin numbers
LiquidCrystal lcd(rs, en, d4, d5, d6, d7); //LCD pins used

//Input Parameters
const int stabilityDelay = 5; //Delay between turning LED on and reading detector
const int numReadings = 10; //how many reading to take average of
int Index = 0;              // the index of the current reading

//BPM parameters
unsigned long maxtime = 0;                  // place to store the red LED max reading time
unsigned long mintime = 0;                 // place to store the red LED min reading time
unsigned long currenttime = 0;            // place to store the current time
unsigned long oldtime = 0;               // place to store the time value of the old bpm calculation 
int vartime = 0;                        // place to store differnce in time for bpm calculations
int range = 500;                       // how many millis before trying to take bpm again (To small and it won't get a full max & min, to long and it will skip over a heart beat
int maxRed = 0;                       // int var to store max red LED reading
int minRed = 1024;                   // int var to store min red LED reading
int bpm = 0;                        // int var to store bpm calculated
bool valid = false;                // bool to check if the bpm is actually in a human range

//RED LED Parameters
int redReadings[numReadings];      // the readings from the analog input for red LED
int redtotal = 0;                  // the running total for red LED
int redaverage = 0;                // the average for red LED
int redavelong = 0;                // the average over a longer time for red LED

//IR LED Parameters
int irReadings[numReadings];      // the readings from the analog input for IR LED
int irtotal = 0;                  // the running total for IR LED
int iraverage = 0;                // the average for IR LED
int irinit = 0;                   // the init reading to compare to for IR LED

void setup() {
  Serial.begin(9600); //Start Serial Communication with 9600 Baud Rate 
  pinMode(LED_RED, OUTPUT); //Sets RED LED as an output pin
  pinMode(LED_IR, OUTPUT); //Sets IR LED as an output pin
  pinMode(detectorPin, INPUT); //Sets detectorPin as an input pin
  lcd.begin(16, 2);    // set up the LCD's number of columns and rows:
  for(int i = 0; i < numReadings; i++){ //this loops runs through the IR array once to set a init value to compare against a finger
      irtotal = irtotal - irReadings[i]; //removes current value from total 
      irReadings[i] = readAbsorbance("IR"); //sets current reading in array
      irtotal = irtotal + irReadings[i]; //adds current value to total
  }
    irinit = irtotal / numReadings; // sets init value to compare against
    lcd.print("init, sucessful!");  // Print a message to the LCD.
    lcd.setCursor(0, 1);   //readies LCD for next message
    lcd.print("IR init ="); // Print a message to the LCD.
    lcd.setCursor(10, 1);//readies LCD for next message
    lcd.print(irinit);// Print a message to the LCD.
    delay(1000); //lets user read init message
    lcd.setCursor(0, 0);//readies LCD for next message
    lcd.print("                "); //clears LCD
    lcd.setCursor(0, 1);//readies LCD for next message
    lcd.print("                ");//clears LCD    
}

void loop() {

  updatearrays(); //calls function
  
  if (iraverage < irinit-2){ //checks if the IR value has changed downward indicating finger presence 
    lcd.setCursor(0, 1); //readies LCD for next message
    lcd.print("Measuring    ");// Print a message to the LCD.
    setbpm();//calls function
    if (valid){ //checks if bpm calculated is valid
       lcd.setCursor(9, 1); //readies LCD for next message
       lcd.print("BPM:"); // Print a message to the LCD.
       lcd.setCursor(13, 1); //readies LCD for next message
       lcd.print(bpm); // Print a message to the LCD.
    } else{
       lcd.print("   "); //clears LCD 
    }
  } else {
    lcd.setCursor(0, 1); //readies LCD for next message
    lcd.print("Insert Finger   "); // Print a message to the LCD.
    bpm = 0; //resets bpm counter 
  }
  printstuff();//calls function
}


void updatearrays(){
  // subtract the last reading:  
  redtotal = redtotal - redReadings[Index];     
  irtotal = irtotal - irReadings[Index];
  
 // read from the sensor & Store absorbance voltage 
  redReadings[Index] = readAbsorbance("Red");
  irReadings[Index] = readAbsorbance("IR");
  
  // add the reading to the total:
  redtotal = redtotal + redReadings[Index];
  irtotal = irtotal + irReadings[Index];
  
  // advance to the next position in the array:
  Index = Index + 1;

  // if we're at the end of the array...
  if (Index >= numReadings) {
    // .,.wrap around to the beginning:
    Index = 0;
  }

  // calculate the average:
  redaverage = redtotal / numReadings;
  iraverage = irtotal / numReadings;
}

void setbpm(){
  currenttime = millis(); //get current time
  if (currenttime > (oldtime+range)){ //checks to see if a bpm calc was preformed in the given range
    //Serial.println("reset!"); //logs something to let me know it's working
    oldtime = currenttime; //resets range calc
    if (maxtime != mintime){ // makes sure that we got a accurate reading ( max = min very often and I couldn't debug why)
      vartime = maxtime - mintime; // gets the difference in time
      vartime = abs(vartime); //makes sure the diff is positive for... maths, ya know?
      bpm = (60000 /((vartime) * 2)); // bpm calc 60,000 is how many millis in a minute, 2 is because we only take max and min we need to double to get a full beat
      if(bpm > 30 && bpm < 180){ //makes sure what ever reading we get is human before we do anything with it
        valid = true; // sets true
      } else {
         valid = false; //sets false
      }
    }
    maxRed = 0; //reset max
    minRed = 1024; //reset min
  }
  if (redaverage > maxRed){ //checks if max red needs update
    maxRed = redaverage; //set max to average
    maxtime = currenttime; //sets time to current time
    //Serial.println("changed up"); //prints a thing so I know it works
  }
  if (redaverage < minRed){ //checks if max red needs update
    minRed = redaverage; //set max to average
    mintime = currenttime;//sets time to current time
    //Serial.println("changed down"); //prints a thing so I know it works
  }
}

void printstuff(){ //prints stuff so I know it works
  //print red reading
  Serial.print("Red: ");
  Serial.print(redaverage);

  //print IR reading
  Serial.print(",");
  Serial.print("IR: ");
  Serial.print(iraverage);

//  //print bpm reading
//  Serial.print(",");
//  Serial.print("BPM: ");
//  Serial.print(bpm);

//  //print min red reading
//  Serial.print(",");
//  Serial.print("minRed: ");
//  Serial.print(minRed);

//  //print min red reading
//  Serial.print(",");
//  Serial.print("maxRed: ");
//  Serial.print(maxRed);

//  //print var time reading
//  Serial.print("var: ");
//  Serial.print(vartime);
  Serial.println();//new line

  //prints to LCD
  lcd.setCursor(0, 0);//readies LCD for next message
  lcd.print("Red:"); // Print a message to the LCD.
  lcd.setCursor(4, 0);//readies LCD for next message
  lcd.print(redaverage); // Print a message to the LCD.
  lcd.setCursor(7, 0);//readies LCD for next message
  lcd.print("IR:"); // Print a message to the LCD.
  lcd.setCursor(10, 0);//readies LCD for next message
  lcd.print(iraverage);// Print a message to the LCD.

}


float readAbsorbance(String pin) //gets a pin reading 
{
  if (pin == "Red") //checks if reading is read
  {
    digitalWrite(LED_IR, LOW); //set led low
    digitalWrite(LED_RED, HIGH); //set red high
  }
  else
  {
    digitalWrite(LED_RED, LOW); // set red low
    digitalWrite(LED_IR, HIGH); //set ir high
  }

  delay(stabilityDelay); //delay to help noise

  return analogRead(detectorPin);//read reading and return it back
}
