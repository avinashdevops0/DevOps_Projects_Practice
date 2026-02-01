const userService = require("../services/user.service");

exports.getAllUsers = (req, res) => {
  userService.getUsers((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.addUser = (req, res) => {
  userService.createUser(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User created" });
  });
};
