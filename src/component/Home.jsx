import { useEffect, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import "./Home.css";
import Swal from "sweetalert2";

const Home = () => {
  // checked for deleted section
  const [checkedId, setCheckedId] = useState([]);
  // upload image handle
  const [image, setImage] = useState(null);

  //  get Data form localStorage
  const getData = localStorage.getItem("imageData");
  let parseData = JSON.parse(getData);

  // id Generator
  const inputString = "983kldssfu03j8lfdjl";
  function randomNumber(input, length) {
    let randomNum = "";
    for (let i = 0; i < length; i++) {
      const Index = Math.floor(Math.random() * input.length);
      randomNum += input[Index];
    }
    return randomNum;
  }

  const getRandom = randomNumber(inputString, 15);

  //added photo in gallery
  const handleThumbnails = (data) => {
    if (data) {
      if (parseData) {
        localStorage.setItem(
          "imageData",
          JSON.stringify([...parseData, { id: getRandom, image: data }])
        );
      } else {
        localStorage.setItem(
          "imageData",
          JSON.stringify([{ id: getRandom, image: data }])
        );
      }
      Swal.fire("Added success!", "You clicked the button!");
      location.reload();
    }
  };

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
    for (var i = 0; i < parseData?.length; i++) {
      const { id } = parseData[i];
      const deletedData = checkedId?.includes(id);
      if (!deletedData) {
        deletedGen.push(parseData[i]);
      }
    }
    localStorage.setItem("imageData", JSON.stringify(deletedGen));
    Swal.fire("Deleted success!", "You clicked the button!");
    location.reload();
  };

  console.log(parseData);

  //   image upload  in couldinary
  useEffect(() => {
    const data = new FormData();
    data.append("file", image?.target?.files[0]);
    data.append("upload_preset", "qii754l9");
    data.append("cloud_name", "dxatljtkl");
    fetch("https://api.cloudinary.com/v1_1/dxatljtkl/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          handleThumbnails(data.url);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [image]);

  return (
    <div className=" mt-4 ">
      <div className="border-bottom pb-2 flex justify-between items-center px-5">
        <div>
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            checked="checked"
            value="Bike"
            className="mr-2"
          />
          <label htmlFor="vehicle1">{checkedId?.length} Files Selects</label>
        </div>
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

      <div className="grid grid-cols-6 gap-4 p-5">
        {parseData?.map((data, index) => {
          const checked = checkedId?.includes(data.id);
          if (index == 0) {
            return (
              <>
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
              </>
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
        </div>
      </div>
    </div>
  );
};

export default Home;
