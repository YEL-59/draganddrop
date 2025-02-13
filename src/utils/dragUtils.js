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
  //here rae basically take all the item nd the dropresult are where the item are droped then re,oved index are the orginal index and the 3rd line is for error check  then copy the aay that not modify thge array acual. then if the removed index is not null then remove the item from the array and if the added index is not null then add the item to the array and then return the result of the array