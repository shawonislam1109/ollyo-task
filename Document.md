### `MainSection` Component

The `MainSection` component is responsible for rendering the main section of the gallery application. It includes features like displaying images, selecting images for deletion, uploading new images, and implementing drag-and-drop functionality for image reordering.

#### State Variables

- `value`: It stores the data of images, presumably loaded from an external JSON file.

- `IndexDragAble`: It keeps track of the index of the image being dragged during the drag-and-drop operation.

- `deleteImageId`: An array that holds the IDs of selected images for deletion.

#### Event Handlers

- `ImageSelect(imageId)`: Toggles the selection of an image for deletion. It adds or removes the `imageId` to/from the `deleteImageId` state.

- `handleDeleteImage()`: Deletes the selected images by filtering out the images with IDs present in the `deleteImageId` array.

- `HandleImage(event)`: Handles image uploads. It invokes the `uploadImage` function with the uploaded image data and appends the new image data to the `value` state.

- `HandlerOverDrag(event, index)`: Handles the drag-over event for image reordering. It sets the `IndexDragAble` state to the index of the image being dragged over.

- `HandlerDrop(event, newIndex)`: Handles the drop event for image reordering. It updates the `value` state by reordering the images based on the drag-and-drop operation.

- `HandlerDrag(event, index)`: Handles the start of the drag operation by setting the data for the drag-and-drop operation.

#### Rendered UI

The component renders the following elements:

- A header with a title "Gallery" when no images are selected for deletion.

- A header showing the number of selected files and a "Delete File" button when one or more images are selected for deletion.

- A grid that displays images using the `ImageShow` component for each image in the `value` state.

- An input element for uploading images with a clickable area labeled "Click to upload."

#### Dependencies

- The component depends on an external JSON file (`imageData.json`) to populate the gallery with initial image data.

- It also relies on a custom `ImageShow` component for rendering individual images.

- The `uploadImage` function is used for handling image uploads.

- The `FcAddImage` component from the "react-icons/fc" library is used to render an icon for the image upload functionality.

### Example Usage

To use this component, you can import it and include it within your React application. You would also need to provide the required dependencies, such as the `imageData.json` file and the `ImageShow` component, for it to work as intended.
