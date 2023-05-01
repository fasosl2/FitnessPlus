import { saveFolders, getFolders } from "./folderServices";
import { generateId, getStoredTable, saveStoredTable } from "./localStorageAPI";

export const getPins = async (activeGroup) => {
  let pins = await getStoredTable("pins");
  activeGroup && activeGroup !== '' && (pins = pins.filter(ele => ele.group === activeGroup));
  return pins || [];
};


export const savePins = async (pins) => {
  await saveStoredTable(pins, "pins");
};


export const savePin = async ({ name, group}) => {
  var pins = await getPins();

  const id = generateId(pins);

  const newPin = {
    id: id,
    title: name,
    group: group,
    image: "https://picsum.photos/200/100?" + Math.floor(Math.random() * 100),
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


export const deletePin = async (pinId) => {
  let folders = await getFolders();
  folders = folders.map((folder) => {
    let pinIndex = folder?.pins?.indexOf(pinId);
    pinIndex !== null && pinIndex !== -1 && folder.pins.splice(pinIndex,1);
    return folder;
  });
  await saveFolders(folders);
  let pins = await getPins();
  let pinIndex = pins?.findIndex(ele => ele.id === pinId);
  pinIndex !== null && pinIndex !== -1 && pins.splice(pinIndex,1);
  await savePins(pins);
  return folders && pins ? { folders, pins } : {};
};