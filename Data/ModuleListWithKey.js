import moduleList from "./ModuleList.json";

const ModuleListWithKey = () => {
  let arr = [];
  for (let i = 0; i < moduleList.length; i++) {
    arr[i] = { ...moduleList[i], key: i };
  }
  return arr;
};

export default ModuleListWithKey;
