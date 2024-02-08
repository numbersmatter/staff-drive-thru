import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Staff App
          </h1>
          <Link to="/logout">Logout</Link>
        </div>
      </div>
    </header>
  );
}
