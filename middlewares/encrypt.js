const jsencrypt = require('node-jsencrypt');

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCo3cBUt9T1DA4ahjtBrs8RQfGs
aL2iibv6y1KB7LhoRzih6x7x7bbyoEMb7Uqe06+SBKNpEW7jNEAlRftV1DizT6z5
EoaV/IwIqdJYGQvN0sXbtsIYGo8qi8xJiNiN0xBKdUP2EAL3vO5sM6rq45SaApqJ
Mukf6jL4m7z9c+37WwIDAQAB
-----END PUBLIC KEY-----`


module.exports = (message) => {
    let dataEncrypt = new jsencrypt();
    dataEncrypt.setPublicKey(publicKey);
    let dataEncrypted = dataEncrypt.encrypt(message.toString());
    console.log(dataEncrypted)
    return dataEncrypted
}