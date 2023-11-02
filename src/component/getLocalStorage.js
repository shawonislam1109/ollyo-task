import { useState, useEffect } from "react";

export function useGalleryData() {
  const [gallery, setGallery] = useState([]);
  const getData = localStorage.getItem("imageData");

  useEffect(() => {
    const parsedData = JSON.parse(getData);
    setGallery(parsedData);
  }, [getData]);

  return gallery;
}
