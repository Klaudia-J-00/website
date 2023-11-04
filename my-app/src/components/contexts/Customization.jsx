import { createContext, useContext, useState } from 'react'

const CustomizationContext = createContext({});

export const colorsForKeyboard = [
    {
        color: "#E7E3E0", 
        name: "white"
    },
    {
        color: "#8D8D8D",
        name: "gray"
    },
    {
        color: "#E5F8D2",
        name: "light-green"
    }, 
    {
        color: "#94B276",
        name: "green"
    },
    {
        color: "#37D9CF",
        name: "turquoise"
    },
    {
        color: "#7EB7E3",
        name: "blue"
    },
    {
        color: "#195E67",
        name: "dark-blue"
    }, 
    {
        color: "#EDA1DC", 
        name: "pink"
    }, 
    {
        color: "#D9B5F5",
        name: "purple"
    },
    {
        color: "#FFC37D",
        name: "yellow"
    },
    {
        color: "#AF3C22",
        name: "orange"
    },
    {
        color: "#712727",
        name: "red"
    }, 
    {
        color: "#262626",
        name: "black"
    }
]

export const CustomizationProvider = (props) => {
    const [baseColor, setBaseColor] = useState(colorsForKeyboard[0]);
    const [insideBaseColor, setInsideBaseColor] = useState(colorsForKeyboard[5]);
    const [keyColor, setKeyColor] = useState(colorsForKeyboard[7]);
    const [keyOtherColor, setKeyOtherColor] = useState(colorsForKeyboard[0]);

    return <CustomizationContext.Provider value={{
        baseColor,
        setBaseColor,
        insideBaseColor,
        setInsideBaseColor,
        keyColor,
        setKeyColor,
        keyOtherColor,
        setKeyOtherColor,
    }}>
        {props.children}
    </CustomizationContext.Provider>
}

export const useCustomization = () => {
    const context = useContext(CustomizationContext);
    return context;
}