import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
interface Icon  extends SvgIconProps{
    component?: any
}

const CustomIcon = (props:Icon) =>{
    return (
        <SvgIcon {...props}> {props.children} </SvgIcon>
    )
}

export default CustomIcon