const email = "amittaijoel@outlook.com";

const social = [
  {
    title: "GitHub",
    _path: "https://github.com/siavava",
  },
  {
    title: "Instagram",
    _path: "https://www.instagram.com/siavava",
  },
  {
    title: "Twitter",
    _path: "https://twitter.com/siavava",
  },
  {
    title: "Linkedin",
    _path: "https://www.linkedin.com/in/siavava",
  },
];

const homeLinks = [
  {
    title: "About",
    _path: "/#about",
  },
  {
    title: "Experience",
    _path: "/#jobs",
  },
  {
    title: "Work",
    _path: "/#projects",
  },
  {
    title: "Contact",
    _path: "/#contact",
  },
];

const otherLinks = [
  {
    title: "Writing",
    _path: "/writing",
    show: true,
  },
  {
    title: "Resume",
    _path: "/resume",
    show: true,
  },
  {
    title: "Art Portfolio",
    _path: "/portfolio",
    show: true,
  },
].filter((link) => link.show);

const navLinks = { homeLinks, otherLinks };

const heroFootItems = [
  {
    title: "Systems Engineering",
    subscript: "scalable, high-performance design patterns",
  },
  {
    title: "Theory of Computation",
    subscript: "algorithms, automata theory",
  },
  {
    title: "Design",
    subscript: "responsive and interactive experiences",
  },
  {
    title: "Artificial Intelligence",
    subscript: "deep learning, NLP, computer vision",
  },
  {
    title: "Math",
    subscript: "algebra, analysis, logic, game theory",
  },
  {
    title: "Physics",
    subscript: "particle physics",
  },
];

const navHeight = 40; // px

const nonTocRoutes = [
  "/",
  "/writing", "/writing/",
];

const ignorePrefixes = [
  "/moments", "/aphorisms",
];

const heroCallOuts = [
  { field: "tech", action: "build" },
  { field: "art", action: "create" },
  { field: "math", action: "solve" },
  { field: "physics", action: "explore" },
];

async function useMetaPage(): Promise<boolean> {
  const { path } = useTrimmedPath();
  const { categories } = await queryContent()
    .where({ _path: path })
    .only(["category"])
    .findOne()
    .then((data) => ({
      categories: data.category || [],
    }));

  return categories.includes("meta");
}

async function showToc() {
  const { path } = useTrimmedPath();
  return useMetaPage().then(
    (isMeta) => !isMeta && ignorePrefixes.every((prefix) => !path.startsWith(prefix)),
  );
}

export default () => ({
  email,
  social,
  navLinks,
  heroFootItems,
  // srConfig,
  navHeight,
  nonTocRoutes,
  ignorePrefixes,
  heroCallOuts,
  showToc,
  useMetaPage,
});
