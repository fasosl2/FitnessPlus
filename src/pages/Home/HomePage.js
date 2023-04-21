import { Container, Row, Col } from "react-bootstrap";
import { ModalCreateFolder } from "../../containers/ModalCreateFolder/ModalCreateFolder";
import { ModalSavePin } from "../../containers/ModalSavePin/ModalSavePin";
import { useAppContext } from "../../storage/AppContext";
import { CardContainer } from "../../containers/CardContainer/CardContainer";
import { saveFoldersSuccessType } from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import { fetchPinsAction, sleep } from "../../storage/actions";

export const HomePage = () => {
  const { state,dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

const pinsTotalized = state.pins.map(pin => ({...pin,
total: state.folders.reduce((count,folder)=> folder.pins.includes(pin.id) ? ++count : count,0)
}));

  useEffect(() => {
    fetchPinsAction(dispatch);
  }, [dispatch]);

  const handleShowFeedback = async () => {
      setShowFeedback(true);
      await sleep(5000);
      setShowFeedback(false);
  }

  useEffect(() => {
    if (state.type === saveFoldersSuccessType) {
      handleShowFeedback();
    }
  }, [state.type]);

  return (
    <div>
      <ModalSavePin open={state.mode === "savePin"} />
      <ModalCreateFolder open={state.mode === "createFolder"} />
      {showFeedback && (
        <Notification
          message="Criado com sucesso"
          onClose={() => {
            setShowFeedback(false);
          }}
        />
      )}
      <Container fluid>
        <Row>
        {pinsTotalized.map((pin) =>(
          <Col key={pin.id} xs={12} md={3}>
            <CardContainer
              {...pin}
            />
          </Col>
        ))}
        </Row>
      </Container>
    </div>
  );
};
