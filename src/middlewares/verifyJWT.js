const JWT = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    // const token = req.headers["authorization"];
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwODE5OTI4LCJleHAiOjE3MDA4MjM1Mjh9.2JqxL69Pb292hWTF68dDYMkwQ_VbZyWkkEMfIys-85g`;
    if (!token)
      return res
        .status(400)
        .send({ message: "no token provided / token empty" });

    // const verify = JWT.verify(token.split(" ")[1], process.env.JWT_SECRET);
    const verify = await JWT.verify(token, process.env.JWT_SECRET);
    if (!verify)
      return res.status(401).send({ message: "failed to verify token" });

    req.userID = verify;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "error internal",
      data: error.message,
    });
  }
};

module.exports = { verifyJWT };
