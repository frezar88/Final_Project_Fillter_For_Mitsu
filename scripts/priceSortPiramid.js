export function pyramidSortPrice() {
  let x = [""];
  let priceCarSpan = [];

  const resultPyramid = document.getElementById("pyramid");
  let target = document.querySelector(".car-list__wrapper");
  const config = {
    childList: true,
  };
  let callbackSortASC = function (mutationsList) {
    if (mutationsList) {
      searchAndSortPriceCar("+");
    }
  };
  let callbackSortDESC = function (mutationsList) {
    if (mutationsList) {
      searchAndSortPriceCar("-");
    }
  };
  let sortASC = new MutationObserver(callbackSortASC);
  let sortDESC = new MutationObserver(callbackSortDESC);

  resultPyramid.addEventListener("click", () => {
    if (x.length < 3) {
      x.push("1");
    } else x = [""];
    function classAdd() {
      if (x.length == 2) {
        resultPyramid.classList.toggle("pyramid-activ");
        sortArrayPrice();
        sortASC.observe(target, config);
      }
      if (x.length == 3) {
        resultPyramid.classList.toggle("pyramid-revers");
        sortASC.disconnect();
        sortArrayPrice2();
        sortDESC.observe(target, config);
      }
      if (x.length == 1) {
        resultPyramid.classList.toggle("pyramid-activ");
        resultPyramid.classList.toggle("pyramid-revers");
        sortDESC.disconnect();
      }
    }
    classAdd();
  });
  function searchAndSortPriceCar(params) {
    priceCarSpan = document.querySelectorAll(
      ".car-list__price .car-list__price-from .new-price"
    );

    let noSortArr = [];
    let sortArr = [];
    noSortArr = [];
    priceCarSpan.forEach((element) => {
      noSortArr.push(element);
      console.log(noSortArr);
    });
    sortPrice(noSortArr);
    sortArr = [];

    noSortArr.forEach((element) => {
      sortArr.push(element.parentElement.parentElement.parentElement);
    });
    for (let i = 0; i < sortArr.length; i++) {
      sortArr[i].style.order = params + i;
    }
  }
  function sortPrice(arr) {
    arr.sort((a, b) => (a.innerHTML > b.innerHTML ? 1 : -1));
    return arr;
  }
  function sortPrice2(arr) {
    arr.sort((a, b) => (a.innerHTML < b.innerHTML ? 1 : -1));
    console.log(arr.sort((a, b) => (a.innerHTML < b.innerHTML ? 1 : -1)));
    return arr;
  }

  function sortArrayPrice() {
    let carPriceAuto = document.querySelectorAll(
      ".car-list__price .car-list__price-from .new-price"
    );
    let cars = [];
    carPriceAuto.forEach((element) => {
      cars.push(element);
    });
    sortPrice(cars);

    target.innerHTML = "";
    cars.forEach((element) => {
      target.appendChild(element.parentElement.parentElement.parentElement);
    });
  }
  function sortArrayPrice2() {
    let carPriceAuto = document.querySelectorAll(
      ".car-list__price .car-list__price-from .new-price"
    );
    let cars = [];
    carPriceAuto.forEach((element) => {
      cars.push(element);
    });
    sortPrice2(cars);

    target.innerHTML = "";
    cars.forEach((element) => {
      target.appendChild(element.parentElement.parentElement.parentElement);
    });
  }
}
