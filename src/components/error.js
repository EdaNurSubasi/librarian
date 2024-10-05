import React from 'react'
import classNames from 'classnames'
import {makeStyles} from "@mui/styles"

import {red} from '@mui/material/colors'
import PropTypes from "prop-types"

import IconError from '@mui/icons-material/Error'

const useStyles = makeStyles((theme) => ({
    container:{
        display:'flex',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    inline:{
        display: 'flex',
        flexDirection:'row',

        justifyContent:'stretch'
    },
    icon:{
        color:red[500]
    },
    code:{
        fontSize:32,
        fontWeight:'bold'
    },
    text:{
        margin:4
    },

}))

function Component({children, error, inline, timeout, style, className, onHide, onClick} ) {

    const classes = useStyles()

    const handleHide = () => {
        onHide()
    }

    if (timeout) {
        setTimeout(() => {
            handleHide()
        }, timeout)
    }

    return (
        <div className={classNames(classes.container, inline ? classes.inline : null, className)} style={style?.container}>
            <div style={{flexDirection: inline ? 'row' : 'column', alignItems:'center', justifyContent:'flex-start', display: 'flex'}}>
                <IconError className={classes.icon} style={{width:inline ? 24 : 64, height:inline ? 24 : 64}}/>
                {!inline && <span className={classes.code} style={style?.text}>{error.code}</span>}
                <span className={classes.text} style={ !inline ? {textAlign: 'center', ...style?.text} : style?.text }>{error.translated}</span>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

Component.propTypes = {
    onHide: PropTypes.func,
}

export default Component
