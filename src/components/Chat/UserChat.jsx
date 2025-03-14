import { SlideLeft } from "../Animations/animation";

const UserChat = ({ message }) => {
  return (
    <SlideLeft className="p-3 mb-4  flex flex-col  shadow-lg gap-4 rounded-md rounded-tr-none bg-gradient-to-r  from-indigo-600 to-purple-700 max-w-60 ml-auto">
      <p className="text-sm">
        Question {message.qid}): {message.answer}
      </p>
      <div className="text-right  text-sm">
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </SlideLeft>
  );
};

export default UserChat;
