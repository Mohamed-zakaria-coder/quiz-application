let category = document.querySelector(".category");
let questionsNumber = document.querySelector(".questions-number");
let submitBtn = document.querySelector(".submit-answer");
let quizQuestion = document.querySelector(".quiz-question");
let quizAnswer = document.querySelector(".quiz-answers");
let label = document.querySelectorAll(".wrong");
let inputs = document.querySelectorAll("input");
let quiz = document.querySelector(".quiz");
let correctly = document.querySelector(".correctly");

let index = 0;
let points = 0;

let checkedInput;

fetch(
  "https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=5"
)
  .then((res) => res.json())
  .then((data) => {
    function Quiz() {
      let myArr = [];
      console.log(data);
      inputs.forEach((input) => {
        input.checked ? (checkedInput = input) : "";
      });
      let randomNumber = Math.floor(Math.random() * 3);
      if (data[index]) {
        for (let i = 0; i <= 2; i++) {
          myArr.push((label[i].textContent = data[index].incorrectAnswers[i]));
        }
        myArr.splice(randomNumber, 0, data[index].correctAnswer);
        for (let i = 0; i <= 3; i++) {
          label[i].textContent = myArr[i];
        }
        questionsNumber.textContent = data.length + " Questions";
        category.textContent = "Category: " + data[index].category;

        quizQuestion.textContent = data[index].question;
        console.log(data[index].correctAnswer);
      }
    }
    Quiz();
    submitBtn.addEventListener("click", () => {
      if (index < data.length) {
        inputs.forEach((input) => {
          input.checked ? (checkedInput = input) : "";
        });
        if (
          checkedInput.nextElementSibling.textContent ===
          data[index].correctAnswer
        ) {
          points++;
        }
        index++;
        Quiz();
        console.log(index);
        console.log(points);
        if (index === data.length) {
          quizAnswer.remove();
          quizQuestion.remove();
          submitBtn.remove();
          correctly.textContent = `You Have Answered ${points} Question${
            points > 1 ? "s" : ""
          } Correctly`;
          let redo = document.createElement("button");
          redo.textContent = "Take The Quiz Again";
          redo.className = "redo";
          correctly.appendChild(redo);
          redo.addEventListener("click", () => {
            location.reload();
          });
        }
      }
    });
  });
