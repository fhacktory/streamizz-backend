/**
 * HashtagController
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
   * (specific to HashtagController)
   */
  _config: {},

  create: function(req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    Hashtag.create(params, function hashTagCreated(err, createdHashtag) {
      if (err) return res.send(JSON.stringify(err), 500);
      res.end(JSON.stringify(createdHashtag));
    });
  }



};
