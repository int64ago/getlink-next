// Ref: https://github.com/rehooks/component-size
import { useMemo, useState, useEffect, useCallback } from 'react';

const MIN_MARGIN = 10;

function getWidth(el) {
  if (!el) {
    return 0;
  }
  return el.offsetWidth;
}

export default function useMargin(ref, itemWidth = 300) {
  const [width, setWidth] = useState(getWidth(ref ? ref.current : {}))

  const handleResize = useCallback(() => {
    if (ref.current) {
      setWidth(getWidth(ref.current));
    }
  }, [ref]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    handleResize();

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(ref.current)

      return () => {
        resizeObserver.disconnect(ref.current);
        resizeObserver = null;
      };
    } else {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }
  }, [ref.current]);

  const margin = useMemo(() => {
    if (width <= itemWidth) return 0;
    let count = Math.floor(width / itemWidth);
    let left = width - itemWidth * count;
    if (count !== 1 && (count * MIN_MARGIN > left)) {
      count = count - 1;
      left = left + itemWidth;
    }
    return left / (2 * count);
  }, [width]);

  return margin;
}