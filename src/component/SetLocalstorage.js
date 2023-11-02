import toast from "react-hot-toast";
const handleThumbnails = (data, gallery, randomId) => {
  if (data) {
    if (gallery) {
      localStorage.setItem(
        "imageData",
        JSON.stringify([...gallery, { id: randomId, image: data }])
      );
    } else {
      localStorage.setItem(
        "imageData",
        JSON.stringify([{ id: randomId, image: data }])
      );
    }
    toast.success("Added successfully");
  }
};

export default handleThumbnails;
