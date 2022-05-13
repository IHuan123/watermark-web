import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import LanguageIcon from '@mui/icons-material/Language';
import ClearIcon from '@mui/icons-material/Clear';
interface InputProps {
  value: string
  onChange?: (e: any) => void
  onConfirm?: () => void
  onClear?:() => void
}

export default function CustomizedInputBase({ value, onChange, onConfirm, onClear }: InputProps) {
  return (
    <Paper
      component="form"
      sx={{ p: '4px 8px',boxSizing:"border-box", display: 'flex', alignItems: 'center', width: 700, background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", }}
    >
      <IconButton sx={{ p: '10px', color: "#fff" }} aria-label="url">
        <LanguageIcon color="inherit" />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, color: "#fff" }}
        placeholder="Enter Your URL"
        inputProps={{ 'aria-label': 'enter your url' }}
        value={value}
        onChange={onChange}
      />
      {
        value !== "" ? <IconButton color="primary" sx={{ p: '10px', color: "#eee" }} aria-label="directions" onClick={ onClear }>
          <ClearIcon fontSize={'inherit'} color="inherit" />
        </IconButton> : ""
      }
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px', color: "#eee" }} aria-label="directions" onClick={onConfirm}>
        <DirectionsIcon fontSize={'large'} color="inherit" />
      </IconButton>
    </Paper>
  );
}