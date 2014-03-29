/**
 * StreamController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to StreamController)
   */
  _config: {},

  create: function(req, res) {

    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    var OpenTok = require('opentok');
    var opentok;

    opentok = new OpenTok.OpenTokSDK(sails.config.opentok.api_key, sails.config.opentok.api_secret);

    try {
      //Création de la session opentok
      opentok.createSession(function(err, sessionId) {
        if (err) return res.send(err, 500);

        params.sessionid = sessionId;
        console.log("Création session : " + params.sessionid);
        Stream.create(params, function streamCreated(err, str) {
          if (err) return res.send(err, 500);
          res.end(JSON.stringify(str));
        });
      });
    } catch (err) {
      return res.send({
        "error": "opentok createSession"
      }, 500);
    }
  },

  publisherToken: function(req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    if (!params.sessionid) {
      return res.send({
        "error": "missing sessionId"
      }, 500);
    }
    var sessionId = params.sessionid;
    var OpenTok = require('opentok');
    opentok = new OpenTok.OpenTokSDK(sails.config.opentok.api_key, sails.config.opentok.api_secret);

    //Création du token opentok publisher
    var token;
    try {
      token = opentok.generateToken({
        session_id: sessionId,
        role: OpenTok.RoleConstants.PUBLISHER
      });
    } catch (err) {
      return res.send({
        "error": "opentok generateToken"
      }, 500);
    }

    if (!token) {
      return res.send({
        "error": "invalid token"
      }, 500);
    }

    var result = {};
    result.token = token;
    res.end(JSON.stringify(result));
  },

  subscriberToken: function(req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    if (!params.sessionid) {
      return res.send({
        "error": "missing sessionId"
      }, 500);
    }
    var sessionId = params.sessionid;
    var OpenTok = require('opentok');
    opentok = new OpenTok.OpenTokSDK(sails.config.opentok.api_key, sails.config.opentok.api_secret);

    //Création du token opentok subscriber
    var token;
    try {
      token = opentok.generateToken({
        session_id: sessionId,
        role: OpenTok.RoleConstants.PUBLISHER
      });
    } catch (err) {
      return res.send({
        "error": "opentok generateToken"
      }, 500);
    }

    if (!token) {
      return res.send({
        "error": "invalid token"
      }, 500);
    }

    var result = {};
    result.token = token;
    res.end(JSON.stringify(result));
  }
};
