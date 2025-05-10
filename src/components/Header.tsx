
import { Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAdminToggle: () => void;
  isAdmin: boolean;
}

export function Header({ searchQuery, onSearchChange, onAdminToggle, isAdmin }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <img src="/cricket-ball.svg" alt="Cricket Auction" className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Cricket Auction</h1>
        </div>
        
        <div className="flex items-center space-x-4 max-w-sm w-full">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search players..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className={isAdmin ? "bg-primary/20" : ""}
            onClick={onAdminToggle}
            title="Admin Mode"
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
