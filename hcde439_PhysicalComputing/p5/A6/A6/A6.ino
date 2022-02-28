//following blocks initializes LED position to pins
int topLeft = 2; 
int topRight = 4;
int botLeft = 5;
int botRight = 3;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);//starts serial and baud rate
  //following block of code initializes LED pins as outputs
  pinMode(topLeft, OUTPUT);
  pinMode(topRight, OUTPUT);
  pinMode(botLeft, OUTPUT);
  pinMode(botRight, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  //following block of code initializes analog readings for the joystick
  int s1 = analogRead(1);
  int s2 = analogRead(2);
  //following code formats analog readings and sends them into the serial for communication
  Serial.print("[");
  Serial.print(s1);
  Serial.print(",");
  Serial.print(s2);
  Serial.println("]");

  if(Serial.available()){//waits until serial sends a signal back
    int input = Serial.read(); // stores signal in a variable
    Serial.println(input);//prints signal to help with debugging
    //following block turns off all LEDs
      digitalWrite(topLeft,LOW);
      digitalWrite(topRight,LOW);
      digitalWrite(botLeft,LOW);
      digitalWrite(botRight,LOW);
     
    if(input == 49){ //if signal read is 49
      digitalWrite(topLeft,HIGH); //turn on topleft LED
    }
    if(input == 50){//if signal read if 50
      digitalWrite(topRight,HIGH);//turn on topright LED
    }
    if(input == 51){//if signal read is 49
      digitalWrite(botLeft,HIGH);//turn on botleft LED
    }
    if(input == 52){//if signal read is 49
      digitalWrite(botRight,HIGH);//turn on botright LED
    }
    delay(10); //small delay for persistance of vision
  }
}
