const express = require('express');
const app = express();
const moment = require('moment');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const helmet = require('helmet');
dotenv.config();

const PORT = 8080;

app.use(helmet({ contentSecurityPolicy: false }));
app.use('/static', express.static(path.resolve(__dirname, '..', 'frontend', 'build', 'static')));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use('/public', express.static(path.resolve(__dirname, '..', 'frontend', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SALT));

const whitelist = ['http://localhost:8080/']
const corsOption = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log(origin);
      callback(null, true)
    }else {
      callback(`not allowed ${ origin }`)
    }
  }
}
process.env.MODE === 'development' && app.use(cors(corsOption));

app.use((req, res, next) => {
  if(process.env.MODE === 'development'){
    console.log('PATH: ', req.path);
    console.log('TIME: ', moment().format());
  }

  res.now = () => (moment().format());
  res.afterYear = () => {
    const year = moment.duration(1, 'year');
    return moment().add(year).format();
  }
  res.fromNow = (time) => {
    const sub = moment() - moment(time);
    return sub;
  }
  res.finish = (result, data) => res.send({ result, data });
  res.db = require('./db');
  res.db.prototype.finish = res.finish;
  next();
});


app.get('/*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
});
app.use('/', require('./routes/router'));


app.listen(PORT, () => {
  console.log(`listening on ${ PORT }`);
});