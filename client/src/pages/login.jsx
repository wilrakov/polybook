import { AuthForm } from "@/components/AuthForm";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

export default function login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`${import.meta.env.API_URL}/login`, {
        method: "POST",
        body: formData,
      });
      return response.json();
    },
  });

  const handleSubmit = (event) => {
    mutation.mutate(new FormData(event.target));
  };

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <AuthForm
            onSubmit={handleSubmit}
            emailRef={emailRef}
            passwordRef={passwordRef}
            type="login"
          />
        </div>
        {mutation.isPending
          ? "..."
          : mutation.isSuccess
          ? mutation.data.message
          : mutation.error?.message}
      </div>
    </>
  );
}
