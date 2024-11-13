import { getAllFood } from "@/queries/food";
import FoodList from "./_components/FoodList";

// Mock data for available food items

export default async function FindFoodPage() {
  const allFood = await getAllFood();

  return <FoodList allFood={allFood?.data} />;
}
