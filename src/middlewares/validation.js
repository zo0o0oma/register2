// import fs from 'fs';
const validation = (req, res, next) => {
  const { name, password, email, Confirmation } = req.body;
  // const thumbnail = req.file.path;

  if (typeof req.file === 'undefined' || typeof req.body === 'undefined') {
    return res.status(400).json({
      errors: 'problem with sending data',
    });
  }
  //validation of empty fields

  if (!name || !password || !email || !Confirmation) {
    return res.status(400).json({
      sucess: false,
      message: 'all fields are required',
    });
  }

  //validation of MIMETYPE
  if (!req.file.mimetype.includes('jpeg') && !req.file.mimetype.includes('png') && !req.file.mimetype.includes('jpg')) {
    // fs.unlinkSync(req.file.path);
    return res.status(400).json({
      errors: 'file not support',
    });
  }

  //validation of dimensions
  if (req.file.size > 1024 * 1024) {
    // fs.unlinkSync(req.file.path);
    return res.status(400).json({
      errors: 'File is Too large',
    });
  }

  //validation of password
  if (password !== Confirmation) {
    // fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Confirm password did not match. ' });
  }

  //validation of empty fields
  if (!validateEmail(email)) {
    // fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Invalid emails.' });
  }
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  next();
};
export default validation;
