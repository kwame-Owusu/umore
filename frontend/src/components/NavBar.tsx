import { useState } from "react";
import { Settings, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import logo from "../assets/umore_logo.svg";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Today", href: "/today" },
    { name: "Past Entries", href: "/past-entries" },
    { name: "Insights", href: "/insights" },
  ];

  return (
    <div className="bg-background border-b border-border w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src={logo} alt="Umore Logo" className="h-10 w-auto md:h-12" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-8">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className="text-base lg:text-lg text-foreground hover:text-accent-foreground font-medium transition-colors"
                      >
                        {item.name}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <Settings className="h-6 w-6 text-foreground hover:text-accent-foreground cursor-pointer transition-colors" />
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Settings className="h-5 w-5 text-foreground hover:text-accent-foreground cursor-pointer transition-colors" />
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
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-accent-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
