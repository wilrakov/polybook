import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const logOutUser = () => {
    localStorage.removeItem("auth_token");
    updateUser({});
    navigate("/login");
  };

  return (
    <>
      <h1>Hello, {user.email} and Welcome on Polybook</h1>

      <button onClick={logOutUser}>logout</button>
    </>
  );
}
