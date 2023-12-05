import fs from 'fs/promises';

export const isFile = async (file: string) => {
  try {
    const stat = await fs.stat(file);
    return stat.isFile();
  } catch (err) {}
  return false;
};
export const isDirectory = async (directory: string) => {
  try {
    const stat = await fs.stat(directory);
    return stat.isDirectory();
  } catch (err) {}
  return false;
};
export const ensureDirectory = async (directory: string): Promise<string | boolean | undefined> => {
  let dir = '';
  try {
    if (!(await isDirectory(directory))) return await fs.mkdir(directory, {recursive: true});
    else return undefined;
  } catch (err) {
    return false;
  }
};

// Recursive function to get files
export const getFiles = async (dir: string, includePath = true, files: string[] = []) => {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = await fs.readdir(dir);
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const fullName = `${dir}/${file}`;
    // Check if the current file/directory is a directory using fs.statSync
    if (await isDirectory(fullName)) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      await getFiles(fullName, true, files);
    } else {
      // If it is a file, push the full path to the files array
      files.push(includePath ? fullName : file);
    }
  }
  return files;
};
