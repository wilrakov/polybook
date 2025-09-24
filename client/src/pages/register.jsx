import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {

   //TODO: refacto with tanstackQuery
    const req = fetch(`${import.meta.env.API_URL}/register`, {
      method: POST,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.value,
        password: passwordRef.value,
      }),
    });


  };

  return (
    <>
      <h1>Register</h1>
      <form action="">
        <input type="email" ref={emailRef} placeholder="johnDoe@exemple.com" />
        <input type="text" ref={passwordRef} placeholder="password..." />

        <button onClick={handleSubmit}>submit</button>
      </form>
    </>
  );
}
