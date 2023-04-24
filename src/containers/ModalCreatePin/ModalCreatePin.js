import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, savePinsAction } from "../../storage/actions";
import { savePinsInitType, savePinsSuccessType } from "../../storage/types";

export const ModalCreatePin = ({ open }) => {
    const [pinName,setPinName] = useState('');
    const { state, dispatch } = useAppContext();
    const handleSubmit = (e) =>{
        e.preventDefault();
        savePinsAction(dispatch,pinName)
    }
    useEffect(() => {
      if (state.type === savePinsSuccessType) {
        setPinName('');
        dispatch(closeModalsAction());
      }
    }, [state.type,dispatch]);

    const handleChange = (e) => setPinName(e.target.value);
  return (
    <Modal
      title="Criar Pin"
      open={open}
      controls={[
        {
          label: "Criar e Salvar",
          loadingLabel: "Criando",
          loading: state.type === savePinsInitType,
          variant: "secondary",
          type: "submit",
          form: "form-criar-pasta",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="form-criar-pasta">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome do Pin</Form.Label>
          <Form.Control type="text" placeholder="Ex: Trigonometria" value={pinName} onChange={handleChange}/>
        </Form.Group>
      </Form>
    </Modal>
  );
};
