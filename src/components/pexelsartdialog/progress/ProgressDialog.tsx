import { Box, LinearProgress, LinearProgressProps, Typography } from '@material-ui/core';
import React from 'react';
import ReactiveDialog from '../../reactivedialog/ReactiveDialog';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

interface ProgressDialogProps {
    progress: number;
    isOpen: boolean;
}

export default function ProgressDialog({ progress, isOpen }: ProgressDialogProps) {
    return (
        <ReactiveDialog
            paperStyle={{ width: "400px" }}
            title="Загрузка..."
            isOpen={isOpen}
            onClose={() => { }}>
            <LinearProgressWithLabel value={progress} />
        </ReactiveDialog>
    );
}