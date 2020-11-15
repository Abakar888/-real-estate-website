/**
 * NodeList.prototype.forEach() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
 */
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}




const sidebarToggleBtn = document.querySelector('.container__menu-icon-wrapper')
const menuIcon = document.querySelector('.container__menu-icon');
const sidebar = document.querySelector('.container__sidebar');
const btnShowMoreCards = document.querySelector('.container__btn-more');
const hiddenCards = document.querySelectorAll('.container__card-link--hidden');
const widgets = document.querySelectorAll('.container__widget');
const checkBoxAny = document.querySelector('#location-05');
const topLocationCheckboxes = document.querySelectorAll('[data-location-param]');


const showMoreOptions = document.querySelector('.container__widget-btn-show-hidden');
const hiddenCheckBoxes = document.querySelectorAll('.container__checkbox-hidden');


// Фильтр на мобильных устройствах
// Клик по кнопке для скрытия / показа фильтра и изменения иконки
sidebarToggleBtn.onclick = function () {
    menuIcon.classList.toggle('container__menu-icon-active');
    sidebar.classList.toggle('container__sidebar--mobile-active');
};

// Показать еще 3 карточки
btnShowMoreCards.addEventListener('click', function () {
    hiddenCards.forEach(function (card) {
        card.classList.remove('container__card-link--hidden');
    });
});

// Показать/скрыть контент внутри виджетов

widgets.forEach(function (widget) {
    widget.addEventListener('click', (e) => {
        if (e.target.classList.contains('container__widget-title')) {
            e.target.classList.toggle('container__widget-title--active');
            e.target.nextElementSibling.classList.toggle('container__widget-body--hidden');
        }
    });
});


// Location - кнопка "Любая"
// Выбор кнопки "Любая" и отключение других чекбоксов
checkBoxAny.addEventListener('change', function () {
    if (checkBoxAny.checked) {
        topLocationCheckboxes.forEach(function (item) {
            item.checked = false;
        });
    }
});
// Отключаем кнопку "Любая" при выборе других параметров
topLocationCheckboxes.forEach(function (item) {
    item.addEventListener('change', function () {
        if (checkBoxAny.checked) {
            checkBoxAny.checked = false;
        }

    });
});

// Показать еще 3 доп. опции с чекбоксами в фильтре

showMoreOptions.onclick = function (e) {

    e.preventDefault();

    if (showMoreOptions.dataset.options == "hidden") {
        hiddenCheckBoxes.forEach(function (item) {
            item.style.display = 'block';
        });
        showMoreOptions.innerText = "Скрыть дополнительные опции";
        showMoreOptions.dataset.options = "visible";
    }

    else if (showMoreOptions.dataset.options == "visible") {
        hiddenCheckBoxes.forEach(function (item) {
            item.style.display = 'none';
        });
        showMoreOptions.innerText = "Показать еще";
        showMoreOptions.dataset.options = "hidden";
    };
};

