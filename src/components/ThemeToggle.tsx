const ThemeToggle = () => {
  const className = "dark";

  const toggleDarkMode = (className: string) => {
    document.getElementsByTagName("html")[0].classList.toggle(className);
  };

  return (
    <div className="text-center">
      <div className="relative inline-block">
        <input
          type="checkbox"
          id="mode-toggle"
          className="hidden peer"
          onChange={() => toggleDarkMode(className)}
        />
        <label
          htmlFor="mode-toggle"
          className="block w-15 h-7 bg-[var(--toggle-light)] rounded-full cursor-pointer transition-colors duration-300 ease-in-out dark:bg-[var(--toggle-dark)]"
        >
          <span className="absolute top-[2px] left-[2px] w-6 h-6 bg-white rounded-full transition-all duration-300 ease-in-out peer-checked:left-8"></span>
        </label>
      </div>
    </div>
  );
};

export default ThemeToggle;
