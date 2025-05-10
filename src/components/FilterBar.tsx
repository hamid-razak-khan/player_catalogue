
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  onResetFilters: () => void;
  selectedRole: string;
  onRoleChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function FilterBar({ 
  onResetFilters,
  selectedRole,
  onRoleChange,
  sortBy,
  onSortChange
}: FilterBarProps) {
  return (
    <div className="container py-4 flex flex-wrap justify-between items-center gap-4">
      <div className="flex flex-wrap gap-3 items-center">
        <Select value={selectedRole} onValueChange={onRoleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="batsman">Batsman</SelectItem>
            <SelectItem value="bowler">Bowler</SelectItem>
            <SelectItem value="all-rounder">All-Rounder</SelectItem>
            <SelectItem value="wicketkeeper">Wicketkeeper</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="price-asc">Price (Low-High)</SelectItem>
            <SelectItem value="price-desc">Price (High-Low)</SelectItem>
            <SelectItem value="runs-desc">Runs (High-Low)</SelectItem>
            <SelectItem value="wickets-desc">Wickets (High-Low)</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onResetFilters} className="h-10">
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
