import { FC } from "react"
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


interface TagProps{
    icon:string,
    title:string
}


const Tag:FC<TagProps> = () => {
    return (
        <Stack direction="row" spacing={1}>
        <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
        <Chip
          avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
          label="Avatar"
          variant="outlined"
        />
      </Stack>
    )
}

export default Tag