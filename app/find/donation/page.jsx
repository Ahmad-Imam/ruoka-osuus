import { getAllFood } from "@/queries/food";
import DonationList from "./_components/DonationList";
import { getLoggedInUser, getUserById } from "@/queries/user";

export const metadata = {
  title: "Find Donation",
  description: "Find all Donations",
};

export default async function FindDonationPage() {
  const allFood = await getAllFood();

  const { data, error } = await getLoggedInUser();
  const { data: userData, error: userError } = await getUserById(
    data?.user?.id
  );

  return (
    <div>
      <DonationList
        allFood={allFood?.data}
        userRadius={userData && userData[0]?.radius}
      />
    </div>
  );
}
