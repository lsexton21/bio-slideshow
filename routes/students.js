const express = require('express')
const router = express.Router()
const BiologyStudents = require('../models/biologyStudents');
const AppError = require('../public/utilities/AppError')
const catchAsync = require('../public/utilities/catchAsyncErrors');
const {isLoggedIn} = require('./isLoggedInMiddleware')

router.get('/', isLoggedIn, catchAsync(async (req, res, next) => {
    const students = await BiologyStudents.find({});
    res.render('studentIndex', {students})
}))

router.post('/', isLoggedIn, catchAsync(async (req, res, next) => {  
    const student = new BiologyStudents(req.body.student)
    await student.save();
    req.flash('success', 'Successfully added the following student...')
    res.redirect(`/students/${student._id}`);
}))

router.get('/new', isLoggedIn, (req, res) => {
    res.render('newStudent');
})
 
router.get('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params;
    const student = await BiologyStudents.findById(id)
    res.render('showStudent', {student, msg: req.flash('success')});
}))
  
router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params;
    const student = await BiologyStudents.findById(id)
    if(!student) throw new AppError('Invalid Student ID', 400)
    res.render('editStudent', {student});
}))
  
router.get('/:id/delete', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params;
    const deletedProduct = await BiologyStudents.findByIdAndDelete(id)
    res.redirect('/students');
}))
  
router.put('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const {id} = req.params;
    const student = await BiologyStudents.findByIdAndUpdate(id, req.body.student, {runValidators: true, new: true});
    console.log(student)
    res.redirect(`/students/${student._id}`);
}))

module.exports = router;