import {localStorageDriver, MaxMinValueType, maxValue, minValue} from "../../api/localStorageAPI";
import {RootReducerType} from "./store";
import {ThunkDispatch} from "redux-thunk";

const INCREMENT_VALUE = "INCREMENT_VALUE";
const RESET_VALUE = "RESET_VALUE";
const SETUP_PROGRESS = "SETUP_PROGRESS";
const SET_MAX_COUNT = "SET_MAX_COUNT";
const SET_START_COUNT = "SET_START_COUNT"
const SET_ERROR = "SET_ERROR"
const SET_SETTINGS_DISPLAY = "SET_SETTINGS_DISPLAY"

export const errorMessage = {
    maxNumGreaterStartNum: "Incorrect value!"
}

export type ActionsTypes = SetSettingsDisplayActionType
    |IncrementValueActionType
    | ResetValueActionType
    | SetSetupInProgressActionType
    | SetMaxCountActionType
    | SetStartCountActionType
    | SetErrorActionType;


export type ErrorMessageType =
    | typeof errorMessage.maxNumGreaterStartNum
    | null
    | undefined;

export type InitialStateType = typeof initialState;
export const initialState = {
    startCount: 0,
    maxCount: 5,
    count: 0,
    setupInProgress: true,
    settingsDisplay: false,
    error: null as ErrorMessageType,
    message: "Enter values and press 'Set'.",
}

export const counterReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_SETTINGS_DISPLAY:{
            return {...state, settingsDisplay: true}
        }
        case INCREMENT_VALUE:
            return {...state, count: ++state.count}
        case RESET_VALUE:
            return {...state, count: state.startCount}
        case SETUP_PROGRESS:
            return {...state, setupInProgress: true, settingsDisplay:false}
        case SET_MAX_COUNT:
            return {...state, maxCount: action.newMaxCount, setupInProgress: false}
        case SET_START_COUNT:
            return {...state, startCount: action.newStartCount, setupInProgress: false, count: action.newStartCount}
        case SET_ERROR: {
            return {...state, error: action.payload.errorMessage}
        }
        default:
            return state;
    }
}

export type IncrementValueActionType = {
    type: typeof INCREMENT_VALUE,
}
export const incrementValue = (): IncrementValueActionType => ({type: INCREMENT_VALUE})

export type ResetValueActionType = {
    type: typeof RESET_VALUE;
}
export const resetValue = (): ResetValueActionType => ({type: RESET_VALUE})

export type SetSetupInProgressActionType = { type: typeof SETUP_PROGRESS }
export const setSettings = (): SetSetupInProgressActionType => ({type: SETUP_PROGRESS})

type SetMaxCountActionType = {
    type: typeof SET_MAX_COUNT,
    newMaxCount: number
}
export const setMaxCount = (newMaxCount: number): SetMaxCountActionType => ({type: SET_MAX_COUNT, newMaxCount})

type SetStartCountActionType = {
    type: typeof SET_START_COUNT,
    newStartCount: number
}
const setStartCount = (newStartCount: number): SetStartCountActionType => ({type: SET_START_COUNT, newStartCount})

export type SetErrorActionType = { type: typeof SET_ERROR, payload: { errorMessage: ErrorMessageType } }
export const setError = (errorMessage: ErrorMessageType): SetErrorActionType => ({
    type: SET_ERROR,
    payload: {errorMessage}
})

export type SetSettingsDisplayActionType = {type: typeof SET_SETTINGS_DISPLAY}
const setSettingsDisplay = () => ({type: SET_SETTINGS_DISPLAY})

export type SetSettingsDisplayThunkType = any
export const setSettingsDisplayThunk = ():SetSettingsDisplayThunkType => (dispatch: any): void => {
    dispatch(setSettingsDisplay())
}

type SetMaxMinCountThunkType = any;
export const setMaxMinCountThunk = (newMaxMinCount: number, fieldNameLS: MaxMinValueType): SetMaxMinCountThunkType =>
    (dispatch: ThunkDispatch<RootReducerType, unknown, ActionsTypes>, getState: () => RootReducerType): void => {
        if (fieldNameLS === maxValue) {
            dispatch(setMaxCount(newMaxMinCount))
        } else {
            dispatch(setStartCount(newMaxMinCount))
        }
        const {counter} = getState()
        if ((!Number.isInteger(counter.maxCount) || !Number.isInteger(counter.startCount) ||
            counter.maxCount <= counter.startCount || counter.maxCount < 0 || counter.startCount < 0 ||
            counter.startCount > counter.maxCount || counter.startCount === counter.maxCount)) {
            dispatch(setError(errorMessage.maxNumGreaterStartNum))
        } else {
            dispatch(setError(null))
        }
    }

export type SetSettingsThunkType = any
export const setSettingsThunk = (): SetSettingsThunkType => (dispatch: ThunkDispatch<RootReducerType, unknown, ActionsTypes>, getState: () => RootReducerType): void => {
    dispatch(setSettings())
    dispatch(setError(null))
    localStorageDriver.setItem(maxValue, getState().counter.maxCount.toString())
    localStorageDriver.setItem(minValue, getState().counter.startCount.toString())

}

export type SetStartAmounValueThunkType = any;
export const setStartAmountValueThunk = (): SetStartAmounValueThunkType => (dispatch: ThunkDispatch<RootReducerType, unknown, ActionsTypes>): void => {
    const localStorageState = {
        startCount: Number(localStorageDriver.getItem(minValue)),
        maxCount: Number(localStorageDriver.getItem(maxValue))
    }
    localStorageState.startCount && dispatch(setStartCount(localStorageState.startCount))
    localStorageState.maxCount && dispatch(setMaxCount(localStorageState.maxCount))
}