import React, { useCallback, useEffect, useRef } from "react";

export const useEventListener = (eventName, handler) => {
    let savedHandler = useRef();
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(() => {
        const eventListener = (e) => savedHandler.current(e);
        window.addEventListener(eventName, eventListener);
        return () => {
            window.removeEventListener(eventName, eventListener);
        };
    }, [eventName]);
};

const App = () => {
    //Как думаешь, почему тут важно использовать useCallback?
    // answer: якщо ми цю функцію передамо як пропс, і будемо змінювати розміри вікна
    // то за допомогою useCallback ссилка на функцію буде єдина у всіх компонентів,
    // і ререндеру всіх компонентів яким ми передали її не буде
    const handleResize = useCallback((e) => {
        console.log(
            "x: ",
            e.target.window.innerWidth,
            "y: ",
            e.target.window.innerHeight
        );
    }, []);
    useEventListener("resize", handleResize);

    return <div></div>;
};
export default App;
