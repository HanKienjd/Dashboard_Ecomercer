import React from "react";
import { connect } from "react-redux";
import * as CommonIcon from "components/icons/common";
import { Link, Redirect, withRouter } from "react-router-dom";

import { subjects2 } from "actions/common/getInfo";
import { getHistoryExam } from "actions/examActions";
import UserContent from "../layout/UserContent";
import TittleUserInfo from "../user/TittleUserInfo";
import { getMinute } from "actions/common/utils";
import MainContent from "../layout/MainContent";

class HistoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match } = this.props;
    const { subject, id } = match.params; // type, môn học
    // this.props.getHistoryExam(id);
  }

  componentWillReceiveProps() {
    if (false) {
      this.setState({ examId: 1 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  renderQuestion = (examQuestions) => {
    if (!examQuestions) return null;
    const opt = ["option1", "option2", "option3", "option4"];
    return examQuestions.map((item, i) => {
      return (
        <React.Fragment>
          <div className="game-code-view">
            <div className="card-game-content">
              <span
                dangerouslySetInnerHTML={{
                  __html: `<b>Câu ${i + 1}: </b>${item.question}`,
                }}
              >
                {/* {item.question} */}
              </span>
            </div>
            <div className="group-checkbox">
              {opt.map((option) => {
                if (!item[option]) return null;
                return (
                  <div
                    className={`input-group-prepend 
                    ${
                      item.correctAnswer &&
                      item.correctAnswer.includes(item[option])
                        ? "true"
                        : ""
                    }
                    ${
                      item.answer && item.answer.includes(item[option])
                        ? "active"
                        : ""
                    }
                    ${
                      this.state[`Q${i}`] &&
                      this.state[`Q${i}`].answerOP.includes(option)
                        ? "active"
                        : ""
                    }
                  `}
                  >
                    <div className="input-group-text">
                      <input
                        type={item.type === "one" ? "radio" : "checkbox"}
                        // name={item.id}
                        className="input-items disable"
                        onChange={() => {}}
                        readOnly
                        checked={
                          item.answer && item.answer.includes(item[option])
                        }
                      />
                    </div>
                    <div className="input-content">{item[option]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  renderChoiceTable = (examQuestions) => {
    if (!examQuestions) return null;
    const opt = ["option1", "option2", "option3", "option4"];
    const key = { option1: "A", option2: "B", option3: "C", option4: "D" };
    return examQuestions.map((item, i) => {
      return (
        <React.Fragment>
          <div className="abc d-flex">
            <div className="stt">{i + 1}</div>
            {opt.map((option) => {
              if (!item[option]) return null;
              return (
                <div
                  className={`edf disable
                    ${
                      item.correctAnswer &&
                      item.correctAnswer.includes(item[option])
                        ? "true"
                        : ""
                    }
                    ${
                      item.answer && item.answer.includes(item[option])
                        ? "active"
                        : ""
                    }
                    ${
                      this.state[`Q${i}`] &&
                      this.state[`Q${i}`].answerOP.includes(option)
                        ? "active"
                        : ""
                    }
                    `}
                  // onClick={() => this.choose(i, item.id, item[option], option)}
                  // onClick={() => this.choose(i, item.id, option)}
                  // ${this.state[`Q${i}`] && item[option] === this.state[`Q${i}`].answerOP ? 'active' : ''}
                >
                  {key[option]}
                </div>
              );
            })}
          </div>
        </React.Fragment>
      );
    });
  };

  render() {
    const { accessToken, examQuestions, doTime, isDone, examInfo } = this.props;
    const arrVal = Object.values(this.state);
    const numOption1 = arrVal.filter(
      (item) =>
        item && item.questionId && item.answer && item.answerOP === "option1"
    );
    const numOption2 = arrVal.filter(
      (item) =>
        item && item.questionId && item.answer && item.answerOP === "option2"
    );
    const numOption3 = arrVal.filter(
      (item) =>
        item && item.questionId && item.answer && item.answerOP === "option3"
    );
    const numOption4 = arrVal.filter(
      (item) =>
        item && item.questionId && item.answer && item.answerOP === "option4"
    );
    if (!accessToken && isDone) return <Redirect to="/" />;
    return (
      // <MainContent>
      <div className="container MultipleChoiceExam">
        <div className="row">
          <div className="col-9">{this.renderQuestion(examQuestions)}</div>

          <div className="col-3">
            <div className="multiple-choice">
              <div
                className="result-timer"
                style={{ textAlign: "center", margin: "8px auto" }}
              >
                {getMinute(doTime)}
              </div>
              <div className="a123 d-flex">
                <div className="a123-stt">STT</div>
                {examInfo.numOptionPicked.map((num) => (
                  <div className="a123-number">{num}</div>
                ))}
              </div>
              <div className="wrapper-table-choice list-overflow-auto">
                {this.renderChoiceTable(examQuestions)}
              </div>
            </div>
            {/* <div className="btn-group"> */}
            <button
              type="button"
              className="btn btn-primary submit-btn"
              onClick={() => this.props.back()}
            >
              Quay lại
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
      // </MainContent>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    auth,
    exam: { result, historyExam, paginationHistory },
  } = state;
  return {
    user: auth.user,
    accessToken: auth.accessToken,
    result,
    isDone: auth.isDone,
    // historyExam,
    // paginationHistory,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getHistoryExam,
  })(HistoryDetail)
);
// export default Header;
