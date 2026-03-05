import Logo from "./Logo";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="bg-black h-20 flex items-center fixed top-0 left-0 right-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between">
          <Logo />
          <NavBar />
        </div>
      </div>
    </header>
  );
}
