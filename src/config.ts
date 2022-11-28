

const email = 'amittaijoel@outlook.com';

const social = [
    {
      name: 'GitHub',
      url: 'https://github.com/siavava',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/siavava',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/siavava',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/siavava',
    },
  ];

const navLinks = [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ];

const colors = {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  };

const srConfig = (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  });

export { email, social, navLinks, colors, srConfig };
