
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "react-query";
import { CarForm, jsonCarFormDef, jsonCarFormInitState, createNewCar} from "../api/car-request";
import { Form } from "../components/Form";
import { NavBar } from "../components/NavBar";

export type FormPageProp = {
    edit:boolean
}

export function AddCarPage(){

    const queryClient = useQueryClient();
    const router = useNavigate();

    const createCarMutation = useMutation(createNewCar, {
        onSuccess: () => queryClient.invalidateQueries("carcache") // whenever we successfully create a player. React Query will automatically refresh the players cache
    });

    function submitData(form:CarForm){
        createCarMutation.mutate(form);
        router("/")
    }

    return <>
        <NavBar left={[{text:"Home",callback:()=>{router("/")}}]} right={[]} />
        <Form def={jsonCarFormDef} initState={jsonCarFormInitState} handler={submitData} buttonText="Add New Car"/>
    </>
}