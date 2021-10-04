const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const ItemRoute = require('./src/routes/route.item');
const SiteRoute = require('./src/routes/route.site');
const OrderRoute = require('./src/routes/route.order');
const SupplierRoute = require('./src/routes/route.supplier');

dotenv.config();
const app = express();
app.use(cors());


//

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8081;

/**
 * Get MONGODB_URI from .env
 */

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error) => {

    if (error) {
        console.log('Database Error:', error.message);
        console.log('######################################################');
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Connected...');
    initial();
    console.log('######################################################');
});

app.route('/').get((req, res) => {
    res.send('CSSE Group Project');
});


require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);


app.use('/item', ItemRoute());
app.use('/site', SiteRoute());
app.use('/order', OrderRoute());
app.use('/supplier', SupplierRoute());

app.listen(PORT, () => {
    console.log('######################################################');
    console.log(`Server is ON and running on PORT : ${PORT}`);
    console.log('...Wait DB connecting...');
});

const db = require("./src/modules");
const Role = db.role;


  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
         console.log('######################################################');
        });
      }
    });
  }