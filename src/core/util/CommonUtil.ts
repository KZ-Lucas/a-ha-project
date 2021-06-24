export const filterVaildObj = (obj: Record<string, any>) => Object.keys(obj).reduce(
  (prev: Record<string, any>, next) => {
    if (obj[next]) {
      prev[next] = obj[next];
    }

    return prev;
  }, {}
);

export const ObjPick = (obj: Record<string, any>, pickBy: string[]) => pickBy.reduce(
  (prev: any, next) => {
    if (obj[next]) {
      prev.push({ [next]: obj[next] });
    }

    return prev;
  }, []
);