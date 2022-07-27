# voice-command-arduino

a website that uses pre-assigned voice commands to move a servo motor to an angel, all the voice commands are in arabic.
the servo motor can move to three directions: Right, Left and middle, right being at angel 0, Left at 180 and middle at 90.
the website also allows you to speak in sentences rather than just the command itself.

those are the key words that would trigger the servo motor:
1. يمين
2. يسار
3. منتصف

an exmaple of a sentences would be: اذهب الى اليمين

on the arduino side, the servo motor should be pinned to:
1. red to 5V
2. black-ish to Ground (GRD)
3. yellow-ish to *PIN 9*

upload the code to your arduino then make sure the cables are in place.

on the website, there are two buttons
1. Choose a COM port: this will pop up a window for you to choose the COM port for your arduino
2. Speak: press it to command the servo motor with the key words above.
