//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
$defProp(Object.prototype, '$typeNameOf', function() {
  if ((typeof(window) != 'undefined' && window.constructor.name == 'DOMWindow')
      || typeof(process) != 'undefined') { // fast-path for Chrome and Node
    return this.constructor.name;
  }
  var str = Object.prototype.toString.call(this);
  str = str.substring(8, str.length - 1);
  if (str == 'Window') {
    str = 'DOMWindow';
  } else if (str == 'Document') {
    str = 'HTMLDocument';
  }
  return str;
});
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
$defProp(Object.prototype, '$index', function(i) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$index = function(i) { return this[i]; }
  }
  return this[i];
});
$defProp(Array.prototype, '$index', function(index) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i];
});
$defProp(String.prototype, '$index', function(i) {
  return this[i];
});
$defProp(Object.prototype, '$setindex', function(i, value) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$setindex = function(i, value) { return this[i] = value; }
  }
  return this[i] = value;
});
$defProp(Array.prototype, '$setindex', function(index, value) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i] = value;
});
function $wrap_call$0(fn) { return fn; }
function $wrap_call$1(fn) { return fn; }
function $add(x, y) {
  return ((typeof(x) == 'number' && typeof(y) == 'number') ||
          (typeof(x) == 'string'))
    ? x + y : x.$add(y);
}
function $eq(x, y) {
  if (x == null) return y == null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x == y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
function $ne(x, y) {
  if (x == null) return y != null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x != y : !x.$eq(y);
}
function $truncdiv(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') {
    if (y == 0) $throw(new IntegerDivisionByZeroException());
    var tmp = x / y;
    return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
  } else {
    return x.$truncdiv(y);
  }
}
$defProp(Object.prototype, "get$typeName", Object.prototype.$typeNameOf);
// ********** Code for Object **************
$defProp(Object.prototype, "get$dynamic", function() {
  "use strict"; return this;
});
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "add$1", function($0) {
  return this.noSuchMethod("add", [$0]);
});
$defProp(Object.prototype, "addEventListener$3", function($0, $1, $2) {
  return this.noSuchMethod("addEventListener", [$0, $1, $2]);
});
$defProp(Object.prototype, "clear$0", function() {
  return this.noSuchMethod("clear", []);
});
$defProp(Object.prototype, "clearTimeout$0", function() {
  return this.noSuchMethod("clearTimeout", []);
});
$defProp(Object.prototype, "complete$0", function() {
  return this.noSuchMethod("complete", []);
});
$defProp(Object.prototype, "error$1", function($0) {
  return this.noSuchMethod("error", [$0]);
});
$defProp(Object.prototype, "filter$1", function($0) {
  return this.noSuchMethod("filter", [$0]);
});
$defProp(Object.prototype, "forEach$1", function($0) {
  return this.noSuchMethod("forEach", [$0]);
});
$defProp(Object.prototype, "is$IObserver", function() {
  return false;
});
$defProp(Object.prototype, "is$html_Element", function() {
  return false;
});
$defProp(Object.prototype, "next$0", function() {
  return this.noSuchMethod("next", []);
});
$defProp(Object.prototype, "next$1", function($0) {
  return this.noSuchMethod("next", [$0]);
});
$defProp(Object.prototype, "setTimeout$2", function($0, $1) {
  return this.noSuchMethod("setTimeout", [$0, $1]);
});
$defProp(Object.prototype, "subscribe$1", function($0) {
  return this.noSuchMethod("subscribe", [$0]);
});
$defProp(Object.prototype, "subscribe$2", function($0, $1) {
  return this.noSuchMethod("subscribe", [$0, $1]);
});
// ********** Code for IndexOutOfRangeException **************
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
// ********** Code for IllegalAccessException **************
function IllegalAccessException() {

}
IllegalAccessException.prototype.toString = function() {
  return "Attempt to modify an immutable object";
}
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
}
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  sb.add("]");
  return $add(("NoSuchMethodException - receiver: '" + this._receiver + "' "), ("function name: '" + this._functionName + "' arguments: [" + sb + "]"));
}
// ********** Code for ClosureArgumentMismatchException **************
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for ObjectNotClosureException **************
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(args) {
  this._args = args;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._args);
}
// ********** Code for StackOverflowException **************
function StackOverflowException() {

}
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
// ********** Code for NullPointerException **************
function NullPointerException() {

}
NullPointerException.prototype.toString = function() {
  return "NullPointerException";
}
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for EmptyQueueException **************
function EmptyQueueException() {

}
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for IntegerDivisionByZeroException **************
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
IntegerDivisionByZeroException.prototype.toString = function() {
  return "IntegerDivisionByZeroException";
}
// ********** Code for dart_core_Function **************
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
Function.prototype.to$call$2 = function() {
  this.call$2 = this._genStub(2);
  this.to$call$2 = function() { return this.call$2; };
  return this.call$2;
};
Function.prototype.call$2 = function($0, $1) {
  return this.to$call$2()($0, $1);
};
function to$call$2(f) { return f && f.to$call$2(); }
// ********** Code for top level **************
function dart_core_print(obj) {
  return _print(obj);
}
function _print(obj) {
  if (typeof console == 'object') {
    if (obj) obj = obj.toString();
    console.log(obj);
  } else {
    write(obj);
    write('\n');
  }
}
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException());
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException());
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
ListFactory.ListFactory$from$factory = function(other) {
  var list = [];
  for (var $$i = other.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    list.add$1(e);
  }
  return list;
}
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "addAll", function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var item = $$i.next$0();
    this.add(item);
  }
});
$defProp(ListFactory.prototype, "clear", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
$defProp(ListFactory.prototype, "add$1", ListFactory.prototype.add);
$defProp(ListFactory.prototype, "clear$0", ListFactory.prototype.clear);
$defProp(ListFactory.prototype, "filter$1", function($0) {
  return this.filter(to$call$1($0));
});
$defProp(ListFactory.prototype, "forEach$1", function($0) {
  return this.forEach(to$call$1($0));
});
// ********** Code for ListIterator **************
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._array.$index(this._pos++);
}
ListIterator.prototype.next$0 = ListIterator.prototype.next;
// ********** Code for ImmutableList **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(ImmutableList, ListFactory);
function ImmutableList(length) {
  Array.call(this, length);
}
ImmutableList.ImmutableList$from$factory = function(other) {
  return _constList(other);
}
ImmutableList.prototype.get$length = function() {
  return this.length;
}
ImmutableList.prototype.set$length = function(length) {
  $throw(const$0002);
}
ImmutableList.prototype.$setindex = function(index, value) {
  $throw(const$0002);
}
ImmutableList.prototype.add = function(element) {
  $throw(const$0002);
}
ImmutableList.prototype.addAll = function(elements) {
  $throw(const$0002);
}
ImmutableList.prototype.clear = function() {
  $throw(const$0002);
}
ImmutableList.prototype.toString = function() {
  return ListFactory.ListFactory$from$factory(this).toString();
}
ImmutableList.prototype.add$1 = ImmutableList.prototype.add;
ImmutableList.prototype.clear$0 = ImmutableList.prototype.clear;
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
// ********** Code for ExceptionImplementation **************
function ExceptionImplementation(msg) {
  this._msg = msg;
}
ExceptionImplementation.prototype.toString = function() {
  return (null == this._msg) ? "Exception" : ("Exception: " + this._msg);
}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && ((null == const$0000 ? null == (existingKey) : const$0000 === existingKey))) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) return (-1);
    if ($eq(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (null == key || (null == key ? null == (const$0000) : key === const$0000)) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.clear = function() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    this._keys.$setindex(i);
    this._values.$setindex(i);
  }
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  var $0;
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0000) : $0 === const$0000))) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.putIfAbsent = function(key, ifAbsent) {
  var index = this._probeForLookup(key);
  if (index >= (0)) return this._values.$index(index);
  var value = ifAbsent();
  this.$setindex(key, value);
  return value;
}
HashMapImplementation.prototype.get$length = function() {
  return this._numberOfEntries;
}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0000) : key !== const$0000))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.clear$0 = HashMapImplementation.prototype.clear;
HashMapImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
// ********** Code for HashSetImplementation **************
function HashSetImplementation() {
  this._backingMap = new HashMapImplementation();
}
HashSetImplementation.prototype.clear = function() {
  this._backingMap.clear();
}
HashSetImplementation.prototype.add = function(value) {
  this._backingMap.$setindex(value, value);
}
HashSetImplementation.prototype.addAll = function(collection) {
  var $this = this; // closure support
  collection.forEach$1(function _(value) {
    $this.add(value);
  }
  );
}
HashSetImplementation.prototype.forEach = function(f) {
  this._backingMap.forEach(function _(key, value) {
    f(key);
  }
  );
}
HashSetImplementation.prototype.filter = function(f) {
  var result = new HashSetImplementation();
  this._backingMap.forEach(function _(key, value) {
    if (f(key)) result.add(key);
  }
  );
  return result;
}
HashSetImplementation.prototype.get$length = function() {
  return this._backingMap.get$length();
}
HashSetImplementation.prototype.iterator = function() {
  return new HashSetIterator(this);
}
HashSetImplementation.prototype.add$1 = HashSetImplementation.prototype.add;
HashSetImplementation.prototype.clear$0 = HashSetImplementation.prototype.clear;
HashSetImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
HashSetImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for HashSetIterator **************
function HashSetIterator(set_) {
  this._entries = set_._backingMap._keys;
  this._nextValidIndex = (-1);
  this._advance();
}
HashSetIterator.prototype.hasNext = function() {
  var $0;
  if (this._nextValidIndex >= this._entries.get$length()) return false;
  if ((($0 = this._entries.$index(this._nextValidIndex)) == null ? null == (const$0000) : $0 === const$0000)) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0000;
  do {
    if (++this._nextValidIndex >= length) break;
    entry = this._entries.$index(this._nextValidIndex);
  }
  while ((null == entry) || ((null == entry ? null == (deletedKey) : entry === deletedKey)))
}
HashSetIterator.prototype.next$0 = HashSetIterator.prototype.next;
// ********** Code for _DeletedKeySentinel **************
function _DeletedKeySentinel() {

}
// ********** Code for DoubleLinkedQueueEntry **************
function DoubleLinkedQueueEntry(e) {
  this._element = e;
}
DoubleLinkedQueueEntry.prototype._link = function(p, n) {
  this._next = n;
  this._previous = p;
  p._next = this;
  n._previous = this;
}
DoubleLinkedQueueEntry.prototype.prepend = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this._previous, this);
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._element;
}
// ********** Code for _DoubleLinkedQueueEntrySentinel **************
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {
  DoubleLinkedQueueEntry.call(this, null);
  this._link(this, this);
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0005);
}
// ********** Code for DoubleLinkedQueue **************
function DoubleLinkedQueue() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel();
}
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.add = function(value) {
  this.addLast(value);
}
DoubleLinkedQueue.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    this.add(e);
  }
}
DoubleLinkedQueue.prototype.first = function() {
  return this._sentinel._next.get$element();
}
DoubleLinkedQueue.prototype.get$first = function() {
  return this.first.bind(this);
}
DoubleLinkedQueue.prototype.get$length = function() {
  var counter = (0);
  this.forEach(function _(element) {
    counter++;
  }
  );
  return counter;
}
DoubleLinkedQueue.prototype.clear = function() {
  this._sentinel._next = this._sentinel;
  this._sentinel._previous = this._sentinel;
}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.filter = function(f) {
  var other = new DoubleLinkedQueue();
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    if (f(entry._element)) other.addLast(entry._element);
    entry = nextEntry;
  }
  return other;
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.add$1 = DoubleLinkedQueue.prototype.add;
DoubleLinkedQueue.prototype.clear$0 = DoubleLinkedQueue.prototype.clear;
DoubleLinkedQueue.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
DoubleLinkedQueue.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _DoubleLinkedQueueIterator **************
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  var $0;
  return (($0 = this._currentEntry._next) == null ? null != (this._sentinel) : $0 !== this._sentinel);
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
_DoubleLinkedQueueIterator.prototype.next$0 = _DoubleLinkedQueueIterator.prototype.next;
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.get$length = function() {
  return this._length;
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.addAll = function(objects) {
  for (var $$i = objects.iterator(); $$i.hasNext(); ) {
    var obj = $$i.next$0();
    this.add(obj);
  }
  return this;
}
StringBufferImpl.prototype.clear = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear();
  this._buffer.add(result);
  return result;
}
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
StringBufferImpl.prototype.clear$0 = StringBufferImpl.prototype.clear;
// ********** Code for StringBase **************
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add($add(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.get$length = function() { return this.length; };
StringImplementation.prototype.startsWith = function(other) {
    'use strict';
    if (other.length > this.length) return false;
    return other == this.substring(0, other.length);
}
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
// ********** Code for _Worker **************
// ********** Code for _ArgumentMismatchException **************
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
// ********** Code for _FunctionImplementation **************
_FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches
      if (this.length == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = this.length - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > this.length ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (this.length == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
// ********** Code for top level **************
function _constList(other) {
  
    other.__proto__ = ImmutableList.prototype;
    return other;
}
//  ********** Library dom **************
// ********** Code for DOMTypeJs **************
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;
    var proto = Object.getPrototypeOf(obj);
    if (!proto.hasOwnProperty(name)) {
      $defProp(proto, name, method);
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  $defProp(Object.prototype, name, $dynamicBind);
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];

function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
$dynamic("get$dartObjectLocalStorage").DOMType = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMType = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for AbstractWorkerJs **************
$dynamic("addEventListener$3").AbstractWorker = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for ArrayBufferJs **************
// ********** Code for ArrayBufferViewJs **************
// ********** Code for NodeJs **************
$dynamic("get$childNodes").Node = function() {
  return this.childNodes;
}
$dynamic("get$firstChild").Node = function() {
  return this.firstChild;
}
$dynamic("get$parentNode").Node = function() {
  return this.parentNode;
}
$dynamic("set$textContent").Node = function(value) {
  this.textContent = value;
}
$dynamic("addEventListener$3").Node = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for AttrJs **************
$dynamic("get$value").Attr = function() {
  return this.value;
}
// ********** Code for AudioBufferJs **************
$dynamic("get$length").AudioBuffer = function() {
  return this.length;
}
// ********** Code for AudioNodeJs **************
// ********** Code for AudioSourceNodeJs **************
// ********** Code for AudioBufferSourceNodeJs **************
// ********** Code for AudioChannelMergerJs **************
// ********** Code for AudioChannelSplitterJs **************
// ********** Code for AudioContextJs **************
// ********** Code for AudioDestinationNodeJs **************
// ********** Code for AudioParamJs **************
$dynamic("get$value").AudioParam = function() {
  return this.value;
}
// ********** Code for AudioGainJs **************
// ********** Code for AudioGainNodeJs **************
// ********** Code for AudioListenerJs **************
// ********** Code for AudioPannerNodeJs **************
// ********** Code for EventJs **************
// ********** Code for AudioProcessingEventJs **************
// ********** Code for BarInfoJs **************
// ********** Code for BeforeLoadEventJs **************
// ********** Code for BiquadFilterNodeJs **************
// ********** Code for BlobJs **************
// ********** Code for CharacterDataJs **************
$dynamic("get$length").CharacterData = function() {
  return this.length;
}
// ********** Code for TextJs **************
// ********** Code for CDATASectionJs **************
// ********** Code for CSSRuleJs **************
// ********** Code for CSSCharsetRuleJs **************
// ********** Code for CSSFontFaceRuleJs **************
// ********** Code for CSSImportRuleJs **************
// ********** Code for CSSMediaRuleJs **************
// ********** Code for CSSPageRuleJs **************
// ********** Code for CSSValueJs **************
// ********** Code for CSSPrimitiveValueJs **************
// ********** Code for CSSRuleListJs **************
$dynamic("get$length").CSSRuleList = function() {
  return this.length;
}
// ********** Code for CSSStyleDeclarationJs **************
$dynamic("get$length").CSSStyleDeclaration = function() {
  return this.length;
}
// ********** Code for CSSStyleRuleJs **************
// ********** Code for StyleSheetJs **************
// ********** Code for CSSStyleSheetJs **************
// ********** Code for CSSUnknownRuleJs **************
// ********** Code for CSSValueListJs **************
$dynamic("get$length").CSSValueList = function() {
  return this.length;
}
// ********** Code for CanvasGradientJs **************
// ********** Code for CanvasPatternJs **************
// ********** Code for CanvasPixelArrayJs **************
$dynamic("get$length").CanvasPixelArray = function() {
  return this.length;
}
$dynamic("$index").CanvasPixelArray = function(index) {
  return this[index];
}
$dynamic("$setindex").CanvasPixelArray = function(index, value) {
  this[index] = value
}
$dynamic("iterator").CanvasPixelArray = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").CanvasPixelArray = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").CanvasPixelArray = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").CanvasPixelArray = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").CanvasPixelArray = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").CanvasPixelArray = function($0) {
  return this.add($0);
};
$dynamic("filter$1").CanvasPixelArray = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").CanvasPixelArray = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for CanvasRenderingContextJs **************
// ********** Code for CanvasRenderingContext2DJs **************
// ********** Code for ClientRectJs **************
// ********** Code for ClientRectListJs **************
$dynamic("get$length").ClientRectList = function() {
  return this.length;
}
// ********** Code for ClipboardJs **************
// ********** Code for CloseEventJs **************
// ********** Code for CommentJs **************
// ********** Code for UIEventJs **************
// ********** Code for CompositionEventJs **************
// ********** Code for ConsoleJs **************
ConsoleJs = (typeof console == 'undefined' ? {} : console);
ConsoleJs.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
ConsoleJs.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
ConsoleJs.error$1 = ConsoleJs.error;
// ********** Code for ConvolverNodeJs **************
// ********** Code for CoordinatesJs **************
// ********** Code for CounterJs **************
// ********** Code for CryptoJs **************
// ********** Code for CustomEventJs **************
// ********** Code for DOMApplicationCacheJs **************
$dynamic("addEventListener$3").DOMApplicationCache = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for DOMExceptionJs **************
// ********** Code for DOMFileSystemJs **************
// ********** Code for DOMFileSystemSyncJs **************
// ********** Code for DOMFormDataJs **************
// ********** Code for DOMImplementationJs **************
// ********** Code for DOMMimeTypeJs **************
// ********** Code for DOMMimeTypeArrayJs **************
$dynamic("get$length").DOMMimeTypeArray = function() {
  return this.length;
}
// ********** Code for DOMParserJs **************
// ********** Code for DOMPluginJs **************
$dynamic("get$length").DOMPlugin = function() {
  return this.length;
}
// ********** Code for DOMPluginArrayJs **************
$dynamic("get$length").DOMPluginArray = function() {
  return this.length;
}
// ********** Code for DOMSelectionJs **************
// ********** Code for DOMTokenListJs **************
$dynamic("get$length").DOMTokenList = function() {
  return this.length;
}
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
// ********** Code for DOMSettableTokenListJs **************
$dynamic("get$value").DOMSettableTokenList = function() {
  return this.value;
}
// ********** Code for DOMURLJs **************
// ********** Code for DOMWindowJs **************
$dynamic("get$length").DOMWindow = function() {
  return this.length;
}
$dynamic("addEventListener$3").DOMWindow = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("setTimeout$2").DOMWindow = function($0, $1) {
  return this.setTimeout($wrap_call$0(to$call$0($0)), $1);
};
// ********** Code for DataTransferItemJs **************
// ********** Code for DataTransferItemListJs **************
$dynamic("get$length").DataTransferItemList = function() {
  return this.length;
}
$dynamic("clear$0").DataTransferItemList = function() {
  return this.clear();
};
// ********** Code for DataViewJs **************
// ********** Code for DatabaseJs **************
// ********** Code for DatabaseSyncJs **************
// ********** Code for WorkerContextJs **************
$dynamic("addEventListener$3").WorkerContext = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("setTimeout$2").WorkerContext = function($0, $1) {
  return this.setTimeout($wrap_call$0(to$call$0($0)), $1);
};
// ********** Code for DedicatedWorkerContextJs **************
// ********** Code for DelayNodeJs **************
// ********** Code for DeviceMotionEventJs **************
// ********** Code for DeviceOrientationEventJs **************
// ********** Code for EntryJs **************
// ********** Code for DirectoryEntryJs **************
// ********** Code for EntrySyncJs **************
// ********** Code for DirectoryEntrySyncJs **************
// ********** Code for DirectoryReaderJs **************
// ********** Code for DirectoryReaderSyncJs **************
// ********** Code for DocumentJs **************
$dynamic("get$documentElement").Document = function() {
  return this.documentElement;
}
// ********** Code for DocumentFragmentJs **************
// ********** Code for DocumentTypeJs **************
// ********** Code for DynamicsCompressorNodeJs **************
// ********** Code for ElementJs **************
$dynamic("get$firstElementChild").Element = function() {
  return this.firstElementChild;
}
// ********** Code for ElementTimeControlJs **************
// ********** Code for ElementTraversalJs **************
$dynamic("get$firstElementChild").ElementTraversal = function() {
  return this.firstElementChild;
}
// ********** Code for EntityJs **************
// ********** Code for EntityReferenceJs **************
// ********** Code for EntryArrayJs **************
$dynamic("get$length").EntryArray = function() {
  return this.length;
}
// ********** Code for EntryArraySyncJs **************
$dynamic("get$length").EntryArraySync = function() {
  return this.length;
}
// ********** Code for ErrorEventJs **************
// ********** Code for EventExceptionJs **************
// ********** Code for EventSourceJs **************
$dynamic("addEventListener$3").EventSource = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for EventTargetJs **************
$dynamic("addEventListener$3").EventTarget = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for FileJs **************
// ********** Code for FileEntryJs **************
// ********** Code for FileEntrySyncJs **************
// ********** Code for FileErrorJs **************
// ********** Code for FileExceptionJs **************
// ********** Code for FileListJs **************
$dynamic("get$length").FileList = function() {
  return this.length;
}
// ********** Code for FileReaderJs **************
$dynamic("addEventListener$3").FileReader = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for FileReaderSyncJs **************
// ********** Code for FileWriterJs **************
$dynamic("get$length").FileWriter = function() {
  return this.length;
}
// ********** Code for FileWriterSyncJs **************
$dynamic("get$length").FileWriterSync = function() {
  return this.length;
}
// ********** Code for Float32ArrayJs **************
var Float32ArrayJs = {};
$dynamic("get$length").Float32Array = function() {
  return this.length;
}
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float32Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Float32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").Float32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Float32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Float32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for Float64ArrayJs **************
var Float64ArrayJs = {};
$dynamic("get$length").Float64Array = function() {
  return this.length;
}
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float64Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float64Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float64Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float64Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Float64Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").Float64Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Float64Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Float64Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for GeolocationJs **************
// ********** Code for GeopositionJs **************
// ********** Code for HTMLAllCollectionJs **************
$dynamic("get$length").HTMLAllCollection = function() {
  return this.length;
}
// ********** Code for HTMLElementJs **************
$dynamic("get$children").HTMLElement = function() {
  return this.children;
}
$dynamic("set$innerHTML").HTMLElement = function(value) {
  this.innerHTML = value;
}
// ********** Code for HTMLAnchorElementJs **************
// ********** Code for HTMLAppletElementJs **************
// ********** Code for HTMLAreaElementJs **************
// ********** Code for HTMLMediaElementJs **************
// ********** Code for HTMLAudioElementJs **************
// ********** Code for HTMLBRElementJs **************
// ********** Code for HTMLBaseElementJs **************
// ********** Code for HTMLBaseFontElementJs **************
// ********** Code for HTMLBodyElementJs **************
// ********** Code for HTMLButtonElementJs **************
$dynamic("get$value").HTMLButtonElement = function() {
  return this.value;
}
// ********** Code for HTMLCanvasElementJs **************
// ********** Code for HTMLCollectionJs **************
$dynamic("get$length").HTMLCollection = function() {
  return this.length;
}
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").HTMLCollection = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").HTMLCollection = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").HTMLCollection = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").HTMLCollection = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").HTMLCollection = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").HTMLCollection = function($0) {
  return this.add($0);
};
$dynamic("filter$1").HTMLCollection = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").HTMLCollection = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for HTMLDListElementJs **************
// ********** Code for HTMLDataListElementJs **************
// ********** Code for HTMLDetailsElementJs **************
// ********** Code for HTMLDirectoryElementJs **************
// ********** Code for HTMLDivElementJs **************
// ********** Code for HTMLDocumentJs **************
$dynamic("clear$0").HTMLDocument = function() {
  return this.clear();
};
// ********** Code for HTMLEmbedElementJs **************
// ********** Code for HTMLFieldSetElementJs **************
// ********** Code for HTMLFontElementJs **************
// ********** Code for HTMLFormElementJs **************
$dynamic("get$elements").HTMLFormElement = function() {
  return this.elements;
}
$dynamic("get$length").HTMLFormElement = function() {
  return this.length;
}
// ********** Code for HTMLFrameElementJs **************
// ********** Code for HTMLFrameSetElementJs **************
// ********** Code for HTMLHRElementJs **************
// ********** Code for HTMLHeadElementJs **************
// ********** Code for HTMLHeadingElementJs **************
// ********** Code for HTMLHtmlElementJs **************
// ********** Code for HTMLIFrameElementJs **************
// ********** Code for HTMLImageElementJs **************
// ********** Code for HTMLInputElementJs **************
$dynamic("get$value").HTMLInputElement = function() {
  return this.value;
}
// ********** Code for HTMLIsIndexElementJs **************
// ********** Code for HTMLKeygenElementJs **************
// ********** Code for HTMLLIElementJs **************
$dynamic("get$value").HTMLLIElement = function() {
  return this.value;
}
// ********** Code for HTMLLabelElementJs **************
// ********** Code for HTMLLegendElementJs **************
// ********** Code for HTMLLinkElementJs **************
// ********** Code for HTMLMapElementJs **************
// ********** Code for HTMLMarqueeElementJs **************
// ********** Code for HTMLMenuElementJs **************
// ********** Code for HTMLMetaElementJs **************
// ********** Code for HTMLMeterElementJs **************
$dynamic("get$value").HTMLMeterElement = function() {
  return this.value;
}
// ********** Code for HTMLModElementJs **************
// ********** Code for HTMLOListElementJs **************
// ********** Code for HTMLObjectElementJs **************
// ********** Code for HTMLOptGroupElementJs **************
// ********** Code for HTMLOptionElementJs **************
$dynamic("get$value").HTMLOptionElement = function() {
  return this.value;
}
// ********** Code for HTMLOptionsCollectionJs **************
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
// ********** Code for HTMLOutputElementJs **************
$dynamic("get$value").HTMLOutputElement = function() {
  return this.value;
}
// ********** Code for HTMLParagraphElementJs **************
// ********** Code for HTMLParamElementJs **************
$dynamic("get$value").HTMLParamElement = function() {
  return this.value;
}
// ********** Code for HTMLPreElementJs **************
// ********** Code for HTMLProgressElementJs **************
$dynamic("get$value").HTMLProgressElement = function() {
  return this.value;
}
// ********** Code for HTMLPropertiesCollectionJs **************
$dynamic("get$length").HTMLPropertiesCollection = function() {
  return this.length;
}
// ********** Code for HTMLQuoteElementJs **************
// ********** Code for HTMLScriptElementJs **************
// ********** Code for HTMLSelectElementJs **************
$dynamic("get$length").HTMLSelectElement = function() {
  return this.length;
}
$dynamic("get$value").HTMLSelectElement = function() {
  return this.value;
}
// ********** Code for HTMLSourceElementJs **************
// ********** Code for HTMLSpanElementJs **************
// ********** Code for HTMLStyleElementJs **************
// ********** Code for HTMLTableCaptionElementJs **************
// ********** Code for HTMLTableCellElementJs **************
// ********** Code for HTMLTableColElementJs **************
// ********** Code for HTMLTableElementJs **************
// ********** Code for HTMLTableRowElementJs **************
// ********** Code for HTMLTableSectionElementJs **************
// ********** Code for HTMLTextAreaElementJs **************
$dynamic("get$value").HTMLTextAreaElement = function() {
  return this.value;
}
// ********** Code for HTMLTitleElementJs **************
// ********** Code for HTMLTrackElementJs **************
// ********** Code for HTMLUListElementJs **************
// ********** Code for HTMLUnknownElementJs **************
// ********** Code for HTMLVideoElementJs **************
// ********** Code for HashChangeEventJs **************
// ********** Code for HighPass2FilterNodeJs **************
// ********** Code for HistoryJs **************
$dynamic("get$length").History = function() {
  return this.length;
}
// ********** Code for IDBAnyJs **************
// ********** Code for IDBCursorJs **************
// ********** Code for IDBCursorWithValueJs **************
$dynamic("get$value").IDBCursorWithValue = function() {
  return this.value;
}
// ********** Code for IDBDatabaseJs **************
$dynamic("addEventListener$3").IDBDatabase = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for IDBDatabaseErrorJs **************
// ********** Code for IDBDatabaseExceptionJs **************
// ********** Code for IDBFactoryJs **************
// ********** Code for IDBIndexJs **************
// ********** Code for IDBKeyJs **************
// ********** Code for IDBKeyRangeJs **************
// ********** Code for IDBObjectStoreJs **************
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
$dynamic("clear$0").IDBObjectStore = function() {
  return this.clear();
};
// ********** Code for IDBRequestJs **************
$dynamic("addEventListener$3").IDBRequest = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for IDBTransactionJs **************
$dynamic("addEventListener$3").IDBTransaction = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for IDBVersionChangeEventJs **************
// ********** Code for IDBVersionChangeRequestJs **************
// ********** Code for ImageDataJs **************
// ********** Code for InjectedScriptHostJs **************
// ********** Code for InspectorFrontendHostJs **************
// ********** Code for Int16ArrayJs **************
var Int16ArrayJs = {};
$dynamic("get$length").Int16Array = function() {
  return this.length;
}
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int16Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").Int16Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int16Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int16Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for Int32ArrayJs **************
var Int32ArrayJs = {};
$dynamic("get$length").Int32Array = function() {
  return this.length;
}
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").Int32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for Int8ArrayJs **************
var Int8ArrayJs = {};
$dynamic("get$length").Int8Array = function() {
  return this.length;
}
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Int8Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").Int8Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int8Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int8Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for JavaScriptAudioNodeJs **************
// ********** Code for JavaScriptCallFrameJs **************
// ********** Code for KeyboardEventJs **************
// ********** Code for LocationJs **************
// ********** Code for LowPass2FilterNodeJs **************
// ********** Code for MediaControllerJs **************
$dynamic("addEventListener$3").MediaController = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for MediaElementAudioSourceNodeJs **************
// ********** Code for MediaErrorJs **************
// ********** Code for MediaListJs **************
$dynamic("get$length").MediaList = function() {
  return this.length;
}
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").MediaList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").MediaList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").MediaList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").MediaList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").MediaList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").MediaList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").MediaList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for MediaQueryListJs **************
// ********** Code for MediaQueryListListenerJs **************
// ********** Code for MemoryInfoJs **************
// ********** Code for MessageChannelJs **************
// ********** Code for MessageEventJs **************
// ********** Code for MessagePortJs **************
$dynamic("addEventListener$3").MessagePort = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for MetadataJs **************
// ********** Code for MouseEventJs **************
// ********** Code for MutationCallbackJs **************
// ********** Code for MutationEventJs **************
// ********** Code for MutationRecordJs **************
// ********** Code for NamedNodeMapJs **************
$dynamic("get$length").NamedNodeMap = function() {
  return this.length;
}
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NamedNodeMap = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").NamedNodeMap = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").NamedNodeMap = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NamedNodeMap = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").NamedNodeMap = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").NamedNodeMap = function($0) {
  return this.add($0);
};
$dynamic("filter$1").NamedNodeMap = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").NamedNodeMap = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for NavigatorJs **************
// ********** Code for NodeFilterJs **************
// ********** Code for NodeIteratorJs **************
// ********** Code for NodeListJs **************
$dynamic("get$length").NodeList = function() {
  return this.length;
}
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("$setindex").NodeList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NodeList = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").NodeList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").NodeList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NodeList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").NodeList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").NodeList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").NodeList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").NodeList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for NodeSelectorJs **************
// ********** Code for NotationJs **************
// ********** Code for NotificationJs **************
$dynamic("addEventListener$3").Notification = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for NotificationCenterJs **************
// ********** Code for OESStandardDerivativesJs **************
// ********** Code for OESTextureFloatJs **************
// ********** Code for OESVertexArrayObjectJs **************
// ********** Code for OfflineAudioCompletionEventJs **************
// ********** Code for OperationNotAllowedExceptionJs **************
// ********** Code for OverflowEventJs **************
// ********** Code for PageTransitionEventJs **************
// ********** Code for PerformanceJs **************
// ********** Code for PerformanceNavigationJs **************
// ********** Code for PerformanceTimingJs **************
// ********** Code for PointerLockJs **************
// ********** Code for PopStateEventJs **************
// ********** Code for PositionErrorJs **************
// ********** Code for ProcessingInstructionJs **************
// ********** Code for ProgressEventJs **************
// ********** Code for RGBColorJs **************
// ********** Code for RangeJs **************
// ********** Code for RangeExceptionJs **************
// ********** Code for RealtimeAnalyserNodeJs **************
// ********** Code for RectJs **************
// ********** Code for SQLErrorJs **************
// ********** Code for SQLExceptionJs **************
// ********** Code for SQLResultSetJs **************
// ********** Code for SQLResultSetRowListJs **************
$dynamic("get$length").SQLResultSetRowList = function() {
  return this.length;
}
// ********** Code for SQLTransactionJs **************
// ********** Code for SQLTransactionSyncJs **************
// ********** Code for SVGElementJs **************
// ********** Code for SVGAElementJs **************
// ********** Code for SVGAltGlyphDefElementJs **************
// ********** Code for SVGTextContentElementJs **************
// ********** Code for SVGTextPositioningElementJs **************
// ********** Code for SVGAltGlyphElementJs **************
// ********** Code for SVGAltGlyphItemElementJs **************
// ********** Code for SVGAngleJs **************
$dynamic("get$value").SVGAngle = function() {
  return this.value;
}
// ********** Code for SVGAnimationElementJs **************
// ********** Code for SVGAnimateColorElementJs **************
// ********** Code for SVGAnimateElementJs **************
// ********** Code for SVGAnimateMotionElementJs **************
// ********** Code for SVGAnimateTransformElementJs **************
// ********** Code for SVGAnimatedAngleJs **************
// ********** Code for SVGAnimatedBooleanJs **************
// ********** Code for SVGAnimatedEnumerationJs **************
// ********** Code for SVGAnimatedIntegerJs **************
// ********** Code for SVGAnimatedLengthJs **************
// ********** Code for SVGAnimatedLengthListJs **************
// ********** Code for SVGAnimatedNumberJs **************
// ********** Code for SVGAnimatedNumberListJs **************
// ********** Code for SVGAnimatedPreserveAspectRatioJs **************
// ********** Code for SVGAnimatedRectJs **************
// ********** Code for SVGAnimatedStringJs **************
// ********** Code for SVGAnimatedTransformListJs **************
// ********** Code for SVGCircleElementJs **************
// ********** Code for SVGClipPathElementJs **************
// ********** Code for SVGColorJs **************
// ********** Code for SVGComponentTransferFunctionElementJs **************
// ********** Code for SVGCursorElementJs **************
// ********** Code for SVGDefsElementJs **************
// ********** Code for SVGDescElementJs **************
// ********** Code for SVGDocumentJs **************
$dynamic("get$rootElement").SVGDocument = function() {
  return this.rootElement;
}
// ********** Code for SVGElementInstanceJs **************
$dynamic("get$childNodes").SVGElementInstance = function() {
  return this.childNodes;
}
$dynamic("get$firstChild").SVGElementInstance = function() {
  return this.firstChild;
}
$dynamic("get$parentNode").SVGElementInstance = function() {
  return this.parentNode;
}
$dynamic("addEventListener$3").SVGElementInstance = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for SVGElementInstanceListJs **************
$dynamic("get$length").SVGElementInstanceList = function() {
  return this.length;
}
// ********** Code for SVGEllipseElementJs **************
// ********** Code for SVGExceptionJs **************
// ********** Code for SVGExternalResourcesRequiredJs **************
// ********** Code for SVGFEBlendElementJs **************
// ********** Code for SVGFEColorMatrixElementJs **************
// ********** Code for SVGFEComponentTransferElementJs **************
// ********** Code for SVGFECompositeElementJs **************
// ********** Code for SVGFEConvolveMatrixElementJs **************
// ********** Code for SVGFEDiffuseLightingElementJs **************
// ********** Code for SVGFEDisplacementMapElementJs **************
// ********** Code for SVGFEDistantLightElementJs **************
// ********** Code for SVGFEDropShadowElementJs **************
// ********** Code for SVGFEFloodElementJs **************
// ********** Code for SVGFEFuncAElementJs **************
// ********** Code for SVGFEFuncBElementJs **************
// ********** Code for SVGFEFuncGElementJs **************
// ********** Code for SVGFEFuncRElementJs **************
// ********** Code for SVGFEGaussianBlurElementJs **************
// ********** Code for SVGFEImageElementJs **************
// ********** Code for SVGFEMergeElementJs **************
// ********** Code for SVGFEMergeNodeElementJs **************
// ********** Code for SVGFEMorphologyElementJs **************
// ********** Code for SVGFEOffsetElementJs **************
// ********** Code for SVGFEPointLightElementJs **************
// ********** Code for SVGFESpecularLightingElementJs **************
// ********** Code for SVGFESpotLightElementJs **************
// ********** Code for SVGFETileElementJs **************
// ********** Code for SVGFETurbulenceElementJs **************
// ********** Code for SVGFilterElementJs **************
// ********** Code for SVGStylableJs **************
// ********** Code for SVGFilterPrimitiveStandardAttributesJs **************
// ********** Code for SVGFitToViewBoxJs **************
// ********** Code for SVGFontElementJs **************
// ********** Code for SVGFontFaceElementJs **************
// ********** Code for SVGFontFaceFormatElementJs **************
// ********** Code for SVGFontFaceNameElementJs **************
// ********** Code for SVGFontFaceSrcElementJs **************
// ********** Code for SVGFontFaceUriElementJs **************
// ********** Code for SVGForeignObjectElementJs **************
// ********** Code for SVGGElementJs **************
// ********** Code for SVGGlyphElementJs **************
// ********** Code for SVGGlyphRefElementJs **************
// ********** Code for SVGGradientElementJs **************
// ********** Code for SVGHKernElementJs **************
// ********** Code for SVGImageElementJs **************
// ********** Code for SVGLangSpaceJs **************
// ********** Code for SVGLengthJs **************
$dynamic("get$value").SVGLength = function() {
  return this.value;
}
// ********** Code for SVGLengthListJs **************
$dynamic("clear$0").SVGLengthList = function() {
  return this.clear();
};
// ********** Code for SVGLineElementJs **************
// ********** Code for SVGLinearGradientElementJs **************
// ********** Code for SVGLocatableJs **************
// ********** Code for SVGMPathElementJs **************
// ********** Code for SVGMarkerElementJs **************
// ********** Code for SVGMaskElementJs **************
// ********** Code for SVGMatrixJs **************
// ********** Code for SVGMetadataElementJs **************
// ********** Code for SVGMissingGlyphElementJs **************
// ********** Code for SVGNumberJs **************
$dynamic("get$value").SVGNumber = function() {
  return this.value;
}
// ********** Code for SVGNumberListJs **************
$dynamic("clear$0").SVGNumberList = function() {
  return this.clear();
};
// ********** Code for SVGPaintJs **************
// ********** Code for SVGPathElementJs **************
// ********** Code for SVGPathSegJs **************
// ********** Code for SVGPathSegArcAbsJs **************
// ********** Code for SVGPathSegArcRelJs **************
// ********** Code for SVGPathSegClosePathJs **************
// ********** Code for SVGPathSegCurvetoCubicAbsJs **************
// ********** Code for SVGPathSegCurvetoCubicRelJs **************
// ********** Code for SVGPathSegCurvetoCubicSmoothAbsJs **************
// ********** Code for SVGPathSegCurvetoCubicSmoothRelJs **************
// ********** Code for SVGPathSegCurvetoQuadraticAbsJs **************
// ********** Code for SVGPathSegCurvetoQuadraticRelJs **************
// ********** Code for SVGPathSegCurvetoQuadraticSmoothAbsJs **************
// ********** Code for SVGPathSegCurvetoQuadraticSmoothRelJs **************
// ********** Code for SVGPathSegLinetoAbsJs **************
// ********** Code for SVGPathSegLinetoHorizontalAbsJs **************
// ********** Code for SVGPathSegLinetoHorizontalRelJs **************
// ********** Code for SVGPathSegLinetoRelJs **************
// ********** Code for SVGPathSegLinetoVerticalAbsJs **************
// ********** Code for SVGPathSegLinetoVerticalRelJs **************
// ********** Code for SVGPathSegListJs **************
$dynamic("clear$0").SVGPathSegList = function() {
  return this.clear();
};
// ********** Code for SVGPathSegMovetoAbsJs **************
// ********** Code for SVGPathSegMovetoRelJs **************
// ********** Code for SVGPatternElementJs **************
// ********** Code for SVGPointJs **************
// ********** Code for SVGPointListJs **************
$dynamic("clear$0").SVGPointList = function() {
  return this.clear();
};
// ********** Code for SVGPolygonElementJs **************
// ********** Code for SVGPolylineElementJs **************
// ********** Code for SVGPreserveAspectRatioJs **************
// ********** Code for SVGRadialGradientElementJs **************
// ********** Code for SVGRectJs **************
// ********** Code for SVGRectElementJs **************
// ********** Code for SVGRenderingIntentJs **************
// ********** Code for SVGSVGElementJs **************
// ********** Code for SVGScriptElementJs **************
// ********** Code for SVGSetElementJs **************
// ********** Code for SVGStopElementJs **************
// ********** Code for SVGStringListJs **************
$dynamic("clear$0").SVGStringList = function() {
  return this.clear();
};
// ********** Code for SVGStyleElementJs **************
// ********** Code for SVGSwitchElementJs **************
// ********** Code for SVGSymbolElementJs **************
// ********** Code for SVGTRefElementJs **************
// ********** Code for SVGTSpanElementJs **************
// ********** Code for SVGTestsJs **************
// ********** Code for SVGTextElementJs **************
// ********** Code for SVGTextPathElementJs **************
// ********** Code for SVGTitleElementJs **************
// ********** Code for SVGTransformJs **************
// ********** Code for SVGTransformListJs **************
$dynamic("clear$0").SVGTransformList = function() {
  return this.clear();
};
// ********** Code for SVGTransformableJs **************
// ********** Code for SVGURIReferenceJs **************
// ********** Code for SVGUnitTypesJs **************
// ********** Code for SVGUseElementJs **************
// ********** Code for SVGVKernElementJs **************
// ********** Code for SVGViewElementJs **************
// ********** Code for SVGZoomAndPanJs **************
// ********** Code for SVGViewSpecJs **************
// ********** Code for SVGZoomEventJs **************
// ********** Code for ScreenJs **************
// ********** Code for ScriptProfileJs **************
// ********** Code for ScriptProfileNodeJs **************
$dynamic("get$children").ScriptProfileNode = function() {
  return this.children;
}
// ********** Code for SharedWorkerJs **************
// ********** Code for SharedWorkerContextJs **************
// ********** Code for SpeechInputEventJs **************
// ********** Code for SpeechInputResultJs **************
// ********** Code for SpeechInputResultListJs **************
$dynamic("get$length").SpeechInputResultList = function() {
  return this.length;
}
// ********** Code for StorageJs **************
$dynamic("get$length").Storage = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").Storage = function() {
      if (this === window.localStorage)
        return window._dartLocalStorageLocalStorage;
      else if (this === window.sessionStorage)
        return window._dartSessionStorageLocalStorage;
      else
        throw new UnsupportedOperationException('Cannot dartObjectLocalStorage for unknown Storage object.');
}
$dynamic("set$dartObjectLocalStorage").Storage = function(value) {
      if (this === window.localStorage)
        window._dartLocalStorageLocalStorage = value;
      else if (this === window.sessionStorage)
        window._dartSessionStorageLocalStorage = value;
      else
        throw new UnsupportedOperationException('Cannot dartObjectLocalStorage for unknown Storage object.');
}
$dynamic("clear$0").Storage = function() {
  return this.clear();
};
// ********** Code for StorageEventJs **************
// ********** Code for StorageInfoJs **************
// ********** Code for StyleMediaJs **************
// ********** Code for StyleSheetListJs **************
$dynamic("get$length").StyleSheetList = function() {
  return this.length;
}
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").StyleSheetList = function() {
  return new _FixedSizeListIterator_dom_StyleSheet(this);
}
$dynamic("add").StyleSheetList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").StyleSheetList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").StyleSheetList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").StyleSheetList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").StyleSheetList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").StyleSheetList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").StyleSheetList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for TextEventJs **************
// ********** Code for TextMetricsJs **************
// ********** Code for TextTrackJs **************
$dynamic("addEventListener$3").TextTrack = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for TextTrackCueJs **************
$dynamic("addEventListener$3").TextTrackCue = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for TextTrackCueListJs **************
$dynamic("get$length").TextTrackCueList = function() {
  return this.length;
}
// ********** Code for TextTrackListJs **************
$dynamic("get$length").TextTrackList = function() {
  return this.length;
}
$dynamic("addEventListener$3").TextTrackList = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for TimeRangesJs **************
$dynamic("get$length").TimeRanges = function() {
  return this.length;
}
// ********** Code for TouchJs **************
// ********** Code for TouchEventJs **************
// ********** Code for TouchListJs **************
$dynamic("get$length").TouchList = function() {
  return this.length;
}
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").TouchList = function() {
  return new _FixedSizeListIterator_dom_Touch(this);
}
$dynamic("add").TouchList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").TouchList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").TouchList = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").TouchList = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").TouchList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").TouchList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").TouchList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for TrackEventJs **************
// ********** Code for TreeWalkerJs **************
$dynamic("get$firstChild").TreeWalker = function() {
  return this.firstChild.bind(this);
}
$dynamic("get$parentNode").TreeWalker = function() {
  return this.parentNode.bind(this);
}
// ********** Code for Uint16ArrayJs **************
var Uint16ArrayJs = {};
$dynamic("get$length").Uint16Array = function() {
  return this.length;
}
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint16Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint16Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").Uint16Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint16Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint16Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for Uint32ArrayJs **************
var Uint32ArrayJs = {};
$dynamic("get$length").Uint32Array = function() {
  return this.length;
}
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint32Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint32Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").Uint32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for Uint8ArrayJs **************
var Uint8ArrayJs = {};
$dynamic("get$length").Uint8Array = function() {
  return this.length;
}
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint8Array = function(f) {
  return _Collections.forEach(this, f);
}
$dynamic("filter").Uint8Array = function(f) {
  return _Collections.filter(this, [], f);
}
$dynamic("add$1").Uint8Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint8Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint8Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for ValidityStateJs **************
// ********** Code for WaveShaperNodeJs **************
// ********** Code for WebGLActiveInfoJs **************
// ********** Code for WebGLBufferJs **************
// ********** Code for WebGLCompressedTexturesJs **************
// ********** Code for WebGLContextAttributesJs **************
// ********** Code for WebGLContextEventJs **************
// ********** Code for WebGLDebugRendererInfoJs **************
// ********** Code for WebGLDebugShadersJs **************
// ********** Code for WebGLFramebufferJs **************
// ********** Code for WebGLLoseContextJs **************
// ********** Code for WebGLProgramJs **************
// ********** Code for WebGLRenderbufferJs **************
// ********** Code for WebGLRenderingContextJs **************
// ********** Code for WebGLShaderJs **************
// ********** Code for WebGLTextureJs **************
// ********** Code for WebGLUniformLocationJs **************
// ********** Code for WebGLVertexArrayObjectOESJs **************
// ********** Code for WebKitAnimationJs **************
// ********** Code for WebKitAnimationEventJs **************
// ********** Code for WebKitAnimationListJs **************
$dynamic("get$length").WebKitAnimationList = function() {
  return this.length;
}
// ********** Code for WebKitBlobBuilderJs **************
// ********** Code for WebKitCSSFilterValueJs **************
// ********** Code for WebKitCSSKeyframeRuleJs **************
// ********** Code for WebKitCSSKeyframesRuleJs **************
// ********** Code for WebKitCSSMatrixJs **************
// ********** Code for WebKitCSSTransformValueJs **************
// ********** Code for WebKitMutationObserverJs **************
// ********** Code for WebKitNamedFlowJs **************
// ********** Code for WebKitPointJs **************
// ********** Code for WebKitTransitionEventJs **************
// ********** Code for WebSocketJs **************
$dynamic("addEventListener$3").WebSocket = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for WheelEventJs **************
// ********** Code for WorkerJs **************
// ********** Code for WorkerLocationJs **************
// ********** Code for WorkerNavigatorJs **************
// ********** Code for XMLHttpRequestJs **************
$dynamic("addEventListener$3").XMLHttpRequest = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for XMLHttpRequestExceptionJs **************
// ********** Code for XMLHttpRequestProgressEventJs **************
// ********** Code for XMLHttpRequestUploadJs **************
$dynamic("addEventListener$3").XMLHttpRequestUpload = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for XMLSerializerJs **************
// ********** Code for XPathEvaluatorJs **************
// ********** Code for XPathExceptionJs **************
// ********** Code for XPathExpressionJs **************
// ********** Code for XPathNSResolverJs **************
// ********** Code for XPathResultJs **************
// ********** Code for XSLTProcessorJs **************
// ********** Code for _Collections **************
function _Collections() {}
_Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    f(e);
  }
}
_Collections.filter = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next$0();
    if (f(e)) destination.add(e);
  }
  return destination;
}
// ********** Code for _AudioContextFactoryProvider **************
function _AudioContextFactoryProvider() {}
// ********** Code for _FileReaderFactoryProvider **************
function _FileReaderFactoryProvider() {}
// ********** Code for _TypedArrayFactoryProvider **************
function _TypedArrayFactoryProvider() {}
// ********** Code for _WebKitCSSMatrixFactoryProvider **************
function _WebKitCSSMatrixFactoryProvider() {}
// ********** Code for _WebKitPointFactoryProvider **************
function _WebKitPointFactoryProvider() {}
// ********** Code for _WebSocketFactoryProvider **************
function _WebSocketFactoryProvider() {}
// ********** Code for _XMLHttpRequestFactoryProvider **************
function _XMLHttpRequestFactoryProvider() {}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._dom_array.get$length() > this._dom_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0001);
  }
  return this._dom_array.$index(this._dom_pos++);
}
_VariableSizeListIterator.prototype.next$0 = _VariableSizeListIterator.prototype.next;
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._dom_length > this._dom_pos;
}
// ********** Code for _VariableSizeListIterator_dom_Node **************
$inherits(_VariableSizeListIterator_dom_Node, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_Node(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_Node **************
$inherits(_FixedSizeListIterator_dom_Node, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_Node(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dom_Node.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dart_core_String **************
$inherits(_VariableSizeListIterator_dart_core_String, _VariableSizeListIterator);
function _VariableSizeListIterator_dart_core_String(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dart_core_String **************
$inherits(_FixedSizeListIterator_dart_core_String, _FixedSizeListIterator);
function _FixedSizeListIterator_dart_core_String(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dart_core_String.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dom_StyleSheet **************
$inherits(_VariableSizeListIterator_dom_StyleSheet, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_StyleSheet(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_StyleSheet **************
$inherits(_FixedSizeListIterator_dom_StyleSheet, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_StyleSheet(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dom_StyleSheet.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dom_Touch **************
$inherits(_VariableSizeListIterator_dom_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_Touch(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_Touch **************
$inherits(_FixedSizeListIterator_dom_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_Touch(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dom_Touch.call(this, array);
}
// ********** Code for _VariableSizeListIterator_int **************
$inherits(_VariableSizeListIterator_int, _VariableSizeListIterator);
function _VariableSizeListIterator_int(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_int **************
$inherits(_FixedSizeListIterator_int, _FixedSizeListIterator);
function _FixedSizeListIterator_int(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_int.call(this, array);
}
// ********** Code for _VariableSizeListIterator_num **************
$inherits(_VariableSizeListIterator_num, _VariableSizeListIterator);
function _VariableSizeListIterator_num(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_num **************
$inherits(_FixedSizeListIterator_num, _FixedSizeListIterator);
function _FixedSizeListIterator_num(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_num.call(this, array);
}
// ********** Code for _Lists **************
function _Lists() {}
// ********** Code for top level **************
function get$window() {
  return window;
}
function get$document() {
  return window.document;
}
//  ********** Library htmlimpl **************
// ********** Code for DOMWrapperBase **************
DOMWrapperBase._wrap$ctor = function(_ptr) {
  this._ptr = _ptr;
  this._ptr.set$dartObjectLocalStorage(this);
}
DOMWrapperBase._wrap$ctor.prototype = DOMWrapperBase.prototype;
function DOMWrapperBase() {}
DOMWrapperBase.prototype.get$_ptr = function() { return this._ptr; };
// ********** Code for EventTargetWrappingImplementation **************
$inherits(EventTargetWrappingImplementation, DOMWrapperBase);
EventTargetWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventTargetWrappingImplementation._wrap$ctor.prototype = EventTargetWrappingImplementation.prototype;
function EventTargetWrappingImplementation() {}
// ********** Code for NodeWrappingImplementation **************
$inherits(NodeWrappingImplementation, EventTargetWrappingImplementation);
NodeWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
NodeWrappingImplementation._wrap$ctor.prototype = NodeWrappingImplementation.prototype;
function NodeWrappingImplementation() {}
NodeWrappingImplementation.prototype.get$nodes = function() {
  if (null == this._nodes) {
    this._nodes = new _ChildrenNodeList._wrap$ctor(this._ptr);
  }
  return this._nodes;
}
NodeWrappingImplementation.prototype.replaceWith = function(otherNode) {
  try {
    this._ptr.get$parentNode().replaceChild(LevelDom.unwrap(otherNode), this._ptr);
  } catch (e) {
    e = _toDartException(e);
  }
  return this;
}
// ********** Code for ElementWrappingImplementation **************
$inherits(ElementWrappingImplementation, NodeWrappingImplementation);
ElementWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ElementWrappingImplementation._wrap$ctor.prototype = ElementWrappingImplementation.prototype;
function ElementWrappingImplementation() {}
ElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ElementWrappingImplementation.ElementWrappingImplementation$tag$factory = function(tag) {
  return LevelDom.wrapElement(get$document().createElement(tag));
}
ElementWrappingImplementation.prototype.get$elements = function() {
  if (this._elements == null) {
    this._elements = new _ChildrenElementList._wrap$ctor(this._ptr);
  }
  return this._elements;
}
ElementWrappingImplementation.prototype.get$firstElementChild = function() {
  return LevelDom.wrapElement(this._ptr.get$firstElementChild());
}
ElementWrappingImplementation.prototype.set$innerHTML = function(value) {
  this._ptr.set$innerHTML(value);
}
ElementWrappingImplementation.prototype.query = function(selectors) {
  return LevelDom.wrapElement(this._ptr.querySelector(selectors));
}
ElementWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new ElementEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
// ********** Code for AnchorElementWrappingImplementation **************
$inherits(AnchorElementWrappingImplementation, ElementWrappingImplementation);
AnchorElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AnchorElementWrappingImplementation._wrap$ctor.prototype = AnchorElementWrappingImplementation.prototype;
function AnchorElementWrappingImplementation() {}
AnchorElementWrappingImplementation.prototype.is$html_Element = function(){return true};
AnchorElementWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for AreaElementWrappingImplementation **************
$inherits(AreaElementWrappingImplementation, ElementWrappingImplementation);
AreaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AreaElementWrappingImplementation._wrap$ctor.prototype = AreaElementWrappingImplementation.prototype;
function AreaElementWrappingImplementation() {}
AreaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MediaElementWrappingImplementation **************
$inherits(MediaElementWrappingImplementation, ElementWrappingImplementation);
MediaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MediaElementWrappingImplementation._wrap$ctor.prototype = MediaElementWrappingImplementation.prototype;
function MediaElementWrappingImplementation() {}
MediaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for AudioElementWrappingImplementation **************
$inherits(AudioElementWrappingImplementation, MediaElementWrappingImplementation);
AudioElementWrappingImplementation._wrap$ctor = function(ptr) {
  MediaElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioElementWrappingImplementation._wrap$ctor.prototype = AudioElementWrappingImplementation.prototype;
function AudioElementWrappingImplementation() {}
AudioElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for EventWrappingImplementation **************
$inherits(EventWrappingImplementation, DOMWrapperBase);
EventWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventWrappingImplementation._wrap$ctor.prototype = EventWrappingImplementation.prototype;
function EventWrappingImplementation() {}
// ********** Code for AudioProcessingEventWrappingImplementation **************
$inherits(AudioProcessingEventWrappingImplementation, EventWrappingImplementation);
AudioProcessingEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioProcessingEventWrappingImplementation._wrap$ctor.prototype = AudioProcessingEventWrappingImplementation.prototype;
function AudioProcessingEventWrappingImplementation() {}
// ********** Code for BRElementWrappingImplementation **************
$inherits(BRElementWrappingImplementation, ElementWrappingImplementation);
BRElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BRElementWrappingImplementation._wrap$ctor.prototype = BRElementWrappingImplementation.prototype;
function BRElementWrappingImplementation() {}
BRElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for BaseElementWrappingImplementation **************
$inherits(BaseElementWrappingImplementation, ElementWrappingImplementation);
BaseElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BaseElementWrappingImplementation._wrap$ctor.prototype = BaseElementWrappingImplementation.prototype;
function BaseElementWrappingImplementation() {}
BaseElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ButtonElementWrappingImplementation **************
$inherits(ButtonElementWrappingImplementation, ElementWrappingImplementation);
ButtonElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ButtonElementWrappingImplementation._wrap$ctor.prototype = ButtonElementWrappingImplementation.prototype;
function ButtonElementWrappingImplementation() {}
ButtonElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ButtonElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for CharacterDataWrappingImplementation **************
$inherits(CharacterDataWrappingImplementation, NodeWrappingImplementation);
CharacterDataWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
CharacterDataWrappingImplementation._wrap$ctor.prototype = CharacterDataWrappingImplementation.prototype;
function CharacterDataWrappingImplementation() {}
CharacterDataWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for TextWrappingImplementation **************
$inherits(TextWrappingImplementation, CharacterDataWrappingImplementation);
TextWrappingImplementation._wrap$ctor = function(ptr) {
  CharacterDataWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextWrappingImplementation._wrap$ctor.prototype = TextWrappingImplementation.prototype;
function TextWrappingImplementation() {}
// ********** Code for CDATASectionWrappingImplementation **************
$inherits(CDATASectionWrappingImplementation, TextWrappingImplementation);
CDATASectionWrappingImplementation._wrap$ctor = function(ptr) {
  TextWrappingImplementation._wrap$ctor.call(this, ptr);
}
CDATASectionWrappingImplementation._wrap$ctor.prototype = CDATASectionWrappingImplementation.prototype;
function CDATASectionWrappingImplementation() {}
// ********** Code for CanvasElementWrappingImplementation **************
$inherits(CanvasElementWrappingImplementation, ElementWrappingImplementation);
CanvasElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
CanvasElementWrappingImplementation._wrap$ctor.prototype = CanvasElementWrappingImplementation.prototype;
function CanvasElementWrappingImplementation() {}
CanvasElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for CommentWrappingImplementation **************
$inherits(CommentWrappingImplementation, CharacterDataWrappingImplementation);
CommentWrappingImplementation._wrap$ctor = function(ptr) {
  CharacterDataWrappingImplementation._wrap$ctor.call(this, ptr);
}
CommentWrappingImplementation._wrap$ctor.prototype = CommentWrappingImplementation.prototype;
function CommentWrappingImplementation() {}
// ********** Code for DListElementWrappingImplementation **************
$inherits(DListElementWrappingImplementation, ElementWrappingImplementation);
DListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DListElementWrappingImplementation._wrap$ctor.prototype = DListElementWrappingImplementation.prototype;
function DListElementWrappingImplementation() {}
DListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for DataListElementWrappingImplementation **************
$inherits(DataListElementWrappingImplementation, ElementWrappingImplementation);
DataListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DataListElementWrappingImplementation._wrap$ctor.prototype = DataListElementWrappingImplementation.prototype;
function DataListElementWrappingImplementation() {}
DataListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for DetailsElementWrappingImplementation **************
$inherits(DetailsElementWrappingImplementation, ElementWrappingImplementation);
DetailsElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DetailsElementWrappingImplementation._wrap$ctor.prototype = DetailsElementWrappingImplementation.prototype;
function DetailsElementWrappingImplementation() {}
DetailsElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for DivElementWrappingImplementation **************
$inherits(DivElementWrappingImplementation, ElementWrappingImplementation);
DivElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DivElementWrappingImplementation._wrap$ctor.prototype = DivElementWrappingImplementation.prototype;
function DivElementWrappingImplementation() {}
DivElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for EmbedElementWrappingImplementation **************
$inherits(EmbedElementWrappingImplementation, ElementWrappingImplementation);
EmbedElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
EmbedElementWrappingImplementation._wrap$ctor.prototype = EmbedElementWrappingImplementation.prototype;
function EmbedElementWrappingImplementation() {}
EmbedElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for EntityReferenceWrappingImplementation **************
$inherits(EntityReferenceWrappingImplementation, NodeWrappingImplementation);
EntityReferenceWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
EntityReferenceWrappingImplementation._wrap$ctor.prototype = EntityReferenceWrappingImplementation.prototype;
function EntityReferenceWrappingImplementation() {}
// ********** Code for EntityWrappingImplementation **************
$inherits(EntityWrappingImplementation, NodeWrappingImplementation);
EntityWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
EntityWrappingImplementation._wrap$ctor.prototype = EntityWrappingImplementation.prototype;
function EntityWrappingImplementation() {}
// ********** Code for FieldSetElementWrappingImplementation **************
$inherits(FieldSetElementWrappingImplementation, ElementWrappingImplementation);
FieldSetElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FieldSetElementWrappingImplementation._wrap$ctor.prototype = FieldSetElementWrappingImplementation.prototype;
function FieldSetElementWrappingImplementation() {}
FieldSetElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for FontElementWrappingImplementation **************
$inherits(FontElementWrappingImplementation, ElementWrappingImplementation);
FontElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FontElementWrappingImplementation._wrap$ctor.prototype = FontElementWrappingImplementation.prototype;
function FontElementWrappingImplementation() {}
FontElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for FormElementWrappingImplementation **************
$inherits(FormElementWrappingImplementation, ElementWrappingImplementation);
FormElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FormElementWrappingImplementation._wrap$ctor.prototype = FormElementWrappingImplementation.prototype;
function FormElementWrappingImplementation() {}
FormElementWrappingImplementation.prototype.is$html_Element = function(){return true};
FormElementWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for HRElementWrappingImplementation **************
$inherits(HRElementWrappingImplementation, ElementWrappingImplementation);
HRElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HRElementWrappingImplementation._wrap$ctor.prototype = HRElementWrappingImplementation.prototype;
function HRElementWrappingImplementation() {}
HRElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for HeadElementWrappingImplementation **************
$inherits(HeadElementWrappingImplementation, ElementWrappingImplementation);
HeadElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HeadElementWrappingImplementation._wrap$ctor.prototype = HeadElementWrappingImplementation.prototype;
function HeadElementWrappingImplementation() {}
HeadElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for HeadingElementWrappingImplementation **************
$inherits(HeadingElementWrappingImplementation, ElementWrappingImplementation);
HeadingElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HeadingElementWrappingImplementation._wrap$ctor.prototype = HeadingElementWrappingImplementation.prototype;
function HeadingElementWrappingImplementation() {}
HeadingElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for IDBVersionChangeEventWrappingImplementation **************
$inherits(IDBVersionChangeEventWrappingImplementation, EventWrappingImplementation);
IDBVersionChangeEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
IDBVersionChangeEventWrappingImplementation._wrap$ctor.prototype = IDBVersionChangeEventWrappingImplementation.prototype;
function IDBVersionChangeEventWrappingImplementation() {}
// ********** Code for IFrameElementWrappingImplementation **************
$inherits(IFrameElementWrappingImplementation, ElementWrappingImplementation);
IFrameElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
IFrameElementWrappingImplementation._wrap$ctor.prototype = IFrameElementWrappingImplementation.prototype;
function IFrameElementWrappingImplementation() {}
IFrameElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ImageElementWrappingImplementation **************
$inherits(ImageElementWrappingImplementation, ElementWrappingImplementation);
ImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ImageElementWrappingImplementation._wrap$ctor.prototype = ImageElementWrappingImplementation.prototype;
function ImageElementWrappingImplementation() {}
ImageElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for InputElementWrappingImplementation **************
$inherits(InputElementWrappingImplementation, ElementWrappingImplementation);
InputElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
InputElementWrappingImplementation._wrap$ctor.prototype = InputElementWrappingImplementation.prototype;
function InputElementWrappingImplementation() {}
InputElementWrappingImplementation.prototype.is$html_Element = function(){return true};
InputElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for KeygenElementWrappingImplementation **************
$inherits(KeygenElementWrappingImplementation, ElementWrappingImplementation);
KeygenElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
KeygenElementWrappingImplementation._wrap$ctor.prototype = KeygenElementWrappingImplementation.prototype;
function KeygenElementWrappingImplementation() {}
KeygenElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for LIElementWrappingImplementation **************
$inherits(LIElementWrappingImplementation, ElementWrappingImplementation);
LIElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LIElementWrappingImplementation._wrap$ctor.prototype = LIElementWrappingImplementation.prototype;
function LIElementWrappingImplementation() {}
LIElementWrappingImplementation.prototype.is$html_Element = function(){return true};
LIElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for LabelElementWrappingImplementation **************
$inherits(LabelElementWrappingImplementation, ElementWrappingImplementation);
LabelElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LabelElementWrappingImplementation._wrap$ctor.prototype = LabelElementWrappingImplementation.prototype;
function LabelElementWrappingImplementation() {}
LabelElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for LegendElementWrappingImplementation **************
$inherits(LegendElementWrappingImplementation, ElementWrappingImplementation);
LegendElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LegendElementWrappingImplementation._wrap$ctor.prototype = LegendElementWrappingImplementation.prototype;
function LegendElementWrappingImplementation() {}
LegendElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for LinkElementWrappingImplementation **************
$inherits(LinkElementWrappingImplementation, ElementWrappingImplementation);
LinkElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LinkElementWrappingImplementation._wrap$ctor.prototype = LinkElementWrappingImplementation.prototype;
function LinkElementWrappingImplementation() {}
LinkElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MapElementWrappingImplementation **************
$inherits(MapElementWrappingImplementation, ElementWrappingImplementation);
MapElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MapElementWrappingImplementation._wrap$ctor.prototype = MapElementWrappingImplementation.prototype;
function MapElementWrappingImplementation() {}
MapElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MarqueeElementWrappingImplementation **************
$inherits(MarqueeElementWrappingImplementation, ElementWrappingImplementation);
MarqueeElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MarqueeElementWrappingImplementation._wrap$ctor.prototype = MarqueeElementWrappingImplementation.prototype;
function MarqueeElementWrappingImplementation() {}
MarqueeElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MenuElementWrappingImplementation **************
$inherits(MenuElementWrappingImplementation, ElementWrappingImplementation);
MenuElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MenuElementWrappingImplementation._wrap$ctor.prototype = MenuElementWrappingImplementation.prototype;
function MenuElementWrappingImplementation() {}
MenuElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MetaElementWrappingImplementation **************
$inherits(MetaElementWrappingImplementation, ElementWrappingImplementation);
MetaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MetaElementWrappingImplementation._wrap$ctor.prototype = MetaElementWrappingImplementation.prototype;
function MetaElementWrappingImplementation() {}
MetaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MeterElementWrappingImplementation **************
$inherits(MeterElementWrappingImplementation, ElementWrappingImplementation);
MeterElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MeterElementWrappingImplementation._wrap$ctor.prototype = MeterElementWrappingImplementation.prototype;
function MeterElementWrappingImplementation() {}
MeterElementWrappingImplementation.prototype.is$html_Element = function(){return true};
MeterElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for ModElementWrappingImplementation **************
$inherits(ModElementWrappingImplementation, ElementWrappingImplementation);
ModElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ModElementWrappingImplementation._wrap$ctor.prototype = ModElementWrappingImplementation.prototype;
function ModElementWrappingImplementation() {}
ModElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for NotationWrappingImplementation **************
$inherits(NotationWrappingImplementation, NodeWrappingImplementation);
NotationWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
NotationWrappingImplementation._wrap$ctor.prototype = NotationWrappingImplementation.prototype;
function NotationWrappingImplementation() {}
// ********** Code for OListElementWrappingImplementation **************
$inherits(OListElementWrappingImplementation, ElementWrappingImplementation);
OListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OListElementWrappingImplementation._wrap$ctor.prototype = OListElementWrappingImplementation.prototype;
function OListElementWrappingImplementation() {}
OListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for OfflineAudioCompletionEventWrappingImplementation **************
$inherits(OfflineAudioCompletionEventWrappingImplementation, EventWrappingImplementation);
OfflineAudioCompletionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
OfflineAudioCompletionEventWrappingImplementation._wrap$ctor.prototype = OfflineAudioCompletionEventWrappingImplementation.prototype;
function OfflineAudioCompletionEventWrappingImplementation() {}
// ********** Code for OptGroupElementWrappingImplementation **************
$inherits(OptGroupElementWrappingImplementation, ElementWrappingImplementation);
OptGroupElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OptGroupElementWrappingImplementation._wrap$ctor.prototype = OptGroupElementWrappingImplementation.prototype;
function OptGroupElementWrappingImplementation() {}
OptGroupElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for OptionElementWrappingImplementation **************
$inherits(OptionElementWrappingImplementation, ElementWrappingImplementation);
OptionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OptionElementWrappingImplementation._wrap$ctor.prototype = OptionElementWrappingImplementation.prototype;
function OptionElementWrappingImplementation() {}
OptionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
OptionElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for OutputElementWrappingImplementation **************
$inherits(OutputElementWrappingImplementation, ElementWrappingImplementation);
OutputElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OutputElementWrappingImplementation._wrap$ctor.prototype = OutputElementWrappingImplementation.prototype;
function OutputElementWrappingImplementation() {}
OutputElementWrappingImplementation.prototype.is$html_Element = function(){return true};
OutputElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for ParagraphElementWrappingImplementation **************
$inherits(ParagraphElementWrappingImplementation, ElementWrappingImplementation);
ParagraphElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ParagraphElementWrappingImplementation._wrap$ctor.prototype = ParagraphElementWrappingImplementation.prototype;
function ParagraphElementWrappingImplementation() {}
ParagraphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ParamElementWrappingImplementation **************
$inherits(ParamElementWrappingImplementation, ElementWrappingImplementation);
ParamElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ParamElementWrappingImplementation._wrap$ctor.prototype = ParamElementWrappingImplementation.prototype;
function ParamElementWrappingImplementation() {}
ParamElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ParamElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for PreElementWrappingImplementation **************
$inherits(PreElementWrappingImplementation, ElementWrappingImplementation);
PreElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
PreElementWrappingImplementation._wrap$ctor.prototype = PreElementWrappingImplementation.prototype;
function PreElementWrappingImplementation() {}
PreElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ProcessingInstructionWrappingImplementation **************
$inherits(ProcessingInstructionWrappingImplementation, NodeWrappingImplementation);
ProcessingInstructionWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProcessingInstructionWrappingImplementation._wrap$ctor.prototype = ProcessingInstructionWrappingImplementation.prototype;
function ProcessingInstructionWrappingImplementation() {}
// ********** Code for ProgressElementWrappingImplementation **************
$inherits(ProgressElementWrappingImplementation, ElementWrappingImplementation);
ProgressElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProgressElementWrappingImplementation._wrap$ctor.prototype = ProgressElementWrappingImplementation.prototype;
function ProgressElementWrappingImplementation() {}
ProgressElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ProgressElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for QuoteElementWrappingImplementation **************
$inherits(QuoteElementWrappingImplementation, ElementWrappingImplementation);
QuoteElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
QuoteElementWrappingImplementation._wrap$ctor.prototype = QuoteElementWrappingImplementation.prototype;
function QuoteElementWrappingImplementation() {}
QuoteElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGElementWrappingImplementation **************
$inherits(SVGElementWrappingImplementation, ElementWrappingImplementation);
SVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGElementWrappingImplementation._wrap$ctor.prototype = SVGElementWrappingImplementation.prototype;
function SVGElementWrappingImplementation() {}
SVGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGElementWrappingImplementation.prototype.get$elements = function() {
  if (this._elements == null) {
    this._elements = new FilteredElementList(this);
  }
  return this._elements;
}
SVGElementWrappingImplementation.prototype.set$elements = function(value) {
  var elements = this.get$elements();
  elements.clear$0();
  elements.addAll(value);
}
SVGElementWrappingImplementation.prototype.set$innerHTML = function(svg) {
  var container = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
  container.set$innerHTML(("<svg version=\"1.1\">" + svg + "</svg>"));
  this.set$elements(container.get$elements().get$first().get$elements());
}
// ********** Code for SVGAElementWrappingImplementation **************
$inherits(SVGAElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAElementWrappingImplementation._wrap$ctor.prototype = SVGAElementWrappingImplementation.prototype;
function SVGAElementWrappingImplementation() {}
SVGAElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAltGlyphDefElementWrappingImplementation **************
$inherits(SVGAltGlyphDefElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAltGlyphDefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphDefElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphDefElementWrappingImplementation.prototype;
function SVGAltGlyphDefElementWrappingImplementation() {}
SVGAltGlyphDefElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTextContentElementWrappingImplementation **************
$inherits(SVGTextContentElementWrappingImplementation, SVGElementWrappingImplementation);
SVGTextContentElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextContentElementWrappingImplementation._wrap$ctor.prototype = SVGTextContentElementWrappingImplementation.prototype;
function SVGTextContentElementWrappingImplementation() {}
SVGTextContentElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTextPositioningElementWrappingImplementation **************
$inherits(SVGTextPositioningElementWrappingImplementation, SVGTextContentElementWrappingImplementation);
SVGTextPositioningElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextContentElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextPositioningElementWrappingImplementation._wrap$ctor.prototype = SVGTextPositioningElementWrappingImplementation.prototype;
function SVGTextPositioningElementWrappingImplementation() {}
SVGTextPositioningElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAltGlyphElementWrappingImplementation **************
$inherits(SVGAltGlyphElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGAltGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphElementWrappingImplementation.prototype;
function SVGAltGlyphElementWrappingImplementation() {}
SVGAltGlyphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAltGlyphItemElementWrappingImplementation **************
$inherits(SVGAltGlyphItemElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAltGlyphItemElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphItemElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphItemElementWrappingImplementation.prototype;
function SVGAltGlyphItemElementWrappingImplementation() {}
SVGAltGlyphItemElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimationElementWrappingImplementation **************
$inherits(SVGAnimationElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAnimationElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimationElementWrappingImplementation._wrap$ctor.prototype = SVGAnimationElementWrappingImplementation.prototype;
function SVGAnimationElementWrappingImplementation() {}
SVGAnimationElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateColorElementWrappingImplementation **************
$inherits(SVGAnimateColorElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateColorElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateColorElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateColorElementWrappingImplementation.prototype;
function SVGAnimateColorElementWrappingImplementation() {}
SVGAnimateColorElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateElementWrappingImplementation **************
$inherits(SVGAnimateElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateElementWrappingImplementation.prototype;
function SVGAnimateElementWrappingImplementation() {}
SVGAnimateElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateMotionElementWrappingImplementation **************
$inherits(SVGAnimateMotionElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateMotionElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateMotionElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateMotionElementWrappingImplementation.prototype;
function SVGAnimateMotionElementWrappingImplementation() {}
SVGAnimateMotionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateTransformElementWrappingImplementation **************
$inherits(SVGAnimateTransformElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateTransformElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateTransformElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateTransformElementWrappingImplementation.prototype;
function SVGAnimateTransformElementWrappingImplementation() {}
SVGAnimateTransformElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGCircleElementWrappingImplementation **************
$inherits(SVGCircleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGCircleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCircleElementWrappingImplementation._wrap$ctor.prototype = SVGCircleElementWrappingImplementation.prototype;
function SVGCircleElementWrappingImplementation() {}
SVGCircleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGClipPathElementWrappingImplementation **************
$inherits(SVGClipPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGClipPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGClipPathElementWrappingImplementation._wrap$ctor.prototype = SVGClipPathElementWrappingImplementation.prototype;
function SVGClipPathElementWrappingImplementation() {}
SVGClipPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGComponentTransferFunctionElementWrappingImplementation **************
$inherits(SVGComponentTransferFunctionElementWrappingImplementation, SVGElementWrappingImplementation);
SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.prototype = SVGComponentTransferFunctionElementWrappingImplementation.prototype;
function SVGComponentTransferFunctionElementWrappingImplementation() {}
SVGComponentTransferFunctionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGCursorElementWrappingImplementation **************
$inherits(SVGCursorElementWrappingImplementation, SVGElementWrappingImplementation);
SVGCursorElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCursorElementWrappingImplementation._wrap$ctor.prototype = SVGCursorElementWrappingImplementation.prototype;
function SVGCursorElementWrappingImplementation() {}
SVGCursorElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGDefsElementWrappingImplementation **************
$inherits(SVGDefsElementWrappingImplementation, SVGElementWrappingImplementation);
SVGDefsElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDefsElementWrappingImplementation._wrap$ctor.prototype = SVGDefsElementWrappingImplementation.prototype;
function SVGDefsElementWrappingImplementation() {}
SVGDefsElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGDescElementWrappingImplementation **************
$inherits(SVGDescElementWrappingImplementation, SVGElementWrappingImplementation);
SVGDescElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDescElementWrappingImplementation._wrap$ctor.prototype = SVGDescElementWrappingImplementation.prototype;
function SVGDescElementWrappingImplementation() {}
SVGDescElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGEllipseElementWrappingImplementation **************
$inherits(SVGEllipseElementWrappingImplementation, SVGElementWrappingImplementation);
SVGEllipseElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGEllipseElementWrappingImplementation._wrap$ctor.prototype = SVGEllipseElementWrappingImplementation.prototype;
function SVGEllipseElementWrappingImplementation() {}
SVGEllipseElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEBlendElementWrappingImplementation **************
$inherits(SVGFEBlendElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEBlendElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEBlendElementWrappingImplementation._wrap$ctor.prototype = SVGFEBlendElementWrappingImplementation.prototype;
function SVGFEBlendElementWrappingImplementation() {}
SVGFEBlendElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEColorMatrixElementWrappingImplementation **************
$inherits(SVGFEColorMatrixElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEColorMatrixElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEColorMatrixElementWrappingImplementation._wrap$ctor.prototype = SVGFEColorMatrixElementWrappingImplementation.prototype;
function SVGFEColorMatrixElementWrappingImplementation() {}
SVGFEColorMatrixElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEComponentTransferElementWrappingImplementation **************
$inherits(SVGFEComponentTransferElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEComponentTransferElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEComponentTransferElementWrappingImplementation._wrap$ctor.prototype = SVGFEComponentTransferElementWrappingImplementation.prototype;
function SVGFEComponentTransferElementWrappingImplementation() {}
SVGFEComponentTransferElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEConvolveMatrixElementWrappingImplementation **************
$inherits(SVGFEConvolveMatrixElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor.prototype = SVGFEConvolveMatrixElementWrappingImplementation.prototype;
function SVGFEConvolveMatrixElementWrappingImplementation() {}
SVGFEConvolveMatrixElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEDiffuseLightingElementWrappingImplementation **************
$inherits(SVGFEDiffuseLightingElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFEDiffuseLightingElementWrappingImplementation.prototype;
function SVGFEDiffuseLightingElementWrappingImplementation() {}
SVGFEDiffuseLightingElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEDisplacementMapElementWrappingImplementation **************
$inherits(SVGFEDisplacementMapElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor.prototype = SVGFEDisplacementMapElementWrappingImplementation.prototype;
function SVGFEDisplacementMapElementWrappingImplementation() {}
SVGFEDisplacementMapElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEDistantLightElementWrappingImplementation **************
$inherits(SVGFEDistantLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDistantLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDistantLightElementWrappingImplementation._wrap$ctor.prototype = SVGFEDistantLightElementWrappingImplementation.prototype;
function SVGFEDistantLightElementWrappingImplementation() {}
SVGFEDistantLightElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEDropShadowElementWrappingImplementation **************
$inherits(SVGFEDropShadowElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDropShadowElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDropShadowElementWrappingImplementation._wrap$ctor.prototype = SVGFEDropShadowElementWrappingImplementation.prototype;
function SVGFEDropShadowElementWrappingImplementation() {}
SVGFEDropShadowElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFloodElementWrappingImplementation **************
$inherits(SVGFEFloodElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEFloodElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFloodElementWrappingImplementation._wrap$ctor.prototype = SVGFEFloodElementWrappingImplementation.prototype;
function SVGFEFloodElementWrappingImplementation() {}
SVGFEFloodElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncAElementWrappingImplementation **************
$inherits(SVGFEFuncAElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncAElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncAElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncAElementWrappingImplementation.prototype;
function SVGFEFuncAElementWrappingImplementation() {}
SVGFEFuncAElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncBElementWrappingImplementation **************
$inherits(SVGFEFuncBElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncBElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncBElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncBElementWrappingImplementation.prototype;
function SVGFEFuncBElementWrappingImplementation() {}
SVGFEFuncBElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncGElementWrappingImplementation **************
$inherits(SVGFEFuncGElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncGElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncGElementWrappingImplementation.prototype;
function SVGFEFuncGElementWrappingImplementation() {}
SVGFEFuncGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncRElementWrappingImplementation **************
$inherits(SVGFEFuncRElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncRElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncRElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncRElementWrappingImplementation.prototype;
function SVGFEFuncRElementWrappingImplementation() {}
SVGFEFuncRElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEGaussianBlurElementWrappingImplementation **************
$inherits(SVGFEGaussianBlurElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor.prototype = SVGFEGaussianBlurElementWrappingImplementation.prototype;
function SVGFEGaussianBlurElementWrappingImplementation() {}
SVGFEGaussianBlurElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEImageElementWrappingImplementation **************
$inherits(SVGFEImageElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEImageElementWrappingImplementation._wrap$ctor.prototype = SVGFEImageElementWrappingImplementation.prototype;
function SVGFEImageElementWrappingImplementation() {}
SVGFEImageElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEMergeElementWrappingImplementation **************
$inherits(SVGFEMergeElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEMergeElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEMergeElementWrappingImplementation._wrap$ctor.prototype = SVGFEMergeElementWrappingImplementation.prototype;
function SVGFEMergeElementWrappingImplementation() {}
SVGFEMergeElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEMergeNodeElementWrappingImplementation **************
$inherits(SVGFEMergeNodeElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEMergeNodeElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEMergeNodeElementWrappingImplementation._wrap$ctor.prototype = SVGFEMergeNodeElementWrappingImplementation.prototype;
function SVGFEMergeNodeElementWrappingImplementation() {}
SVGFEMergeNodeElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEOffsetElementWrappingImplementation **************
$inherits(SVGFEOffsetElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEOffsetElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEOffsetElementWrappingImplementation._wrap$ctor.prototype = SVGFEOffsetElementWrappingImplementation.prototype;
function SVGFEOffsetElementWrappingImplementation() {}
SVGFEOffsetElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEPointLightElementWrappingImplementation **************
$inherits(SVGFEPointLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEPointLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEPointLightElementWrappingImplementation._wrap$ctor.prototype = SVGFEPointLightElementWrappingImplementation.prototype;
function SVGFEPointLightElementWrappingImplementation() {}
SVGFEPointLightElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFESpecularLightingElementWrappingImplementation **************
$inherits(SVGFESpecularLightingElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFESpecularLightingElementWrappingImplementation.prototype;
function SVGFESpecularLightingElementWrappingImplementation() {}
SVGFESpecularLightingElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFESpotLightElementWrappingImplementation **************
$inherits(SVGFESpotLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFESpotLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpotLightElementWrappingImplementation._wrap$ctor.prototype = SVGFESpotLightElementWrappingImplementation.prototype;
function SVGFESpotLightElementWrappingImplementation() {}
SVGFESpotLightElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFETileElementWrappingImplementation **************
$inherits(SVGFETileElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFETileElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETileElementWrappingImplementation._wrap$ctor.prototype = SVGFETileElementWrappingImplementation.prototype;
function SVGFETileElementWrappingImplementation() {}
SVGFETileElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFETurbulenceElementWrappingImplementation **************
$inherits(SVGFETurbulenceElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFETurbulenceElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETurbulenceElementWrappingImplementation._wrap$ctor.prototype = SVGFETurbulenceElementWrappingImplementation.prototype;
function SVGFETurbulenceElementWrappingImplementation() {}
SVGFETurbulenceElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFilterElementWrappingImplementation **************
$inherits(SVGFilterElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFilterElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFilterElementWrappingImplementation._wrap$ctor.prototype = SVGFilterElementWrappingImplementation.prototype;
function SVGFilterElementWrappingImplementation() {}
SVGFilterElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontElementWrappingImplementation **************
$inherits(SVGFontElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontElementWrappingImplementation._wrap$ctor.prototype = SVGFontElementWrappingImplementation.prototype;
function SVGFontElementWrappingImplementation() {}
SVGFontElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceElementWrappingImplementation **************
$inherits(SVGFontFaceElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceElementWrappingImplementation.prototype;
function SVGFontFaceElementWrappingImplementation() {}
SVGFontFaceElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceFormatElementWrappingImplementation **************
$inherits(SVGFontFaceFormatElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceFormatElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceFormatElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceFormatElementWrappingImplementation.prototype;
function SVGFontFaceFormatElementWrappingImplementation() {}
SVGFontFaceFormatElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceNameElementWrappingImplementation **************
$inherits(SVGFontFaceNameElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceNameElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceNameElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceNameElementWrappingImplementation.prototype;
function SVGFontFaceNameElementWrappingImplementation() {}
SVGFontFaceNameElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceSrcElementWrappingImplementation **************
$inherits(SVGFontFaceSrcElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceSrcElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceSrcElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceSrcElementWrappingImplementation.prototype;
function SVGFontFaceSrcElementWrappingImplementation() {}
SVGFontFaceSrcElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceUriElementWrappingImplementation **************
$inherits(SVGFontFaceUriElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceUriElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceUriElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceUriElementWrappingImplementation.prototype;
function SVGFontFaceUriElementWrappingImplementation() {}
SVGFontFaceUriElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGForeignObjectElementWrappingImplementation **************
$inherits(SVGForeignObjectElementWrappingImplementation, SVGElementWrappingImplementation);
SVGForeignObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGForeignObjectElementWrappingImplementation._wrap$ctor.prototype = SVGForeignObjectElementWrappingImplementation.prototype;
function SVGForeignObjectElementWrappingImplementation() {}
SVGForeignObjectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGGElementWrappingImplementation **************
$inherits(SVGGElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGElementWrappingImplementation._wrap$ctor.prototype = SVGGElementWrappingImplementation.prototype;
function SVGGElementWrappingImplementation() {}
SVGGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGGlyphElementWrappingImplementation **************
$inherits(SVGGlyphElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGGlyphElementWrappingImplementation.prototype;
function SVGGlyphElementWrappingImplementation() {}
SVGGlyphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGGlyphRefElementWrappingImplementation **************
$inherits(SVGGlyphRefElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGlyphRefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGlyphRefElementWrappingImplementation._wrap$ctor.prototype = SVGGlyphRefElementWrappingImplementation.prototype;
function SVGGlyphRefElementWrappingImplementation() {}
SVGGlyphRefElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGGradientElementWrappingImplementation **************
$inherits(SVGGradientElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGradientElementWrappingImplementation._wrap$ctor.prototype = SVGGradientElementWrappingImplementation.prototype;
function SVGGradientElementWrappingImplementation() {}
SVGGradientElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGHKernElementWrappingImplementation **************
$inherits(SVGHKernElementWrappingImplementation, SVGElementWrappingImplementation);
SVGHKernElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGHKernElementWrappingImplementation._wrap$ctor.prototype = SVGHKernElementWrappingImplementation.prototype;
function SVGHKernElementWrappingImplementation() {}
SVGHKernElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGImageElementWrappingImplementation **************
$inherits(SVGImageElementWrappingImplementation, SVGElementWrappingImplementation);
SVGImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGImageElementWrappingImplementation._wrap$ctor.prototype = SVGImageElementWrappingImplementation.prototype;
function SVGImageElementWrappingImplementation() {}
SVGImageElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGLineElementWrappingImplementation **************
$inherits(SVGLineElementWrappingImplementation, SVGElementWrappingImplementation);
SVGLineElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLineElementWrappingImplementation._wrap$ctor.prototype = SVGLineElementWrappingImplementation.prototype;
function SVGLineElementWrappingImplementation() {}
SVGLineElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGLinearGradientElementWrappingImplementation **************
$inherits(SVGLinearGradientElementWrappingImplementation, SVGGradientElementWrappingImplementation);
SVGLinearGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGGradientElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLinearGradientElementWrappingImplementation._wrap$ctor.prototype = SVGLinearGradientElementWrappingImplementation.prototype;
function SVGLinearGradientElementWrappingImplementation() {}
SVGLinearGradientElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMPathElementWrappingImplementation **************
$inherits(SVGMPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMPathElementWrappingImplementation._wrap$ctor.prototype = SVGMPathElementWrappingImplementation.prototype;
function SVGMPathElementWrappingImplementation() {}
SVGMPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMarkerElementWrappingImplementation **************
$inherits(SVGMarkerElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMarkerElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMarkerElementWrappingImplementation._wrap$ctor.prototype = SVGMarkerElementWrappingImplementation.prototype;
function SVGMarkerElementWrappingImplementation() {}
SVGMarkerElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMaskElementWrappingImplementation **************
$inherits(SVGMaskElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMaskElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMaskElementWrappingImplementation._wrap$ctor.prototype = SVGMaskElementWrappingImplementation.prototype;
function SVGMaskElementWrappingImplementation() {}
SVGMaskElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMetadataElementWrappingImplementation **************
$inherits(SVGMetadataElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMetadataElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMetadataElementWrappingImplementation._wrap$ctor.prototype = SVGMetadataElementWrappingImplementation.prototype;
function SVGMetadataElementWrappingImplementation() {}
SVGMetadataElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMissingGlyphElementWrappingImplementation **************
$inherits(SVGMissingGlyphElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMissingGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMissingGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGMissingGlyphElementWrappingImplementation.prototype;
function SVGMissingGlyphElementWrappingImplementation() {}
SVGMissingGlyphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGPathElementWrappingImplementation **************
$inherits(SVGPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathElementWrappingImplementation._wrap$ctor.prototype = SVGPathElementWrappingImplementation.prototype;
function SVGPathElementWrappingImplementation() {}
SVGPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGPatternElementWrappingImplementation **************
$inherits(SVGPatternElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPatternElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPatternElementWrappingImplementation._wrap$ctor.prototype = SVGPatternElementWrappingImplementation.prototype;
function SVGPatternElementWrappingImplementation() {}
SVGPatternElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGPolygonElementWrappingImplementation **************
$inherits(SVGPolygonElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPolygonElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPolygonElementWrappingImplementation._wrap$ctor.prototype = SVGPolygonElementWrappingImplementation.prototype;
function SVGPolygonElementWrappingImplementation() {}
SVGPolygonElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGPolylineElementWrappingImplementation **************
$inherits(SVGPolylineElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPolylineElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPolylineElementWrappingImplementation._wrap$ctor.prototype = SVGPolylineElementWrappingImplementation.prototype;
function SVGPolylineElementWrappingImplementation() {}
SVGPolylineElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGRadialGradientElementWrappingImplementation **************
$inherits(SVGRadialGradientElementWrappingImplementation, SVGGradientElementWrappingImplementation);
SVGRadialGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGGradientElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGRadialGradientElementWrappingImplementation._wrap$ctor.prototype = SVGRadialGradientElementWrappingImplementation.prototype;
function SVGRadialGradientElementWrappingImplementation() {}
SVGRadialGradientElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGRectElementWrappingImplementation **************
$inherits(SVGRectElementWrappingImplementation, SVGElementWrappingImplementation);
SVGRectElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGRectElementWrappingImplementation._wrap$ctor.prototype = SVGRectElementWrappingImplementation.prototype;
function SVGRectElementWrappingImplementation() {}
SVGRectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGScriptElementWrappingImplementation **************
$inherits(SVGScriptElementWrappingImplementation, SVGElementWrappingImplementation);
SVGScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGScriptElementWrappingImplementation._wrap$ctor.prototype = SVGScriptElementWrappingImplementation.prototype;
function SVGScriptElementWrappingImplementation() {}
SVGScriptElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGSetElementWrappingImplementation **************
$inherits(SVGSetElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGSetElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSetElementWrappingImplementation._wrap$ctor.prototype = SVGSetElementWrappingImplementation.prototype;
function SVGSetElementWrappingImplementation() {}
SVGSetElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGStopElementWrappingImplementation **************
$inherits(SVGStopElementWrappingImplementation, SVGElementWrappingImplementation);
SVGStopElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGStopElementWrappingImplementation._wrap$ctor.prototype = SVGStopElementWrappingImplementation.prototype;
function SVGStopElementWrappingImplementation() {}
SVGStopElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGStyleElementWrappingImplementation **************
$inherits(SVGStyleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGStyleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGStyleElementWrappingImplementation._wrap$ctor.prototype = SVGStyleElementWrappingImplementation.prototype;
function SVGStyleElementWrappingImplementation() {}
SVGStyleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGSwitchElementWrappingImplementation **************
$inherits(SVGSwitchElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSwitchElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSwitchElementWrappingImplementation._wrap$ctor.prototype = SVGSwitchElementWrappingImplementation.prototype;
function SVGSwitchElementWrappingImplementation() {}
SVGSwitchElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGSymbolElementWrappingImplementation **************
$inherits(SVGSymbolElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSymbolElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSymbolElementWrappingImplementation._wrap$ctor.prototype = SVGSymbolElementWrappingImplementation.prototype;
function SVGSymbolElementWrappingImplementation() {}
SVGSymbolElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTRefElementWrappingImplementation **************
$inherits(SVGTRefElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTRefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTRefElementWrappingImplementation._wrap$ctor.prototype = SVGTRefElementWrappingImplementation.prototype;
function SVGTRefElementWrappingImplementation() {}
SVGTRefElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTSpanElementWrappingImplementation **************
$inherits(SVGTSpanElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTSpanElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTSpanElementWrappingImplementation._wrap$ctor.prototype = SVGTSpanElementWrappingImplementation.prototype;
function SVGTSpanElementWrappingImplementation() {}
SVGTSpanElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTextElementWrappingImplementation **************
$inherits(SVGTextElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTextElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextElementWrappingImplementation._wrap$ctor.prototype = SVGTextElementWrappingImplementation.prototype;
function SVGTextElementWrappingImplementation() {}
SVGTextElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTextPathElementWrappingImplementation **************
$inherits(SVGTextPathElementWrappingImplementation, SVGTextContentElementWrappingImplementation);
SVGTextPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextContentElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextPathElementWrappingImplementation._wrap$ctor.prototype = SVGTextPathElementWrappingImplementation.prototype;
function SVGTextPathElementWrappingImplementation() {}
SVGTextPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTitleElementWrappingImplementation **************
$inherits(SVGTitleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGTitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTitleElementWrappingImplementation._wrap$ctor.prototype = SVGTitleElementWrappingImplementation.prototype;
function SVGTitleElementWrappingImplementation() {}
SVGTitleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGUseElementWrappingImplementation **************
$inherits(SVGUseElementWrappingImplementation, SVGElementWrappingImplementation);
SVGUseElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGUseElementWrappingImplementation._wrap$ctor.prototype = SVGUseElementWrappingImplementation.prototype;
function SVGUseElementWrappingImplementation() {}
SVGUseElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGVKernElementWrappingImplementation **************
$inherits(SVGVKernElementWrappingImplementation, SVGElementWrappingImplementation);
SVGVKernElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGVKernElementWrappingImplementation._wrap$ctor.prototype = SVGVKernElementWrappingImplementation.prototype;
function SVGVKernElementWrappingImplementation() {}
SVGVKernElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGViewElementWrappingImplementation **************
$inherits(SVGViewElementWrappingImplementation, SVGElementWrappingImplementation);
SVGViewElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGViewElementWrappingImplementation._wrap$ctor.prototype = SVGViewElementWrappingImplementation.prototype;
function SVGViewElementWrappingImplementation() {}
SVGViewElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for UIEventWrappingImplementation **************
$inherits(UIEventWrappingImplementation, EventWrappingImplementation);
UIEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
UIEventWrappingImplementation._wrap$ctor.prototype = UIEventWrappingImplementation.prototype;
function UIEventWrappingImplementation() {}
// ********** Code for SVGZoomEventWrappingImplementation **************
$inherits(SVGZoomEventWrappingImplementation, UIEventWrappingImplementation);
SVGZoomEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGZoomEventWrappingImplementation._wrap$ctor.prototype = SVGZoomEventWrappingImplementation.prototype;
function SVGZoomEventWrappingImplementation() {}
// ********** Code for ScriptElementWrappingImplementation **************
$inherits(ScriptElementWrappingImplementation, ElementWrappingImplementation);
ScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ScriptElementWrappingImplementation._wrap$ctor.prototype = ScriptElementWrappingImplementation.prototype;
function ScriptElementWrappingImplementation() {}
ScriptElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SelectElementWrappingImplementation **************
$inherits(SelectElementWrappingImplementation, ElementWrappingImplementation);
SelectElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SelectElementWrappingImplementation._wrap$ctor.prototype = SelectElementWrappingImplementation.prototype;
function SelectElementWrappingImplementation() {}
SelectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SelectElementWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
SelectElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
SelectElementWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapNode(this._ptr.item(index));
}
// ********** Code for SourceElementWrappingImplementation **************
$inherits(SourceElementWrappingImplementation, ElementWrappingImplementation);
SourceElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SourceElementWrappingImplementation._wrap$ctor.prototype = SourceElementWrappingImplementation.prototype;
function SourceElementWrappingImplementation() {}
SourceElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SpanElementWrappingImplementation **************
$inherits(SpanElementWrappingImplementation, ElementWrappingImplementation);
SpanElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SpanElementWrappingImplementation._wrap$ctor.prototype = SpanElementWrappingImplementation.prototype;
function SpanElementWrappingImplementation() {}
SpanElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SpeechInputEventWrappingImplementation **************
$inherits(SpeechInputEventWrappingImplementation, EventWrappingImplementation);
SpeechInputEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
SpeechInputEventWrappingImplementation._wrap$ctor.prototype = SpeechInputEventWrappingImplementation.prototype;
function SpeechInputEventWrappingImplementation() {}
// ********** Code for StyleElementWrappingImplementation **************
$inherits(StyleElementWrappingImplementation, ElementWrappingImplementation);
StyleElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
StyleElementWrappingImplementation._wrap$ctor.prototype = StyleElementWrappingImplementation.prototype;
function StyleElementWrappingImplementation() {}
StyleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableCaptionElementWrappingImplementation **************
$inherits(TableCaptionElementWrappingImplementation, ElementWrappingImplementation);
TableCaptionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableCaptionElementWrappingImplementation._wrap$ctor.prototype = TableCaptionElementWrappingImplementation.prototype;
function TableCaptionElementWrappingImplementation() {}
TableCaptionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableCellElementWrappingImplementation **************
$inherits(TableCellElementWrappingImplementation, ElementWrappingImplementation);
TableCellElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableCellElementWrappingImplementation._wrap$ctor.prototype = TableCellElementWrappingImplementation.prototype;
function TableCellElementWrappingImplementation() {}
TableCellElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableColElementWrappingImplementation **************
$inherits(TableColElementWrappingImplementation, ElementWrappingImplementation);
TableColElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableColElementWrappingImplementation._wrap$ctor.prototype = TableColElementWrappingImplementation.prototype;
function TableColElementWrappingImplementation() {}
TableColElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableElementWrappingImplementation **************
$inherits(TableElementWrappingImplementation, ElementWrappingImplementation);
TableElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableElementWrappingImplementation._wrap$ctor.prototype = TableElementWrappingImplementation.prototype;
function TableElementWrappingImplementation() {}
TableElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableRowElementWrappingImplementation **************
$inherits(TableRowElementWrappingImplementation, ElementWrappingImplementation);
TableRowElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableRowElementWrappingImplementation._wrap$ctor.prototype = TableRowElementWrappingImplementation.prototype;
function TableRowElementWrappingImplementation() {}
TableRowElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableSectionElementWrappingImplementation **************
$inherits(TableSectionElementWrappingImplementation, ElementWrappingImplementation);
TableSectionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableSectionElementWrappingImplementation._wrap$ctor.prototype = TableSectionElementWrappingImplementation.prototype;
function TableSectionElementWrappingImplementation() {}
TableSectionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TextAreaElementWrappingImplementation **************
$inherits(TextAreaElementWrappingImplementation, ElementWrappingImplementation);
TextAreaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextAreaElementWrappingImplementation._wrap$ctor.prototype = TextAreaElementWrappingImplementation.prototype;
function TextAreaElementWrappingImplementation() {}
TextAreaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
TextAreaElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for TitleElementWrappingImplementation **************
$inherits(TitleElementWrappingImplementation, ElementWrappingImplementation);
TitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TitleElementWrappingImplementation._wrap$ctor.prototype = TitleElementWrappingImplementation.prototype;
function TitleElementWrappingImplementation() {}
TitleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TrackElementWrappingImplementation **************
$inherits(TrackElementWrappingImplementation, ElementWrappingImplementation);
TrackElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TrackElementWrappingImplementation._wrap$ctor.prototype = TrackElementWrappingImplementation.prototype;
function TrackElementWrappingImplementation() {}
TrackElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for UListElementWrappingImplementation **************
$inherits(UListElementWrappingImplementation, ElementWrappingImplementation);
UListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
UListElementWrappingImplementation._wrap$ctor.prototype = UListElementWrappingImplementation.prototype;
function UListElementWrappingImplementation() {}
UListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for UnknownElementWrappingImplementation **************
$inherits(UnknownElementWrappingImplementation, ElementWrappingImplementation);
UnknownElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
UnknownElementWrappingImplementation._wrap$ctor.prototype = UnknownElementWrappingImplementation.prototype;
function UnknownElementWrappingImplementation() {}
UnknownElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for VideoElementWrappingImplementation **************
$inherits(VideoElementWrappingImplementation, MediaElementWrappingImplementation);
VideoElementWrappingImplementation._wrap$ctor = function(ptr) {
  MediaElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
VideoElementWrappingImplementation._wrap$ctor.prototype = VideoElementWrappingImplementation.prototype;
function VideoElementWrappingImplementation() {}
VideoElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for WebGLContextEventWrappingImplementation **************
$inherits(WebGLContextEventWrappingImplementation, EventWrappingImplementation);
WebGLContextEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebGLContextEventWrappingImplementation._wrap$ctor.prototype = WebGLContextEventWrappingImplementation.prototype;
function WebGLContextEventWrappingImplementation() {}
// ********** Code for LevelDom **************
function LevelDom() {}
LevelDom.wrapDocument = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapElement = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLAnchorElement":

      return new AnchorElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAreaElement":

      return new AreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAudioElement":

      return new AudioElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBRElement":

      return new BRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBaseElement":

      return new BaseElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBodyElement":

      return new BodyElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLButtonElement":

      return new ButtonElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLCanvasElement":

      return new CanvasElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDListElement":

      return new DListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDataListElement":

      return new DataListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDetailsElement":

      return new DetailsElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDivElement":

      return new DivElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLElement":

      return new ElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLEmbedElement":

      return new EmbedElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFieldSetElement":

      return new FieldSetElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFontElement":

      return new FontElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFormElement":

      return new FormElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHRElement":

      return new HRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadElement":

      return new HeadElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadingElement":

      return new HeadingElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHtmlElement":

      return new DocumentWrappingImplementation._wrap$ctor(raw.get$parentNode(), raw);

    case "HTMLIFrameElement":

      return new IFrameElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLImageElement":

      return new ImageElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLInputElement":

      return new InputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLKeygenElement":

      return new KeygenElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLIElement":

      return new LIElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLabelElement":

      return new LabelElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLegendElement":

      return new LegendElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLinkElement":

      return new LinkElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMapElement":

      return new MapElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMarqueeElement":

      return new MarqueeElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMediaElement":

      return new MediaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMenuElement":

      return new MenuElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMetaElement":

      return new MetaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMeterElement":

      return new MeterElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLModElement":

      return new ModElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOListElement":

      return new OListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLObjectElement":

      return new ObjectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptGroupElement":

      return new OptGroupElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptionElement":

      return new OptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOutputElement":

      return new OutputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParagraphElement":

      return new ParagraphElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParamElement":

      return new ParamElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLPreElement":

      return new PreElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLProgressElement":

      return new ProgressElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLQuoteElement":

      return new QuoteElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAElement":

      return new SVGAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphDefElement":

      return new SVGAltGlyphDefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphElement":

      return new SVGAltGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphItemElement":

      return new SVGAltGlyphItemElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateColorElement":

      return new SVGAnimateColorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateElement":

      return new SVGAnimateElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateMotionElement":

      return new SVGAnimateMotionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateTransformElement":

      return new SVGAnimateTransformElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimationElement":

      return new SVGAnimationElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCircleElement":

      return new SVGCircleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGClipPathElement":

      return new SVGClipPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGComponentTransferFunctionElement":

      return new SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCursorElement":

      return new SVGCursorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDefsElement":

      return new SVGDefsElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDescElement":

      return new SVGDescElementWrappingImplementation._wrap$ctor(raw);

    case "SVGElement":

      return new SVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGEllipseElement":

      return new SVGEllipseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEBlendElement":

      return new SVGFEBlendElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEColorMatrixElement":

      return new SVGFEColorMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEComponentTransferElement":

      return new SVGFEComponentTransferElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEConvolveMatrixElement":

      return new SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDiffuseLightingElement":

      return new SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDisplacementMapElement":

      return new SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDistantLightElement":

      return new SVGFEDistantLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDropShadowElement":

      return new SVGFEDropShadowElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFloodElement":

      return new SVGFEFloodElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncAElement":

      return new SVGFEFuncAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncBElement":

      return new SVGFEFuncBElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncGElement":

      return new SVGFEFuncGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncRElement":

      return new SVGFEFuncRElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEGaussianBlurElement":

      return new SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEImageElement":

      return new SVGFEImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeElement":

      return new SVGFEMergeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeNodeElement":

      return new SVGFEMergeNodeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEOffsetElement":

      return new SVGFEOffsetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEPointLightElement":

      return new SVGFEPointLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpecularLightingElement":

      return new SVGFESpecularLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpotLightElement":

      return new SVGFESpotLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETileElement":

      return new SVGFETileElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETurbulenceElement":

      return new SVGFETurbulenceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterElement":

      return new SVGFilterElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontElement":

      return new SVGFontElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceElement":

      return new SVGFontFaceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceFormatElement":

      return new SVGFontFaceFormatElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceNameElement":

      return new SVGFontFaceNameElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceSrcElement":

      return new SVGFontFaceSrcElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceUriElement":

      return new SVGFontFaceUriElementWrappingImplementation._wrap$ctor(raw);

    case "SVGForeignObjectElement":

      return new SVGForeignObjectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGElement":

      return new SVGGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphElement":

      return new SVGGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphRefElement":

      return new SVGGlyphRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGradientElement":

      return new SVGGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGHKernElement":

      return new SVGHKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGImageElement":

      return new SVGImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLineElement":

      return new SVGLineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLinearGradientElement":

      return new SVGLinearGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMPathElement":

      return new SVGMPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMarkerElement":

      return new SVGMarkerElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMaskElement":

      return new SVGMaskElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMetadataElement":

      return new SVGMetadataElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMissingGlyphElement":

      return new SVGMissingGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPathElement":

      return new SVGPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPatternElement":

      return new SVGPatternElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolygonElement":

      return new SVGPolygonElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolylineElement":

      return new SVGPolylineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRadialGradientElement":

      return new SVGRadialGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRectElement":

      return new SVGRectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSVGElement":

      return new SVGSVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGScriptElement":

      return new SVGScriptElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSetElement":

      return new SVGSetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStopElement":

      return new SVGStopElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStyleElement":

      return new SVGStyleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSwitchElement":

      return new SVGSwitchElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSymbolElement":

      return new SVGSymbolElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTRefElement":

      return new SVGTRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTSpanElement":

      return new SVGTSpanElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextContentElement":

      return new SVGTextContentElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextElement":

      return new SVGTextElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPathElement":

      return new SVGTextPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPositioningElement":

      return new SVGTextPositioningElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTitleElement":

      return new SVGTitleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGUseElement":

      return new SVGUseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGVKernElement":

      return new SVGVKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewElement":

      return new SVGViewElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLScriptElement":

      return new ScriptElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSelectElement":

      return new SelectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSourceElement":

      return new SourceElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSpanElement":

      return new SpanElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLStyleElement":

      return new StyleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCaptionElement":

      return new TableCaptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCellElement":

      return new TableCellElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableColElement":

      return new TableColElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableElement":

      return new TableElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableRowElement":

      return new TableRowElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableSectionElement":

      return new TableSectionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTextAreaElement":

      return new TextAreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTitleElement":

      return new TitleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTrackElement":

      return new TrackElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUListElement":

      return new UListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUnknownElement":

      return new UnknownElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLVideoElement":

      return new VideoElementWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapEvent = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "WebKitAnimationEvent":

      return new AnimationEventWrappingImplementation._wrap$ctor(raw);

    case "AudioProcessingEvent":

      return new AudioProcessingEventWrappingImplementation._wrap$ctor(raw);

    case "BeforeLoadEvent":

      return new BeforeLoadEventWrappingImplementation._wrap$ctor(raw);

    case "CloseEvent":

      return new CloseEventWrappingImplementation._wrap$ctor(raw);

    case "CompositionEvent":

      return new CompositionEventWrappingImplementation._wrap$ctor(raw);

    case "CustomEvent":

      return new CustomEventWrappingImplementation._wrap$ctor(raw);

    case "DeviceMotionEvent":

      return new DeviceMotionEventWrappingImplementation._wrap$ctor(raw);

    case "DeviceOrientationEvent":

      return new DeviceOrientationEventWrappingImplementation._wrap$ctor(raw);

    case "ErrorEvent":

      return new ErrorEventWrappingImplementation._wrap$ctor(raw);

    case "Event":

      return new EventWrappingImplementation._wrap$ctor(raw);

    case "HashChangeEvent":

      return new HashChangeEventWrappingImplementation._wrap$ctor(raw);

    case "IDBVersionChangeEvent":

      return new IDBVersionChangeEventWrappingImplementation._wrap$ctor(raw);

    case "KeyboardEvent":

      return new KeyboardEventWrappingImplementation._wrap$ctor(raw);

    case "MessageEvent":

      return new MessageEventWrappingImplementation._wrap$ctor(raw);

    case "MouseEvent":

      return new MouseEventWrappingImplementation._wrap$ctor(raw);

    case "MutationEvent":

      return new MutationEventWrappingImplementation._wrap$ctor(raw);

    case "OfflineAudioCompletionEvent":

      return new OfflineAudioCompletionEventWrappingImplementation._wrap$ctor(raw);

    case "OverflowEvent":

      return new OverflowEventWrappingImplementation._wrap$ctor(raw);

    case "PageTransitionEvent":

      return new PageTransitionEventWrappingImplementation._wrap$ctor(raw);

    case "PopStateEvent":

      return new PopStateEventWrappingImplementation._wrap$ctor(raw);

    case "ProgressEvent":

      return new ProgressEventWrappingImplementation._wrap$ctor(raw);

    case "SVGZoomEvent":

      return new SVGZoomEventWrappingImplementation._wrap$ctor(raw);

    case "SpeechInputEvent":

      return new SpeechInputEventWrappingImplementation._wrap$ctor(raw);

    case "StorageEvent":

      return new StorageEventWrappingImplementation._wrap$ctor(raw);

    case "TextEvent":

      return new TextEventWrappingImplementation._wrap$ctor(raw);

    case "TouchEvent":

      return new TouchEventWrappingImplementation._wrap$ctor(raw);

    case "WebKitTransitionEvent":

      return new TransitionEventWrappingImplementation._wrap$ctor(raw);

    case "UIEvent":

      return new UIEventWrappingImplementation._wrap$ctor(raw);

    case "WebGLContextEvent":

      return new WebGLContextEventWrappingImplementation._wrap$ctor(raw);

    case "WheelEvent":

      return new WheelEventWrappingImplementation._wrap$ctor(raw);

    case "XMLHttpRequestProgressEvent":

      return new XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapNode = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLAnchorElement":

      return new AnchorElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAreaElement":

      return new AreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAudioElement":

      return new AudioElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBRElement":

      return new BRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBaseElement":

      return new BaseElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBodyElement":

      return new BodyElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLButtonElement":

      return new ButtonElementWrappingImplementation._wrap$ctor(raw);

    case "CDATASection":

      return new CDATASectionWrappingImplementation._wrap$ctor(raw);

    case "HTMLCanvasElement":

      return new CanvasElementWrappingImplementation._wrap$ctor(raw);

    case "CharacterData":

      return new CharacterDataWrappingImplementation._wrap$ctor(raw);

    case "Comment":

      return new CommentWrappingImplementation._wrap$ctor(raw);

    case "HTMLDListElement":

      return new DListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDataListElement":

      return new DataListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDetailsElement":

      return new DetailsElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDivElement":

      return new DivElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "DocumentFragment":

      return new DocumentFragmentWrappingImplementation._wrap$ctor(raw);

    case "HTMLElement":

      return new ElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLEmbedElement":

      return new EmbedElementWrappingImplementation._wrap$ctor(raw);

    case "Entity":

      return new EntityWrappingImplementation._wrap$ctor(raw);

    case "EntityReference":

      return new EntityReferenceWrappingImplementation._wrap$ctor(raw);

    case "HTMLFieldSetElement":

      return new FieldSetElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFontElement":

      return new FontElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFormElement":

      return new FormElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHRElement":

      return new HRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadElement":

      return new HeadElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadingElement":

      return new HeadingElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHtmlElement":

      return new DocumentWrappingImplementation._wrap$ctor(raw.get$parentNode(), raw);

    case "HTMLIFrameElement":

      return new IFrameElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLImageElement":

      return new ImageElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLInputElement":

      return new InputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLKeygenElement":

      return new KeygenElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLIElement":

      return new LIElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLabelElement":

      return new LabelElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLegendElement":

      return new LegendElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLinkElement":

      return new LinkElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMapElement":

      return new MapElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMarqueeElement":

      return new MarqueeElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMediaElement":

      return new MediaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMenuElement":

      return new MenuElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMetaElement":

      return new MetaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMeterElement":

      return new MeterElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLModElement":

      return new ModElementWrappingImplementation._wrap$ctor(raw);

    case "Node":

      return new NodeWrappingImplementation._wrap$ctor(raw);

    case "Notation":

      return new NotationWrappingImplementation._wrap$ctor(raw);

    case "HTMLOListElement":

      return new OListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLObjectElement":

      return new ObjectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptGroupElement":

      return new OptGroupElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptionElement":

      return new OptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOutputElement":

      return new OutputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParagraphElement":

      return new ParagraphElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParamElement":

      return new ParamElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLPreElement":

      return new PreElementWrappingImplementation._wrap$ctor(raw);

    case "ProcessingInstruction":

      return new ProcessingInstructionWrappingImplementation._wrap$ctor(raw);

    case "HTMLProgressElement":

      return new ProgressElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLQuoteElement":

      return new QuoteElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAElement":

      return new SVGAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphDefElement":

      return new SVGAltGlyphDefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphElement":

      return new SVGAltGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphItemElement":

      return new SVGAltGlyphItemElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateColorElement":

      return new SVGAnimateColorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateElement":

      return new SVGAnimateElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateMotionElement":

      return new SVGAnimateMotionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateTransformElement":

      return new SVGAnimateTransformElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimationElement":

      return new SVGAnimationElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCircleElement":

      return new SVGCircleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGClipPathElement":

      return new SVGClipPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGComponentTransferFunctionElement":

      return new SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCursorElement":

      return new SVGCursorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDefsElement":

      return new SVGDefsElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDescElement":

      return new SVGDescElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    case "SVGElement":

      return new SVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGEllipseElement":

      return new SVGEllipseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEBlendElement":

      return new SVGFEBlendElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEColorMatrixElement":

      return new SVGFEColorMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEComponentTransferElement":

      return new SVGFEComponentTransferElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEConvolveMatrixElement":

      return new SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDiffuseLightingElement":

      return new SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDisplacementMapElement":

      return new SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDistantLightElement":

      return new SVGFEDistantLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDropShadowElement":

      return new SVGFEDropShadowElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFloodElement":

      return new SVGFEFloodElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncAElement":

      return new SVGFEFuncAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncBElement":

      return new SVGFEFuncBElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncGElement":

      return new SVGFEFuncGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncRElement":

      return new SVGFEFuncRElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEGaussianBlurElement":

      return new SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEImageElement":

      return new SVGFEImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeElement":

      return new SVGFEMergeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeNodeElement":

      return new SVGFEMergeNodeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEOffsetElement":

      return new SVGFEOffsetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEPointLightElement":

      return new SVGFEPointLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpecularLightingElement":

      return new SVGFESpecularLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpotLightElement":

      return new SVGFESpotLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETileElement":

      return new SVGFETileElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETurbulenceElement":

      return new SVGFETurbulenceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterElement":

      return new SVGFilterElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontElement":

      return new SVGFontElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceElement":

      return new SVGFontFaceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceFormatElement":

      return new SVGFontFaceFormatElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceNameElement":

      return new SVGFontFaceNameElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceSrcElement":

      return new SVGFontFaceSrcElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceUriElement":

      return new SVGFontFaceUriElementWrappingImplementation._wrap$ctor(raw);

    case "SVGForeignObjectElement":

      return new SVGForeignObjectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGElement":

      return new SVGGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphElement":

      return new SVGGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphRefElement":

      return new SVGGlyphRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGradientElement":

      return new SVGGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGHKernElement":

      return new SVGHKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGImageElement":

      return new SVGImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLineElement":

      return new SVGLineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLinearGradientElement":

      return new SVGLinearGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMPathElement":

      return new SVGMPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMarkerElement":

      return new SVGMarkerElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMaskElement":

      return new SVGMaskElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMetadataElement":

      return new SVGMetadataElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMissingGlyphElement":

      return new SVGMissingGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPathElement":

      return new SVGPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPatternElement":

      return new SVGPatternElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolygonElement":

      return new SVGPolygonElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolylineElement":

      return new SVGPolylineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRadialGradientElement":

      return new SVGRadialGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRectElement":

      return new SVGRectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSVGElement":

      return new SVGSVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGScriptElement":

      return new SVGScriptElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSetElement":

      return new SVGSetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStopElement":

      return new SVGStopElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStyleElement":

      return new SVGStyleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSwitchElement":

      return new SVGSwitchElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSymbolElement":

      return new SVGSymbolElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTRefElement":

      return new SVGTRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTSpanElement":

      return new SVGTSpanElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextContentElement":

      return new SVGTextContentElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextElement":

      return new SVGTextElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPathElement":

      return new SVGTextPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPositioningElement":

      return new SVGTextPositioningElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTitleElement":

      return new SVGTitleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGUseElement":

      return new SVGUseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGVKernElement":

      return new SVGVKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewElement":

      return new SVGViewElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLScriptElement":

      return new ScriptElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSelectElement":

      return new SelectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSourceElement":

      return new SourceElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSpanElement":

      return new SpanElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLStyleElement":

      return new StyleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCaptionElement":

      return new TableCaptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCellElement":

      return new TableCellElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableColElement":

      return new TableColElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableElement":

      return new TableElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableRowElement":

      return new TableRowElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableSectionElement":

      return new TableSectionElementWrappingImplementation._wrap$ctor(raw);

    case "Text":

      return new TextWrappingImplementation._wrap$ctor(raw);

    case "HTMLTextAreaElement":

      return new TextAreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTitleElement":

      return new TitleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTrackElement":

      return new TrackElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUListElement":

      return new UListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUnknownElement":

      return new UnknownElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLVideoElement":

      return new VideoElementWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapWindow = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new WindowWrappingImplementation._wrap$ctor(raw);
}
LevelDom.unwrap = function(raw) {
  return null == raw ? null : raw.get$_ptr();
}
LevelDom.initialize = function() {
  $globals.secretWindow = LevelDom.wrapWindow(get$window());
  $globals.secretDocument = LevelDom.wrapDocument(get$document());
}
// ********** Code for AnimationEventWrappingImplementation **************
$inherits(AnimationEventWrappingImplementation, EventWrappingImplementation);
AnimationEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
AnimationEventWrappingImplementation._wrap$ctor.prototype = AnimationEventWrappingImplementation.prototype;
function AnimationEventWrappingImplementation() {}
// ********** Code for BeforeLoadEventWrappingImplementation **************
$inherits(BeforeLoadEventWrappingImplementation, EventWrappingImplementation);
BeforeLoadEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
BeforeLoadEventWrappingImplementation._wrap$ctor.prototype = BeforeLoadEventWrappingImplementation.prototype;
function BeforeLoadEventWrappingImplementation() {}
// ********** Code for EventsImplementation **************
EventsImplementation._wrap$ctor = function(_ptr) {
  this._ptr = _ptr;
  this._listenerMap = new HashMapImplementation();
}
EventsImplementation._wrap$ctor.prototype = EventsImplementation.prototype;
function EventsImplementation() {}
EventsImplementation.prototype.get$_ptr = function() { return this._ptr; };
EventsImplementation.prototype.set$_ptr = function(value) { return this._ptr = value; };
EventsImplementation.prototype.$index = function(type) {
  return this._get(type.toLowerCase());
}
EventsImplementation.prototype._get = function(type) {
  var $this = this; // closure support
  return this._listenerMap.putIfAbsent(type, (function () {
    return new EventListenerListImplementation($this._ptr, type);
  })
  );
}
// ********** Code for ElementEventsImplementation **************
$inherits(ElementEventsImplementation, EventsImplementation);
ElementEventsImplementation._wrap$ctor = function(_ptr) {
  EventsImplementation._wrap$ctor.call(this, _ptr);
}
ElementEventsImplementation._wrap$ctor.prototype = ElementEventsImplementation.prototype;
function ElementEventsImplementation() {}
ElementEventsImplementation.prototype.get$keyUp = function() {
  return this._get("keyup");
}
// ********** Code for BodyElementEventsImplementation **************
$inherits(BodyElementEventsImplementation, ElementEventsImplementation);
BodyElementEventsImplementation._wrap$ctor = function(_ptr) {
  ElementEventsImplementation._wrap$ctor.call(this, _ptr);
}
BodyElementEventsImplementation._wrap$ctor.prototype = BodyElementEventsImplementation.prototype;
function BodyElementEventsImplementation() {}
// ********** Code for BodyElementWrappingImplementation **************
$inherits(BodyElementWrappingImplementation, ElementWrappingImplementation);
BodyElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BodyElementWrappingImplementation._wrap$ctor.prototype = BodyElementWrappingImplementation.prototype;
function BodyElementWrappingImplementation() {}
BodyElementWrappingImplementation.prototype.is$html_Element = function(){return true};
BodyElementWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new BodyElementEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
// ********** Code for CloseEventWrappingImplementation **************
$inherits(CloseEventWrappingImplementation, EventWrappingImplementation);
CloseEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CloseEventWrappingImplementation._wrap$ctor.prototype = CloseEventWrappingImplementation.prototype;
function CloseEventWrappingImplementation() {}
// ********** Code for CompositionEventWrappingImplementation **************
$inherits(CompositionEventWrappingImplementation, UIEventWrappingImplementation);
CompositionEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CompositionEventWrappingImplementation._wrap$ctor.prototype = CompositionEventWrappingImplementation.prototype;
function CompositionEventWrappingImplementation() {}
// ********** Code for CustomEventWrappingImplementation **************
$inherits(CustomEventWrappingImplementation, EventWrappingImplementation);
CustomEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CustomEventWrappingImplementation._wrap$ctor.prototype = CustomEventWrappingImplementation.prototype;
function CustomEventWrappingImplementation() {}
// ********** Code for DeviceMotionEventWrappingImplementation **************
$inherits(DeviceMotionEventWrappingImplementation, EventWrappingImplementation);
DeviceMotionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
DeviceMotionEventWrappingImplementation._wrap$ctor.prototype = DeviceMotionEventWrappingImplementation.prototype;
function DeviceMotionEventWrappingImplementation() {}
// ********** Code for DeviceOrientationEventWrappingImplementation **************
$inherits(DeviceOrientationEventWrappingImplementation, EventWrappingImplementation);
DeviceOrientationEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
DeviceOrientationEventWrappingImplementation._wrap$ctor.prototype = DeviceOrientationEventWrappingImplementation.prototype;
function DeviceOrientationEventWrappingImplementation() {}
// ********** Code for FilteredElementList **************
function FilteredElementList(node) {
  this._node = node;
  this._childNodes = node.get$nodes();
}
FilteredElementList.prototype.get$_filtered = function() {
  return ListFactory.ListFactory$from$factory(this._childNodes.filter((function (n) {
    return !!(n && n.is$html_Element());
  })
  ));
}
FilteredElementList.prototype.get$first = function() {
  var $$list = this._childNodes;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var node = $$i.next$0();
    if (!!(node && node.is$html_Element())) {
      return node;
    }
  }
  return null;
}
FilteredElementList.prototype.forEach = function(f) {
  this.get$_filtered().forEach$1(f);
}
FilteredElementList.prototype.$setindex = function(index, value) {
  this.$index(index).replaceWith(value);
}
FilteredElementList.prototype.add = function(value) {
  this._childNodes.add(value);
}
FilteredElementList.prototype.get$add = function() {
  return this.add.bind(this);
}
FilteredElementList.prototype.addAll = function(collection) {
  collection.forEach(this.get$add());
}
FilteredElementList.prototype.clear = function() {
  this._childNodes.clear();
}
FilteredElementList.prototype.filter = function(f) {
  return this.get$_filtered().filter$1(f);
}
FilteredElementList.prototype.get$length = function() {
  return this.get$_filtered().get$length();
}
FilteredElementList.prototype.$index = function(index) {
  return this.get$_filtered().$index(index);
}
FilteredElementList.prototype.iterator = function() {
  return this.get$_filtered().iterator();
}
FilteredElementList.prototype.add$1 = FilteredElementList.prototype.add;
FilteredElementList.prototype.clear$0 = FilteredElementList.prototype.clear;
FilteredElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
FilteredElementList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for DocumentFragmentWrappingImplementation **************
$inherits(DocumentFragmentWrappingImplementation, NodeWrappingImplementation);
DocumentFragmentWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
DocumentFragmentWrappingImplementation._wrap$ctor.prototype = DocumentFragmentWrappingImplementation.prototype;
function DocumentFragmentWrappingImplementation() {}
DocumentFragmentWrappingImplementation.prototype.is$html_Element = function(){return true};
DocumentFragmentWrappingImplementation.prototype.get$elements = function() {
  if (this._elements == null) {
    this._elements = new FilteredElementList(this);
  }
  return this._elements;
}
DocumentFragmentWrappingImplementation.prototype.set$innerHTML = function(value) {
  this.get$nodes().clear();
  var e = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
  e.set$innerHTML(value);
  var nodes = ListFactory.ListFactory$from$factory(e.get$nodes());
  this.get$nodes().addAll(nodes);
}
DocumentFragmentWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new ElementEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
DocumentFragmentWrappingImplementation.prototype.query = function(selectors) {
  return LevelDom.wrapElement(this._ptr.querySelector(selectors));
}
DocumentFragmentWrappingImplementation.prototype.get$firstElementChild = function() {
  return this.get$elements().first();
}
// ********** Code for DocumentEventsImplementation **************
$inherits(DocumentEventsImplementation, ElementEventsImplementation);
DocumentEventsImplementation._wrap$ctor = function(_ptr) {
  ElementEventsImplementation._wrap$ctor.call(this, _ptr);
}
DocumentEventsImplementation._wrap$ctor.prototype = DocumentEventsImplementation.prototype;
function DocumentEventsImplementation() {}
// ********** Code for DocumentWrappingImplementation **************
$inherits(DocumentWrappingImplementation, ElementWrappingImplementation);
DocumentWrappingImplementation._wrap$ctor = function(_documentPtr, ptr) {
  this._documentPtr = _documentPtr;
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
  this._documentPtr.get$dynamic().set$dartObjectLocalStorage(this);
}
DocumentWrappingImplementation._wrap$ctor.prototype = DocumentWrappingImplementation.prototype;
function DocumentWrappingImplementation() {}
DocumentWrappingImplementation.prototype.is$html_Element = function(){return true};
DocumentWrappingImplementation.prototype.get$on = function() {
  if (null == this._on) {
    this._on = new DocumentEventsImplementation._wrap$ctor(this._documentPtr);
  }
  return this._on;
}
// ********** Code for _ChildrenElementList **************
_ChildrenElementList._wrap$ctor = function(element) {
  this._element = element;
  this._childElements = element.get$children();
}
_ChildrenElementList._wrap$ctor.prototype = _ChildrenElementList.prototype;
function _ChildrenElementList() {}
_ChildrenElementList.prototype._toList = function() {
  var output = new Array(this._childElements.get$length());
  for (var i = (0), len = this._childElements.get$length();
   i < len; i++) {
    output.$setindex(i, LevelDom.wrapElement(this._childElements.$index(i)));
  }
  return output;
}
_ChildrenElementList.prototype.get$first = function() {
  return LevelDom.wrapElement(this._element.get$firstElementChild());
}
_ChildrenElementList.prototype.forEach = function(f) {
  return this._toList().forEach$1(f);
}
_ChildrenElementList.prototype.filter = function(f) {
  return new _ElementList(this._toList().filter$1(f));
}
_ChildrenElementList.prototype.get$length = function() {
  return this._childElements.get$length();
}
_ChildrenElementList.prototype.$index = function(index) {
  return LevelDom.wrapElement(this._childElements.$index(index));
}
_ChildrenElementList.prototype.$setindex = function(index, value) {
  this._element.replaceChild(LevelDom.unwrap(value), this._childElements.item(index));
}
_ChildrenElementList.prototype.add = function(value) {
  this._element.appendChild(LevelDom.unwrap(value));
  return value;
}
_ChildrenElementList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenElementList.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var element = $$i.next$0();
    this._element.appendChild(LevelDom.unwrap(element));
  }
}
_ChildrenElementList.prototype.clear = function() {
  this._element.set$textContent("");
}
_ChildrenElementList.prototype.add$1 = _ChildrenElementList.prototype.add;
_ChildrenElementList.prototype.clear$0 = _ChildrenElementList.prototype.clear;
_ChildrenElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ChildrenElementList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ListWrapper **************
function _ListWrapper() {}
_ListWrapper.prototype.iterator = function() {
  return this._list.iterator();
}
_ListWrapper.prototype.forEach = function(f) {
  return this._list.forEach(f);
}
_ListWrapper.prototype.filter = function(f) {
  return this._list.filter$1(f);
}
_ListWrapper.prototype.get$length = function() {
  return this._list.get$length();
}
_ListWrapper.prototype.$index = function(index) {
  return this._list.$index(index);
}
_ListWrapper.prototype.$setindex = function(index, value) {
  this._list.$setindex(index, value);
}
_ListWrapper.prototype.add = function(value) {
  return this._list.add(value);
}
_ListWrapper.prototype.addAll = function(collection) {
  return this._list.addAll(collection);
}
_ListWrapper.prototype.clear = function() {
  return this._list.clear();
}
_ListWrapper.prototype.get$first = function() {
  return this._list.$index((0));
}
_ListWrapper.prototype.add$1 = _ListWrapper.prototype.add;
_ListWrapper.prototype.clear$0 = _ListWrapper.prototype.clear;
_ListWrapper.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ListWrapper_html_Element **************
$inherits(_ListWrapper_html_Element, _ListWrapper);
function _ListWrapper_html_Element(_list) {
  this._list = _list;
}
_ListWrapper_html_Element.prototype.add$1 = _ListWrapper_html_Element.prototype.add;
_ListWrapper_html_Element.prototype.clear$0 = _ListWrapper_html_Element.prototype.clear;
_ListWrapper_html_Element.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper_html_Element.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ElementList **************
$inherits(_ElementList, _ListWrapper_html_Element);
function _ElementList(list) {
  _ListWrapper_html_Element.call(this, list);
}
_ElementList.prototype.filter = function(f) {
  return new _ElementList(_ListWrapper_html_Element.prototype.filter.call(this, f));
}
_ElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for ErrorEventWrappingImplementation **************
$inherits(ErrorEventWrappingImplementation, EventWrappingImplementation);
ErrorEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
ErrorEventWrappingImplementation._wrap$ctor.prototype = ErrorEventWrappingImplementation.prototype;
function ErrorEventWrappingImplementation() {}
// ********** Code for _EventListenerWrapper **************
function _EventListenerWrapper(raw, wrapped, useCapture) {
  this.raw = raw;
  this.wrapped = wrapped;
  this.useCapture = useCapture;
}
// ********** Code for EventListenerListImplementation **************
function EventListenerListImplementation(_ptr, _type) {
  this._ptr = _ptr;
  this._type = _type;
  this._wrappers = new Array();
}
EventListenerListImplementation.prototype.get$_ptr = function() { return this._ptr; };
EventListenerListImplementation.prototype.add = function(listener, useCapture) {
  this._add(listener, useCapture);
  return this;
}
EventListenerListImplementation.prototype._add = function(listener, useCapture) {
  this._ptr.addEventListener$3(this._type, this._findOrAddWrapper(listener, useCapture), useCapture);
}
EventListenerListImplementation.prototype._findOrAddWrapper = function(listener, useCapture) {
  var $0;
  if (null == this._wrappers) {
    this._wrappers = [];
  }
  else {
    var $$list = this._wrappers;
    for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
      var wrapper = $$i.next$0();
      if ((($0 = wrapper.raw) == null ? null == (listener) : $0 === listener) && $eq(wrapper.useCapture, useCapture)) {
        return wrapper.wrapped;
      }
    }
  }
  var wrapped = (function (e) {
    listener(LevelDom.wrapEvent(e));
  })
  ;
  this._wrappers.add(new _EventListenerWrapper(listener, wrapped, useCapture));
  return wrapped;
}
EventListenerListImplementation.prototype.add$1 = function($0) {
  return this.add(to$call$1($0), false);
};
// ********** Code for HashChangeEventWrappingImplementation **************
$inherits(HashChangeEventWrappingImplementation, EventWrappingImplementation);
HashChangeEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
HashChangeEventWrappingImplementation._wrap$ctor.prototype = HashChangeEventWrappingImplementation.prototype;
function HashChangeEventWrappingImplementation() {}
// ********** Code for KeyboardEventWrappingImplementation **************
$inherits(KeyboardEventWrappingImplementation, UIEventWrappingImplementation);
KeyboardEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
KeyboardEventWrappingImplementation._wrap$ctor.prototype = KeyboardEventWrappingImplementation.prototype;
function KeyboardEventWrappingImplementation() {}
// ********** Code for MessageEventWrappingImplementation **************
$inherits(MessageEventWrappingImplementation, EventWrappingImplementation);
MessageEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MessageEventWrappingImplementation._wrap$ctor.prototype = MessageEventWrappingImplementation.prototype;
function MessageEventWrappingImplementation() {}
// ********** Code for MouseEventWrappingImplementation **************
$inherits(MouseEventWrappingImplementation, UIEventWrappingImplementation);
MouseEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MouseEventWrappingImplementation._wrap$ctor.prototype = MouseEventWrappingImplementation.prototype;
function MouseEventWrappingImplementation() {}
// ********** Code for MutationEventWrappingImplementation **************
$inherits(MutationEventWrappingImplementation, EventWrappingImplementation);
MutationEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MutationEventWrappingImplementation._wrap$ctor.prototype = MutationEventWrappingImplementation.prototype;
function MutationEventWrappingImplementation() {}
// ********** Code for _ChildrenNodeList **************
_ChildrenNodeList._wrap$ctor = function(node) {
  this._node = node;
  this._childNodes = node.get$childNodes();
}
_ChildrenNodeList._wrap$ctor.prototype = _ChildrenNodeList.prototype;
function _ChildrenNodeList() {}
_ChildrenNodeList.prototype._toList = function() {
  var output = new Array(this._childNodes.get$length());
  for (var i = (0), len = this._childNodes.get$length();
   i < len; i++) {
    output.$setindex(i, LevelDom.wrapNode(this._childNodes.$index(i)));
  }
  return output;
}
_ChildrenNodeList.prototype.get$first = function() {
  return LevelDom.wrapNode(this._node.get$firstChild());
}
_ChildrenNodeList.prototype.forEach = function(f) {
  return this._toList().forEach$1(f);
}
_ChildrenNodeList.prototype.filter = function(f) {
  return new _NodeList(this._toList().filter$1(f));
}
_ChildrenNodeList.prototype.get$length = function() {
  return this._childNodes.get$length();
}
_ChildrenNodeList.prototype.$index = function(index) {
  return LevelDom.wrapNode(this._childNodes.$index(index));
}
_ChildrenNodeList.prototype.$setindex = function(index, value) {
  this._node.replaceChild(LevelDom.unwrap(value), this._childNodes.$index(index));
}
_ChildrenNodeList.prototype.add = function(value) {
  this._node.appendChild(LevelDom.unwrap(value));
  return value;
}
_ChildrenNodeList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenNodeList.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var node = $$i.next$0();
    this._node.appendChild(LevelDom.unwrap(node));
  }
}
_ChildrenNodeList.prototype.clear = function() {
  this._node.set$textContent("");
}
_ChildrenNodeList.prototype.add$1 = _ChildrenNodeList.prototype.add;
_ChildrenNodeList.prototype.clear$0 = _ChildrenNodeList.prototype.clear;
_ChildrenNodeList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ChildrenNodeList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ListWrapper_html_Node **************
$inherits(_ListWrapper_html_Node, _ListWrapper);
function _ListWrapper_html_Node(_list) {
  this._list = _list;
}
_ListWrapper_html_Node.prototype.add$1 = _ListWrapper_html_Node.prototype.add;
_ListWrapper_html_Node.prototype.clear$0 = _ListWrapper_html_Node.prototype.clear;
_ListWrapper_html_Node.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper_html_Node.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _NodeList **************
$inherits(_NodeList, _ListWrapper_html_Node);
function _NodeList(list) {
  _ListWrapper_html_Node.call(this, list);
}
_NodeList.prototype.filter = function(f) {
  return new _NodeList(_ListWrapper_html_Node.prototype.filter.call(this, f));
}
_NodeList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for ObjectElementWrappingImplementation **************
$inherits(ObjectElementWrappingImplementation, ElementWrappingImplementation);
ObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ObjectElementWrappingImplementation._wrap$ctor.prototype = ObjectElementWrappingImplementation.prototype;
function ObjectElementWrappingImplementation() {}
ObjectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for OverflowEventWrappingImplementation **************
$inherits(OverflowEventWrappingImplementation, EventWrappingImplementation);
OverflowEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
OverflowEventWrappingImplementation._wrap$ctor.prototype = OverflowEventWrappingImplementation.prototype;
function OverflowEventWrappingImplementation() {}
// ********** Code for PageTransitionEventWrappingImplementation **************
$inherits(PageTransitionEventWrappingImplementation, EventWrappingImplementation);
PageTransitionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
PageTransitionEventWrappingImplementation._wrap$ctor.prototype = PageTransitionEventWrappingImplementation.prototype;
function PageTransitionEventWrappingImplementation() {}
// ********** Code for PopStateEventWrappingImplementation **************
$inherits(PopStateEventWrappingImplementation, EventWrappingImplementation);
PopStateEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
PopStateEventWrappingImplementation._wrap$ctor.prototype = PopStateEventWrappingImplementation.prototype;
function PopStateEventWrappingImplementation() {}
// ********** Code for ProgressEventWrappingImplementation **************
$inherits(ProgressEventWrappingImplementation, EventWrappingImplementation);
ProgressEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProgressEventWrappingImplementation._wrap$ctor.prototype = ProgressEventWrappingImplementation.prototype;
function ProgressEventWrappingImplementation() {}
// ********** Code for StorageEventWrappingImplementation **************
$inherits(StorageEventWrappingImplementation, EventWrappingImplementation);
StorageEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
StorageEventWrappingImplementation._wrap$ctor.prototype = StorageEventWrappingImplementation.prototype;
function StorageEventWrappingImplementation() {}
// ********** Code for SVGDocumentWrappingImplementation **************
$inherits(SVGDocumentWrappingImplementation, DocumentWrappingImplementation);
SVGDocumentWrappingImplementation._wrap$ctor = function(ptr) {
  DocumentWrappingImplementation._wrap$ctor.call(this, ptr, ptr.get$rootElement());
}
SVGDocumentWrappingImplementation._wrap$ctor.prototype = SVGDocumentWrappingImplementation.prototype;
function SVGDocumentWrappingImplementation() {}
SVGDocumentWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGSVGElementWrappingImplementation **************
$inherits(SVGSVGElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSVGElementWrappingImplementation._wrap$ctor.prototype = SVGSVGElementWrappingImplementation.prototype;
function SVGSVGElementWrappingImplementation() {}
SVGSVGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TextEventWrappingImplementation **************
$inherits(TextEventWrappingImplementation, UIEventWrappingImplementation);
TextEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextEventWrappingImplementation._wrap$ctor.prototype = TextEventWrappingImplementation.prototype;
function TextEventWrappingImplementation() {}
// ********** Code for TouchEventWrappingImplementation **************
$inherits(TouchEventWrappingImplementation, UIEventWrappingImplementation);
TouchEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TouchEventWrappingImplementation._wrap$ctor.prototype = TouchEventWrappingImplementation.prototype;
function TouchEventWrappingImplementation() {}
// ********** Code for TransitionEventWrappingImplementation **************
$inherits(TransitionEventWrappingImplementation, EventWrappingImplementation);
TransitionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TransitionEventWrappingImplementation._wrap$ctor.prototype = TransitionEventWrappingImplementation.prototype;
function TransitionEventWrappingImplementation() {}
// ********** Code for WheelEventWrappingImplementation **************
$inherits(WheelEventWrappingImplementation, UIEventWrappingImplementation);
WheelEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
WheelEventWrappingImplementation._wrap$ctor.prototype = WheelEventWrappingImplementation.prototype;
function WheelEventWrappingImplementation() {}
// ********** Code for WindowWrappingImplementation **************
$inherits(WindowWrappingImplementation, EventTargetWrappingImplementation);
WindowWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WindowWrappingImplementation._wrap$ctor.prototype = WindowWrappingImplementation.prototype;
function WindowWrappingImplementation() {}
WindowWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
WindowWrappingImplementation.prototype.clearTimeout = function(handle) {
  if (null == handle) {
    this._ptr.clearTimeout$0();
  }
  else {
    this._ptr.clearTimeout(handle);
  }
}
WindowWrappingImplementation.prototype.setTimeout = function(handler, timeout) {
  return this._ptr.setTimeout$2(handler, timeout);
}
WindowWrappingImplementation.prototype.clearTimeout$0 = WindowWrappingImplementation.prototype.clearTimeout;
WindowWrappingImplementation.prototype.setTimeout$2 = function($0, $1) {
  return this.setTimeout(to$call$0($0), $1);
};
// ********** Code for XMLHttpRequestProgressEventWrappingImplementation **************
$inherits(XMLHttpRequestProgressEventWrappingImplementation, ProgressEventWrappingImplementation);
XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor = function(ptr) {
  ProgressEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor.prototype = XMLHttpRequestProgressEventWrappingImplementation.prototype;
function XMLHttpRequestProgressEventWrappingImplementation() {}
// ********** Code for top level **************
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
//  ********** Library html **************
// ********** Code for top level **************
var secretWindow;
var secretDocument;
function html_get$window() {
  if (null == $globals.secretWindow) {
    LevelDom.initialize();
  }
  return $globals.secretWindow;
}
function html_get$document() {
  if (null == $globals.secretWindow) {
    LevelDom.initialize();
  }
  return $globals.secretDocument;
}
//  ********** Library json **************
// ********** Code for top level **************
//  ********** Library Reactive Dart **************
// ********** Code for Observable **************
function Observable() {}
Observable.create = function(f) {
  return new _ChainableIObservableImplementation(f);
}
Observable.first = function(source) {
  return Observable.create((function (o) {
    source.subscribe((function (v) {
      o.next(v);
      o.complete();
    })
    , (function () {
      return o.complete();
    })
    , (function (e) {
      return o.error(e);
    })
    );
  })
  );
}
Observable.throttle = function(source, timeInMilliseconds) {
  return Observable.create((function (o) {
    var handle;
    var ignoreValue = false;
    var last;
    function checker() {
      ignoreValue = false;
      if ($ne(last)) o.next(last);
    }
    source.subscribe((function (v) {
      if (!ignoreValue) {
        last = v;
        ignoreValue = true;
        handle = html_get$window().setTimeout(checker, timeInMilliseconds);
      }
      else {
        html_get$window().clearTimeout(handle);
        last = v;
        handle = html_get$window().setTimeout(checker, timeInMilliseconds);
      }
    })
    , (function () {
      return o.complete();
    })
    , (function (e) {
      return o.error(e);
    })
    );
  })
  );
}
Observable.fromDOMEvent = function(event) {
  return Observable.create((function (o) {
    return event.add((function (e) {
      return o.next(e);
    })
    , false);
  })
  );
}
Observable.throwE = function(e) {
  return Observable.create((function (o) {
    return o.error(e);
  })
  );
}
Observable.where = function(source, f) {
  return Observable.create((function (o) {
    source.subscribe((function (v) {
      if (f(v)) o.next(v);
    })
    , (function () {
      return o.complete();
    })
    , (function (e) {
      return o.error(e);
    })
    );
  })
  );
}
Observable.fromList = function(l) {
  if (l == null) return Observable.throwE(const$0006);
  return Observable.create((function (o) {
    l.forEach$1((function (el) {
      return o.next(el);
    })
    );
    o.complete();
  })
  );
}
// ********** Code for _ChainableIObservableImplementation **************
function _ChainableIObservableImplementation(oFunc) {
  var $this = this; // closure support
  this.oFunc = oFunc;
  this.observers = new Array();
  this.mainObserver = new _DefaultObserver((function (n) {
    return $this.observers.forEach$1((function (o) {
      return o.next$1(n);
    })
    );
  })
  , (function () {
    $this.observers.forEach$1((function (o) {
      return o.complete$0();
    })
    );
    $this.dispose();
  })
  , (function (e) {
    $this.err = e;
    $this.observers.forEach$1((function (o) {
      return o.error$1(e);
    })
    );
    $this.dispose();
  })
  );
}
_ChainableIObservableImplementation.prototype.where = function(f) {
  return Observable.where(this, f);
}
_ChainableIObservableImplementation.prototype.throttle = function(milliseconds) {
  return Observable.throttle(this, milliseconds);
}
_ChainableIObservableImplementation.prototype.first = function() {
  return Observable.first(this);
}
_ChainableIObservableImplementation.prototype.get$first = function() {
  return this.first.bind(this);
}
_ChainableIObservableImplementation.prototype.subscribe = function(next, complete, error) {
  if (this.err != null) {
    if (error != null) error(this.err);
    return;
  }
  if (this.mainObserver == null) {
    if (complete != null) complete();
  }
  if ((typeof(next) == 'function')) {
    return this._addObserver(new _DefaultObserver(next, complete, error));
  }
  else if (!!(next && next.is$IObserver())) {
    return this._addObserver(next);
  }
  else {
    $throw(new ExceptionImplementation("Parameter 'next' must be a Function or a IObserver."));
  }
}
_ChainableIObservableImplementation.prototype._addObserver = function(o) {
  this.observers.add(o);
  if (this.observers.get$length() == (1)) this.oFunc.call$1(this.mainObserver);
  return new _UnsubscriberWrapper(this, o);
}
_ChainableIObservableImplementation.prototype.dispose = function() {
  this.observers.clear();
  this.mainObserver = null;
  this.oFunc = null;
}
_ChainableIObservableImplementation.prototype.subscribe$1 = function($0) {
  return this.subscribe($0, to$call$0(null), to$call$1(null));
};
_ChainableIObservableImplementation.prototype.subscribe$2 = function($0, $1) {
  return this.subscribe($0, to$call$0($1), to$call$1(null));
};
// ********** Code for _UnsubscriberWrapper **************
function _UnsubscriberWrapper(factoryObservableReference, observer) {
  this.factoryObservableReference = factoryObservableReference;
  this.observer = observer;
}
// ********** Code for _DefaultObserver **************
function _DefaultObserver(next, complete, error) {
  this._assignedHash = $globals._DefaultObserver__hashNum++;
  this.nextFunc = next;
  this.completeFunc = complete == null ? (function () {

  })
   : complete;
  this.errorFunc = error == null ? (function (_) {

  })
   : error;
}
_DefaultObserver.prototype.is$IObserver = function(){return true};
_DefaultObserver.prototype.next = function(value) {
  return this.nextFunc.call$1(value);
}
_DefaultObserver.prototype.error = function(error) {
  return this.errorFunc.call$1(error);
}
_DefaultObserver.prototype.complete = function() {
  return this.completeFunc.call$0();
}
_DefaultObserver.prototype.complete$0 = _DefaultObserver.prototype.complete;
_DefaultObserver.prototype.error$1 = _DefaultObserver.prototype.error;
_DefaultObserver.prototype.next$1 = _DefaultObserver.prototype.next;
// ********** Code for top level **************
//  ********** Library throttle_demo **************
// ********** Code for throttle_demo **************
function throttle_demo() {
  this.awords = const$0003;
  this.resultsList = html_get$document().query("#searchresults");
}
throttle_demo.prototype.run = function() {
  var $this = this; // closure support
  var tbInput = html_get$document().query("#tbInput");
  Observable.fromDOMEvent(tbInput.get$on().get$keyUp()).throttle((400)).subscribe$1((function (e) {
    return $this.displayResults(tbInput.get$value());
  })
  );
}
throttle_demo.prototype.displayResults = function(beginsWith) {
  var $this = this; // closure support
  var s = new StringBufferImpl("");
  dart_core_print(("" + beginsWith));
  if (beginsWith.isEmpty()) {
    this.resultsList.set$innerHTML("<li></li>");
    return;
  }
  Observable.fromList(this.awords).where((function (w) {
    return w.startsWith(beginsWith);
  })
  ).subscribe$2((function (word) {
    return s.add(("<li>" + word + "</li>"));
  })
  , (function () {
    var $0;
    return ($this.resultsList.set$innerHTML(($0 = s.toString())), $0);
  })
  );
}
// ********** Code for top level **************
function main() {
  new throttle_demo().run();
}
// 97 dynamic types.
// 501 types
// 41 !leaf
(function(){
  var v0/*HTMLInputElement*/ = 'HTMLInputElement|HTMLIsIndexElement';
  var v1/*HTMLElement*/ = [v0/*HTMLInputElement*/,'HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLAudioElement|HTMLVideoElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement'].join('|');
  var v2/*CharacterData*/ = 'CharacterData|Comment|Text|CDATASection';
  var v3/*Document*/ = 'Document|HTMLDocument|SVGDocument';
  var v4/*Element*/ = [v1/*HTMLElement*/,'Element|SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement|SVGCircleElement|SVGClipPathElement|SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTextContentElement|SVGTextPathElement|SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement'].join('|');
  var v5/*AbstractWorker*/ = 'AbstractWorker|SharedWorker|Worker';
  var v6/*AudioParam*/ = 'AudioParam|AudioGain';
  var v7/*CSSValueList*/ = 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue';
  var v8/*DOMTokenList*/ = 'DOMTokenList|DOMSettableTokenList';
  var v9/*HTMLCollection*/ = 'HTMLCollection|HTMLOptionsCollection|HTMLPropertiesCollection';
  var v10/*IDBRequest*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v11/*Node*/ = [v2/*CharacterData*/,v3/*Document*/,v4/*Element*/,'Node|Attr|DocumentFragment|DocumentType|Entity|EntityReference|Notation|ProcessingInstruction'].join('|');
  var v12/*WorkerContext*/ = 'WorkerContext|DedicatedWorkerContext|SharedWorkerContext';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['AbstractWorker', v5/*AbstractWorker*/]
    , ['AudioParam', v6/*AudioParam*/]
    , ['CSSValueList', v7/*CSSValueList*/]
    , ['CharacterData', v2/*CharacterData*/]
    , ['DOMTokenList', v8/*DOMTokenList*/]
    , ['Document', v3/*Document*/]
    , ['HTMLInputElement', v0/*HTMLInputElement*/]
    , ['HTMLElement', v1/*HTMLElement*/]
    , ['Element', v4/*Element*/]
    , ['HTMLCollection', v9/*HTMLCollection*/]
    , ['IDBRequest', v10/*IDBRequest*/]
    , ['Node', v11/*Node*/]
    , ['WorkerContext', v12/*WorkerContext*/]
    , ['DOMType', [v5/*AbstractWorker*/,v6/*AudioParam*/,v7/*CSSValueList*/,v8/*DOMTokenList*/,v9/*HTMLCollection*/,v10/*IDBRequest*/,v11/*Node*/,v12/*WorkerContext*/,'DOMType|ArrayBuffer|ArrayBufferView|DataView|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|AudioBuffer|AudioContext|AudioListener|AudioNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|AudioSourceNode|AudioBufferSourceNode|MediaElementAudioSourceNode|BiquadFilterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|HighPass2FilterNode|JavaScriptAudioNode|LowPass2FilterNode|RealtimeAnalyserNode|WaveShaperNode|BarInfo|Blob|File|CSSRule|CSSCharsetRule|CSSFontFaceRule|CSSImportRule|CSSMediaRule|CSSPageRule|CSSStyleRule|CSSUnknownRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule|CSSRuleList|CSSStyleDeclaration|CSSValue|CSSPrimitiveValue|SVGColor|SVGPaint|CanvasGradient|CanvasPattern|CanvasPixelArray|CanvasRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext|ClientRect|ClientRectList|Clipboard|Coordinates|Counter|Crypto|DOMApplicationCache|DOMException|DOMFileSystem|DOMFileSystemSync|DOMFormData|DOMImplementation|DOMMimeType|DOMMimeTypeArray|DOMParser|DOMPlugin|DOMPluginArray|DOMSelection|DOMURL|DOMWindow|DataTransferItem|DataTransferItemList|Database|DatabaseSync|DirectoryReader|DirectoryReaderSync|ElementTimeControl|ElementTraversal|Entry|DirectoryEntry|FileEntry|EntryArray|EntryArraySync|EntrySync|DirectoryEntrySync|FileEntrySync|Event|AudioProcessingEvent|BeforeLoadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|HashChangeEvent|IDBVersionChangeEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|XMLHttpRequestProgressEvent|SpeechInputEvent|StorageEvent|TrackEvent|UIEvent|CompositionEvent|KeyboardEvent|MouseEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent|EventException|EventSource|EventTarget|FileError|FileException|FileList|FileReader|FileReaderSync|FileWriter|FileWriterSync|Geolocation|Geoposition|HTMLAllCollection|History|IDBAny|IDBCursor|IDBCursorWithValue|IDBDatabase|IDBDatabaseError|IDBDatabaseException|IDBFactory|IDBIndex|IDBKey|IDBKeyRange|IDBObjectStore|IDBTransaction|ImageData|InjectedScriptHost|InspectorFrontendHost|JavaScriptCallFrame|Location|MediaController|MediaError|MediaList|MediaQueryList|MediaQueryListListener|MemoryInfo|MessageChannel|MessagePort|Metadata|MutationCallback|MutationRecord|NamedNodeMap|Navigator|NodeFilter|NodeIterator|NodeList|NodeSelector|Notification|NotificationCenter|OESStandardDerivatives|OESTextureFloat|OESVertexArrayObject|OperationNotAllowedException|Performance|PerformanceNavigation|PerformanceTiming|PointerLock|PositionError|RGBColor|Range|RangeException|Rect|SQLError|SQLException|SQLResultSet|SQLResultSetRowList|SQLTransaction|SQLTransactionSync|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGElementInstance|SVGElementInstanceList|SVGException|SVGExternalResourcesRequired|SVGFitToViewBox|SVGLangSpace|SVGLength|SVGLengthList|SVGLocatable|SVGTransformable|SVGMatrix|SVGNumber|SVGNumberList|SVGPathSeg|SVGPathSegArcAbs|SVGPathSegArcRel|SVGPathSegClosePath|SVGPathSegCurvetoCubicAbs|SVGPathSegCurvetoCubicRel|SVGPathSegCurvetoCubicSmoothAbs|SVGPathSegCurvetoCubicSmoothRel|SVGPathSegCurvetoQuadraticAbs|SVGPathSegCurvetoQuadraticRel|SVGPathSegCurvetoQuadraticSmoothAbs|SVGPathSegCurvetoQuadraticSmoothRel|SVGPathSegLinetoAbs|SVGPathSegLinetoHorizontalAbs|SVGPathSegLinetoHorizontalRel|SVGPathSegLinetoRel|SVGPathSegLinetoVerticalAbs|SVGPathSegLinetoVerticalRel|SVGPathSegMovetoAbs|SVGPathSegMovetoRel|SVGPathSegList|SVGPoint|SVGPointList|SVGPreserveAspectRatio|SVGRect|SVGRenderingIntent|SVGStringList|SVGStylable|SVGFilterPrimitiveStandardAttributes|SVGTests|SVGTransform|SVGTransformList|SVGURIReference|SVGUnitTypes|SVGZoomAndPan|SVGViewSpec|Screen|ScriptProfile|ScriptProfileNode|SpeechInputResult|SpeechInputResultList|Storage|StorageInfo|StyleMedia|StyleSheet|CSSStyleSheet|StyleSheetList|TextMetrics|TextTrack|TextTrackCue|TextTrackCueList|TextTrackList|TimeRanges|Touch|TouchList|TreeWalker|ValidityState|WebGLActiveInfo|WebGLBuffer|WebGLCompressedTextures|WebGLContextAttributes|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation|WebGLVertexArrayObjectOES|WebKitAnimation|WebKitAnimationList|WebKitBlobBuilder|WebKitCSSMatrix|WebKitMutationObserver|WebKitNamedFlow|WebKitPoint|WebSocket|WorkerLocation|WorkerNavigator|XMLHttpRequest|XMLHttpRequestException|XMLHttpRequestUpload|XMLSerializer|XPathEvaluator|XPathException|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor'].join('|')]
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
  $globals._DefaultObserver__hashNum = (0);
}
var const$0000 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0001 = Object.create(NoMoreElementsException.prototype, {});
var const$0002 = Object.create(IllegalAccessException.prototype, {});
var const$0003 = ImmutableList.ImmutableList$from$factory(["a", "apple", "arch", "able", "apparently", "about", "awkward", "always", "are", "around", "any", "anyway", "allow", "allowance", "allowable"]);
var const$0005 = Object.create(EmptyQueueException.prototype, {});
var const$0006 = Object.create(NullPointerException.prototype, {});
var $globals = {};
$static_init();
main();