
import Timer from "timer";
import PWM from "pins/pwm";

const led = new PWM({ pin: 15 });

while (true) {
  for (let i = 0; i < 1023; i++) {
    led.write(i);
    Timer.delay(5);
  }

  Timer.delay(1000);

  for (let i = 1023; i >= 0; i--) {
    led.write(i);
    Timer.delay(5);
  }

  Timer.delay(1000);
}

