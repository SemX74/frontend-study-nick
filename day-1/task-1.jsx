import React from "react";
// сам хук usePromise
export const usePromise = (asyncFunc) => {
  const [loading, setLoading] = React.useState(false);
  const handleClick = async () => {
    setLoading(true)
    await asyncFunc()
    setLoading(false)
  };
  return [handleClick, loading];
};

const App = () => {
  const sendDataToServer = async () => {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("data");
          resolve();
        }, 3000)
      })
    } catch (error) {
      console.log("err");
    }
  };
  const [handleClick, loading] = usePromise(sendDataToServer);

  return (
    <div>
      <button disabled={loading} onClick={handleClick}>
        Click
      </button>
    </div>
  );
};
export default App
