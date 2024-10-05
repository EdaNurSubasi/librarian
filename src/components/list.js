import React from "react"
import {makeStyles} from "@mui/styles"
import {List} from "@mui/material"

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex:1,
        justifyContent: 'stretch',
    },
    content: {

    }
}))

function Component({items, component, props, typography, onAction} ) {
    const classes = useStyles()

    const handleItemClick = (item) => {
    }

    const Renderer = component

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <List>
                    {items.map( item => (
                        <Renderer item={item}
                                  typography={typography}
                                  key={item.id}
                                  props={props}
                                  onAction={onAction}
                                  onClick={() => handleItemClick(item)}/>
                    ))}
                </List>
            </div>
        </div>
    )
}

Component.propTypes = {
}

export default Component
