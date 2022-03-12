
 

int sensorPin = A0;
int REDLed = 4;
int IRLed = 3;
int var;



void setup() {
   Serial.begin(9600);
//   Serial.flush();
   pinMode(sensorPin,INPUT);
   pinMode(REDLed,OUTPUT);
   pinMode(IRLed,OUTPUT);

   // turn off leds
   digitalWrite(REDLed,LOW);
   digitalWrite(IRLed,LOW);




}

void loop ()
{
  var = analogRead(sensorPin);
  Serial.print("A0 reading: ");
  Serial.println(var); 
}
