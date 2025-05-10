
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { PlayerGrid } from "@/components/PlayerGrid";
import { AdminForm } from "@/components/AdminForm";
import { samplePlayers } from "@/data/players";
import { PlayerType } from "@/types/player";

const Index = () => {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartPlayers, setCartPlayers] = useState<PlayerType[]>([]);

  useEffect(() => {
    // Normally here we would fetch data from Firebase
    // For now, we'll use the sample data
    setPlayers(samplePlayers);
  }, []);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...players];
    
    // Apply role filter
    if (selectedRole !== "all") {
      result = result.filter(player => 
        player.role.toLowerCase() === selectedRole.replace("-", " ")
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(player =>
        player.name.toLowerCase().includes(query) ||
        player.team.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-desc":
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "runs-desc":
        result.sort((a, b) => b.runs - a.runs);
        break;
      case "wickets-desc":
        result.sort((a, b) => b.wickets - a.wickets);
        break;
      default:
        break;
    }
    
    setFilteredPlayers(result);
  }, [players, selectedRole, searchQuery, sortBy]);

  const handleAddToCart = (player: PlayerType) => {
    if (cartPlayers.some(p => p.id === player.id)) {
      // Remove from cart if already in cart
      setCartPlayers(cartPlayers.filter(p => p.id !== player.id));
    } else {
      // Add to cart
      setCartPlayers([...cartPlayers, player]);
    }
  };

  const handleAddPlayer = (player: PlayerType) => {
    setPlayers([...players, player]);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRole("all");
    setSortBy("name-asc");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAdminToggle={() => setIsAdmin(!isAdmin)}
        isAdmin={isAdmin}
      />
      
      <div className="container mx-auto px-4">
        <FilterBar 
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={resetFilters}
        />
        
        {isAdmin && <AdminForm onAddPlayer={handleAddPlayer} />}
        
        <PlayerGrid 
          players={filteredPlayers} 
          cartPlayers={cartPlayers} 
          onAddToCart={handleAddToCart} 
        />
      </div>
    </div>
  );
};

export default Index;
