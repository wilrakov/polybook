import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

import { AuthForm } from "@/components/AuthForm";
import { CarouselPlugin } from "@/components/carousel"

export default function register() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`${import.meta.env.API_URL}/register`, {
        method: "POST",
        body: formData,
      });
      return response.json();
    },
  });

  const handleSubmit = (event) => {
    console.log("send");
    mutation.mutate(new FormData(event.target));
  };

  return (
    <>
<div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
  {/* Form side */}
  <div className="flex items-center justify-center p-6 md:p-10 bg-background">
    <div className="w-full max-w-sm">
      <AuthForm
        onSubmit={handleSubmit}
        emailRef={emailRef}
        passwordRef={passwordRef}
        type="register"
      />
    </div>
  </div>

  {/* Content side */}
  <div className="hidden md:flex flex-col justify-center p-10 bg-secondary text-secondary-foreground">
    <CarouselPlugin />
  </div>
</div>


    </>
  );
}
