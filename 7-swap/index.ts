const obj: Record<string, number> = {
  a: 1,
  b: 2,
};

function swapKeysAndValues<K extends string, V extends number>(
  data: Record<K, V>
): Record<V, K> {
  //   const swapped: Record<V, K> = {}; не смог типизировать этот объект, не понимаю как это сделать
  const swapped: any = {};

  for (const key in data) {
    if (obj.hasOwnProperty(key)) {
      swapped[data[key]] = key;
    }
  }

  return swapped;
}

console.log(swapKeysAndValues(obj));
