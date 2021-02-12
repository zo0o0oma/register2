import bcrypt from 'bcryptjs';
import User from '../models/user.js';
const createRegister = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const { filename } = req.file;
    const existUser = await User.findOne({ email });

    if (!existUser) {
      const hashPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        name,
        password: hashPassword,
        email,
        thumbnail: filename,
      });
      return res.json(user);
    }
    return res.status(400).json({
      message: 'email/user already exist do you want login instead',
    });
  } catch (error) {
    throw Error('Error while registering a new user');
  }
};
export default createRegister;
