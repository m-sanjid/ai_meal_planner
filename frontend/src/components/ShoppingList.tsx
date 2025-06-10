import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useReactToPrint } from "react-to-print";
import { PageLayout } from "./layout/PageLayout";

interface ShoppingItem {
  name: string;
  quantity: string;
  category: string;
}

const FadeInUp: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const ShoppingList: React.FC = () => {
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [budget, setBudget] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Shopping List",
  });

  const handleGenerateList = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/shopping-list/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dietaryPreferences, budget, numberOfPeople }),
      });

      if (!response.ok) throw new Error("Failed to generate shopping list");
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

  const grouped = shoppingList.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, ShoppingItem[]>,
  );

  return (
    <PageLayout>
      <div className="space-y-6">
        <FadeInUp>
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  "Generate List"
                )}
              </Button>
            </CardContent>
          </Card>
        </FadeInUp>

        {shoppingList.length > 0 && (
          <FadeInUp>
            <div className="flex justify-end">
              <Button variant="outline" onClick={handlePrint}>
                🖨️ Export to PDF
              </Button>
            </div>
            <Card
              ref={componentRef}
              className="print:bg-white print:text-black"
            >
              <CardHeader>
                <CardTitle>Shopping List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="text-lg font-semibold capitalize">
                        {category}
                      </h3>
                      <ul className="space-y-1">
                        {items.map((item, index) => (
                          <motion.li
                            key={`${category}-${index}`}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2"
                          >
                            <motion.input
                              type="checkbox"
                              className="h-4 w-4 rounded"
                              whileFocus={{
                                outline: "2px solid var(--primary)",
                              }}
                            />
                            <label className="text-sm">
                              {item.quantity} {item.name}
                            </label>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeInUp>
        )}
      </div>
    </PageLayout>
  );
};

export default ShoppingList;
