#include "ds18b20_v2.h"

/* Broche du bus 1-Wire alim 5v */
const byte BROCHE_ONEWIRE = 7;

Ds18b20 sensor(BROCHE_ONEWIRE);

void action(String commande) {
  if( commande == "led on"){
    digitalWrite(LED_BUILTIN, HIGH);
  }else if(commande == "led off"){
    digitalWrite(LED_BUILTIN, LOW);
  }else{
    float temperatureSensor;
    /* Lit la température ambiante à ~1Hz */
    if (sensor.getTemperature(&temperatureSensor, true) != true) {
    return;
    }
    /* Affiche la température DS18B20 */
    Serial.println(String(temperatureSensor));
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  
  while (Serial.available()) {
     String commande = (String)Serial.readString();
     action(commande);
  }

}
