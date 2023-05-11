import express from 'express'
import {getOrganisations,getOrganisation,getOrganisationOnLocation,userinfo,userDonation} from './queries.js'
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

app.get("/api/organisation/:location", async (req,res) =>{
    const location = req.params.location
    const organiations = await getOrganisationOnLocation(location)
    res.send(organiations)
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

app.get("/api/user/:name/:email/:password/:cardno",async(req,res) => {
    const { name,email,password,cardno } = req.params
    const user = createUser(name,email,password,cardno)
    res.status(201).send(user)
})

app.listen(8080,()=>{
    console.log('Server is running in port 8080')
})