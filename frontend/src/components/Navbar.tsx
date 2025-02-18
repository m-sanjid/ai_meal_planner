const Navbar = () => {
  return (
    <div className="bg-slate-800 p-4 top-0 sticky h-16">
      <div className="flex justify-between w-full mx-auto text-white max-w-7xl items-center">
        <div>Meal Planner</div>
        <div className="flex gap-2">
          <div>Home</div>
          <div>About</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
