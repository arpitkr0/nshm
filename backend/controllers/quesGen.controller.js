import { PdfReader } from "pdfreader";
import path from "path";
import fs from "fs";
import { apiResult } from "../questionGen.js";

export const generateQuestions = async (req, res) => {
  let syllabus;
  const file_name = `${req.file.filename}`;
  const extn = file_name.split(".")[1];

  if (extn === "pdf") {
    //syllabus pdf reading
    new PdfReader().parseFileItems(`uploads/${file_name}`, (err, item) => {
      if (err) console.error("error:", err);
      //else if (!item) console.warn("end of file");
      else if (item.text) {
        syllabus = item.text;
      }
    });
  } else if (extn === "txt") {
    //syllabus txt reading
    try {
      const data = fs.readFileSync(`uploads/${file_name}`, "utf-8");
      syllabus = data;
    } catch (error) {
      console.log(error);
    }
  }

  //parameters from frontend
  const {
    subject,
    degree,
    year,
    diff_lvl,
    mcq,
    mcq_marks,
    tf,
    tf_marks,
    ar,
    ar_marks,
    fblanks,
    fblanks_marks,
    short_ans,
    short_ans_marks,
    long_ans,
    long_ans_marks,
  } = req.body;

  let prompt = `Generate a ${subject} question paper consisting `;
  if (mcq) {
    prompt += `${mcq} mcq questions each of ${mcq_marks} marks `;
  }
  if (tf) {
    prompt += `,${tf} true/false questions each of ${tf_marks} marks `;
  }
  if (fblanks) {
    prompt += `,${fblanks} fill in the blanks questions each of ${fblanks_marks} marks `;
  }
  if (ar) {
    prompt += `,${ar} assertion/reason questions each of ${ar_marks} marks `;
  }
  if (short_ans) {
    prompt += `,${short_ans} short answer type questions each of ${short_ans_marks} marks `;
  }
  if (long_ans) {
    prompt += `,${long_ans} long answer type questions each of ${long_ans_marks} marks `;
  }

  prompt += `. The syllabus and topics for the questions will be ${syllabus}. The question paper is for ${degree} ${year} year students in India. The difficulty of the problems should be ${diff_lvl}.`;

  //api result
  const result = await apiResult(prompt);

  //write questions in a file
  try {
    fs.writeFileSync("result.txt", result);
    console.log("File written successfully");

    //fs.unlinkSync(`./${file_name}`);
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Error" });
  }
};

export const downloadResult = async (req, res) => {
  res.download("./result.txt");
};
