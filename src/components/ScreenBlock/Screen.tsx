import React, {FC} from "react";
import styles from "../../CounterApp.module.scss";

type ScreenPropsType = {
    count: number | string;
    isMaxCount: boolean;
    message?: string;
    error?: string;
}

const Screen: FC<ScreenPropsType>= ({count, isMaxCount, message, error}) => {

    const viewMessage = error ? error : message
    console.log(error)

    return <div className={`${styles.screen} ${isMaxCount && styles.screenRedText} ${error?styles.screenRedText:""}`}>{viewMessage? viewMessage : count}</div>
}

export default Screen;