import { Modal } from "../../components/Modal/Modal";
import { ListGroup, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button/Button";
import { useAppContext } from "../../storage/AppContext";
import { useEffect, useState } from "react";
import {
  fetchFoldersAction,
  openModalSaveFolderAction,
  removePinFromFolderAction,
  openModalExerciseDetailsAction,
  savePinInFolderAction,
} from "../../storage/actions";

export const ModalSavePin = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [itensLoading,setItensLoading] = useState({});

  const handleClickCreateFolder = () => {
    dispatch(openModalSaveFolderAction());
  };

  
  const handleSavePinClick = (clientId) => {
    dispatch(openModalExerciseDetailsAction(clientId));
  }

  

  const savePinInFolder = async () => {
    setItensLoading(prevState => ({...prevState,[state.activeClientId]:true}))
    await savePinInFolderAction(dispatch, state.data);
    setItensLoading(prevState => ({...prevState,[state.activeClientId]:false}))
  };

  const handleDeletePinClick = async (folderId) => {
    setItensLoading(prevState => ({...prevState,[folderId]:true}))
    await removePinFromFolderAction(dispatch, folderId, state.activePinId);
    setItensLoading(prevState => ({...prevState,[folderId]:false}))
  };

  useEffect(() => {
    if(state.data){
      savePinInFolder();
    } else {
      fetchFoldersAction(dispatch);
    }
  },[dispatch,state.data]);

  return (
    <Modal
      title="Salvar Pin"
      open={open}
      controls={[
        {
          label: "Criar Aluno",
          loadingLabel: "Criando",
          loading: false,
          variant: "secondary",
          onClick: handleClickCreateFolder,
        },
      ]}
    >
      <ListGroup variant="flush">
        {state?.folders?.map((folder, folderIndex) => {
          let pinSaved = folder.pins.find(pin => pin.id === state.activePinId)
          return (
          <ListGroup.Item key={folderIndex}>
            <Row>
              <Col xs={8}>{folder.name}</Col>
              <Col xs={4} className="text-end">
                <Button
                  variant={pinSaved ? 'danger' : 'primary'}
                  onClick={pinSaved ? () => handleDeletePinClick(folder.id) : () => handleSavePinClick(folder.id)}
                  label={pinSaved ? 'Remover' : 'Salvar'}
                  loadingLabel={pinSaved ? 'Removendo' : 'Salvando'}
                  loading={itensLoading[folder.id]}
                />
              </Col>
            </Row>
          </ListGroup.Item>
        )}
        )}
      </ListGroup>
    </Modal>
  );
};
