export interface ShoppingItem {
  name: string;
  quantity: string;
  category: string;
}

export interface ShoppingListRequest {
  dietaryPreferences: string;
  budget: string;
  numberOfPeople: string;
}

export interface ShoppingListResponse {
  items: ShoppingItem[];
} 