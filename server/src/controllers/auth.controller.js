import User from '../models/user.model.js';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { GITHUB_CLIENT_ID, GITHUB_REDIRECT_URI } from '../configs/env.config.js';

// Options for cookie
const cookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production',
};

// Register user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const err = new Error('All fields are required');
      err.status = 400;
      return next(err);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      const err = new Error('User already exists');
      err.status = 400;
      return next(err);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    const token = user.generateToken();

    res.status(201).cookie('token', token, cookieOptions).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      return next(err);
    }

    const token = user.generateToken();

    res.status(200).cookie('token', token, cookieOptions).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Logout user
export const logout = (req, res) => {
  res
    .status(200)
    .cookie('token', null, { ...cookieOptions, expires: new Date(0) })
    .json({
      success: true,
      message: 'Logged out successfully',
    });
};

// GitHub Login (Initiate)
export const githubLogin = (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user:email`;
  res.redirect(url);
};

// GitHub Callback
export const githubCallback = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=no_code`);
    }

    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const githubUser = userResponse.data;

    let email = githubUser.email;
    if (!email) {
      const emailsResponse = await axios.get('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const primaryEmail = emailsResponse.data.find((e) => e.primary);
      email = primaryEmail
        ? primaryEmail.email
        : `${githubUser.login}@github.com`;
    }

    let user = await User.findOne({
      $or: [
        { githubId: githubUser.id.toString() },
        { email: email },
      ],
    });

    if (!user) {
      user = await User.create({
        name: githubUser.name || githubUser.login,
        email,
        githubId: githubUser.id.toString(),
        avatar: githubUser.avatar_url,
      });
    } else if (!user.githubId) {
      user.githubId = githubUser.id.toString();
      if (!user.avatar) user.avatar = githubUser.avatar_url;
      await user.save();
    }

    const token = user.generateToken();

    res
      .cookie('token', token, cookieOptions)
      .redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (error) {
    next(error);
  }
};

// Get current user profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      return next(err);
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};