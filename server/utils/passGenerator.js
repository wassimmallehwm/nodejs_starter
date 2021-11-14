const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const generatePass = (
    length = 20,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) =>
    Array.from(crypto.randomFillSync(new Uint32Array(length)))
        .map((x) => wishlist[x % wishlist.length])
        .join('')


const generateAndHashPass = async (length) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(generatePass(length), salt);
    return hashedPassword;
}

module.exports = generateAndHashPass;