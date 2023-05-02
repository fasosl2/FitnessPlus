import { Container } from "react-bootstrap";
import { ListGroup } from "../../components/ListGroup/ListGroup";
import { useAppContext } from "../../storage/AppContext";
import { useEffect, useState } from "react";
import { deleteFolderAction, fetchFoldersAction, fetchPinsAction, openModalSaveFolderAction } from "../../storage/actions";
import { FloatingPillButton } from "../../components/FloatingPillButton/FloatingPillButton";

export const MinhasPastas = () => {
  const { state, dispatch } = useAppContext();

  const [itensLoading,setItensLoading] = useState({});

  const handleDeleteFolderClick = async (folderId) => {
    setItensLoading(prevState => ({...prevState,[folderId]:true}))
    await deleteFolderAction(dispatch, folderId);
    setItensLoading(prevState => ({...prevState,[folderId]:false}))
  };
  useEffect(() => {
    fetchFoldersAction(dispatch);
    fetchPinsAction(dispatch);
  }, [dispatch]);

  const handlePlusButtonClick = () => {
    dispatch(openModalSaveFolderAction())
  }
  return (
    <Container>
    <FloatingPillButton label="+"  onClick={handlePlusButtonClick}/>
      <ListGroup
        state={state}
        items={state.folders.map((folder) => (
          { 
            key: folder.id,
            id: folder.id,
            title: folder.name, 
            total: folder.pins?.length,
            pins:folder.pins,
            control:{
              onClick:()=> handleDeleteFolderClick(folder.id),
              label: "Excluir",
              variant: "danger",
              loadingLabel: 'Excluindo',
              loading:itensLoading[folder.id]
            }
          }
        ))}
      />
    </Container>
  );
};
