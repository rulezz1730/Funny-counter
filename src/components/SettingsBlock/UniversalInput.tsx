import React, {ChangeEvent, FC, ReactNode,} from "react";
import styles from '../../CounterApp.module.scss'
import {MaxMinValueType} from "../../api/localStorageAPI";
import {log} from "util";
import {ErrorMessageType} from "../store/counterReducer";

type UniversalInputPropsType = {
    children: ReactNode;
    val: number;
    name: MaxMinValueType;
    setSettingCount: (newMaxMinCount: number, fieldNameLS: MaxMinValueType) => void;
    error: ErrorMessageType;
}

const UniversalInput: FC<UniversalInputPropsType> = ({val, name, setSettingCount, error, children}) => {

    const setCount = (e: ChangeEvent<HTMLInputElement>, name: MaxMinValueType) => {
        let value = e.currentTarget.value.replace(/\.[\d+$]+$/gi, '');
        setSettingCount(Number(value), name)
    }

    return (
        <label className={styles.universalInput}>
            <b>{children}</b>
            <input className={error? error && styles.errorInput : ''}
                   type="number"
                   value={val}
                   step={1}
                   onChange={(e) => {
                       setCount(e, name)
                   }}/>
        </label>)
}

export default UniversalInput;
