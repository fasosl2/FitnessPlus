import { saveFolders, getFolders } from "./folderServices";

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

export const savePinInFolder = async (folderId, pinId) => {
  const folders = await getFolders();
  let folder = folders.find((elem) => elem.id === folderId);
  folder && folder.pins.push(pinId);
  await saveFolders(folders);
  return folder ? { ...folder } : {};
};


export const deletePinFromFolder = async (folderId, pinId) => {
  let folders = await getFolders();
  let folder = folders.find((elem) => elem.id === folderId);
  let pinIndex = folder?.pins?.indexOf(pinId);
  pinIndex !== null && pinIndex !== -1 && folder.pins.splice(pinIndex,1);
  await saveFolders(folders);
  return folder ? { ...folder } : {};
};