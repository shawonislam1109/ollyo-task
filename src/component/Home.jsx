import { Fragment, useEffect, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import "./Home.css";
import useRandomIdGenerator from "./randomNum";
import handleThumbnails from "./SetLocalstorage";
import toast from "react-hot-toast";
import { useGalleryData } from "./getLocalStorage";

const Home = () => {
  // loading state
  const [loading, setLoading] = useState(false);
  // checked for deleted section
  const [checkedId, setCheckedId] = useState([]);

  // upload image handle
  const [image, setImage] = useState(null);

  // useHook for gallery data use
  const gallery = useGalleryData();

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
  const deleteHandle = () => {
    const deletedGen = [];
    for (var i = 0; i < gallery?.length; i++) {
      const { id } = gallery[i];
      const deletedData = checkedId?.includes(id);
      if (!deletedData) {
        deletedGen.push(gallery[i]);
      }
    }
    localStorage.setItem("imageData", JSON.stringify(deletedGen));
    toast.success("Successfully toasted!");
    setTimeout(() => {
      location.reload();
    }, 1000);
  };

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
            <button onClick={deleteHandle} className="text-red-600">
              Delete Files
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 p-5 relative">
        {gallery?.map((data, index) => {
          const checked = checkedId?.includes(data.id);
          if (index == 0) {
            return (
              <Fragment key={data.id}>
                <div
                  key={data.id}
                  className="row-span-2 col-span-2 border group shadow-md rounded-sm relative "
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
              </Fragment>
            );
          }
          return (
            <div key={data.id} className="border shadow-md group relative">
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
          );
        })}

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
    </div>
  );
};

export default Home;
