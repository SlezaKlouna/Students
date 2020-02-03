'use strict';

// Вам нужно сделать конструктор сущности Студент.
//     У Студента есть имя, фамилия, год рождения — это свойства. Есть массив с оценками, это тоже свойство.
//     И есть возможность получить возраст студента и его средний бал — это методы.

//     Еще у всех Студентов есть по массиву одинаковой длины, в нем 25 элементов, изначально он не заполнен,
//     но на 25 элементов. Это массив в котором отмечается посещаемость, каждый раз когда мы вызываем метод .present()
//     на очередное пустое место в массив записывается true, когда вызываем .absent() — записывается false.
//     Предусмотрите какую нибудь защиту от того чтоб в массиве посещаемости не могло быть более 25 записей.
//     Массив это свойство, present и absent — методы.

//     Ну и последний метод: .summary(), он проверяет среднюю оценку, и среднее посещение
//     (количествоПосещений/количествоЗанятий), и если средняя оценка больше 90 а среднее посещение больше 0.9,
//     то метод summary, возвращает строку "Ути какой молодчинка!", если одно из этих значений меньше,
//     то — "Норм, но можно лучше", если оба ниже — "Редиска!".

//     Ну и не забудьте после того как напишите замечательный конструктор, создать пару экземпляров(конкретных студентов)
//     и подергать методы.


// hamburger ES5
const HAMBURGER_VALUE = {
    SMALL_SIZE: {
        price: 50,
        calories: 20,
    },
    LARGE_SIZE: {
        price: 100,
        calories: 40,
    },
    STAFFING_CHEES: {
        price: 10,
        calories: 20,
    },
    STAFFING_SALAD: {
        price: 20,
        calories: 5,
    },
    STAFFING_POTATO: {
        price: 15,
        calories: 10,
    },
    TOPPING_SPICE: {
        price: 15,
        calories: 0,
    },
    TOPPING_SAUCE: {
        price: 20,
        calories: 5,
    }
}

const HAMBURGER_METHOD = {
    addToppings(topping) {
        this.order.add(topping);
    },

    addSize(size) {
        this.order.add(size);
    },

    removeToppings(topping) {
        this.order.delete(topping);
    },

    getSizing() {
        return this.size;
    },

    getStaffing() {
        return this.staffing;
    },

    getToppings() {
        return this.toppings;
    },

    calculateCalories() {
        let calories = null;
        for (let key of this.order) {
            calories += key.calories;
        }
        return calories;
    },

    calculatePrice() {
        let price = null;
        for (let key of this.order) {
            price += key.price;
        }
        return price;
    }
};

function Hamburger() {
    this.order = new Set();
};

Hamburger.prototype = Object.create(HAMBURGER_VALUE);
HAMBURGER_VALUE.__proto__ = HAMBURGER_METHOD;

let hamburger = new Hamburger();

hamburger.addToppings(hamburger.TOPPING_SPICE);
console.log(`Calories: ${hamburger.calculateCalories()}, Total price: ${hamburger.calculatePrice()}`);

hamburger.addToppings(hamburger.TOPPING_SAUCE);
hamburger.removeToppings(hamburger.TOPPING_SPICE);

console.log(`Calories: ${hamburger.calculateCalories()}, Total price: ${hamburger.calculatePrice()}`);

// Students
class Student {
    constructor(name, lastname, birthYear, marks) {
        this.name = name;
        this.lastname = lastname;
        this.birthYear = birthYear;
        this.marks = marks;

        this.absence = new Array(25);
        this.absenceIndex = 0;
        this.age = this.studentAge(birthYear);

        this.presenceFactor = 0.8;
        this.goodMarksMin = 90;

        this.results = {
            BETTER: 'Ути какой молодчинка!',
            GOOD: 'Норм, но можно лучше',
            BAD: 'Редиска!',
        };
    };

    // Посещаемость
    // ПРИСУТСТВИЕ
    present() {
        if (this.absence.length > this.absenceIndex) {
            this.absence[this.absenceIndex] = true;
            this.absenceIndex++;
        }
    };

    //ОТСУТСТВИЕ
    absent() {
        if (this.absence.length > this.absenceIndex) {
            this.absence[this.absenceIndex] = false;
            this.absenceIndex++;
        }
    };

    // Возраст студента
    studentAge() {
        let today = new Date();
        let age = today.getFullYear() - this.birthYear;
        return age;
    };

    // Подсчет посещаемости
    get averagePresence() {
        let countePresence = this.absence.splice(0, this.absenceIndex).filter(el => el).length;
        return countePresence / this.absenceIndex;
    };

    get averageMark() {
        let markAverage = this.marks.reduce((accum, mark) => accum + mark);
        return markAverage / this.marks.length;
    }

    // ИТОГ
    summary() {
        if (this.averageMark < this.goodMarksMin && this.averagePresence < this.presenceFactor) {
            return this.results.BAD;
            // console.log(this.results.BAD);
        } else if (this.averageMark < this.goodMarksMin || this.averagePresence < this.presenceFactor) {
            return this.results.GOOD;
            // console.log(this.results.GOOD);
        } else {
            return this.results.BETTER;
            // console.log(this.results.BETTER);
        }
    };

};

let student = new Student('Marta', 'Dou', 1999, [75, 58, 45]);
let student2 = new Student('John', 'Dou', 1996, [95, 99, 95]);
let student3 = new Student('Dart', 'Veider', 1991, [5, 0, 3]);

// Student1
student.present();
student.present();
student.present();
student.present();
student.present();
student.present();
student.present();
student.absent();

//Student 2
student2.present();
student2.present();
student2.present();
student2.present();
student2.present();
student2.present();
student2.present();
student2.present();
student2.present();
student2.absent();

//Student3
student3.present();
student3.absent();
student3.absent();

console.log(`${student.name} ${student.lastname} age: `, student.age);
console.log(`${student.name} ${student.lastname} average marks: `, student.averageMark.toFixed(2));
console.log(student.summary());

console.log(`${student2.name} ${student2.lastname} age: `, student2.age);
console.log(`${student2.name} ${student2.lastname} average marks: `, student2.averageMark.toFixed(2));
console.log(student2.summary());

console.log(`${student3.name} ${student3.lastname} age: `, student3.age);
console.log(`${student3.name} ${student3.lastname} average marks: `, student3.averageMark.toFixed(2));
console.log(student3.summary());



