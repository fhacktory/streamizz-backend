/**
 * EventController
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
   * (specific to EventController)
   */
  _config: {},

  create: function(req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    Event.create(params, function eventCreated(err, createdEvent) {

      if (err) return res.send(err, 500);

      res.end(JSON.stringify(createdEvent));
    });
  },

  getStreams: function(req, res) {
    console.log("toto");
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    if (!params.eventid) {
      return res.send({
        "error": "missing eventid"
      }, 500);
    }

    Stream.find()
      .where({
        eventid: params.eventid
      })
      .exec(function(err, streams) {
        if (err) return res.send(err, 500);

        res.end(JSON.stringify(streams));
      });
  },


  getFromHashtag: function(req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    if (!params.hashtag) {
      return res.send({
        "error": "missing hashtag"
      }, 500);
    }

    Event.find()
      .exec(function(err, events) {
        if (err) return res.send(err, 500);
        var result = [];

        Hashtag.find()
          .where({
            message: params.hashtag
          }).exec(function(err2, hashtags) {


            for (var l = 0; l < events.length; l++) {

              for (var i = 0; i < hashtags.length; i++) {

                if (events[l].id == hashtags[i].eventid && hashtags[i].message == params.hashtag) {
                  result.push(events[l]);
                }

              }
            }
            res.end(JSON.stringify(result));

          });

      });

  },



  find: function(req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    if (params.id) {
      Event.find()
        .where({
          id: params.id
        })
        .exec(function(err, events) {
          if (err) return res.send(err, 500);
          Hashtag.find()
            .where({
              eventid: params.id
            })
            .exec(function(err2, hashtags) {
              if (err2) return res.send(err2, 500);
              events[0].hashtags = hashtags;
              console.log(events);
              res.end(JSON.stringify(events));
            });
        });
    } else {


      Event.find()
        .exec(function(err, events) {
          if (err) return res.send(err, 500);

          Hashtag.find().exec(function(err2, hashtags) {

            for (var k = 0; k < events.length; k++) {
              events[k].hashtags = [];
            }

            for (var l = 0; l < events.length; l++) {

              for (var i = 0; i < hashtags.length; i++) {

                if (events[l].id == hashtags[i].eventid) {
                  events[l].hashtags.push(hashtags[i]);
                }

              }
            }
            res.end(JSON.stringify(events));

          });

        });
    }

  }
};
