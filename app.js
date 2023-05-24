
//het importeren van ...
import express from "express"
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import dotenv from 'dotenv';

const app = express();


//.env (wachtwoord)
//door config worden de bestand van dotenv gelezen
dotenv.config();
//Hij laadt de veriabelen en kunnen toegang krijgen via process.env hier uit komt de mangodb uri
mongoose.connect(process.env.MONGODB_URI, {
//nmp run start en zie je een bericht
}).then(() => {
  console.log('Verbonden met MongoDB');
}).catch((error) => {
  console.error('Fout bij verbinden met MongoDB:', error);
});




//mongoose//
const Schema = mongoose.Schema;

const userSchema = new Schema({


Category: { type: String, required: true },

Shop: { type: String, required: true },

Place: { type: String, required: true },

Image: { type: String, required: true },

});

const Shop = mongoose.model('Shop', userSchema);












app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');






app.use(express.static('static'))

app.get('/', function (req, res) {
    res.send('Hallo wereld Mila!!!!!! :) <3')
  })
  
  
  app.get('/swipe', function (req, res) {
    res.send('swipe je kleding')
  })
  
  app.get('/account', function (req, res) {
    res.send('dit is jouw account')
  })
  

  app.get('/likes', function (req, res) {
    res.send('jouw gelikte items')
  })

// als je een functie hebt en je wil await gebruiken moet ervoor async staan (anders doet die het niet)
// we zoeken een shop die de cato kawaii heeft
app.get('/home', async (req, res) => {
    const shop = await Shop.findOne({Category:"Kawaii"})
    res.render('home',shop
    );
});



app.use(express.static('public'));


app.get('/gekozen', (req, res) => {
  res.render('gekozen');
});

  app.get('*', function(req, res){
    res.status(404).send('error, what???');
  });
  
 

app.listen(3000);






