import React, {useEffect, useState} from 'react';
import styles from './CounterApp.module.scss';
import Screen from "./components/ScreenBlock/Screen";
import UniversButton from "./components/ScreenBlock/UniversButton";
import UniversalInput from "./components/SettingsBlock/UniversalInput";

function CounterApp() {
    const errorMessages = {
        setupMessage: `Enter values and press 'Set'.`,
        maxNumGreaterStartNum: "Incorrect value!"
    }

    const [maxValue, minValue] = ["MaxValue", "StartValue"] //Use for set and get localStorage data, props for name UniversalInput and setStart and Max count in condition
    const [startCount, setStartCount] = useState<number>(Number(localStorage.getItem(minValue)) || 0);
    const [maxCount, setMaxCount] = useState<number>(Number(localStorage.getItem(maxValue)) || 5);
    const [count, setCount] = useState<number>(startCount);
    const [setupInProgress, setSetupInProgress] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const setInputValue = (val: number, name: string) => {
        val !== startCount && val !== maxCount && setSetupInProgress(true)
        if (name === maxValue) {
            setMaxCount(val);
            localStorage.setItem(maxValue, String(val));
        } else {
            setStartCount(val);
            localStorage.setItem(minValue, String(val));
        }
    };

    const handleSetSreenCount = (): void => {
        setCount(startCount);
        setSetupInProgress(false)
    };

    const handleIncrement = (): void => {
        count < maxCount && setCount(count + 1)
    };
    const handleReset = (): void => setCount(startCount);
    const isMaxCount: boolean = count === maxCount;
    const setupMessage: string = setupInProgress ? errorMessages.setupMessage : "";

    useEffect(() => {
        if (!Number.isInteger(maxCount) || !Number.isInteger(startCount) ||
            maxCount <= startCount || maxCount < 0 || startCount < 0 ||
            startCount > maxCount || startCount === maxCount) {
            setError(errorMessages.maxNumGreaterStartNum)
        } else if (maxCount > startCount) setError('')
    }, [setupInProgress, startCount, maxCount])

    const disableSetButton = error ? true : !setupInProgress;

    return (
        <div className={styles.counterApp}>
            <div className={styles.counter}>
                <div className={styles.inputBlock}>
                    <UniversalInput val={maxCount} name={maxValue} setSettingCount={setInputValue} error={error}>Max
                        value:</UniversalInput>
                    <UniversalInput val={startCount} name={minValue} setSettingCount={setInputValue} error={error}>Start
                        value:</UniversalInput>
                </div>
                <div className={styles.buttonBlock}>
                    <UniversButton callBack={handleSetSreenCount}
                                   isDisabled={disableSetButton}>Set</UniversButton>
                </div>
            </div>
            <div className={styles.counter}>
                <Screen count={count} isMaxCount={isMaxCount} message={setupMessage} error={error}/>
                <div className={styles.buttonBlock}>
                    <UniversButton callBack={handleIncrement}
                                   isDisabled={isMaxCount || setupInProgress}>Inc</UniversButton>
                    <UniversButton callBack={handleReset}
                                   isDisabled={setupInProgress ? setupInProgress : false}>Reset</UniversButton>
                </div>
            </div>
        </div>
    );
}

export default CounterApp;
