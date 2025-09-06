const crypto = require("crypto");
const CHAT_ENCRYPTION_KEY = process.env.CHAT_ENCRYPTION_KEY;
const IV_LENGTH = 16;

function encrypt(text) {
    try {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(CHAT_ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString("hex") + ":" + encrypted.toString("hex");
    } catch (err) {
        console.error(" Encryption failed:", err.message);
        throw err;
    }
}

function decrypt(text) {
    let parts = text.split(":");
    let iv = Buffer.from(parts.shift(), "hex");
    let encryptedText = Buffer.from(parts.join(":"), "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(CHAT_ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = { encrypt, decrypt };
