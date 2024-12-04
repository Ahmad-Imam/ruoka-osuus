import LoginCard from "./_components/LoginCard";

export const metadata = {
  title: "Login",
  description: "Login with Google",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <LoginCard />
    </div>
  );
}
