const db = require("../config/db");

exports.getUsers = (callback) => {
  db.query("SELECT * FROM users", callback);
};

exports.createUser = (user, callback) => {
  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [user.name, user.email],
    callback
  );
};


xcfvghjm localStorage
]]FileSystemWritableFileStream
xmoxx
