import { useState } from "react";
// import {
//   GridContextProvider,
//   GridDropZone,
//   GridItem,
//   swap,
// } from "react-grid-dnd";

// export default function Example() {
//   const [items, setItems] = useState([1, 2, 3, 4]); // supply your own state

//   // target id will only be set if dragging from one dropzone to another.
//   function onChange(sourceId, sourceIndex, targetIndex, targetId) {
//     const nextState = swap(items, sourceIndex, targetIndex);
//     setItems(nextState);
//   }

//   return (
//     <GridContextProvider onChange={onChange}>
//       <GridDropZone
//         id="items"
//         boxesPerRow={4}
//         rowHeight={100}
//         style={{ height: "400px" }}
//       >
//         {items.map((item) => (
//           <GridItem key={item}>
//             <div
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 border: "2px solid green",
//               }}
//             >
//               {item}
//             </div>
//           </GridItem>
//         ))}
//       </GridDropZone>
//     </GridContextProvider>
//   );
// }

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";

export default function Example() {
  const [items, setItems] = useState({
    left: [
      { id: 1, name: "ben" },
      { id: 2, name: "joe" },
      { id: 3, name: "jason" },
      { id: 4, name: "chris" },
      { id: 5, name: "heather" },
      { id: 6, name: "Richard" },
    ],
    right: [
      { id: 7, name: "george" },
      { id: 8, name: "rupert" },
      { id: 9, name: "alice" },
      { id: 10, name: "katherine" },
      { id: 11, name: "pam" },
      { id: 12, name: "katie" },
    ],
  });

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result,
    });
  }

  return (
    <GridContextProvider onChange={onChange}>
      <div className="container">
        <GridDropZone
          className="dropzone left"
          id="left"
          boxesPerRow={4}
          rowHeight={70}
        >
          {items.left.map((item) => (
            <GridItem key={item.name}>
              <div className="grid-item">
                <div className="grid-item-content">
                  {item.name[0].toUpperCase()}
                </div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
        <GridDropZone
          className="dropzone right"
          id="right"
          boxesPerRow={4}
          rowHeight={70}
        >
          {items.right.map((item) => (
            <GridItem key={item.name}>
              <div className="grid-item">
                <div className="grid-item-content">
                  {item.name[0].toUpperCase()}
                </div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
}
