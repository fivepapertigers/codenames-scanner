import 'package:flutter_test/flutter_test.dart';
import 'package:codenames_scanner/utils/util.dart';

void main() {
  test('flatten', () {
    List<List<int>> outerList = [[1, 2, 3], [4, 5, 6]];
    expect(flatten(outerList), [1, 2, 3, 4, 5, 6]);
  });
}
