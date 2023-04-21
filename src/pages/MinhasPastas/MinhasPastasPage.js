import { Container } from "react-bootstrap";
import { ListGroup } from "../../components/ListGroup/ListGroup";
import { useAppContext } from "../../storage/AppContext";
import { useEffect } from "react";
import { fetchFoldersAction } from "../../storage/actions";

export const MinhasPastas = () => {
  
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    fetchFoldersAction(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <ListGroup
        items={state.folders.map((folder, folderIndex) => (
          { title: folder.name, total: folder.pins?.length }
        ))}
      />
    </Container>
  );
};
