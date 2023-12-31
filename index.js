const express = require("express");
const app = express();
const db = require("./queries");
const port = 5000;

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ info: "Welcome to the Africar API" });
});

// Cars
app.get("/cars", db.getCars);

app.get("/cars/:id", db.getCarById);

app.post("/cars", db.addCar);

app.put("/cars/:id", db.updateCar);

app.delete("/cars/:id", db.deleteCar);

// Makes
app.get("/makes", db.getMakes);

// app.get("/makes/:id",db.getMakeById);

app.post("/makes", db.addMake);

// app.put("/makes/:id", db.updateMake);

// app.delete("/makes/:id", db.deleteMake);

//Car Types
app.get("/car_types", db.getCarTypes);

//Fuel Types
app.get("/fuel_types", db.getFuelTypes);

app.post("/fuel_types", db.addFuelType);

//Colours
app.get("/colours", db.getColours);

app.post("/colours", db.addColour);

//Features
app.get("/features", db.getFeatures);

app.post("/features", db.addFeature);

// Transmission types
app.get("/transmission_types", db.getTransmissionTypes);

app.post("/transmission_types", db.addTransmissionType);

// Host 
app.get("/host_cars/:id", db.getHostCars)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

