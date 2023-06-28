// Het importeren van modules en pakketten
import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

// Verbinding maken met de MongoDB-database met behulp van de MONGODB_URI (env.)
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Verbonden met MongoDB");
  })
  .catch((error) => {
    console.error("Fout bij verbinden met MongoDB:", error);
  });

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Category: { type: String, required: true },
  shop: { type: String, required: true },
  Aantal: { type: String, required: true },
  favorite: { type: Boolean },
});

const Shop = mongoose.model("Shop", userSchema);

const itemSchema = new Schema({
  category: { type: String, required: true },
  favorite: { type: Boolean, default: false },
});

const Item = mongoose.model("Item", itemSchema);

app.patch("/shops/:itemId/favorite", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const updatedShop = await Shop.findByIdAndUpdate(itemId, {
      favorite: true,
    });
    console.log("Shop succesvol bijgewerkt:", updatedShop);
    res.sendStatus(200);
  } catch (error) {
    console.error("Fout bij het bijwerken van de shop:", error);
    res.sendStatus(500);
  }
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Statische bestanden (bijv. CSS) worden geserveerd vanuit de "public" map
app.use(express.static("public"));

// Definitie van verschillende routes
app.get("/", (req, res) => {
  res.send("Hallo wereld Mila!!!!!! :) <3");
});

// Data route voor het ophalen van winkelgegevens op basis van categorie en aantal
app.get("/data", async (req, res) => {
  let categoryQuery = {};
  let AantalQuery = {};

  if (req.query.kawaii) {
    categoryQuery = { Category: "Kawaii" };
  }

  if (req.query.vintage) {
    AantalQuery = { Category: "Vintage" };
  }

  if (req.query.streetwear) {
    AantalQuery = { ...AantalQuery, Category: "Streetwear" };
  }

  const shop = await Shop.findOne(categoryQuery).findOne(AantalQuery);
  res.render("data", shop);
});

// Home route
app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/gekozen", (req, res) => {
  res.render("gekozen");
});

app.get("*", (req, res) => {
  res.status(404).render("notfound");
});

// De server luistert op poort 3000
app.listen(3000);
