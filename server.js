const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


let users = [
  { email: "alice@example.com", password: "alice123" },
  { email: "bob@example.com", password: "bob123" },
  { email: "charlie@example.com", password: "charlie123" },
];


app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});


app.put('/user', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find(user => user.email === email);

  if (user) {
    user.password = password;
    return res.json({ message: "User updated successfully" });
  } else {
    return res.status(404).json({ message: "Email not found" });
  }
});

app.delete('/user', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const index = users.findIndex(user => user.email === email);

  if (index !== -1) {
    users.splice(index, 1);
    return res.json({ message: "User deleted successfully" });
  } else {
    return res.status(404).json({ message: "Email not found" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
