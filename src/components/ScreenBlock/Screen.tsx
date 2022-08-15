import React, {FC} from "react";
import styles from "../../CounterApp.module.scss";
import {ErrorMessageType} from "../store/counterReducer";

type ScreenPropsType = {
    count: number | string;
    isMaxCount: boolean;
    error?: ErrorMessageType;
    message?: string;
}

const Screen: FC<ScreenPropsType>= ({count, isMaxCount, error, message}) => {

    return <div className={`${styles.screen} ${isMaxCount && styles.screenRedText} ${error?styles.screenRedText:""}`}>{error? error : message ? message : count}</div>
}

export default Screen;