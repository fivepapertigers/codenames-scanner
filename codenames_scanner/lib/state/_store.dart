import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';

import 'package:codenames_scanner/state/_reducer.dart';
import 'package:codenames_scanner/state/_state_model.dart';

export 'package:redux/redux.dart' show Store;


final Store<AppState> store = new Store<AppState>(
    appReducer, initialState: initialState, middleware: [thunkMiddleware]
);
