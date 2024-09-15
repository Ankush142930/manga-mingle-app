import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';

//GET MESSAGES CONTROLLER FUNCTION
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    //Find the conversation b/w the sender & the receiver, then populate the messages array with message object instead of messageId references
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate('messages'); //Using populate method to get an array of message not references

    //Handling no conversation situation
    if (!conversation) return res.status(200).json([]);

    //setting the messages array and then finally sending the response
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log('Error in getMessages Controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//SEND MESSAGE CONTROLLER FUNCTION
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    //find the conversation between the sender and the receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    //for the very first conversation creating the conversation schema instance
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    //creating the message schema instance
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    //if there is a new message, then add it to the conversation arrays
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //socket.io functionality will go here

    //saving the conversation and the message into the database
    // await conversation.save();
    // await newMessage.save();
    //Optimizing these two lines of code which will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    //finally send an appropriate response
    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage Controller: ', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
