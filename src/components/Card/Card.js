import { Button,Badge,Card as CardBS } from "react-bootstrap";

export const Card = ({id, image , title, total, onClick}) => {
  return (
    <CardBS>
      <CardBS.Img src={image} alt="Card image" />
      <CardBS.ImgOverlay>
      <Button variant="primary" onClick={() => onClick(id)}>
      Salvar <Badge bg="secondary">{total}</Badge>
    </Button>
      </CardBS.ImgOverlay>
      <CardBS.Body>
      <CardBS.Title>{title}</CardBS.Title>
      </CardBS.Body>
    </CardBS>
    );
};
