var link = document.querySelector(".header__order");
var popupCall = document.querySelector(".js-call");
var popupCallOver = document.querySelector(".js-call-over");
var closeCall = popupCall.querySelector(".modal-close");
var tel = popupCall.querySelector(".call__form-text");
var form = popupCall.querySelector("form");
var isStorageSupport = true;
var storage = "";
var modal = document.querySelector(".modal");
var popupCallBtn = popupCall.querySelector(".call__form-btn");
var popupThx = document.querySelector(".js-thx");
var popupThxOver = document.querySelector(".js-thx-over");
var closeThx = popupThx.querySelector(".modal-close");
var intro = document.querySelector(".intro__call");
var introForm = intro.querySelector("form");
var introBtn = intro.querySelector(".call__form-btn");
var introTel = intro.querySelector(".call__form-text");
var deliv = document.querySelector(".delivery__block");
var delivForm = deliv.querySelector("form");
var delivBtn = deliv.querySelector(".call__form-btn");
var delivTel = deliv.querySelector(".call__form-text");
var presentLink = document.querySelector(".js-present");

try {
	storage = localStorage.getItem("tel");
} catch (err) {
	isStorageSupport = false;
}

try {
	storage = localStorage.getItem("introTel");
} catch (err) {
	isStorageSupport = false;
}

try {
	storage = localStorage.getItem("delivTel");
} catch (err) {
	isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
	evt.preventDefault();
	popupCall.classList.add("modal-show");
	popupCallOver.classList.add("modal-show");

	if (storage) {
		tel.value = storage;
	}

	tel.focus();
});

presentLink.addEventListener("click", function (evt) {
	evt.preventDefault();
	popupCall.classList.add("modal-show");
	popupCallOver.classList.add("modal-show");

	if (storage) {
		tel.value = storage;
	}

	tel.focus();
})

closeCall.addEventListener("click", function (evt) {
	evt.preventDefault();
	popupCall.classList.remove("modal-show");
	popupCall.classList.remove("modal-error");
	popupCallOver.classList.remove("modal-show");
});

form.addEventListener("submit", function (evt) {
	if (!tel.value) {
		evt.preventDefault();
		popupCall.classList.remove("modal-error");
		popupCall.offsetWidth = popupCall.offsetWidth;
		popupCall.classList.add("modal-error");	
	} else {
		if (isStorageSupport) {
				localStorage.setItem("tel", tel.value);	
		}
		popupThx.classList.add("modal-show");
		popupThxOver.classList.add("modal-show");
		popupCall.classList.remove("modal-show");
		popupCallOver.classList.remove("modal-show");
	}
});

introForm.addEventListener("submit", function (evt) {
	if (!introTel.value) {
		evt.preventDefault();
		intro.classList.remove("modal-error");
		intro.offsetWidth = intro.offsetWidth;
		intro.classList.add("modal-error");	
	} else {
		if (isStorageSupport) {
				localStorage.setItem("introTel", introTel.value);	
		}
		popupThx.classList.add("modal-show");
		popupThxOver.classList.add("modal-show");
	}
});

delivForm.addEventListener("submit", function (evt) {
	if (!introTel.value) {
		evt.preventDefault();
		deliv.classList.remove("modal-error");
		deliv.offsetWidth = deliv.offsetWidth;
		deliv.classList.add("modal-error");	
	} else {
		if (isStorageSupport) {
				localStorage.setItem("introTel", delivTel.value);	
		}
		popupThx.classList.add("modal-show");
		popupThxOver.classList.add("modal-show");
	}
});

window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (popupCall.classList.contains("modal-show")) {
			popupCall.classList.remove("modal-show");
			popupCall.classList.remove("modal-error");
			popupCallOver.classList.remove("modal-show");
		}
	}
});

closeThx.addEventListener("click", function (evt) {
	evt.preventDefault();
	popupThx.classList.remove("modal-show");
	popupThxOver.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (popupThx.classList.contains("modal-show")) {
			popupThx.classList.remove("modal-show");
			popupThxOver.classList.remove("modal-show");
		}
	}
});