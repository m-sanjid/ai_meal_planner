import { Response } from 'express';
import { ShoppingListRequest, ShoppingListResponse } from '../models/ShoppingList';
import type { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY!;
if (!apiKey) throw new Error('GEMINI_API_KEY environment variable not set.');
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateShoppingList = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { dietaryPreferences, budget, numberOfPeople } = req.body as ShoppingListRequest;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Construct the Gemini prompt
    const prompt = `Generate a detailed shopping list in valid JSON (no markdown) for a person with the following preferences:
- Dietary Preferences: ${dietaryPreferences}
- Budget: $${budget}
- Number of People: ${numberOfPeople}
Group items by category (e.g., Produce, Dairy, Pantry, etc). Each item should have a name, quantity, and category. Example:
{
  "items": [
    { "name": "Apples", "quantity": "4", "category": "Produce" },
    { "name": "Milk", "quantity": "2 liters", "category": "Dairy" }
  ]
}`;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    if (!responseText) throw new Error('AI failed to generate a response.');
    responseText = responseText.replace(/```json|```/g, '').trim();

    let aiList: ShoppingListResponse;
    try {
      aiList = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseText, parseError);
      throw new Error('AI returned invalid JSON.');
    }

    res.json(aiList);
  } catch (error: any) {
    console.error('Error generating shopping list:', error);
    res.status(500).json({ error: error.message || 'Failed to generate shopping list' });
  }
};