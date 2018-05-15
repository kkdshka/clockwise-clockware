import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en: {
        main: "Main",
        clients: "Clients",
        watchmakers: "Watchmakers",
        cities: "Cities",
        reservations: "Reservations",
        logout: "Log out",
        name: "Name",
        email: "Email",
        city: "City",
        clockSize: "Clock size",
        date: "Date",
        time: "Time",
        confirm: "Confirm",
        small: "Small",
        medium: "Medium",
        large: "Large",
        fillFields: "Fill in the fields",
        chooseWatchmaker: "Choose watchmaker",
        confirmationMessage: "Your order is accepted.\n Confirmation send to email",
        rating: "Rating",
        noWatchmakersMessage: "There is no free watchmakers for your time",
        close: "Close",
        nameWarning: "Name should consist of three letters and more",
        emailWarning: "Enter correct email",
        dateWarning: "Choose date from today",
        timeWarning: "Choose time from 9:00 (or later than now, if you choose today) to 18:00",
        addClient: "Add client",
        editClient: "Edit client",
        add: "Add",
        addCity: "Add city",
        editCity: "Edit city",
        addReservation: "Add reservation",
        editReservation: "Edit reservation",
        addWatchmaker: "Add watchmaker",
        editWatchmaker: "Edit watchmaker",
        notEmptyNameWarning: "Name can't be empty",
        authenticationWarning: "Wrong login or password",
        login: "Login",
        password: "Password",
        notFound: "Page not found",
        watchmaker: "Watchmaker",
        contactUs: "Contact us",
        header: "We are repairing grandfather clocks at client's house.\n Fill the form and wait for our watchmaker."
    },
    ru: {
        main: "Главная",
        clients: "Клиенты",
        watchmakers: "Мастера",
        cities: "Города",
        reservations: "Бронирования",
        logout: "Выйти",
        name: "Имя",
        email: "Email",
        city: "Город",
        clockSize: "Размер часов",
        date: "Дата",
        time: "Время",
        confirm: "Принять",
        small: "Маленькие",
        medium: "Средние",
        large: "Большие",
        fillFields: "Заполните поля",
        chooseWatchmaker: "Выберите мастера",
        confirmationMessage: "Ваш заказ принят.\n Подтверждение отправлено на почту",
        rating: "Рейтинг",
        noWatchmakersMessage: "На ваше время свободных мастеров нет",
        close: "Закрыть",
        nameWarning: "Имя не может быть короче трех букв",
        emailWarning: "Введите правильный почтовый адрес",
        dateWarning: "Введите дату с сегодняшней",
        timeWarning: "Выберите время с 9:00 до 18:00 или если выбрана сегодняшняя дата - позже текущего времени",
        addClient: "Добавить клиента",
        editClient: "Изменить клиента",
        add: "Добавить",
        addCity: "Добавить город",
        editCity: "Изменить город",
        addReservation: "Добавить заказ",
        editReservation: "Изменить заказ",
        addWatchmaker: "Добавить мастера",
        editWatchmaker: "Изменить мастера",
        notEmptyNameWarning: "Название не может быть пустым",
        authenticationWarning: "Неправильные логин или пароль",
        login: "Логин",
        password: "Пароль",
        notFound: "Ресурс не найден",
        watchmaker: "Мастер",
        contactUs: "Свяжитесь с нами",
        header: "Мы занимается ремонтом напольных часов с выездом на дом к клиентам.\n Оставьте заявку на ремонт и ожидайте мастера на выбранное время."
    }
});

export default strings;