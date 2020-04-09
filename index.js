import { useState, useEffect } from "react";
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
export default useLinking;
