import { getAllFood, getAllFoodFromLocation } from "@/queries/food";
import FoodList from "./_components/FoodList";
import { getLoggedInUser, getUserById } from "@/queries/user";

// Mock data for available food items

export default async function FindFoodPage() {
  const allFood = await getAllFood();

  // const allFoodLocation = await getAllFoodFromLocation();
  // console.log(allFoodLocation);

  const { data, error } = await getLoggedInUser();

  // console.log(data?.user?.id);

  const { data: userData, error: userError } = await getUserById(
    data?.user?.id
  );
  // console.log(userData[0]?.radius);

  return (
    <FoodList
      allFood={allFood?.data}
      userRadius={userData && userData[0]?.radius}
    />
  );
}
