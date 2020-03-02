import { useMemo } from 'react';
import useComponentSize from '@rehooks/component-size';

const MIN_MARGIN = 10;

export default function useMargin(containerRef, itemWidth = 300) {
    const { width } = useComponentSize(containerRef);

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