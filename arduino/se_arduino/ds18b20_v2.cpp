#include "ds18b20_v2.h"


bool Ds18b20::getTemperature(float *temperature, byte reset_search) {
  byte data[9], addr[8];
  // data[] : Données lues depuis le scratchpad
  // addr[] : Adresse du module 1-Wire détecté
  
  /* Reset le bus 1-Wire ci nécessaire (requis pour la lecture du premier capteur) */
  if (reset_search) {
    ds->reset_search();
  }
 
  /* Recherche le prochain capteur 1-Wire disponible */
  if (!ds->search(addr)) {
    // Pas de capteur
    return false;
  }
  
  /* Vérifie que l'adresse a été correctement reçue */
  if (OneWire::crc8(addr, 7) != addr[7]) {
    // Adresse invalide
    return false;
  }
 
  /* Vérifie qu'il s'agit bien d'un DS18B20 */
  if (addr[0] != 0x28) {
    // Mauvais type de capteur
    return false;
  }
 
  /* Reset le bus 1-Wire et sélectionne le capteur */
  ds->reset();
  ds->select(addr);
  
  /* Lance une prise de mesure de température et attend la fin de la mesure */
  ds->write(0x44, 1);
  delay(800);
  
  /* Reset le bus 1-Wire, sélectionne le capteur et envoie une demande de lecture du scratchpad */
  ds->reset();
  ds->select(addr);
  ds->write(0xBE);
 
 /* Lecture du scratchpad */
  for (byte i = 0; i < 9; i++) {
    data[i] = ds->read();
  }
   
  /* Calcul de la température en degré Celsius */
  *temperature = ((data[1] << 8) | data[0]) * 0.0625; 
  
  // Pas d'erreur
  return true;
}
