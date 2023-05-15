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
  const rows = await pool.query("Select * from organisation");
  return rows[0];
}

export async function getOrganisation(name) {
  const rows = await pool.query("Select * from organisation where name = ?", [
    name,
  ]);
  return rows[0];
}


export async function userinfo(id) {
  const rows = await pool.query("Select * from user where UserID = ?", [id]);
  return rows[0];
}

export async function userDonation(id) {
  const rows = await pool.query(
    "SELECT user.name, amount, d, organisation.name, donations.status FROM user, organisation, donations, user_donates, receives_donations WHERE User.UserID = user_donates.UserID AND organisation.OrgID = receives_donations.OrgID AND donations.DonID = user_donates.DonID AND donations.DonID = receives_donations.DonID AND user.UserID = ?",
    [id]
  );
  return rows[0];
}



export async function createUser(userid,name,email,password,cardno,city,address) {
  const rows = await pool.query(
    "insert into user (UserID,name,email, password, cardnum,city,address) VALUES (?,?, ?, ?, ?,?,?)",
    [userid,name,email,password,cardno,city,address]
  );
}

export async function checkUser(){
  const rows = await pool.query("select * from user");
  return rows[0];
}

export async function getOrganisationCauses(cause){
  const rows = await pool.query("select organisation.name, organisation.description, organisation.weblink, organisation.image, organisation.email, organisation.contactno from organisation,causes,org_causes where (organisation.OrgID = org_causes.OrgID) and (causes.cid = org_causes.cid) and cause = ?",[cause]);
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

export async function totalUsers(){
  const rows = await pool.query("select count(*) AS count FROM user");
  console.log(rows)
  return rows[0].count;
}

export async function userName(id){
  const rows = await pool.query("select name from user where UserID = ? ",[id]);
  return rows[0];
}

export async function addDonation(amount,pName,oName){
  const rows = await pool.query("update donations set amount = ? where ProID = (select ProID from projects where (name = ? and OrgID = (select OrgID from organisation where name = ?)))",[amount,pName,oName]);
  return rows[0];
}

export async function getProjectAmount(pName,oName){
  const rows = await pool.query("select amount from donations where ProID = (select ProID from projects where (name = ? and OrgID = (select OrgID from organisation where name = ?)))",[pName,oName]);
  return rows[0];
}


export async function userAmount(amount,id){
  const rows = await pool.query("update user set amountdonated = ? where UserID = ?",[amount,id])
  return rows[0];
}

export async function getUserAmount(id){
  const rows = await pool.query("select amountdonated from user where UserID='u1'",[id]);
  return rows[0];
}





