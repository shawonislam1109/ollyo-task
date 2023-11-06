import { useState } from "react";
import data from "../Data/imageData.json";

import ImageShow from "./ImageShow";
import { uploadImage } from "./impageUpload";
import { FcAddImage } from "react-icons/fc";

const MainSection = () => {
  //  all Data section
  const [value, setData] = useState(data);

  //  index DragAble Index State
  const [IndexDragAble, setIndexDragAble] = useState(null);

  //   delete section state
  const [deleteImageId, setDeleteImageId] = useState([]);

  // image select handler
  const ImageSelect = (imageId) => {
    if (!deleteImageId.includes(imageId)) {
      setDeleteImageId([...deleteImageId, imageId]);
    } else {
      setDeleteImageId(deleteImageId.filter((item) => item != imageId));
    }
  };

  // selected image delete
  const handleDeleteImage = () => {
    const remainingImage = value.filter((image) => {
      if (!deleteImageId.includes(image.id)) {
        return image;
      }
    });
    setData(remainingImage);
    setDeleteImageId([]);
  };

  // image upload handler
  const HandleImage = (event) => {
    const addNewImgToImgObj = uploadImage(event, value.length);
    setData([...value, addNewImgToImgObj]);
  };

  //   handle overDrag implement
  const HandlerOverDrag = (event, index) => {
    event.preventDefault();
    if (index !== IndexDragAble) {
      setIndexDragAble(index);
    }
  };
  //   handle Drop implement
  const HandlerDrop = (event, newIndex) => {
    const index = event.dataTransfer.getData("index");
    const updateData = [...value];
    const [draggedBox] = updateData.splice(index, 1);
    updateData.splice(newIndex, 0, draggedBox);
    setData(updateData);
    setIndexDragAble(null);
  };

  //   handle Drag implement
  const HandlerDrag = (event, index) => {
    event.dataTransfer.setData("index", index);
    setIndexDragAble(index);
  };

  return (
    <div className="mx-auto  my-5">
      {deleteImageId.length > 0 ? (
        <>
          <div className="  flex lg:flex-row md:flex-col flex-col justify-between rounded-t-md mx-auto py-5 px-4 border-b-2 border-b-slate-300 bg-white">
            <div className="flex items-center">
              <input
                checked={deleteImageId.length}
                onChange={() => setDeleteImageId([])}
                className="w-5 h-5"
                type="checkbox"
              />
              <p className=" ml-5 text-md font-bold ">
                {deleteImageId.length} File Selected
              </p>
            </div>
            <div>
              <button
                onClick={handleDeleteImage}
                className=" border-none text-md lg:m-0 md:mt-5 sm:mt-4 text-red-600 font-medium "
              >
                Delete File
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" rounded-t-md mx-auto py-5 px-4 border-b-2 border-b-slate-300  bg-white text-md font-bold ">
            <h1>Gallery</h1>
          </div>
        </>
      )}

      <section className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2  bg-white grid rounded-b-md  gap-4 w-[80%] mx-auto py-8 px-5">
        {value?.map((item, index) => {
          return (
            <ImageShow
              key={index}
              image={item}
              index={index}
              selectImage={ImageSelect}
              dropImage={HandlerDrop}
              dragStart={HandlerDrag}
              dragOver={HandlerOverDrag}
              imageId={deleteImageId}
            />
          );
        })}

        <div className="relative border-2 border-dashed rounded-md  flex flex-col justify-center items-center ">
          <label htmlFor="Upload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FcAddImage className="w-16 h-16" />
              <p className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Click to upload
              </p>
            </div>
            <input
              className="hidden cursor-pointer"
              accept="image/*"
              id="imageUpload"
              type="file"
              onChange={HandleImage}
            />
          </label>
        </div>
      </section>
    </div>
  );
};

export default MainSection;
