let id = 0;

export const getID = () => {
  let currId = id;
  id++;
  return currId;
}

export const setID = (newID: number) => {
  id = newID;
}