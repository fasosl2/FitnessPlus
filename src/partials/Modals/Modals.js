import { ModalCreateFolder } from "../../containers/ModalCreateFolder/ModalCreateFolder";
import { ModalCreatePin } from "../../containers/ModalCreatePin/ModalCreatePin";
import { ModalExerciseDetails } from "../../containers/ModalExerciseDetails/ModalExerciseDetails";
import { ModalSavePin } from "../../containers/ModalSavePin/ModalSavePin";
import { useAppContext } from "../../storage/AppContext";
import {
  openModalCreatePinType,
  openModalExerciseDetailsType,
  openModalSaveFolderType,
  openModalSavePinType,
} from "../../storage/types";

export const Modals = () => {
  
    const { state } = useAppContext();
  return (<>
    <ModalExerciseDetails open={state.mode === openModalExerciseDetailsType} />
    <ModalSavePin open={state.mode === openModalSavePinType} />
    <ModalCreateFolder open={state.mode === openModalSaveFolderType} />
    <ModalCreatePin open={state.mode === openModalCreatePinType} />
  </>);
};
