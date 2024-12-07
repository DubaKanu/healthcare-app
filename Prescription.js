// models/Prescription.js
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  medications: [{
    name: String,
    dose: String,
    instructions: String,
    duration: String,
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
