import { cn } from "@/lib/utils";
import { FadeIn } from "../Animations/animation";
import { useTheme } from "../theme-provider";

const SystemChat = ({ message }) => {
  const { theme } = useTheme();
  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-1 shadow-md rounded-lg p-3 m-auto  mb-4",
        theme === "light" ? "bg-gray-100" : "bg-[#303030]",
        message.type === "ai" ? "w-auto" : "max-w-96 "
      )}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: message.type === "ai" ? message.content : "",
        }}
      />
      {message.type !== "ai" && (
        <p className={cn("text-lg")}>{message.content}</p>
      )}
      <div className="text-right text-muted-foreground text-sm">
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </FadeIn>
  );
};

export default SystemChat;
