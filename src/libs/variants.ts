export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const pageSlideIn = {
  initial: { opacity: 0, translateX: 100 },
  animate: {
    opacity: 1,
    translateX: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: { opacity: 0, translateX: -100 },
};
