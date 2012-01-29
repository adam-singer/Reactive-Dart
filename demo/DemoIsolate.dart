/**
*
* This demonstration isolate takes n subscribers and publishes a beacon
* every half second for 5 seconds.
*
* This models a more realistic scenario of a web socket publisher. 
*/
class DemoIsolate extends Isolate
{
  final List<SendPort> _subscribers;
  
  DemoIsolate() : super.light(), _subscribers = new List()
  {

  }
  
  void main(){

    this.port.receive((message, SendPort replyTo) {
      
      if (_subscribers.isEmpty()) broadcast();
      
      //we don't care what the 'message' is in this case
      // just register the subscriber
      _subscribers.add(replyTo);
    });
  }

  void broadcast(){
    Observable
    .randomInt(0, 100, 1, 750, 20)
    .subscribe(
      (v) => sendMessage(v), // Send out each random value generated
      () => sendMessage("") // Timer sequence complete.  Send a null message, which is the (vague) terminator signal, in this case.
      );
  }
  
  void sendMessage(msg){
    _subscribers.forEach((SendPort s) => s.send(msg));
  }
    
}
