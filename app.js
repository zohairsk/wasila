import express from 'express'
import {getOrganisations,getOrganisation,userDonationGraph,updateStatus,userinfo,userDonation,createUser,checkUser,advancedDonation,getOrganisationCauses,getCauses,getProjects,totalUsers,userName,addDonation,userAmount,getProjectAmount,getUserAmount,newDonation,totalDonations,updateName,updateEmail,updatePassword,updateCardnum,updateCity,updateAddress, graphData, updateUser} from './queries.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get("/api/organisation", async (req,res) =>{
    const organisations = await getOrganisations()
    res.send(organisations)
})
app.get("/api/organisation/:name", async (req,res) => {
    const name = req.params.name
    const organisations = await getOrganisation(name)
    res.send(organisations)
})

app.get("/api/graph",async(req,res) => {
    const data = await graphData()
    res.send(data)
})

app.get("/api/user/:id", async (req,res) =>{
    const id = req.params.id
    const userData = await userinfo(id)
    res.send(userData)
})

app.get("/api/user/donation/:id", async (req,res) =>{
    const id = req.params.id
    const donation = await userDonation(id)
    res.send(donation)
})

app.post("/api/signup",async(req,res) => {
    const temp = req.body
    //count number of users
    const count = await totalUsers();
    const UserID = "u" + (count[0].count + 1);

    const {name,email,password,cardNumber,expiryDate,cvc,city,address} = req.body
    await createUser(UserID,name,email,password,cardNumber,expiryDate,cvc,city,address)
    res.status(200).send("successful")
})

app.get("/api/login",async(req,res) => {
    const user = await checkUser()
    res.send(user)
})

app.get("/api/organisations/:cause", async (req,res) =>{
    const cause = req.params.cause
    const organisations = await getOrganisationCauses(cause)
    res.send(organisations)
})

app.get("/api/causes", async (req,res) =>{
    const causes = await getCauses()
    res.send(causes)
})

app.get("/api/organisation/project/:name", async (req,res) =>{
    const name = req.params.name
    const projects = await getProjects(name)
    res.send(projects)
})
//total users api
app.get("/api/totalusers", async (req,res) =>{
    const count = await totalUsers()
    res.send(count)
})
//total donations api
app.get("/api/totaldonations", async (req,res) =>{
    const count = await totalDonations()
    res.send(count)
})

app.get("/api/user/name/:id", async (req,res) =>{
    const id = req.params.id
    const name = await userName(id)
    res.send(name)
})

app.get("/api/user/donation/add/:amount/:pName/:oName", async (req,res) =>{
    const {amount,pName,oName} = req.params
    const name = await addDonation(amount,pName,oName)
    res.status(200).send("successful")
})

app.get("/api/user/donation/:amount/:id", async (req,res) =>{
    const {amount,id} = req.params
    const name = await userAmount(amount,id)
    res.status(200).send("successful")
})
//url to get status
app.get("/api/user/donation/status/:DonID/:status", async (req,res) =>{
    const {DonID,status} = req.params
    const name = await updateStatus(DonID,status)
    res.status(200).send("successful")
})

//update name
app.get("/api/user/updatename/:UserID/:name", async (req,res) =>{
    const {UserID,name} = req.params
    const done = await updateName(name,UserID)
    res.status(200).send("successful")
})

//update email
app.get("/api/user/updatename/:UserID/:email", async (req,res) =>{
    const {UserID,email} = req.params
    const done = await updateEmail(email,UserID)
    res.status(200).send("successful")
})

//update password
app.get("/api/user/updatename/:UserID/:password", async (req,res) =>{
    const {UserID,password} = req.params
    const done = await updatePassword(password,UserID)
    res.status(200).send("successful")
})

//update cardnum
app.get("/api/user/updatename/:UserID/:cardnum", async (req,res) =>{
    const {UserID,cardnum} = req.params
    const done = await updateCardnum(cardnum,UserID)
    res.status(200).send("successful")
})

//update city
app.get("/api/user/updatename/:UserID/:city", async (req,res) =>{
    const {UserID,city} = req.params
    const done = await updateCity(city,UserID)
    res.status(200).send("successful")
})

//update address
app.get("/api/user/updatename/:UserID/:address", async (req,res) =>{
    const {UserID,address} = req.params
    const done = await updateAddress(address,UserID)
    res.status(200).send("successful")
})

//update user object with whatever values are sent by frontend
app.post("/api/user/:id/update",async(req,res) => {
    const {name,password,cardNumber,expiryDate,cvc,city,address} = req.body
    const UserID = req.params.id
    await updateUser(UserID,name,password,cardNumber,expiryDate,cvc,city,address)
    res.status(200).send({msg: "successful"})
})


app.get("/api/user/amount/:id", async (req,res) =>{
    const id = req.params.id
    const amount = await getUserAmount(id)
    res.send(amount)
})
app.get("/api/user/project/amount/:pName/:oName", async (req,res) =>{
    const {pName,oName} = req.params
    const amount = await getProjectAmount(pName,oName)
    res.send(amount)
})

app.post("/api/donation/add",async(req,res) => {
    const temp = req.body
    const {DonID,amount,d,status,pName,oName,UserID} = req.body
    await newDonation(DonID,amount,d,status,pName,oName,UserID)
    res.status(200).send({msg: "successful"})
})

app.post("/api/advanceddonation/add",async(req,res) => {
    const temp = req.body
    const {DonID,amount,d,status,oName,UserID} = req.body
    await advancedDonation(DonID,amount,d,status,oName,UserID)
    res.status(200).send({msg: "successful"})
})

app.listen(8080,()=>{
    console.log('Server is running in port 8080')
})

app.get("/api/graph",async(req,res) => {
    const data = await graphData()
    res.send(data)
})

app.get("/api/user/graph/:id",async(req,res) => {
    const id = req.params.id
    const data = await userDonationGraph(id)
    res.send(data)
})