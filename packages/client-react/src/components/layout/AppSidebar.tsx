
import {
  Banknote,
  BarChart4,
  CreditCard,
  Download,
  Home,
  Settings,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { useUser } from "@clerk/clerk-react";

export function AppSidebar() {
  const { isSignedIn, user } = useUser()
  return (
    <Sidebar>
      <SidebarHeader className="border-b-0">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Banknote className="w-8 h-8 text-facebook" />
            <h1 className="font-bold text-xl text-facebook">Boilerplate</h1>
          </div>
          <p hidden={!isSignedIn} className="text-sm text-gray-500">
            Hi 👋 <span>{user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/accounts">
                    <CreditCard className="h-4 w-4" />
                    <span>Accounts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/transactions">
                    <Banknote className="h-4 w-4" />
                    <span>Transactions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/import">
                    <Download className="h-4 w-4" />
                    <span>Import</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/tags">
                    <Tag className="h-4 w-4" />
                    <span>Tags</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/analytics">
                    <BarChart4 className="h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t-0">
        <div className="flex justify-between items-center px-4 py-4">
          <SidebarMenuButton asChild>
            <Link to="/settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
