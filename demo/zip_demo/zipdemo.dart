#import('dart:html');
#import('../../lib/reactive_lib.dart');
#resource('testfile.html');

class zipdemo {

  zipdemo(){}

  //Observable.fromXmlHttpRequest
  //Observable.single()
  //Observable.timer()
  
  //Observable.zip
  // Where 'P' is the result of the function applied to pairs
  // 1|--1--1----1--------1-->
  //  |  |   \    \      /|
  // 2|--2----2----2----2---->
  //  |  f    f    f      f
  // S|--P----P----P------P-->
  
  
  run(){
    
    IObservable r1 = Observable
                    .timer(1500, 1)
                    .fromXMLHttpRequest('zipdemo.html', 'Accept', 'text/html');
    
    IObservable r2 = Observable
                    .fromXMLHttpRequest('zipdemo.html', 'Accept', 'text/html');
    

    printHTML('<p>Sequence Started...</p>');
    
    Observable
    .zip(r1, r2, (r, l) => [r, l])
    .single()
    .subscribe(
      (List v){
        printHTML('<p>Found ${v.length} items, (should be 2). </p>');
        printHTML('<p>First Item:</p>');
        printHTML('<pre>${encode(v[0])}</pre>');
        printHTML('<p>Second Item:</p>');
        printHTML('<pre>${encode(v[1])}</pre>');
    }, 
    () => printHTML('<p>Sequence Complete.</p>'),
    (e) => printHTML('<p>Error! $e</p>'));
    
  }
  
  printHTML(String html) => document.query('#status').nodes.add(new Element.html(html));
  
  String encode(String html){
    html = html.replaceAll('<', '&lt;');
    return html.replaceAll('>', '&gt;');
  }
  
}

void main() {
  new zipdemo().run();
}
