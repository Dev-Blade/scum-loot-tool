export const findJsonNode = (json: any, path: string) => {
  const pathParts = path.split('.');

  let node = json;
  const pLast = pathParts.length - 1;

  let found: object | undefined = undefined;
  const findNode = (node: any, partIndex: number): object | undefined => {
    if (node.Name === pathParts[partIndex] && partIndex === pLast) return node;
    else {
      found = undefined;
      if (node.Children) {
        const child = node.Children.find((child: any) => child.Name === pathParts[partIndex + 1]);
        if (child) found = findNode(child, partIndex + 1);
      }
    }
    return found;
  };
  return findNode(node, 0);
};
