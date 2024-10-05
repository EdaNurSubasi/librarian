import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {useTheme} from "@mui/material/styles"

function Component(props) {
    const theme = useTheme()
    const {label} = props

    if (!label) {
        return(
            <CircularProgress {...props} />
        )
    }

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption"
                            style={{color: props.style?.color ?? theme.palette.white.main, fontSize:props.size / 1.5}}
                            component="div">{label}</Typography>
            </Box>
        </Box>
    );
}

export default Component
