import { Container } from "react-bootstrap";
import { ListGroup } from "../../components/ListGroup/ListGroup";
import { useAppContext } from "../../storage/AppContext";
import { useEffect, useState } from "react";
import { deleteFolderAction, fetchFoldersAction } from "../../storage/actions";

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
  }, [dispatch]);

  return (
    <Container>
      <ListGroup
        items={state.folders.map((folder, folderIndex) => (
          { 
            key: folder.id,
            id: folder.id,
            title: folder.name, 
            total: folder.pins?.length,
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
