export function countAuto(data) {
  let countSpan = document.querySelectorAll(".count");
  let carListIteam = document.querySelectorAll(".car-list__item");
  for (let i = 0; i < countSpan.length; i++) {
    countSpan[i].innerHTML = data;
    switch (true) {
      case countSpan[0].innerHTML == 0:
        countSpan[0].parentElement.style.opacity = "0";
        break;

      case countSpan[0].innerHTML == 1:
        countSpan[0].nextSibling.nextSibling.innerHTML = "автомобиль";
        countSpan[0].previousSibling.previousSibling.innerHTML = "Найден";
        countSpan[0].parentElement.style.opacity = "1";

        break;
      case countSpan[0].innerHTML > 1:
        countSpan[0].nextSibling.nextSibling.innerHTML = "авто";
        countSpan[0].previousSibling.previousSibling.innerHTML = "Найдено";
        countSpan[0].parentElement.style.opacity = "1";

        break;
      case countSpan[2].innerHTML < 1:
        countSpan[2].style.opacity = "0";
        countSpan[2].nextSibling.nextSibling.style.opacity = "0";

        break;
      case countSpan[2].innerHTML == 1:
        countSpan[2].nextSibling.nextSibling.innerHTML =
          carListIteam.length + "&nbsp &nbspавтомобиль";
        countSpan[2].nextSibling.nextSibling.style.opacity = "1 0&nbsp &nbsp";

        break;
      case countSpan[2].innerHTML > 1:
        countSpan[2].nextSibling.nextSibling.innerHTML =
          carListIteam.length + "&nbsp &nbsp авто";
        countSpan[2].nextSibling.nextSibling.style.opacity = "1";
        break;

      default:
        break;
    }
  }
}
