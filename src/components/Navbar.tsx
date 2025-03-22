
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Video, Upload, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-lg transition-opacity hover:opacity-80"
          >
            <Video className="w-6 h-6 text-primary" />
            <span className="hidden sm:inline">Video Editor Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className="rounded-full transition-all duration-300"
              >
                Home
              </Button>
            </Link>
            <Link to="/workspace">
              <Button
                variant={isActive("/workspace") ? "default" : "ghost"}
                size="sm"
                className="rounded-full transition-all duration-300"
              >
                Workspace
              </Button>
            </Link>
            <Link to="/workspace">
              <Button
                size="sm"
                className="ml-2 rounded-full transition-all duration-300 bg-primary text-white hover:bg-primary/90"
              >
                <Upload className="w-4 h-4 mr-1" /> Upload Video
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 animate-fade-in">
          <nav className="container px-4 py-3 flex flex-col gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/")
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </div>
            </Link>
            <Link
              to="/workspace"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/workspace")
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5" />
                <span>Workspace</span>
              </div>
            </Link>
            <Link
              to="/workspace"
              className="mt-2 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button className="w-full rounded-lg justify-start gap-3">
                <Upload className="w-5 h-5" />
                <span>Upload Video</span>
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
