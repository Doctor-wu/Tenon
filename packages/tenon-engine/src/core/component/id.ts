let id = 0;
const releasedIDs: any[] = [];

export const getID = () => {
  if (releasedIDs.length) return releasedIDs.pop();
  let currId = id;
  id++;
  return currId;
}

export const releaseID = (id) => releasedIDs.push(id);

export const setID = (newID: number) => {
  id = newID;
}
