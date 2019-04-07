#include "ds18b20_v2.h"

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

/* Broche du bus 1-Wire alim 5v */
const byte BROCHE_ONEWIRE = 7;

/*broche neopixel alim 5v*/
#define PIN            6

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS      21

Ds18b20 sensor(BROCHE_ONEWIRE);


Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

int delayval = 500; // delay for half a second

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.setTimeout(500);
  pinMode(LED_BUILTIN, OUTPUT);
  #if defined (__AVR_ATtiny85__)
    if (F_CPU == 16000000) clock_prescale_set(clock_div_1);
  #endif
  }

void loop() {
  // put your main code here, to run repeatedly:

  while (Serial.available()) {
     String commande = Serial.readStringUntil('\n');
     Serial.println("commande: " + commande);
     action(commande);
     
  }

}

void action(String commande) {
  if( commande == "led on"){
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.println("done on");
  }else if(commande == "led off"){
    digitalWrite(LED_BUILTIN, LOW);
    Serial.println("done off");
  } else if(commande == "red"){
    int colors[3];
    colors[0] = 150;
    colors[1] = 0;
    colors[2] = 0;
    setRGB(pixels, NUMPIXELS, delayval, colors);
    Serial.println("done red");
  }else if(commande == "green"){
    int colors[3];
    colors[0] = 0;
    colors[1] = 150;
    colors[2] = 0;
    setRGB(pixels, NUMPIXELS, delayval, colors);
    Serial.println("done green");
  }else if(commande == "blue"){
    int colors[3];
    colors[0] = 0;
    colors[1] = 0;
    colors[2] = 150;
    setRGB(pixels, NUMPIXELS, delayval, colors);
    Serial.println("done blue");
  }else if(commande == "white"){
    int colors[3];
    colors[0] = 150;
    colors[1] = 150;
    colors[2] = 150;
    setRGB(pixels, NUMPIXELS, delayval, colors);
    Serial.println("done white");
  }else if(commande == "temperature"){
    float temperatureSensor;
    /* Lit la température ambiante à ~1Hz */
    if (sensor.getTemperature(&temperatureSensor, true) != true) {
    return;
    }
    /* Affiche la température DS18B20 */
    Serial.println(String(temperatureSensor));
  }else {
    Serial.println("error");
  }
}

void setRGB(Adafruit_NeoPixel pixels, int nbrPixels, int delayTime, int colors[]){
  // For a set of NeoPixels the first NeoPixel is 0, second is 1, all the way up to the count of pixels minus one.
  pixels.begin(); // This initializes the NeoPixel library.
  
  for(int i=0;i<nbrPixels;i++){
    pixels.setPixelColor(i, pixels.Color(colors[0],colors[1],colors[2])); // Moderately bright blue color.
    // delay(delayTime); // Delay for a period of time (in milliseconds).

  }
  pixels.show(); // This sends the updated pixel color to the hardware.
}
