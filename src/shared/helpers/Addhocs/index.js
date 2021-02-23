export const addHocs = (component, hocs) => {
    let result = component;
    hocs.forEach((hoc) => {
      result = hoc(result);
    });
    return result;
  };
  
  export default { addHocs };
  