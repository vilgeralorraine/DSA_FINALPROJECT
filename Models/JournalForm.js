const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
});

module.exports = mongoose.model("Form", FormSchema);



// class FormModel {
//     constructor(name, message){
//         this.name = name;
//         this.message = message;
//     }
// }

// module.exports = FormModel;