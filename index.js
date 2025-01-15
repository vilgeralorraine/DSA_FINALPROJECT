const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const http = require('http');
const server = http.createServer(app);

app.use(express.static('public'));

// start the server
app.get('/', (req, res) => {
    res.sendFile(`hello`)
})
// app.get("/api/submit", async(req, res)=> {
//     try{
//         const entry = await JournalForm.find();
//         res.json(entry);
//     } catch (error) {
//         console.error("error fetching journalform", error);
//         res.status(500).json({ message: "error fetching journalform"});
//     }
// });

//connection to mongodb
mongoose
    .connect("mongodb+srv://VilgeraLorraine:LORIRI@finalprojectapp.grnao.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    });

//Middleware
app.use(cors({
    origin: ["https://vilgera-api.azurewebsites.net/submit","http://localhost:5175/", "https://brave-ground-018cb1e00.4.azurestaticapps.net" ], methods: ["GET", "POST"]
}));
app.use(express.json());

//import API folder
const submitJournalForm = require('./API/submit')

//use API
app.use("/submit", submitJournalForm);

//start the server locally
// const PORT = 4000;

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

//start the server in MS Azure
const PORT = process.env.PORT || 4000;

server.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})