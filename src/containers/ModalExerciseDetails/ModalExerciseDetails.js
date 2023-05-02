import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, fetchGroupsAction, openModalSavePinAction } from "../../storage/actions";
import { savePinsInitType, savePinsSuccessType } from "../../storage/types";

export const ModalExerciseDetails = ({ open }) => {
  const [exerciseData,setExerciseData] = useState({reps:'', series: '',description:''});
    const { state, dispatch } = useAppContext();

    const handleSubmit = async (e) =>{
      e.preventDefault();
      dispatch(openModalSavePinAction(state.activePinId,
        {id: state.activePinId,
        ...exerciseData,
        clientId: state.activeClientId
      }));
  };
    useEffect(() => {
      if (state.type === savePinsSuccessType) {
        setExerciseData({reps:'', series: '',description:''});
        dispatch(closeModalsAction());
      }
    }, [state.type,dispatch]);

    
    useEffect(() => {
      fetchGroupsAction(dispatch);
    }, [dispatch]);

    const handleChange = (e,field) => setExerciseData(prevState => ({...prevState,[field]:e.target.value}));
  return (
    <Modal
      title="Detalhes do Exercício"
      open={open}
      controls={[
        {
          label: "Salvar",
          loadingLabel: "Salvando",
          loading: state.type === savePinsInitType,
          variant: "secondary",
          type: "submit",
          form: "form-criar-pin",
          onClick: () => {},
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="form-criar-pin">
        <Form.Group className="mb-3" controlId="formCreatePin">
          <Form.Label>Repetições</Form.Label>
          <Form.Control required type="number"
          placeholder="Ex: 1, 2, 3, 4..." 
          value={exerciseData?.reps} 
          onChange={(e) =>handleChange(e,'reps')}/>
          <br/>
          <Form.Label>Séries</Form.Label>
          <Form.Control required type="number"
          placeholder="Ex: 1, 2, 3, 4..." 
          value={exerciseData?.series} 
          onChange={(e) =>handleChange(e,'series')}/>
          <br/>
          <Form.Label>Observações</Form.Label>
          <Form.Control type="text"
          placeholder="Ex: Isometria" 
          value={exerciseData?.description} 
          onChange={(e) =>handleChange(e,'description')}/>
        </Form.Group>
      </Form>
    </Modal>
  );
};
