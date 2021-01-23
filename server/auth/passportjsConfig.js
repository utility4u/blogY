const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const path = require('path');
const fs = require('fs');

const { getUserByIdQuery } = require('../database/queries/queries.js');
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUBLIC_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY,
  algorithms: ['RS256']
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        console.log('JWT payload', jwt_payload);

        getUserByIdQuery(jwt_payload)
          .then(([user]) => {
              console.log('resultJWT authentication', user);
              return done(null, user || false);
          })
          .catch((err) => {
              return done(err, false);
          })
    }));
}