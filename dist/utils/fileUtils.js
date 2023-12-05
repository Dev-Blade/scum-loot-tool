"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.ensureDirectory = exports.isDirectory = exports.isFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const isFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stat = yield promises_1.default.stat(file);
        return stat.isFile();
    }
    catch (err) { }
    return false;
});
exports.isFile = isFile;
const isDirectory = (directory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stat = yield promises_1.default.stat(directory);
        return stat.isDirectory();
    }
    catch (err) { }
    return false;
});
exports.isDirectory = isDirectory;
const ensureDirectory = (directory) => __awaiter(void 0, void 0, void 0, function* () {
    let dir = '';
    try {
        if (!(yield (0, exports.isDirectory)(directory)))
            return yield promises_1.default.mkdir(directory, { recursive: true });
        else
            return undefined;
    }
    catch (err) {
        return false;
    }
});
exports.ensureDirectory = ensureDirectory;
// Recursive function to get files
const getFiles = (dir, includePath = true, files = []) => __awaiter(void 0, void 0, void 0, function* () {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = yield promises_1.default.readdir(dir);
    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const file of fileList) {
        const fullName = `${dir}/${file}`;
        // Check if the current file/directory is a directory using fs.statSync
        if (yield (0, exports.isDirectory)(fullName)) {
            // If it is a directory, recursively call the getFiles function with the directory path and the files array
            yield (0, exports.getFiles)(fullName, true, files);
        }
        else {
            // If it is a file, push the full path to the files array
            files.push(includePath ? fullName : file);
        }
    }
    return files;
});
exports.getFiles = getFiles;
//# sourceMappingURL=fileUtils.js.map