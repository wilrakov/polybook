import { AuthForm } from "@/components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/contexts/UserContext";
import { loginQuery } from "@/lib/api/auth";

export default function Login() {
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginQuery,
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
