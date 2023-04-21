import { Card } from "../../components/Card/Card";
import { useAppContext } from "../../storage/AppContext";
import { openModalSavePinAction } from "../../storage/actions";
export const CardContainer = (props) => {
    const {dispatch} = useAppContext()
    const handleClick = (pinId) => {
        dispatch(openModalSavePinAction(pinId))
    }
    return (
        <Card {...props} onClick={handleClick}/>
    );
}