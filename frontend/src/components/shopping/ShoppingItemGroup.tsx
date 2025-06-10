import { motion } from "motion/react";

interface Item {
  name: string;
  quantity: string;
  category: string;
}

export default function ShoppingItemGroup({
  category,
  items,
}: {
  category: string;
  items: Item[];
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-primary text-lg font-semibold capitalize">
        {category}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="hover:bg-muted/30 flex items-center gap-2 rounded-md px-2 py-1 transition"
          >
            <motion.input
              whileTap={{ scale: 0.85 }}
              type="checkbox"
              id={`item-${category}-${index}`}
              className="accent-primary h-4 w-4 rounded transition-all"
            />
            <label
              htmlFor={`item-${category}-${index}`}
              className="text-foreground cursor-pointer text-sm"
            >
              <span className="font-medium">{item.quantity}</span> {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
