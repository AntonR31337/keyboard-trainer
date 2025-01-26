// class Counter extends Component {
//   state = {
//     count2: 0,
//   };

//   componentDidMount(): void {}

//   render(): React.ReactNode {
//     return (
//       <div>
//         <p>Вы нажали {this.state.count2} раз</p>
//         <button
//           onClick={() => this.setState({ count2: this.state.count2 + 1 })}
//         >
//           Нажми меня 2
//         </button>
//       </div>
//     );
//   }
// }

// export default Counter;

const Counter = () => {
  // Object.name - просто показывает имя функции или класса
  // Object.call() - вызывается сразу, аргументы после первого перечисляются последовательно
  // Object.apply() - вызывается сразу, аргументы после первого перечисляются в едином массиве
  // Object.bind() - привязывает нужный контекст один раз, аргументы после первого перечисляются последовательно
  //
  // Object[Symbol] - примитивный тип, уникальный и неизменяемый идентификатор
  //
  // Object.values() - получает массив со всеми собственными значениями
  // Object.keys() - получает массив со всеми собственными ключами значений
  // Object.entries() - получает массив массивов с ключами и значениями [[0: "key", 1: "value"]]
  // Object.fromEntries() - преобразует массив массивов с ключами и значениями [[0: "key", 1: "value"]]
  //
  // Object.assign() - копирует в целевой объект (первый аргумент) все последующие объекты (аргументы)
  // ~>>>----> [HEAD] <----<<<~
  // Object.hasOwn() - ???
  // Object.create() - создает объект, первый аргумент объект, а второй - дескрипторы его свойств
  // Object.defineProperty() -
  // Object.defineProperties() -
  // Object.getOwnPropertyDescriptor() -
  // Object.getOwnPropertyDescriptors() -
  // Object.getOwnPropertyNames() -
  // Object.getOwnPropertySymbols() -
  //
  // Object.prototype
  // Object.getPrototypeOf()
  // Object.setPrototypeOf()
  //
  // Object.toString() - есть два разных метода, один Object.toString возвращает строковое представление самой функции.
  // Второй, доступный всем объектам, который возвращает строковое представление объекта.
  // Object.groupBy() - группирует по заданным признакам.
  // Object.is() - проверяет на равенства объектов
  //
  // Object.isExtensible()
  // Object.preventExtensions()
  // Object.seal()
  // Object.isSealed()
  // Object.freeze()
  // Object.isFrozen()
  // * Map
  // * Set

    function sumIntervals(intervals: [number, number][]): number {
        //TODO
        let sumIntervals = 0

        intervals.sort().map(([f,s]) => {
            for (let i = f; i < s; i++) {
                sumIntervals++
            }
        })

        return sumIntervals

    }

    console.log(sumIntervals([
        [1, 4],
        [7, 10],
        [3, 5]
    ]))

    return <>test page</>;
};

export default Counter;
