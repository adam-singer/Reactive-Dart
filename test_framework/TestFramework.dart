//   Copyright (c) 2012, John Evans
//
//   John: https://plus.google.com/u/0/115427174005651655317/about
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.


/// A very lightweight unit-testing framework.

#library('UnitTestFramework');

#source('TestGroupBase.dart');

class TestFramework {
  final List<TestGroupBase> _tests;
  
  TestFramework() : 
    _tests = new List<TestGroupBase>()
  {
  } 

  void addTestGroup(TestGroupBase testGroup)
  {
    _tests.add(testGroup);  
  }
  
  void executeTests(){
    var totalTests = 0;
    var totalPassed = 0;
    
    _tests.forEach((test){
      Tuple<int> result = _executeTestGroup(test);
      totalPassed += result.first;
      totalTests += result.second;
    });
    
    print("Total: $totalTests, Passed: $totalPassed");
  }
  
  /**
  * Executes and displays results of tests for a given test [group] */
  Tuple<int> _executeTestGroup(TestGroupBase group){
    int passedCount = 0;
 
    group.testList.forEach((testName, value) => passedCount =  _executeTest(testName, value) ? passedCount + 1 : passedCount);
        
    return new Tuple<int>.with(passedCount, group.testList.length);
  }
   
  /**
  * Executes an individual test. Should not be called directly */
  bool _executeTest(String testName, Function test){
    var testText = "$testName... ";

    try{
      test();
    }catch(ExpectException e){
      print("$testText FAILED.");
      print("... ${e.message}");
      return false;
    }catch(Exception e){
      print("$testText FAILED.");
      print("... Exception: ${e.toString()}");
      return false;
    }
    
    print("$testText passed.");
    
    return true;
  } 

}


/**
* Represents a pair of like values. */
class Tuple<T>
{
  T first, second;
  Tuple();
  Tuple.with(this.first, this.second);
}
