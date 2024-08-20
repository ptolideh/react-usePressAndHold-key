export const generateRandomTailwindColor = () => {
  const colors = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ];

  const shades = ["50", "100", "200", "300", "400", "500", "600"];
  return `${colors[Math.floor(Math.random() * colors.length)]}-${
    shades[Math.floor(Math.random() * shades.length)]
  }`;
};
