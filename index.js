import { useState, useEffect, createContext, useContext } from "react";
import { Linking } from "react-native";
const useLinking = () => {
  const [url, setUrl] = useState(null);
  const updateUrl = ({ url: thisUrl }) => {
    setUrl(thisUrl);
  };
  useEffect(() => {
    (async () => {
      const start = await Linking.getInitialURL();
      if (start) setUrl(start);
    })();
    Linking.addEventListener("url", updateUrl);
    return () => {
      Linking.removeEventListener("url", updateUrl);
    };
  }, []);

  return url;
};
const context = createContext();
const { Provider } = context;
const LinkingProvider = ({ children }) => {
  const value = useLinking();
  return <Provider value={value}>{children}</Provider>;
};

const useLinkingProvider = () => {
  const url = useContext(context);
  return url;
};
export default useLinking;
export { LinkingProvider, useLinkingProvider as useLinking };
