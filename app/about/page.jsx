import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Users, Utensils, Heart } from "lucide-react";

export const metadata = {
  title: "About",
  description: "About ruoka osuus",
};

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Ruoka Osuus</h1>

      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="cardFull cardFullDark">
          <CardContent className="prose prose-lg pt-6">
            <p className="lead">
              Ruoka Osuus is a community-driven platform dedicated to reducing
              food waste and helping those in need. Our mission is to connect
              people with excess food to those who can use it, creating a more
              sustainable and caring community.
            </p>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Our Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <Card key={index} className="cardFull cardFullDark">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {goal.icon}
                    <span className="ml-2">{goal.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{goal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <Badge variant="secondary" className="mr-4 mt-1">
                  {index + 1}
                </Badge>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <Card className="cardFull cardFullDark">
          <CardContent className="prose prose-lg pt-6">
            <p className="lead text-center">
              Join us in our mission to create a world where no food goes to
              waste and everyone has access to nutritious meals.
            </p>
            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link href="/create/donation">Start Sharing Today</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const goals = [
  {
    icon: <Leaf className="w-6 h-6 text-green-500" />,
    title: "Reduce Food Waste",
    description:
      "Minimize the amount of edible food that ends up in landfills.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    title: "Build Community",
    description: "Connect neighbors and foster a sense of local community.",
  },
  {
    icon: <Utensils className="w-6 h-6 text-orange-500" />,
    title: "Ensure Food Access",
    description: "Make sure surplus food reaches those who need it most.",
  },
  {
    icon: <Heart className="w-6 h-6 text-red-500" />,
    title: "Promote Sustainability",
    description:
      "Encourage environmental consciousness and responsible consumption.",
  },
];

const steps = [
  "Sign up using your Google account for quick and easy access.",
  "List your excess food items or search for available food in your area.",
  "Create or join donation events to connect with your local community.",
  "Arrange safe and convenient pick-ups or drop-offs for food sharing.",
  "Review your experiences and inspire others to join the movement.",
];
