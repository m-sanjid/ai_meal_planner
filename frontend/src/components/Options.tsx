import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Options = ({
  type,
  onChange,
}: {
  type: string;
  onChange: (value: string) => void;
}) => {
  return (
    <>
      <Select onValueChange={onChange}>
        <SelectTrigger className="mt-4 bg-white p-4 dark:bg-black">
          <SelectValue
            placeholder={
              type === "diet" ? "Select a diet type" : "Select a goal"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{type === "diet" ? "Diet" : "Goal"}</SelectLabel>

            {type === "diet"
              ? list1.map((i) => (
                  <SelectItem key={i.value} value={i.value}>
                    {i.label}
                  </SelectItem>
                ))
              : list2.map((i) => (
                  <SelectItem key={i.value} value={i.value}>
                    {i.label}
                  </SelectItem>
                ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default Options;

const list1 = [
  {
    value: "vegan",
    label: "Vegan",
  },
  {
    value: "vegetarian",
    label: "Vegetarian",
  },
  {
    value: "paleo",
    label: "Paleo",
  },
  {
    value: "keto",
    label: "Keto",
  },
  {
    value: "mediterranean",
    label: "Mediterranean",
  },
  {
    value: "low_carb",
    label: "Low Carb",
  },
  {
    value: "high_protein",
    label: "High Protein",
  },
];

const list2 = [
  {
    value: "weight_loss",
    label: "Weight Loss",
  },
  {
    value: "muscle_gain",
    label: "Muscle Gain",
  },
  {
    value: "maintenance",
    label: "Maintenance",
  },
  {
    value: "athletic_performance",
    label: "Athletic Performance",
  },
];
