import { Modal } from "../../components/Modal/Modal";
import { ListGroup, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button/Button";
import { useAppContext } from "../../storage/AppContext";
import { useEffect, useState } from "react";
import {
  fetchFoldersAction,
  savePinInFolderAction,
  openModalSaveFolderAction,
  deletePinFromFolderAction,
} from "../../storage/actions";

export const ModalSavePin = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [itensLoading,setItensLoading] = useState({});

  const handleClickCreateFolder = () => {
    dispatch(openModalSaveFolderAction());
  };

  const handleSavePinClick = async (folderId) => {
    setItensLoading(prevState => ({...prevState,[folderId]:true}))
    await savePinInFolderAction(dispatch, folderId, state.activePinId);
    setItensLoading(prevState => ({...prevState,[folderId]:false}))
  };

  const handleDeletePinClick = async (folderId) => {
    setItensLoading(prevState => ({...prevState,[folderId]:true}))
    await deletePinFromFolderAction(dispatch, folderId, state.activePinId);
    setItensLoading(prevState => ({...prevState,[folderId]:false}))
  };

  useEffect(() => {
    fetchFoldersAction(dispatch);
  }, [dispatch]);

  return (
    <Modal
      title="Salvar Pin"
      open={open}
      controls={[
        {
          label: "Criar Pasta",
          loadingLabel: "Criando",
          loading: false,
          variant: "secondary",
          onClick: handleClickCreateFolder,
        },
      ]}
    >
      <ListGroup variant="flush">
        {state?.folders?.map((folder, folderIndex) => {
          let pinSaved = folder.pins.find(pin => pin === state.activePinId)
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
