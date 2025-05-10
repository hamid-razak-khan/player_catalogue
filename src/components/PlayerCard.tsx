
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { PlayerType } from "@/types/player";

interface PlayerCardProps {
  player: PlayerType;
  onAddToCart: (player: PlayerType) => void;
  isInCart: boolean;
}

export function PlayerCard({ player, onAddToCart, isInCart }: PlayerCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const roleClass = `role-${player.role.toLowerCase().replace(' ', '-')}`;
  const roleBadgeClass = `role-badge-${player.role.toLowerCase().replace(' ', '-')}`;

  const formatAmount = (amount: number): string => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(2)} L`;
    }
    return amount.toLocaleString();
  };

  return (
    <div 
      className={`bg-background border rounded-lg transition-all duration-200 p-4 flex flex-col items-center ${isInCart ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative mb-3">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 ${roleClass} flex items-center justify-center`}>
          <img
            src={player.imageUrl || '/placeholder.svg'}
            alt={player.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </div>
        <Badge className={`absolute -bottom-1 right-0 ${roleBadgeClass} text-xs`}>
          {player.role}
        </Badge>
      </div>
      
      <h3 className="font-semibold text-center text-base sm:text-lg">{player.name}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground text-center mb-2">{player.team}</p>
      
      <div className="flex justify-center gap-3 mb-3 text-xs">
        <div className="flex flex-col items-center">
          <span className="font-semibold">{player.matches}</span>
          <span className="text-muted-foreground">Matches</span>
        </div>
        
        {player.role !== 'Bowler' && (
          <div className="flex flex-col items-center">
            <span className="font-semibold">{player.runs}</span>
            <span className="text-muted-foreground">Runs</span>
          </div>
        )}
        
        {player.role !== 'Batsman' && player.role !== 'Wicketkeeper' && (
          <div className="flex flex-col items-center">
            <span className="font-semibold">{player.wickets}</span>
            <span className="text-muted-foreground">Wickets</span>
          </div>
        )}
      </div>
      
      <div className="w-full text-center mt-auto">
        <div className="text-xs sm:text-sm font-medium">
          {formatAmount(player.basePrice)}
        </div>
      </div>
    </div>
  );
}
