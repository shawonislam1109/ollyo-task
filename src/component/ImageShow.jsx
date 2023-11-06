const ImageShow = ({
  image,
  index,
  selectImage,
  dropImage,
  dragStart,
  dragOver,
  imageId,
}) => {
  return (
    <div
      className={
        index === 0
          ? `lg:col-span-2 lg:row-span-2 md:row-span-2 group  md:col-span-2 row-span-2 col-span-2 border-slate-400 border-2 rounded-md relative cursor-grab transition-all`
          : `border-2 border-slate-400 rounded-md  group relative cursor-grab transition-all `
      }
      draggable
      onDrop={(event) => dropImage(event, index)}
      onDragStart={(event) => dragStart(event, index)}
      onDragOver={(event) => dragOver(event, index)}
    >
      <img
        src={image.url}
        alt={image.url}
        className={
          imageId.includes(image.id)
            ? "brightness-50 cursor-pointer"
            : "hover:brightness-50 cursor-pointer"
        }
      />

      <div
        className={
          imageId.includes(image.id)
            ? "absolute  top-0  left-0 w-4 h-4 cursor-pointer"
            : "absolute  top-0  left-0 invisible group-hover:visible  w-4 h-4 cursor-pointer"
        }
      >
        <input
          checked={imageId.includes(image.id)}
          onChange={() => selectImage(image.id)}
          className="absolute top-3 left-3 w-4 h-4  cursor-pointer"
          type="checkbox"
        />
      </div>
    </div>
  );
};

export default ImageShow;
