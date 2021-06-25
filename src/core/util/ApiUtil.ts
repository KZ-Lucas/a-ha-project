export const objToQuery = (obj: Record<string, any>) =>
  Object.keys(obj)
    .reduce((prev: string[], next) => {
      if (Array.isArray(obj[next])) {
        return prev.concat(obj[next].map((el: string) => `${next}[]=${el}`));
      }

      return prev.concat(`${next}=${obj[next]}`);
    }, [])
    .join('&');
