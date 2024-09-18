import Messages from './Messages';
import MessageInput from './MessageInput';
import useConversation from '../../zustand/useConversation';
import { useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
// import { TiMessages } from 'react-icons/ti';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    //cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <FirstPage />
      ) : (
        <>
          {/* HEADER */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To: </span>{' '}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const FirstPage = () => {
  const { authUser } = useAuthContext();
  return (
    <div className=" flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋! {authUser.fullName}</p>
        <p>Select a chat to start texting</p>
        <img
          src="../../../../public/inu.png"
          alt=""
          className="w-36 h-36 rounded"
        />
        {/* <TiMessages className="text-3xl md:text-6xl text-center" /> */}
      </div>
    </div>
  );
};
