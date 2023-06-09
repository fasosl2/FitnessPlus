import { Container, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { CardContainer } from "../../containers/CardContainer/CardContainer";
import { saveFoldersSuccessType } from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import { fetchPinsAction, openModalCreatePinAction, sleep } from "../../storage/actions";
import { FloatingPillButton } from "../../components/FloatingPillButton/FloatingPillButton";

export const HomePage = () => {
  const { state,dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

const pinsTotalized = state.pins.map(pin => ({...pin,
total: state.folders.reduce((count,folder)=> folder.pins.find(elem => elem.id === pin.id) ? ++count : count,0)
}));
  
  useEffect(() => {
    fetchPinsAction(dispatch,state?.activeGroup);
  }, [dispatch,state.activeGroup]);

  const handleShowFeedback = async () => {
      setShowFeedback(true);
      await sleep(5000);
      setShowFeedback(false);
  }

  
  const handlePlusButtonClick = (pinId) => {
    dispatch(openModalCreatePinAction())
  }

  useEffect(() => {
    if (state.type === saveFoldersSuccessType) {
      handleShowFeedback();
    }
  }, [state.type]);

  return (
    <div>
      {/* {<>
        {'Pin: '+state.activePinId}{' Client: '+ state.activeClientId} 
        <br/> 
        {'Data: '+ JSON.stringify(state.data)}
      </>
      } */}
      <FloatingPillButton label="+"  onClick={handlePlusButtonClick}/>
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
