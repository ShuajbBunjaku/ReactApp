import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/home");

    setUsername("");
    setPassword("");
  }

  return (
    <div className="flex justify-center items-center h-[80vh] max-sm:h-fit max-lg:h-fit bg-black text-white">
      <div className="w-[80vw] max-w-md bg-black p-8 rounded-2xl shadow-lg border border-white">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#855DFF]">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-lg">Name</label>
            <input
              type="text"
              className="w-full p-3 bg-transparent border border-white rounded-lg focus:outline-none focus:border-[#855DFF]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-lg">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-transparent border border-white rounded-lg focus:outline-none focus:border-[#855DFF]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#855DFF] text-white rounded-lg font-semibold hover:bg-[#6c46d7] transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
