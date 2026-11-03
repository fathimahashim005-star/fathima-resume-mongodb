const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    qualification: { type: String, required: true },
    period: { type: String, default: '' },
    result: { type: String, default: '' }
}, { _id: false });

const skillSchema = new mongoose.Schema({
    category: { type: String, required: true },
    items: [{ type: String }]
}, { _id: false });

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' }
}, { _id: false });

const ResumeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    objective: { type: String, default: '' },
    education: [educationSchema],
    skills: [skillSchema],
    projects: [projectSchema],
    certifications: [{ type: String }],
    interests: [{ type: String }],
    languages: [{ type: String }],
    declaration: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);