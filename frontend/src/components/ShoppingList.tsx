import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ShoppingItem {
  name: string;
  quantity: string;
  category: string;
}

const ShoppingList: React.FC = () => {
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [budget, setBudget] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const handleGenerateList = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch("/api/shopping-list/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dietaryPreferences,
          budget,
          numberOfPeople,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate shopping list");
      }

      const data = await response.json();
      setShoppingList(data.items);
      toast.success("Shopping list generated successfully");
    } catch (error) {
      console.error("Error generating shopping list:", error);
      toast.error("Failed to generate shopping list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Shopping List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
            <Input
              id="dietaryPreferences"
              value={dietaryPreferences}
              onChange={(e) => setDietaryPreferences(e.target.value)}
              placeholder="e.g., vegetarian, gluten-free"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g., $100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numberOfPeople">Number of People</Label>
            <Input
              id="numberOfPeople"
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              placeholder="e.g., 4"
            />
          </div>
          <Button
            onClick={handleGenerateList}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate List"
            )}
          </Button>
        </CardContent>
      </Card>

      {shoppingList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Shopping List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                shoppingList.reduce((acc, item) => {
                  if (!acc[item.category]) {
                    acc[item.category] = [];
                  }
                  acc[item.category].push(item);
                  return acc;
                }, {} as Record<string, ShoppingItem[]>)
              ).map(([category, items]) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-semibold capitalize">{category}</h3>
                  <ul className="space-y-1">
                    {items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`item-${index}`}
                          className="rounded"
                        />
                        <label
                          htmlFor={`item-${index}`}
                          className="text-sm"
                        >
                          {item.quantity} {item.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShoppingList; 