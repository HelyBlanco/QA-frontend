import React, { useState } from "react";

import { IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ConfirmationDialogEditRequerimiento from "../../Shared/ModalEditRequerimiento";

const options = [
    'Editar estado',
  ];
  
const ITEM_HEIGHT = 48;

const VerticalMenuRequerimiento = ({item,fn}) => {
const [anchorEl, setAnchorEl] = React.useState(null);
const [confirmationOpen, setConfirmationOpen] = useState(false);
const [data,setData] = useState({});

const open = Boolean(anchorEl);

const handleClick = (event) => {
setAnchorEl(event.currentTarget);
};

const handleClose = () => {
setAnchorEl(null);
};

const handleCloseItem = () =>{
    setData({id:item.id});
    setConfirmationOpen(true)
    setAnchorEl(null);
}

const handleConfirmationClose = (newValue) => {
    setConfirmationOpen(false)
    if(newValue)
    {
        fn(newValue)
    }
}

return (
    <div>
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                paper: {
                    style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                    },
                },
                }}
            >
                {options.map((option) => (
                <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleCloseItem}>
                    {option}
                </MenuItem>
                ))}
            </Menu>
            <ConfirmationDialogEditRequerimiento id="confirmation" keepMounted open={confirmationOpen} onClose={handleConfirmationClose} value={data} message="nothing"/>
    </div>
);
};

export default VerticalMenuRequerimiento;