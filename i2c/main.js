
import Timer from "timer";
import SI7060 from "./si7060";

const sensor = new SI7060(0x31);

Timer.repeat(() => {
  const temp = sensor.readTemperature();
  trace(`Current temperature: ${temp} celcius\n`);
}, 1000);
