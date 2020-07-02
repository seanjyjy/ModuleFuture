import moduleInfo from "./ModuleInfo.json";
import moduleList from "./ModuleList.json";

const ModuleListWithKey = (item) => {
  const hasExam = (item) => {
    if (item.length === 2) {
      if (item[0]?.examDuration || item[1]?.examDuration) {
        return true;
      } else {
        return false;
      }
    } else if (item.length === 1) {
      if (item[0]?.examDuration) {
        return true;
      } else {
        return false;
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
    for (; item[i] < "0" || item[i] > "9"; i++) {
      return i;
    }
  };

  let arr = [];
  let k = 0;
  let current;
  let i = 0;
  for (; i < moduleInfo.length; i++) {
    current = moduleInfo[i];
    if (current.semesterData.length !== 0) {
      arr[k] = {
        code: current.moduleCode,
        title: current.title,
        name: current.moduleCode + " " + current.title,
        level: firstDigit(current.moduleCode),
        MC: parseInt(current.moduleCredit),
        department: current.department,
        suOption: hasSu(current),
        semesters: moduleList[k].semesters,
        hasExam: hasExam(current.semesterData),
      };
      k++;
    }
  }
  // item.
  return arr;
};

export default ModuleListWithKey;
