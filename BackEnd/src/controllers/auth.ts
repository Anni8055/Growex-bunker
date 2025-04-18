import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock user database
const users = [
  {
    _id: '1',
    name: 'Brand User',
    email: 'brand@example.com',
    password: '$2a$10$6KsRmAowBMPw0BLttPKQyenKunTJ0woRQiXS7NCT5uPieRBW8.TEG', // "password123"
    role: 'brand'
  },
  {
    _id: '2',
    name: 'Influencer User',
    email: 'influencer@example.com',
    password: '$2a$10$6KsRmAowBMPw0BLttPKQyenKunTJ0woRQiXS7NCT5uPieRBW8.TEG', // "password123"
    role: 'influencer'
  }
];

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    console.log('Registration request:', { name, email, role });

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (role !== 'brand' && role !== 'influencer') {
      return res.status(400).json({ message: 'Role must be either "brand" or "influencer"' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const newUser = {
      _id: String(users.length + 1),
      name,
      email,
      // We're not hashing in the mock version
      password,
      role
    };

    // Add to our mock database
    users.push(newUser);
    console.log('User created:', { id: newUser._id, email: newUser.email, role: newUser.role });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed: ' + (error instanceof Error ? error.message : 'Unknown error') });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log('Login request:', { email });

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password (simplified for mock)
    const isMatch = password === 'password123';
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User logged in:', { id: user._id, email: user.email, role: user.role });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed: ' + (error instanceof Error ? error.message : 'Unknown error') });
  }
};

export const logout = async (req: Request, res: Response) => {
  // Since we're using JWT, we don't need to do anything server-side
  try {
    console.log('Logout request');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
}; 