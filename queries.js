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



export async function createUser(userid,name,email,password,cardno,city,address) {
  const rows = await pool.query(
    "insert into User (UserID,name,email, password, cardnum,city,address) VALUES (?,?, ?, ?, ?,?,?)",
    [userid,name,email,password,cardno,city,address]
  );
}

export async function checkUser(){
  const rows = await pool.query("select * from User");
  return rows[0];
}

export async function getOrganisationCauses(cause){
  const rows = await pool.query("select organisation.name, organisation.description, organisation.weblink, organisation.image, organisation.email, organisation.contactno,  from organisation,causes,org_causes where (organisation.OrgID = org_causes.OrgID) and (causes.cid = org_causes.cid) and cause = ?",[cause]);
  return rows[0];
}

export async function getCauses(){
  const rows = await pool.query("select cause from causes");
  return rows[0];
}

export async function getProjects(name){
  const rows = await pool.query("SELECT projects.name, projects.amount from projects,organisation where (projects.OrgID = organisation.OrgID) and (organisation.name = ?)",[name]);
  return rows[0];
}

