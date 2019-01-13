import Timer from "timer";
import Digital from "pins/digital";

let count = 0;
Timer.repeat(() => {
  trace(`repeat ${++count}\n`);

  Digital.write(15, ~count & 1);
}, 500);
