// const {expressjwt: jwt} = require("express-jwt")
// const jwks = require('jwks-rsa');
const jwt = require("jsonwebtoken");
require('dotenv')

// const jwtCheck = jwt({
//     secret: jwks.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: 'https://dev-d5sr0lqr.us.auth0.com/.well-known/jwks.json'
//   }),
//   audience: 'prueba',
//   issuer: 'https://dev-d5sr0lqr.us.auth0.com/',
//   algorithms: ['RS256']
// })


const jwtCheck = (req, res, next) => {
  const accessToken = req.headers.authorization || req.query.accestoken; // Bearer token
  if(!accessToken) res.send("Access denied");
  // const token = accessToken.headers.authorization.split(" ")[1]
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if(err){
      res.send("Access denied or token expired")
    }else{
      next()
    }
  })
}

module.exports = jwtCheck;
