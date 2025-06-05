import { Variants } from 'framer-motion';

export const createContainer = (stagger = 0.05): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger },
  },
});

export const createItem = (yOffset = 20): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  show: { opacity: 1, y: 0 },
});
