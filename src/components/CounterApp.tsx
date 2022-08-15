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
    setMaxMinCountThunk, setSettingsThunk, setStartAmountValueThunk,
} from "./store/counterReducer";
import {MaxMinValueType, maxValue, minValue} from "../api/localStorageAPI";
import {Dispatch} from "redux";


function CounterApp() {
    const counter = useSelector<RootReducerType, InitialStateType>(state => state.counter);
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        dispatch(setStartAmountValueThunk())
    }, [dispatch])

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
            <div className={styles.counter}>
                <div className={styles.inputBlock}>
                    <UniversalInput val={counter.maxCount}
                        //name from localStorageAPI
                                    name={maxValue}
                                    setSettingCount={setInputValue}
                                    error={counter.error}>
                        Max value:
                    </UniversalInput>
                    <UniversalInput val={counter.startCount}
                        //name from localStorageAPI
                                    name={minValue}
                                    setSettingCount={setInputValue}
                                    error={counter.error}>
                        Start value:
                    </UniversalInput>
                </div>
                <div className={styles.buttonBlock}>
                    <UniversButton callBack={handleSetSreenCount}
                                   isDisabled={counter.setupInProgress || counter.error !== null}>Set</UniversButton>
                </div>
            </div>
            <div className={styles.counter}>
                <Screen count={counter.count} isMaxCount={isMaxCount} error={counter.error}
                        message={!counter.setupInProgress ? counter.message : ''}
                />
                <div className={styles.buttonBlock}>
                    <UniversButton callBack={handleIncrement}
                                   isDisabled={!counter.setupInProgress || isMaxCount}>Inc</UniversButton>
                    <UniversButton callBack={handleReset}
                                   isDisabled={!counter.setupInProgress}>Reset</UniversButton>
                </div>
            </div>
        </div>
    );
}

export default CounterApp;
