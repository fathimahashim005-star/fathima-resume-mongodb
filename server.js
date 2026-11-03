require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Resume = require('./models/Resume');
const initialResumeData = require('./seed-data');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fathima_resume';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Read the resume document from MongoDB and pass it to the EJS template.
app.get('/', async (req, res) => {
    try {
        const resume = await Resume.findOne().lean();

        if (!resume) {
            return res.status(404).send(
                'Resume data was not found in MongoDB. Restart the server to insert the initial sample data.'
            );
        }

        res.render('resume', { resume });
    } catch (error) {
        console.error('Error loading resume:', error);
        res.status(500).send('Unable to load the resume. Please check the server and database.');
    }
});

async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully.');

        // Add the uploaded resume details on first run, without overwriting later edits.
        const existingResume = await Resume.findOne();
        if (!existingResume) {
            await Resume.create(initialResumeData);
            console.log('Initial resume data inserted into MongoDB.');
        }

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Could not start the application:', error.message);
        console.error('Make sure MongoDB is running and MONGODB_URI in .env is correct.');
        process.exit(1);
    }
}

startServer();