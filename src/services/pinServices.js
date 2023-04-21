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

export const savePinInFolder = async (folderId, pinId) => {
  const folders = await getFolders();
  let folder = folders.find((elem) => elem.id === folderId);
  folder && folder.pins.push(pinId);
  await saveStoredTable(folders, "folders");
  return folder ? { ...folder } : {};
};

export const getFolders = async () => {
  const folders = await getStoredTable("folders");
  return folders || [];
};

export const getPins = async () => {
  return [
    {
      id: 1,
      title: "Matemática",
      image: "https://picsum.photos/200/300?53",
      total: 0,
    },
    {
      id: 2,
      title: "Português",
      image: "https://picsum.photos/200/300?43",
      total: 0,
    },
    {
      id: 3,
      title: "Geografia",
      image: "https://picsum.photos/200/300?33",
      total: 0,
    },
    {
      id: 4,
      title: "História",
      image: "https://picsum.photos/200/300?23",
      total: 0,
    },
  ];
};
