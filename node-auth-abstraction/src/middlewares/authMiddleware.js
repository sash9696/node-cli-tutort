import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('token',{token,headers:req.headers })

  const tokenArray = token.split(" ");
  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(tokenArray[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }
};

export default authMiddleware;
