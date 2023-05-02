import {
  Accordion,
  Badge,
  Col,
  ListGroup as ListGroupBS,
  Row,
} from "react-bootstrap";
import { Button } from "../Button/Button";
import { removePinFromFolderAction } from "../../storage/actions";
import { useState } from "react";
import { useAppContext } from "../../storage/AppContext";

export const ListGroup = ({ items = [] }) => {
  const { state, dispatch } = useAppContext();
  const [itensLoading, setItensLoading] = useState({});

  const handleDeletePinClick = async (folderId, pinId) => {
    setItensLoading((prevState) => ({
      ...prevState,
      [`${folderId}${pinId}`]: true,
    }));
    await removePinFromFolderAction(dispatch, folderId, pinId);
    setItensLoading((prevState) => ({
      ...prevState,
      [`${folderId}${pinId}`]: false,
    }));
  };

  return (
    <Accordion defaultActiveKey="0">
      {items.map((folder) => (
        <Accordion.Item key={folder.id} eventKey={folder.id}>
          <Accordion.Header>
            <Row style={{width:'100%'}} className="d-flex justify-content-between align-items-center">
              <Col style={{width:'fit-content'}}>
                {folder.control && <Button {...folder.control} />}
                {" " + folder.title}
              </Col>
              <Col  className="text-end">
                <Badge pill>{folder.total}</Badge>
              </Col>
            </Row>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <ListGroupBS>
                {state?.pins?.reduce(
                  (reducedPins, pin) =>
                    {
                      let currentPin = folder.pins.find((elem) => elem.id === pin.id);
                      return (currentPin &&
                      reducedPins.push(
                        <ListGroupBS.Item key={pin?.id}>
                          <Row style={{width:'100%'}}>
                            <Col md={2}>{pin.title}</Col>
                            <Col md={2}>{'Repetições: '+currentPin.reps}</Col>
                            <Col md={2}>{'Séries: '+currentPin.series}</Col>
                            <Col md={4}>{'Observações: '+currentPin.description}</Col>
                            <Col md={2}>
                              <Button
                                variant="danger"
                                onClick={() =>
                                  handleDeletePinClick(folder.id, pin.id)
                                }
                                label="Remover"
                                loadingLabel="Removendo"
                                loading={itensLoading[`${folder.id}${pin.id}`]}
                              />
                            </Col>
                          </Row>
                        </ListGroupBS.Item>
                      ) &&
                      reducedPins) ||
                    reducedPins},
                  []
                )}
              </ListGroupBS>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
