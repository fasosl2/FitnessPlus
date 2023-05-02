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
  openModalExerciseDetailsType,
} from "./types";

export function reducer(state, action) {
  let stateAction = {type: action?.type};
  switch (action.type) {
    case openModalSavePinType:
      stateAction.mode = action.type;
      stateAction.activePinId = action.payload.pinId;
      stateAction.data = action.payload?.data;
      break;
    case openModalExerciseDetailsType:
      stateAction.mode = action.type
      stateAction.activeClientId = action.payload;
      break;
    case openModalSaveFolderType:
      stateAction.mode = action.type;
      break;
    case openModalCreatePinType:
      stateAction.mode = action.type;
      break;
    case closeModalsType:
      stateAction.mode = null;
      stateAction.activePinId = null;
      stateAction.activeClientId = null;
      stateAction.data = null;
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
      stateAction.data = null;
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
