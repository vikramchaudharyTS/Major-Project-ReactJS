const admin = require('firebase-admin');
const serviceAccount = require('./fir-react-learning-b6271-firebase-adminsdk-siu4o-ed331f752a.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
