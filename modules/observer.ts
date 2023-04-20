// Element Observer
export default function observe() {
  // ignore in ssr mode (when window is undefined)
  if (typeof window === "undefined") return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");
      } else {
        entry.target.classList.add("hidden");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hide");
  hiddenElements.forEach((element) => observer.observe(element));
}

// table of contents observer
export function observeToc() {
  // ignore in ssr mode (when window is undefined)
  if (typeof window === "undefined") return;

  const observer = new IntersectionObserver((entries) => {
    const toc = document.querySelector(".toc");
    entries.forEach((entry) => {
      const tocLink = document.querySelector(`#link-${entry.target.id}`);
      console.log(
        `entry: ${entry.target.id}
        tocLink: ${tocLink.id}
        isIntersecting: ${entry.isIntersecting}`,
      );
      if (entry.isIntersecting) {
        tocLink.classList.add("active");
        console.log(`set active: ${entry.target.id}`);
      } else {
        tocLink?.classList.remove("active");
        console.log(`remove active: ${entry.target.id}`);
      }
    });
  });
  const allHeadings = document.querySelectorAll("h2, h3");
  const headings = Array.from(allHeadings).filter((heading) => {
    return typeof heading !== null && heading.id && heading.classList;
  });
  headings.forEach((heading) => {
    observer.observe(heading);
    console.log(`observe: ${heading.id}`);
  });
}
