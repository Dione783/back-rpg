const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const options  = {
    origin:"*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}

mongoose.connect("mongodb+srv://Dione22:Dione321@cluster0.v9aekhr.mongodb.net/")

const persoSchema = new mongoose.Schema({
    name:String,
    vila:String,
    description:String,
    url:String
})

const persoModel = mongoose.model("perso",persoSchema);

app.use(cors(options));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post("/",async (req,res)=>{
    let name = await req.body.name;
    let description = await req.body.description;
    let vila = await req.body.vila;
    if(vila == "Undefined"){
        vila = await req.body.addvila;
    }
    let url = await req.body.url;
    let perso = new persoModel({name:name,description:description,url,vila});
    await perso.save();
    res.redirect("http://localhost:5173/list");
});

app.get("/",(req,res)=>{res.send("<h1>Hello World</h1>")})

app.get("/list/vilas",async(req,res)=>{
    const vilas = await persoModel.distinct("vila");
    res.send(vilas);
})

app.get("/list/:id",async (req,res)=>{
    let id = req.params.id;
    const user = await persoModel.findById(id).exec();
    res.send(user);
})

app.get("/list",async (req,res)=>{
    const users = await persoModel.find();
    res.send(users);
});



app.listen(3000,()=>{
    console.log("rodando na porta:" + 3000);
})
