import { deletePin, deletePinFromFolder, getPins, savePin, savePinInFolder } from "../services/pinServices";
import { deleteFolder, getFolders, saveFolder } from "../services/folderServices";
import {
  closeModalsType,
  deleteFolderInitType,
  deleteFolderSuccessType,
  removePinFromFolderInitType,
  removePinFromFolderSuccessType,
  fetchFoldersInitType,
  fetchFoldersSuccessType,
  fetchGroupsInitType,
  fetchGroupsSuccessType,
  fetchPinsInitType,
  fetchPinsSuccessType,
  openModalCreatePinType,
  openModalSaveFolderType,
  openModalSavePinType,
  saveFoldersInitType,
  saveFoldersSuccessType,
  savePinInFolderInitType,
  savePinInFolderSuccessType,
  savePinsInitType,
  savePinsSuccessType,
  setCurrentGroupInitType,
  setCurrentGroupSuccessType,
  deletePinInitType,
  deletePinSuccessType,
} from "./types";
import { getGroups } from "../services/groupService";

export const sleep = (time) => (
  new Promise(resolve =>{
    setTimeout(resolve,time)
  })
);
export const openModalCreatePinAction = () => ({
  type: openModalCreatePinType
});
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

export const fetchPinsAction = async (dispatch,activeGroup) => {
  dispatch(fetchPinsInitAction());
  const pins = await getPins(activeGroup);
  dispatch(fetchPinsSuccessAction(pins));
};

export const setCurrentGroupInitAction = (group) => ({
  type: setCurrentGroupInitType
});
export const setCurrentGroupSuccessAction = (group) => ({
  type: setCurrentGroupSuccessType,
  payload: group
});
export const setCurrentGroupAction = async (dispatch,group) => {
  dispatch(setCurrentGroupInitAction());
  await sleep(1000);
  dispatch(setCurrentGroupSuccessAction(group));
};

export const fetchGroupsInitAction = () => ({
  type: fetchGroupsInitType,
});

export const fetchGroupsSuccessAction = (pins) => ({
  type: fetchGroupsSuccessType,
  payload: pins
});

export const fetchGroupsAction = async (dispatch) => {
  dispatch(fetchGroupsInitAction());
  const groups = await getGroups();
  dispatch(fetchGroupsSuccessAction(groups));
};

export const removePinFromFolderInitAction = () => ({
  type: removePinFromFolderInitType,
});

export const removePinFromFolderSuccessAction = (folders) => ({
  type: removePinFromFolderSuccessType,
  payload: folders
});

export const removePinFromFolderAction = async (dispatch,folderId,pinId) => {
  dispatch(removePinFromFolderInitAction());
  await sleep(1000);
  await deletePinFromFolder(folderId,pinId);
  const folders = await getFolders();
  dispatch(removePinFromFolderSuccessAction(folders));
};

export const deleteFolderInitAction = () => ({
  type: deleteFolderInitType,
});

export const deleteFolderSuccessAction = (folders) => ({
  type: deleteFolderSuccessType,
  payload: folders
});

export const deleteFolderAction = async (dispatch,folderId) => {
  dispatch(deleteFolderInitAction());
  await sleep(1000);
  const folders = await deleteFolder(folderId);
  dispatch(deleteFolderSuccessAction(folders));
};


export const savePinsInitAction = () => ({
  type: savePinsInitType,
});

export const savePinsSuccessAction = (pins) => ({
  type: savePinsSuccessType,
  payload: pins
});

export const savePinsAction = async (dispatch,pinData) => {
  dispatch(savePinsInitAction());
  await sleep(1000);
  const newPin = await savePin(pinData);
  dispatch(savePinsSuccessAction(newPin));
};


export const deletePinInitAction = () => ({
  type: deletePinInitType,
});

export const deletePinSuccessAction = ({pins,folders}) => ({
  type: deletePinSuccessType,
  payload: {pins, folders}
});

export const deletePinAction = async (dispatch,pinId) => {
  dispatch(deletePinInitAction());
  await sleep(1000);
  const {folders, pins} = await deletePin(pinId);
  dispatch(deletePinSuccessAction({folders, pins}));
};