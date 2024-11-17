import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    if (!dark) {
      document.getElementsByTagName("html")[0].classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
      setDark(true);
    } else {
      document.getElementsByTagName("html")[0].classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
      setDark(false);
    }
  };

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");

    if (darkMode === "enabled") {
      document.getElementsByTagName("html")[0].classList.add("dark");
      setDark(true);
    }
  }, []);

  return (
    <div className="text-center">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={() => toggleDarkMode()}
          checked={dark}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Dark mode
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
