
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlayerType } from "@/types/player";

interface BudgetEstimatorProps {
  cartPlayers: PlayerType[];
  onRemoveFromCart: (playerId: string) => void;
  onClearCart: () => void;
}

export function BudgetEstimator({ cartPlayers, onRemoveFromCart, onClearCart }: BudgetEstimatorProps) {
  const [budget, setBudget] = useState(80000000); // 8 Crore default
  
  const totalSpent = cartPlayers.reduce((total, player) => total + player.basePrice, 0);
  const remaining = budget - totalSpent;
  const isOverBudget = remaining < 0;
  
  const formatAmount = (amount: number): string => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(2)} L`;
    }
    return amount.toLocaleString();
  };
  
  return (
    <Card className="sticky top-[5rem] my-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Budget Estimator
          <Badge variant={isOverBudget ? "destructive" : "default"}>
            {cartPlayers.length} Players
          </Badge>
        </CardTitle>
        <CardDescription>Manage your team budget</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full"
              placeholder="Your budget in ₹"
            />
          </div>
          
          <div className="flex flex-col space-y-1.5">
            <div className="flex justify-between">
              <span className="text-sm">Budget:</span>
              <span className="font-semibold">{formatAmount(budget)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Spent:</span>
              <span className="font-semibold">{formatAmount(totalSpent)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Remaining:</span>
              <span className={`font-semibold ${isOverBudget ? "text-destructive" : "text-secondary"}`}>
                {formatAmount(remaining)}
              </span>
            </div>
          </div>
          
          {cartPlayers.length > 0 ? (
            <div className="max-h-60 overflow-y-auto space-y-2">
              {cartPlayers.map((player) => (
                <div 
                  key={player.id} 
                  className="flex items-center justify-between py-2 border-b"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={player.imageUrl || '/placeholder.svg'}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{player.name}</div>
                      <div className="text-xs text-muted-foreground">{formatAmount(player.basePrice)}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => onRemoveFromCart(player.id)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No players added to budget
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onClearCart}
          disabled={cartPlayers.length === 0}
        >
          Clear All
        </Button>
        <div className={`text-sm font-medium ${isOverBudget ? "text-destructive" : ""}`}>
          {isOverBudget 
            ? "Over budget!" 
            : cartPlayers.length > 0 
              ? "Budget OK" 
              : "Add players to cart"}
        </div>
      </CardFooter>
    </Card>
  );
}
