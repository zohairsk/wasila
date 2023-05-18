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
  const rows = await pool.query(`SELECT *
  FROM user
  LEFT OUTER JOIN cardnum
  ON user.cardnum = cardnum.cardnum
  WHERE user.UserID = ?
  `, [id]);
  return rows[0];
}

export async function userDonation(id) {
  const rows = await pool.query(
    "SELECT user.name, amount, d, organisation.name, donations.status FROM user, organisation, donations, user_donates, receives_donations WHERE User.UserID = user_donates.UserID AND organisation.OrgID = receives_donations.OrgID AND donations.DonID = user_donates.DonID AND donations.DonID = receives_donations.DonID AND user.UserID = ?",
    [id]
  );
  return rows[0];
}

export async function userDonationGraph(id) {
  const rows = await pool.query(
    "SELECT organisation.name,sum(amount) FROM user, organisation, donations, user_donates, receives_donations  WHERE User.UserID = user_donates.UserID AND organisation.OrgID = receives_donations.OrgID AND donations.DonID = user_donates.DonID AND donations.DonID = receives_donations.DonID AND user.UserID = ? group by organisation.name;",
    [id]
  );
  return rows[0];
}



export async function createUser(Userid,name,email,password,cardno,expiry,cvc,city,address) {
  const rows1 = await pool.query("insert into cardnum (cardnum,expiry,cvc) VALUES (?,?,?)",[cardno,expiry,cvc]);
  const rows = await pool.query(
    "insert into user (UserID,name,email, password, cardnum,city,address) VALUES (?,?, ?, ?, ?,?,?)",
    [Userid,name,email,password,cardno,city,address]
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
  return rows[0];
}

export async function totalDonations(){
  const rows = await pool.query("select count(*) AS count FROM donations");
  return rows[0];
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

export async function updateStatus(DonID,status){
  const rows = await pool.query("update donations set status = ? where DonID = ?",[status,DonID])
  return rows[0];
}

export async function getUserAmount(id){  
  const rows = await pool.query("select amountdonated from user where UserID= ?",[id]);
  return rows[0];
}

export async function getProjectID(pName,oName){  
  const rows = await pool.query("select ProID from projects where name = ? and OrgID = (select OrgID from organisation where name =?)",[pName,oName]);
  return rows[0];
}
export async function getOrgID(oName){  
  const rows = await pool.query("select OrgID from organisation where name=?",[oName]);
  return rows[0];
}

export async function newDonation(DonID,amount,d,status,pName,oName,UserID) {
  const OrgID = await getOrgID(oName)
  const ProID = await getProjectID(pName,oName)
  const rows = await pool.query(
    "insert into donations (DonID,amount,d,status,ProID,OrgID) VALUES (?,?, ?, ?, ?,?)",
    [DonID,amount,d,status,ProID[0].ProID,OrgID[0].OrgID]
  );
  const rows2 = await pool.query(
    "insert into user_donates (DonID,UserID) Values (?,?)",[DonID,UserID]
  )
  const rows3 = await pool.query(
    "insert into receives_donations (DonID,OrgID) Values (?,?)",[DonID,OrgID[0].OrgID]
  )
  } 
  export async function advancedDonation(DonID,amount,d,status,oName,UserID) {
    const OrgID = await getOrgID(oName)
    const rows = await pool.query(
      "insert into donations (DonID,amount,d,status,OrgID) VALUES (?,?, ?, ?,?)",
      [DonID,amount,d,status,OrgID[0].OrgID]
    );
    const rows2 = await pool.query(
      "insert into user_donates (DonID,UserID) Values (?,?)",[DonID,UserID]
    )
    const rows3 = await pool.query(
      "insert into receives_donations (DonID,OrgID) Values (?,?)",[DonID,OrgID[0].OrgID]
    )
    }
  
    export async function updateName(name,UserID){
      const rows = await pool.query("update user set name = ? where UserID = ?",[name,UserID])
      return rows[0];
    }

    export async function updateEmail(email,UserID){
      const rows = await pool.query("update user set email = ? where UserID = ?",[email,UserID])
      return rows[0];
    }

    export async function updatePassword(password,UserID){
      const rows = await pool.query("update user set password = ? where UserID = ?",[password,UserID])
      return rows[0];
    }
//cardnum query
    export async function updateCardnum(cardnum,expiry,cvc,UserID){
      const rows2 = await pool.query("UPDATE cardnum JOIN user ON cardnum.cardnum = user.cardnum SET cardnum.cardnum = ?,cardnum.expiry=?,cardnum.cvc=? where user.UserID = ?",[cardnum,expiry,cvc,UserID])
      const rows = await pool.query("update user set cardnum = ? where UserID = ?",[cardnum,UserID])
      return rows[0];
    }

    export async function updateCity(city,UserID){
      const rows = await pool.query("update user set name = ? where UserID = ?",[city,UserID])
      return rows[0];
    }

    export async function updateAddress(address,UserID){
      const rows = await pool.query("update user set address = ? where UserID = ?",[address,UserID])
      return rows[0];
    }

    export async function graphData(){
      const rows = await pool.query("select count(user_donates.UserID),organisation.name from receives_donations,user_donates,organisation where (receives_donations.DonID = user_donates.DonID) and (organisation.orgID = receives_donations.OrgID) Group by (organisation.name)")
      return rows[0];
    }

    export async function updateUser(UserID, name,password,cardNumber,expiryDate,cvc,city,address){
      //dont do anything with email
      
      if(cardNumber == null){
        if(password == null){
          const rows = await pool.query("update user set name = ?,city = ?,address = ? where UserID = ?",[name,city,address,UserID])
          return rows[0];
        }

        const rows = await pool.query("update user set name = ?,password = ?,city = ?,address = ? where UserID = ?",[name,password,city,address,UserID])
        return rows[0];
      }
      //update user info
      if(password == null){
        const rows = await pool.query("update user set name = ?,cardnum = ?,city = ?,address = ? where UserID = ?",[name,cardNumber,city,address,UserID])
        //update card info
        const rows2 = await pool.query("update cardnum set cardnum = ?,expiry = ?,cvc = ? where cardnum = ?",[cardNumber,expiryDate,cvc,cardNumber])
        return rows[0];
      }
      
      const rows = await pool.query("update user set name = ?,password = ?,cardnum = ?,city = ?,address = ? where UserID = ?",[name,password,cardNumber,city,address,UserID])
      //update card info
      const rows2 = await pool.query("update cardnum set cardnum = ?,expiry = ?,cvc = ? where cardnum = ?",[cardNumber,expiryDate,cvc,cardNumber])
      return rows[0];
    }