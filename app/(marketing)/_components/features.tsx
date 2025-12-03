export const Features = () => {
  const features = [
    {
      icon: "🧱",
      title: "Flexible Blocks",
      text: "Create notes, tasks, and documents easily.",
    },
    {
      icon: "🤝",
      title: "Real-time Collaboration",
      text: "Work together instantly and efficiently.",
    },
    {
      icon: "🌙",
      title: "Light & Dark Mode",
      text: "Choose your perfect workspace style.",
    },
    {
      icon: "☁️",
      title: "Cloud Sync",
      text: "Access your work anywhere, anytime.",
    },
  ];

  return (
    <section id="features" className="w-full max-w-6xl mx-auto py-20">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12">Powerful Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};