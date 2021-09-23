const jsencrypt = require('node-jsencrypt');

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCo3cBUt9T1DA4ahjtBrs8RQfGsaL2iibv6y1KB7LhoRzih6x7x
7bbyoEMb7Uqe06+SBKNpEW7jNEAlRftV1DizT6z5EoaV/IwIqdJYGQvN0sXbtsIY
Go8qi8xJiNiN0xBKdUP2EAL3vO5sM6rq45SaApqJMukf6jL4m7z9c+37WwIDAQAB
AoGAXwuJEGXz6ATj/0vkGGEizSzXsNm3Or/ZXRyJkPVDCfZkSsaCwVqx6TgI7bQO
lvzAyifwLdgRGLK1FAWipDlxu5kEMUTH8zLPGT+KC8q7JMRJ6RQegGacmsaVyBiV
/wp6V2GgqFqhzI/nBm/uKQPRFcUNlzBlAFSwo1v4pTTo2TECQQDW07wyUnomSmOU
Zh4bgwLKvkMXC8N8DxL9sxj4SdT2e4LJY5keEeh/OQyZCq1N1UCdyWZnWGaygp5I
5AFMjnupAkEAyTr+iG4vCrqDdFOn/iN6VCatrEwtid/SPipMnvp6F4qu3h2aTryh
77KROeP2a9JP/S9FG3HZTceL3Wgt2uSBYwJBALcpfisVoSnmgPK1AnSIhifggoky
sXCj1ZhTTDXdlWK2OfOFJLa7pBRcyr3tmYdkDBy768CvYZhPv678H5NrZEkCQAld
b38V8aaEK538TrMrH4RPEIIWQYBLJFO0UECN06TI1X6MziOf78FiBBQ3ob4+2W4l
BwhR8hUGlmHFeWzYeZUCQQDTXKBlG2/nPfW6H83gRdlwU+iHtFYY2am/zuOX2s2h
6Tamiy+Fo4VgIafKvifaRwTESSdjIuIVjhAXDKhkq3Ea
-----END RSA PRIVATE KEY-----`

module.exports = (messageCrypted) => {
    try {
        if (messageCrypted) {
    let dataDecrypt = new jsencrypt();
    dataDecrypt.setPrivateKey(privateKey);
    let uncrypted = dataDecrypt.decrypt(messageCrypted);
    console.log(parseInt(uncrypted)+12);
    return uncrypted;
        } else {
            return;
        }
    } catch (error) {
        console.log(error);
    }
}