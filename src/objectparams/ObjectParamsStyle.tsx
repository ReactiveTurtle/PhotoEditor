import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: "8px 0",
            color: "#000000",
            '& label': {
                color: "#aa00ff"
            },
            '& .MuiOutlinedInput-root': {
                backgroundColor: "#FFFFFFa5",
                boxShadow: "4px 4px 16px #646464a5, -4px -4px 16px #ffffffa5",

                '& fieldset': {
                    borderColor: "#aa00ff"
                },
                '&:hover fieldset': {
                    borderColor: "#aa00ff",
                },
                '&.Mui-focused fieldset': {
                    borderColor: "#aa00ff"
                }
            }
        }
    }));

export default useStyles;