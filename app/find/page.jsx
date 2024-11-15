import { getAllFood, getAllFoodFromLocation } from "@/queries/food";
import FoodList from "./_components/FoodList";

// Mock data for available food items

export default async function FindFoodPage() {
  const allFood = await getAllFood();

  // const allFoodLocation = await getAllFoodFromLocation();
  // console.log(allFoodLocation);

  return <FoodList allFood={allFood?.data} />;
}
