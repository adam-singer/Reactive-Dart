#import('../test_framework/TestFramework.dart');
#import('../lib/reactive_lib.dart');
#source('ObservableTests.dart');


class reactive_tests {
  final TestFramework tester;
  reactive_tests() : tester = new TestFramework();

  void run() {
    tester.addTestGroup(new ObservableTests());
   
    tester.executeTests();
  }

}

void main() {
  new reactive_tests().run();
}
