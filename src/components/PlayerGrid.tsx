
import { PlayerCard } from "@/components/PlayerCard";
import { PlayerType } from "@/types/player";

interface PlayerGridProps {
  players: PlayerType[];
  cartPlayers: PlayerType[];
  onAddToCart: (player: PlayerType) => void;
}

export function PlayerGrid({ players, cartPlayers, onAddToCart }: PlayerGridProps) {
  return (
    <div className="w-full py-6">
      {players.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">No players found</h3>
          <p className="text-muted-foreground mt-2">Try changing your filters or search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onAddToCart={onAddToCart}
              isInCart={cartPlayers.some(p => p.id === player.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
