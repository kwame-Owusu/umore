import { useState } from "react";
import { LogOut, Menu, X, Settings, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import SettingsModal from "./SettingsModal";
import logo from "../assets/umore_logo.svg";
import { Link, useNavigate } from "react-router";
import { useTheme } from "../lib/theme";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-background border-b border-border w-full fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to={"/"}>
            <img src={logo} alt="Umore Logo" className="size-12 md:h-12" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="size-5" />
              ) : (
                <Sun className="size-5" />
              )}
            </Button>
            <Settings
              className="size-5 text-foreground hover:text-accent-foreground cursor-pointer transition-colors"
              onClick={() => setSettingsOpen(true)}
              aria-label="Open settings"
            />
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="cursor-pointer"
              aria-label="Sign out"
            >
              Sign Out
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            {menuOpen ? (
              <X
                className="h-6 w-6 text-foreground cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <Menu
                className="h-6 w-6 text-foreground cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
            )}
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center bg-background border-t border-border py-3 space-y-3 rounded-b-2xl shadow-sm">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="default"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
            <Button
              onClick={() => setSettingsOpen(true)}
              variant="ghost"
              size="sm"
              aria-label="Open settings"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </nav>
        </div>
      </div>
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}

export default NavBar;
