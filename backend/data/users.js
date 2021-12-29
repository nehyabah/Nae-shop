import bcrypt from 'bcryptjs'

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Nae Abah",
    email: "nae@example.com",
    password: bcrypt.hashSync("123456", 10),
    
  },
  {
    name: "Moro Dada",
    email: "moro@example.com",
    password: bcrypt.hashSync("123456", 10),
   
  },
  {
    name: "Tola Toye",
    email: "tola@example.com",
    password: bcrypt.hashSync("123456", 10),
    
  },
];

export default users
