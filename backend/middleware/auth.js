import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.json({ success: false, message: 'Not authorized. Login again.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch {
    res.json({ success: false, message: 'Invalid token' });
  }
};

export default authUser;
