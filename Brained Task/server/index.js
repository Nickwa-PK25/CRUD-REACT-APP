
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CRUD')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define User model
const UserModel = mongoose.model('users', {
  name: String,
  age: Number,
  image: String
});

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir));

// Routes
app.get('/', (req, res) => {
  res.json("Hello");
});

app.get('/getUsers', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Failed to fetch users" });
    });
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .then(user => res.json(user))
    .catch(err => {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Failed to fetch user" });
    });
});

app.put("/updateUser/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  let image = req.body.image;

  if (req.file) {
    image = "/uploads/" + req.file.filename;
    UserModel.findById(id)
      .then((user) => {
        if (user.image && user.image !== image) {
          fs.unlink(path.join(__dirname, user.image), (err) => {
            if (err) console.error("Error deleting old image:", err);
          });
        }
      })
      .catch((err) => console.error("Error finding user:", err));
  }

  UserModel.findByIdAndUpdate({ _id: id }, { name, age, image }, { new: true })
    .then((user) => res.json(user))
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Failed to update user" });
    });
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id: id})
    .then(user => {
      if (user && user.image) {
        fs.unlink(path.join(__dirname, user.image), (err) => {
          if (err) console.error("Error deleting image file:", err);
        });
      }
      res.json(user);
    })
    .catch(err => {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Failed to delete user" });
    });
});

app.post("/createUser", upload.single("image"), (req, res) => {
  const { name, age } = req.body;
  const image = req.file ? "/uploads/" + req.file.filename : "";
  UserModel.create({ name, age, image })
    .then((user) => res.json(user))
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({ error: "Failed to create user", details: err.message });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
