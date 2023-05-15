import express from 'express'
import {getOrganisations,getOrganisation,userinfo,userDonation,createUser,checkUser,getOrganisationCauses,getCauses,getProjects,totalUsers,userName,addDonation,userAmount,getProjectAmount,getUserAmount} from './queries.js'
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
    const {userID,name,email,password,cardno,city,address} = req.body
    console.log(req.body)
    await createUser(userID,name,email,password,cardno,city,address)
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

app.get("/api/user/total", async (req,res) =>{
    const count = await totalUsers()
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


app.listen(8080,()=>{
    console.log('Server is running in port 8080')
})