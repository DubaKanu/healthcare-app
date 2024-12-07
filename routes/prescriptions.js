// routes/prescriptions.js
const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// POST endpoint to create a new prescription
router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, medications } = req.body;

    const prescription = new Prescription({
      patientId,
      doctorId,
      medications,
    });

    await prescription.save();
    res.status(201).json({ message: 'Prescription created', prescription });
  } catch (err) {
    res.status(500).json({ message: 'Error creating prescription', error: err.message });
  }
});

// GET endpoint to retrieve prescriptions for a patient
router.get('/:patientId', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.params.patientId });
    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching prescriptions', error: err.message });
  }
});

module.exports = router;

