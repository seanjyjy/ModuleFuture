import moduleInfo from "./ModuleInfo1.json";
import moduleList from "./ModuleList1.json";

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
    const level = parseInt(item[i]);
    const codePrefix = item.substring(0, i);
    return [codePrefix, level];
  };

  let arr = [];
  let k = 0;
  let current;
  let i = 0;

  // const getPrereq = (code) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.nusmods.com/v2/2020-2021/modules/${code}.json`
  //     );
  //     const json = await response.json();
  //     return json.prereqTree;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  for (; i < moduleInfo.length; i++) {
    current = moduleInfo[i];
    if (current.semesterData.length !== 0) {
      codeArr = firstDigit(current.moduleCode);
      const code = current.moduleCode;
      arr[k] = {
        code: code, // string
        name: current.moduleCode + " " + current.title,
        lowerCasedName: (
          current.moduleCode +
          " " +
          current.title
        ).toLowerCase(),
        title: current.title,
        codePrefix: codeArr[0],
        Level: codeArr[1] * 1000,
        MC: parseInt(current.moduleCredit), // number
        suOption: hasSu(current), // boolean
        Semester: moduleList[k].semesters, // array
        noExam: noExam(current.semesterData), // boolean
        prerequisite: current.prerequisite,
        preclusion: current.preclusion,
        description: current.description,
        semData: current.semesterData,
        workLoad: current.workload,
      };
      k++;
    }
  }
  return arr;
};

export default ModuleListWithKey;
