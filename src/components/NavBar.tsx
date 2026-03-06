import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  {
    to: "#",
    label: "Movies",
    children: [
      { to: "/movies", label: "All" },
      { to: "/movies/popular", label: "Popular" },
      { to: "/movies/upcoming", label: "Upcoming" },
      { to: "/movies/top-rated", label: "Top Rated" },
    ],
  },
];

function SideBarMenuContainer({ children }: { children: any }) {
  return (
    <div className="bg-black">
      <ul className="flex flex-col md:flex-row md:gap-4">
        {children.map((link: any) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-white hover:text-amber-200 transition-colors duration-200 p-4 block tracking-widest"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavItem({
  closeMenu,
  onMoviesClick,
}: {
  closeMenu?: () => void;
  onMoviesClick?: () => void;
}) {
  return (
    <ul className="flex flex-col md:flex-row md:gap-4">
      {links.map((link) => (
        <li key={link.to}>
          {link.children ? (
            <button
              onClick={onMoviesClick}
              className="text-white hover:text-amber-200 transition-colors duration-200 p-4 block tracking-widest"
            >
              {link.label}
            </button>
          ) : (
            <Link
              onClick={closeMenu}
              to={link.to}
              className="text-white hover:text-amber-200 transition-colors duration-200 p-4 block tracking-widest"
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showMovies, setShowMovies] = useState(false);

  return (
    <nav>
      {/* small device toggle */}
      <Button
        variant={"ghost"}
        onClick={() => setShowMenu((prev) => !prev)}
        className="md:hidden size-15 text-white"
      >
        <Menu />
      </Button>

      {/* menu items */}
      {showMenu && (
        <NavItem
          closeMenu={() => setShowMenu(false)}
          onMoviesClick={() => setShowMovies((prev) => !prev)}
        />
      )}

      {/* larger device */}
      <div className="hidden md:block">
        <NavItem
          closeMenu={() => setShowMenu(false)}
          onMoviesClick={() => setShowMovies((prev) => !prev)}
        />
      </div>

      {/* sidebar for Movies */}
      {showMovies && (
        <SideBarMenuContainer
          children={links.find((l) => l.label === "Movies")?.children || []}
        />
      )}
    </nav>
  );
}
