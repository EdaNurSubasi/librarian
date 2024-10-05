import React, {useState} from "react"
import {makeStyles} from "@mui/styles"
import {Avatar, ListItem, ListItemSecondaryAction, ListItemAvatar, ListItemText} from "@mui/material"

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex:1,
        justifyContent: 'stretch',
    },
    content: {
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        marginRight:12
    }
}))

function Component({item, key, title, detail, subtitle, avatar, tokens, actions, typography, onClick} ) {
    const classes = useStyles()
    const [selected, setSelected] = useState(null)

    const handleItemClick = (item) => {
        onClick && onClick(item)
        setSelected(item)
    }

    return (
        <ListItem button
                  key={key}
                  divider
                  selected={item.id === selected?.id} onClick={() => handleItemClick(item)}>
            {avatar &&
            <ListItemAvatar>
                <Avatar alt={title} src="/resources/images/doctor-profile.png" className={classes.avatar}/>
            </ListItemAvatar>
            }
            <ListItemText
                disableTypography={!typography}
                primary={
                    title ?
                        <div className={classes.content}>
                            {title}
                            {detail &&
                                <div>
                                    {detail}
                                </div>
                            }
                        </div>
                    :
                        null

                }
                secondary={
                    subtitle ?
                        <div className={classes.content}>
                            {subtitle}
                            {tokens &&
                                <div style={{display:'flex', flexDirection:'row', flex:0}}>
                                    {tokens.map(t => (
                                        t
                                    ))}
                                </div>
                            }
                        </div>
                    :
                        null
                }
            />
            {actions &&
            <ListItemSecondaryAction>
                {actions}
            </ListItemSecondaryAction>
            }
        </ListItem>
    )
}

Component.propTypes = {
}

export default Component
