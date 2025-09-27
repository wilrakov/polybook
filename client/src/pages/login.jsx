import { AuthForm } from "@/components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/contexts/UserContext";

export default function Login() {
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
          headers: { "Content-Type": "application/json" },
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

  const saveUser = (data) => {
    localStorage.setItem("auth_token", data.token);
    updateUser({ email: data.user.email });
  };

  const handleSubmit = async (event) => {
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const result = await mutation.mutateAsync(data);
      saveUser(result);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.status === 400 || error.status === 401) {
        alert(
          "please make sure you have entered a valid email, username and password."
        );
      }
    }
  };

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <AuthForm onSubmit={handleSubmit} type="login" />
        </div>
      </div>
    </>
  );
}
