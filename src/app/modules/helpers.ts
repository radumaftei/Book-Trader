export const areObjectDifferent = (obj1, obj2) => {
  if (!obj1 || !obj2) return;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return;
  let objectsDifferent = false;
  Object.keys(obj1).map((key) => {
    if (obj1[key] !== obj2[key]) {
      objectsDifferent = true;
    }
  });
  return objectsDifferent;
};
