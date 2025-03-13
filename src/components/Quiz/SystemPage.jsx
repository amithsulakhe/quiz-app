import { cn } from "@/lib/utils";
import { FadeIn } from "../Animations/animation";
import { useTheme } from "../theme-provider";

const SystemPage = ({ message }) => {
  const { theme } = useTheme();
  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-1 shadow-md rounded-lg p-3  max-w-96 m-auto  mb-4",
        theme === "light" ? "bg-gray-100" : "bg-[#303030]"
      )}
    >
      <p className="text-lg">Quiz Started</p>
      <div className="text-right text-muted-foreground text-sm">
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </FadeIn>
  );
};

export default SystemPage;
