import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface Props {
  dietaryPreferences: string;
  setDietaryPreferences: (val: string) => void;
  budget: string;
  setBudget: (val: string) => void;
  numberOfPeople: string;
  setNumberOfPeople: (val: string) => void;
  loading: boolean;
  onGenerate: () => void;
}

export default function GenerateForm({
  dietaryPreferences,
  setDietaryPreferences,
  budget,
  setBudget,
  numberOfPeople,
  setNumberOfPeople,
  loading,
  onGenerate,
}: Props) {
  return (
    <Card className="bg-card border-border border shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          🧾 Generate Your Shopping List
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Fill in your preferences to tailor the list.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <FormInput
          id="dietaryPreferences"
          label="Dietary Preferences"
          value={dietaryPreferences}
          onChange={setDietaryPreferences}
          placeholder="e.g., vegetarian, gluten-free"
        />
        <FormInput
          id="budget"
          label="Budget"
          value={budget}
          onChange={setBudget}
          placeholder="e.g., $100"
        />
        <FormInput
          id="numberOfPeople"
          label="Number of People"
          value={numberOfPeople}
          onChange={setNumberOfPeople}
          placeholder="e.g., 4"
          type="number"
        />
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button disabled={loading} onClick={onGenerate} className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Generate"
            )}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}

function FormInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
