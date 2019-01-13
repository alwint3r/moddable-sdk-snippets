
import I2C from "pins/i2c";

export default class SI7060 {
  constructor(address) {
    this.i2c = new I2C({ address });
  }

  prepare() {
    this._writeValue(0xC4, 0x04);
    this._writeValue(0xC6, 0x4E);
    this._writeValue(0xC7, 0x1C);
  }

  readTemperature() {
    this.prepare();
    const dspSigm = (this._readValue(0xC1) & 0x7F);
    const dspSigl = this._readValue(0xC2);
    const temp = 55 + (parseFloat(256.0*dspSigm)+parseFloat(dspSigl-16384.0))/160.0;

    return temp;
  }

  _readValue(registerAddr) {
    this.i2c.write(registerAddr);
    return this.i2c.read(1);
  }

  _writeValue(registerAddr, data) {
    this.i2c.write(registerAddr, data);
  }
}
