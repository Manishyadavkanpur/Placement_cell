let mongoose = require('mongoose');
let studentschema = new mongoose.Schema({
    batch: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    collage: {
        type: String,
        required: true
    },
    contect: {
        type: String,
        required: true
    },
    dsa: {
        type: String,
        required: true
    },
    forntend: {
        type: String,
        required: true
    },
    react: {
        type: String,
        required: true
    },
    interviews: [
    {
        company: {
            type: String,
        },
        date: {
            type: String,
        },
        result: {
            type: String,
            enum: ['On Hold', 'Selected', 'Pending', 'Not Selected', 'Did not Attempt'],
        },
    },
],
}
    
);

let Student = mongoose.model('Student', studentschema)
module.exports = Student;