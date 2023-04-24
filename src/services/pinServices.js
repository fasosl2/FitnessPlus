import { saveFolders, getFolders } from "./folderServices";
import { generateId, getStoredTable, saveStoredTable } from "./localStorageAPI";

export const getPins = async () => {
  const pins = await getStoredTable("pins");
  return pins || [];
};


export const savePins = async (pins) => {
  await saveStoredTable(pins, "pins");
};


export const savePin = async (pinName) => {
  var pins = await getPins();

  const id = generateId(pins);

  const newPin = {
    id: id,
    title: pinName,
    image: "https://picsum.photos/200/300?" + Math.floor(Math.random() * 100),
    total: 0,
  };

  pins.push(newPin);
  await saveStoredTable(pins, "pins");
  return newPin;
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