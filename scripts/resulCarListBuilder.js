export class CarBuilder {
    carContainer;
    path;
    car;

    constructor(car, path) {

        this.path = path;
        this.car = car;

        this.carContainer = this.createCar(this.car, this.path);
        this.append(path, this.carContainer);
    }

    createElement(settings) {
        let dom = document.createElement(settings.elem);
        this.createElementSettings(dom, settings)

        return dom;
    }

    createElementSettings(dom, settings) {

        for (let key in settings.attributes) {
            dom.setAttribute(key, settings.attributes[key])
        }
        if (typeof settings.inner == "object") {
            settings.inner.forEach(inner => {
                dom.append(this.createElement(inner))
            })
        } else {
            dom.innerText = settings.inner ? settings.inner : '';
        }
    }

    createCar() {

        // this.createItem(this.car.id,this.car.type);
        // this.addImg(this.car.image);
        // this.addTitle(this.car.name, this.car.year, this.car.win ? this.car.win : "");
        // this.addFeatures(this.car.engine_capacity, this.car.power, this.car.transmission, this.car.drive, this.car.engine_name, this.car.milage);
        // this.addStatus('В наличии');
        // this.addPrice(this.car.price, this.car.advantage);
        // this.addAdvantage(this.car.advantage)
        // this.addAdvansedPrice(this.car.name, this.car.price, this.car.advantage);
        // //this.description(this.car.by_description)
        // this.descriptionBtn()
        // this.addLocation(this.car.location ? this.car.location : 'Минск');
        // this.addBtnreserve(this.car.id)

        this.createItem1(this.car.id);
        this.addImg1(this.car.image);
        this.addTitle1(this.car.name, this.car.year)
        this.addPrice1(this.car.price, this.car.advantage);
        this.addFeatures1(this.car.engine_capacity, this.car.power, this.car.transmission, this.car.drive, this.car.engine_name, this.car.milage);
        this.addComplectation1(this.car.complectation)
        this.addColor1(this.car.color_name)
        this.addBtnreserve1(this.car.id)
        return this.carContainer;
    }

    createItem1(id, type) {
        return this.carContainer = this.createElement({
            'elem': 'div',
            'attributes': {
                'class': 'car-list__item',
                'data-car-id': id,
                'data-type': type
            },
        });
    }

    addImg1(image) {
        let carListBlock = document.createElement("div");
        carListBlock.classList.add("car-list__img");
        let imgCar = new Image();
        imgCar.src = "http://dev.mitsubishi.by" + image;
        carListBlock.append(imgCar);
        imgCar.onerror = function () {
            imgCar.setAttribute("src", "img/noimage2.png");
            imgCar.setAttribute("style", "width:260px; height: 250px;");
        };
        return this.carContainer.append(carListBlock);
    }

    addTitle1(CarName, year) {
        return this.carContainer.appendChild(this.createElement({
            'elem': 'div',
            'attributes': {
                'class': 'car-list__title'
            },
            'inner': [{
                'elem': 'div',
                'inner': CarName,
            }, {
                'elem': 'span',
                'inner': [{'elem': 'span', 'inner': year}]
            }],
        }))
    }

    addPrice1(price, advantage) {
      let inputPriceTradeInStatus = document.getElementById("trade-in_switch");
      let otherPrice = price;
      if (
        price == price - advantage &&
        inputPriceTradeInStatus.checked &&
        localStorage.finalPriceYouCar
      ) {
        otherPrice =
          price - localStorage.finalPriceYouCar - (advantage ? advantage : 0);
        if (otherPrice < 0) {
          otherPrice = "0.1";
        }
      }

        return this.carContainer.appendChild(this.createElement({
            'elem': 'div', 'attributes': {'class': 'car-list__price car-list__price'},
            'inner': [{
                'elem': 'div', 'attributes': {'class': 'car-list__price car-list__price-from'},
                'inner': [{
                    'elem': 'span', 'attributes': {'class': 'new-price'},
                    'inner': String(price - (advantage ? advantage : 0)).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")
                },
                    {'elem': 'span', 'inner': ' BYN '},
                    {'elem': 'span', 'inner': [{'elem': 'img', 'attributes': {'src': '../img/Vector.svg'}}]}
                ]
            }, {
                'elem': 'div', 'attributes': {'class': 'car-list__price-to'},
                'inner': [{
                    'elem': 'div',
                    'inner': String(price).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") + ' BYN'
                }, {
                    'elem': 'span',
                    'inner': '-' + String(advantage).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") + ' выгода по trade-in'
                }]
            }
            ]
        }))
    }

    addFeatures1(engine_capacity, power, transmission, drive, engine_name, milage) {
        return this.carContainer.appendChild(this.createElement({
            'elem': 'div', 'attributes': {'class': 'car-list__features'},
            'inner': engine_capacity + ' ' + '(' + power + ')' + ' ' + transmission + ', ' + drive
        }))
    }

    addComplectation1(complectation) {
        return this.carContainer.appendChild(this.createElement({
            'elem': 'div', 'attributes': {'class': 'complectation'},
            'inner': [
                {'elem': 'p', 'inner': 'Комплектация: '},
                {'elem': 'span', 'inner': complectation},
                {'elem': 'img', 'attributes': {'src': '../img/Vector.svg'}},
            ]
        }))
    }

    addColor1(color_name) {
        return this.carContainer.appendChild(this.createElement({
            'elem': 'div', 'attributes': {'class': 'color-name'},
            'inner': [
                {'elem': 'p', 'inner': 'Цвет: '},
                {'elem': 'span', 'inner': color_name},
            ]
        }))
    }

    addBtnreserve1(carId) {
        return this.carContainer.appendChild(this.createElement({
            'elem': 'div',
            'attributes': {
                'class': 'btn-reserve'
            }, 'inner': [{
                'elem': 'a', 'attributes': {
                    'href': '#',
                    'class': 'red_button viewer',
                    'data-toggle': 'modal',
                    'data-target': '#pop-up',
                    'data-type': 'car-in-stock',
                    'data-car': carId
                }, 'inner': 'ЗАРЕЗЕРВИРОВАТЬ'
            }]
        }))
    }


    /* ---------------------------- */
    // createItem(id, type) {
    //   return this.carContainer = this.createElement({
    //     'elem': 'div',
    //     'attributes': {
    //       'class': 'car-list__item',
    //       'data-car-id': id,
    //       'data-type': type
    //     },
    //   });
    // }
    // addImg(image) {
    //   return this.carContainer.append(this.createElement({
    //     'elem': 'div',
    //     'attributes': {
    //       'class': 'car-list__img'
    //     },
    //     'inner': [{
    //       'elem': 'img',
    //       'attributes': {
    //         'src': 'http://dev.mitsubishi.by' + image
    //       },
    //     }]
    //   }))
    // }
    // addTitle(CarName, year, win) {
    //   return this.carContainer.appendChild(this.createElement({
    //     'elem': 'div',
    //     'attributes': {
    //       'class': 'car-list__title'
    //     },
    //     'inner': [{
    //       'elem': 'h3',
    //       'inner': CarName,
    //     }, {
    //       'elem': 'div',
    //       'inner': [{ 'elem': 'span', 'inner': year },
    //       { 'elem': 'span', 'inner': win }]
    //     }],
    //   }))
    // }
    // addFeatures(engine_capacity, power, transmission, drive, engine_name, milage) {
    //   return this.carContainer.appendChild(this.createElement({
    //     'elem': 'div',
    //     'attributes': {
    //       'class': 'car-list__features'
    //     }, 'inner': [{
    //       'elem': 'div',
    //       'inner': [{
    //         'elem': 'img',
    //         'attributes': {
    //           'src': '../img/car-list-item/malfunction-indicador.svg',
    //           'alt': '#'
    //         }
    //       }, {
    //         'elem': 'p',
    //         'inner': engine_capacity + ' л., ' + power + ' л.с, ' + engine_name
    //       }]
    //     }, {
    //       'elem': 'div',
    //       'inner': [{
    //         'elem': 'img',
    //         'attributes': {
    //           'src': '../img/car-list-item/manual-transmission.svg',
    //           'alt': '#'
    //         }
    //       }, {
    //         'elem': 'p',
    //         'inner': transmission
    //       }]
    //     }, {
    //       'elem': 'div',
    //       'inner': [{
    //         'elem': 'img',
    //         'attributes': {
    //           'src': '../img/car-list-item/axle.svg',
    //           'alt': '#'
    //         }
    //       }, {
    //         'elem': 'p',
    //         'inner': drive
    //       }]
    //     },
    //     {
    //       'elem': "div",
    //       'inner': milage ? [{ 'elem': "img", 'attributes': { 'src': "../img/car-list-item/odometer.svg", 'alt': "#" } }, { 'elem': "p", 'inner': milage ? 'Пробег: ' + milage : '', }] : ''
    //     }
    //     ]
    //   }))
    // }

    // addStatus(status) {
    //   //if (status) this.carContainer.innerHTML += "<div class='car-list__in-stock car-list__status'><span></span><span>" + status + "</span></div>";
    //   //else this.carContainer.innerHTML += "<div class='car-list__in-stock car-list__status'><span style='background:red;'></span><span>" + 'Нет в наличии' + "</span></div>";
    //   let stat;
    //   if (status) {
    //     stat = { 'elem': 'div', 'attributes': { 'class': 'car-list__in-stock car-list__status' }, 'inner': [{ 'elem': 'span' }, { 'elem': 'span', 'inner': status }] }
    //   } else { stat = { 'elem': 'div', 'attributes': { 'class': 'car-list__in-stock car-list__status' }, 'inner': [{ 'elem': 'span', 'attributes': { 'style': `background:red` } }, { 'elem': 'span', 'inner': 'Нет в наличии' }] } }
    //   return this.carContainer.appendChild(this.createElement(stat))
    // }

    // addPrice(price, advantage) {
    //   if (advantage == '' || price == (price - advantage)) {
    //     return this.carContainer.appendChild(this.createElement({
    //       'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price' },
    //       'inner': [
    //         {
    //           'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price-from', }, 'inner': [{
    //             'elem': 'span',
    //             'inner': String(price - (advantage ? advantage : 0)).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1")
    //           }, { 'elem': 'span', 'inner': ' BYN ' }]
    //         }, {
    //           'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price-to', 'style': 'display:none;' }, 'inner': [{ 'elem': 'span', 'inner': String(price).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") },
    //           { 'elem': 'span', 'inner': ' BYN ' }]
    //         }
    //       ]
    //     }))
    //   }
    //   return this.carContainer.appendChild(this.createElement({
    //     'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price' },
    //     'inner': [
    //       {
    //         'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price-from' }, 'inner': [{
    //           'elem': 'span',
    //           'inner': String(price).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") /* String(price - (advantage ? advantage : 0)).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") */
    //         }, { 'elem': 'span', 'inner': ' BYN ' }]
    //       }
    //       // {
    //       //       'elem': 'div', 'attributes': { 'class': 'car-list__price car-list__price-to' }, 'inner': [{ 'elem': 'span', 'inner': String(price).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") },
    //       //   { 'elem': 'span', 'inner': ' BYN ' }]
    //       // }

    //     ]
    //   }))
    // }
    // addAdvantage(advantage) {
    //   if (advantage && advantage != '0') {
    //     return this.carContainer.appendChild(this.createElement({
    //       'elem': 'div', 'attributes': { 'class': 'car-list__advantage' }, 'inner': [{ 'elem': 'span', 'inner': String(-advantage).replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1") + ' BYN выгода по trade-in' }]

    //     }))
    //   }
    // }

    // addAdvansedPrice(carName, carPrice, advantage) {
    //   return this.carContainer.appendChild(
    //     this.createElement({
    //       elem: "div",
    //       attributes: {
    //         class: "car-list__more-price",
    //         "data-name-car": carName,
    //         "data-price-car": carPrice,
    //         "data-advantage": advantage,
    //       },
    //       inner: [{
    //         elem: "div",
    //         attributes: {},
    //         inner: [{
    //           elem: "img",
    //           attributes: { src: "../img/round-info-button.svg", alt: "#" },
    //         },
    //         { elem: "p", inner: "Подробнее о цене" },
    //         ],
    //       },],
    //     })
    //   );
    // }


    // description(descriptions) {
    //   if (descriptions) {
    //     let carDescriptionsBlock = document.createElement('div')
    //     carDescriptionsBlock.className = 'car-descriptions-block'

    //     let contenctDiscriptions = document.createElement('span');
    //     contenctDiscriptions.className = 'car-descriptions'
    //     contenctDiscriptions.innerHTML = descriptions
    //     carDescriptionsBlock.appendChild(contenctDiscriptions)
    //     return this.carContainer.appendChild(carDescriptionsBlock)
    //   }

    // }

    // descriptionBtn() {
    //   let descriptionBtn = document.createElement('div')
    //   descriptionBtn.className = 'descriptionBtn'
    //   descriptionBtn.innerText = 'Описание авто'
    //   return this.carContainer.appendChild(descriptionBtn)
    // }

    // addLocation(location) {
    //   return this.carContainer.appendChild(this.createElement({
    //     'elem': 'div',
    //     'attributes': {
    //       'class': 'car-list__location', 'style': 'opacity:0;'
    //     }, 'inner': [{
    //       'elem': 'img',
    //       'attributes': {
    //         'src': '../img/ArrowLocation.png',
    //         'alt': '#'
    //       }
    //     }, {
    //       'elem': 'span',
    //       'inner': location
    //     }]
    //   }))
    // }
    // addBtnreserve(carId) {
    //   return this.carContainer.appendChild(this.createElement({
    //     'elem': 'div',
    //     'attributes': {
    //       'class': 'btn-reserve'
    //     }, 'inner': [{
    //       'elem': 'a', 'attributes': {
    //         'href': '#',
    //         'class': 'red_button viewer',
    //         'data-toggle': 'modal',
    //         'data-target': '#pop-up',
    //         'data-type': 'car-in-stock',
    //         'data-car': carId
    //       }, 'inner': 'ЗАРЕЗЕРВИРОВАТЬ'
    //     }]
    //   }))
    // }

    append(path, content) {
        document.querySelector(path).appendChild(content);
    }


}