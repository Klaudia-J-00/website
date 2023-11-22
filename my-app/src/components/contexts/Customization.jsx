import { createContext, useContext, useState } from 'react'

export const colorsForKeyboard = [
    {
        color: "#E7E3E0", 
        name: "biały"
    },
    {
        color: "#E5F8D2",
        name: "jasno zielony"
    }, 
    {
        color: "#94B276",
        name: "oliwkowy"
    },
    {
        color: "#37D9CF",
        name: "turkusowy"
    },
    {
        color: "#7EB7E3",
        name: "niebieski"
    },
    {
        color: "#195E67",
        name: "morski"
    }, 
    {
        color: "#EDA1DC", 
        name: "jasno różowy"
    }, 
    {
        color: "#e854ff",
        name: "różowy"
    },
    {
        color: "#D9B5F5",
        name: "lilowy"
    },
    {
        color: "#8214c9",
        name: "fioletowy"
    },
    {
        color: "#ffff4d",
        name: "żółty"
    },
    {
        color: "#FFC37D",
        name: "złoty"
    },
    {
        color: "#e69a7a",
        name: "brzoskwiniowy"
    },
    {
        color: "#AF3C22",
        name: "pomarańczowy"
    },
    {
        color: "#f7113b",
        name: "czerwony"
    }, 
    {
        color: "#712727",
        name: "karmazynowy"
    }, 
    {
        color: "#c7c7c7",
        name: "jasno szary"
    },
    {
        color: "#8D8D8D",
        name: "szary"
    },
    {
        color: "#404040",
        name: "ciemno szary"
    },
    {
        color: "#262626",
        name: "czarny"
    }
]

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
    const [baseColor, setBaseColor] = useState(colorsForKeyboard[0]);
    const [insideBaseColor, setInsideBaseColor] = useState(colorsForKeyboard[0]);
    const [keyColor, setKeyColor] = useState(colorsForKeyboard[0]);
    const [keyOtherColor, setKeyOtherColor] = useState(colorsForKeyboard[4]);
    const [keyThirdColor, setKeyThirdColor] = useState(colorsForKeyboard[6]);

    return <CustomizationContext.Provider 
        value={{
            baseColor,
            setBaseColor,
            insideBaseColor,
            setInsideBaseColor,
            keyColor,
            setKeyColor,
            keyOtherColor,
            setKeyOtherColor,
            keyThirdColor,
            setKeyThirdColor
    }}>
        {props.children}
    </CustomizationContext.Provider>
}

export const useCustomization = () => {
    const context = useContext(CustomizationContext);
    return context;
}