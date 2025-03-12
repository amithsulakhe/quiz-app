
import { useEffect } from "react";
import { toast } from "sonner";

const OfflineOnlineProvider = ({ children }) => {
  useEffect(() => {
    const handleOnline = () => {
      toast.success("You are back Online", {
        position: "bottom-left",
      });
    };
    const handleOffline = () => {
      toast.error("You are Offline", {
        description: "Changes made now will not be saved",
        position: "bottom-left",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return children;
};

export default OfflineOnlineProvider;
