import toast from "react-hot-toast";

const deleteHandle = (gallery, checkedId) => {
  const deletedGen = [];
  for (var i = 0; i < gallery?.length; i++) {
    const { id } = gallery[i];
    const deletedData = checkedId?.includes(id);
    if (!deletedData) {
      deletedGen.push(gallery[i]);
    }
  }
  localStorage.setItem("imageData", JSON.stringify(deletedGen));
  toast.success("Successfully Deleted!");
  setTimeout(() => {
    location.reload();
  }, 1000);
};

export default deleteHandle;
