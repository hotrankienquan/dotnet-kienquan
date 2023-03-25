import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
    const dispatch = useAppDispatch();
    const {data,title} = useAppSelector(state => state.counter);
    return (
        <>
            {title}
        <Typography variant="h2">
            Contact page
            </Typography>
            <Typography variant="h5">
                the data is : {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(decrement(1))}>
                    decrease
                </Button>
                <Button onClick={() => dispatch(increment(2))}>     
                    increase
                </Button>
        </ButtonGroup>
        </>
    )
}