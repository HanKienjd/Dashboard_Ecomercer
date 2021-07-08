/* eslint-disable no-shadow */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-buffer-constructor */
/* eslint-disable no-var */
/* eslint-disable func-names */
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const _ = require('lodash');

export const encryptStringWithRsaPublicKey = function (toEncrypt, relativeOrAbsolutePathToPublicKey) {
  var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
  var publicKey = fs.readFileSync(absolutePath, "utf8");
  var buffer = new Buffer(toEncrypt);
  var encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
};

export const decryptStringWithRsaPrivateKey = function (toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
  var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
  var privateKey = fs.readFileSync(absolutePath, "utf8");
  var buffer = new Buffer(toDecrypt, "base64");
  var decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString("utf8");
};

var iterations = 1000;
var bytes = 24;
// 1000:qcMqVYE0EzAU9Uz+mQxBaKFICG1vR1iq:RkdpgAcpijFqYgVxBCvJugMXqnt4j5f3

export const createSalt = () => {
  return new Buffer(crypto.randomBytes(bytes)).toString('base64');
}

export const hash = (text, salt) => new Promise((resolve, reject) =>{
  crypto.pbkdf2(text, salt, iterations, bytes, 'sha1', function (err, derivedKey) {
    if (err) { reject(err) }
    else {
      // C# return Pbkdf2Iterations + ":" + Convert.ToBase64String(salt) + ":" + Convert.ToBase64String(hash);
      var hash = new Buffer(derivedKey).toString('base64');
      var pass = `${iterations}:${salt}:${hash}`
      resolve(pass);
    }
  });
})

export const verifyPassword = (passWord, goodHash) => new Promise((resolve) => {
  if (!goodHash || goodHash === '' || !passWord || passWord === ''){
    // console.log('false')
    resolve(false)
  }
  var delimiter = ':'
  var split = goodHash.split(delimiter)
  var salt = new Buffer(split[1], 'base64')
  var hashPass = split[2]
  var testHash = crypto.pbkdf2Sync(passWord, salt, iterations, bytes, 'sha1').toString('base64')
  if (hashPass.length != testHash.length){ 
    // console.log('iterations: %o | hashPass: %s | hashPass.length: %o | testHash.length: %o => false', iterations, hashPass, hashPass.length, testHash.length)
    resolve(false)
  }
  var isOk = _.difference(hashPass, testHash)
  // console.log(isOk)
  resolve(isOk.length === 0)
})

export const encryptedString = (data, passWord) => {
  const cipher = crypto.createCipher('aes192', passWord)
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  // console.log("encrypted with pass %s: %s", passWord, encrypted) 
  return encrypted
}

export const decryptedString = (data, passWord) => {
  const decipher = crypto.createDecipher('aes192', passWord)
  let decrypted = decipher.update(data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  // console.log("decrypted with pass %s: %s", passWord, decrypted) 
  return decrypted
}