import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import logo from "../assets/umore_logo.svg";
import { Link, useNavigate } from "react-router";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <div className="hidden md:flex items-center">
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="cursor-pointer"
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
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
