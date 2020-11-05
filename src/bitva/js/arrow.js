var question1 = document.querySelector(".js-q1");
var question2 = document.querySelector(".js-q2");
var question3 = document.querySelector(".js-q3");
var answer1 = document.querySelector(".js-descr1");
var answer2 = document.querySelector(".js-descr2");
var answer3 = document.querySelector(".js-descr3");
var button1 = document.querySelector(".js-arrow1");
var button2 = document.querySelector(".js-arrow2");
var button3 = document.querySelector(".js-arrow3");
var header = document.querySelector(".header");

question1.onclick = function () {
	answer1.classList.toggle("visually-hidden");
	button1.classList.toggle("questions__arrow--active");
};

question2.onclick = function () {
	answer2.classList.toggle("visually-hidden");
	button2.classList.toggle("questions__arrow--active");
};

question3.onclick = function () {
	answer3.classList.toggle("visually-hidden");
	button3.classList.toggle("questions__arrow--active");
};

window.addEventListener("scroll", function() {
	header.classList.add("header--white");
})