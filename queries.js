const Pool = require("pg").Pool;
const pool = new Pool({
  user: "Pageline",
  host: "localhost",
  database: "test",
  password: "    ",
  port: 5432,
});

const getCars = (req, res) => {
  // const page = parseInt(req.query.page);
  // const limit = parseInt(req.query.limit);

  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;

  pool.query("SELECT * FROM cars ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }

    // const carResults = {};

    // carResults.count = results.rowCount;

    // if (startIndex > 0) {
    //   carResults.previous = {
    //     page: page + -1,
    //     limit: limit,
    //   };
    // }

    // if (endIndex < results.rowCount) {
    //   carResults.next = {
    //     page: page + 1,
    //     limit: limit,
    //   };
    // }
    // carResults.results = results.rows.slice(startIndex, endIndex);
    res.status(200).json(results);
  });
};

const getCarById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM cars WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows[0]);
  });
};

const getHostCars = (request, response) => {
  const id = request.params.id;

  pool.query("SELECT * FROM cars WHERE host = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addCar = (req, res) => {
  const {
    make,
    model,
    year,
    type,
    fuel_type,
    transmission,
    doors,
    seats,
    extra_features,
    // exterior_colour,
    // interior_colour,
    plate_number,
    has_tracker,
    location,
    price,
    // insurance,
    photos,
    host
  } = req.body;
  pool.query(
    "INSERT INTO cars (make, model, year, type, fuel_type, transmission, doors, seats, extra_features, plate_number, has_tracker, location, price, photos, host) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
    [
      make,
      model,
      year,
      type,
      fuel_type,
      transmission,
      doors,
      seats,
      extra_features,
      // exterior_colour,
      // interior_colour,
      plate_number,
      has_tracker,
      location,
      price,
      // insurance,
      photos,
      host
    ],
    (error, results) => {
      if (error) {
        console.log(error.message);
      }
      res.status(201).send(`A new car has been added with ID: ${results}`);
    }
  );
};

const updateCar = (request, response) => {
  const id = parseInt(request.params.id);
  const { make, model } = request.body;

  pool.query(
    "UPDATE cars SET make = $1, model = $2 WHERE id = $3",
    [make, model, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Car modified with ID: ${id}`);
    }
  );
};

const deleteCar = (req, res) => {
  const id = parseInt(request.params.id);
  pool.query("DELETE FROM cars WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Car deleted with ID: ${id}`);
  });
};

const getMakes = (req, res) => {
  pool.query("SELECT * FROM makes ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results);
  });
};

const addMake = (req, res) => {
  const { name } = req.body;
  pool.query(
    "INSERT INTO makes (name) VALUES ($1)",
    [name],
    (error, results) => {
      if (error) {
        console.log(error.message);
      }
      res.status(201).send(`A new make has been added with name: ${name}`);
    }
  );
};

const getColours = (req, res) => {
  pool.query("SELECT * FROM colours ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results);
  });
};

const addColour = (req, res) => {
  const { name } = req.body;
  pool.query(
    "INSERT INTO colours (name) VALUES ($1)",
    [name],
    (error, results) => {
      if (error) {
        console.log(error.message);
      }
      res.status(201).send(`A new colour has been added with name: ${name}`);
    }
  );
};

const getFuelTypes = (req, res) => {
  pool.query("SELECT * FROM fuel_types ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results);
  });
};

const addFuelType = (req, res) => {
  const { name } = req.body;
  pool.query(
    "INSERT INTO fuel_types (name) VALUES ($1)",
    [name],
    (error, results) => {
      if (error) {
        console.log(error.message);
      }
      res.status(201).send(`A new fuel type has been added with name: ${name}`);
    }
  );
};

const getFeatures = (req, res) => {
  pool.query("SELECT * FROM features ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results);
  });
};

const addFeature = (req, res) => {
  const { name, value } = req.body;
  pool.query(
    "INSERT INTO features (name, value) VALUES ($1, $2)",
    [name, value],
    (error, results) => {
      if (error) {
        console.log(error.message);
      }
      res.status(201).send(`A new feature has been added with name: ${name}`);
    }
  );
};

const getCarTypes = (req, res) => {
  pool.query("SELECT * FROM car_types ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results);
  });
};

const getTransmissionTypes = (req, res) => {
  pool.query(
    "SELECT * from transmission_types ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results);
    }
  );
};

const addTransmissionType = (req, res) => {
  const { name, value } = req.body;
  pool.query(
    "INSERT INTO transmission_types (name, value) VALUES ($1, $2)",
    [name, value],
    (error, results) => {
      if (error) {
        console.log(error.message);
      }
      res
        .status(201)
        .send(
          `A new transmission type has been added with name: ${name} and value ${value}`
        );
    }
  );
};

function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (startIndex > 0) {
      results.previous = {
        page: page + -1,
        limit: limit,
      };
    }

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    results.results = model.slice(startIndex, endIndex);

    res.paginatedResults = results;
    next();
  };
}

module.exports = {
  getCars,
  getMakes,
  getFeatures,
  getFuelTypes,
  getColours,
  getCarTypes,
  getTransmissionTypes,
  getCarById,
  getHostCars,
  addCar,
  addMake,
  addFuelType,
  addColour,
  addFeature,
  addTransmissionType,
  updateCar,
  deleteCar,
};
