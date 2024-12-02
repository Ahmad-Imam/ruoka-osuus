import Link from "next/link";
import { ArrowRight, Utensils, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home({ params }) {
  return (
    <div className="flex flex-col items-center justify-center bg-background text-foreground">
      <main className="w-full">
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              Welcome to <span className="text-primary">Ruoka Osuus</span>
            </h1>
            <p className="mt-3 text-xl sm:text-2xl mb-8">
              Share your excess food and reduce waste in your community
            </p>
            <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4">
              <Button asChild size="lg" className="text-white">
                <Link href="/create/donation">
                  Share Food <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="" size="lg">
                <Link href={`/find/donation`}>
                  Find Food <Search className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Utensils className="h-10 w-10 text-primary" />}
                title="Share Excess Food"
                description="Easily share your extra food with those in need in your local community."
              />
              <FeatureCard
                icon={<Search className="h-10 w-10 text-primary" />}
                title="Find requests and events"
                description="Discover events and request available food in your area."
              />
              <FeatureCard
                icon={<Heart className="h-10 w-10 text-primary" />}
                title="Reduce Food Waste"
                description="Help reduce food waste and make a positive impact on the environment."
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8">
              Join our community and start sharing today!
            </p>
            <Button asChild size="lg" className="text-white">
              <Link href={`/find/donation`}>Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="flex flex-col items-center justify-start text-start cardFull cardFullDark">
      <CardHeader className="flex flex-col justify-center items-center">
        <div className="pb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
