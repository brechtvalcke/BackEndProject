let bcrypt = require('bcrypt-nodejs');
let md5 = require('md5');

module.exports = class CryptMethods {
    constructor() {

    }

    /** password functions
     *
     */

    /** hashPassword
     *
     * @param password
     * @returns {Promise}
     */
    static hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, null, null, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            });
        });
    }

    /** compare password
     *
     * @param password
     * @param hash
     * @returns {Promise}
     */
    static comparePassword(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function (error, result) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result)
                }
            });
        });
    }

    /** md5Decode
     *
     * @param param
     * @returns {Promise}
     */
    static md5Decode(param) {
        return new Promise((resolve, reject) => {
            Promise.resolve(md5(param))
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    /** randomNumber
     *
     * @param quantity
     * @returns {Promise}
     */
    static randomNumber(quantity) {
        return new Promise((resolve, reject) => {
            resolve(Math.round(Math.random() * (Math.pow(10, quantity))));
        });
    }


};
