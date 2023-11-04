import { useEffect, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import useRandomIdGenerator from "./randomNum";
import handleThumbnails from "./SetLocalstorage";
import { useGalleryData } from "./getLocalStorage";
import deleteHandle from "./deletedHandle";
import "./Home.css";
// Import react-beautiful-dnd components and hooks
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Home = () => {
  // loading state
  const [loading, setLoading] = useState(false);
  // checked for deleted section
  const [checkedId, setCheckedId] = useState([]);

  // upload image handle
  const [image, setImage] = useState(null);

  // useHook for gallery data use
  const { gallery, setGallery } = useGalleryData(loading);

  // use hook for random id generator
  const getRandomId = useRandomIdGenerator("983kldssfu03j8lfdjl", 15);
  const randomId = getRandomId();

  // handle check file
  const handleChecked = (id) => {
    const checked = checkedId?.includes(id);
    if (checked) {
      setCheckedId(checkedId?.filter((dataId) => dataId !== id));
    } else {
      setCheckedId([...checkedId, id]);
    }
  };

  // deleteHandle
  const handleDeleted = () => {
    deleteHandle(gallery, checkedId);
    setCheckedId([]);
  };

  // drag and Drop handle
  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;
    const items = Array.from(gallery);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setGallery(items);
  }

  //  image upload  in couldinary
  useEffect(() => {
    const data = new FormData();
    data.append("file", image?.target?.files[0]);
    data.append("upload_preset", "qii754l9");
    data.append("cloud_name", "dxatljtkl");
    fetch("https://api.cloudinary.com/v1_1/dxatljtkl/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json(), setLoading(true))
      .then((data) => {
        setLoading(false);
        if (data.url) {
          return handleThumbnails(data.url, gallery, randomId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [image]);

  return (
    <div className=" mt-4 ">
      <div className="border-bottom pb-2 flex justify-between items-center px-5">
        {checkedId?.length ? (
          <div>
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              readOnly
              checked="checked"
              value="Bike"
              className="mr-2"
            />
            <label htmlFor="vehicle1">{checkedId?.length} Files Selects</label>
          </div>
        ) : (
          "Gallery"
        )}

        <div>
          {checkedId?.length ? (
            <button onClick={handleDeleted} className="text-red-600">
              Delete Files
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <div
              className=" characters grid grid-cols-6 gap-4 p-5 relative"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {gallery?.map((data, index) => {
                const checked = checkedId?.includes(data.id);
                if (index == 0) {
                  return (
                    <Draggable
                      draggableId={data.id}
                      index={index}
                      key={data.id}
                    >
                      {(provided) => (
                        <div
                          key={data.id}
                          className="row-span-2 col-span-2 border group shadow-md rounded-sm relative "
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img
                            src={data?.image}
                            className={
                              checked
                                ? "brightness-50 cursor-pointer"
                                : "hover:brightness-50 cursor-pointer"
                            }
                            alt="image"
                          />
                          <input
                            type="checkbox"
                            checked={checked && "checked"}
                            onChange={() => handleChecked(data.id)}
                            className={
                              checked
                                ? "absolute  top-3  left-3 w-4 h-4 cursor-pointer"
                                : "absolute  top-3 invisible group-hover:visible left-3 w-4 h-4 cursor-pointer"
                            }
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                }
                return (
                  <Draggable key={data.id} draggableId={data.id} index={index}>
                    {(provided) => (
                      <div
                        key={data.id}
                        className="border shadow-md group relative"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          className={
                            checked
                              ? "brightness-50 cursor-pointer"
                              : "hover:brightness-50 cursor-pointer"
                          }
                          src={data?.image}
                          alt="image"
                        />
                        <input
                          type="checkbox"
                          checked={checked && "checked"}
                          onChange={() => handleChecked(data.id)}
                          className={
                            checked
                              ? "absolute  top-3  left-3 w-4 h-4 cursor-pointer"
                              : "absolute  top-3 invisible group-hover:visible left-3 w-4 h-4 cursor-pointer"
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}

              <div className="border flex justify-center shadow-md items-center file">
                {loading ? (
                  <div className="text-center ">
                    <span className="loading loading-dots loading-lg text-center "></span>
                  </div>
                ) : (
                  <label htmlFor="dropzone-file" className="cursor-pointer">
                    <div className="">
                      <FcAddImage className="w-16 h-16" />
                    </div>
                    <input
                      onChange={(e) => setImage(e)}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Home;
