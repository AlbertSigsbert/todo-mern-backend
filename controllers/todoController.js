const Todo = require("../models/Todo");
const User = require("../models/User");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");


//get all todos
const getTodos = async (req, res) => {
  const user_id = req.user._id;
  const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(todos);
};

//get single todo
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Todo Id" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ message: "Todo Not Found" });
  }

  res.status(200).json(todo);
};

//create a new todo
const createTodo = async (req, res) => {
  const { title, details } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!details) {
    emptyFields.push("details");
  }
 
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all necessary the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const todo = await Todo.create({ title,details, user_id });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Todo Id" });
  }

  const todo = await Todo.findOneAndDelete({ _id: id });

  if (!todo) {
    return res.status(404).json({ message: "Todo Not Found" });
  }

  res.status(200).json(todo);
};

//update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Todo Id" });
  }

  const todo = await Todo.findOneAndUpdate({ _id: id }, { ...req.body }, {new: true});

  if (!todo) {
    return res.status(404).json({ message: "Todo Not Found" });
  }



  if (!todo) {
    return res.status(404).json({ message: "Todo Not Found" });
  }

  res.status(200).json(todo);
};


//send invitation
const sendInvite = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Todo Id" });
  }

  const userId = req.user._id

  const todo = await Todo.findById(id);

  const user = await User.findById(userId);

  

  const otherUsers = await  User.find({_id: {$ne: userId}});

  let emails = otherUsers.map(item => item.email).join(",");
 
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ae1e74c1129cab",
      pass: "8a26ca1073e77b"
    }
  });

  
  // send mail with defined transport object
  let info = await transport.sendMail({
    from: `${user.email}`, // sender address
    to: `${emails}`, // list of receivers
    subject: "Hello ✔", 
    text: `I am inviting you to work with me in this todo, ${todo.title}`, // plain text body

  });


  res.status(200).json({message:"Invite sent successfully"});
};



module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  sendInvite
};
