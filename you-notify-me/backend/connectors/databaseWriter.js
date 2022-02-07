import mysql from "mysql2";
import * as constants from "../common/constants.js";

var connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect();

export function addWeatherSubscriber(name, phoneNumber, zipcode) {
  const query = `INSERT INTO ${constants.WEATHER_SUBSCRIBER_TABLE} (name, phone_number, zipcode) VALUES ('${name}', '${phoneNumber}', '${zipcode}')`;
  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    console.log("Failed to add a subscriber ", err);
  });
}
