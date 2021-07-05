// Paquetes importantes

const express = require('express');
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");


// Templates 

const publicPath = path.join(__dirname, "./public");
app.use(express.static(publicPath));
const viewDir = path.join(__dirname, "./templates/views");
const partialsDir = path.join(__dirname, "./templates/partials");


// Puerto

const port = process.env.PORT || 3000;


// Configuracion de Handlebars

app.set("view engine", "hbs");
app.set("views", viewDir);
hbs.registerPartials(partialsDir);

const contactRoute = require('./routes/contact');


// Middlewares

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


// Ruta de contacto

app.use(contactRoute);


// SDK de Mercado Pago

const mercadopago = require('mercadopago');


// Agrega credenciales

mercadopago.configure({
  access_token: 'TEST-2054711726781231-062103-dc729b32f35a8c6e81e203c9e3f4fc81-241117739'
});

// Crea un objeto de preferencia

let preference = {
  items: [
    {
      title: 'Participar del sorteo',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
  .then(function (response) {
    // Este valor reemplazará el string "<%= global.id %>" en tu HTML
    global.id = response.body.id;
  }).catch(function (error) {
    console.log(error);
  });

// Rutas

app.get('', (req, res) => {
  res.render("index", {});
});

app.get('/terminos', (req, res) => {
  res.render("terminos", {});
});

app.get('/devolucion', (req, res) => {
  res.render("devolucion", {});
});


app.listen(port, () => {
  console.log("El servidor se ha iniciado correctamente");
});