import 'package:codenames_scanner/models.dart';
import 'package:codenames_scanner/utils/util.dart';
import 'package:codenames_scanner/utils/grid.dart';
import 'package:camera/camera.dart';

const TOTAL_CARDS = 25;


AppState initialState = new AppState(
  board: generateNewBoard(),
  gridCorners: new Corners(
      new Offset(50.0, 50.0), new Offset(200.0, 50.0),
      new Offset(50.0, 200.0), new Offset(200.0, 200.0)
  ),
  cameras: [],
  currentLanguageStatus: LoadingStatus.Unstarted,
);


class TransientAppState {
  List<List<BoardCard>> board;
  ImageModel boardImage;
  Corners gridCorners;
  List<CameraDescription> cameras;
  CameraController cameraController;
  LoadingStatus currentLanguageStatus;
  String currentLanguage;
  List<int> editCardLocation;
  Map<CardTypes, List<CardPosition>> cardListOrder;


  static TransientAppState fromAppState(AppState state) {
    return new TransientAppState()
      ..board = state.board
      ..boardImage = state.boardImage
      ..gridCorners = state.gridCorners
      ..cameras = state.cameras
      ..cameraController = state.cameraController
      ..currentLanguageStatus = state.currentLanguageStatus
      ..currentLanguage = state.currentLanguage
      ..editCardLocation = state.editCardLocation
//      Deep copy cardListOrder
      ..cardListOrder = state.cardListOrder == null ? null : new Map.fromEntries(
        state.cardListOrder.entries.map(
          (entry) => new MapEntry(entry.key, new List.from(entry.value))
        )
      )
    ;
  }

  AppState finalize() {
    return AppState.fromTransient(this);
  }

  String toString() {
    return ('TransientAppState <board: $board / boardImage: $boardImage / '+
        'gridCorners: $gridCorners / cameras: $cameras / ' +
        'cameraController: $cameraController>');
  }
}


class AppState {
  final List<List<BoardCard>> board;
  final ImageModel boardImage;
  final Corners gridCorners;
  final List<CameraDescription> cameras;
  final CameraController cameraController;
  final LoadingStatus currentLanguageStatus;
  final String currentLanguage;
  final List<int> editCardLocation;
  final Map<CardTypes, List<CardPosition>> cardListOrder;
  List<BoardCard> _flattenedBoardCache;
  Map<LoadingStatus, int> _boardStatusMapCache;

  AppState({
    this.board, this.boardImage, this.gridCorners,
    this.cameras, this.cameraController, this.currentLanguageStatus,
    this.currentLanguage, this.editCardLocation, this.cardListOrder
  });


  static fromTransient(TransientAppState state) =>
      new AppState(
        board: state.board,
        boardImage: state.boardImage,
        gridCorners: state.gridCorners,
        cameras: state.cameras,
        cameraController: state.cameraController,
        currentLanguageStatus: state.currentLanguageStatus,
        currentLanguage: state.currentLanguage,
        editCardLocation: state.editCardLocation,
        cardListOrder: state.cardListOrder,
      );


  String toString() {
    return ('AppState <board: $board / boardImage: $boardImage / '+
        'gridCorners: $gridCorners / cameras: $cameras / ' +
        'cameraController: $cameraController>');
  }

  LoadingStatus get boardProcessingStatus {
    if (_boardStatusMap[LoadingStatus.Complete] >= TOTAL_CARDS) {
      return LoadingStatus.Complete;
    } else if (_boardStatusMap[LoadingStatus.Unstarted] == 0) {
      return LoadingStatus.Started;
    }
    return LoadingStatus.Unstarted;
  }

  BoardCard get editCard => editCardLocation == null
    ? null
    : board[editCardLocation[0]][editCardLocation[1]];

  double get boardProcessingPercentage =>
    _boardStatusMap[LoadingStatus.Complete] / TOTAL_CARDS;

  List<CardWithPosition> orderedCards (CardTypes cardType) {
    return cardListOrder != null && cardListOrder.containsKey(cardType)
      ? cardListOrder[cardType]
      .map<CardWithPosition>((cardPos) =>
    new CardWithPosition(
      cardPos.row, cardPos.col, board[cardPos.row][cardPos.col]
    )
    )
      .toList()
      : filteredCardsList(board, (cardWPos) => cardWPos.card.type == cardType);
  }

  Map<LoadingStatus, int> get _boardStatusMap =>
    _boardStatusMapCache == null
    ? mapReduce(
      _flattenedBoard,
        (Map<LoadingStatus, int> _statusMap, BoardCard card) =>
      _statusMap..update(_cardStatus(card), (int count) => count + 1),
      initial: {
        LoadingStatus.Complete: 0,
        LoadingStatus.Unstarted: 0,
        LoadingStatus.Started: 0
      }
    )
    : _boardStatusMapCache;

  List<BoardCard> get _flattenedBoard =>
    _flattenedBoardCache == null ? flatten(board) : _flattenedBoardCache;

  LoadingStatus _cardStatus (BoardCard card) {
    if (card.image == null) {
      return LoadingStatus.Unstarted;
    } else if (card.termResult == null) {
      return LoadingStatus.Started;
    } else {
      return LoadingStatus.Complete;
    }
  }
}
