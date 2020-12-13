import {
    ClickAwayListener, createStyles, Grow, IconButton, makeStyles, MenuItem,
    MenuList, Paper, Popper, Theme
} from '@material-ui/core';
import React from 'react';
import { Filter } from '../../structures/Filter';
import './FilterMenu.css';
import FilterIcon from './FIltersIcon';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            backgroundColor: "#9d46ff",
            color: "#FFFFFF",
            fontWeight: 600,
            fontFamily: "monospace",
            fontSize: "16px",
            margin: "8px",
            padding: "16px",
            width: "56px",
            height: "56px",
            '&:hover': {
                backgroundColor: "#7200ca"
            }
        },
        paper: {
            marginTop: "4px",
            backgroundColor: "#8eacbbbe",
            color: "white",
        }
    }),
);

interface FilterMenuProps {
    onSelect(filter: Filter): void
}

export default function FilterMenu(props: FilterMenuProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);
    return (
        <div className="FiltersContainer">
            <IconButton
                edge="end"
                className={classes.button}
                ref={anchorRef}
                onClick={handleToggle}
                color="primary">
                <FilterIcon></FilterIcon>
            </IconButton>
            <div>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper className={classes.paper}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={(e) => { props.onSelect(Filter.Grey); handleClose(e) }}>Серый</MenuItem>
                                        <MenuItem onClick={(e) => { props.onSelect(Filter.Red); handleClose(e) }}>Красный</MenuItem>
                                        <MenuItem onClick={(e) => { props.onSelect(Filter.Green); handleClose(e) }}>Зелёный</MenuItem>
                                        <MenuItem onClick={(e) => { props.onSelect(Filter.Blue); handleClose(e) }}>Синий</MenuItem>
                                        <MenuItem onClick={(e) => { props.onSelect(Filter.Brightness); handleClose(e) }}>Яркость</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}