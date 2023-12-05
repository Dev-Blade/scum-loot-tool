"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pad = void 0;
const pad = (str, l, padMode = "start", fs = " " /* "\u2800" */) => {
    if (str === undefined)
        str = "---";
    str = "" + str;
    str = ("" + str).slice(0, l);
    switch (padMode) {
        case "start":
            return str.padStart(l, fs);
        case "end":
            return str.padEnd(l, fs);
            break;
        case "center":
            return str
                .padStart(Math.floor((l - str.length) / 2) + str.length, fs)
                .padEnd(l, fs);
    }
};
exports.pad = pad;
//# sourceMappingURL=stringUtils.js.map