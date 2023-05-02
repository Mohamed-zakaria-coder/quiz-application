import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSfvnJKhpvOzc4HbqAkth12ITPH7VXCLE",
  authDomain: "quiz-app-6ce28.firebaseapp.com",
  projectId: "quiz-app-6ce28",
  storageBucket: "quiz-app-6ce28.appspot.com",
  messagingSenderId: "313701120273",
  appId: "1:313701120273:web:e1c5b616fb82c9922874b0",
  measurementId: "G-FJ0PXNKXL3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
const colRef = collection(db, "quiz-docs");

// Start Variables
let category = document.querySelector(".category");
let questionsNumber = document.querySelector(".questions-number");
let submitBtn = document.querySelector(".submit-answer");
let quizQuestion = document.querySelector(".quiz-question");
let quizAnswer = document.querySelector(".quiz-answers");
let label = document.querySelectorAll(".wrong");
let inputs = document.querySelectorAll("input");
let quiz = document.querySelector(".quiz");
let correctly = document.querySelector(".correctly");
let page = document.querySelector(".page");
let spansParent = document.querySelector(".spans-parent");
let countdown = document.querySelector(".countdown");
let countDownSpan = document.querySelector(".countdown span");

let index = 0;
let points = 0;
countDownSpan.innerHTML = "32.00";
page.style.cssText =
  "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)";
page.style.display = "none";
let checkedInput;
let loading = document.createElement("h2");
loading.textContent = "Loading...";
loading.className = "loading";
loading.style.cssText =
  "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 5px 10px; color:white; font-size: 24px;";
document.body.appendChild(loading);
// fetch(
//   "https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=5"
// )
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data)
let data;
getDocs(colRef)
  .then((snapshot) => {
    let quizDocs = [];
    snapshot.docs.forEach((doc) => {
      quizDocs.push(doc.data());
    });
    console.log(quizDocs[0].data);
    data = quizDocs[0].data;

    if (!data) {
    } else {
      loading.style.display = "none";
      page.style.display = "block";
      function countDown() {
        countDownSpan.innerHTML -= 1;

        if (countDownSpan.innerHTML === "0") {
          submitBtn.click();
          countDownSpan.innerHTML = 10;
          if (index === data.length) {
            clearInterval(countDownText);
            countdown.remove();
          }
        }
      }
      let countDownText = setInterval(countDown, 1000);
      let spans;
      for (let i = 0; i < data.length; i++) {
        spans = document.createElement("span");

        spansParent.appendChild(spans);
      }
      function Quiz() {
        let myArr = [];
        inputs.forEach((input) => {
          input.checked ? (checkedInput = input) : "";
        });
        let randomNumber = Math.floor(Math.random() * 3);
        if (data[index]) {
          console.log(data[index].correctAnswer);
          for (let i = 0; i <= 2; i++) {
            myArr.push(
              (label[i].textContent = data[index].incorrectAnswers[i])
            );
          }
          myArr.splice(randomNumber, 0, data[index].correctAnswer);
          for (let i = 0; i <= 3; i++) {
            label[i].textContent = myArr[i];
          }
          questionsNumber.textContent = data.length + " Questions";
          category.textContent = "Category: " + data[index].category;

          quizQuestion.textContent = data[index].question;
          quizQuestion.style.lineHeight = "1.2";

          let allSpans = document.querySelectorAll(".spans-parent span");

          allSpans.forEach((span, i) => {
            if (i <= index) {
              span.style.backgroundColor = "#1caed6";
            }
          });
        }
      }
      Quiz();
      countDown();
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
          inputs[0].checked = true;
          index++;
          Quiz();
          countDownSpan.innerHTML = 30;
          if (index === data.length) {
            countdown.remove();
          }
          if (index === data.length) {
            quizAnswer.remove();
            quizQuestion.remove();
            submitBtn.remove();
            spansParent.remove();
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
    }
  })
  .catch((err) => console.log(err.message));
