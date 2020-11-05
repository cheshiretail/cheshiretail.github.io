let reviewsListContainer = document.querySelector(".d2-reviews__list-container");
let reviewsList = reviewsListContainer.querySelector(".d2-reviews__list");
let reviewsItems = reviewsList.querySelectorAll(".d2-reviews__item");
let reviewsButtons = document.querySelectorAll(".d2-reviews__button");
let elementMarginRight = getComputedStyle(reviewsItems[0]).marginRight;
let elementMarginRightNumber = Number(elementMarginRight.replace('px', ''));
let itemWidth = reviewsItems[0].offsetWidth;
let reviewsListContainerWidth = reviewsListContainer.offsetWidth;
let mediaWindow = window.matchMedia("(max-width: 420px)");
let startPoint = reviewsListContainerWidth / 2 - (itemWidth / 2 + elementMarginRightNumber / 2)

if (mediaWindow.matches) {
    startPoint = itemWidth - elementMarginRightNumber * 2 + 22.5;
}

function clearButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("focus");
    }
}

function reviewsButtonsClickHandler(button, x) {
    button.addEventListener('click', function () {
        clearButtons(reviewsButtons);
        button.classList.add("focus");
        changePosition(x);
    })
}

function changePosition(x) {
    if (x === 0) {
        if (mediaWindow.matches) {
            reviewsList.style.left = '22.5px';
        } else {
            let calcFor1 = startPoint + elementMarginRightNumber / 2;
            reviewsList.style.left = (calcFor1 + 'px').toString();
        }
    } else {
        let calcForOther = startPoint + (x - 1) * (itemWidth + elementMarginRightNumber);
        reviewsList.style.left = ('-' + calcForOther + 'px').toString();
    }
}

for (let i = 0; i < reviewsButtons.length; i++) {
    reviewsButtonsClickHandler(reviewsButtons[i], i);
}
