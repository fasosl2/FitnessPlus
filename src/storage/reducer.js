import {
  closeModalsType,
  deleteFolderSuccessType,
  removePinFromFolderSuccessType,
  fetchFoldersSuccessType,
  fetchGroupsSuccessType,
  fetchPinsSuccessType,
  openModalCreatePinType,
  openModalSaveFolderType,
  openModalSavePinType,
  saveFoldersSuccessType,
  savePinInFolderSuccessType,
  savePinsSuccessType,
  setCurrentGroupSuccessType,
  deletePinSuccessType,
} from "./types";

export function reducer(state, action) {
  let stateAction = {type: action?.type};
  switch (action.type) {
    case openModalSavePinType:
      stateAction.mode = "savePin";
      stateAction.activePinId = action.payload;
      break;
    case openModalSaveFolderType:
      stateAction.mode = "createFolder";
      break;
    case openModalCreatePinType:
      stateAction.mode = "createPin";
      break;
    case closeModalsType:
      stateAction.mode = null;
      stateAction.activePinId = null;
      break;
    case fetchFoldersSuccessType:
      stateAction.folders = action.payload;
      break;
    case saveFoldersSuccessType:
      stateAction.folders = [...state.folders, action.payload];
      break;
    case savePinsSuccessType:
      stateAction.pins = [...state.pins, action.payload];
      break;
    case savePinInFolderSuccessType:
      stateAction.folders = action.payload;
      break;
    case removePinFromFolderSuccessType:
      stateAction.folders = action.payload;
      break;
    case deleteFolderSuccessType:
      stateAction.folders = action.payload;
      break;
    case deletePinSuccessType:
      stateAction = { ...stateAction, ...action.payload }
      break;
    case fetchPinsSuccessType:
      stateAction.pins = [...action.payload];
      break;
    case fetchGroupsSuccessType:
      stateAction.groups = [...action.payload];
      break;
    case setCurrentGroupSuccessType:
      stateAction.activeGroup = action.payload;
      break;
    default:
      break;
  }
  return { ...state, ...stateAction };
}
