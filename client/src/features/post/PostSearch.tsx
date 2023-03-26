import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { setPostParams } from "./postSlice";

export default function Search() {
    const { postParams } = useAppSelector(state => state.post);
    const [searchTerm, setSearchTerm] = useState(postParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setPostParams({ searchTerm: event.target.value }))
    }, 1000)

    return (
        <TextField
            label='Search products'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}