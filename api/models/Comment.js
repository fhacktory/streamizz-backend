/**
 * Comment
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {


  attributes: {

    userid: {
      type: 'string',
      required: true

    },
    streamid: {
      type: 'string',
      required: true
    },
    message: {
      type: 'string',
      required: true
    }
  }

};
