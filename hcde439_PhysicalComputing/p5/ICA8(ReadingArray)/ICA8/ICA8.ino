void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int s1 = analogRead(1);
  int s2 = analogRead(2);
  Serial.print("[");
  Serial.print(s1);
  Serial.print(",");
  Serial.print(s2);
  Serial.println("]");
}
