import { DefaultFile, RemoteFile } from "./files";

const miscellaneousDirectory = {
  name: "Miscellaneous",
  expanded: true,
  files: [
    new DefaultFile("scratchpad.grg", "#u name\n#a 01\n\n#q 01\n\n#check PROP\n\na => b")
  ]
};

const assignmentDirectories =
  [6, 6, 4, 5, 4, 5, 1, 3].map((numQuestions, assignmentNumber) => {
    assignmentNumber++;

    return {
      name: `Assignment ${assignmentNumber}`,
      expanded: false,
      files: Array.from({ length: numQuestions }, (_, questionNumber) => {
        questionNumber++;

        const paddedAssignmentNumber = assignmentNumber.toString().padStart(2, "0");
        const paddedQuestionNumber = questionNumber.toString().padStart(2, "0");
        const fileName = `a${paddedAssignmentNumber}q${paddedQuestionNumber}.grg`;
        const filePath = `/asn/a${paddedAssignmentNumber}grg/${fileName}`;
        return new RemoteFile(fileName, filePath);
      })
    };
  });

const homeworkDirectory = {
  name: "Homeworks",
  expanded: false,
  files: Array.from({ length: 11 }, (_, homeworkNumber) => {
    homeworkNumber++;

    const paddedHomeworkNumber = homeworkNumber.toString().padStart(2, "0");
    const fileName = `h${paddedHomeworkNumber}.grg`;
    const filePath = `/hmwk/se212-h${paddedHomeworkNumber}-ques.grg`;
    return new RemoteFile(fileName, filePath);
  })
};

export default [
  miscellaneousDirectory,
  ...assignmentDirectories,
  homeworkDirectory
]

