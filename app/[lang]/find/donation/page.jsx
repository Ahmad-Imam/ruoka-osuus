import { getAllFood, getAllFoodFromLocation } from "@/queries/food";
import DonationList from "./_components/DonationList";
import { getLoggedInUser, getUserById } from "@/queries/user";

// Mock data for available food items

export default async function FindDonationPage() {
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
    <div>
      <DonationList
        allFood={allFood?.data}
        userRadius={userData && userData[0]?.radius}
      />
    </div>
  );
}
