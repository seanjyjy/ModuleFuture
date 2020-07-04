import moduleInfo from "./ModuleInfo.json";
import moduleList from "./ModuleList.json";

const ModuleListWithKey = (item) => {
  const noExam = (item) => {
    if (item.length === 2) {
      if (item[0]?.examDuration || item[1]?.examDuration) {
        return false;
      } else {
        return true;
      }
    } else if (item.length === 1) {
      if (item[0]?.examDuration) {
        return false;
      } else {
        return true;
      }
    }
  };

  const hasSu = (current) => {
    if (current?.attributes?.su) {
      return true;
    } else {
      return false;
    }
  };

  const firstDigit = (item) => {
    let i = 0;
    for (; item[i] < "0" || item[i] > "9"; i++) {}
    return parseInt(item.charAt(i));
  };

  let arr = [];
  let k = 0;
  let current;
  let i = 0;
  for (; i < moduleInfo.length; i++) {
    current = moduleInfo[i];
    if (current.semesterData.length !== 0) {
      arr[k] = {
        code: current.moduleCode, // string
        title: current.title, // string
        name: current.moduleCode + " " + current.title,
        Level: firstDigit(current.moduleCode) * 1000,
        MC: parseInt(current.moduleCredit), // number
        Department: current.department, // string
        suOption: hasSu(current), // boolean
        Semester: new Set(moduleList[k].semesters), // array
        noExam: noExam(current.semesterData), // boolean
      };
      k++;
    }
  }
  // item.
  return arr;
};

export default ModuleListWithKey;
