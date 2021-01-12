import {
    ClickAwayListener, createStyles, IconButton, makeStyles,
    MenuList, Paper, SvgIcon
} from '@material-ui/core';
import React from 'react';
import { Filter } from '../../structures/Filter';
import FilterIcon from './FIltersIcon';

const useStyles = makeStyles(() =>
    createStyles({
        filtersContainer: {
            minHeight: "65px",
            display: "flex",
            position: "fixed",
            textAlign: "start",
            verticalAlign: "middle",
            left: "9px",
            top: "332px",
            '&:hover': {
                '& $paper': {
                    display: "block",
                },
            },
        },
        button: {
            color: "#FFFFFF",
            fontWeight: 600,
            fontFamily: "monospace",
            fontSize: "16px",
            padding: "16px",
            width: "56px",
            height: "56px",
            margin: "auto 0",
            background: "rgba(0, 0, 0, 0.20)",
            boxShadow: "0 8px 32px 0 rgba( 255, 255, 255, 0.2 )",
            backdropFilter: "blur(10.0px)",
            WebkitBackdropFilter: "blur( 10.0px )",
            borderRadius: "32px",
            borderTop: "1px solid rgba( 255, 255, 255, 0.18 )",
            borderLeft: "1px solid rgba( 255, 255, 255, 0.18 )"
        },
        paper: {
            color: "white",
            display: "none",
            marginLeft: "8px",
            background: "rgba(0, 0, 0, 0.20)",
            boxShadow: "0 8px 32px 0 rgba( 255, 255, 255, 0.2 )",
            backdropFilter: "blur(10.0px)",
            WebkitBackdropFilter: "blur( 10.0px )",
            borderRadius: "32px",
            borderTop: "1px solid rgba( 255, 255, 255, 0.18 )",
            borderLeft: "1px solid rgba( 255, 255, 255, 0.18 )"
        },
        menuList: {
            display: "flex",
            '&:first-child': {
                marginLeft: "8px"
            },
            '&:last-child': {
                marginRight: "8px"
            }
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
        <div className={classes.filtersContainer}>
            <IconButton
                style={{}}
                edge="end"
                className={classes.button}
                ref={anchorRef}
                onClick={handleToggle}
                color="primary">
                <FilterIcon></FilterIcon>
            </IconButton>
            <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                        className={classes.menuList}
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}>
                        <IconButton onClick={(e) => { props.onSelect(Filter.Grey); handleClose(e) }}>
                            <SvgIcon viewBox="0 0 24 24">
                                <circle r="12" cx="12" cy="12"
                                    fill="#bebebe" />
                            </SvgIcon>
                        </IconButton>
                        <IconButton onClick={(e) => { props.onSelect(Filter.Red); handleClose(e) }}>
                            <SvgIcon viewBox="0 0 24 24">
                                <circle r="12" cx="12" cy="12"
                                    fill="#FF0000" />
                            </SvgIcon>
                        </IconButton>
                        <IconButton onClick={(e) => { props.onSelect(Filter.Green); handleClose(e) }}>
                            <SvgIcon viewBox="0 0 24 24">
                                <circle r="12" cx="12" cy="12"
                                    fill="#00FF00" />
                            </SvgIcon>
                        </IconButton>
                        <IconButton onClick={(e) => { props.onSelect(Filter.Blue); handleClose(e) }}>
                            <SvgIcon viewBox="0 0 24 24">
                                <circle r="12" cx="12" cy="12"
                                    fill="#0000FF" />
                            </SvgIcon>
                        </IconButton>
                        <IconButton onClick={(e) => { props.onSelect(Filter.Brightness); handleClose(e) }}>
                            <SvgIcon>
                                <path
                                    d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 
                                                        15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 
                                                        18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"
                                    fill="#FFFFFF" />
                            </SvgIcon>
                        </IconButton>
                        <IconButton onClick={(e) => { props.onSelect(Filter.Blur); handleClose(e) }}>
                            <SvgIcon>
                                <path
                                    d="M6 13c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 
                                                        4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 
                                                        .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3 
                                                        .5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM6 5c-.55 0-1 
                                                        .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm15 5.5c.28 0 
                                                        .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM14 7c.55 0 1-.45 
                                                        1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-3.5c.28 0 
                                                        .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm-11 10c-.28 
                                                        0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7 7c-.28 
                                                        0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm0-17c.28 0 
                                                        .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM10 7c.55 0 1-.45 
                                                        1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 5.5c-.83 0-1.5.67-1.5 
                                                        1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm8 .5c-.55 0-1 
                                                        .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 
                                                        1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 
                                                        1-.45 1-1-.45-1-1-1zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 
                                                        1-1-.45-1-1-1zm3 8.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM14 
                                                        17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 3.5c-.28 
                                                        0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm-4-12c-.83 
                                                        0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 
                                                        8.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4-4.5c-.83 
                                                        0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-4c-.83 
                                                        0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"
                                    fill="#FFFFFF" />
                            </SvgIcon>
                        </IconButton>
                    </MenuList>
                </ClickAwayListener>
            </Paper>
        </div >
    );
}