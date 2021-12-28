#Linux Headphones profile fix

To fix connect and change profile HSP/HFP

Add to ```/etc/pulse/default.pa``` to automatically switch pulseaudio sink to Bluez:
```properties
.ifexists module-bluetooth-discover.so
load-module module-bluetooth-discover
load-module module-switch-on-connect  # Add this
.endif
```
Modify/Create ```/etc/bluetooth/audio.conf``` to auto select A2DP profile (instead of HSP/HFP):
```properties
[General]
Disable=Headset # Add this
```
Apply changes Restarts pulseaudio:
```shell
pulseaudio -k
```
```!!! You may need to turn your bluetooth headphones off, then back on !!!```