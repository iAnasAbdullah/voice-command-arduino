
#include <Servo.h>;
Servo servo;
String result;
  void setup() {
    Serial.begin(9600);
    servo.attach(9);
  }
  
  void loop() {
    while (Serial.available() > 0){
      result = Serial.readString();

      Serial.print("received : ");
      Serial.println(result);

      if (result.equals("R")){
        servo.write(0);
        delay(100);
      }
      if (result.equals("L")){
        servo.write(180);
        delay(100);
      }
      if (result.equals("M")){
        servo.write(90);
        delay(100);
      }
    }
  
  }
