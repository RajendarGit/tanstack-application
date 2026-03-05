import { Link } from "@tanstack/react-router";
import { Activity, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/movies", label: "Movies" },
];

function NavItem({ closeMenu }: { closeMenu?: () => void }) {
  return (
    <ul className="flex flex-col md:flex-row md:gap-4">
      {links.map((link) => (
        <li key={link.to}>
          <Link
            onClick={closeMenu}
            to={link.to}
            className="text-white hover:text-amber-200 transition-colors duration-200 p-4 block tracking-widest"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav>
      {/* for smaller device */}
      <Button
        variant={"ghost"}
        onClick={() => setShowMenu((prev) => !prev)}
        className="md:hidden size-15 text-white"
      >
        <Menu />
      </Button>
      <Activity mode={showMenu ? "visible" : "hidden"}>
        <NavItem closeMenu={() => setShowMenu(false)} />
      </Activity>
      {/* for larger device */}
      <div className="hidden md:block">
        <NavItem closeMenu={() => setShowMenu(false)} />
      </div>
    </nav>
  );
}
