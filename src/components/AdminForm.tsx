
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlayerType } from "@/types/player";

interface AdminFormProps {
  onAddPlayer: (player: PlayerType) => void;
}

export function AdminForm({ onAddPlayer }: AdminFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    role: "batsman",
    team: "",
    basePrice: 1000000, // 10 Lakh default
    matches: 0,
    runs: 0,
    wickets: 0,
    imageUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "basePrice" || name === "matches" || name === "runs" || name === "wickets" 
        ? parseInt(value) 
        : value
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.team) {
      toast({
        title: "Error",
        description: "Name and team are required fields",
        variant: "destructive"
      });
      return;
    }

    const newPlayer: PlayerType = {
      id: Date.now().toString(),
      name: formData.name,
      role: formData.role === "batsman" ? "Batsman" :
            formData.role === "bowler" ? "Bowler" :
            formData.role === "all-rounder" ? "All-Rounder" : "Wicketkeeper",
      team: formData.team,
      basePrice: formData.basePrice,
      matches: formData.matches,
      runs: formData.runs,
      wickets: formData.wickets,
      imageUrl: formData.imageUrl || "/placeholder.svg",
    };

    onAddPlayer(newPlayer);
    
    toast({
      title: "Player Added",
      description: `${formData.name} has been added to the catalogue`
    });

    // Reset form
    setFormData({
      name: "",
      role: "batsman",
      team: "",
      basePrice: 1000000,
      matches: 0,
      runs: 0,
      wickets: 0,
      imageUrl: "",
    });
  };

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Admin Mode</CardTitle>
        <CardDescription>Add a new player to the catalogue</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Player Name*</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter player name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Team*</label>
              <Input
                name="team"
                value={formData.team}
                onChange={handleInputChange}
                placeholder="Enter team name"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Player Role*</label>
              <Select
                value={formData.role}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="batsman">Batsman</SelectItem>
                  <SelectItem value="bowler">Bowler</SelectItem>
                  <SelectItem value="all-rounder">All-Rounder</SelectItem>
                  <SelectItem value="wicketkeeper">Wicketkeeper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Base Price (₹)*</label>
              <Input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleInputChange}
                min="100000"
                step="100000"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Matches</label>
              <Input
                type="number"
                name="matches"
                value={formData.matches}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Runs</label>
              <Input
                type="number"
                name="runs"
                value={formData.runs}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Wickets</label>
              <Input
                type="number"
                name="wickets"
                value={formData.wickets}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full">Add Player</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
