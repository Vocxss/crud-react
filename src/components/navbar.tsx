import { Button } from "./button";

const navItems = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "Dashboard",
    href: "#",
  },
  {
    title: "My Courses",
    href: "#",
  },
];

export const Navbar = () => {
  return (
    <nav className="flex gap-4 items-center justify-between mx-auto md:w-3/5 w-[90%] rounded-full px-12 py-4 text-sm border border-primary/20 shadow-xl shadow-primary/5">
      <h1 className="text-xl font-black text-primary">SikolaV5</h1>
      <div className="md:flex hidden items-center gap-4">
        {navItems.map((item, index) => (
          <a key={index} href={item.href} className="hover:text-primary">
            {item.title}
          </a>
        ))}
      </div>
      <Button variant="outline">
        <a href="#">Pak Dosen Web</a>
      </Button>
    </nav>
  );
};
