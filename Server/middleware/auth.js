import jwt from 'jsonwebtoken';
export const protect = (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next(); // Continue to the route
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

