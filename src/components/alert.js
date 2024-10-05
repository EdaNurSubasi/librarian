import React from "react"
import {Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import {translate} from "../localization"

export function Component({open, type, onClose, onConfirm, onCancel}) {
    return (
        <MuiDialog
            open={open}
            onClose={()=>{
                onClose && onClose()
            }}
        >
            <DialogTitle id="dialog-title">{translate.string(`alerts.${type}.title`)}</DialogTitle>
            <DialogContent>
                <DialogContentText id="dialog-description">
                    {translate.string(`alerts.${type}.description`)}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    onCancel && onCancel()
                    onClose && onClose()
                }} color="primary">
                    {translate.string(`alerts.${type}.cancel`)}
                </Button>
                <Button onClick={() => {
                    onConfirm && onConfirm()
                    onClose && onClose()
                }} color="secondary" autoFocus>
                    {translate.string(`alerts.${type}.confirm`)}
                </Button>
            </DialogActions>
        </MuiDialog>
    )
}

Component.propTypes = {
}

export default Component
