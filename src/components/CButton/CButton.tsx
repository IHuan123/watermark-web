import { styled } from '@mui/material/styles';
import Button,{ ButtonProps } from '@mui/material/Button';
import { blueGrey } from '@mui/material/colors';

// const CButton = styled(Button)({
//     boxShadow: 'none',
//     textTransform: 'none',
//     fontSize: 16,
//     padding: '6px 12px',
//     border: '1px solid',
//     lineHeight: 1.5,
//     backgroundColor: '#0063cc',
//     borderColor: '#0063cc',
//     fontFamily: [
//         '-apple-system',
//         'BlinkMacSystemFont',
//         '"Segoe UI"',
//         'Roboto',
//         '"Helvetica Neue"',
//         'Arial',
//         'sans-serif',
//         '"Apple Color Emoji"',
//         '"Segoe UI Emoji"',
//         '"Segoe UI Symbol"',
//       ].join(','),
//       '&:hover': {
//         backgroundColor: '#0069d9',
//         borderColor: '#0062cc',
//         boxShadow: 'none',
//       },
//       '&:active': {
//         boxShadow: 'none',
//         backgroundColor: '#0062cc',
//         borderColor: '#005cbf',
//       },
//       '&:focus': {
//         boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
//       },
// })

const CButton = styled(Button)<ButtonProps>(({ theme })=>({
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(10px)",
    margin:"10px",
    '&:hover': {
      backgroundColor: blueGrey[700],
    },
}))


export default CButton