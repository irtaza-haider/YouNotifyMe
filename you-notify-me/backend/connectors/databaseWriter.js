import mysql from "mysql2";
import * as constants from "../common/constants.js";

var connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect();

export async function addWeatherSubscriber(name, phoneNumber, zipcode) {
  // First, check for duplicate entries
  const checkQuery = `SELECT * FROM ${constants.WEATHER_SUBSCRIBER_TABLE} WHERE phone_number = '${phoneNumber}'`;

  try {
    const result = await queryAsync(checkQuery);

    if (result.length > 0) {
      // Duplicate entry found, throw a custom error
      throw new Error("Duplicate entry found");
    } else {
      // No duplicate entry found, proceed with insertion
      const insertQuery = `INSERT INTO ${constants.WEATHER_SUBSCRIBER_TABLE} (name, phone_number, zipcode) VALUES ('${name}', '${phoneNumber}', '${zipcode}')`;
      await queryAsync(insertQuery);
    }
  } catch (error) {
    throw error;
  }
}

function queryAsync(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
