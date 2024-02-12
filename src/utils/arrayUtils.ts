export const removeDuplicates = (a: any[], attribute: string) => {
  const names: string[] = [];
  a = a.filter((child: any) => {
    if (names.includes(child[attribute])) return false;
    names.push(child[attribute]);
    return true;
  });
  return a;
};
