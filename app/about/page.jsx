import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About FoodShare</h1>
      <div className="prose prose-lg">
        <p>
          FoodShare is a community-driven platform dedicated to reducing food
          waste and helping those in need. Our mission is to connect people with
          excess food to those who can use it, creating a more sustainable and
          caring community.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Goals</h2>
        <ul>
          <li>Reduce food waste in our communities</li>
          <li>Provide a platform for easy food sharing</li>
          <li>Connect neighbors and build stronger communities</li>
          <li>Promote sustainability and environmental consciousness</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">How It Works</h2>
        <ol>
          <li>Sign up for a FoodShare account</li>
          <li>
            List your excess food items or search for available food in your
            area
          </li>
          <li>Arrange pick-up or drop-off with other users</li>
          <li>Share your experience and help grow the community</li>
        </ol>
        <p className="mt-6">
          Join us in our mission to create a world where no food goes to waste
          and everyone has access to nutritious meals.
        </p>
        <div className="mt-8">
          <Button className="text-white" asChild>
            <Link href="/share">Start Sharing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
