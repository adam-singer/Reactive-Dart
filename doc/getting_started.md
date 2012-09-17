## Useful Links ##
### Online Demos ###
* [Observable.throttle()](http://www.lucastudios.com/demos/throttle/throttle_demo.html)
* ['Alphabet Invasion!' A game written entirely with Reactive Dart](http://www.lucastudios.com/demos/alphabetinvasion/)

### Reactive Dart Blog Series ###
* [Part 1 - Using Observable.throttle() to minimize round-trips](http://phylotic.blogspot.com/2012/01/reactive-dart-series-part-1-of-n-using.html)
* [Part 2 - Merging multiple sequences with Observable.merge()](http://phylotic.blogspot.com/2012/01/reactive-dart-series-part-2-of-n.html)
* [Part 3 - Creating a simple game with Reactive Dart](http://phylotic.blogspot.com/2012/02/reactive-dart-series-part-3-of-n.html)
* [Part 4 - Working with Observable.animationFrame()](http://phylotic.blogspot.com/2012/03/reactive-dart-series-part-4-of-n.html)

## Choose your library ##
Some observable operators, or their implementations, are specific to platform 
(.fromEvent() is an example of this), so RD offers three library choices:

### Client (Dartium, JS) ###
    reactive_client.dart

### Server (VM) ###
    reactive_server.dart

## Consistent Idiom Regardless of Sequence Type ##
RD sees everything in the same way, so you don't have to remember specific
imperative implementation in order to "pull" data from the environment.

Lets look at a few examples:

### Example 1 - Lists
    Observable
		.fromList([1,2,3,4,5])
		.observe((i) => print("$i"));

Yields

    1
	2
	3
	4
	5

We could have also achieved the same result with a generator observable like .range():

	Observable
		.range(1, 5)
		.observe((i) => print("$i"));
	
### Example 2 - Events (Client Only) ###
RD sees events coming from the user, or any other event for that matter, as just another sequence:

	Observable
		.fromEvent(myElement.on.click)
		.observe((e) => print ("Button Clicked"));

Yields (for each click on the element)

	Button Clicked
	Button Clicked
	...
	
Notice how in both examples we are using a similar approach to express
our intent.  It's declarative, consistent, and readable.  We like that.

One can easily see how the same would apply to, lets say, a sequence of
network messages coming from server-side, or a Dart isolate...

## .observe() is a Multi-Headed Beast ##
All observables implement a **observe()** method, which is "overloaded" such
that it takes the following arguements:

* .observe(IObserver o); //Your own observer implementation
* .observe(next(v)); // a function that is called when the next item in 
sequence is available
* .observe(next(v), complete());  // a completer function that is called when
the sequence terminates on it's own
* .observe(next(v), complete(), error(e)); // an error handler function that
is provided an Exception whenever the sequence experiences a fault

### How .observe() works... ###
	Observable
		.timer(500, 5) //implements an interval timer at 500ms for 5 ticks 
		.observe(
			(_)=> print("Tick!"),   	// next() is called for each element in a sequence 
			()=> print("Complete."), 	// complete() is called when a sequence terminates
			(e)=> print("Error!")		// error() is called when an Exception occurs in the sequence stream
		);

Yields (every 500ms)

	Tick!
	Tick!
	Tick!
	Tick!
	Tick!
	Complete.
	
Now lets suppose we put something invalid for the interval parameter.  In this case, the error() function of the subscriber will be called.

	Observable
		.timer(-2, 5) //implements an interval timer at 500ms for 5 ticks 
		.observe(
			(_)=> print("Tick!"),   	
			()=> print("Complete."), 	
			(e)=> print("Error!")
		);
		
Yields

	Error!
	

## Implementing your own Observable ##
It's easy with the helper method **Observable.create**

	//A simple observable that returns the value 5 and then terminates.
	IObservable myObservable = Observable.create((IObserver o){
		next(5);
		complete();
		return (){};
	});
	
	myObservable.observe((v) => print("The number is: $v");
	
Yields

	The number is: 5
	
## How do I cancel the .observe()? ##
Lets modify our timer observable again to illustrate this.

	var counter = 0;
	var disposer;
	disposer = Observable
					.timer(500) //implements an interval timer at 500ms for infinity 
					.observe(
						(_){
							if (++counter > 5){
								disposer.dispose();
								return;
							}
							print("Tick!")
						},
						()=> print("Complete."), 	// complete()
						(e)=> print("Error!")		// error()
					);
					
Yields

	Tick!
	Tick!
	Tick!
	Tick!
	Tick!
	
Notice that the complete() function isn't called by the observable in this case,
because the termination did not occur in sequence itself.

## Observable chaining ##
Any observable that takes an Observable as it's first parameter is also chainable with any other observable. How cool is this:

### Unchained Example ###
	Observable
		.count(Observable.fromEvent(myElement.on.click))
		.observe((c) => print("You clicked the mouse $c times."));

### Chained Example (more readable, easier to modify) ###
	Observable
		.fromEvent(myElement.on.click)
		.count()
		.observe((c) => print("You clicked the mouse $c times."));
		
Both will yield (for each mouse click)

	You clicked the mouse 1 times.
	You clicked the mouse 2 times.
	You clicked the mouse 3 times.
	...

Chaining gets really powerful when you start to think about combining observable sequences in different ways...

### Merging Multiple Observable Streams ###
	// Three observables yielding 20 ticks at different intervals
	// We use then use the .apply() observable to modify the results down the line...
	var o1 = Observable
				.timer(100, 20)
				.apply((v) => 'Timer 1, tick $v');
	var o2 = Observable
				.timer(200, 20)
				.apply((v) => 'Timer 2, tick $v');
	var o3 = Observable
				.timer(300, 20)
				.apply((v) => 'Timer 3, tick $v');
	
	o1
	.merge([o2, o3]) //merging o1 with o2 and o3
	.observe((v) => print(v));
	
You'll have to run the above code yourself to see how it works, but basically it does
all the hard work of merging elements from the three streams into a single stream.
	
## Some reference material on the reactive model
* <http://rxwiki.wikidot.com/start> 