import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getOrganisations() {
  const rows = await pool.query("Select * from Organisation");
  return rows[0];
}

export async function getOrganisation(name) {
  const rows = await pool.query("Select * from Organisations where name = ?", [
    name,
  ]);
  return rows[0];
}

export async function getOrganisationOnLocation(location) {
  const rows = await pool.query(
    "Select * from Organisations where location = ?",
    [location]
  );
  return rows[0];
}

export async function userinfo(id) {
  const rows = await pool.query("Select * from User where UserID = ?", [id]);
  return rows[0];
}

export async function userDonation(id) {
  const rows = await pool.query(
    "SELECT User.name, amount, d, Organisation.name, Donations.status FROM User, Organisation, Donations, User_Donates, Receives_Donations WHERE User.UserID = User_Donates.UserID AND Organisation.OrgID = Receives_Donations.OrgID AND Donations.DonID = User_Donates.DonID AND Donations.DonID = Receives_Donations.DonID AND User.UserID = ?",
    [id]
  );
  return rows[0];
}



export async function createUser(name,email,password,cardno) {
  const rows = await pool.query(
    "insert into User (name,email, password, cardno) VALUES (?, ?, ?, ?)",
    [name,email,password,cardno]
  );
  return getNote(rows[0].insertId);
}

