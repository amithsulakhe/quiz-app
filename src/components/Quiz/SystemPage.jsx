import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const SystemPage = ({message}) => {
  return (
    <div className="flex flex-col gap-1 mb-4 shadow-md rounded-lg p-3 bg-gray-100 max-w-96 m-auto">
        <p className="text-lg">Quiz Started</p>
        <div className="text-right text-muted-foreground text-sm">
        {new Date(message.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>
    </div>
  );
};

export default SystemPage;
