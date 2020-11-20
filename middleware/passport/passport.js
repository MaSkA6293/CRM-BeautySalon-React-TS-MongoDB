const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("config");
const User = require("../../models/User");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTSECRET || config.get("jwtSecret");
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await User.findOne({ _id: payload.userId });
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        done(e, false)
      }
    })
  );
};
