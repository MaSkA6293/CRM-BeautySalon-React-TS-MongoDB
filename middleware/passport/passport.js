const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const config = require("config");
const User = require("../../models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTSECRET || config.get("jwtSecret");
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await User.findOne({ _id: payload.userId });
        if (user) {
          done(undefined, user);
        } else {
          done(undefined, false);
        }
      } catch (error) {
        done(error, false);
      }
    })
  );
};
