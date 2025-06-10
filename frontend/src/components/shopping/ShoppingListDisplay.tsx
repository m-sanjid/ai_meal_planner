import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ShoppingItemGroup from "./ShoppingItemGroup";
import { motion } from "motion/react";

interface Item {
  name: string;
  quantity: string;
  category: string;
}

export default function ShoppingListDisplay({ items }: { items: Item[] }) {
  const grouped = items.reduce(
    (acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, Item[]>,
  );

  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle>Shopping List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(grouped).map(([category, items]) => (
            <ShoppingItemGroup key={category} category={category} items={items} />
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
