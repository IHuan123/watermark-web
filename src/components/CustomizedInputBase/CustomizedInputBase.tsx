import React ,{ useState, useMemo } from "react"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import LanguageIcon from '@mui/icons-material/Language';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Box from '@mui/material/Box';
import { Throttle } from "@/utils/index"
interface InputProps {
  value: string
  onChange?: (e: any) => void
  onConfirm: () => Promise<boolean>
  onClear?: () => void
}

type StateType = 'success' | 'error' | 'none'
const ParseButton = ({ onClick, state, loading }: { onClick: () => void, state: StateType, loading:boolean }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box  sx={{ m:1, position:"relative" }}>
        {loading && (
          <CircularProgress
            size={50}
            sx={{
              color: "#fff",
              position: 'absolute',
              top: "50%",
              left: "50%",
              marginTop:"-25px",
              marginLeft:"-25px",
              zIndex:1,
            }}
          />
        )}
        <IconButton color="primary" sx={{ p: '10px', color: "#eee" }} aria-label="directions" onClick={onClick}>
          { state==='none' &&<DirectionsIcon fontSize={'large'} color="inherit" /> }
          { state === 'success' && <CheckIcon fontSize={'large'} color="success" /> }
          { state==='error'&&<ErrorOutlineIcon fontSize={'large'} color="warning"/>}
        </IconButton>
      </Box>      
    </Box>

  )
}
const throttle = new Throttle()
export default function CustomizedInputBase({ value, onChange, onConfirm, onClear }: InputProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [btnState, setBtnState] = useState<StateType>("none")
  const disable = useMemo(() => loading, [loading])
  const stateBg = {
    error:{
      color:"rgba(255, 87, 34,.2)"
    },
    none:{
      color:"rgba(255,255,255,.2)"
    },
    success:{
      color:"rgba(76, 175, 80,.2)"
    }
  }

  const handleClick = (): void => {
    setLoading(true)
    setBtnState("none")
    onConfirm().then(res => {
      setLoading(false)
      handleBtnState(res ? "success" : "error")
    }).catch(e => {
      setLoading(false)
      handleBtnState("error")
    })
  }
  
  const throttleClick = throttle.use(handleClick)
  const reset = () => {
    setLoading(false)
    setBtnState("none")
  }
  const handleBtnState = (state:StateType)=>{
    setBtnState(state)
    state==="error" && setTimeout(()=>{
      setBtnState("none")
    },2000)
  }
  const handleClear = () => {
    onClear && onClear()
    reset()
  }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', boxSizing: "border-box", display: 'flex', alignItems: 'center', width: "700px", background: stateBg[btnState].color, backdropFilter: "blur(10px)", }}
    >
      <IconButton sx={{ p: '10px', color: "#fff" }} aria-label="url">
        <LanguageIcon color="inherit" />
      </IconButton>
      <InputBase
        disabled={disable}
        sx={{ ml: 1, flex: 1, color: "#fff" }}
        placeholder="Enter Your URL"
        inputProps={{ 'aria-label': 'enter your url' }}
        value={value}
        onChange={onChange}
      />
      {
        value !== "" ? <IconButton color="primary" sx={{ p: '10px', color: "#eee" }} aria-label="directions" onClick={handleClear}>
          <ClearIcon fontSize={'inherit'} color="inherit" />
        </IconButton> : ""
      }
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <ParseButton loading={loading} state={btnState} onClick={ throttleClick } />
    </Paper>
  );
}