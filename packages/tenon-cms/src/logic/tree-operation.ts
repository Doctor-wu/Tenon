export const insertChild = (parent, child, relative) => {
  if (relative === undefined) {
    parent.children.push(child);
  } else {
    const index = parent.children.indexOf(relative);
    if (index === -1) {
      return parent.children.push(child);
    }
    parent.children.splice(index + 1, 0, child);
  }
}

export const extractChild = (parent, child) => {
  const index = parent.children.indexOf(child);
  if (index === -1) {
    return;
  }
  parent.children.splice(index, 1);
}

export const isAncestor = (parent, child) => {
  if (parent === child) {
    return true;
  }
  if (child.parent === undefined) {
    return false;
  }
  return isAncestor(parent, child.parent);
}