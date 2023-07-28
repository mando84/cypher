const asyncHandler = require("express-async-handler");

const Message = require("../models/messageModel");

const getMessages = asyncHandler(async (req, res) => {
  console.log("before Message.find()");
  const messages = await Message.find({ user: req.user.id });
  console.log("after Message.find()");
  res.status(200).json(messages);
});

const setMessage = asyncHandler(async (req, res) => {
  console.log("in messageController setMessage()");
  console.log(`req.body.message: ${req.body.encryptedMessage}`);
  console.log(`req.body.message: ${req.body.messageKey}`);
  if (!req.body.encryptedMessage) {
    res.status(400);
    throw new Error("Please add a test field");
  }
  console.log("After if(!req.body.text)");

  const message = await Message.create({
    message: req.body.encryptedMessage,
    key: req.body.messageKey,
    user: req.user.id,
  });
  console.log("before res.status");
  res.status(200).json(message);
});

const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(400);
    throw new Error("Message not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (message.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updateMessage = await Message.findByIdAndUpdata(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateMessage);
});

const deleteMessage = asyncHandler(async (req, res) => {
  console.log("in deletemessage before message");
  const message = await Message.findById(req.params.id);
  console.log("in deletemessage after message");
  console.log(`message: ${message}`);
  if (!message) {
    res.status(400);
    throw new Error("Message not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  if (message.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  console.log(`message before remove(): ${message}`);
  console.log(`req.params.id: ${req.params.id}`);
  console.log("lool");
  await message.deleteOne();

  console.log("after message.remove()");

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMessages,
  setMessage,
  updateMessage,
  deleteMessage,
};
