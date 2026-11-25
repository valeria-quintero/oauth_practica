import { login } from "../services/login.service";

export default function Card() {
  return (
    <div className="flex flex-col items-center gap-4 text-white">
      <h1 className="text-3xl font-bold">Login</h1>
      <div>
        <button
          onClick={login}
          className="bg-red-500 text-white font-semibold hover:bg-red-600 hover:cursor-pointer p-1 rounded-md"
        >
          Iniciar sesión con Github
        </button>
      </div>
    </div>
  );
}
