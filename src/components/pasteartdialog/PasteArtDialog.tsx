import { Button } from '@material-ui/core';
import React from 'react';
import '../../index.css';
import ReactiveDialog from '../reactivedialog/ReactiveDialog';

interface PasteArtDialogProps {
    isOpen: boolean,
    onSaveSize: Function,
    onChangeSize: Function,
    onClose: Function
}

export default function PasteArtDialog(props: PasteArtDialogProps) {
    return (
        <div>
            <ReactiveDialog
                title="Выберите действие"
                isOpen={props.isOpen}
                onClose={() => props.onClose()}>
                <Button autoFocus onClick={() => {
                    props.onSaveSize();
                    props.onClose()
                }} color="secondary">
                    Сохранить размер полотна
                    </Button>
                <Button autoFocus onClick={() => {
                    props.onChangeSize();
                    props.onClose();
                }} color="secondary">
                    Изменить размер полотна
                    </Button>
                <Button autoFocus
                    onClick={() => props.onClose()}
                    color="secondary">
                    Отмена
                    </Button>
            </ReactiveDialog>
        </div >
    );
}
