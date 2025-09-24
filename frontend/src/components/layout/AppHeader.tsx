"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileMenu } from "@/components/auth/ProfileMenu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export function AppHeader() {
  const { user, loading, logout } = useAuth();
  console.log("Auth State:", { user, loading });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-16 items-center">
        <Link href="/" className="mr-6 ml-6 flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="MediQuery Logo"
            className="h-6 w-6 text-primary"
          />
          <span className="font-bold sm:inline-block text-lg">MediQuery</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center space-x-2 mr-4 xl:mr-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          {/* User Authentication Section - Desktop */}
          <div className="flex items-center space-x-4 ml-4">
            {!loading &&
              (user ? (
                <div className="flex items-center space-x-3">
                  {/* <div className="hidden lg:flex items-center space-x-2">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm font-medium text-foreground">
                      {user.displayName ||
                        user.email?.split("@")[0] ||
                        "User"}
                    </span>
                  </div> */}
                  <ProfileMenu user={user} />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm">Register</Button>
                  </Link>
                </div>
              ))}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-end gap-2 md:hidden mr-2">
          {!loading && user && <ProfileMenu user={user} />}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="sr-only">
                  Mobile Navigation Menu
                </SheetTitle>
                <div className="flex flex-col space-y-6">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 mb-4"
                  >
                    <img
                      src="/logo.png"
                      alt="MediQuery Logo"
                      className="h-6 w-6 text-primary"
                    />
                    <span className="font-bold">MediQuery</span>
                  </Link>

                  {/* User Info in Mobile Menu */}
                  {!loading && user && (
                    <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                      {user.photoURL && (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {user.displayName ||
                            user.email?.split("@")[0] ||
                            "User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Links */}
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary py-2"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Auth Buttons */}
                  {!loading &&
                    (user ? (
                      <div className="space-y-2 pt-4 border-t">
                        <Link href="/under-construction">
                          <Button
                            variant="outline"
                            className="w-full justify-center"
                          >
                            Profile Settings
                          </Button>
                        </Link>
                        <Button
                          onClick={logout}
                          variant="destructive"
                          className="w-full"
                        >
                          Log Out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-4 border-t">
                        <Link href="/auth/login">
                          <Button variant="outline" className="w-full mb-2">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/auth/register">
                          <Button className="w-full">
                            Register
                          </Button>
                        </Link>
                      </div>
                    ))}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
