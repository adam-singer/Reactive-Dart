class ObservableException implements Exception {
  final String message;
  const ObservableException(this.message);
  
  String toString() => message;
}
