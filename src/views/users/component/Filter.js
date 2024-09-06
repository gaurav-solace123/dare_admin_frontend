import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

function Filter({ TitleForDropDown, dropDownData, dropDownValue, handleChangeDropDown, userRole,handleChangeSearch, setSearchTerm, searchTerm }) {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '',
        '&:hover': {
            backgroundColor: '',
            border: "1px solid"
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        border: "1px solid grey",
        height: '36px',
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        height: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(3)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '10ch',
                '&:focus': {
                    width: '13ch',
                },
            },
            fontSize: '0.875rem',
        },
    }));

    // const handleSearchChange = useCallback((event) => {
    //     setSearchTerm(event.target.value);
    // }, [setSearchTerm]);

    return (
        <Box sx={{ width: "70%", display: 'flex', gap: 2 }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    // value={searchTerm}
                    onChange={handleChangeSearch}
                />
            </Search>
            <FormControl fullWidth sx={{ minHeight: '36px' }}>
                <InputLabel id="demo-simple-select-label" sx={{ fontSize: '0.875rem', top: '-6px' }}>
                    {TitleForDropDown}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userRole}
                    label={TitleForDropDown}
                    onChange={handleChangeDropDown}
                    sx={{
                        fontSize: '0.875rem',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        height: '36px',
                    }}
                >
                    {dropDownData?.map((item) =>
                        <MenuItem value={item?.value} key={item?.value}>
                            {item?.label}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}

export default Filter;
