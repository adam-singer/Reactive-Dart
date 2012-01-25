## Reactive Dart
Reactive Dart (RD) is an implementation of the reactive mode on sequences.  
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

