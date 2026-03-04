import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/movies", label: "Movies" },
];

export default function NavBar() {
  return (
    <nav className="bg-amber-800">
      <div className="container">
        <ul className="flex gap-4">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-white hover:text-amber-200 transition-colors duration-200 p-4 block"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
