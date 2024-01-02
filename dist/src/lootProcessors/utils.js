"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findJsonNode = void 0;
const findJsonNode = (json, path) => {
    const pathParts = path.split('.');
    let node = json;
    const pLast = pathParts.length - 1;
    let found = undefined;
    const findNode = (node, partIndex) => {
        if (node.Name === pathParts[partIndex] && partIndex === pLast)
            return node;
        else {
            found = undefined;
            if (node.Children) {
                const child = node.Children.find((child) => child.Name === pathParts[partIndex + 1]);
                if (child)
                    found = findNode(child, partIndex + 1);
            }
        }
        return found;
    };
    return findNode(node, 0);
};
exports.findJsonNode = findJsonNode;
//# sourceMappingURL=utils.js.map