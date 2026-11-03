# Fathima Hashim - Dynamic Resume (MongoDB + Express + EJS)

This project displays the resume using data read from MongoDB. The EJS file contains the layout; the resume text and lists are loaded from the database.

## Project structure

```text
fathima-resume-mongodb/
├── models/
│   └── Resume.js
├── public/
│   └── cv.css
├── views/
│   └── resume.ejs
├── .env.example
├── .gitignore
├── package.json
├── seed-data.js
└── server.js
```

## 1. Requirements

Install Node.js and MongoDB Community Server, and make sure the MongoDB service is running on your computer.

## 2. Open the project in Command Prompt

Change directory to the folder where you extracted this ZIP. For example:

```bat
cd /d F:\fathima-resume-mongodb
```

## 3. Install packages

```bat
npm install
```

## 4. Create the environment file

Copy `.env.example` and name the copy `.env`. You can do this in Windows Command Prompt:

```bat
copy .env.example .env
```

The default connection is:

```text
mongodb://127.0.0.1:27017/fathima_resume
```

If MongoDB is running locally with its default settings, you do not need to change it.

## 5. Start the application

```bat
npm start
```

Open this address in your browser:

```text
http://localhost:3000
```

On the first successful start, the application creates the `fathima_resume` database and inserts the initial resume document if the collection is empty. It does not overwrite the database on later starts.

## Database schema

Mongoose model: `models/Resume.js`  
MongoDB database: `fathima_resume`  
MongoDB collection: `resumes`

The document stores:
- `name`, `address`, `phone`, `email`, `objective`, `declaration`
- `education`: array of institution, qualification, period and result
- `skills`: array of category and items
- `projects`: array of title and description
- `certifications`, `interests`, `languages`: arrays of strings

## How dynamic rendering works

1. `server.js` connects to MongoDB with Mongoose.
2. `GET /` retrieves the resume document with `Resume.findOne()`.
3. Express passes that document to `views/resume.ejs`.
4. EJS loops through the database arrays and displays each section.

To change the displayed resume information, update the document in the MongoDB collection named `resumes`. Refresh the browser to see the updated information. The initial data is in `seed-data.js`; it is used only when the collection has no resume document.

**Note:** This version is a read-only public resume page. It does not include an admin form or login for editing data through the browser. Use MongoDB Compass or `mongosh` to edit the document.
