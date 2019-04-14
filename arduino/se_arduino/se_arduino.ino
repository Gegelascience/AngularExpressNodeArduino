#include "ds18b20_v2.h"

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

#include <avr/wdt.h>
#include <ArduinoJson.h>

/* Broche du bus 1-Wire alim 5v */
const byte BROCHE_ONEWIRE = 7;

/*broche neopixel alim 5v*/
#define PIN            6

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS      21

Ds18b20 sensor(BROCHE_ONEWIRE);


Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

int delayval = 50; // delay for writting on leds
int timeBeforeReset = 1;

// JSON doc
DynamicJsonDocument doc(1024);

/* Alim 5v ultrason*/
/* Constantes pour les broches */
const byte TRIGGER_PIN = 2; // Broche TRIGGER
const byte ECHO_PIN = 3;    // Broche ECHO

/* Constantes pour le timeout */
const unsigned long MEASURE_TIMEOUT = 25000UL; // 25ms = ~8m à 340m/s

/* Vitesse du son dans l'air en mm/us */
const float SOUND_SPEED = 340.0 / 1000;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  #if defined (__AVR_ATtiny85__)
    if (F_CPU == 16000000) clock_prescale_set(clock_div_1);
  #endif
  pinMode(TRIGGER_PIN, OUTPUT);
  digitalWrite(TRIGGER_PIN, LOW); // La broche TRIGGER doit être à LOW au repos
  pinMode(ECHO_PIN, INPUT);

  }

void loop() {
  // put your main code here, to run repeatedly:
  while (Serial.available()) {
    
     String commande = Serial.readStringUntil('\n');
     deserializeJson(doc, commande);
     JsonObject obj = doc.as<JsonObject>();
     action(obj);
     
  }

}

void action(JsonObject obj) {
  String output;
  if( obj["commande"].as<String>() == "led on"){
    digitalWrite(LED_BUILTIN, HIGH);
    obj["result"] = "done on";
  }else if(obj["commande"].as<String>() == "led off"){
    digitalWrite(LED_BUILTIN, LOW);
    obj["result"] = "done off";
  } else if(obj["commande"].as<String>() == "red"){
    int colors[3];
    colors[0] = 150;
    colors[1] = 0;
    colors[2] = 0;
    setRGB(pixels, NUMPIXELS, delayval, colors);
    obj["result"] = "done red";
  }else if(obj["commande"].as<String>() == "green"){
    int colors[3];
    colors[0] = 0;
    colors[1] = 150;
    colors[2] = 0;
    setRGB(pixels, NUMPIXELS, delayval, colors);
    obj["result"] = "done green";
  }else if(obj["commande"].as<String>() == "blue"){
    int colors[3];
    colors[0] = 0;
    colors[1] = 0;
    colors[2] = 150;
    setRGB(pixels, NUMPIXELS, delayval, colors);
    obj["result"] = "done blue";
  }else if(obj["commande"].as<String>() == "white"){
    int colors[3];
    colors[0] = 150;
    colors[1] = 150;
    colors[2] = 150;
    setRGB(pixels, NUMPIXELS, delayval, colors);
    obj["result"] = "done white";
  }else if(obj["commande"].as<String>() == "temperature"){
    float temperatureSensor;
    /* Lit la température ambiante à ~1Hz */
    if (sensor.getTemperature(&temperatureSensor, true) != true) {
    return;
    }
    /* Affiche la température DS18B20 */
    obj["result"] = String(temperatureSensor);
  }else if(obj["commande"].as<String>() == "distance"){
    digitalWrite(TRIGGER_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGGER_PIN, LOW);
    long measure = pulseIn(ECHO_PIN, HIGH, MEASURE_TIMEOUT);
    float distance_mm = measure / 2.0 * SOUND_SPEED;
    obj["result"] = String(distance_mm);
  }else {
    obj["result"] = "error";
  }
  serializeJson(doc, output);
  Serial.println(output);
  if(timeBeforeReset == 0){
    software_Reboot();
  }
}

void setRGB(Adafruit_NeoPixel pixels, int nbrPixels, int delayTime, int colors[]){
  // For a set of NeoPixels the first NeoPixel is 0, second is 1, all the way up to the count of pixels minus one.
  pixels.begin(); // This initializes the NeoPixel library.
  
  for(int i=0;i<nbrPixels;i++){
    pixels.setPixelColor(i, pixels.Color(colors[0],colors[1],colors[2])); // Moderately bright blue color.
  }
  pixels.show(); // This sends the updated pixel color to the hardware.
  timeBeforeReset--;
  
}

void software_Reboot()
{
  wdt_enable(WDTO_60MS);

  while(1)
  {

  }
}
