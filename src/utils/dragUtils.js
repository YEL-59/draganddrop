export const applyDrag = (items, dropResult) => {
    const { addedIndex, removedIndex, payload } = dropResult;
    if (removedIndex === null && addedIndex === null) return items;
  
    const result = [...items];
    if (removedIndex !== null) {
      result.splice(removedIndex, 1);
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, payload);
    }
  
    return result;
  };
  