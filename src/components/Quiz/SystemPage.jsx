import { FadeIn } from "../Animations/animation";

const SystemPage = ({message}) => {
  return (
    <FadeIn
     className="flex flex-col gap-1 shadow-md rounded-lg p-3 bg-gray-100 max-w-96 m-auto  mb-4 ">
        <p className="text-lg">Quiz Started</p>
        <div className="text-right text-muted-foreground text-sm">
        {new Date(message.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>
    </FadeIn>
  );
};

export default SystemPage;
