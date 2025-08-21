// C:/Users/riswa/Desktop/app/AI Persona Finder/trait-scan/src/pages/auth/SignInPage.tsx
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn path="/signin" routing="path" signUpUrl="/signup" />
    </div>
  );
}