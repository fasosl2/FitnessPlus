import { Button,Badge,Card as CardBS } from "react-bootstrap";

export const Card = ({id, image , title, total, onClick}) => {
  return (
    <CardBS>
      <CardBS.Img src={image} alt="Card image" />
      <CardBS.ImgOverlay>
      <Button variant="primary" onClick={() => onClick.save(id)}>
      Salvar <Badge bg="secondary">{total}</Badge>
    </Button>      
    <Button variant="danger" onClick={() => onClick.delete(id)}>
      Excluir
    </Button>
      </CardBS.ImgOverlay>
      <CardBS.Body>
      <CardBS.Title>{title}</CardBS.Title>
      </CardBS.Body>
    </CardBS>
    );
};
