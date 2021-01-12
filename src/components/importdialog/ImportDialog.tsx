import React from 'react';
import '../../index.css';
import {
    IconButton, List, ListItem,
    ListItemIcon, ListItemText, SvgIcon
} from '@material-ui/core';
import { ImportType } from '../../structures/ImportType';
import ReactiveDialog from '../reactivedialog/ReactiveDialog';

interface ImportDialogProps {
    onApply(importType: ImportType): void
}

export default function ImportDialog(props: ImportDialogProps) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenWithAction = (type: ImportType) => {
        props.onApply(type);
        handleClose();
    };

    return (
        <div>
            <IconButton
                color="inherit"
                onClick={handleClickOpen}>
                <SvgIcon viewBox="0 0 24 24">
                    <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z" />
                </SvgIcon>
            </IconButton>
            <ReactiveDialog
                isOpen={open}
                title="Вставка изображения"
                onClose={handleClose}
                paperStyle={{
                    width: "320px",
                }}>
                <List
                    style={{
                        color: "#FFFFFFa5"
                    }}
                    component="nav" aria-label="">
                    <ListItem button onClick={() => handleClickOpenWithAction(ImportType.STORAGE)}>
                        <ListItemIcon>
                            <SvgIcon viewBox="0 0 24 24">
                                <path
                                    fill="#F5F5F58a"
                                    d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z" />
                            </SvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Компьютер" />
                    </ListItem>
                    <ListItem button onClick={() => handleClickOpenWithAction(ImportType.PEXELS)}>
                        <ListItemIcon>
                            <SvgIcon viewBox="0 0 32 32">
                                <path d="M2 0h28a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
                                    fill="#05A081" />
                                <path d="M13 21h3.863v-3.752h1.167a3.124 3.124 0 1 0 0-6.248H13v10zm5.863 2H11V9h7.03a5.124 5.124 0 0 1 .833 10.18V23z"
                                    fill="#fff" />
                            </SvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Сервис Pexels" />
                    </ListItem>
                    <ListItem button onClick={() => handleClickOpenWithAction(ImportType.WEB_CAMERA)}>
                        <ListItemIcon>
                            <SvgIcon viewBox="0 0 24 24">
                                <path
                                    fill="#F5F5F58a"
                                    d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 
                                        2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 
                                        9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 
                                        4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 
                                        12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 
                                        2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 
                                        15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 
                                        2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z" />
                            </SvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Веб-камера" />
                    </ListItem>
                </List>
            </ReactiveDialog>
        </div>
    );
}
