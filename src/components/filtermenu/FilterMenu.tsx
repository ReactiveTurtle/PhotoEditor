import {
    Button, ClickAwayListener, createStyles, Grow, makeStyles, MenuItem,
    MenuList, Paper, Popper, Theme
} from '@material-ui/core';
import React from 'react';
import { Filter } from '../../structures/Filter';
import './FilterMenu.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            backgroundColor: "#0091ea",
            color: "#FFFFFF",
            fontWeight: 600,
            fontFamily: "monospace",
            fontSize: "16px",
            borderRadius: "16px",
            padding: "8px 16px",
            margin: "8px",
            '&:hover': {
                backgroundColor: "#0064b7"
            }
        },
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
            <Button
                className={classes.button}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
                disableElevation>
                Фильтры
            </Button>
            <div>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={(e) => {props.onSelect(Filter.Grey); handleClose(e)}}>Серый</MenuItem>
                                        <MenuItem onClick={(e) => {props.onSelect(Filter.Red); handleClose(e)}}>Красный</MenuItem>
                                        <MenuItem onClick={(e) => {props.onSelect(Filter.Green); handleClose(e)}}>Зелёный</MenuItem>
                                        <MenuItem onClick={(e) => {props.onSelect(Filter.Blue); handleClose(e)}}>Синий</MenuItem>
                                        <MenuItem onClick={(e) => {props.onSelect(Filter.Brightness); handleClose(e)}}>Яркость</MenuItem>
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