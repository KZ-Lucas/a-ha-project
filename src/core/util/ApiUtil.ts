export const objToQuery = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((prev: string[], next) => {
    // Array Convert to Query
    if (Array.isArray(obj[next])) {
      return prev.concat(obj[next].map(
        (el: string) =>
        `${next}[]=${el}`
      ));
    }

   return prev.concat(`${next}=${obj[next]}`)
  }, []).join('&');
};
  