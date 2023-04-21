import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, saveFoldersAction } from "../../storage/actions";
import { saveFoldersInitType, saveFoldersSuccessType } from "../../storage/types";

export const ModalCreateFolder = ({ open }) => {
    const [folderName,setFolderName] = useState('');
    const { state, dispatch } = useAppContext();
    const handleSubmit = (e) =>{
        e.preventDefault();
        saveFoldersAction(dispatch,folderName,state.activePinId)
    }
    useEffect(() => {
      if (state.type === saveFoldersSuccessType) {
        dispatch(closeModalsAction());
      }
    }, [state.type,dispatch]);

    const handleChange = (e) => setFolderName(e.target.value);
  return (
    <Modal
      title="Criar Pasta"
      open={open}
      controls={[
        {
          label: "Criar e Salvar",
          loadingLabel: "Criando",
          loading: state.type === saveFoldersInitType,
          variant: "secondary",
          type: "submit",
          form: "form-criar-pasta",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="form-criar-pasta">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome da pasta</Form.Label>
          <Form.Control type="text" placeholder="Ex: Matemática" value={folderName} onChange={handleChange}/>
        </Form.Group>
      </Form>
    </Modal>
  );
};
