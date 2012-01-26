class ObservableTests extends TestGroupBase
{

  registerTests(){
    testGroupName = "Reactive Tests";
    
    testList['Observable.create() returns IObservable'] = createReturnsIObservable;
  }
  
  
  void createReturnsIObservable(){
    var result = Observable.create((IObserver o){
      o.complete();
    });
    
    Expect.isTrue(result is IObservable);
  }
}
