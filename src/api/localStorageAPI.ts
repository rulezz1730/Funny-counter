export const [maxValue, minValue] = ["MaxValue", "StartValue"] as const;
export type MaxMinValueType = "MaxValue" | "StartValue";


export const localStorageDriver = {
    getItem(isMaxMinValue: MaxMinValueType){
        return localStorage.getItem(isMaxMinValue)
    },
    setItem(isMaxMinValue: MaxMinValueType, value: string){
        localStorage.setItem(isMaxMinValue, value)
    },
}
