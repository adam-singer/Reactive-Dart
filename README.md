## Reactive Dart
Reactive Dart (RD) is an implementation of the reactive model on sequences.  
Plainly stated, this project implements the dual of an enumerable type.  
RD works on the principle that everything in the environment is a sequence
of data being pushed at the application.

## Live Demo of Observable.throttle()
* Demo: <http://prujohn.github.com/Reactive-Dart>
* How It Works: [Blog Post](http://phylotic.blogspot.com/2012/01/reactive-dart-series-part-1-of-n-using.html)

## 35+ Observable Operators to Work With
The demo app demonstrates nearly all of them:

* .any()
* .apply()
* .buffer()
* .concat()
* .contains()
* .count()
* .create() (create your own observable if the built-ins don't suite your needs)
* .delay()
* .distinct()
* .distinctUntilNot()
* .empty()
* .first()
* .firstOf()
* .fold()
* .fromEvent()
* .fromIsolate() (hacky, but works)
* .fromList()
* .fromXMLHttpRequest()
* .merge()
* .random()
* .randomInt()
* .range()
* .returnValue()
* .single()
* .take()
* .takeWhile()
* .throttle()
* .throwE()
* .timeout()
* .timer()
* .timestamp()
* .toList()
* .unfold()
* .where()
* .zip()


## Consistent Idiom Regardless of Sequence Type
RD sees everything in the same way, so you don't have to remember specific
imperative implementation in order to "pull" data from the environment.

Lets look at a few examples:

### Example 1 - Lists
    Observable
		.fromList([1,2,3,4,5])
		.subscribe((i) => print("$i"));

Yields

    1
	2
	3
	4
	5

We could have also achieved the same result with a generator observable like .range():

	Observable
		.range(1, 5)
		.subscribe((i) => print("$i"));
	
### Example 2 - Events
RD sees events coming from the user, or any other event for that matter, as just another sequence:

	Observable
		.fromEvent(myElement.on.click)
		.subscribe((e) => print ("Button Clicked"));

Yields (for each click on the element)

	Button Clicked
	Button Clicked
	...
	
Notice how in both examples we are using a similar approach to express
our intent.  It's declarative, consistent, and readable.  We like that.

One can easily see how the same would apply to, lets say, a sequence of
network messages coming from server-side, or a Dart isolate...

## .subscribe() is a Multi-Headed Beast
All observables implement a **subscribe()** method, which is "overloaded" such
that it takes the following arguements:

* .subscribe(IObserver o); //Your own observer implementation
* .subscribe(next(v)); // a function that is called when the next item in 
sequence is available
* .subscribe(next(v), complete());  // a completer function that is called when
the sequence terminates on it's own
* .subscribe(next(v), complete(), error(e)); // an error handler function that
is provided an Exception whenever the sequence experiences a fault

### How .subscribe() works...
	Observable
		.timer(500, 5) //implements an interval timer at 500ms for 5 ticks 
		.subscribe(
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
		.subscribe(
			(_)=> print("Tick!"),   	
			()=> print("Complete."), 	
			(e)=> print("Error!")
		);
		
Yields

	Error!
	

## Implementing your own Observable
It's easy with the helper method **Observable.create**

	//A simple observable that returns the value 5 and then terminates.
	IObservable myObservable = Observable.create((IObserver o){
		next(5);
		complete();
		return (){};
	});
	
	myObservable.subscribe((v) => print("The number is: $v");
	
Yields

	The number is: 5
	
## How do I unsubscribe?
Lets modify our timer observable again to illustrate this.

	var counter = 0;
	var disposer;
	disposer = Observable
					.timer(500) //implements an interval timer at 500ms for infinity 
					.subscribe(
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

## Observable chaining
Any observable that takes an Observable as it's first parameter is also chainable with any other observable. How cool is this:

### Unchained Example
	Observable
		.count(Observable.fromEvent(myElement.on.click))
		.subscribe((c) => print("You clicked the mouse $c times."));

### Chained Example (more readable, easier to modify)
	Observable
		.fromEvent(myElement.on.click)
		.count()
		.subscribe((c) => print("You clicked the mouse $c times."));
		
Both will yield (for each mouse click)

	You clicked the mouse 1 times.
	You clicked the mouse 2 times.
	You clicked the mouse 3 times.
	...

Chaining gets really powerful when you start to think about combining observable sequences in different ways...

### Merging Multiple Observable Streams
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
	.subscribe((v) => print(v));
	
You'll have to run the above code yourself to see how it works, but basically it does
all the hard work of merging elements from the three streams into a single stream.
	
## More To Come
Most of the core operators are built, but I do plan to add more over time. Feel free to contact me if you want to contribute your own.
	
## Some reference material on the reactive model
* <http://rxwiki.wikidot.com/start> 
