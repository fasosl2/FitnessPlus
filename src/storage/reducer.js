import {
  closeModalsType,
  deletePinFromFolderSuccessType,
  fetchFoldersSuccessType,
  fetchPinsSuccessType,
  openModalSaveFolderType,
  openModalSavePinType,
  saveFoldersInitType,
  saveFoldersSuccessType,
  savePinInFolderSuccessType,
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
    case saveFoldersInitType:
      break;
    case savePinInFolderSuccessType:
      stateAction.folders = action.payload;
      break;
    case deletePinFromFolderSuccessType:
      stateAction.folders = action.payload;
      break;
    case fetchPinsSuccessType:
      stateAction.pins = [...action.payload];
      break;
    default:
      break;
  }
  return { ...state, ...stateAction };
}
