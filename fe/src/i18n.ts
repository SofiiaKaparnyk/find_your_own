import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import UK from 'assets/languages/ukraine-flag-icon.png';
import EN from 'assets/languages/united-states-flag-icon.png';
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      validation: {
        required: 'This field is required',
        passwordMin: 'Minimum 6 characters',
        nameMin: 'Minimum 2 characters',
        incorrectEmail: 'Email is invalid',
        match: 'The password does not match!',
        equelDate: "Date of birth mustn't be equal to current date",
        location: "You haven't chosen your location",
      },
      header: {
        logo: 'FIND YOUR OWN',
        flag: EN,
      },
      hero: {
        title: 'Find your friend on the map',
        description:
          "Welcome to our platform, where every dot on the map represents a person waiting to be discovered! Explore, connect, and navigate through our interactive map to find your own near you. Whether it's making new friends, networking professionally, or simply discovering fascinating stories, our website brings people together like never before. Start exploring now and uncover the world, one pin at a time!",
      },
      login: {
        title: 'Log in',
        password: 'Password',
        submit: 'Log in',
        question: "Don't have an account?",
      },
      signup: {
        title: 'Sign up',
        firstname: 'First name',
        lastname: 'Last name',
        gender: 'Gender',
        dob: 'Day of birth',
        password: 'Password',
        confirm: 'Confirm password',
        submit: 'Submit',
        back: 'Back',
        question: 'Already have an account?',
        warning:
          "Click on the map and move the marker so you stay in the blue area.",
        step1: 'Email and password',
        step2: 'Personal data',
        step3: 'Your approximate location',
      },
    },
  },
  uk: {
    translation: {
      validation: {
        required: 'Це поле обов`язкове',
        passwordMin: 'Мінімум 6 символів',
        nameMin: 'Мінімум 2 символи',
        incorrectEmail: 'Некоректний email',
        match: 'Пароль не збігається!',
        equelDate: 'Вибрана дана не може бути рівною теперішній даті',
        location: 'Ви не вказали локацію',
      },
      header: {
        logo: 'ЗНАЙДИ СВОЇХ',
        flag: UK,
      },
      hero: {
        title: 'Знайди свого товариша на карті',
        description:
          "Ласкаво просимо на нашу платформу, де кожна точка на мапі представляє людину, яка чекає на вас! Досліджуйте, знаходьте зв'язки та навігуйте через нашу інтерактивну карту, щоб знайти своїх поблизу вас. Чи це заведення нових друзів, професійне спілкування або просто відкриття захоплюючих історій, наш веб-сайт об'єднує людей як ніколи раніше. Розпочніть дослідження зараз і відкрийте світ, крапка за крапкою!",
      },
      login: {
        title: 'Увійти',
        password: 'Пароль',
        submit: 'Увійти',
        question: 'Ще не маєте облікового запису?',
      },
      signup: {
        title: 'Зареєструватися',
        firstname: "Ім'я",
        lastname: 'Призвище',
        gender: 'Стать',
        dob: 'День народження',
        password: 'Пароль',
        confirm: 'Підтвердження паролю',
        submit: 'Підтвердити',
        back: 'Назад',
        question: 'Вже маєте обліковий запис?',
        warning:
          'Клацніть на карті і перемістіть маркер, щоб залишатися у синій області.',
        step1: 'Email та пароль',
        step2: 'Персональні дані',
        step3: 'Ваша приблизна локація',
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
