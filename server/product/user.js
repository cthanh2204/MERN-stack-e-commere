import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin", 10),
  },

  {
    name: "Test User",
    email: "test@test.com",
    password: bcrypt.hashSync("test", 10),
  },
  {
    name: "Chieu Thanh",
    email: "cthanh2204@gmail.com",
    password: bcrypt.hashSync("thanh2204", 10),
  },
];

export default users;
