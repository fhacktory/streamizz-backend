/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

        nickname: {
            type: 'string',
            required: true
        },
        firstname: {
            type: 'string'
        },
        lastname: {
            type: 'string',
        },
        email: {
            type: 'string',
            email: true,
            required: true,
            unique: true
        },
        picture: 'string'

  }

};
