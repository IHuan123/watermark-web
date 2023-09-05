import {
    useState,
    createRef,
    useImperativeHandle,
    useCallback,
    useRef,
    useEffect,
} from "react";
import { Alert, AlertColor, Snackbar, SnackbarOrigin, AlertTitle } from "@mui/material";
import Slide, { SlideProps } from '@mui/material/Slide';
import React from "react"



interface IOpen {
    message: string;
    type?: AlertColor;
    origin?: SnackbarOrigin;
    direction?: "down" | "up" | "left" | "right"
    duration?:number
}

interface INoticRef {
    open: (p: IOpen) => void;
    close: () => void;
}

export const NoticeRef = createRef<null | INoticRef>();

const Notice = () => {
    const [state, setState] = useState(false);
    const time = useRef<any>(null);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<AlertColor>("info");
    const [origin, setOrigin] = useState<SnackbarOrigin>({
        vertical: "bottom",
        horizontal: "right",
    });
    const [transition, setTransition] = useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);
    const [duration, setDuration] = useState<number>(3000)
    //! Bug  Snackbar 设置自动隐藏 功能需要提供 onClose 事件 但是点击页面一下就会触发onClose事件 无奈自己实现
    useEffect(() => {
        if (state) {
            time.current = setTimeout(() => {
                setState(false);
            }, duration);
        }
        return () => {
            clearTimeout(time.current);
            time.current = null;
        };
    }, [state, type, origin]);

    type TransitionProps = Omit<SlideProps, 'direction'>;

    //弹出方向
    const handleTransition = {
        left(props: TransitionProps) {
            return <Slide {...props} direction="left" />;
        },

        up(props: TransitionProps) {
            return <Slide {...props} direction="up" />;
        },

        right(props: TransitionProps) {
            return <Slide {...props} direction="right" />;
        },

        down(props: TransitionProps) {
            return <Slide {...props} direction="down" />;
        },
    }
    const close: any = useCallback(() => setState(false), []);
    const open = useCallback(({ message, type, origin, duration, direction = 'down' }: IOpen) => {
        type && setType(type);
        origin && setOrigin(origin);
        setTransition(() => handleTransition[direction]);
        setMessage(message);
        duration && setDuration(duration)
        setState(true);
    }, []);

    useImperativeHandle(NoticeRef, () => ({ close, open }), [close, open]);

    return (
        <Snackbar message={message} open={state} anchorOrigin={origin} TransitionComponent={transition}>
            <Alert onClose={close} severity={type}>
                <AlertTitle>{type}</AlertTitle>
                This is a {type} alert —<strong>{message}</strong>
            </Alert>
        </Snackbar>
    );
};

export default Notice;