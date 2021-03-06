# SkillWheel 
##### эта документация написана для людей из компании [WebCanape](https://web-canape.ru), которые будут поддерживать этот проект после [меня](https://github.com/Vterebenin)

### Время последнего обновления 12:16 | 27/08/2019

## Текущий стэк

На данный момент проект написан на ui-библиотеке [react.js](http://reactjs.org), с надстройками в виде сборника компонентов от [ant.design](https://ant.design), и библиотеки, помогающей обрабатывать данные, [d3.js.](https://d3js.org/). Кроме всего прочего часть менеджмента стейта перенесена в стейт контейнер [redux](https://redux.js.org/)(В надежде, что проект разрастётся, а о стейт контейнере уже подумали🤷‍♀️). 
**Внимание:** На данный момент данные приходят **прямо из этого же репозитория** для имитации асинхронности. файл [fetchedData.json](https://github.com/Vterebenin/skillwheel-front/blob/master/fetchedData.json). Так точно не пойдет, надо с этим что-то решать.

## Структура

Сейчас в проекте есть промежуточный слой (middleware) в виде reduxlogger, который помогает понять логику редаксовских экшенов, выводя информацию о них в консоль. Так, развернув проект локально, запустив сервер, в консоли можно увидеть сообщения вида: http://prntscr.com/oy0tbb, которые будут помогать понять как проект взаимодействует с редаксом. ***Настоятельно рекомендую** потыкать везде на развернутом сервере, отслеживая консоль, чтобы понять где и какие экшены используются.*

Проект сейчас выглядит примерно вот так:  [ссылка на вид компонентов](https://prnt.sc/oy0kq9)

|цвет            | компонент                        |назначение                         |
|----------------|----------------------------------|-----------------------------------|
|красный		     |`'MainWrapper'`                   | служит оберткой для контента      |
|зеленый         |`MainLayout`                      | текущий контент                   |
|коричневый      |`UserContent, SkillContent, Wheel`|Внутренние компоненты              | 

🎡Компонент `Wheel` является тем самым колесом скилов. Данные распределяются используя d3.js для отрисовки и tippy.js для тултипов. Первый уровень состоит из областей(areas), второй из скилов.

🙍‍♂️Компонент `UserContent` содержит необходимую информация о пользователе.

🐱‍👤 Компонент  `SkillContent` появляется при нажатии на скилл второго уровня, выводя подробную информацию о скиле.

Файлы редакса:

👌Экшены: [src/actions.js](https://github.com/Vterebenin/skillwheel-front/blob/master/src/actions.js)

👆Конфигурация стора: [src/configureStore.js](https://github.com/Vterebenin/skillwheel-front/blob/master/src/configureStore.js)

✌Редюсеры: [src/reducers.js](https://github.com/Vterebenin/skillwheel-front/blob/master/src/reducers.js)


## Если остались вопросы

Мои актуальные контакты(упорядочены по скорости ответа), если будут вопросы.

📱  [Телеграм](https://t.me/Ternow)

📫 terebenin.work@gmail.com 

🚮[Вк](https://vk.com/dfkz1)

