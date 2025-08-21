// C:/Users/riswa/Desktop/app/AI Persona Finder/trait-scan/src/pages/auth/SignUpPage.tsx
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp path="/signup" routing="path" signInUrl="/signin" />
    </div>
  );
}