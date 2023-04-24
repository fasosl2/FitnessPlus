import { deletePinFromFolder, getPins, savePinInFolder } from "../services/pinServices";
import { getFolders, saveFolder } from "../services/folderServices";
import {
  closeModalsType,
  deletePinFromFolderInitType,
  deletePinFromFolderSuccessType,
  fetchFoldersInitType,
  fetchFoldersSuccessType,
  fetchPinsInitType,
  fetchPinsSuccessType,
  openModalSaveFolderType,
  openModalSavePinType,
  saveFoldersInitType,
  saveFoldersSuccessType,
  savePinInFolderInitType,
  savePinInFolderSuccessType,
} from "./types";

export const sleep = (time) => (
  new Promise(resolve =>{
    setTimeout(resolve,time)
  })
);

export const openModalSavePinAction = (pinId) => ({
  type: openModalSavePinType,
  payload: pinId
});

export const openModalSaveFolderAction = () => ({
  type: openModalSaveFolderType,
});

export const closeModalsAction = () => ({
  type: closeModalsType,
});

export const fetchFoldersInitAction = () => ({
  type: fetchFoldersInitType,
});

export const fetchFoldersSuccessAction = (folders) => ({
  type: fetchFoldersSuccessType,
  payload: folders
});

export const fetchFoldersAction = async (dispatch) => {
  dispatch(fetchFoldersInitAction());
  const folders = await getFolders();
  dispatch(fetchFoldersSuccessAction(folders));
};

export const saveFoldersInitAction = () => ({
  type: saveFoldersInitType,
});

export const saveFoldersSuccessAction = (folders) => ({
  type: saveFoldersSuccessType,
  payload: folders
});

export const saveFoldersAction = async (dispatch,folderName,pinId) => {
  dispatch(saveFoldersInitAction());
  await sleep(1000);
  const newFolder = await saveFolder(folderName);
  const resultFolder = await savePinInFolder(newFolder.id,pinId);
  dispatch(saveFoldersSuccessAction(resultFolder));
};

export const savePinInFolderInitAction = () => ({
  type: savePinInFolderInitType,
});

export const savePinInFolderSuccessAction = (folders) => ({
  type: savePinInFolderSuccessType,
  payload: folders
});

export const savePinInFolderAction = async (dispatch,folderId,pinId) => {
  dispatch(savePinInFolderInitAction());
  await sleep(1000);
  await savePinInFolder(folderId,pinId);
  const folders = await getFolders();
  dispatch(savePinInFolderSuccessAction(folders));
};

export const fetchPinsInitAction = () => ({
  type: fetchPinsInitType,
});

export const fetchPinsSuccessAction = (pins) => ({
  type: fetchPinsSuccessType,
  payload: pins
});

export const fetchPinsAction = async (dispatch) => {
  dispatch(fetchPinsInitAction());
  const pins = await getPins();
  dispatch(fetchPinsSuccessAction(pins));
};

export const deletePinFromFolderInitAction = () => ({
  type: deletePinFromFolderInitType,
});

export const deletePinFromFolderSuccessAction = (folders) => ({
  type: deletePinFromFolderSuccessType,
  payload: folders
});

export const deletePinFromFolderAction = async (dispatch,folderId,pinId) => {
  dispatch(deletePinFromFolderInitAction());
  await sleep(1000);
  await deletePinFromFolder(folderId,pinId);
  const folders = await getFolders();
  dispatch(deletePinFromFolderSuccessAction(folders));
};