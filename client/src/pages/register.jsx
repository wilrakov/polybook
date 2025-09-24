import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

export default function Register() {
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

    mutation.mutate(new FormData(event.target));
    
    
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" ref={emailRef} placeholder="johnDoe@exemple.com" />
        <input type="text" name="password" ref={passwordRef} placeholder="password..." />
        <button type="submit">submit</button>
      </form>

      { mutation.isPending ? "..." : (mutation.isSuccess ? mutation.data.message : mutation.error.message)}

    </>
  );
}
