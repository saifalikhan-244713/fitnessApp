const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ message: 'JWT Secret is not defined' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({ firstName, lastName, email, password: hashedPassword });
    const token = jwt.sign({ email: result.email, id: result._id }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ result, token });
  } catch (error) {
    console.error('Error during signup:', error); // Log the error to the console
    res.status(500).json({ message: 'Something went wrong', error: error.message }); // Include the error message in the response
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ message: 'JWT Secret is not defined' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error('Error during login:', error); // Log the error to the console
    res.status(500).json({ message: 'Something went wrong', error: error.message }); // Include the error message in the response
  }
};

module.exports = { signUp, logIn };
