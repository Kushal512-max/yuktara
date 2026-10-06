// scripts/data_py_web.js
// 20 MCQs per unit for Python Programming (4 units) and Web Development (2 units)

module.exports = {
  "py-basics": [
    {
      q: "What will type(5) return in Python 3?",
      options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "<class 'digit'>"],
      answer: 0,
      explanation: "Integer literals in Python 3 are instances of the built-in 'int' class.",
      difficulty: "Beginner"
    },
    {
      q: "What is the output of the expression 7 // 2 in Python?",
      options: ["3.5", "3", "4", "3.0"],
      answer: 1,
      explanation: "The // operator performs floor division, rounding down to the nearest integer (3).",
      difficulty: "Beginner"
    },
    {
      q: "What does the expression 2 ** 3 evaluate to in Python?",
      options: ["6", "8", "9", "5"],
      answer: 1,
      explanation: "The ** operator computes exponentiation: 2 cubed equals 8.",
      difficulty: "Beginner"
    },
    {
      q: "What is the result of 'Python'[1:4] string slicing?",
      options: ["'Pyt'", "'yth'", "'ytho'", "'Pyth'"],
      answer: 1,
      explanation: "Slicing [start:end] includes start index 1 ('y') up to but excluding index 4: 'yth'.",
      difficulty: "Beginner"
    },
    {
      q: "Which built-in function is used to take textual input from the user in Python 3?",
      options: ["scan()", "read()", "input()", "cin>>"],
      answer: 2,
      explanation: "input() pauses execution, reads a line of input from stdin, and returns it as a string.",
      difficulty: "Beginner"
    },
    {
      q: "What does type(3.14) return in Python?",
      options: ["<class 'double'>", "<class 'float'>", "<class 'real'>", "<class 'decimal'>"],
      answer: 1,
      explanation: "Numbers with decimal points are represented by Python's 'float' data type.",
      difficulty: "Beginner"
    },
    {
      q: "What is the boolean evaluation of bool([]) in Python?",
      options: ["True", "False", "None", "Error"],
      answer: 1,
      explanation: "Empty sequences (empty lists, tuples, strings, dictionaries) evaluate to False (falsy).",
      difficulty: "Beginner"
    },
    {
      q: "What is the output of 'Hello' * 3 in Python?",
      options: ["'HelloHelloHello'", "SyntaxError", "['Hello', 'Hello', 'Hello']", "'Hello 3'"],
      answer: 0,
      explanation: "Multiplying a string by an integer repeats the string that many times.",
      difficulty: "Beginner"
    },
    {
      q: "Which character is used to write single-line comments in Python?",
      options: ["//", "/*", "#", "--"],
      answer: 2,
      explanation: "The '#' symbol begins a single-line comment in Python.",
      difficulty: "Beginner"
    },
    {
      q: "What will float('10.5') produce?",
      options: ["10", "10.5", "TypeError", "10.50000000"],
      answer: 1,
      explanation: "float() converts a valid numerical string into a floating-point number.",
      difficulty: "Beginner"
    },
    {
      q: "What does formatted string syntax f'{x:.2f}' do when x = 3.14159?",
      options: ["Formats x with 2 decimal places: '3.14'", "Rounds x to 3", "Prints x twice", "Throws format error"],
      answer: 0,
      explanation: "f-strings with .2f format floating-point numbers to two digits after the decimal point.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the output of 10 % 3 in Python?",
      options: ["3", "1", "0.33", "0"],
      answer: 1,
      explanation: "The modulo operator % returns the remainder of 10 divided by 3, which is 1.",
      difficulty: "Beginner"
    },
    {
      q: "How are variables declared in Python?",
      options: ["int x = 5;", "var x = 5;", "x = 5 (dynamically typed upon assignment)", "dim x as integer"],
      answer: 2,
      explanation: "Python is dynamically typed; variables are created automatically when assigned a value.",
      difficulty: "Beginner"
    },
    {
      q: "What does 'Python'[-1] return?",
      options: ["'P'", "'n'", "IndexError", "'-1'"],
      answer: 1,
      explanation: "Negative indices index from the end: -1 accesses the last character ('n').",
      difficulty: "Beginner"
    },
    {
      q: "What is the result of the expression 5 == 5.0 in Python?",
      options: ["True", "False", "TypeError", "None"],
      answer: 0,
      explanation: "Python compares numerical values across int and float types; 5 is numerically equal to 5.0.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the 'is' operator test in Python compared to '=='?",
      options: ["'is' tests value equality; '==' tests memory identity", "'is' tests object identity (same memory address); '==' tests value equality", "They are 100% identical", "'is' is used only for strings"],
      answer: 1,
      explanation: "'is' checks whether two variables point to the exact same object in RAM (id(a) == id(b)).",
      difficulty: "Intermediate"
    },
    {
      q: "What is the output of len('Data\\nScience') in Python?",
      options: ["13", "12", "11", "14"],
      answer: 1,
      explanation: "'\\n' is an escape sequence representing a single newline character: 4 + 1 + 7 = 12 characters.",
      difficulty: "Intermediate"
    },
    {
      q: "Which keyword converts an integer to its binary string representation?",
      options: ["bin()", "binary()", "to_bin()", "hex()"],
      answer: 0,
      explanation: "bin(10) returns '0b1010', the binary representation prefixed with '0b'.",
      difficulty: "Beginner"
    },
    {
      q: "What does the expression bool(None) return in Python?",
      options: ["True", "False", "None", "Error"],
      answer: 1,
      explanation: "None is a falsy value in Python; bool(None) returns False.",
      difficulty: "Beginner"
    },
    {
      q: "What is the result of int(True) in Python?",
      options: ["1", "0", "TypeError", "True"],
      answer: 0,
      explanation: "In Python, bool is a subclass of int, where True evaluates to 1 and False evaluates to 0.",
      difficulty: "Intermediate"
    }
  ],
  "py-control-flow": [
    {
      q: "Which keyword immediately exits the nearest enclosing loop in Python?",
      options: ["stop", "break", "continue", "pass"],
      answer: 1,
      explanation: "break terminates execution of the enclosing for or while loop prematurely.",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'continue' keyword do in a loop?",
      options: ["Terminates the loop", "Skips the remainder of the current iteration and jumps to the next iteration", "Restarts the loop from 0", "Pauses execution"],
      answer: 1,
      explanation: "continue skips remaining statements in the current iteration and proceeds with the next loop cycle.",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of the 'pass' statement in Python?",
      options: ["Passes variables to a function", "Acts as a null statement / placeholder where code is syntactically required but no action is needed", "Skips code execution", "Returns a value"],
      answer: 1,
      explanation: "pass serves as a syntactic no-op placeholder for empty functions, classes, or loops.",
      difficulty: "Beginner"
    },
    {
      q: "What values does range(1, 5) generate in a Python for loop?",
      options: ["1, 2, 3, 4, 5", "1, 2, 3, 4", "0, 1, 2, 3, 4", "1, 3, 5"],
      answer: 1,
      explanation: "range(start, stop) generates numbers starting at 1 up to but not including 5 (1, 2, 3, 4).",
      difficulty: "Beginner"
    },
    {
      q: "What happens when an 'else' block is attached to a for or while loop in Python?",
      options: ["The else block executes only if the loop is terminated by a break statement", "The else block executes when the loop finishes naturally without encountering a break", "SyntaxError", "It executes before the loop begins"],
      answer: 1,
      explanation: "Loop 'else' blocks execute upon normal loop completion, but are bypassed if 'break' triggers.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the step value in range(10, 0, -2)?",
      options: ["10", "0", "-2", "2"],
      answer: 2,
      explanation: "The third parameter in range(start, stop, step) is the step decrement (-2).",
      difficulty: "Beginner"
    },
    {
      q: "What is the output of: for i in range(3): print(i, end=' ')?",
      options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
      answer: 1,
      explanation: "range(3) defaults start to 0 and stops before 3: 0, 1, 2.",
      difficulty: "Beginner"
    },
    {
      q: "Which structure introduced in Python 3.10 enables structural pattern matching similar to switch-case?",
      options: ["switch-case", "match-case", "select-case", "choose-when"],
      answer: 1,
      explanation: "Python 3.10 introduced the match-case statement for structural pattern matching.",
      difficulty: "Intermediate"
    },
    {
      q: "How do you write a ternary conditional expression in Python?",
      options: ["condition ? val1 : val2", "val1 if condition else val2", "if condition then val1 else val2", "val1 ?: val2"],
      answer: 1,
      explanation: "Python ternary syntax is: <expression1> if <condition> else <expression2>.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the result of: 5 in [1, 2, 3, 4, 5]?",
      options: ["True", "False", "None", "5"],
      answer: 0,
      explanation: "The 'in' membership operator returns True if the element exists in the collection.",
      difficulty: "Beginner"
    },
    {
      q: "What is an infinite loop condition?",
      options: ["while False:", "while True:", "for i in []:", "if True:"],
      answer: 1,
      explanation: "while True creates an endless loop that continues until an internal break or return executes.",
      difficulty: "Beginner"
    },
    {
      q: "What will the following code print?\nx = 10\nif x > 5:\n    print('A')\nelif x > 2:\n    print('B')\nelse:\n    print('C')",
      options: ["A", "B", "C", "A and B"],
      answer: 0,
      explanation: "In an if-elif chain, the first truthy condition executes and the remaining branches are skipped: 'A'.",
      difficulty: "Beginner"
    },
    {
      q: "How many times does this loop execute?\ncount = 0\nwhile count < 5:\n    count += 2",
      options: ["5 times", "3 times (count: 0->2, 2->4, 4->6)", "2 times", "Infinite"],
      answer: 1,
      explanation: "Iterations: 1st (count becomes 2), 2nd (count becomes 4), 3rd (count becomes 6 >= 5, stops): 3 times.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the enumerate() function provide when iterating over a list?",
      options: ["Only the list elements", "Pairs of (index, element) for each item in the iterable", "The length of the list", "A reversed list"],
      answer: 1,
      explanation: "enumerate(iterable) generates tuples yielding the current loop count index and item value.",
      difficulty: "Beginner"
    },
    {
      q: "What does the zip() function do in Python?",
      options: ["Compresses files to .zip", "Aggregates elements from two or more iterables pairwise into tuples", "Sorts two lists", "Deletes duplicates"],
      answer: 1,
      explanation: "zip(list1, list2) pairs corresponding elements from both sequences into tuples.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the output of: [x for x in range(5) if x % 2 != 0]?",
      options: ["[0, 2, 4]", "[1, 3]", "[1, 2, 3, 4, 5]", "[1, 3, 5]"],
      answer: 1,
      explanation: "This list comprehension filters for odd numbers in range(5): 1 and 3.",
      difficulty: "Intermediate"
    },
    {
      q: "Can a while loop have an 'else' block in Python?",
      options: ["No, only for loops have else blocks", "Yes, it executes when the while condition becomes false (unless broken)", "Only in Python 2", "SyntaxError"],
      answer: 1,
      explanation: "while...else executes when the test condition evaluates to false, unless exited via break.",
      difficulty: "Intermediate"
    },
    {
      q: "What happens if no indentation is provided after an if statement in Python?",
      options: ["The code runs normally", "IndentationError: expected an indented block", "Warning only", "Code assumes 4 spaces automatically"],
      answer: 1,
      explanation: "Python enforces scope through indentation; missing indentation raises an IndentationError.",
      difficulty: "Beginner"
    },
    {
      q: "What is short-circuit evaluation in Python logical operators (and, or)?",
      options: ["Stopping electrical current", "Evaluating the right-hand operand only if the left-hand operand does not determine the final boolean result", "Converting booleans to integers", "Crashing on False"],
      answer: 1,
      explanation: "'and' short-circuits on first False; 'or' short-circuits on first True without evaluating further.",
      difficulty: "Intermediate"
    },
    {
      q: "What does any([False, False, True]) evaluate to?",
      options: ["True", "False", "None", "Error"],
      answer: 0,
      explanation: "any() returns True if at least one element of the iterable evaluates to True.",
      difficulty: "Beginner"
    }
  ],
  "py-functions": [
    {
      q: "Which keyword defines a function in Python?",
      options: ["func", "function", "def", "define"],
      answer: 2,
      explanation: "The 'def' keyword is used to declare and define functions in Python.",
      difficulty: "Beginner"
    },
    {
      q: "What does *args allow in a Python function definition?",
      options: ["Passing a fixed array", "Accepting an arbitrary number of positional arguments as a tuple", "Passing a dictionary", "Creating pointer variables"],
      answer: 1,
      explanation: "*args collects excess positional arguments passed to the function into a tuple.",
      difficulty: "Beginner"
    },
    {
      q: "What does **kwargs allow in a Python function definition?",
      options: ["Passing keyword arguments as a dictionary", "Passing double precision numbers", "Passing two arguments only", "Calling a function twice"],
      answer: 0,
      explanation: "**kwargs packs arbitrary named keyword arguments into a standard dictionary.",
      difficulty: "Beginner"
    },
    {
      q: "What is an anonymous function called in Python?",
      options: ["Inline function", "Lambda function", "Ghost function", "Macro"],
      answer: 1,
      explanation: "A lambda function is an anonymous inline function defined using the 'lambda' keyword.",
      difficulty: "Beginner"
    },
    {
      q: "What will a Python function return if it contains no explicit return statement?",
      options: ["0", "None", "False", "Empty string"],
      answer: 1,
      explanation: "Functions without an explicit return statement implicitly return the special object None.",
      difficulty: "Beginner"
    },
    {
      q: "What is the output of: (lambda x, y: x * y)(4, 5)?",
      options: ["9", "20", "45", "None"],
      answer: 1,
      explanation: "The lambda multiplies arguments 4 and 5, returning 20.",
      difficulty: "Beginner"
    },
    {
      q: "What keyword allows modifying a variable defined in the global scope from inside a function?",
      options: ["extern", "global", "nonlocal", "outer"],
      answer: 1,
      explanation: "The 'global' keyword informs Python to bind the variable name to the module-level global namespace.",
      difficulty: "Intermediate"
    },
    {
      q: "What keyword is used in nested functions to rebind variables in an outer (enclosing) non-global scope?",
      options: ["global", "nonlocal", "parent", "super"],
      answer: 1,
      explanation: "The 'nonlocal' keyword allows closures to modify variables in the nearest enclosing outer scope.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Docstring in Python?",
      options: ["A string representing doctors", "A string literal written as the first statement in a function, module, or class to document its purpose", "A comment starting with //", "A text file"],
      answer: 1,
      explanation: "Docstrings (triple-quoted strings) document subprograms and are accessible via func.__doc__.",
      difficulty: "Beginner"
    },
    {
      q: "What dangerous side-effect occurs when using a mutable default argument (e.g. def func(item, list=[])):",
      options: ["Memory leak crashes Python", "The default list is created only once when the function is defined, sharing state across all subsequent calls", "List is emptied every call", "SyntaxError"],
      answer: 1,
      explanation: "Default arguments are evaluated once at definition time; mutating it affects future calls that use default.",
      difficulty: "Advanced"
    },
    {
      q: "What is the recommended idiom for default mutable arguments in Python?",
      options: ["def func(item, lst=None):\n    if lst is None: lst = []", "Use global lists", "Use tuples only", "Set lst = {}"],
      answer: 0,
      explanation: "Using None as default and instantiating a fresh empty list inside ensures isolated mutable state.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Recursion in computer programming?",
      options: ["Running loops with while", "A function calling itself directly or indirectly to solve smaller instances of a problem", "Importing external libraries", "Using multiple threads"],
      answer: 1,
      explanation: "Recursion is when a function calls itself until reaching a defined base case.",
      difficulty: "Beginner"
    },
    {
      q: "What error is raised when a recursive function in Python exceeds the maximum recursion depth?",
      options: ["StackOverflowError", "RecursionError: maximum recursion depth exceeded", "MemoryLimitExceeded", "SystemHalt"],
      answer: 1,
      explanation: "Python protects the call stack by throwing RecursionError when recursion exceeds sys.getrecursionlimit().",
      difficulty: "Intermediate"
    },
    {
      q: "What does the map() built-in function do in Python?",
      options: ["Displays geographical maps", "Applies a given function to each item of an iterable and returns an iterator", "Finds coordinates", "Creates hash tables"],
      answer: 1,
      explanation: "map(func, iterable) yields elements resulting from applying func to each element in iterable.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the filter() built-in function do in Python?",
      options: ["Deletes files", "Constructs an iterator from elements of an iterable for which a function returns True", "Filters spam comments", "Removes duplicate characters"],
      answer: 1,
      explanation: "filter(predicate, iterable) retains only items for which the predicate returns True.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the LEGB rule refer to in Python variable scope resolution?",
      options: ["Logical, Equivalence, Greater, Binary", "Local, Enclosing, Global, Built-in namespaces", "Loop, Element, Grid, Block", "Linear, Exponential, Geometric, Base"],
      answer: 1,
      explanation: "Python resolves variable names in LEGB order: Local -> Enclosing -> Global -> Built-in.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Decorator in Python?",
      options: ["CSS styling for Python UI", "A callable that takes another function as an argument, extends its behavior without modifying it, and returns a function", "An animated cursor", "A string formatting tool"],
      answer: 1,
      explanation: "Decorators (@decorator_name) wrap functions to add cross-cutting behavior like logging or auth.",
      difficulty: "Advanced"
    },
    {
      q: "What does the 'yield' keyword do inside a Python function?",
      options: ["Pauses function execution and produces a value, turning the function into a Generator", "Immediately terminates the program", "Waits for network response", "Returns None"],
      answer: 0,
      explanation: "yield produces a value and saves local state, allowing generators to produce sequences lazily.",
      difficulty: "Advanced"
    },
    {
      q: "Can a Python function return multiple values?",
      options: ["No, only one value is allowed", "Yes, returning comma-separated values packages them into a single Tuple automatically", "Only using global variables", "Only in Python 2"],
      answer: 1,
      explanation: "return x, y packages values into a tuple (x, y), which can be unpacked by the caller.",
      difficulty: "Beginner"
    },
    {
      q: "What is the output of: (lambda x: x + 10)(5)?",
      options: ["10", "15", "5", "None"],
      answer: 1,
      explanation: "The lambda adds 10 to the argument 5, evaluating to 15.",
      difficulty: "Beginner"
    }
  ],
  "py-data-structures": [
    {
      q: "Which Python data structure is immutable once created?",
      options: ["List", "Tuple", "Dictionary", "Set"],
      answer: 1,
      explanation: "Tuples are immutable; their elements cannot be modified, added, or removed after creation.",
      difficulty: "Beginner"
    },
    {
      q: "What will my_list.append([1, 2]) do to a list?",
      options: ["Appends 1 and 2 as separate individual elements", "Appends the entire list [1, 2] as a single nested element", "Throws a TypeError", "Sorts the list"],
      answer: 1,
      explanation: "append() adds its argument as a single element, creating a nested sublist.",
      difficulty: "Beginner"
    },
    {
      q: "Which list method adds all elements of an iterable to the end of the list individually?",
      options: ["append()", "extend()", "insert()", "concat()"],
      answer: 1,
      explanation: "extend() iterates over its argument and appends each element individually to the list.",
      difficulty: "Beginner"
    },
    {
      q: "What is the key characteristic of a Python Set?",
      options: ["Maintains insertion order strictly and allows duplicates", "Stores an unordered collection of unique elements with no duplicates", "Stores key-value pairs", "Can contain mutable lists"],
      answer: 1,
      explanation: "Sets enforce uniqueness; duplicate elements are discarded automatically.",
      difficulty: "Beginner"
    },
    {
      q: "What is the average time complexity for checking membership ('key in d') in a Python dictionary?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
      answer: 2,
      explanation: "Python dictionaries use hash tables, achieving O(1) average time complexity for key lookups.",
      difficulty: "Intermediate"
    },
    {
      q: "What happens when you access a non-existent key in a dictionary using dict['invalid_key']?",
      options: ["Returns None", "Raises KeyError", "Returns 0", "Creates the key automatically"],
      answer: 1,
      explanation: "Direct square-bracket indexing raises KeyError if the key is not present; use dict.get() for safe lookups.",
      difficulty: "Beginner"
    },
    {
      q: "What does dict.get('missing', 'default_val') return if 'missing' is not in dict?",
      options: ["None", "KeyError", "'default_val'", "False"],
      answer: 2,
      explanation: "dict.get(key, default) returns the specified fallback default value if the key does not exist.",
      difficulty: "Beginner"
    },
    {
      q: "How can duplicates be removed from a list 'lst = [1, 2, 2, 3]' easily?",
      options: ["list(set(lst))", "lst.remove_duplicates()", "lst.unique()", "tuple(lst)"],
      answer: 0,
      explanation: "Converting to set() discards duplicate entries; wrapping with list() restores list type.",
      difficulty: "Beginner"
    },
    {
      q: "What is the output of: {x: x**2 for x in (1, 2, 3)}?",
      options: ["{1: 1, 2: 4, 3: 9}", "[1, 4, 9]", "(1, 4, 9)", "{1, 4, 9}"],
      answer: 0,
      explanation: "This dictionary comprehension maps each number to its squared value.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the difference between list.sort() and the sorted() function?",
      options: ["list.sort() modifies the list in-place and returns None; sorted() returns a new sorted list", "sorted() is for tuples only", "list.sort() is deprecated", "They do the exact same thing"],
      answer: 0,
      explanation: "list.sort() sorts in-place returning None; built-in sorted(iterable) returns a newly created sorted list.",
      difficulty: "Intermediate"
    },
    {
      q: "Which method removes and returns the last element of a list in Python?",
      options: ["remove()", "pop()", "discard()", "delete()"],
      answer: 1,
      explanation: "pop() removes and returns the element at the specified index (defaulting to the last element -1).",
      difficulty: "Beginner"
    },
    {
      q: "Can a Python list be used as a key in a standard dictionary?",
      options: ["Yes, always", "No, because lists are mutable and therefore unhashable (TypeError: unhashable type: 'list')", "Only if the list contains strings", "Only if length < 5"],
      answer: 1,
      explanation: "Dictionary keys must be hashable and immutable; mutable objects like lists cannot serve as keys.",
      difficulty: "Intermediate"
    },
    {
      q: "Which set operation produces elements that are in Set A or Set B, but NOT in both?",
      options: ["Union (A | B)", "Intersection (A & B)", "Difference (A - B)", "Symmetric Difference (A ^ B)"],
      answer: 3,
      explanation: "Symmetric difference (A ^ B) returns items present in either set but excluded from their intersection.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the expression 'tuple([1, 2, 3])' create?",
      options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "TypeError"],
      answer: 0,
      explanation: "The tuple() constructor converts an iterable list into an immutable tuple: (1, 2, 3).",
      difficulty: "Beginner"
    },
    {
      q: "What does the collections.defaultdict do in Python?",
      options: ["Locks dictionaries from editing", "Provides a default factory function that automatically initializes missing keys upon first access", "Encrypts dictionary keys", "Enforces maximum key count"],
      answer: 1,
      explanation: "defaultdict invokes a factory (like int, list) to generate default values for absent keys rather than raising KeyError.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the time complexity of appending an element to the end of a dynamic Python list?",
      options: ["O(1) amortized", "O(n)", "O(log n)", "O(n^2)"],
      answer: 0,
      explanation: "Python lists over-allocate backing arrays, achieving O(1) amortized time complexity for append().",
      difficulty: "Intermediate"
    },
    {
      q: "What does d.items() return when called on a dictionary?",
      options: ["A list of keys", "A list of values", "A dynamic view object displaying (key, value) tuple pairs", "A copy of the dictionary"],
      answer: 2,
      explanation: "dict.items() returns a dict_items view yielding (key, value) pairs.",
      difficulty: "Beginner"
    },
    {
      q: "What is Tuple Unpacking in Python?",
      options: ["Deleting a tuple", "Assigning individual tuple elements to multiple variables simultaneously (e.g. a, b = (10, 20))", "Converting tuple to list", "Sorting a tuple"],
      answer: 1,
      explanation: "Unpacking extracts values from a sequence directly into corresponding target variables.",
      difficulty: "Beginner"
    },
    {
      q: "What does the popitem() method do on a Python dictionary in Python 3.7+?",
      options: ["Removes a random item", "Removes and returns the last inserted (key, value) pair in LIFO order", "Clears the dictionary", "Removes the smallest key"],
      answer: 1,
      explanation: "Since Python 3.7 dictionaries maintain insertion order, popitem() removes the most recently added item (LIFO).",
      difficulty: "Intermediate"
    },
    {
      q: "What is the result of set('hello')?",
      options: ["{'h', 'e', 'l', 'l', 'o'}", "{'h', 'e', 'l', 'o'} (duplicates removed)", "['h', 'e', 'l', 'o']", "'hello'"],
      answer: 1,
      explanation: "Constructing a set from the string 'hello' removes the duplicate 'l', leaving {'h', 'e', 'l', 'o'}.",
      difficulty: "Beginner"
    }
  ],
  "web-html": [
    {
      q: "Which HTML5 tag is best suited for wrapping main navigation links?",
      options: ["<nav>", "<menu>", "<header>", "<section>"],
      answer: 0,
      explanation: "The <nav> semantic element denotes a section intended for major site navigation links.",
      difficulty: "Beginner"
    },
    {
      q: "What does the HTML5 <!DOCTYPE html> declaration accomplish?",
      options: ["Links the CSS file", "Instructs the browser to render the document in modern standards mode rather than quirks mode", "Specifies JavaScript version", "Validates server certificates"],
      answer: 1,
      explanation: "<!DOCTYPE html> is the preamble required to trigger standards-compliant rendering mode in modern web engines.",
      difficulty: "Beginner"
    },
    {
      q: "Which attribute in an <input> element specifies placeholder text displayed before the user types?",
      options: ["value", "placeholder", "title", "label"],
      answer: 1,
      explanation: "placeholder displays temporary gray helper text inside text inputs until input begins.",
      difficulty: "Beginner"
    },
    {
      q: "Which semantic tag represents tangential content, such as a sidebar or pull quote, related to surrounding content?",
      options: ["<aside>", "<section>", "<div>", "<footer>"],
      answer: 0,
      explanation: "<aside> represents content indirectly related to main page content (like sidebars and callouts).",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of the 'alt' attribute on an <img> tag?",
      options: ["Specifies image alignment", "Provides alternative text for screen readers and displays if the image fails to load", "Links to another URL", "Sets image resolution"],
      answer: 1,
      explanation: "alt text ensures accessibility for visually impaired users and displays descriptive text on image failure.",
      difficulty: "Beginner"
    },
    {
      q: "Which HTML5 input type provides built-in browser validation for email addresses on mobile and desktop?",
      options: ["<input type='text'>", "<input type='email'>", "<input type='mail'>", "<input type='address'>"],
      answer: 1,
      explanation: "type='email' triggers native syntax validation and tailored mobile keyboards with '@' keys.",
      difficulty: "Beginner"
    },
    {
      q: "What does the <meta name='viewport' content='width=device-width, initial-scale=1.0'> tag achieve?",
      options: ["Downloads desktop styles", "Controls viewport dimensions and scaling on mobile devices to ensure responsive layouts", "Enables 3D viewing", "Sets browser language"],
      answer: 1,
      explanation: "The viewport meta tag matches screen width in device-independent pixels and sets initial zoom to 1.0.",
      difficulty: "Beginner"
    },
    {
      q: "Which tag is used to embed native video files into a web page in HTML5 without third-party plugins?",
      options: ["<video>", "<movie>", "<embed-media>", "<flash>"],
      answer: 0,
      explanation: "HTML5 introduced the native <video> tag with controls and multi-source playback capabilities.",
      difficulty: "Beginner"
    },
    {
      q: "Which attribute on an <a> tag specifies that a hyperlink should open in a new browser tab?",
      options: ["target='_blank'", "target='_new'", "open='tab'", "rel='external'"],
      answer: 0,
      explanation: "target='_blank' instructs the browser to open the referenced link in a new tab or window.",
      difficulty: "Beginner"
    },
    {
      q: "What does ARIA stand for in web accessibility?",
      options: ["Automated Responsive Internet Applications", "Accessible Rich Internet Applications", "Advanced Routing Internet Access", "Audio Recording Interface Asset"],
      answer: 1,
      explanation: "W3C ARIA provides attributes to make dynamic web content accessible to assistive technologies.",
      difficulty: "Intermediate"
    },
    {
      q: "Which HTML element represents tabular data with rows and cells?",
      options: ["<grid>", "<table>", "<sheet>", "<data-box>"],
      answer: 1,
      explanation: "<table> organizes structured data into rows (<tr>), header cells (<th>), and data cells (<td>).",
      difficulty: "Beginner"
    },
    {
      q: "What is the difference between <section> and <div> in HTML5?",
      options: ["<div> is semantic; <section> is not", "<section> is a semantic element representing a thematic grouping of content with a heading; <div> is a non-semantic generic container", "They are identical in meaning", "<section> cannot contain CSS"],
      answer: 1,
      explanation: "<section> groups thematic content; <div> carries no semantic meaning and is used purely for styling.",
      difficulty: "Intermediate"
    },
    {
      q: "Which tag should be used to display code snippets in monospace typography on a webpage?",
      options: ["<code>", "<pre>", "<var>", "<samp>"],
      answer: 0,
      explanation: "<code> semantically identifies fragments of computer programming code.",
      difficulty: "Beginner"
    },
    {
      q: "What does the <pre> tag do?",
      options: ["Renders pre-formatted text preserving exact whitespace, tabs, and line breaks", "Prevents JavaScript execution", "Preloads web pages", "Predicts user input"],
      answer: 0,
      explanation: "<pre> presents text exactly as written, preserving literal spaces and line endings.",
      difficulty: "Beginner"
    },
    {
      q: "Which attribute makes an HTML form input mandatory before submission?",
      options: ["validate", "required", "mandatory", "need='true'"],
      answer: 1,
      explanation: "The 'required' boolean attribute blocks form submission if the field is empty.",
      difficulty: "Beginner"
    },
    {
      q: "What is the correct tag hierarchy for a standard HTML table?",
      options: ["<table> -> <tr> -> <td>", "<table> -> <td> -> <tr>", "<tr> -> <table> -> <td>", "<table> -> <tb> -> <td>"],
      answer: 0,
      explanation: "Tables contain Table Rows (<tr>), which enclose Table Data cells (<td>).",
      difficulty: "Beginner"
    },
    {
      q: "Which tag defines client-side form controls to select one option from a dropdown list?",
      options: ["<list>", "<select>", "<dropdown>", "<picker>"],
      answer: 1,
      explanation: "<select> encloses <option> elements to present a dropdown selection menu.",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of the <label> element and its 'for' attribute?",
      options: ["Styles text in bold", "Associates descriptive text with a specific form control id, increasing clickable hit areas for accessibility", "Labels database tables", "Creates tags for SEO"],
      answer: 1,
      explanation: "Clicking a <label for='element_id'> focuses or toggles the referenced form input, improving accessibility.",
      difficulty: "Beginner"
    },
    {
      q: "Which HTML5 tag is used to draw dynamic bitmap 2D and 3D graphics on the fly via JavaScript?",
      options: ["<svg>", "<canvas>", "<graphics>", "<paint>"],
      answer: 1,
      explanation: "<canvas> exposes a raster rendering context (e.g. getContext('2d')) for scriptable pixel graphics.",
      difficulty: "Intermediate"
    },
    {
      q: "How does SVG (Scalable Vector Graphics) differ from HTML5 Canvas?",
      options: ["SVG uses XML vector elements that scale infinitely without pixelation; Canvas is resolution-dependent pixel raster drawing", "Canvas is vector-based; SVG is raster", "Canvas cannot be scripted", "SVG requires Flash"],
      answer: 0,
      explanation: "SVG describes vectors as DOM elements that scale crisply to any resolution; Canvas manipulates pixel bitmaps.",
      difficulty: "Intermediate"
    }
  ],
  "web-css": [
    {
      q: "In the CSS box model, what directly surrounds the border?",
      options: ["Padding", "Margin", "Content", "Outline"],
      answer: 1,
      explanation: "Margin provides transparent outer spacing surrounding the border.",
      difficulty: "Beginner"
    },
    {
      q: "Which CSS selector has the highest specificity?",
      options: ["Element selector (div)", "Class selector (.card)", "ID selector (#header)", "Universal selector (*)"],
      answer: 2,
      explanation: "ID selectors carry specificity weight (0,1,0,0), overriding class selectors (0,0,1,0) and element selectors (0,0,0,1).",
      difficulty: "Beginner"
    },
    {
      q: "What does 'display: none' do compared to 'visibility: hidden'?",
      options: ["'display: none' removes the element from document flow entirely; 'visibility: hidden' hides the element while preserving its empty space", "They are identical", "'visibility: hidden' deletes the element from DOM", "'display: none' makes it transparent"],
      answer: 0,
      explanation: "display: none collapses the element's layout space; visibility: hidden renders it invisible while holding its place.",
      difficulty: "Intermediate"
    },
    {
      q: "Which CSS property is used to change the text color of an element?",
      options: ["text-color", "color", "font-color", "text-style"],
      answer: 1,
      explanation: "The 'color' property sets the foreground color of text and decorative text elements.",
      difficulty: "Beginner"
    },
    {
      q: "What does the CSS position property value 'absolute' do?",
      options: ["Positions element relative to the viewport always", "Positions element relative to its nearest positioned ancestor (non-static)", "Leaves element in normal document flow", "Locks element against scrolling"],
      answer: 1,
      explanation: "position: absolute removes the element from flow and offsets it relative to its closest positioned ancestor.",
      difficulty: "Intermediate"
    },
    {
      q: "What does position: fixed do?",
      options: ["Positions element relative to the browser viewport, remaining anchored during page scrolling", "Positions element relative to its parent", "Prevents element modification", "Centers the element"],
      answer: 0,
      explanation: "position: fixed anchors the element relative to the browser viewport coordinate system.",
      difficulty: "Beginner"
    },
    {
      q: "Which CSS Flexbox property specifies how flex items are placed in the flex container along the main axis?",
      options: ["align-items", "justify-content", "flex-wrap", "align-content"],
      answer: 1,
      explanation: "justify-content distributes extra space along the main axis (flex-start, center, space-between, etc.).",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'rem' CSS unit represent?",
      options: ["Relative to the font-size of the current parent element", "Relative to the font-size of the root <html> element", "Raw screen millimetres", "Resolution of monitor"],
      answer: 1,
      explanation: "1rem equals the computed font-size of the root <html> element (typically 16px by default).",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'em' CSS unit represent?",
      options: ["Relative to the root element", "Relative to the font-size of the element on which it is used (or its direct parent)", "Exact pixels", "Viewport percentage"],
      answer: 1,
      explanation: "em units scale relative to the font-size of the current element or parent.",
      difficulty: "Beginner"
    },
    {
      q: "Which CSS property creates a smooth color transition effect across an element's background?",
      options: ["background: linear-gradient(...)", "background-blend: smooth", "transition: color", "filter: blur()"],
      answer: 0,
      explanation: "CSS linear-gradient() and radial-gradient() render smooth color transitions across surfaces.",
      difficulty: "Beginner"
    },
    {
      q: "What is the CSS Grid property to specify gap spacing between rows and columns simultaneously?",
      options: ["gap (or grid-gap)", "spacing", "grid-margin", "cell-padding"],
      answer: 0,
      explanation: "The 'gap' shorthand property sets gutter spacing between grid rows and columns.",
      difficulty: "Beginner"
    },
    {
      q: "Which CSS property specifies the stack order of positioned elements (which appears in front)?",
      options: ["order", "z-index", "elevation", "layer"],
      answer: 1,
      explanation: "z-index controls 3D stacking order along the z-axis for positioned elements.",
      difficulty: "Beginner"
    },
    {
      q: "What does the '!important' declaration in CSS do?",
      options: ["Accelerates GPU rendering", "Overrides standard cascade specificity rules, giving the rule highest precedence", "Exports style to JavaScript", "Logs a console warning"],
      answer: 1,
      explanation: "!important elevates a style rule above normal specificity calculations.",
      difficulty: "Beginner"
    },
    {
      q: "What does the pseudo-class :hover represent?",
      options: ["An element currently focused with keyboard", "An element when the user designates it with a pointing device (cursor mouseover)", "A link that has been visited", "The first child element"],
      answer: 1,
      explanation: ":hover applies styles when the pointer device hovers over an interactive element.",
      difficulty: "Beginner"
    },
    {
      q: "What is a CSS variable (custom property) defined as in standard CSS?",
      options: ["$primary-color: #2563eb;", "--primary-color: #2563eb;", "@var primary = #2563eb;", "let primary = #2563eb;"],
      answer: 1,
      explanation: "CSS custom properties are prefixed with double dashes (--name) and accessed via var(--name).",
      difficulty: "Beginner"
    },
    {
      q: "What is the CSS property used to add drop shadows to text?",
      options: ["box-shadow", "text-shadow", "drop-shadow()", "font-shadow"],
      answer: 1,
      explanation: "text-shadow: x-offset y-offset blur color applies shadow effects to text characters.",
      difficulty: "Beginner"
    },
    {
      q: "Which property allows an element to transition smoothly between property states over time?",
      options: ["transition: all 0.3s ease;", "animation-duration: 0.3s;", "smooth: true;", "transform: ease;"],
      answer: 0,
      explanation: "The 'transition' property animates changes in CSS properties over a specified duration.",
      difficulty: "Beginner"
    },
    {
      q: "What does the CSS 'transform: rotate(45deg);' property do?",
      options: ["Translates element 45 pixels", "Rotates the element clockwise by 45 degrees around its transform origin", "Skews the element by 45%", "Changes font angle"],
      answer: 1,
      explanation: "transform: rotate(angle) rotates elements in 2D space without altering document flow.",
      difficulty: "Beginner"
    },
    {
      q: "Which CSS pseudo-element targets the very first letter of a block of text to create a drop cap?",
      options: ["::first-line", "::first-letter", ":first-child", "::initial"],
      answer: 1,
      explanation: "::first-letter styles the opening character of a paragraph for drop cap typography.",
      difficulty: "Intermediate"
    },
    {
      q: "What does 'backdrop-filter: blur(10px);' achieve in modern CSS UI design?",
      options: ["Blurs the element's own text", "Blurs the area behind an element (creating a glassmorphism frosted glass effect)", "Blurs browser tab", "Blurs the monitor display"],
      answer: 1,
      explanation: "backdrop-filter applies graphic effects like blurring to the background content visible beneath a translucent element.",
      difficulty: "Intermediate"
    }
  ]
};
