import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const HelpSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed right-8 bottom-8 h-12 w-12 rounded-full shadow-lg"
        >
          ?
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Help & Information</SheetTitle>
          <SheetDescription>
            Learn how to get the most out of your meal planner.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6 px-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How are meals generated?</AccordionTrigger>
              <AccordionContent>
                Our AI analyzes your goals, dietary preferences, and other
                factors to create personalized meal plans that align with your
                nutritional needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can I customize my meal plans?
              </AccordionTrigger>
              <AccordionContent>
                Yes! You can regenerate individual meals, exclude ingredients,
                set calorie targets, and add specific notes to customize your
                meal plan.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What's included in Pro?</AccordionTrigger>
              <AccordionContent>
                Pro users get unlimited meal generation, shopping list exports,
                detailed nutrition breakdowns, and weekly meal prep guides.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="pt-4">
            <h4 className="mb-2 font-medium">Quick Tips</h4>
            <ul className="space-y-2">
              <li className="flex items-start text-sm">
                <span className="text-primary mr-2">•</span>
                Use Advanced Options for more specific meal requirements
              </li>
              <li className="flex items-start text-sm">
                <span className="text-primary mr-2">•</span>
                Save your favorite meals for quick access
              </li>
              <li className="flex items-start text-sm">
                <span className="text-primary mr-2">•</span>
                Export your meal plan to share or print
              </li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HelpSheet;
