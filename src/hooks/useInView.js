import { useState, useEffect } from 'react';

export const useInView = (ref, options = { threshold: 0.1, triggerOnce: true }) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce) {
          setHasAnimated(true);
        }
      } else {
        if (!options.triggerOnce) {
          setIsInView(false);
        }
      }
    }, options);

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [ref, options.threshold, options.triggerOnce]);

  return options.triggerOnce ? hasAnimated : isInView;
};
