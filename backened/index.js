// index.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT;
const cors = require('cors');

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://Rehnuma11:1212@cluster0.mkx69tw.mongodb.net/StudentsData?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

// Create a new Express application
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));

//  Api running
app.listen(port, () => {
    console.log(`Api is running on ${port}`);
  });


  // Define a student schema and model
const studentSchema = new mongoose.Schema({
  schoolName: String,
  userName: String,
  fullName: String,
  className: String,
  registerDate: Date,
  email: String,
  totalLogins: Number,
  wellnessChamp: Number,
  earthivist: Number,
  chiefAnimalOfficer: Number,
  superEmpowerer: Number,
  proMotivator: Number,
  totalPosts: Number,
});

const Student = mongoose.model("AllSchoolStudentData", studentSchema);

// API routes

// Create a new student
app.post('/students', async (req, res) => {
  try {
    const {
      schoolName,
      userName,
      fullName,
      className,
      registerDate,
      email,
      totalLogins,
      wellnessChamp,
      earthivist,
      chiefAnimalOfficer,
      superEmpowerer,
      proMotivator,
      totalPosts
    } = req.body;
    
    const student = new Student({
      schoolName,
      userName,
      fullName,
      className,
      registerDate,
      email,
      totalLogins,
      wellnessChamp,
      earthivist,
      chiefAnimalOfficer,
      superEmpowerer,
      proMotivator,
      totalPosts
    });
    
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all students
app.get("/allstudents", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single student by ID
app.get("/allstudents/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


// // Define a student schema and model
// const studentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phoneNo: String,
//   className: String,
//   grade: String,
//   status: String,
// });

// const Student = mongoose.model("Student", studentSchema);

// // API routes

// // Create a new student
// app.post('/students', async (req, res) => {
//   try {
//     const {  name, email, phoneNo, className, grade, status } = req.body;
//     const student = new Student({  name, email, phoneNo, className, grade, status });
//     const savedStudent = await student.save();
//     res.status(201).json(savedStudent);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // Get all students
// app.get("/students", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Get a single student by ID
// app.get("/students/:id", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (student) {
//       res.json(student);
//     } else {
//       res.status(404).json({ error: "Student not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

























// // Create dummy data
// const dummyData = [
//  // Additional dummy data entries
// // Additional dummy data entries
// {
//   schoolName: "Indraprastha World School",
//   userName: "user17",
//   fullName: "Olivia Wilson",
//   className: "Class 8",
//   registerDate: new Date(),
//   email: "olivia.wilson@example.com",
//   totalLogins: 6,
//   wellnessChamp: 2,
//   earthivist: 2,
//   chiefAnimalOfficer: 1,
//   superEmpowerer: 3,
//   proMotivator: 2,
//   totalPosts: 10,
// },
// {
//   schoolName: "Jm International School",
//   userName: "user18",
//   fullName: "Noah Thompson",
//   className: "Class 9",
//   registerDate: new Date(),
//   email: "noah.thompson@example.com",
//   totalLogins: 4,
//   wellnessChamp: 1,
//   earthivist: 1,
//   chiefAnimalOfficer: 1,
//   superEmpowerer: 2,
//   proMotivator: 1,
//   totalPosts: 6,
// },
// {
//   schoolName: "KIIT World School, Pitampura",
//   userName: "user19",
//   fullName: "Emma Walker",
//   className: "Class 10",
//   registerDate: new Date(),
//   email: "emma.walker@example.com",
//   totalLogins: 9,
//   wellnessChamp: 4,
//   earthivist: 3,
//   chiefAnimalOfficer: 1,
//   superEmpowerer: 4,
//   proMotivator: 3,
//   totalPosts: 12,
// },
// {
//   schoolName: "Indraprastha World School",
//   userName: "user20",
//   fullName: "William Evans",
//   className: "Class 11",
//   registerDate: new Date(),
//   email: "william.evans@example.com",
//   totalLogins: 7,
//   wellnessChamp: 3,
//   earthivist: 2,
//   chiefAnimalOfficer: 2,
//   superEmpowerer: 3,
//   proMotivator: 2,
//   totalPosts: 9,
// },
// {
//   schoolName: "Jm International School",
//   userName: "user21",
//   fullName: "Sophia Mitchell",
//   className: "Class 12",
//   registerDate: new Date(),
//   email: "sophia.mitchell@example.com",
//   totalLogins: 8,
//   wellnessChamp: 4,
//   earthivist: 4,
//   chiefAnimalOfficer: 2,
//   superEmpowerer: 4,
//   proMotivator: 3,
//   totalPosts: 15,
// }




// ];

// // Insert dummy data into MongoDB
// // Student.insertMany(dummyData)
// //   .then(() => {
// //     console.log("Dummy data inserted successfully!");
// //   })
// //   .catch((error) => {
// //     console.error("Failed to insert dummy data:", error);
// //   });
