import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user';

dotenv.config();

mongoose.Promise = global.Promise;

export default {
  /**
   * creates a new user
   * @param {object}  req request object
   * @param {object}  res server response object
   * @return {void}
   */
  createUser(req, res) {
    const promise = User.findOne({
      email: req.body.email.trim().toLowerCase()
    }).exec();
    promise.then((email) => {
      if (email) {
        return res.status(409).json({
          status: 'Failed',
          message: 'This user already exist'
        });
      }
      User.findOne({
        username: req.body.username.trim().toLowerCase()
      }).exec()
        .then((username) => {
          if (username) {
            return res.status(409).json({
              status: 'Failed',
              message: 'This username is already taken'
            });
          }
          const user = new User({
            username: req.body.username.trim().toLowerCase(),
            password: req.body.password,
            email: req.body.email.trim().toLowerCase()
          });
          user.save().then((newUser) => {
            const token = jwt.sign(
              {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
              },
              'secret',
              { expiresIn: 86400 }
            );
            return res.status(201).json({
              status: 'Success',
              message: 'User created successfully',
              user: newUser,
              token
            });
          })
            .catch((error) => {
              res.status(500).json({
                status: 'Fail',
                message: error.message
              });
            });
        });
    });
  }
};

