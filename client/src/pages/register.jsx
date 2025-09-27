import { useMutation } from "@tanstack/react-query";
import { AuthForm } from "@/components/AuthForm";
import { CarouselPlugin } from "@/components/carousel";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        const err = new Error(json.error || "Something went wrong");
        err.status = response.status;
        throw err;
      }
      return json;
    },
  });

  const handleSubmit = async (event) => {
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const result = await mutation.mutateAsync(data);
      alert("All good! You’re being redirected…");
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.status === 400) {
        alert(
          "please make sure you have entered a valid email, username and password."
        );
      } else if (error.status === 500) {
        alert("internal server error !");
      }
    }
  };

  return (
    <>
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {/* Form side */}
        <div className="flex items-center justify-center p-6 md:p-10 bg-background">
          <div className="w-full max-w-sm">
            <AuthForm onSubmit={handleSubmit} type="register" />
          </div>
        </div>

        {/* Content side */}
        <div className="hidden md:flex flex-col justify-center p-10 bg-secondary text-secondary-foreground">
          <CarouselPlugin />

          <p className="text-xl font-light text-center m-6">
            Every book has a story – discover yours
          </p>
        </div>
      </div>
    </>
  );
}
