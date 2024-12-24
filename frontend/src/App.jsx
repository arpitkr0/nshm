import { useState } from "react";
import axios from "axios";
import FileDownload from "js-file-download";

const App = () => {
  const [syFile, setsyFile] = useState(false);
  const [download, setDownload] = useState(false);
  const [data, setData] = useState({
    subject: "",
    degree: "",
    year: "",
    diff_lvl: "",
    mcq: "",
    mcq_marks: "",
    tf: "",
    tf_marks: "",
    ar: "",
    ar_marks: "",
    fblanks: "",
    fblanks_marks: "",
    short_ans: "",
    short_ans_marks: "",
    long_ans: "",
    long_ans_marks: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("degree", data.degree);
    formData.append("year", data.year);
    formData.append("diff_lvl", data.diff_lvl);
    formData.append("mcq", data.mcq);
    formData.append("mcq_marks", data.mcq_marks);
    formData.append("tf", data.tf);
    formData.append("tf_marks", data.tf_marks);
    formData.append("fblanks", data.fblanks);
    formData.append("fblanks_marks", data.fblanks_marks);
    formData.append("ar", data.ar);
    formData.append("ar_marks", data.ar_marks);
    formData.append("short_ans", data.short_ans);
    formData.append("short_ans_marks", data.short_ans_marks);
    formData.append("long_ans", data.long_ans);
    formData.append("long_ans_marks", data.long_ans_marks);
    formData.append("syllabus", syFile);

    const response = await axios.post(
      "http://localhost:8000/api/gen-ques",
      formData
    );

    if (response.data.success) {
      setDownload(true);
      setData({
        subject: "",
        degree: "",
        year: "",
        diff_lvl: "",
        mcq: "",
        mcq_marks: "",
        tf: "",
        tf_marks: "",
        ar: "",
        ar_marks: "",
        fblanks: "",
        fblanks_marks: "",
        short_ans: "",
        short_ans_marks: "",
        long_ans: "",
        long_ans_marks: "",
      });
    }
  };

  const downloadHandler = async () => {
    axios({
      url: "http://localhost:8000/api/gen-ques/download",
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      FileDownload(res.data, "questions.txt");
    });
  };

  return (
    <>
      <div className="left">
        <div className="form-container">
          <form onSubmit={onSubmitHandler}>
            <div className="syllabus-upload-container">
              <p>Upload Syllabus(.pdf/.txt format)</p>
              <input
                onChange={(e) => setsyFile(e.target.files[0])}
                type="file"
                id="syllabus"
                required
              />
            </div>
            <div className="set subject_diff_lvl_details flex">
              <div className="subject">
                <p>Subject</p>
                <input
                  type="text"
                  name="subject"
                  onChange={onChangeHandler}
                  value={data.subject}
                  required
                />
              </div>
            </div>

            <div className="set mcq-details flex">
              <div className="mcq_count">
                <p>No. of MCQs</p>
                <input
                  type="number"
                  name="mcq"
                  onChange={onChangeHandler}
                  value={data.mcq}
                />
              </div>
              <div className="mcq_marks">
                <p>Each MCQ marks</p>
                <input
                  type="number"
                  name="mcq_marks"
                  onChange={onChangeHandler}
                  value={data.mcq_marks}
                />
              </div>
            </div>
            <div className="set tf_details flex">
              <div className="tf_count">
                <p>No. of True/False</p>
                <input
                  type="number"
                  name="tf"
                  onChange={onChangeHandler}
                  value={data.tf}
                />
              </div>
              <div className="tf_marks">
                <p>Each True/False marks</p>
                <input
                  type="number"
                  name="tf_marks"
                  onChange={onChangeHandler}
                  value={data.tf_marks}
                />
              </div>
            </div>
            <div className="set fblanks_details flex">
              <div className="fblanks_count">
                <p>No. of Fill in the Blanks</p>
                <input
                  type="number"
                  name="fblanks"
                  onChange={onChangeHandler}
                  value={data.fblanks}
                />
              </div>
              <div className="fblanks_marks">
                <p>Each fill in the blanks marks</p>
                <input
                  type="number"
                  name="fblanks_marks"
                  onChange={onChangeHandler}
                  value={data.fblanks_marks}
                />
              </div>
            </div>
            <div className="set ar_details flex">
              <div className="ar_count">
                <p>No. of Assertion/Reason</p>
                <input
                  type="number"
                  name="ar"
                  onChange={onChangeHandler}
                  value={data.ar}
                />
              </div>
              <div className="ar_marks">
                <p>Each Assertion/Reason marks</p>
                <input
                  type="number"
                  name="ar_marks"
                  onChange={onChangeHandler}
                  value={data.ar_marks}
                />
              </div>
            </div>
            <div className="set short_ans_details flex">
              <div className="short_ans_count">
                <p>No. of short answer type</p>
                <input
                  type="number"
                  name="short_ans"
                  onChange={onChangeHandler}
                  value={data.short_ans}
                />
              </div>
              <div className="short_ans_marks">
                <p>Each short answer type marks</p>
                <input
                  type="number"
                  name="short_ans_marks"
                  onChange={onChangeHandler}
                  value={data.short_ans_marks}
                />
              </div>
            </div>
            <div className="set long_ans_details flex">
              <div className="long_ans_count">
                <p>No. of long answer type</p>
                <input
                  type="number"
                  name="long_ans"
                  onChange={onChangeHandler}
                  value={data.long_ans}
                />
              </div>
              <div className="long_ans_marks">
                <p>Each long answer type marks</p>
                <input
                  type="number"
                  name="long_ans_marks"
                  onChange={onChangeHandler}
                  value={data.long_ans_marks}
                />
              </div>
            </div>
            <div className="set degree_details">
              <div className="degree">
                <p>Degree</p>
                <input
                  type="text"
                  name="degree"
                  required
                  onChange={onChangeHandler}
                  value={data.degree}
                />
              </div>
            </div>
            <div className="set diff_lvl_year flex">
              <div className="year">
                <p>Year</p>
                <select
                  name="year"
                  id="year"
                  required
                  onChange={onChangeHandler}
                  value={data.year}
                >
                  <option value="1st">1st</option>
                  <option value="2nd">2rd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
              </div>
              <div className="diff_lvl">
                <p>Difficulty level</p>
                <select
                  name="diff_lvl"
                  id="diff_lvl"
                  onChange={onChangeHandler}
                  value={data.diff_lvl}
                  required
                >
                  <option value="easy">easy</option>
                  <option value="moderate">moderate</option>
                  <option value="hard">hard</option>
                </select>
              </div>
            </div>

            <div className="set btns flex">
              <button type="submit" className="submit-btn">
                Submit
              </button>
              {download ? (
                <button onClick={downloadHandler} className="download-btn">
                  Click here to download
                </button>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
