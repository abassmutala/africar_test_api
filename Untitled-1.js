// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "Pageline",
//   host: "localhost",
//   database: "test",
//   password: "    ",
//   port: 5432,
// });

// const getCars = (req, res) => {
//   // const page = parseInt(req.query.page);
//   // const limit = parseInt(req.query.limit);

//   // const startIndex = (page - 1) * limit;
//   // const endIndex = page * limit;

//   pool.query("SELECT * FROM cars ORDER BY id ASC", (error, results) => {
//     if (error) {
//       throw error;
//     }

//     // const carResults = {};

//     // carResults.count = results.rowCount;

//     // if (startIndex > 0) {
//     //   carResults.previous = {
//     //     page: page + -1,
//     //     limit: limit,
//     //   };
//     // }

//     // if (endIndex < results.rowCount) {
//     //   carResults.next = {
//     //     page: page + 1,
//     //     limit: limit,
//     //   };
//     // }
//     // carResults.results = results.rows.slice(startIndex, endIndex);
//     res.status(200).json(results);
//   });
// };

// const getCarById = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("SELECT * FROM cars WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows[0]);
//   });
// };

// const addCar = (req, res) => {
//   const {
//     make,
//     model,
//     description,
//     doors,
//     seats,
//     exterior_colour,
//     interior_colour,
//     type,
//     fuel_type,
//     transmission,
//     year,
//     price,
//     plate_number,
//     registration_country,
//     has_tracker,
//     insurance_expiry,
//     photos,
//   } = req.body;
//   pool.query(
//     "INSERT INTO cars (make, model, description, doors, seats, exterior_colour, interior_colour, type, fuel_type, transmission, year, price, plate_number, registration_country, has_tracker, insurance_expiry, photos) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
//     [
//       make,
//       model,
//       description,
//       doors,
//       seats,
//       exterior_colour,
//       interior_colour,
//       type,
//       fuel_type,
//       transmission,
//       year,
//       price,
//       plate_number,
//       registration_country,
//       has_tracker,
//       insurance_expiry,
//       photos,
//     ],
//     (error, results) => {
//       if (error) {
//         console.log(error.message);
//       }
//       res
//         .status(201)
//         .send(`A new car has been added with ID: ${results}`);
//     }
//   );
// };

// const updateCar = (request, response) => {
//   const id = parseInt(request.params.id);
//   const { make, model } = request.body;

//   pool.query(
//     "UPDATE cars SET make = $1, model = $2 WHERE id = $3",
//     [make, model, id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(`Car modified with ID: ${id}`);
//     }
//   );
// };

// const deleteCar = (req, res) => {
//   const id = parseInt(request.params.id);
//   pool.query("DELETE FROM cars WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).send(`Car deleted with ID: ${id}`);
//   });
// };

// function paginatedResults(model) {
//   return (req, res, next) => {
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const results = {};

//     if (startIndex > 0) {
//       results.previous = {
//         page: page + -1,
//         limit: limit,
//       };
//     }

//     if (endIndex < model.length) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }
//     results.results = model.slice(startIndex, endIndex);

//     res.paginatedResults = results;
//     next();
//   };
// }

// module.exports = {
//   getCars,
//   getCarById,
//   addCar,
//   updateCar,
//   deleteCar,
// };
