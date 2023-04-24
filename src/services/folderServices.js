import { getStoredTable, generateId, saveStoredTable } from "./localStorageAPI";

export const saveFolder = async (folderName) => {
  var folders = await getFolders();

  const id = generateId(folders);

  const newFolder = {
    id: id,
    name: folderName,
    pins: [],
  };

  folders.push(newFolder);
  await saveStoredTable(folders, "folders");
  return newFolder;
};

export const getFolders = async () => {
  const folders = await getStoredTable("folders");
  return folders || [];
};

export const saveFolders = async (folders) => {
  await saveStoredTable(folders, "folders");
};
