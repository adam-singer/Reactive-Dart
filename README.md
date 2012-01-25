## Reactive Dart
Reactive Dart (RD) is an implementation of the reactive model on sequences.  
Plainly stated, this project implements the dual of an enumerable type.  
RD works on the principle that everything in the environment is a sequence
of data being pushed at the application.

## Consistent Idiom Regardless of Sequence Type
RD sees everything in the same way, so you don't have to remember specific
syntax in order to "pull" data from the environment.

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

### Example 2 - DOM Events
	Observable
		.fromDOMEvent(myElement.on.click)
		.subscribe((e) => print ("Button Clicked"));

Yields (for each click on the element)

	Button Clicked
	Button Clicked
	
Notice how in both examples we are using a similar approach to express
our intent.  It's declarative, consistent, and readable.  We like that.

One can easily see how the same would apply to, lets say, a sequence of
network messages coming from server-side, or a Dart isolate...

## .subscribe() is a multi-headed beast
All observables implement a subscribe method, which is "overloaded" such
that it takes the following arguements:

* .subscribe(IObserver o); //Your own observer implementation
* .subscribe(next(v)); // a function that is called when the next item in 
sequence is available
* .subscribe(next(v), complete());  // a completer function that is called when
the sequence terminates on it's own
* .subscribe(next(v), complete(), error(e)); // an error handler function that
is provided an Exception whenever the sequence experiences a fault

### Example
	Observable
		.timer(500, 5) //implements an interval timer at 500ms for 5 ticks 
		.subscribe(
			(_)=> print("Tick!"),   	// next() 
			()=> print("Complete."), 	// complete()
			(e)=> print("Error!")		// error()
		);

Yields (every 500ms)

	Tick!
	Tick!
	Tick!
	Tick!
	Tick!
	Complete.
	
Now lets suppose we put something invalid for the interval parameter

	Observable
		.timer(-2, 5) //implements an interval timer at 500ms for 5 ticks 
		.subscribe(
			(_)=> print("Tick!"),   	// next() 
			()=> print("Complete."), 	// complete()
			(e)=> print("Error!")		// error()
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

	The number is 5
	
## How do I unsubscribe?
Lets modifier our timer observable again to illustrate this.

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
	
Notice that the complet() function isn't called by the observable in this case,
because the termination did not occur in sequence itself.

## Observable chaining
Some observables are chainable. How cool is this:

	Observable
		.fromDOMEvent(myElement.on.click)
		.count()
		.subscribe((c) => print("You clicked the mouse $c times."));
		
Yields (for each mouse click)

	You clicked the mouse 1 times.
	You clicked the mouse 2 times.
	You clicked the mouse 3 times.
	...

Chainging gets really powerful when you start to think about merging observable sequences, and so forth...
	
## More To Come
I'll be buildig lots more observable wrappers.  Feel free to contribute your own.
	
## Some reference Matrial on the reactive model
* <http://rxwiki.wikidot.com/start> 
