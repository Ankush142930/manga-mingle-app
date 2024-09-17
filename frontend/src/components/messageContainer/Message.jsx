import { useAuthContext } from '../../context/AuthContext';
import extractTime from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  //check for sender of the message
  const fromMe = message.senderId === authUser._id;

  //class to switch the chat-end or chat-start
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';

  //dynamically getting the profile picture
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const formattedTime = extractTime(message.createdAt);
  //background color for the text
  const bubbleBgColor = fromMe ? 'bg-sky-500' : 'bg-gray-700';

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
