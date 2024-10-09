import Link from "next/link";
import {
  ArrowRight,
  Utensils,
  Search,
  Heart,
  Users,
  BarChart,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-background text-foreground">
      <main className="w-full">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              Welcome to <span className="text-primary">FoodShare</span>
            </h1>
            <p className="mt-3 text-xl sm:text-2xl mb-8">
              Share your excess food and reduce waste in your community
            </p>
            <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4">
              <Button asChild size="lg">
                <Link href="/share">
                  Share Food <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/find">
                  Find Food <Search className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
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
                title="Find Available Food"
                description="Discover and request available food shares in your area."
              />
              <FeatureCard
                icon={<Heart className="h-10 w-10 text-primary" />}
                title="Reduce Food Waste"
                description="Help reduce food waste and make a positive impact on the environment."
              />
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <ImpactCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="10,000+"
                description="Active Users"
              />
              <ImpactCard
                icon={<BarChart className="h-10 w-10 text-primary" />}
                title="50,000 lbs"
                description="Food Shared"
              />
              <ImpactCard
                icon={<Globe className="h-10 w-10 text-primary" />}
                title="100+"
                description="Communities Served"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="FoodShare has helped me reduce waste and connect with my neighbors. It's a win-win!"
                author="Sarah J."
              />
              <TestimonialCard
                quote="As a student, FoodShare has been a lifesaver. I've found great meals and made new friends."
                author="Mike T."
              />
              <TestimonialCard
                quote="I love how easy it is to share extra food. It feels great to help others in my community."
                author="Emily R."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8">
              Join our community and start sharing today!
            </p>
            <Button asChild size="lg">
              <Link href="/share">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="flex flex-col items-center text-center">
      <CardHeader>
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

function ImpactCard({ icon, title, description }) {
  return (
    <Card className="flex flex-col items-center text-center">
      <CardHeader>
        {icon}
        <CardTitle className="text-4xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({ quote, author }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="italic mb-4">"{quote}"</p>
        <p className="font-semibold">- {author}</p>
      </CardContent>
    </Card>
  );
}
