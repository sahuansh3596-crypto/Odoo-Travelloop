// ===============================
// Traveloop Backend Server
// Single File Backend (server.js)
// ===============================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// ===============================
// Middleware
// ===============================
app.use(express.json());
app.use(cors());

// ===============================
// MongoDB Connection
// ===============================
mongoose
  .connect('mongodb://127.0.0.1:27017/traveloop')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// ===============================
// User Schema
// ===============================
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  phone: String,
  city: String,
  country: String,
  profileImage: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// ===============================
// Trip Schema
// ===============================
const tripSchema = new mongoose.Schema({
  userId: String,
  destination: String,
  tripType: String,
  startDate: String,
  endDate: String,
  budget: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Trip = mongoose.model('Trip', tripSchema);

// ===============================
// Notes Schema
// ===============================
const noteSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model('Note', noteSchema);

// ===============================
// Expense Schema
// ===============================
const expenseSchema = new mongoose.Schema({
  userId: String,
  category: String,
  description: String,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

// ===============================
// JWT Middleware
// ===============================
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    const verified = jwt.verify(token, 'traveloop_secret_key');

    req.user = verified;

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
};

// ===============================
// Home Route
// ===============================
app.get('/', (req, res) => {
  res.json({
    message: 'Traveloop Backend Running Successfully'
  });
});

// ===============================
// User Registration
// ===============================
app.post('/api/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      city,
      country
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      city,
      country
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// User Login
// ===============================
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid password'
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      'traveloop_secret_key',
      {
        expiresIn: '7d'
      }
    );

    res.json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Create Trip
// ===============================
app.post('/api/trips', authMiddleware, async (req, res) => {
  try {
    const {
      destination,
      tripType,
      startDate,
      endDate,
      budget,
      description
    } = req.body;

    const trip = new Trip({
      userId: req.user.id,
      destination,
      tripType,
      startDate,
      endDate,
      budget,
      description
    });

    await trip.save();

    res.status(201).json({
      message: 'Trip created successfully',
      trip
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Get All Trips
// ===============================
app.get('/api/trips', authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });

    res.json(trips);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Add Note
// ===============================
app.post('/api/notes', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = new Note({
      userId: req.user.id,
      title,
      description
    });

    await note.save();

    res.status(201).json({
      message: 'Note added successfully',
      note
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Get Notes
// ===============================
app.get('/api/notes', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Add Expense
// ===============================
app.post('/api/expenses', authMiddleware, async (req, res) => {
  try {
    const { category, description, amount } = req.body;

    const expense = new Expense({
      userId: req.user.id,
      category,
      description,
      amount
    });

    await expense.save();

    res.status(201).json({
      message: 'Expense added successfully',
      expense
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Get Expenses
// ===============================
app.get('/api/expenses', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });

    const totalExpense = expenses.reduce(
      (total, item) => total + item.amount,
      0
    );

    res.json({
      expenses,
      totalExpense
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Admin Dashboard Route
// ===============================
app.get('/api/admin/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTrips = await Trip.countDocuments();
    const totalNotes = await Note.countDocuments();
    const totalExpenses = await Expense.countDocuments();

    res.json({
      totalUsers,
      totalTrips,
      totalNotes,
      totalExpenses
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Delete Trip
// ===============================
app.delete('/api/trips/:id', authMiddleware, async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Update Trip
// ===============================
app.put('/api/trips/:id', authMiddleware, async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    res.json({
      message: 'Trip updated successfully',
      updatedTrip
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// ===============================
// Server Start
// ===============================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ===============================
// Required Packages
// ===============================
// npm init -y
// npm install express mongoose cors bcryptjs jsonwebtoken nodemon

// ===============================
// Run Server
// ===============================
// nodemon server.js

// ===============================
// API Endpoints
// ===============================
// POST   /api/register
// POST   /api/login
// POST   /api/trips
// GET    /api/trips
// PUT    /api/trips/:id
// DELETE /api/trips/:id
// POST   /api/notes
// GET    /api/notes
// POST   /api/expenses
// GET    /api/expenses
// GET    /api/admin/dashboard
