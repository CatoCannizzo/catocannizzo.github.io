import serial
portName = 'COM3'

ser = serial.Serial(portName, 9600)

f = open('log.csv', 'w')

while True:
  f.write(str(ser.readline()))
  f.close()
  f = open('log.csv', 'a')
