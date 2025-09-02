import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Mobile-optimized Header */}
          <header className="h-14 md:h-16 flex items-center justify-between px-4 md:px-6 border-b border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="hidden sm:block">
                <h2 className="font-semibold text-foreground">Shop Chlao</h2>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="relative h-9 w-9">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-warning rounded-full text-xs"></span>
              </Button>
              
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hidden sm:flex"
              >
                <Plus className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </header>

          {/* Main Content with mobile padding */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile-optimized Floating Action Button */}
        <Button
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 z-50 touch-manipulation"
        >
          <Plus className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </div>
    </SidebarProvider>
  );
}