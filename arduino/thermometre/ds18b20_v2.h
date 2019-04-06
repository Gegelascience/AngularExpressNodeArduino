#ifndef DS18B20_V2_H
#define DS18B20_V2_H

#include <OneWire.h>

class Ds18b20{
  private: 
  OneWire*ds;

  public:
  Ds18b20(int pin){ds=new OneWire(pin);}
  bool getTemperature(float *temperature, byte reset_search);
};
#endif
