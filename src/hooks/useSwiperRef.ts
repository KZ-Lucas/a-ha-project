import { useState, useRef, useEffect } from 'react';

const useSwiperRef = <T>() => {
  const [wrapper, setWrapper] = useState<T | null>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    setWrapper(ref.current);
  }, []);

  return [wrapper, ref];
};

export default useSwiperRef;
