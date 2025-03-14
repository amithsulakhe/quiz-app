import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

// header
const Header = () => {
  // custom themes
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

 

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <img
          src={isDark ? "/logo_light.png" : "/logo_light.png"}
          alt="Klimate logo"
          className="h-14"
        />

        <div className="flex gap-4">
          {/* mode */}
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
