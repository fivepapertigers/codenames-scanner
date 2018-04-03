
List<R> mapWithIndex<T, R>(List<T> list, R Function(T, int) func) {
  return list
    .asMap()
    .map((int idx, T item) => new MapEntry(idx, func(item, idx)))
    .values
    .toList();
}

List<int> count(int num, [int base = 0]) {
  return new List.generate(num, (int i) => i + base).toList();
}


R mapReduce<T, R>(List<T>list, R Function(R combined, T item) reducer, {R initial}) {
  R result = initial;
  list.forEach((T item) {
    result = reducer(result, item);
  });
  return result;
}
