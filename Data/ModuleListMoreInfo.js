import moduleInfo from "./ModuleInfo.json";
import moduleList from "./ModuleList.json";

const ModuleListWithKey = () => {
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
    const level = parseInt(item.charAt(i));
    const modCode = item.substring(0, i);
    return [modCode, level];
  };

  let arr = [];
  let k = 0;
  let current;
  let i = 0;
  for (; i < moduleInfo.length; i++) {
    current = moduleInfo[i];
    if (current.semesterData.length !== 0) {
      codeArr = firstDigit(current.moduleCode);
      arr[k] = {
        code: current.moduleCode, // string
        name: current.moduleCode + " " + current.title,
        lowerCasedName: (
          current.moduleCode +
          " " +
          current.title
        ).toLowerCase(),
        codePrefix: codeArr[0],
        Level: codeArr[1] * 1000,
        MC: parseInt(current.moduleCredit), // number
        suOption: hasSu(current), // boolean
        Semester: new Set(moduleList[k].semesters), // array
        noExam: noExam(current.semesterData), // boolean
      };
      k++;
    }
  }
  return arr;
};

export default ModuleListWithKey;
