import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, openModalSavePinAction, saveFoldersAction } from "../../storage/actions";
import { saveFoldersInitType, saveFoldersSuccessType } from "../../storage/types";

export const ModalCreateFolder = ({ open }) => {
    const [folderName,setFolderName] = useState('');
    const { state, dispatch } = useAppContext();
    const handleSubmit = (e) =>{
        e.preventDefault();
        saveFoldersAction(dispatch,folderName)
    }
    useEffect(() => {
      if (state.type === saveFoldersSuccessType) {
        if(state.activePinId){
          dispatch(openModalSavePinAction(state.activePinId));
        } else {
          dispatch(closeModalsAction());
        }
      }
    }, [state.type,dispatch,state.activePinId]);

    const handleChange = (e) => setFolderName(e.target.value);
  return (
    <Modal
      title="Criar Aluno"
      open={open}
      controls={[
        {
          label: "Salvar",
          loadingLabel: "Criando",
          loading: state.type === saveFoldersInitType,
          variant: "secondary",
          type: "submit",
          form: "form-create-folder",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="form-create-folder">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome do Aluno</Form.Label>
          <Form.Control type="text" placeholder="Ex: João, Maria..." value={folderName} onChange={handleChange}/>
        </Form.Group>
      </Form>
    </Modal>
  );
};
