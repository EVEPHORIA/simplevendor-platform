
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const navbarClass = isScrolled
    ? 'fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-lg shadow-sm z-50 transition-all duration-300'
    : 'fixed top-0 left-0 right-0 bg-transparent z-50 transition-all duration-300';

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/evephoria_logo.png" alt="Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              Home
            </Link>
            <Link to="/vendor-registration" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/vendor-registration' ? 'text-primary' : 'text-muted-foreground'}`}>
              Vendor Registration
            </Link>
            <Link to="/event-registration" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/event-registration' ? 'text-primary' : 'text-muted-foreground'}`}>
              Event Registration
            </Link>
            {user && (
              <Link to="/dashboard" className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'}`}>
                Dashboard
              </Link>
            )}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback>
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleLogin}>
                    Sign In
                  </Button>
                  <Button size="sm" onClick={handleLogin}>Get Started</Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} animate-fade-in`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg border-t sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/' ? 'text-primary' : 'text-gray-700'
            } hover:text-primary hover:bg-gray-50`}
          >
            Home
          </Link>
          <Link
            to="/vendor-registration"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/vendor-registration' ? 'text-primary' : 'text-gray-700'
            } hover:text-primary hover:bg-gray-50`}
          >
            Vendor Registration
          </Link>
          <Link
            to="/event-registration"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/event-registration' ? 'text-primary' : 'text-gray-700'
            } hover:text-primary hover:bg-gray-50`}
          >
            Event Registration
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/dashboard' ? 'text-primary' : 'text-gray-700'
              } hover:text-primary hover:bg-gray-50`}
            >
              Dashboard
            </Link>
          )}
          <div className="pt-4 pb-2 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-3 py-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user.photoURL || undefined} />
                  <AvatarFallback>
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2 text-sm">
                  <div className="font-medium">{user.displayName}</div>
                  <Button variant="outline" size="sm" className="mt-1" onClick={handleLogout}>
                    <LogOut className="h-3 w-3 mr-1" />
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Button variant="outline" className="w-full mb-2" onClick={handleLogin}>
                  Sign In
                </Button>
                <Button className="w-full" onClick={handleLogin}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
