import { useState, useEffect } from "react";

export function useGalleryData(loading) {
  const [gallery, setGallery] = useState([]);

  const getData = localStorage.getItem("imageData");
  useEffect(() => {
    if (getData) {
      const parsedData = JSON.parse(getData);
      setGallery(parsedData);
    }
  }, [getData, loading]);

  return { gallery, setGallery };
}
