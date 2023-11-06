export const uploadImage = (event, dataLength) => {
  const files = event.target.files[0];
  const imageId = dataLength + 1;
  const imageUrl = URL.createObjectURL(files);
  const data = {
    id: imageId,
    url: imageUrl,
  };
  return data;
};
