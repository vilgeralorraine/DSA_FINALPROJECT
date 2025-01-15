const express = require("express");
const router = express.Router();
const Form = require("../Models/JournalForm.js");


router.post("/API", async (req, res)=> {
    const { name, message } = req.body;

    try{
        const formEntry = new Form({ name, message });
        const savedEntry = await formEntry.save();

        console.log("Saved Data: ", savedEntry);
        res.status(201).json({ message: "form submitted successfully", data: savedEntry});
    } catch (error) {
        console.error("error saving form data: ", error);

        if (error.code === 11000){
            res.status(400).json({ message: "error"});
        } else {
            res.status(500).json({ message: "error saving form data"});
        }
    }
});

module.exports = router;
// router.post("/", (req, res)=> {
//     const {name, message} = req.body;
//     console.log("received data: ", {name, message} );

//     res.status(400).json({message: "thanks for submitting"});
// });

// module.exports = router;