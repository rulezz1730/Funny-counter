import React, {ReactNode, FC} from "react";

type UniverseButtonType = {
    callBack: () => void;
    isDisabled?: boolean;
    children: ReactNode;
}

const UniverseButton: FC<UniverseButtonType> = ({callBack, isDisabled, children}) => {
    return <button onClick={callBack} disabled={isDisabled}><b>{children}</b></button>
}

export default UniverseButton;