import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            userSelect: "none",
            '& .MuiOutlinedInput-root': {
                borderRadius: "24px",
            }
        }
    }));

export default useStyles;