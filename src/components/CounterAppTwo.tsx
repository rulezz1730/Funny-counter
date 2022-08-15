import React, {useEffect} from 'react';
import styles from '../CounterApp.module.scss';
import Screen from "./ScreenBlock/Screen";
import UniversButton from "./ScreenBlock/UniversButton";
import UniversalInput from "./SettingsBlock/UniversalInput";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import {
    incrementValue,
    InitialStateType,
    resetValue,
    setMaxMinCountThunk, setSettingsDisplayThunk, setSettingsThunk, setStartAmountValueThunk,
} from "./store/counterReducer";
import {MaxMinValueType, maxValue, minValue} from "../api/localStorageAPI";
import {Dispatch} from "redux";

//
// function CounterAppTwo() {
//     const errorMessages = {
//         setupMessage: `Enter values and press 'Set'.`,
//         maxNumGreaterStartNum: "Incorrect value!"
//     }
//
//     const [maxValue, minValue] = ["MaxValue", "StartValue"] //Use for set and get localStorage data, props for name UniversalInput and setStart and Max count in condition
//     const [startCount, setStartCount] = useState<number>(Number(localStorage.getItem(minValue)) || 0);
//     const [marxCount, setMaxCount] = useState<number>(Number(localStorage.getItem(maxValue)) || 5);
//     const [count, setCount] = useState<number>(startCount);
//     const [setupInProgress, setSetupInProgress] = useState<boolean>(false)
//     const [error, setError] = useState<string>('')
//     const [displaySettings, setDisplaySettiong] = useState<boolean>(false)
//
//     const setInputValue = (val: number, name: string) => {
//         val !== startCount && val !== maxCount && setSetupInProgress(true)
//         if (name === maxValue) {
//             setMaxCount(val);
//             localStorage.setItem(maxValue, String(val));
//         } else {
//             setStartCount(val);
//             localStorage.setItem(minValue, String(val));
//         }
//     };
//
//     const handleSetSreenCount = (): void => {
//         setCount(startCount);
//         setSetupInProgress(false);
//         setDisplaySettiong(!displaySettings);
//     };
//
//     const handleIncrement = (): void => {
//         count < maxCount && setCount(count + 1)
//     };
//     const handleReset = (): void => setCount(startCount);
//     const isMaxCount: boolean = count === maxCount;
//     const setupMessage: string = setupInProgress ? errorMessages.setupMessage : "";
//
//     useEffect(() => {
//         if (!Number.isInteger(maxCount) || !Number.isInteger(startCount) ||
//             maxCount <= startCount || maxCount < 0 || startCount < 0 ||
//             startCount > maxCount || startCount === maxCount) {
//             setError(errorMessages.maxNumGreaterStartNum)
//         } else if (maxCount > startCount) setError('')
//     }, [setupInProgress, startCount, maxCount])
//
//     const disableSetButton = !!error;
//
//     return (
//         <div className={styles.counterApp}>
//             <div className={!displaySettings? styles.displayNone: styles.counter}>
//                 <div className={styles.inputBlock}>
//                     <UniversalInput val={maxCount} name={maxValue} setSettingCount={setInputValue} error={error}>Max
//                         value:</UniversalInput>
//                     <UniversalInput val={startCount} name={minValue} setSettingCount={setInputValue} error={error}>Start
//                         value:</UniversalInput>
//                 </div>
//                 <div className={styles.buttonBlock}>
//                     <UniversButton callBack={handleSetSreenCount} isDisabled={error? disableSetButton : false}>Set</UniversButton>
//                 </div>
//             </div>
//             <div className={displaySettings? styles.displayNone: styles.counter}>
//                 <Screen count={count} isMaxCount={isMaxCount} message={setupMessage} error={error}/>
//                 <div className={styles.buttonBlock}>
//                     <UniversButton callBack={handleIncrement} isDisabled={isMaxCount || setupInProgress}>Inc</UniversButton>
//                     <UniversButton callBack={handleReset} isDisabled={setupInProgress ? setupInProgress : false}>Reset</UniversButton>
//                     <UniversButton callBack={()=>{setDisplaySettiong(!displaySettings)}} isDisabled={false}>Set</UniversButton>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default CounterAppTwo;

const CounterAppTwo = () => {
    const counter = useSelector<RootReducerType, InitialStateType>(state => state.counter);
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        dispatch(setStartAmountValueThunk())
    }, [dispatch])

    const handleSetSettingsDisplay = () => {
        dispatch(setSettingsDisplayThunk())
    }

    const setInputValue = (value: number, isMaxMinValue: MaxMinValueType) => {
        if (value !== counter.startCount || value !== counter.maxCount) {
            dispatch(setMaxMinCountThunk(value, isMaxMinValue))
        }
    }

    const handleSetSreenCount = () => {
        dispatch(setSettingsThunk())
    }

    const handleIncrement = (): void => {
        counter.count < counter.maxCount && dispatch(incrementValue())
    };

    const handleReset = (): void => {
        dispatch(resetValue())
    }
    const isMaxCount: boolean = counter.count === counter.maxCount;
    return (
        <div className={styles.counterApp}>
            <div className={!counter.settingsDisplay ? styles.displayNone : styles.counter}>
                <div className={styles.inputBlock}>
                    <UniversalInput val={counter.maxCount}
                        //name from localStorageAPI
                                    name={maxValue}
                                    setSettingCount={setInputValue}
                                    error={counter.error}>Max
                        value:</UniversalInput>
                    <UniversalInput val={counter.startCount}
                        //name from localStorageAPI
                                    name={minValue}
                                    setSettingCount={setInputValue}
                                    error={counter.error}>Start
                        value:</UniversalInput>
                </div>
                <div className={styles.buttonBlock}>
                    <UniversButton callBack={handleSetSreenCount}
                                   isDisabled={counter.setupInProgress || counter.error !== null}>Set</UniversButton>
                </div>
            </div>
            <div className={counter.settingsDisplay  ? styles.displayNone : styles.counter}>
                <Screen count={counter.count} isMaxCount={isMaxCount} error={counter.error}
                        message={!counter.setupInProgress ? counter.message : ''}/>
                <div className={styles.buttonBlock}>
                    <UniversButton callBack={handleIncrement}
                                   isDisabled={!counter.setupInProgress || isMaxCount}>Inc</UniversButton>
                    <UniversButton callBack={handleReset}
                                   isDisabled={!counter.setupInProgress}>Reset</UniversButton>
                    <UniversButton callBack={handleSetSettingsDisplay} isDisabled={false}>Set</UniversButton>
                </div>
            </div>
        </div>
    );
};

export default CounterAppTwo;
