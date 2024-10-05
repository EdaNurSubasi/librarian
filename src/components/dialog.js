import React from "react"
import {
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    useMediaQuery
} from "@mui/material"
import {makeStyles, useTheme} from '@mui/styles'
import clsx from "clsx"

import CloseIcon from "@mui/icons-material/Close"

const useStyles = makeStyles((theme) => ({
    container: {

    },
    content: {
        display: "flex",
        flexDirection: "column",
        flex:1,
        padding: 0
    },
    title: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.white.main,
        padding: '16px 16px 16px 24px'
    },
    actions: {
        borderTop: `1px dotted ${theme.palette.grey2.main}`
    },
    full: {
        '&:first-child': {
            paddingTop: 0,
            overflow: 'visible'
        }
    }
}))


export function Component({open, title, actions, content, overrides, onClose, ...props}) {

    const classes = useStyles()
    const theme = useTheme()
    const sm = useMediaQuery(theme.breakpoints.down(600)) //TODO 'sm' was not working here?
    let {fullScreen} = props
    fullScreen = fullScreen ? fullScreen : sm

    const handleCloseButtonClick = () => {
        onClose && onClose()
    }

    return (
        <MuiDialog
            fullScreen={fullScreen}
            open={open}
            maxWidth={"md"}
            classes={overrides}
            onClose={()=>{
                onClose && onClose()
            }}
        >
            {title &&
                <DialogTitle id="dialog-title" className={classes.title}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        {title}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleCloseButtonClick}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </div>
                </DialogTitle>
            }
            <DialogContent className={clsx(classes.content, title ? null : classes.full)}>
                {content}
            </DialogContent>
            {actions &&
                <DialogActions className={classes.actions}>
                    {actions}
                </DialogActions>
            }
        </MuiDialog>
    )
}

Component.propTypes = {
}

export default Component
