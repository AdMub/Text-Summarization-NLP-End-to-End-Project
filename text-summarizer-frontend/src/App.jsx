import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setSummary(data.summary || data.error);
    } catch (err) {
      setSummary("❌ Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6
        bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-800
        transition-colors duration-500"
    >
      {/* Card */}
      <div
        className="relative w-full max-w-2xl md:max-w-3xl p-6 sm:p-8
          rounded-2xl shadow-2xl animate-fadeIn
          bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20"
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6
            bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200
            px-3 py-1 text-sm sm:text-base rounded-lg shadow hover:shadow-md transition"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>

        {/* Title */}
        <h1
          className="text-2xl sm:text-4xl font-extrabold text-center
            text-gray-800 dark:text-gray-100 mb-4 sm:mb-6"
        >
          ✨ AI Text Summarizer
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <textarea
            className="w-full h-32 sm:h-40 p-3 sm:p-4 border rounded-xl resize-none
              focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm
              dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
              text-sm sm:text-base"
            placeholder="Paste or type your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white
              py-2 sm:py-3 rounded-xl font-semibold shadow-md hover:shadow-lg
              transition transform hover:-translate-y-0.5 disabled:opacity-50
              text-sm sm:text-base"
          >
            {loading ? "⏳ Summarizing..." : "🚀 Summarize Text"}
          </button>
        </form>

        {/* Summary Result */}
        {summary && (
          <div
            className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-50/80 dark:bg-gray-800/80
              border-l-4 border-indigo-500 rounded-xl shadow-md animate-fadeIn"
          >
            <h2
              className="font-semibold text-gray-700 dark:text-gray-200
                mb-2 text-base sm:text-lg flex items-center gap-2"
            >
              📌 Summary:
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
