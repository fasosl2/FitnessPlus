import { Card } from "../../components/Card/Card";
import { useAppContext } from "../../storage/AppContext";
import { deletePinAction, openModalSavePinAction } from "../../storage/actions";
export const CardContainer = (props) => {
    const {dispatch} = useAppContext()
    const handleClick = {
        save: (pinId) => dispatch(openModalSavePinAction(pinId)),
        delete: async (pinId) => {
            await deletePinAction(dispatch, pinId);
        }
}
    return (
        <Card {...props} onClick={handleClick}/>
    );
}