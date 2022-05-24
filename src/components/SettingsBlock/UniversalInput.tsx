import React, {FC, ReactNode,} from "react";
import styles from '../../CounterApp.module.scss'

type UniversalInputPropsType = {
    children: ReactNode;
    val: number;
    name: string;
    setSettingCount: (val: number, name: string) => void;
    error: string;
}

const UniversalInput: FC<UniversalInputPropsType> = ({val, name, setSettingCount, error,children}) => {

    return (
        <label className={styles.universalInput }>
            <b>{children}</b>
            <input className={error && styles.errorInput} type="number" value={val} onChange={(e) => {
                setSettingCount(Number(e.currentTarget.value), name)
            }}/>
        </label>)
}

export default UniversalInput;
