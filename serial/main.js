import Timer from "timer";
import Serial from "pins/serial";

const serial = new Serial({ baudrate: 115200, rx: 25, tx: 26 });

function chunkByLines(response, delimiters = [13, 10]) {
  if (typeof response === `undefined`) {
    return [];
  }

  const chunks = [];
  let chunk = [];
  for (let i = 0; i < response.length; i++) {
    let item = response[i];
    const [CR, LF] = delimiters;
    if (item === CR || item === LF) {
      chunks.push(chunk);
      chunk = [];
    } else {
      chunk.push(item);
    }
  }

  return chunks.filter((chunk) => chunk.length > 0);
}

function chunkstoArrayOfStrings(chunks) {
  return chunks.map((chunk) => String.fromCharCode.apply(String, chunk));
}

function parseResponse(res) {
  const bytesChunks = chunkByLines(res);
  const arrayOfStrings = chunkstoArrayOfStrings(bytesChunks);

  // const [command, response, errorStatus] = arrayOfStrings;
  // return {
  //   command,
  //   response,
  //   errorStatus,
  // };

  return arrayOfStrings;
}

Timer.repeat(() => {
  serial.write("AT+CGMI\r");
  Timer.delay(10);

  let ret = serial.read(40);
  const parsed = parseResponse(ret);

  trace(parsed);
  trace("\n");
}, 2000);
