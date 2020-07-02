import moduleInfo from "./ModuleInfo.json";
import moduleList from "./ModuleList.json";

const ModuleListWithKey = () => {
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
  for (let i = 0; i < moduleInfo.length; i++) {
    let current = moduleInfo[i];
    if (current.semesterData.length !== 0) {
      arr[k] = {
        moduleCode: current.moduleCode,
        title: current.title,
        name: current.moduleCode + " " + current.title,
        level: firstDigit(current.moduleCode),
        key: k,
        MC: parseInt(current.moduleCredit),
        department: current.department,
        suOption: hasSu(current),
        semesters: moduleList[k].semesters,
        hasExam: hasExam(current.semesterData),
      };
      k++;
    }
  }
  return arr;
};

export default ModuleListWithKey;
