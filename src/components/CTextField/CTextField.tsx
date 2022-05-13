import { styled } from '@mui/material/styles';
import TextField ,{ TextFieldProps } from '@mui/material/TextField';


const CTextField = styled(TextField)<TextFieldProps>(({theme})=>({
    borderColor:"#fff",
    background:"rgba(0,0,0,0.3)",
    borderRadius:"4px",
    backdropFilter: "blur(10px)",
    '&:hover': {
        backgroundColor: "rgba(50,50,50,0.3)",
      },
}))
export default CTextField