import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Settings, LogOut, ChevronDown } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: "admin" | "client";
  userAvatar?: string;
  onLogout?: () => void;
}

const DashboardHeader = ({
  userName = "John Doe",
  userRole = "admin",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  onLogout = () => {},
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">DocuFlow</span>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            {userRole === "admin" && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[200px] p-2">
                      <NavigationMenuLink
                        className="block px-2 py-1 hover:bg-gray-100 rounded-md"
                        href="/templates/upload"
                      >
                        Upload Template
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block px-2 py-1 hover:bg-gray-100 rounded-md"
                        href="/templates/manage"
                      >
                        Manage Templates
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Documents</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[200px] p-2">
                      <NavigationMenuLink
                        className="block px-2 py-1 hover:bg-gray-100 rounded-md"
                        href="/documents/history"
                      >
                        Document History
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block px-2 py-1 hover:bg-gray-100 rounded-md"
                        href="/documents/generate"
                      >
                        Generate Document
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </>
            )}

            {userRole === "client" && (
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  href="/documents"
                >
                  My Documents
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{userName}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-600"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
