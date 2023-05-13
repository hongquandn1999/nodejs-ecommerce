'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { Roles } = require('../constants/roles');
const { getInfoData } = require('../utils');

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // Step 1: check email exist

      const holderShop = await shopModel.findOne({ email }).lean();

      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already registered',
        };
      }

      const passwordHashed = await bcrypt.hash(password, 10);

      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHashed,
        roles: [Roles.SHOP],
      });

      if (newShop) {
        // Created private key, public key
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEnCoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        });
        // Public key CryptoGraphy Standards
        console.log({ privateKey, publicKey }); // Save collection KeyStone

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });

        if (!publicKeyString) {
          return {
            code: 'xxxx',
            message: 'publicKeyString registered',
          };
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString);

        console.log(`PublicKeyObject::`, publicKeyObject);

        // create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKeyString,
          privateKey
        );

        console.log(`Create token success::`, tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ['_id', 'name', 'email'],
              object: newShop,
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      };
    }
  };
}

module.exports = AccessService;
