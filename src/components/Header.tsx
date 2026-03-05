import Logo from "./Logo";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="bg-amber-800 h-20 flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <Logo />
          <NavBar />
        </div>
      </div>
    </header>
  );
}
