
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="dark min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-6 max-w-md animate-fade-in">
        <h1 className="text-9xl font-bold text-gray-700">404</h1>
        <h2 className="text-3xl font-bold text-foreground mt-4">Page not found</h2>
        <p className="text-xl text-muted-foreground mt-2 mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="space-y-3">
          <Link to="/">
            <Button size="lg" className="w-full">
              Return to Home
            </Button>
          </Link>
          <Link to="/vendor-registration">
            <Button variant="outline" className="w-full">
              Register as Vendor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
