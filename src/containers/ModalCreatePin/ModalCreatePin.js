import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction, fetchGroupsAction, savePinsAction } from "../../storage/actions";
import { savePinsInitType, savePinsSuccessType } from "../../storage/types";

export const ModalCreatePin = ({ open }) => {
  const [exerciseData,setExerciseData] = useState({name:'',group:''});
    const { state, dispatch } = useAppContext();

    const handleSubmit = (e) =>{
        e.preventDefault();
        savePinsAction(dispatch,exerciseData);
    }

    useEffect(() => {
      if (state.type === savePinsSuccessType) {
        setExerciseData({name:'',group:''});
        dispatch(closeModalsAction());
      }
    }, [state.type,dispatch]);

    
    useEffect(() => {
      fetchGroupsAction(dispatch);
    }, [dispatch]);

    const handleChange = (e,field) => setExerciseData(prevState => ({...prevState,[field]:e.target.value}));
  return (
    <Modal
      title="Criar Exercício"
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
          <Form.Label>Nome do Exercício</Form.Label>
          <Form.Control required type="text"
          placeholder="Ex: Rosca Direta" 
          value={exerciseData?.name} 
          onChange={(e) =>handleChange(e,'name')}/>
          <br/>
          <select required 
          className="form-select form-select-md" 
          value={exerciseData?.group} 
          onChange={(e) =>handleChange(e,'group')}>
            <option disabled value="">Selecione uma Grupo Muscular</option>
            {state?.groups?.map(group => (<option value={group} key={group}>{group}</option>))}
            
          </select>
        </Form.Group>
      </Form>
    </Modal>
  );
};
