import 'package:codenames_scanner/models.dart';


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
  list = list == null ? new List<T>() : list;
  list.forEach((T item) {
    result = reducer(result, item);
  });
  return result;
}

R mapReduceWithIdx<T, R>(List<T>list, R Function(R combined, T item, int idx) reducer, {R initial}) {
  R result = initial;
  int idx = 0;
  list = list == null ? new List<T>() : list;
  list.forEach((T item) {
    result = reducer(result, item, idx);
    idx += 1;
  });
  return result;
}

List<R> flatten<R>(List<List<R>>listOfLists) => mapReduce<List<R>, List<R>>(
  listOfLists,
  (List<R> flattenedList, innerList) =>
  new List.from(flattenedList)..addAll(innerList),
  initial: new List<R>());



List<BoardCard> generateNewBoardRow({BoardCard Function() generator}) {
  return List.generate(5, (int _) => generator == null ? new BoardCard() : generator());
}

List<List<BoardCard>> generateNewBoard({BoardCard Function() generator}) {
  return List.generate(5, (int idx) => generateNewBoardRow(generator: generator));
}

List<R> flattenMap<T, R>(List<T> list, List<R> Function(T) getSubList) {
  return mapReduce<T, List<R>>(list, (List<R> combined, T item) {
    if (combined == null) {
      combined = new List<R>();
    }
    combined.addAll(getSubList(item));
    return combined;
  });
}
