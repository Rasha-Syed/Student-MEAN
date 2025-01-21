const express = require('express');
const router = express.Router();
const Student = require('../models/Student');



// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  console.log('Request Body:', req.body); 
  const { studentId, name, phone, email, department, image, favoriteSubjects } = req.body;

  
  if (!studentId || !name || !phone || !email || !department || !image || !favoriteSubjects) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (!Array.isArray(favoriteSubjects) || favoriteSubjects.length === 0) {
    return res.status(400).json({ message: 'favoriteSubjects must be a non-empty array.' });
  }

  const student = new Student({ studentId, name, phone, email, department,image, favoriteSubjects });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error('Error saving student:', err.message);
    res.status(400).json({ message: err.message });
  }
});


  
// Update a student
router.put('/:id', async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ message: 'Student not found.' });
      }
  
      res.json(updatedStudent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search students by name or ID
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const students = await Student.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
        { studentId: { $regex: query, $options: 'i' } } // Case-insensitive search by studentId
      ]
    });

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
