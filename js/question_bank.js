/* ==========================================================================
   js/question_bank.js — Comprehensive Academic Question Bank for YUKTARA
   Provides 20+ syllabus-aligned MCQs per unit for all 8 subjects.
   Auto-augments SUBJECT_LIBRARY upon load.
   ========================================================================== */

(function () {
  const QUESTION_BANK = {
  "dsa-u1-intro": [
    {
      "q": "Which asymptotic notation represents the tight asymptotic bound of an algorithm?",
      "options": [
        "Big-O (O)",
        "Big-Omega (Ω)",
        "Big-Theta (Θ)",
        "Little-o (o)"
      ],
      "answer": 2,
      "explanation": "Big-Theta (Θ) defines both upper and lower bounds simultaneously, indicating the exact tight growth rate.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the time complexity of the Fast Transpose algorithm for a sparse matrix with n non-zero elements and c columns?",
      "options": [
        "O(n * c)",
        "O(c + n)",
        "O(n^2)",
        "O(log n)"
      ],
      "answer": 1,
      "explanation": "Fast Transpose calculates column frequencies and starting positions in O(c) time and positions elements in O(n) time, yielding O(c + n).",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which data structure is inherently non-linear?",
      "options": [
        "Queue",
        "Binary Tree",
        "Doubly Linked List",
        "Circular Array"
      ],
      "answer": 1,
      "explanation": "Binary Trees organize nodes hierarchically with parent-child relationships, making them non-linear.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does Big-Omega (Ω) notation mathematically represent?",
      "options": [
        "Asymptotic upper bound",
        "Asymptotic lower bound",
        "Average case runtime",
        "Space requirement"
      ],
      "answer": 1,
      "explanation": "Big-Omega (Ω) defines an asymptotic lower bound on algorithm execution time for all sufficiently large inputs.",
      "difficulty": "Beginner"
    },
    {
      "q": "In a 3-tuple sparse matrix representation, what three attributes are stored for each non-zero cell?",
      "options": [
        "Row index, Column index, Value",
        "Memory address, Value, Pointer",
        "Row index, Data type, Hash code",
        "Key, Left child, Right child"
      ],
      "answer": 0,
      "explanation": "The 3-tuple format stores (Row, Column, Value) to represent sparse matrix elements efficiently.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which algorithm design paradigm solves a problem by breaking it into non-overlapping subproblems, solving them recursively, and combining answers?",
      "options": [
        "Greedy Method",
        "Divide and Conquer",
        "Dynamic Programming",
        "Backtracking"
      ],
      "answer": 1,
      "explanation": "Divide and Conquer partitions problems into independent subproblems, as seen in Merge Sort and Binary Search.",
      "difficulty": "Beginner"
    },
    {
      "q": "If an algorithm requires f(n) = 3n^2 + 5n + 12 steps, what is its asymptotic complexity in Big-O notation?",
      "options": [
        "O(n^3)",
        "O(n^2)",
        "O(n)",
        "O(1)"
      ],
      "answer": 1,
      "explanation": "Big-O drops lower-order terms and constant coefficients, leaving O(n^2) as the dominant term.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the primary advantage of dynamic data structures over static data structures?",
      "options": [
        "Guaranteed O(1) random memory access",
        "Memory size can expand or contract at runtime",
        "No pointer overhead",
        "Compile-time memory allocation"
      ],
      "answer": 1,
      "explanation": "Dynamic structures allocate memory from heap storage as required during program execution.",
      "difficulty": "Intermediate"
    },
    {
      "q": "When evaluating polynomial addition using arrays, what power of terms is typically matched?",
      "options": [
        "Coefficient",
        "Exponent",
        "Variable name",
        "Index number"
      ],
      "answer": 1,
      "explanation": "Like terms are identified by matching exponents so their coefficients can be summed.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which order of growth indicates the fastest-growing (least scalable) algorithm for large n?",
      "options": [
        "O(n log n)",
        "O(n^2)",
        "O(2^n)",
        "O(n!)"
      ],
      "answer": 3,
      "explanation": "Factorial growth O(n!) grows even faster than exponential O(2^n) and polynomial orders.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is auxiliary space complexity in algorithm analysis?",
      "options": [
        "Total memory occupied by inputs",
        "Extra or temporary space used aside from the input data",
        "Disk storage for program binaries",
        "Operating system cache size"
      ],
      "answer": 1,
      "explanation": "Auxiliary space measures only the temporary working memory needed by the algorithm during execution.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In Little-o notation, what does f(n) = o(g(n)) imply as n approaches infinity?",
      "options": [
        "f(n) grows at least as fast as g(n)",
        "f(n) / g(n) approaches 0",
        "f(n) is strictly equal to g(n)",
        "f(n) is bounded between two constants"
      ],
      "answer": 1,
      "explanation": "Little-o represents an upper bound that is strictly non-tight, meaning lim (f(n)/g(n)) = 0 as n -> infinity.",
      "difficulty": "Advanced"
    },
    {
      "q": "Why does standard Transpose of an m x n sparse matrix with non-zero elements t take O(n * t) time?",
      "options": [
        "It performs column-by-column linear scans over all t elements",
        "It uses matrix multiplication",
        "It reallocates the array repeatedly",
        "It converts the matrix to binary"
      ],
      "answer": 0,
      "explanation": "Standard transpose iterates over all columns (0 to n-1) and searches through all t non-zero elements in each pass.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which classification applies to stacks, queues, and linked lists?",
      "options": [
        "Non-linear data structures",
        "Linear data structures",
        "Hierarchical data structures",
        "Graph networks"
      ],
      "answer": 1,
      "explanation": "All these structures maintain a sequential, one-dimensional logical arrangement of items.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an abstract data type (ADT)?",
      "options": [
        "A hardware circuit for data storage",
        "A mathematical specification of data objects and operations without implementation details",
        "A low-level C assembly structure",
        "A database table schema"
      ],
      "answer": 1,
      "explanation": "An ADT specifies what operations can be performed on the data without specifying how they are implemented.",
      "difficulty": "Beginner"
    },
    {
      "q": "If an array of integers starts at memory address 1000 and each integer occupies 4 bytes, where is index 5 stored (assuming 0-indexed)?",
      "options": [
        "1005",
        "1020",
        "1016",
        "1024"
      ],
      "answer": 1,
      "explanation": "Address = Base + (Index * ElementSize) = 1000 + (5 * 4) = 1020.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which case analysis provides a guarantee that the algorithm will never take longer than this bound?",
      "options": [
        "Best case",
        "Average case",
        "Worst case",
        "Amortized case"
      ],
      "answer": 2,
      "explanation": "Worst-case analysis calculates the maximum possible time taken on any input of size n.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a persistent data structure?",
      "options": [
        "A structure stored on hard drives permanently",
        "A structure that preserves its previous versions when modified",
        "A read-only lookup table",
        "A hardware EEPROM register"
      ],
      "answer": 1,
      "explanation": "Persistent data structures allow access to past versions after modifications (immutability).",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the space complexity of an in-place algorithm?",
      "options": [
        "O(n)",
        "O(1) auxiliary space",
        "O(n log n)",
        "O(2^n)"
      ],
      "answer": 1,
      "explanation": "In-place algorithms modify input without allocating proportional extra memory, achieving O(1) auxiliary space.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which recurrence relation describes the Binary Search divide-and-conquer algorithm?",
      "options": [
        "T(n) = 2T(n/2) + O(n)",
        "T(n) = T(n/2) + O(1)",
        "T(n) = T(n-1) + O(1)",
        "T(n) = 2T(n/2) + O(1)"
      ],
      "answer": 1,
      "explanation": "Binary search cuts the search space in half with one comparison: T(n) = T(n/2) + O(1), yielding O(log n).",
      "difficulty": "Advanced"
    }
  ],
  "dsa-u2-stacks-queues": [
    {
      "q": "Which data structure follows the Last-In, First-Out (LIFO) discipline?",
      "options": [
        "Queue",
        "Stack",
        "Binary Search Tree",
        "Linked List"
      ],
      "answer": 1,
      "explanation": "A stack restricts insertions and deletions to the top element, adhering to LIFO discipline.",
      "difficulty": "Beginner"
    },
    {
      "q": "What happens when you attempt to pop an element from an empty stack?",
      "options": [
        "Stack Overflow",
        "Stack Underflow",
        "Memory Leak",
        "Garbage Collection"
      ],
      "answer": 1,
      "explanation": "Attempting to remove an item from an empty stack triggers a Stack Underflow error condition.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which expression represents the postfix notation of (A + B) * C?",
      "options": [
        "+ A B * C",
        "A B + C *",
        "A B C + *",
        "* + A B C"
      ],
      "answer": 1,
      "explanation": "(A + B) transforms to AB+, and multiplying by C yields AB+C*.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In a circular queue implemented using an array of size N, what is the formula to advance the rear pointer?",
      "options": [
        "rear = rear + 1",
        "rear = (rear + 1) % N",
        "rear = (rear - 1) % N",
        "rear = N % rear"
      ],
      "answer": 1,
      "explanation": "Modulo arithmetic wrap-around: rear = (rear + 1) % N connects the end of the array back to index 0.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which data structure is fundamentally used by compilers to manage function call frames and recursion?",
      "options": [
        "Queue",
        "Call Stack",
        "Priority Queue",
        "Hash Table"
      ],
      "answer": 1,
      "explanation": "The runtime call stack preserves local variables, return addresses, and parameters for nested function calls.",
      "difficulty": "Beginner"
    },
    {
      "q": "In a Priority Queue, how are elements dequeued?",
      "options": [
        "In strictly FIFO order",
        "According to assigned priority values rather than arrival time",
        "Randomly",
        "In reverse order of arrival"
      ],
      "answer": 1,
      "explanation": "A priority queue removes the element with highest (or lowest) priority first.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Double-Ended Queue (Deque)?",
      "options": [
        "A queue that supports insertion and deletion at both front and rear ends",
        "Two queues combined sequentially",
        "A queue that discards old elements",
        "A stack with two tops"
      ],
      "answer": 0,
      "explanation": "A Deque allows insertion and deletion operations at both the front and rear endpoints.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the time complexity of Push and Pop operations in a properly implemented stack?",
      "options": [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(n^2)"
      ],
      "answer": 2,
      "explanation": "Since elements are always added and removed from the designated top pointer, stack operations take O(1) constant time.",
      "difficulty": "Beginner"
    },
    {
      "q": "When converting infix to postfix using Dijkstra's Shunting-yard algorithm, where are operands placed?",
      "options": [
        "Pushed onto the operator stack",
        "Directly appended to the output expression",
        "Discarded",
        "Pushed into an operand queue"
      ],
      "answer": 1,
      "explanation": "Operands (variables/numbers) are sent immediately to the output string; operators go onto the stack.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How can a queue be implemented using two stacks (Stack 1 and Stack 2)?",
      "options": [
        "Enqueue pushes to Stack 1; Dequeue pops from Stack 2 (transferring from Stack 1 when Stack 2 is empty)",
        "Both push and pop from Stack 1 only",
        "Alternate between Stack 1 and Stack 2 on every operation",
        "Push to both stacks simultaneously"
      ],
      "answer": 0,
      "explanation": "Pushing to Stack 1 and popping from Stack 2 reverses the LIFO order twice, producing FIFO behavior.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the condition for an ordinary linear queue of capacity N to be full?",
      "options": [
        "front == 0",
        "rear == N - 1",
        "front == rear",
        "front == -1"
      ],
      "answer": 1,
      "explanation": "In a simple array queue, rear == N - 1 indicates that the rear pointer has reached the maximum capacity.",
      "difficulty": "Beginner"
    },
    {
      "q": "Why is a Circular Queue preferred over a standard linear array queue?",
      "options": [
        "It uses less total memory",
        "It avoids false full conditions by recycling vacated spaces at the front",
        "It allows faster sorting",
        "It supports random access by key"
      ],
      "answer": 1,
      "explanation": "Linear queues can appear full when rear reaches the end even if front spaces were vacated by dequeues; circular queues recycle those spaces.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the value of the postfix expression: 6 3 2 + * 5 - ?",
      "options": [
        "25",
        "30",
        "28",
        "20"
      ],
      "answer": 0,
      "explanation": "3 + 2 = 5; 6 * 5 = 30; 30 - 5 = 25.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which data structure is ideal for checking balanced parentheses in code syntax checking?",
      "options": [
        "Queue",
        "Stack",
        "Hash Set",
        "Binary Tree"
      ],
      "answer": 1,
      "explanation": "Pushing opening brackets onto a stack and popping to match closing brackets verifies proper balance in O(n) time.",
      "difficulty": "Beginner"
    },
    {
      "q": "In a circular queue of size N with front and rear pointers, what is the empty queue condition?",
      "options": [
        "front == rear == -1",
        "rear == front + 1",
        "front == 0",
        "rear == N"
      ],
      "answer": 0,
      "explanation": "When empty, both front and rear are typically reset to -1.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is an Input-Restricted Deque?",
      "options": [
        "Insertion allowed at both ends, deletion at one end",
        "Insertion allowed only at one end, deletion allowed at both ends",
        "No insertion allowed",
        "Deletions restricted to middle elements"
      ],
      "answer": 1,
      "explanation": "An input-restricted deque permits insertion at one end only, while deletion is allowed at both ends.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which real-world system uses a Queue structure?",
      "options": [
        "Undo command in text editors",
        "Printer spooler managing print jobs",
        "Back button in web browsers",
        "Syntax tree evaluation"
      ],
      "answer": 1,
      "explanation": "Printer spoolers process print jobs in the exact order they were received (First-In, First-Out).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the maximum number of elements a circular queue with array size N can hold if front == (rear + 1) % N denotes full?",
      "options": [
        "N",
        "N - 1",
        "N + 1",
        "2N"
      ],
      "answer": 1,
      "explanation": "Leaving one slot empty distinguishes between completely full and completely empty states without extra flags.",
      "difficulty": "Advanced"
    },
    {
      "q": "When an operator with lower precedence is encountered during infix to postfix conversion, what action is taken on the stack?",
      "options": [
        "It is discarded",
        "Operators of higher or equal precedence are popped to output before pushing the current operator",
        "It is pushed directly without popping",
        "The entire stack is cleared"
      ],
      "answer": 1,
      "explanation": "Precedence rules require operators with >= precedence on top of the stack to be popped to output first.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the space complexity of converting an infix string of length n to postfix?",
      "options": [
        "O(1)",
        "O(n)",
        "O(n^2)",
        "O(log n)"
      ],
      "answer": 1,
      "explanation": "The operator stack and output string require memory linearly proportional to input length n.",
      "difficulty": "Beginner"
    }
  ],
  "dsa-u3-linked-lists": [
    {
      "q": "What is the time complexity to insert a new node at the beginning of a singly linked list with n nodes?",
      "options": [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(n^2)"
      ],
      "answer": 2,
      "explanation": "Prepending to a linked list only updates the new node's next pointer and head pointer, requiring O(1) time.",
      "difficulty": "Beginner"
    },
    {
      "q": "In a Doubly Linked List, how many pointer fields does each node contain?",
      "options": [
        "1",
        "2",
        "3",
        "0"
      ],
      "answer": 1,
      "explanation": "Each node contains two pointers: 'prev' (pointing to preceding node) and 'next' (pointing to succeeding node).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'next' pointer of the last node in a Circular Singly Linked List point to?",
      "options": [
        "NULL",
        "Head node",
        "Previous node",
        "Random node"
      ],
      "answer": 1,
      "explanation": "In a circular list, the last node's next pointer loops back to the head node.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which algorithm is used to detect a cycle/loop in a linked list in O(n) time and O(1) space?",
      "options": [
        "Dijkstra's Algorithm",
        "Floyd's Cycle-Finding Algorithm (Tortoise & Hare)",
        "Kruskal's Algorithm",
        "Bresenham's Algorithm"
      ],
      "answer": 1,
      "explanation": "Floyd's algorithm uses slow (1 step) and fast (2 steps) pointers; if a cycle exists, they must meet.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the primary memory disadvantage of a Linked List compared to an Array?",
      "options": [
        "Linked lists cannot store dynamic data",
        "Extra memory overhead for storing pointer references in each node",
        "Linked lists cannot be traversed",
        "Fixed capacity at compile time"
      ],
      "answer": 1,
      "explanation": "Every node requires extra memory to store pointer addresses in addition to payload data.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the time complexity to search for an element in an unsorted singly linked list of size n?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "answer": 2,
      "explanation": "Without indexing or ordering, every node must be examined sequentially from the head, taking O(n) time.",
      "difficulty": "Beginner"
    },
    {
      "q": "How do you reverse a singly linked list iteratively in O(n) time?",
      "options": [
        "By using three pointers: prev, curr, and next",
        "By sorting the elements",
        "By using a 2D matrix",
        "By deleting each node"
      ],
      "answer": 0,
      "explanation": "Maintaining prev, curr, and next pointers allows reversing links one by one in a single pass.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Header Linked List?",
      "options": [
        "A list stored in the program header",
        "A list that contains a special designated dummy node at the beginning",
        "A list containing only strings",
        "A list without pointers"
      ],
      "answer": 1,
      "explanation": "A header linked list contains a dummy head node containing metadata (like count) to simplify boundary insertions/deletions.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the time complexity to delete a node given only a pointer to that node in a singly linked list (not the last node)?",
      "options": [
        "O(n)",
        "O(1)",
        "O(log n)",
        "Cannot be done"
      ],
      "answer": 1,
      "explanation": "Copy data from the next node into the current node and bypass next node: curr->val = curr->next->val; curr->next = curr->next->next.",
      "difficulty": "Advanced"
    },
    {
      "q": "How can polynomials be represented using linked lists?",
      "options": [
        "Each node stores coefficient, exponent, and next pointer",
        "Each node stores only the variable name",
        "Using an adjacency matrix",
        "Polynomials cannot be represented in lists"
      ],
      "answer": 0,
      "explanation": "Each term is modeled as a node containing (coeff, exp, next_node_ptr), arranged in descending degree.",
      "difficulty": "Intermediate"
    },
    {
      "q": "To find the middle element of a linked list in a single pass, how should the pointers move?",
      "options": [
        "Both move one step",
        "Slow pointer moves 1 step; Fast pointer moves 2 steps",
        "Slow moves 2 steps; Fast moves 1 step",
        "Traverse backwards from tail"
      ],
      "answer": 1,
      "explanation": "When fast reaches the end, slow is exactly at the midpoint (n/2).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the main advantage of a Doubly Linked List over a Singly Linked List?",
      "options": [
        "Uses half the memory",
        "Allows bidirectional traversal (forward and backward)",
        "Guarantees O(1) search time",
        "Eliminates need for dynamic allocation"
      ],
      "answer": 1,
      "explanation": "Bidirectional pointers permit navigation towards predecessors as well as successors.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the time complexity to insert an element at the end of a singly linked list if only the head pointer is maintained?",
      "options": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n^2)"
      ],
      "answer": 1,
      "explanation": "Without a tail pointer, the list must be traversed from head to the last node (n steps), taking O(n).",
      "difficulty": "Beginner"
    },
    {
      "q": "If both head and tail pointers are maintained, what is the time complexity to append to a singly linked list?",
      "options": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n^2)"
      ],
      "answer": 0,
      "explanation": "With a direct tail pointer, appending takes O(1) time: tail->next = newNode; tail = newNode.",
      "difficulty": "Beginner"
    },
    {
      "q": "In an XOR Linked List (memory-efficient doubly linked list), what does each node's pointer field store?",
      "options": [
        "Both addresses concatenated",
        "Bitwise XOR of previous and next node addresses",
        "A hash code of the data",
        "Address of the head node"
      ],
      "answer": 1,
      "explanation": "By storing (prev XOR next), a doubly linked list uses only one pointer field per node.",
      "difficulty": "Advanced"
    },
    {
      "q": "What happens if you free a node in C without updating adjacent pointers in a linked list?",
      "options": [
        "Memory compaction",
        "Dangling pointers and broken list links",
        "Automatic garbage collection",
        "The list reverses"
      ],
      "answer": 1,
      "explanation": "Pointers still referencing deallocated memory become dangling pointers, causing undefined behavior or crashes.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How do you check if a linked list has an even or odd number of nodes using two pointers?",
      "options": [
        "By checking if fast pointer becomes NULL (even) or fast->next becomes NULL (odd)",
        "By counting digits",
        "By summing values",
        "By hashing node addresses"
      ],
      "answer": 0,
      "explanation": "If fast == NULL, length is even; if fast->next == NULL, length is odd.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the worst-case time complexity of merging two sorted linked lists of lengths m and n?",
      "options": [
        "O(m * n)",
        "O(m + n)",
        "O(log(m + n))",
        "O(m log n)"
      ],
      "answer": 1,
      "explanation": "Comparing head nodes one by one takes linear time proportional to the total number of nodes (m + n).",
      "difficulty": "Intermediate"
    },
    {
      "q": "Can binary search be implemented on a singly linked list with O(log n) time complexity?",
      "options": [
        "Yes, using random pointers",
        "No, because linked lists lack O(1) random access to middle elements",
        "Yes, always",
        "Only if sorted descending"
      ],
      "answer": 1,
      "explanation": "Accessing the middle node requires O(n) traversal, destroying the O(log n) performance of binary search.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What data structure can be used to achieve O(log n) search on linked list concepts?",
      "options": [
        "Skip List",
        "Circular Queue",
        "Stack",
        "Tuple Matrix"
      ],
      "answer": 0,
      "explanation": "Skip Lists introduce multiple hierarchical layers of forward pointers, achieving O(log n) search in linked lists.",
      "difficulty": "Advanced"
    }
  ],
  "dsa-u4-searching-sorting": [
    {
      "q": "What is the worst-case time complexity of Quick Sort?",
      "options": [
        "O(n log n)",
        "O(n^2)",
        "O(n)",
        "O(log n)"
      ],
      "answer": 1,
      "explanation": "Quick Sort degrades to O(n^2) when the pivot divides the array into unbalanced partitions of 0 and n-1 elements.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which sorting algorithm is guaranteed to be stable and have O(n log n) worst-case time complexity?",
      "options": [
        "Quick Sort",
        "Merge Sort",
        "Heap Sort",
        "Selection Sort"
      ],
      "answer": 1,
      "explanation": "Merge Sort consistently divides arrays in half and maintains relative order of equal keys in O(n log n).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the best-case time complexity of Insertion Sort when the input is already sorted?",
      "options": [
        "O(n^2)",
        "O(n)",
        "O(n log n)",
        "O(1)"
      ],
      "answer": 1,
      "explanation": "When sorted, each element only needs one comparison with its predecessor, achieving O(n) linear time.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the precondition required to execute Binary Search on an array?",
      "options": [
        "Array size must be even",
        "Array must be sorted",
        "Array must contain only positive integers",
        "Array must have no duplicates"
      ],
      "answer": 1,
      "explanation": "Binary search relies on monotonic ordering to eliminate half of the remaining elements at each step.",
      "difficulty": "Beginner"
    },
    {
      "q": "How many comparisons does Selection Sort perform on an array of size n in all cases?",
      "options": [
        "n - 1",
        "n(n - 1) / 2",
        "n log n",
        "2^n"
      ],
      "answer": 1,
      "explanation": "Selection Sort always scans all unsorted elements to find the minimum: (n-1) + (n-2) + ... + 1 = n(n-1)/2.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which sorting algorithm sorts elements digit by digit, from least significant to most significant digit?",
      "options": [
        "Bubble Sort",
        "Radix Sort",
        "Quick Sort",
        "Heap Sort"
      ],
      "answer": 1,
      "explanation": "Radix Sort (LSD) processes numbers digit-by-digit using a stable sub-routine like Counting Sort.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does it mean for a sorting algorithm to be 'stable'?",
      "options": [
        "It never crashes due to memory overflow",
        "It preserves the relative order of elements with equal keys",
        "It runs in O(n log n) time",
        "It uses O(1) auxiliary space"
      ],
      "answer": 1,
      "explanation": "Stability ensures that duplicate values appear in the output in the same relative order as in the input.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the average-case time complexity of Linear Search on an array of size n?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n^2)"
      ],
      "answer": 2,
      "explanation": "On average, linear search examines (n + 1)/2 elements, which evaluates to O(n) complexity.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the space complexity of standard recursive Merge Sort?",
      "options": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n^2)"
      ],
      "answer": 1,
      "explanation": "Merge Sort requires an auxiliary array of size n to merge halves back together.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which sorting algorithm has O(n log n) time complexity in all cases (best, worst, average) and runs in-place with O(1) auxiliary space?",
      "options": [
        "Merge Sort",
        "Quick Sort",
        "Heap Sort",
        "Bubble Sort"
      ],
      "answer": 2,
      "explanation": "Heap Sort operates directly on an array representation of a binary heap, achieving O(n log n) in O(1) extra space.",
      "difficulty": "Advanced"
    },
    {
      "q": "In Bubble Sort, what optimization allows early termination in O(n) time if the array is already sorted?",
      "options": [
        "Using binary search",
        "Using a swapped boolean flag that breaks if no swaps occur in a pass",
        "Halving the array size",
        "Reversing the loop"
      ],
      "answer": 1,
      "explanation": "If an entire pass completes without a single swap, the array is already sorted and sorting can terminate.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the maximum number of comparisons needed in Binary Search for an array of size n?",
      "options": [
        "n",
        "floor(log2(n)) + 1",
        "n / 2",
        "n^2"
      ],
      "answer": 1,
      "explanation": "At each comparison, search space is halved; maximum comparisons is floor(log2(n)) + 1.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What technique does Randomized Quick Sort use to avoid the O(n^2) worst case on already sorted arrays?",
      "options": [
        "Choosing the pivot uniformly at random",
        "Reversing the array first",
        "Using 3 pivots",
        "Counting all elements"
      ],
      "answer": 0,
      "explanation": "Random pivot selection breaks adversarial input patterns, yielding an expected O(n log n) runtime.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which searching algorithm divides the search space using golden ratio or probe positions based on key values rather than strictly middle index?",
      "options": [
        "Binary Search",
        "Interpolation Search",
        "Linear Search",
        "Breadth First Search"
      ],
      "answer": 1,
      "explanation": "Interpolation Search estimates the target position using the formula pos = low + [(x - arr[low])*(high - low)] / (arr[high] - arr[low]).",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the time complexity of Interpolation Search on uniformly distributed sorted data?",
      "options": [
        "O(n)",
        "O(log(log n))",
        "O(log n)",
        "O(1)"
      ],
      "answer": 1,
      "explanation": "On uniformly distributed keys, interpolation search achieves O(log log n) average time complexity.",
      "difficulty": "Advanced"
    },
    {
      "q": "Which sorting technique is considered an 'internal sort'?",
      "options": [
        "Sorting data that completely fits into main memory (RAM)",
        "Sorting data across external tape drives",
        "Sorting databases across distributed clusters",
        "Writing intermediate runs to disk"
      ],
      "answer": 0,
      "explanation": "Internal sorting takes place entirely in high-speed primary RAM without auxiliary disk storage.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the minimum number of comparisons needed to find both the minimum and maximum elements in an array of size n?",
      "options": [
        "2n - 2",
        "3n/2 - 2 (in pairs)",
        "n log n",
        "n^2"
      ],
      "answer": 1,
      "explanation": "Comparing elements in pairs reduces total comparisons to approximately 3n/2 - 2.",
      "difficulty": "Advanced"
    },
    {
      "q": "Why is Quick Sort practically faster in practice than Merge Sort and Heap Sort on modern CPUs?",
      "options": [
        "It performs fewer comparisons",
        "Good cache locality of reference and minimal pointer dereferencing",
        "It uses multiple threads automatically",
        "It has lower Big-O bound"
      ],
      "answer": 1,
      "explanation": "Quick Sort works sequentially within contiguous cache blocks without secondary array copies.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the lower bound for comparison-based sorting algorithms in the worst case?",
      "options": [
        "Ω(n)",
        "Ω(n log n)",
        "Ω(n^2)",
        "Ω(log n)"
      ],
      "answer": 1,
      "explanation": "A decision tree for n! permutations requires height of at least log2(n!) = Ω(n log n).",
      "difficulty": "Advanced"
    },
    {
      "q": "Which non-comparison sort operates in O(n + k) time where k is the range of key values?",
      "options": [
        "Quick Sort",
        "Counting Sort",
        "Selection Sort",
        "Shell Sort"
      ],
      "answer": 1,
      "explanation": "Counting Sort tallies frequencies of keys in range k, completing in linear O(n + k) time.",
      "difficulty": "Intermediate"
    }
  ],
  "dsa-u5-trees": [
    {
      "q": "What is the In-Order traversal order of a Binary Tree?",
      "options": [
        "Root, Left, Right",
        "Left, Root, Right",
        "Left, Right, Root",
        "Right, Root, Left"
      ],
      "answer": 1,
      "explanation": "In-Order traversal recursively visits Left Subtree -> Root Node -> Right Subtree.",
      "difficulty": "Beginner"
    },
    {
      "q": "In a Binary Search Tree (BST), what traversal sequence produces keys in strictly ascending sorted order?",
      "options": [
        "Pre-Order",
        "In-Order",
        "Post-Order",
        "Level-Order"
      ],
      "answer": 1,
      "explanation": "Because Left < Root < Right, an In-Order traversal naturally yields strictly ascending sorted values.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the balance factor of a node in an AVL tree?",
      "options": [
        "Height(Left) - Height(Right)",
        "Number of children",
        "Degree of node",
        "Depth of node"
      ],
      "answer": 0,
      "explanation": "Balance Factor = Height(Left Subtree) - Height(Right Subtree), and must be in {-1, 0, +1}.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the maximum number of nodes in a binary tree of height h (where height of single-node tree is 0)?",
      "options": [
        "2^h",
        "2^(h+1) - 1",
        "2h",
        "h^2"
      ],
      "answer": 1,
      "explanation": "A full binary tree contains 2^(h+1) - 1 nodes across levels 0 to h.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What rotation is required in an AVL tree when an insertion occurs in the Right subtree of a Left child (LR imbalance)?",
      "options": [
        "Single Left Rotation (LL)",
        "Single Right Rotation (RR)",
        "Left-Right Double Rotation (LR)",
        "Right-Left Double Rotation (RL)"
      ],
      "answer": 2,
      "explanation": "An LR imbalance requires a Left rotation on the child followed by a Right rotation on the parent.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the worst-case time complexity of searching in a standard (unbalanced) Binary Search Tree with n nodes?",
      "options": [
        "O(log n)",
        "O(1)",
        "O(n)",
        "O(n log n)"
      ],
      "answer": 2,
      "explanation": "If keys are inserted in sorted order, the BST degenerates into a skewed line (linked list) of height n, taking O(n).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the time complexity of search, insertion, and deletion in an AVL tree with n nodes?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n^2)"
      ],
      "answer": 1,
      "explanation": "Strict height-balancing guarantees height h <= 1.44 log2(n), ensuring O(log n) operations in all cases.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In a complete binary tree with n nodes stored in an array starting at index 1, where is the parent of node i located?",
      "options": [
        "2 * i",
        "2 * i + 1",
        "floor(i / 2)",
        "i - 1"
      ],
      "answer": 2,
      "explanation": "For 1-based indexing, the parent of node i is at index floor(i / 2).",
      "difficulty": "Beginner"
    },
    {
      "q": "Which traversal of a tree uses a Queue data structure?",
      "options": [
        "Pre-Order",
        "In-Order",
        "Post-Order",
        "Level-Order (Breadth-First)"
      ],
      "answer": 3,
      "explanation": "Level-Order traversal inspects nodes level by level, enqueueing children and dequeueing visited nodes.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Threaded Binary Tree?",
      "options": [
        "A tree executed across multi-core threads",
        "A binary tree where null pointers are replaced with pointers to in-order predecessor or successor",
        "A tree with cyclic edges",
        "A tree where each node has 3 children"
      ],
      "answer": 1,
      "explanation": "Threaded binary trees utilize null pointer fields to store threads pointing to in-order successors/predecessors.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the In-Order predecessor of a node in a Binary Search Tree?",
      "options": [
        "The minimum value in its left subtree",
        "The maximum value in its left subtree",
        "Its parent node",
        "The minimum value in its right subtree"
      ],
      "answer": 1,
      "explanation": "The in-order predecessor is the largest element smaller than the current node (rightmost node in left subtree).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the minimum number of nodes in an AVL tree of height h (where h0=1 node, h1=2 nodes)?",
      "options": [
        "N(h) = N(h-1) + N(h-2) + 1",
        "N(h) = 2^h",
        "N(h) = 2h + 1",
        "N(h) = h^2"
      ],
      "answer": 0,
      "explanation": "AVL minimum nodes follow Fibonacci-like recurrence: N(h) = N(h-1) + N(h-2) + 1.",
      "difficulty": "Advanced"
    },
    {
      "q": "In a full binary tree with L leaves, how many internal (non-leaf) nodes are there?",
      "options": [
        "L - 1",
        "L + 1",
        "2L",
        "L / 2"
      ],
      "answer": 0,
      "explanation": "In any strictly binary tree where every node has 0 or 2 children, InternalNodes = Leaves - 1.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which tree structure is commonly used to implement file systems and database indices?",
      "options": [
        "AVL Tree",
        "B-Tree / B+ Tree",
        "Binary Search Tree",
        "Threaded Binary Tree"
      ],
      "answer": 1,
      "explanation": "B-Trees and B+ Trees have large branching factors, minimizing expensive disk block I/O operations.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Pre-Order traversal of a tree with Root 1, Left child 2, and Right child 3?",
      "options": [
        "2, 1, 3",
        "1, 2, 3",
        "2, 3, 1",
        "3, 2, 1"
      ],
      "answer": 1,
      "explanation": "Pre-Order visits Root first (1), then Left (2), then Right (3): 1, 2, 3.",
      "difficulty": "Beginner"
    },
    {
      "q": "What property defines a Max-Heap?",
      "options": [
        "Every node is smaller than its children",
        "Every node is greater than or equal to its children",
        "All leaves are on left",
        "Keys are sorted alphabetically"
      ],
      "answer": 1,
      "explanation": "In a max-heap, the value of each node is >= the values of its children, with the maximum at the root.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the time complexity to build a binary heap from an unsorted array of n elements (heapify)?",
      "options": [
        "O(n log n)",
        "O(n)",
        "O(n^2)",
        "O(log n)"
      ],
      "answer": 1,
      "explanation": "Bottom-up heap construction sums to n/4 * 1 + n/8 * 2 + ... which converges to O(n) linear time.",
      "difficulty": "Advanced"
    },
    {
      "q": "How many distinct binary search trees can be constructed from n distinct keys?",
      "options": [
        "n!",
        "2^n",
        "Catalan Number C(n) = (2n)! / ((n+1)! * n!)",
        "n^2"
      ],
      "answer": 2,
      "explanation": "The number of unique structurally valid BSTs for n keys is given by the n-th Catalan number.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the depth of the root node in a tree?",
      "options": [
        "0",
        "1",
        "-1",
        "Depends on number of children"
      ],
      "answer": 0,
      "explanation": "The depth of a node is the length of the path from the root; hence root depth is 0.",
      "difficulty": "Beginner"
    },
    {
      "q": "If a tree has n vertices, how many edges does it contain?",
      "options": [
        "n",
        "n - 1",
        "n + 1",
        "2n"
      ],
      "answer": 1,
      "explanation": "A connected acyclic graph (tree) with n vertices always contains exactly n - 1 edges.",
      "difficulty": "Beginner"
    }
  ],
  "dsa-u6-graphs": [
    {
      "q": "Which data structure is typically used to implement Breadth First Search (BFS) on a graph?",
      "options": [
        "Stack",
        "Queue",
        "Priority Queue",
        "Binary Search Tree"
      ],
      "answer": 1,
      "explanation": "BFS explores vertices level-by-level using a FIFO Queue.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which algorithm finds the Single Source Shortest Path on a weighted graph with non-negative edge weights?",
      "options": [
        "Prim's Algorithm",
        "Dijkstra's Algorithm",
        "Kruskal's Algorithm",
        "Floyd-Warshall Algorithm"
      ],
      "answer": 1,
      "explanation": "Dijkstra's algorithm uses a greedy approach with a min-priority queue to find shortest paths from a single source.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the time complexity of Breadth First Search (BFS) using an adjacency list representation with V vertices and E edges?",
      "options": [
        "O(V^2)",
        "O(V + E)",
        "O(E log V)",
        "O(V * E)"
      ],
      "answer": 1,
      "explanation": "Each vertex is enqueued once and every incident edge is inspected once, yielding O(V + E).",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which algorithm finds a Minimum Spanning Tree (MST) by sorting all edges and adding the lowest-weight edges that do not form a cycle?",
      "options": [
        "Dijkstra's Algorithm",
        "Kruskal's Algorithm",
        "Bellman-Ford Algorithm",
        "Warshall's Algorithm"
      ],
      "answer": 1,
      "explanation": "Kruskal's algorithm sorts edges by weight and uses a Disjoint-Set Union (DSU) to avoid cycles.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Topological Sorting?",
      "options": [
        "Sorting graph nodes by degree",
        "A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge (u, v), u comes before v",
        "Alphabetical sorting of vertex labels",
        "Finding the longest path"
      ],
      "answer": 1,
      "explanation": "Topological sorting is a linear ordering of vertices in a DAG respecting precedence constraints.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Can Dijkstra's algorithm guarantee correct results on graphs containing negative edge weights?",
      "options": [
        "Yes, always",
        "No, it can produce incorrect shortest path distances",
        "Only if the graph is undirected",
        "Only if there are no cycles"
      ],
      "answer": 1,
      "explanation": "Dijkstra's greedy assumption assumes path distances never decrease; negative weights violate this (use Bellman-Ford).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the space complexity of an Adjacency Matrix for a graph with V vertices?",
      "options": [
        "O(V + E)",
        "O(V^2)",
        "O(E^2)",
        "O(log V)"
      ],
      "answer": 1,
      "explanation": "An adjacency matrix allocates a 2D V x V array, requiring O(V^2) memory regardless of edge density.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which graph traversal technique uses a Stack or recursive call stack?",
      "options": [
        "Breadth First Search (BFS)",
        "Depth First Search (DFS)",
        "Dijkstra's Search",
        "Level Order Traversal"
      ],
      "answer": 1,
      "explanation": "DFS traverses as deep as possible along each branch before backtracking, utilizing LIFO stack mechanics.",
      "difficulty": "Beginner"
    },
    {
      "q": "In an undirected graph with V vertices and no self-loops, what is the maximum number of edges possible?",
      "options": [
        "V",
        "V * (V - 1)",
        "V * (V - 1) / 2",
        "2^V"
      ],
      "answer": 2,
      "explanation": "Each vertex can connect to V-1 other vertices; dividing by 2 accounts for undirected symmetry: V(V-1)/2.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What data structure does Kruskal's algorithm use to check for cycles efficiently?",
      "options": [
        "Queue",
        "Disjoint-Set Union (DSU) / Union-Find",
        "Binary Heap",
        "Hash Map"
      ],
      "answer": 1,
      "explanation": "DSU provides near O(1) find and union operations with path compression and rank heuristics.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which algorithm finds the transitive closure of a directed graph?",
      "options": [
        "Warshall's Algorithm",
        "Dijkstra's Algorithm",
        "Prim's Algorithm",
        "DFS Traversal"
      ],
      "answer": 0,
      "explanation": "Warshall's algorithm computes the reachability matrix between all pairs of vertices in O(V^3) time.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the sum of degrees of all vertices in an undirected graph with E edges (Handshaking Lemma)?",
      "options": [
        "E",
        "2 * E",
        "E / 2",
        "V * E"
      ],
      "answer": 1,
      "explanation": "Every edge has two endpoints, contributing exactly 2 to the sum of degrees: sum(deg) = 2E.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a bipartite graph?",
      "options": [
        "A graph with two cycles",
        "A graph whose vertices can be partitioned into two disjoint sets such that every edge connects vertices across the two sets",
        "A graph with degree 2 at every vertex",
        "A graph that can be drawn on a plane"
      ],
      "answer": 1,
      "explanation": "A graph is bipartite if its vertices can be 2-colored such that no two adjacent vertices share the same color.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which of the following is equivalent to saying a graph is bipartite?",
      "options": [
        "It contains no triangles",
        "It contains no odd-length cycles",
        "It is planar",
        "It is strongly connected"
      ],
      "answer": 1,
      "explanation": "A graph is bipartite if and only if it contains no cycles of odd length.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the time complexity of Prim's algorithm using a binary min-heap and adjacency lists?",
      "options": [
        "O(V^2)",
        "O(E log V)",
        "O(V log E)",
        "O(V + E)"
      ],
      "answer": 1,
      "explanation": "Extracting min vertices takes O(V log V) and updating edge weights takes O(E log V), yielding O(E log V).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Strongly Connected Component (SCC) in a directed graph?",
      "options": [
        "A component where every vertex is connected to an external graph",
        "A maximal subgraph where every vertex is reachable from every other vertex in that subgraph",
        "A graph with no directed edges",
        "A tree with V-1 edges"
      ],
      "answer": 1,
      "explanation": "In an SCC, there exists a directed path between any pair of vertices within the component.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which algorithm finds all Strongly Connected Components in linear O(V + E) time using two DFS passes?",
      "options": [
        "Kosaraju's Algorithm",
        "Kruskal's Algorithm",
        "Prim's Algorithm",
        "Bellman-Ford Algorithm"
      ],
      "answer": 0,
      "explanation": "Kosaraju's algorithm performs one DFS on the original graph and a second DFS on the transposed graph in O(V + E).",
      "difficulty": "Advanced"
    },
    {
      "q": "What condition indicates that a directed graph contains a cycle during DFS?",
      "options": [
        "Encountering a forward edge",
        "Encountering a back edge to an ancestor currently on the recursion stack",
        "Encountering a cross edge",
        "Reaching a leaf node"
      ],
      "answer": 1,
      "explanation": "A back edge connects a vertex to an active ancestor in the DFS tree, confirming a cyclic loop.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the time complexity of the Floyd-Warshall all-pairs shortest path algorithm?",
      "options": [
        "O(V^2)",
        "O(V^3)",
        "O(V * E)",
        "O(E log V)"
      ],
      "answer": 1,
      "explanation": "Floyd-Warshall uses three nested loops iterating from 1 to V, running in O(V^3) time.",
      "difficulty": "Beginner"
    },
    {
      "q": "How many edges are in a Minimum Spanning Tree of a connected graph with V vertices?",
      "options": [
        "V",
        "V - 1",
        "V + 1",
        "E / 2"
      ],
      "answer": 1,
      "explanation": "Any spanning tree on V vertices has exactly V - 1 edges and connects all vertices without cycles.",
      "difficulty": "Beginner"
    }
  ],
  "dbms-u1-intro-er": [
    {
      "q": "Which level of database architecture describes how data is physically stored on magnetic disks or SSDs?",
      "options": [
        "Conceptual level",
        "External level",
        "Internal (Physical) level",
        "Logical level"
      ],
      "answer": 2,
      "explanation": "The internal or physical schema describes record formats, file structures, and disk access paths.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is logical data independence in database systems?",
      "options": [
        "The capacity to modify the conceptual schema without altering external schemas or application programs",
        "The ability to change storage hardware without reformatting databases",
        "The ability to run without a query optimizer",
        "Independence between client and server hardware"
      ],
      "answer": 0,
      "explanation": "Logical data independence decouples the user's external view from modifications to the conceptual schema.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In an Entity-Relationship (ER) diagram, how are Weak Entities visually represented?",
      "options": [
        "Single rectangle",
        "Double rectangle",
        "Dashed ellipse",
        "Double diamond"
      ],
      "answer": 1,
      "explanation": "Weak entities, which depend on an identifying owner entity, are drawn inside double rectangles.",
      "difficulty": "Beginner"
    },
    {
      "q": "How is a Multivalued Attribute represented in an ER diagram?",
      "options": [
        "Single ellipse",
        "Double ellipse",
        "Dashed ellipse",
        "Underlined rectangle"
      ],
      "answer": 1,
      "explanation": "Attributes that can store multiple values (e.g. phone numbers) are represented using concentric double ellipses.",
      "difficulty": "Beginner"
    },
    {
      "q": "What defines a Weak Entity Set?",
      "options": [
        "It has no primary key of its own and depends on an identifying owner entity",
        "It contains only foreign keys",
        "It has no attributes",
        "It is deleted after each transaction"
      ],
      "answer": 0,
      "explanation": "A weak entity does not possess sufficient attributes to form a primary key on its own.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How is a Derived Attribute represented in an ER diagram?",
      "options": [
        "Double rectangle",
        "Dashed ellipse",
        "Solid ellipse",
        "Rhombus"
      ],
      "answer": 1,
      "explanation": "Derived attributes (e.g., Age computed from Date_of_Birth) are drawn with dashed ellipses.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the discriminator or partial key of a weak entity set?",
      "options": [
        "A key borrowed from another table",
        "A set of attributes that distinguishes weak entity tuples belonging to the same owner",
        "A surrogate UUID",
        "The candidate key of the database"
      ],
      "answer": 1,
      "explanation": "A partial key (underlined with dashed line) distinguishes entities of the weak set that relate to the same owner entity.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is cardinality ratio in an ER relationship?",
      "options": [
        "The number of attributes in an entity",
        "The maximum number of relationship instances in which an entity can participate",
        "The size of database records in bytes",
        "The ratio of rows to columns"
      ],
      "answer": 1,
      "explanation": "Cardinality ratio specifies maximum instances (e.g., 1:1, 1:N, N:M) an entity participates in a relationship.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which ER symbol represents relationships between entity sets?",
      "options": [
        "Rectangle",
        "Diamond (Rhombus)",
        "Ellipse",
        "Triangle"
      ],
      "answer": 1,
      "explanation": "Diamonds represent relationship sets connecting entities.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is total participation of an entity set in a relationship represented by in standard ER notation?",
      "options": [
        "Single line",
        "Double line",
        "Dashed line",
        "Arrow"
      ],
      "answer": 1,
      "explanation": "Total participation (every entity instance must participate in the relationship) is drawn with double lines.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which of the following is an example of a composite attribute?",
      "options": [
        "Roll number",
        "Address (composed of Street, City, State, Pin)",
        "Age",
        "Gender"
      ],
      "answer": 1,
      "explanation": "Composite attributes can be divided into smaller sub-parts with independent meanings.",
      "difficulty": "Beginner"
    },
    {
      "q": "What role does the Data Dictionary (system catalog) play in a DBMS?",
      "options": [
        "Stores all user passwords in clear text",
        "Stores metadata describing the database schema, constraints, and authorization rules",
        "Runs periodic file backups",
        "Translates SQL into HTML"
      ],
      "answer": 1,
      "explanation": "The data dictionary stores metadata (data about data), schema definitions, and system constraints.",
      "difficulty": "Beginner"
    },
    {
      "q": "In an Extended ER (EER) model, what is Specialization?",
      "options": [
        "Combining multiple entity sets into a general superclass",
        "Top-down process of defining sub-groupings within an entity set based on distinguishing characteristics",
        "Deleting redundant attributes",
        "Adding foreign keys"
      ],
      "answer": 1,
      "explanation": "Specialization is top-down refinement where an entity set is partitioned into sub-entities.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Generalization in EER modeling?",
      "options": [
        "Bottom-up process of synthesizing multiple lower-level entity sets into a higher-level superclass",
        "Partitioning tables across servers",
        "Creating temporary tables",
        "Indexing all columns"
      ],
      "answer": 0,
      "explanation": "Generalization is the bottom-up synthesis of entity sets with shared attributes into a generalized superclass.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is an aggregation in ER modeling?",
      "options": [
        "SUM and AVG queries",
        "Treating a relationship set and its participating entities as a higher-level abstract entity",
        "Combining two tables with UNION",
        "Deleting weak entities"
      ],
      "answer": 1,
      "explanation": "Aggregation allows relationships to be treated as higher-level entities that can participate in other relationships.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the primary function of the Database Administrator (DBA)?",
      "options": [
        "Designing web UI frontends",
        "Authorizing access, monitoring performance, coordinating recovery, and managing schemas",
        "Writing client-side JavaScript",
        "Purchasing office computers"
      ],
      "answer": 1,
      "explanation": "The DBA manages overall database security, configuration, integrity constraints, and physical storage.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which level of ANSI/SPARC 3-tier architecture is seen by the end user?",
      "options": [
        "Physical schema",
        "Conceptual schema",
        "External (View) schema",
        "Internal storage level"
      ],
      "answer": 2,
      "explanation": "The external level describes customized user views tailored to specific applications or roles.",
      "difficulty": "Beginner"
    },
    {
      "q": "In an ER diagram, what does an underlined attribute in a solid ellipse signify?",
      "options": [
        "Derived attribute",
        "Primary key / Key attribute",
        "Foreign key",
        "Composite attribute"
      ],
      "answer": 1,
      "explanation": "An underlined attribute represents the primary key that uniquely identifies each entity instance.",
      "difficulty": "Beginner"
    },
    {
      "q": "What constraint enforces that an entity cannot belong to more than one subclass in specialization?",
      "options": [
        "Overlap constraint",
        "Disjoint constraint",
        "Total participation",
        "Partial key constraint"
      ],
      "answer": 1,
      "explanation": "The disjoint constraint dictates that an entity can be a member of at most one subclass.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Why is a file processing system inferior to a DBMS?",
      "options": [
        "File systems are more expensive",
        "File systems suffer from data redundancy, inconsistency, difficulty in data access, and lack of atomicity",
        "File systems do not support text files",
        "File systems have no storage limits"
      ],
      "answer": 1,
      "explanation": "Traditional file systems lack concurrency control, data integrity enforcement, and crash recovery mechanisms.",
      "difficulty": "Beginner"
    }
  ],
  "dbms-u2-relational-norm": [
    {
      "q": "Which normal form requires that all attribute values in every tuple must be atomic and non-divisible?",
      "options": [
        "1NF",
        "2NF",
        "3NF",
        "BCNF"
      ],
      "answer": 0,
      "explanation": "First Normal Form (1NF) disallows composite and multivalued attributes, requiring atomic scalar values.",
      "difficulty": "Beginner"
    },
    {
      "q": "What condition must be satisfied for a relation to be in Second Normal Form (2NF)?",
      "options": [
        "Must be in 1NF and have no partial functional dependencies on candidate keys",
        "Must be in 3NF",
        "Must have no transitive dependencies",
        "Must use only numeric keys"
      ],
      "answer": 0,
      "explanation": "2NF requires 1NF and ensures every non-prime attribute is fully functionally dependent on every candidate key.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What constitutes a transitive dependency in a relation R?",
      "options": [
        "X -> Y and Y -> Z where Z is not a candidate key and Y is not a superkey",
        "X -> Y where Y is a subset of X",
        "Foreign key referencing primary key",
        "Cyclic foreign keys"
      ],
      "answer": 0,
      "explanation": "Transitive dependency occurs when non-key attribute Z depends on non-key attribute Y which depends on X.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Boyce-Codd Normal Form (BCNF)?",
      "options": [
        "For every non-trivial functional dependency X -> Y, X must be a superkey",
        "Every non-prime attribute is partially dependent",
        "Relation must have no foreign keys",
        "Relation must be in 4NF"
      ],
      "answer": 0,
      "explanation": "BCNF is a stricter version of 3NF where every determinant X in non-trivial dependencies must be a superkey.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the key difference between 3NF and BCNF?",
      "options": [
        "3NF allows X -> Y if Y is a prime attribute even if X is not a superkey; BCNF strictly requires X to be a superkey",
        "BCNF is weaker than 3NF",
        "3NF eliminates multivalued dependencies",
        "BCNF allows partial dependencies"
      ],
      "answer": 0,
      "explanation": "3NF allows dependency X -> A if A is a prime attribute; BCNF eliminates this exception entirely.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is a Candidate Key?",
      "options": [
        "Any attribute containing integers",
        "A minimal superkey with no redundant attributes",
        "The foreign key of a child table",
        "An attribute that allows NULL values"
      ],
      "answer": 1,
      "explanation": "A candidate key is a minimal set of attributes that uniquely identifies tuples in a relation.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Entity Integrity constraint in relational databases?",
      "options": [
        "Foreign keys cannot be NULL",
        "No primary key value can be NULL",
        "Table names must be unique",
        "Every column must have check constraints"
      ],
      "answer": 1,
      "explanation": "Entity integrity mandates that primary key components cannot have NULL values.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does Referential Integrity enforce?",
      "options": [
        "A foreign key value must match an existing primary key value in the referenced relation or be NULL",
        "Primary keys must be auto-incrementing",
        "Columns cannot share the same name",
        "Queries must return results in order"
      ],
      "answer": 0,
      "explanation": "Referential integrity prevents orphaned child records by verifying foreign keys exist in parent tables.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which relational algebra operation selects tuples that satisfy a given predicate condition?",
      "options": [
        "Projection (π)",
        "Selection (σ)",
        "Cartesian Product (×)",
        "Natural Join (⋈)"
      ],
      "answer": 1,
      "explanation": "Selection (sigma σ) filters rows/tuples based on a specified boolean condition.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which relational algebra operator selects specific columns/attributes from a relation and removes duplicate tuples?",
      "options": [
        "Selection (σ)",
        "Projection (π)",
        "Union (∪)",
        "Rename (ρ)"
      ],
      "answer": 1,
      "explanation": "Projection (pi π) extracts specified columns and discards unwanted attributes.",
      "difficulty": "Beginner"
    },
    {
      "q": "What condition must two relations R and S satisfy to perform Union (R ∪ S)?",
      "options": [
        "They must have the same number of rows",
        "They must be Union-Compatible (same number of attributes with compatible domains)",
        "They must have identical primary keys",
        "They must reside on the same server"
      ],
      "answer": 1,
      "explanation": "Union compatibility requires the same number of columns with corresponding data types.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Lossless-Join Decomposition?",
      "options": [
        "A decomposition where no rows are dropped when projecting",
        "A decomposition of R into R1 and R2 such that R1 ⋈ R2 equals original relation R exactly",
        "A join without foreign keys",
        "A join that preserves all primary keys"
      ],
      "answer": 1,
      "explanation": "Lossless-join guarantees that natural joining decomposed tables reproduces original tuples without spurious data.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What mathematical property tests if decomposition of R into (R1, R2) is lossless under functional dependencies F?",
      "options": [
        "(R1 ∩ R2) -> R1 or (R1 ∩ R2) -> R2 must belong to F+",
        "R1 ∪ R2 must be empty",
        "R1 and R2 must have no attributes in common",
        "R1 must equal R2"
      ],
      "answer": 0,
      "explanation": "The intersection of attributes must functionally determine either R1 or R2.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is Armstrong's Axiom of Reflexivity?",
      "options": [
        "If X ⊆ Y, then Y -> X",
        "If Y ⊆ X, then X -> Y",
        "If X -> Y, then XZ -> YZ",
        "If X -> Y and Y -> Z, then X -> Z"
      ],
      "answer": 1,
      "explanation": "Reflexivity states that if Y is a subset of X, then X functionally determines Y.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the closure of an attribute set X (denoted X+) represent?",
      "options": [
        "The number of rows in the table",
        "The set of all attributes that are functionally determined by X under given dependencies",
        "All NULL values in column X",
        "The primary key of X"
      ],
      "answer": 1,
      "explanation": "Attribute closure X+ contains all attributes logically determined by X using Armstrong's axioms.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which normal form addresses Multi-Valued Dependencies (MVD)?",
      "options": [
        "2NF",
        "3NF",
        "4NF",
        "5NF"
      ],
      "answer": 2,
      "explanation": "Fourth Normal Form (4NF) removes non-trivial multivalued dependencies (X ->-> Y).",
      "difficulty": "Advanced"
    },
    {
      "q": "What is Fifth Normal Form (5NF) also known as?",
      "options": [
        "Project-Join Normal Form (PJNF)",
        "Boyce-Codd Normal Form",
        "Domain-Key Normal Form",
        "Multivalued Normal Form"
      ],
      "answer": 0,
      "explanation": "5NF, or Project-Join Normal Form, deals with join dependencies that cannot be decomposed into 2-way joins.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is a Superkey in relational databases?",
      "options": [
        "A key with encryption enabled",
        "A set of one or more attributes that uniquely identifies a tuple within a relation",
        "A key with at least 5 columns",
        "The secondary index"
      ],
      "answer": 1,
      "explanation": "Any superset of attributes that uniquely distinguishes tuples is a superkey.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Cartesian Product (R × S) of relation R with m tuples and relation S with n tuples?",
      "options": [
        "m + n tuples",
        "m * n tuples",
        "max(m, n) tuples",
        "m / n tuples"
      ],
      "answer": 1,
      "explanation": "Cartesian product pairs every tuple of R with every tuple of S, yielding m * n tuples.",
      "difficulty": "Beginner"
    },
    {
      "q": "Why might a database designer intentionally choose Denormalization?",
      "options": [
        "To eliminate all SQL queries",
        "To improve read query performance by reducing the need for expensive multi-table JOINs",
        "To save hard disk space",
        "To remove database security"
      ],
      "answer": 1,
      "explanation": "Denormalization introduces controlled redundancy to accelerate frequent read-heavy reporting queries.",
      "difficulty": "Intermediate"
    }
  ],
  "dbms-u3-sql": [
    {
      "q": "Which SQL clause is used to filter aggregated group results generated by the GROUP BY clause?",
      "options": [
        "WHERE",
        "HAVING",
        "ORDER BY",
        "FILTER"
      ],
      "answer": 1,
      "explanation": "HAVING filters groups post-aggregation; WHERE filters individual records before aggregation.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the key functional difference between TRUNCATE and DELETE commands in SQL?",
      "options": [
        "DELETE is DDL while TRUNCATE is DML",
        "TRUNCATE is a DDL command that deallocates data pages rapidly without logging row deletions; DELETE is DML that removes rows one-by-one",
        "TRUNCATE allows WHERE clauses; DELETE does not",
        "DELETE drops table schema"
      ],
      "answer": 1,
      "explanation": "TRUNCATE deallocates pages instantly (DDL) and cannot be filtered with WHERE, unlike DELETE (DML).",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which JOIN returns all rows from the left table and matched rows from the right table, filling missing right values with NULL?",
      "options": [
        "INNER JOIN",
        "LEFT OUTER JOIN",
        "RIGHT OUTER JOIN",
        "CROSS JOIN"
      ],
      "answer": 1,
      "explanation": "LEFT OUTER JOIN preserves every row from the left table regardless of right table matches.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which SQL constraint guarantees that all values in a column are distinct and not null?",
      "options": [
        "UNIQUE",
        "NOT NULL",
        "PRIMARY KEY",
        "CHECK"
      ],
      "answer": 2,
      "explanation": "PRIMARY KEY combines UNIQUE and NOT NULL constraints into one identifier.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the SQL command GRANT SELECT ON students TO user1; accomplish?",
      "options": [
        "Revokes access from user1",
        "Authorizes user1 to read rows from the students table (DCL command)",
        "Creates a student view for user1",
        "Changes user1's password"
      ],
      "answer": 1,
      "explanation": "GRANT is a Data Control Language (DCL) statement that assigns database permissions to roles or users.",
      "difficulty": "Beginner"
    },
    {
      "q": "What type of subquery references columns from the outer query and executes once for each candidate row of the outer query?",
      "options": [
        "Scalar subquery",
        "Correlated subquery",
        "Independent subquery",
        "View subquery"
      ],
      "answer": 1,
      "explanation": "A correlated subquery depends on current row values of the outer query for its evaluation.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the result of the SQL expression: SELECT COUNT(*) FROM table WHERE val = NULL;?",
      "options": [
        "0, because NULL cannot be compared using = (must use IS NULL)",
        "Total rows in table",
        "Syntax error",
        "Throws NullPointerException"
      ],
      "answer": 0,
      "explanation": "Comparisons with NULL using '=' evaluate to UNKNOWN, returning 0 matched rows.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which aggregate function ignores NULL values when calculating averages in SQL?",
      "options": [
        "COUNT(*)",
        "AVG(column_name)",
        "SUM_NULL()",
        "MEAN()"
      ],
      "answer": 1,
      "explanation": "AVG(column) sums non-null values and divides by the count of non-null rows.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an index in SQL and why is it used?",
      "options": [
        "A copy of the entire table on another drive",
        "A B-tree / hash auxiliary data structure that speeds up query retrieval operations at the cost of slower writes",
        "A visual diagram of table columns",
        "A command that drops tables"
      ],
      "answer": 1,
      "explanation": "Indexes provide rapid pointer lookups to matching rows without scanning the whole table.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a SQL View?",
      "options": [
        "A physical hard drive partition",
        "A virtual table based on the result-set of a stored SQL query",
        "A backup snapshot",
        "An animated database chart"
      ],
      "answer": 1,
      "explanation": "A View is a virtual table that encapsulates a SELECT query and dynamically renders data on demand.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which SQL statement is used to remove an existing table and its entire schema structure permanently?",
      "options": [
        "DELETE TABLE table_name;",
        "DROP TABLE table_name;",
        "TRUNCATE TABLE table_name;",
        "REMOVE TABLE table_name;"
      ],
      "answer": 1,
      "explanation": "DROP TABLE destroys both the table data and metadata definition in the catalog.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of the COMMIT statement in SQL?",
      "options": [
        "Rolls back uncommitted changes",
        "Permanently saves all changes made by the current transaction to the database",
        "Locks the table against reads",
        "Creates a checkpoint in the log"
      ],
      "answer": 1,
      "explanation": "COMMIT ends the active transaction and commits updates permanently to disk.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the SQL command ROLLBACK do?",
      "options": [
        "Deletes all tables",
        "Undoes transactions that have not yet been saved with COMMIT",
        "Restores the database from tape",
        "Backs up the schema"
      ],
      "answer": 1,
      "explanation": "ROLLBACK reverses operations performed since the transaction began or since the last SAVEPOINT.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which operator is used for pattern matching in SQL queries with wildcards like % and _?",
      "options": [
        "MATCH",
        "LIKE",
        "CONTAINS",
        "REGEX_EQUAL"
      ],
      "answer": 1,
      "explanation": "LIKE evaluates wildcard patterns: '%' matches any sequence of characters, and '_' matches a single character.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does UNION ALL do compared to UNION in SQL?",
      "options": [
        "UNION ALL keeps duplicate rows; UNION removes duplicates",
        "UNION ALL is slower than UNION",
        "UNION ALL requires tables to have different schemas",
        "UNION ALL works only with numbers"
      ],
      "answer": 0,
      "explanation": "UNION ALL concatenates result sets without the overhead of duplicate elimination sorting.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which SQL constraint specifies that the values in a column must satisfy a boolean expression?",
      "options": [
        "DEFAULT",
        "CHECK",
        "FOREIGN KEY",
        "UNIQUE"
      ],
      "answer": 1,
      "explanation": "CHECK constraints (e.g. CHECK (age >= 18)) enforce domain validity rules on table insertions.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a clustered index in SQL Server / MySQL InnoDB?",
      "options": [
        "An index that determines the physical ordering of data rows in the table",
        "An index stored in memory only",
        "An index on foreign keys only",
        "An index created without keys"
      ],
      "answer": 0,
      "explanation": "A clustered index sorts and stores data rows in disk pages based on the clustered index key.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How many clustered indexes can a relational table have?",
      "options": [
        "1",
        "2",
        "Unlimited",
        "Up to number of columns"
      ],
      "answer": 0,
      "explanation": "Since physical data rows can only be ordered in one way on disk, a table can have only one clustered index.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the order of execution in a standard SQL query?",
      "options": [
        "SELECT -> FROM -> WHERE -> GROUP BY",
        "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
        "WHERE -> FROM -> SELECT -> GROUP BY",
        "SELECT -> ORDER BY -> WHERE"
      ],
      "answer": 1,
      "explanation": "Logical processing starts with FROM/JOINs, filters with WHERE, groups, applies HAVING, projects SELECT, and sorts ORDER BY.",
      "difficulty": "Advanced"
    },
    {
      "q": "What does the COALESCE(val1, val2, val3) function return in SQL?",
      "options": [
        "The average of values",
        "The first non-null expression among its arguments",
        "The maximum value",
        "A concatenated string"
      ],
      "answer": 1,
      "explanation": "COALESCE evaluates arguments in sequence and returns the first argument that is not NULL.",
      "difficulty": "Intermediate"
    }
  ],
  "dbms-u4-plsql": [
    {
      "q": "Which section of a PL/SQL block is mandatory for the block to be syntactically valid?",
      "options": [
        "DECLARE section",
        "BEGIN ... END; executable section",
        "EXCEPTION section",
        "INIT section"
      ],
      "answer": 1,
      "explanation": "The executable section (BEGIN ... END;) is the only mandatory component of a PL/SQL block.",
      "difficulty": "Beginner"
    },
    {
      "q": "What are the two major components of a PL/SQL Package?",
      "options": [
        "Header and Body",
        "Specification and Body",
        "Query and Trigger",
        "Schema and Index"
      ],
      "answer": 1,
      "explanation": "Packages comprise a Package Specification (public declarations) and Package Body (private implementations).",
      "difficulty": "Beginner"
    },
    {
      "q": "Which cursor attribute returns TRUE if an INSERT, UPDATE, or DELETE affected one or more rows?",
      "options": [
        "%ISOPEN",
        "%FOUND",
        "%NOTFOUND",
        "%ROWCOUNT"
      ],
      "answer": 1,
      "explanation": "%FOUND returns TRUE if an SQL DML statement successfully touched at least one row.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an Explicit Cursor in PL/SQL?",
      "options": [
        "A cursor opened automatically for single SELECT queries",
        "A programmer-declared cursor to process multi-row query results one row at a time",
        "A cursor that cannot be closed",
        "A database index pointer"
      ],
      "answer": 1,
      "explanation": "Explicit cursors are explicitly declared, opened, fetched, and closed by the developer to handle multiple rows.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the correct sequence of operations when managing an explicit cursor in PL/SQL?",
      "options": [
        "FETCH -> OPEN -> DECLARE -> CLOSE",
        "DECLARE -> OPEN -> FETCH -> CLOSE",
        "OPEN -> DECLARE -> FETCH -> CLOSE",
        "CLOSE -> OPEN -> FETCH -> DECLARE"
      ],
      "answer": 1,
      "explanation": "The lifecycle of an explicit cursor is: DECLARE cursor, OPEN cursor, FETCH rows in a loop, and CLOSE cursor.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Database Trigger in PL/SQL?",
      "options": [
        "A button clicked in a web interface",
        "A stored PL/SQL procedure that automatically executes in response to specified database events (like INSERT, UPDATE, DELETE)",
        "A scheduled backup cron",
        "A key constraint"
      ],
      "answer": 1,
      "explanation": "Triggers fire automatically when specified DML/DDL events occur on an associated table or view.",
      "difficulty": "Beginner"
    },
    {
      "q": "What clause distinguishes a Row-Level Trigger from a Statement-Level Trigger in PL/SQL?",
      "options": [
        "FOR EACH ROW",
        "FOR ALL ROWS",
        "EXECUTE ROW",
        "APPLY TO EACH"
      ],
      "answer": 0,
      "explanation": "Specifying 'FOR EACH ROW' creates a row-level trigger that fires once for every row modified.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In a PL/SQL row-level trigger, what pseudo-record contains values of columns BEFORE modification?",
      "options": [
        ":OLD",
        ":NEW",
        ":PREV",
        ":INITIAL"
      ],
      "answer": 0,
      "explanation": ":OLD holds original column values before an UPDATE or DELETE operation executes.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the difference between a Stored Procedure and a Function in PL/SQL?",
      "options": [
        "Procedures must return a value; functions cannot",
        "Functions must return a value via the RETURN clause; procedures do not have to return values",
        "Procedures run in browser; functions run in database",
        "Functions cannot accept parameters"
      ],
      "answer": 1,
      "explanation": "Functions must compute and return a value using RETURN; procedures perform actions without mandatory returns.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which parameter mode allows values to be passed into a PL/SQL subprogram and updated values to be returned to the caller?",
      "options": [
        "IN",
        "OUT",
        "IN OUT",
        "REF"
      ],
      "answer": 2,
      "explanation": "The IN OUT parameter mode enables passing an initial value that can be modified and read back by the caller.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the %TYPE attribute in PL/SQL variable declaration achieve?",
      "options": [
        "Converts a string to number",
        "Inherits the exact data type of a specified database table column or variable",
        "Defines a new user type",
        "Creates a composite record"
      ],
      "answer": 1,
      "explanation": "table.column%TYPE anchors a variable to the column's data type, adapting automatically if the schema changes.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the %ROWTYPE attribute do?",
      "options": [
        "Counts rows in a table",
        "Declares a record variable whose structure matches an entire row of a table or cursor",
        "Converts rows into JSON",
        "Deletes empty rows"
      ],
      "answer": 1,
      "explanation": "%ROWTYPE declares a composite record with fields corresponding to all columns in a table or cursor.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which built-in exception is raised when a SELECT INTO statement returns more than one row?",
      "options": [
        "NO_DATA_FOUND",
        "TOO_MANY_ROWS",
        "ZERO_DIVIDE",
        "VALUE_ERROR"
      ],
      "answer": 1,
      "explanation": "TOO_MANY_ROWS is raised when an implicit singleton SELECT ... INTO query produces multiple records.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which built-in exception is raised when a SELECT INTO statement returns no rows at all?",
      "options": [
        "EMPTY_QUERY",
        "NO_DATA_FOUND",
        "NULL_POINTER",
        "CASE_NOT_FOUND"
      ],
      "answer": 1,
      "explanation": "NO_DATA_FOUND fires when an implicit singleton query finds no matching records.",
      "difficulty": "Beginner"
    },
    {
      "q": "How can user-defined exceptions be explicitly raised in PL/SQL?",
      "options": [
        "RAISE exception_name;",
        "THROW exception_name;",
        "CATCH exception_name;",
        "EMIT exception_name;"
      ],
      "answer": 0,
      "explanation": "The RAISE keyword triggers execution of user-defined or system exceptions.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Cursor FOR Loop in PL/SQL?",
      "options": [
        "A loop that requires manual OPEN, FETCH, and CLOSE",
        "A convenience loop that automatically opens the cursor, fetches records, and closes it when done",
        "An infinite loop",
        "A loop that skips NULL rows"
      ],
      "answer": 1,
      "explanation": "Cursor FOR loops automate opening, fetching row by row, and closing the cursor upon loop exit.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is an INSTEAD OF trigger used for in PL/SQL?",
      "options": [
        "To replace table primary keys",
        "To make non-updatable complex views modifiable by intercepting DML statements",
        "To drop tables on schedule",
        "To bypass transactions"
      ],
      "answer": 1,
      "explanation": "INSTEAD OF triggers fire in place of DML on complex views, updating the underlying base tables properly.",
      "difficulty": "Advanced"
    },
    {
      "q": "What error occurs if a trigger attempts to read or modify a table that is currently undergoing DML changes (mutating table)?",
      "options": [
        "Deadlock Detected",
        "ORA-04091: table is mutating, trigger/function may not see it",
        "Memory Violation",
        "Stack Overflow"
      ],
      "answer": 1,
      "explanation": "Mutating table errors occur when a row-level trigger queries or modifies the same table that triggered it.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the purpose of the PRAGMA AUTONOMOUS_TRANSACTION compiler directive?",
      "options": [
        "Executes queries in parallel",
        "Allows a subprogram to execute an independent transaction that commits or rolls back without affecting the main transaction",
        "Encrypts stored code",
        "Enables multi-threading"
      ],
      "answer": 1,
      "explanation": "Autonomous transactions run outside the context of caller transactions, useful for logging errors independently.",
      "difficulty": "Advanced"
    },
    {
      "q": "Which construct allows grouping related PL/SQL variables into a single record type?",
      "options": [
        "TYPE record_name IS RECORD (...);",
        "CREATE TABLE",
        "DEF STRUCT",
        "GROUP BY RECORD"
      ],
      "answer": 0,
      "explanation": "The TYPE ... IS RECORD statement defines custom composite record structures in PL/SQL.",
      "difficulty": "Intermediate"
    }
  ],
  "dbms-u5-transactions": [
    {
      "q": "Which ACID property guarantees that all operations of a transaction execute completely, or none at all (all-or-nothing)?",
      "options": [
        "Atomicity",
        "Consistency",
        "Isolation",
        "Durability"
      ],
      "answer": 0,
      "explanation": "Atomicity ensures that a transaction is treated as a single atomic unit of work.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which ACID property ensures that the database remains in a valid state satisfying all integrity constraints before and after execution?",
      "options": [
        "Atomicity",
        "Consistency",
        "Isolation",
        "Durability"
      ],
      "answer": 1,
      "explanation": "Consistency guarantees that execution preserves invariants and schema integrity constraints.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which ACID property guarantees that concurrently executing transactions do not interfere with each other?",
      "options": [
        "Atomicity",
        "Consistency",
        "Isolation",
        "Durability"
      ],
      "answer": 2,
      "explanation": "Isolation guarantees that intermediate states of a transaction are hidden from concurrent transactions.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which ACID property guarantees that once a transaction commits, its changes survive system crashes or power failures?",
      "options": [
        "Atomicity",
        "Consistency",
        "Isolation",
        "Durability"
      ],
      "answer": 3,
      "explanation": "Durability guarantees committed data persists permanently in non-volatile storage.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Conflict Serializable schedule?",
      "options": [
        "A schedule with no conflicts",
        "A schedule that can be transformed into a serial schedule by swapping non-conflicting adjacent operations",
        "A schedule that has no locks",
        "A schedule executed on one CPU"
      ],
      "answer": 1,
      "explanation": "Conflict serializability ensures equivalent behavior to a serial schedule by swapping non-conflicting pairs.",
      "difficulty": "Intermediate"
    },
    {
      "q": "When do two operations in a concurrent schedule conflict?",
      "options": [
        "They belong to the same transaction",
        "They belong to different transactions, access the same data item, and at least one is a Write operation",
        "They both perform Read operations",
        "They occur at different times"
      ],
      "answer": 1,
      "explanation": "Operations conflict if they are issued by different transactions on the same item, and at least one is a write.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What tool is used to test if a concurrent schedule is Conflict Serializable?",
      "options": [
        "Precedence Graph (Serialization Graph)",
        "Venn Diagram",
        "ER Diagram",
        "Histogram"
      ],
      "answer": 0,
      "explanation": "A schedule is conflict serializable if and only if its precedence graph contains no directed cycles.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What rule defines the Two-Phase Locking (2PL) protocol?",
      "options": [
        "A transaction cannot release any locks until it has acquired all locks (Growing phase followed by Shrinking phase)",
        "Transactions must lock tables twice",
        "Transactions must use two different keys",
        "Transactions have 2 seconds to complete"
      ],
      "answer": 0,
      "explanation": "2PL prohibits acquiring new locks once any lock has been released (Growing -> Shrinking).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the Basic 2PL protocol guarantee?",
      "options": [
        "Freedom from deadlocks",
        "Conflict serializability",
        "Fastest execution speed",
        "Zero memory overhead"
      ],
      "answer": 1,
      "explanation": "Basic 2PL guarantees conflict serializability, but it does NOT prevent deadlocks.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Strict Two-Phase Locking (Strict 2PL)?",
      "options": [
        "All exclusive (write) locks must be held until the transaction commits or aborts",
        "No shared locks allowed",
        "All locks released immediately after write",
        "Only one transaction can run at a time"
      ],
      "answer": 0,
      "explanation": "Strict 2PL holds all exclusive locks until commit/abort, preventing cascading aborts.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Cascading Abort (Cascading Rollback)?",
      "options": [
        "When one transaction commits causing others to commit",
        "When the failure of one transaction forces other dependent transactions that read uncommitted data to roll back",
        "When memory runs out",
        "When queries timeout"
      ],
      "answer": 1,
      "explanation": "Cascading aborts occur when transactions read dirty data written by an uncommitted transaction that later aborts.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Dirty Read anomaly?",
      "options": [
        "A transaction reads data written by another uncommitted transaction that subsequently aborts",
        "Reading data twice and getting different results",
        "Reading old data from tape",
        "Reading NULL values"
      ],
      "answer": 0,
      "explanation": "Dirty read happens when T2 reads an item modified by uncommitted T1; if T1 rolls back, T2 read invalid state.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Non-Repeatable Read anomaly?",
      "options": [
        "Reading the same row twice within a transaction yields different values because another transaction modified and committed it",
        "A query that runs only once",
        "A query that fails with an error",
        "A transaction that cannot write"
      ],
      "answer": 0,
      "explanation": "Non-repeatable read occurs when T1 reads an item, T2 updates/deletes it and commits, and T1 re-reads different data.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Phantom Read anomaly?",
      "options": [
        "A ghost transaction",
        "A transaction re-executes a range query and finds new rows inserted and committed by another transaction",
        "Reading from deleted tables",
        "Reading from index files"
      ],
      "answer": 1,
      "explanation": "Phantom read occurs when a transaction queries a range of rows and another transaction inserts new matching rows.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which SQL transaction isolation level prevents all anomalies: dirty reads, non-repeatable reads, and phantom reads?",
      "options": [
        "Read Uncommitted",
        "Read Committed",
        "Repeatable Read",
        "Serializable"
      ],
      "answer": 3,
      "explanation": "Serializable is the highest isolation level, completely eliminating dirty, non-repeatable, and phantom reads.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Deadlock in database concurrency?",
      "options": [
        "When a query finishes in 0 seconds",
        "A cycle of transactions where each is waiting for a lock held by another transaction in the cycle",
        "When the power fails",
        "When hard disks are disconnected"
      ],
      "answer": 1,
      "explanation": "Deadlock is a circular wait condition where none of the involved transactions can make progress.",
      "difficulty": "Beginner"
    },
    {
      "q": "How can deadlocks be detected by a DBMS?",
      "options": [
        "By checking CPU temperature",
        "By constructing a Wait-For Graph (WFG) and detecting directed cycles",
        "By counting tables",
        "By measuring network bandwidth"
      ],
      "answer": 1,
      "explanation": "A cycle in a Wait-For Graph (where nodes are transactions and edges represent lock waits) indicates a deadlock.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Wait-Die deadlock prevention scheme?",
      "options": [
        "Older transaction waits for younger; younger transaction dies (rolls back) if it requests a lock held by older",
        "Younger transaction kills older",
        "All transactions wait indefinitely",
        "Transactions die after 10 seconds"
      ],
      "answer": 0,
      "explanation": "Wait-Die is a non-preemptive timestamp scheme: older waits, younger dies.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is Write-Ahead Logging (WAL) in database recovery?",
      "options": [
        "Writing data before creating tables",
        "Log records describing changes must be flushed to non-volatile disk BEFORE the corresponding dirty data pages are written",
        "Writing documentation before coding",
        "Writing SQL in log files"
      ],
      "answer": 1,
      "explanation": "WAL protocol ensures recovery log records reach disk before dirty pages to guarantee rollback ability.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What happens during Checkpointing in database recovery?",
      "options": [
        "Database is deleted",
        "Dirty buffer pages are flushed to disk, and a checkpoint record is written to the log to limit recovery time",
        "All users are logged out",
        "Passwords are reset"
      ],
      "answer": 1,
      "explanation": "Checkpointing synchronizes memory buffers with disk, bounding the number of log records needed during crash recovery.",
      "difficulty": "Intermediate"
    }
  ],
  "dbms-u6-nosql": [
    {
      "q": "According to the CAP Theorem, which two guarantees must a distributed system choose between when a network partition (P) occurs?",
      "options": [
        "Consistency and Availability",
        "Concurrency and Atomicity",
        "Performance and Security",
        "Durability and Scalability"
      ],
      "answer": 0,
      "explanation": "When network partitions occur, distributed systems must trade off between strict Consistency (CP) or high Availability (AP).",
      "difficulty": "Beginner"
    },
    {
      "q": "Which data model does MongoDB use to store records?",
      "options": [
        "Tables with fixed rows and columns",
        "BSON (Binary JSON) documents organized in collections",
        "Triplets of subjects, predicates, objects",
        "Tab-separated text files"
      ],
      "answer": 1,
      "explanation": "MongoDB stores data as flexible, self-describing BSON documents within collections.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the BASE acronym stand for in NoSQL distributed database systems?",
      "options": [
        "Basic, ACID, Secure, Efficient",
        "Basically Available, Soft state, Eventual consistency",
        "Binary, Asynchronous, Storage, Engine",
        "Base, Array, Structured, Entity"
      ],
      "answer": 1,
      "explanation": "BASE contrasts with ACID by prioritizing availability and acknowledging gradual convergence via eventual consistency.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which type of NoSQL database is Neo4j?",
      "options": [
        "Key-Value Store",
        "Document Store",
        "Graph Database",
        "Wide-Column Store"
      ],
      "answer": 2,
      "explanation": "Neo4j is a graph database optimized for traversing highly interconnected nodes, edges, and properties.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which type of NoSQL database is Redis?",
      "options": [
        "In-memory Key-Value Store",
        "Relational Database",
        "Graph Database",
        "XML Database"
      ],
      "answer": 0,
      "explanation": "Redis is a high-speed in-memory data store using key-value structures like strings, hashes, and sorted sets.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which NoSQL category do Apache Cassandra and Google Bigtable belong to?",
      "options": [
        "Wide-Column (Column-Family) Stores",
        "Pure Document Stores",
        "Relational Stores",
        "Graph Stores"
      ],
      "answer": 0,
      "explanation": "Cassandra and Bigtable organize data into dynamic column families indexed by row keys.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Horizontal Scaling (Sharding) in NoSQL databases?",
      "options": [
        "Upgrading to a bigger CPU and more RAM on a single machine",
        "Partitioning and distributing dataset rows/documents across multiple commodity servers",
        "Deleting old records to save space",
        "Splitting tables into columns"
      ],
      "answer": 1,
      "explanation": "Sharding scales out horizontally by distributing subsets of data across a cluster of servers.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Eventual Consistency in distributed systems?",
      "options": [
        "Data is never consistent",
        "If no new updates are made, all replicas will eventually converge and return the same value",
        "Data is consistent only on weekends",
        "Queries always block until all servers reply"
      ],
      "answer": 1,
      "explanation": "Eventual consistency guarantees that in the absence of new writes, all replica nodes eventually hold identical data.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In MongoDB, what is equivalent to a 'Table' in an RDBMS?",
      "options": [
        "Document",
        "Collection",
        "Field",
        "Index"
      ],
      "answer": 1,
      "explanation": "A MongoDB Collection groups multiple documents together, analogous to a relational table.",
      "difficulty": "Beginner"
    },
    {
      "q": "In MongoDB, what is equivalent to a 'Row' or 'Tuple' in an RDBMS?",
      "options": [
        "Schema",
        "Database",
        "Document",
        "Column"
      ],
      "answer": 2,
      "explanation": "An individual BSON Document corresponds directly to a row or tuple in a relational database.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the primary key field created automatically for every document in MongoDB?",
      "options": [
        "id",
        "_id",
        "primary_key",
        "doc_key"
      ],
      "answer": 1,
      "explanation": "MongoDB assigns a unique 12-byte ObjectId to the '_id' field by default if not supplied.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the main limitation of RDBMS that led to the rise of NoSQL architectures?",
      "options": [
        "Inability to run on Linux",
        "Difficulty scaling out horizontally across distributed clusters for unstructured, high-velocity Big Data",
        "Slow arithmetic operations",
        "Lack of SQL syntax"
      ],
      "answer": 1,
      "explanation": "Traditional relational databases struggle to scale writes horizontally across massive distributed commodity hardware.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In the context of the PACELC theorem, what does it extend beyond the CAP theorem?",
      "options": [
        "Considers performance in cloud environments",
        "States that if there is a Partition (P), trade off Availability (A) and Consistency (C); Else (E), trade off Latency (L) and Consistency (C)",
        "Adds Security and Encryption guarantees",
        "Measures disk wear and tear"
      ],
      "answer": 1,
      "explanation": "PACELC accounts for normal operating conditions: even without partitions (Else), systems trade off Latency vs Consistency.",
      "difficulty": "Advanced"
    },
    {
      "q": "Which query language is used by Neo4j for graph traversals?",
      "options": [
        "SQL",
        "Cypher",
        "SPARQL",
        "GraphQL"
      ],
      "answer": 1,
      "explanation": "Neo4j uses Cypher, a declarative graph query language matching patterns like (n:Person)-[:FRIENDS_WITH]->(m).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a major advantage of Document Stores over Relational Databases for agile software development?",
      "options": [
        "Zero CPU usage",
        "Schema flexibility: documents can evolve without running expensive ALTER TABLE schema migrations",
        "No need for primary keys",
        "Guaranteed single-threaded safety"
      ],
      "answer": 1,
      "explanation": "Document databases are schema-free/dynamic, allowing fields to vary across documents without table alterations.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is MapReduce in Big Data processing?",
      "options": [
        "A hardware chip",
        "A distributed programming model: Map filters/sorts data, and Reduce aggregates intermediate results across nodes",
        "A CSS styling rule",
        "A compression codec"
      ],
      "answer": 1,
      "explanation": "MapReduce processes vast datasets concurrently by dividing tasks into mapping and reduction stages.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Master-Slave (Primary-Replica) replication in distributed databases?",
      "options": [
        "All nodes are identical and write simultaneously",
        "Writes are directed to a Primary node which asynchronously replicates updates to secondary read replicas",
        "Computers share the same power supply",
        "Data is copied to USB drives"
      ],
      "answer": 1,
      "explanation": "Primary-Replica topology concentrates writes on the primary node and distributes read traffic across replicas.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of Consistent Hashing in distributed NoSQL key-value stores?",
      "options": [
        "To encrypt user passwords",
        "To distribute keys across a dynamic ring of servers such that adding or removing nodes minimizes remapped keys",
        "To ensure all hash tables have the same size",
        "To prevent SQL injection"
      ],
      "answer": 1,
      "explanation": "Consistent hashing maps nodes and keys to a logical circle, remapping only K/N keys when a server joins or leaves.",
      "difficulty": "Advanced"
    },
    {
      "q": "Which NoSQL database is widely used by companies like Netflix for global multi-region active-active deployments?",
      "options": [
        "SQLite",
        "Apache Cassandra",
        "Microsoft Access",
        "FoxPro"
      ],
      "answer": 1,
      "explanation": "Cassandra's masterless peer-to-peer ring architecture supports multi-region active-active distributed setups.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is polyglot persistence in modern software architecture?",
      "options": [
        "Writing database drivers in different languages",
        "Using different database engines (e.g. Relational for billing, Redis for cache, Mongo for product catalogs, Neo4j for social graphs) suited to each task",
        "Translating SQL queries to multiple spoken languages",
        "Storing backups in multiple formats"
      ],
      "answer": 1,
      "explanation": "Polyglot persistence matches specific storage technologies to the unique needs of different microservices.",
      "difficulty": "Intermediate"
    }
  ],
  "cn-u1-intro-phy-dll": [
    {
      "q": "Which layer of the OSI model is responsible for node-to-node framing, physical MAC addressing, and error detection?",
      "options": [
        "Network Layer",
        "Data Link Layer",
        "Physical Layer",
        "Transport Layer"
      ],
      "answer": 1,
      "explanation": "The Data Link Layer packages bit streams into frames, handles hardware MAC addressing, and validates integrity.",
      "difficulty": "Beginner"
    },
    {
      "q": "In an n-node full mesh network topology, how many full-duplex physical links are required?",
      "options": [
        "n - 1",
        "n * (n - 1) / 2",
        "2n",
        "n^2"
      ],
      "answer": 1,
      "explanation": "Every node connects directly to every other node: n(n - 1) / 2 bidirectional links.",
      "difficulty": "Beginner"
    },
    {
      "q": "In HDLC bit stuffing, what bit is automatically inserted after encountering five consecutive '1' bits?",
      "options": [
        "Bit '1'",
        "Bit '0'",
        "Parity bit",
        "CRC byte"
      ],
      "answer": 1,
      "explanation": "Bit stuffing inserts a '0' after five consecutive 1s to prevent premature recognition of the flag pattern 01111110.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In the Selective Repeat ARQ protocol, if the sequence number field is m bits, what is the maximum sender and receiver window size?",
      "options": [
        "2^m",
        "2^(m - 1)",
        "2^m - 1",
        "2 * m"
      ],
      "answer": 1,
      "explanation": "To avoid sequence ambiguity between old and new packets, window size must not exceed 2^(m - 1).",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which collision handling protocol is used in legacy half-duplex Ethernet (IEEE 802.3)?",
      "options": [
        "CSMA/CA",
        "CSMA/CD",
        "Pure ALOHA",
        "Token Ring"
      ],
      "answer": 1,
      "explanation": "Ethernet uses Carrier Sense Multiple Access with Collision Detection (CSMA/CD).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the maximum theoretical channel efficiency (throughput) of Pure ALOHA?",
      "options": [
        "18.4% (1 / 2e)",
        "36.8% (1 / e)",
        "50%",
        "100%"
      ],
      "answer": 0,
      "explanation": "Pure ALOHA's vulnerable time is 2 * T_frame, resulting in maximum throughput of G * e^(-2G) = 1/(2e) ≈ 18.4%.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the maximum throughput of Slotted ALOHA?",
      "options": [
        "18.4%",
        "36.8% (1 / e)",
        "73.6%",
        "50%"
      ],
      "answer": 1,
      "explanation": "Restricting transmissions to discrete time slots halves vulnerable time to T_frame, achieving 1/e ≈ 36.8%.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What mathematical technique does Cyclic Redundancy Check (CRC) use to detect transmission errors?",
      "options": [
        "Bitwise XOR polynomial division in GF(2)",
        "Simple column parity addition",
        "MD5 hashing",
        "Two's complement addition"
      ],
      "answer": 0,
      "explanation": "CRC uses modulo-2 binary division where the frame is divided by a predetermined generator polynomial.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the standard length of an Ethernet MAC address?",
      "options": [
        "32 bits (4 bytes)",
        "48 bits (6 bytes)",
        "64 bits (8 bytes)",
        "128 bits (16 bytes)"
      ],
      "answer": 1,
      "explanation": "A MAC address is a 48-bit (6-octet) globally unique physical hardware address burned into the NIC.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which device operates primarily at Layer 2 (Data Link Layer) to forward frames based on MAC addresses?",
      "options": [
        "Hub",
        "Switch",
        "Router",
        "Gateway"
      ],
      "answer": 1,
      "explanation": "Layer 2 switches maintain MAC lookup tables to direct incoming frames specifically to destination ports.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the primary role of the Physical Layer in the OSI reference model?",
      "options": [
        "Routing packets across internetworks",
        "Transmission of raw, unstructured bit streams over physical media",
        "Managing user sessions",
        "Encrypting application payloads"
      ],
      "answer": 1,
      "explanation": "The physical layer defines mechanical, electrical, and functional specs for transmitting bits over cables or radio waves.",
      "difficulty": "Beginner"
    },
    {
      "q": "Why is CSMA/CA (Collision Avoidance) used in wireless networks (Wi-Fi 802.11) instead of CSMA/CD?",
      "options": [
        "Wireless transceivers cannot reliably detect collisions while transmitting due to signal attenuation (hidden terminal problem)",
        "CSMA/CA is faster than CSMA/CD",
        "Wi-Fi does not use radio frequencies",
        "Cables prevent collisions"
      ],
      "answer": 0,
      "explanation": "Transmitting overpowering signals masks incoming collisions in radio transceivers, requiring collision avoidance (RTS/CTS).",
      "difficulty": "Intermediate"
    },
    {
      "q": "In the Go-Back-N ARQ protocol with an m-bit sequence number, what is the maximum sender window size?",
      "options": [
        "2^m",
        "2^m - 1",
        "2^(m - 1)",
        "m"
      ],
      "answer": 1,
      "explanation": "Go-Back-N sender window size cannot exceed 2^m - 1 because the receiver window is strictly 1.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the round-trip propagation time relationship required for CSMA/CD to reliably detect collisions?",
      "options": [
        "Frame transmission time T_fr >= 2 * Propagation delay T_prop",
        "T_fr < T_prop",
        "T_prop = 0",
        "T_fr must be infinite"
      ],
      "answer": 0,
      "explanation": "A station must still be transmitting when a collision signal returns from the farthest end (T_fr >= 2 * T_prop).",
      "difficulty": "Advanced"
    },
    {
      "q": "Which transmission media offers the highest data transmission bandwidth and immunity to electromagnetic interference (EMI)?",
      "options": [
        "Unshielded Twisted Pair (UTP)",
        "Shielded Twisted Pair (STP)",
        "Coaxial Cable",
        "Fiber Optic Cable"
      ],
      "answer": 3,
      "explanation": "Fiber optic cables carry light pulses through glass cores, immune to electromagnetic noise and capable of massive bandwidth.",
      "difficulty": "Beginner"
    },
    {
      "q": "In Manchester encoding used in 10Mbps Ethernet, how is a binary bit represented?",
      "options": [
        "By high and low voltage levels without transitions",
        "By a mid-bit transition (voltage step up or step down)",
        "By changing frequencies",
        "By turning off current"
      ],
      "answer": 1,
      "explanation": "Manchester guarantees a signal transition at the center of each bit interval, enabling self-synchronization.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the PDU (Protocol Data Unit) called at the Data Link Layer?",
      "options": [
        "Packet",
        "Segment",
        "Frame",
        "Bit"
      ],
      "answer": 2,
      "explanation": "Data units are named: Physical=Bit, Data Link=Frame, Network=Packet, Transport=Segment.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the function of the Spanning Tree Protocol (IEEE 802.1D) in switched networks?",
      "options": [
        "To balance web server loads",
        "To prevent bridge loops and broadcast radiation storms in redundant Layer 2 topologies",
        "To encrypt passwords",
        "To assign IP addresses"
      ],
      "answer": 1,
      "explanation": "STP blocks redundant paths logically to create an acyclic spanning tree while preserving failover paths.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the purpose of the 8-byte Preamble and SFD in an Ethernet frame?",
      "options": [
        "To store destination MAC address",
        "To allow receiver hardware clock synchronization with the incoming signal",
        "To compute CRC",
        "To specify payload length"
      ],
      "answer": 1,
      "explanation": "The 10101010 alternating bit pattern synchronizes receiver clock circuitry before frame bytes arrive.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which multiplexing technique divides the frequency spectrum into distinct non-overlapping frequency bands assigned to different users?",
      "options": [
        "Time Division Multiplexing (TDM)",
        "Frequency Division Multiplexing (FDM)",
        "Code Division Multiple Access (CDMA)",
        "Statistical TDM"
      ],
      "answer": 1,
      "explanation": "FDM allocates separate sub-frequency bands simultaneously to distinct signal channels.",
      "difficulty": "Beginner"
    }
  ],
  "cn-u2-network-layer": [
    {
      "q": "How many total bits are used in an IPv6 address compared to an IPv4 address?",
      "options": [
        "IPv4: 32 bits, IPv6: 64 bits",
        "IPv4: 32 bits, IPv6: 128 bits",
        "IPv4: 48 bits, IPv6: 128 bits",
        "IPv4: 64 bits, IPv6: 256 bits"
      ],
      "answer": 1,
      "explanation": "IPv4 uses 32-bit addresses (~4.3 billion); IPv6 expands this to 128 bits (3.4 × 10^38 addresses).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the usable host capacity of a subnet with CIDR prefix /26?",
      "options": [
        "64",
        "62",
        "30",
        "126"
      ],
      "answer": 1,
      "explanation": "Host bits = 32 - 26 = 6 bits. Usable hosts = 2^6 - 2 (subtracting network and broadcast addresses) = 62.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which protocol translates an IP address into its corresponding physical MAC address on a local area network?",
      "options": [
        "DNS",
        "ARP (Address Resolution Protocol)",
        "DHCP",
        "ICMP"
      ],
      "answer": 1,
      "explanation": "ARP broadcasts a request to discover the hardware MAC address associated with a target IP address.",
      "difficulty": "Beginner"
    },
    {
      "q": "What issue causes the 'Count-to-Infinity' problem in Distance Vector Routing?",
      "options": [
        "Packets exceeding TTL",
        "Routing loops caused by slow convergence when an edge link fails",
        "Flooding link states",
        "Exhaustion of RAM"
      ],
      "answer": 1,
      "explanation": "Distance Vector algorithms (Bellman-Ford) propagate link breakages slowly, causing nodes to increment metrics towards infinity.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which routing protocol uses the Link State algorithm (Dijkstra's shortest path) within an Autonomous System?",
      "options": [
        "RIP (Routing Information Protocol)",
        "OSPF (Open Shortest Path First)",
        "BGP (Border Gateway Protocol)",
        "EGP"
      ],
      "answer": 1,
      "explanation": "OSPF floods Link State Advertisements (LSAs) and builds complete topology graphs using Dijkstra's algorithm.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which routing protocol serves as the de facto inter-domain path-vector routing protocol running the global Internet backbone?",
      "options": [
        "RIP",
        "OSPF",
        "BGP-4 (Border Gateway Protocol)",
        "IS-IS"
      ],
      "answer": 2,
      "explanation": "BGP connects autonomous systems globally using path-vector policies across internet backbones.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the primary role of the Time to Live (TTL) field in an IPv4 packet header?",
      "options": [
        "To measure network latency",
        "To prevent unroutable packets from circulating endlessly in routing loops",
        "To schedule packet delivery time",
        "To reserve router bandwidth"
      ],
      "answer": 1,
      "explanation": "Each router decrements TTL by 1; if TTL drops to 0, the packet is discarded and an ICMP message is sent.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which protocol is utilized by network utilities like 'ping' and 'traceroute' to send diagnostic error messages?",
      "options": [
        "TCP",
        "UDP",
        "ICMP (Internet Control Message Protocol)",
        "IGMP"
      ],
      "answer": 2,
      "explanation": "ICMP generates network operational notices like Echo Request/Reply and Time Exceeded errors.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of Network Address Translation (NAT)?",
      "options": [
        "Encrypting web pages",
        "Mapping private RFC 1918 internal IP addresses to one or more public IP addresses",
        "Compressing multimedia files",
        "Assigning domain names"
      ],
      "answer": 1,
      "explanation": "NAT allows entire private local networks to share single public IPv4 addresses, mitigating IPv4 exhaustion.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which IPv4 address class uses the default subnet mask 255.255.0.0?",
      "options": [
        "Class A",
        "Class B",
        "Class C",
        "Class D"
      ],
      "answer": 1,
      "explanation": "Class B networks allocate 16 bits for network ID and 16 bits for host ID (mask /16 or 255.255.0.0).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of the Split Horizon rule in Distance Vector routing?",
      "options": [
        "Splitting large packets",
        "Preventing a router from advertising a route back on the interface from which it was learned",
        "Splitting networks into subnets",
        "Dual-homed routing"
      ],
      "answer": 1,
      "explanation": "Split Horizon stops 2-node routing loops by not sending route updates back out through the incoming port.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the loopback IPv4 address reserved for local machine testing?",
      "options": [
        "0.0.0.0",
        "127.0.0.1",
        "192.168.1.1",
        "255.255.255.255"
      ],
      "answer": 1,
      "explanation": "127.0.0.1 (part of 127.0.0.0/8) routes directly back to the local host's TCP/IP stack.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which IPv4 field enables reassembling fragmented packets at the destination host?",
      "options": [
        "Identification, Flags (DF, MF), and Fragment Offset",
        "TTL and Checksum",
        "Source and Destination IP",
        "TOS field"
      ],
      "answer": 0,
      "explanation": "Fragmented packets share an Identification value and indicate relative ordering via 8-byte Fragment Offset blocks.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What happens when an IPv4 packet exceeds the Maximum Transmission Unit (MTU) of an outbound link and the Don't Fragment (DF) flag is set to 1?",
      "options": [
        "The router ignores DF and fragments the packet",
        "The router drops the packet and returns an ICMP 'Destination Unreachable - Fragmentation Needed' error",
        "The router compresses the payload",
        "The packet is stored in RAM"
      ],
      "answer": 1,
      "explanation": "If DF=1 and size exceeds MTU, routers cannot fragment and must drop the packet, sending ICMP type 3 code 4.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In IPv6, which extension header replaces IPv4's on-path intermediate router fragmentation?",
      "options": [
        "Hop-by-Hop Header",
        "Fragment Header (performed only by the source host)",
        "Routing Header",
        "Destination Options Header"
      ],
      "answer": 1,
      "explanation": "Routers never fragment IPv6 packets in transit; path MTU discovery requires the sending host to fragment.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the broadcast IPv4 address for the network 192.168.10.0/24?",
      "options": [
        "192.168.10.0",
        "192.168.10.255",
        "192.168.10.1",
        "255.255.255.255"
      ],
      "answer": 1,
      "explanation": "Setting all 8 host bits to 1 in 192.168.10.0/24 gives the broadcast address 192.168.10.255.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an Autonomous System (AS) in computer networking?",
      "options": [
        "A robot that lays cables",
        "A connected collection of IP routing prefixes under the administrative control of a single organization",
        "A computer that operates without an OS",
        "A decentralized DNS server"
      ],
      "answer": 1,
      "explanation": "An AS is a coherent routing domain (like an ISP or enterprise) managed under a unified routing policy.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the minimum header size of an IPv4 packet with no options?",
      "options": [
        "16 bytes",
        "20 bytes",
        "32 bytes",
        "40 bytes"
      ],
      "answer": 1,
      "explanation": "A standard IPv4 header contains 5 rows of 32-bit words, totaling 20 bytes (IHL = 5).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the fixed base header size of an IPv6 packet?",
      "options": [
        "20 bytes",
        "32 bytes",
        "40 bytes",
        "64 bytes"
      ],
      "answer": 2,
      "explanation": "IPv6 uses a streamlined, fixed 40-byte base header to accelerate router processing.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which algorithm forms the mathematical foundation of Distance Vector Routing?",
      "options": [
        "Dijkstra's Algorithm",
        "Bellman-Ford Algorithm",
        "Kruskal's Algorithm",
        "Floyd-Warshall Algorithm"
      ],
      "answer": 1,
      "explanation": "Distance Vector protocols compute routing tables iteratively using Bellman-Ford equation Dx(y) = min {c(x,v) + Dv(y)}.",
      "difficulty": "Intermediate"
    }
  ],
  "cn-u3-transport-layer": [
    {
      "q": "What flags are exchanged between client and server during the TCP 3-Way Handshake in correct sequence?",
      "options": [
        "ACK -> SYN -> SYN-ACK",
        "SYN -> SYN-ACK -> ACK",
        "SYN -> ACK -> FIN",
        "DATA -> ACK -> CLOSE"
      ],
      "answer": 1,
      "explanation": "Client sends SYN; Server replies with SYN-ACK; Client confirms with ACK to establish connection.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the primary difference in delivery guarantee between TCP and UDP?",
      "options": [
        "TCP is connection-oriented, reliable, and guarantees in-order delivery; UDP is connectionless and best-effort",
        "UDP provides error correction; TCP does not",
        "TCP is faster than UDP",
        "UDP uses 3-way handshakes"
      ],
      "answer": 0,
      "explanation": "TCP uses sequence numbers and ACKs for reliable streams; UDP sends datagrams without connection setup or guarantees.",
      "difficulty": "Beginner"
    },
    {
      "q": "In TCP Congestion Control, how does the Congestion Window (cwnd) grow during the Slow Start phase?",
      "options": [
        "Linearly by 1 MSS per RTT",
        "Exponentially (doubling every RTT upon receiving ACKs)",
        "It remains constant",
        "Decreases by half"
      ],
      "answer": 1,
      "explanation": "During Slow Start, cwnd increases by 1 MSS for every received ACK, doubling cwnd every round-trip time.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How does TCP achieve Flow Control to avoid overwhelming a slow receiver?",
      "options": [
        "By dropping excess packets at the router",
        "The receiver advertises its available buffer space in the Receive Window (rwnd) field of TCP headers",
        "By doubling transmission speed",
        "By sending ICMP pauses"
      ],
      "answer": 1,
      "explanation": "Sliding window flow control restricts sender in-flight bytes to <= receiver's advertised receive window (rwnd).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What event triggers TCP Fast Retransmit without waiting for the retransmission timeout (RTO) to expire?",
      "options": [
        "Receiving 1 ACK",
        "Receiving 3 duplicate ACKs for the same sequence number",
        "A network ping failure",
        "Server reboot"
      ],
      "answer": 1,
      "explanation": "Three duplicate ACKs indicate a missing segment arrived out of order, prompting immediate retransmission.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the standard header size of a User Datagram Protocol (UDP) packet?",
      "options": [
        "8 bytes",
        "20 bytes",
        "12 bytes",
        "40 bytes"
      ],
      "answer": 0,
      "explanation": "UDP headers consist of four 2-byte fields (Source Port, Destination Port, Length, Checksum), totaling 8 bytes.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the default minimum header size of a TCP segment without optional fields?",
      "options": [
        "8 bytes",
        "16 bytes",
        "20 bytes",
        "32 bytes"
      ],
      "answer": 2,
      "explanation": "Standard TCP headers without options span 20 bytes (Data Offset = 5).",
      "difficulty": "Beginner"
    },
    {
      "q": "In Berkeley Socket programming, what is the correct sequence of system calls for a TCP server?",
      "options": [
        "socket() -> bind() -> listen() -> accept()",
        "socket() -> connect() -> read() -> write()",
        "bind() -> socket() -> listen() -> accept()",
        "socket() -> accept() -> listen() -> bind()"
      ],
      "answer": 0,
      "explanation": "A TCP server creates a socket, binds it to an IP/port, puts it in listen mode, and blocks on accept() for connections.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which socket system call is executed by a TCP client to initiate connection with a listening server?",
      "options": [
        "bind()",
        "connect()",
        "listen()",
        "accept()"
      ],
      "answer": 1,
      "explanation": "The client calls connect() to initiate the TCP 3-way handshake with the server's listening socket.",
      "difficulty": "Beginner"
    },
    {
      "q": "Why does TCP enter the TIME_WAIT state during 4-way connection termination?",
      "options": [
        "To save electricity",
        "To allow late duplicate segments from the connection to expire in the network and ensure the final ACK was received",
        "To download file updates",
        "To reset firewall tables"
      ],
      "answer": 1,
      "explanation": "TIME_WAIT (lasting 2 * MSL) prevents delayed packets from confusing subsequent connections using identical ports.",
      "difficulty": "Advanced"
    },
    {
      "q": "Which port number is registered by default for DNS queries over UDP/TCP?",
      "options": [
        "22",
        "53",
        "80",
        "443"
      ],
      "answer": 1,
      "explanation": "Domain Name System (DNS) services resolve queries on standard port 53.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which TCP congestion control phase begins when the Congestion Window (cwnd) reaches the Slow Start Threshold (ssthresh)?",
      "options": [
        "Fast Recovery",
        "Congestion Avoidance (additive increase)",
        "Multiplicative Decrease",
        "Connection Termination"
      ],
      "answer": 1,
      "explanation": "Above ssthresh, TCP switches from exponential growth to linear Congestion Avoidance (+1 MSS per RTT).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the TCP RST (Reset) flag signify?",
      "options": [
        "Immediate abort and rejection of a connection",
        "Resetting sequence numbers to zero",
        "Restarting operating system",
        "Enabling encryption"
      ],
      "answer": 0,
      "explanation": "RST indicates an abnormal termination, sent when segments arrive for an unassigned port or invalid state.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which transport protocol is best suited for real-time multiplayer video gaming and voice calls (VoIP)?",
      "options": [
        "TCP, because lost audio packets must be resent",
        "UDP, because minimal latency is preferred over retransmitting stale voice samples",
        "HTTP/1.0",
        "FTP"
      ],
      "answer": 1,
      "explanation": "VoIP and gaming prioritize low latency; resending dropped audio packets seconds later is useless.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the ephemeral port range typically assigned dynamically by modern operating systems to client sockets?",
      "options": [
        "0 to 1023",
        "1024 to 49151",
        "49152 to 65535",
        "Above 100,000"
      ],
      "answer": 2,
      "explanation": "IANA reserves 49152 through 65535 as private or dynamic/ephemeral ports for outbound client connections.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the PSH (Push) flag in a TCP header request the receiving TCP stack to do?",
      "options": [
        "Deliver buffered data immediately to the receiving application without waiting for buffers to fill",
        "Push the packet to disk",
        "Disconnect the socket",
        "Push data to next router"
      ],
      "answer": 0,
      "explanation": "PSH instructs the receiver to push all queued data straight to the user application.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the purpose of the TCP Keep-Alive mechanism?",
      "options": [
        "To prevent server hardware sleep mode",
        "To periodically probe an idle connection and detect if the remote peer has crashed or network died",
        "To speed up video streaming",
        "To re-run the 3-way handshake"
      ],
      "answer": 1,
      "explanation": "Keep-alive probes send empty ACKs on idle sockets to verify connectivity and release orphaned sockets.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Silly Window Syndrome in TCP?",
      "options": [
        "Opening too many browser tabs",
        "A problem where data is transmitted in tiny segments (e.g. 1 byte) because either sender generates or receiver consumes data slowly",
        "A bug in Windows sockets",
        "A buffer overflow attack"
      ],
      "answer": 1,
      "explanation": "Transmitting tiny payloads generates massive header overhead; mitigated by Nagle's algorithm and Clark's solution.",
      "difficulty": "Advanced"
    },
    {
      "q": "How does Nagle's algorithm prevent Silly Window Syndrome on the sender side?",
      "options": [
        "By refusing to send data until previous in-flight packets are ACKed or a full MSS of data is buffered",
        "By compressing payloads",
        "By switching to UDP",
        "By doubling window size"
      ],
      "answer": 0,
      "explanation": "Nagle's algorithm delays sending small packets until pending ACKs arrive or an entire MSS is queued.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the range of well-known system ports reserved for privileged network services?",
      "options": [
        "0 to 1023",
        "1024 to 2048",
        "1000 to 5000",
        "50000 to 60000"
      ],
      "answer": 0,
      "explanation": "Ports 0 through 1023 are Well-Known Ports reserved for core services (HTTP 80, HTTPS 443, SSH 22).",
      "difficulty": "Beginner"
    }
  ],
  "cn-u4-app-security": [
    {
      "q": "What is the correct chronological sequence of messages in the DHCP client-server IP allocation process?",
      "options": [
        "Discover -> Request -> Offer -> Ack",
        "Discover -> Offer -> Request -> Acknowledge (DORA)",
        "Request -> Discover -> Ack -> Offer",
        "Offer -> Request -> Discover -> Ack"
      ],
      "answer": 1,
      "explanation": "The DHCP DORA process: DHCPDiscover -> DHCPOffer -> DHCPRequest -> DHCPAcknowledge.",
      "difficulty": "Beginner"
    },
    {
      "q": "In asymmetric public-key cryptography (e.g. RSA), which key is used to decrypt a message encrypted with the receiver's Public Key?",
      "options": [
        "Sender's Public Key",
        "Sender's Private Key",
        "Receiver's Private Key",
        "A shared symmetric key"
      ],
      "answer": 2,
      "explanation": "Data encrypted with a party's public key can only be decrypted by that party's corresponding private key.",
      "difficulty": "Beginner"
    },
    {
      "q": "What security property does a Digital Signature provide that simple symmetric encryption does not?",
      "options": [
        "Non-repudiation and sender authentication",
        "Faster processing speed",
        "Smaller file size",
        "Zero chance of packet loss"
      ],
      "answer": 0,
      "explanation": "Since only the sender holds their private signing key, they cannot deny having authored the message (non-repudiation).",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which protocol secures web HTTP traffic by layering it on top of TLS/SSL encryption?",
      "options": [
        "SNMP",
        "HTTPS (Port 443)",
        "SFTP",
        "IPsec"
      ],
      "answer": 1,
      "explanation": "HTTPS encrypts the HTTP communication channel using Transport Layer Security (TLS).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Stateful Packet Inspection (SPI) Firewall?",
      "options": [
        "A firewall that inspects only static IP packet headers in isolation",
        "A firewall that tracks active TCP connection states and permits incoming packets only if they belong to an established flow",
        "A software antivirus scanner",
        "A physical lock on a server room"
      ],
      "answer": 1,
      "explanation": "Stateful firewalls maintain connection tables, allowing return packets for valid established outbound sessions.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which type of DNS record maps a domain name (e.g., example.com) to an IPv4 address?",
      "options": [
        "AAAA record",
        "A record",
        "CNAME record",
        "MX record"
      ],
      "answer": 1,
      "explanation": "An 'A' record maps a hostname to an IPv4 address; 'AAAA' maps to an IPv6 address.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of an MX record in DNS?",
      "options": [
        "Defines IPv6 addresses",
        "Specifies the mail exchange servers responsible for accepting email on behalf of a domain",
        "Aliases one domain to another",
        "Configures name servers"
      ],
      "answer": 1,
      "explanation": "MX (Mail Exchanger) records route emails to designated mail destination hosts for the domain.",
      "difficulty": "Beginner"
    },
    {
      "q": "In a SYN Flood Denial of Service (DoS) attack, what resource on the target server is exhausted?",
      "options": [
        "Disk storage space",
        "TCP connection backlog queue (half-open connection table)",
        "DNS cache",
        "Physical network cable bandwidth"
      ],
      "answer": 1,
      "explanation": "SYN floods send spoofed SYN packets without completing the 3-way handshake, exhausting the server's half-open backlog.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What cryptographic defense mitigates SYN Flood attacks without keeping connection state in server memory?",
      "options": [
        "SYN Cookies",
        "AES encryption",
        "RSA 4096",
        "Digital Certificates"
      ],
      "answer": 0,
      "explanation": "SYN Cookies encode connection parameters into the initial sequence number (ISN), deferring state allocation until ACK.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the difference between Symmetric and Asymmetric encryption?",
      "options": [
        "Symmetric uses the same secret key for encryption and decryption; Asymmetric uses public and private key pairs",
        "Symmetric is slower than asymmetric",
        "Asymmetric does not require keys",
        "Symmetric is used only for email"
      ],
      "answer": 0,
      "explanation": "Symmetric ciphers (AES) use one shared secret; asymmetric ciphers (RSA, ECC) use mathematically linked key pairs.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Certificate Authority (CA) in Public Key Infrastructure (PKI)?",
      "options": [
        "An Internet service provider",
        "A trusted third-party entity that issues and digitally signs SSL/TLS certificates verifying domain ownership",
        "A hardware router",
        "A web hosting platform"
      ],
      "answer": 1,
      "explanation": "CAs cryptographically sign certificates, allowing browsers to verify that a public key belongs to the real domain.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which protocol is used by mail clients to retrieve emails from a server while keeping messages synchronized across multiple devices?",
      "options": [
        "POP3",
        "IMAP (Internet Message Access Protocol)",
        "SMTP",
        "SNMP"
      ],
      "answer": 1,
      "explanation": "IMAP syncs mailboxes across multiple devices on the server; POP3 typically downloads and removes emails from servers.",
      "difficulty": "Beginner"
    },
    {
      "q": "What role does SMTP (Simple Mail Transfer Protocol) play in email architecture?",
      "options": [
        "Reading email in a web browser",
        "Transferring email messages from a sender client to a mail server, and between mail servers",
        "Creating user email passwords",
        "Filtering spam on routers"
      ],
      "answer": 1,
      "explanation": "SMTP (Port 25/587) handles outbound email transmission and server-to-server relay.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an iterative DNS query?",
      "options": [
        "The DNS client asks a server to resolve the query completely and return the final IP",
        "The queried DNS server returns the best referral answer it knows (e.g. root or TLD server) for the client to query next",
        "A query that never finishes",
        "A query sent via broadcast"
      ],
      "answer": 1,
      "explanation": "In iterative queries, servers provide referrals pointing the resolver to the next authoritative server in the hierarchy.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Man-in-the-Middle (MitM) attack?",
      "options": [
        "An attacker intercepts and potentially alters communication between two parties who believe they are communicating directly",
        "An attacker stealing hardware cables",
        "An attacker guessing passwords",
        "A virus spreading via USB drives"
      ],
      "answer": 0,
      "explanation": "MitM attacks intercept unencrypted or improperly authenticated channels to eavesdrop or tamper with packets.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which hash function family produces a 256-bit fixed-length cryptographic digest and is widely used in TLS and Bitcoin?",
      "options": [
        "MD5",
        "SHA-1",
        "SHA-256",
        "CRC-32"
      ],
      "answer": 2,
      "explanation": "SHA-256 (part of the SHA-2 family) produces secure 256-bit digests resistant to collision attacks.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Perfect Forward Secrecy (PFS) in TLS key exchange?",
      "options": [
        "Storing keys in a vault forever",
        "Ensuring that compromise of a server's long-term private key does not compromise past session keys (e.g. using Ephemeral Diffie-Hellman)",
        "Encrypting files twice",
        "Automatically updating passwords daily"
      ],
      "answer": 1,
      "explanation": "PFS generates unique session keys for every conversation; past traffic remains unreadable even if server keys leak.",
      "difficulty": "Advanced"
    },
    {
      "q": "Which HTTP status code indicates that the client must authenticate itself to get the requested response?",
      "options": [
        "400 Bad Request",
        "401 Unauthorized",
        "403 Forbidden",
        "404 Not Found"
      ],
      "answer": 1,
      "explanation": "401 Unauthorized indicates missing or invalid authentication credentials.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 403 Forbidden HTTP status code mean?",
      "options": [
        "The server could not find the file",
        "The server understood the request but refuses to authorize it, even if authenticated",
        "Server internal error",
        "Connection timed out"
      ],
      "answer": 1,
      "explanation": "403 indicates authentication is recognized or irrelevant, but access permissions to the resource are denied.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Cross-Site Scripting (XSS)?",
      "options": [
        "A vulnerability where an attacker injects malicious client-side scripts into web pages viewed by other users",
        "An SQL query flaw",
        "A denial of service attack",
        "A hardware fault in graphics cards"
      ],
      "answer": 0,
      "explanation": "XSS occurs when untrusted input is reflected or rendered into web pages without sanitization, executing malicious JavaScript.",
      "difficulty": "Intermediate"
    }
  ],
  "cn-u5-web-fundamentals": [
    {
      "q": "Which CSS property ensures that an element's padding and border are included within its total specified width and height?",
      "options": [
        "box-sizing: content-box",
        "box-sizing: border-box",
        "display: flex",
        "overflow: hidden"
      ],
      "answer": 1,
      "explanation": "box-sizing: border-box causes width and height to include content, padding, and border.",
      "difficulty": "Beginner"
    },
    {
      "q": "In the HTTP Request-Response cycle, which HTTP method is specified by RFC 7231 to be 'idempotent'?",
      "options": [
        "POST",
        "PUT",
        "CONNECT",
        "PATCH (non-idempotent)"
      ],
      "answer": 1,
      "explanation": "PUT is idempotent: sending multiple identical PUT requests produces the exact same server resource state.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the key difference between localStorage and sessionStorage in modern web browsers?",
      "options": [
        "localStorage data persists indefinitely until cleared; sessionStorage data is cleared when the browser tab closes",
        "sessionStorage holds 100MB; localStorage holds 1KB",
        "localStorage is sent with every HTTP request",
        "sessionStorage cannot store strings"
      ],
      "answer": 0,
      "explanation": "localStorage has no expiration; sessionStorage is scoped to the browser session and discarded on tab close.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Document Object Model (DOM)?",
      "options": [
        "A server-side database",
        "A platform- and language-neutral tree structure representing HTML documents in memory that can be manipulated via JavaScript",
        "A CSS styling rule",
        "A network protocol"
      ],
      "answer": 1,
      "explanation": "The DOM is a tree representation of HTML elements that allows scripts to dynamically inspect and modify page content.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which HTTP header is set by a web server to store a cookie in the client's browser?",
      "options": [
        "Cookie",
        "Set-Cookie",
        "Authorization",
        "Access-Control-Allow-Origin"
      ],
      "answer": 1,
      "explanation": "The server includes 'Set-Cookie: name=value; HttpOnly; Secure' in HTTP responses to create cookies in the client.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'HttpOnly' flag on a cookie prevent?",
      "options": [
        "Transmission over HTTPS",
        "Client-side scripts (e.g. JavaScript document.cookie) from accessing the cookie, mitigating XSS cookie theft",
        "Cookies from expiring",
        "Cookies from storing session tokens"
      ],
      "answer": 1,
      "explanation": "HttpOnly shields sensitive session cookies from being accessed by client scripts during cross-site scripting attacks.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the Same-Origin Policy (SOP) in web browsers enforce?",
      "options": [
        "Websites must run on the same computer",
        "Scripts on one origin cannot access or manipulate the DOM or fetch data from a different origin (protocol + domain + port)",
        "All web pages must use the same font",
        "Images must be in PNG format"
      ],
      "answer": 1,
      "explanation": "SOP isolates distinct websites: scripts can only interact with resources sharing the identical protocol, domain, and port.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which HTTP header is sent by servers to allow cross-origin requests from specific external domains (CORS)?",
      "options": [
        "Access-Control-Allow-Origin",
        "Allow-Cross-Domain",
        "Origin-Policy",
        "X-Frame-Options"
      ],
      "answer": 0,
      "explanation": "Access-Control-Allow-Origin defines which external web origins are permitted to access resource responses.",
      "difficulty": "Beginner"
    },
    {
      "q": "In the CSS Box Model, what is the correct order of layers moving outward from the content?",
      "options": [
        "Content -> Border -> Padding -> Margin",
        "Content -> Padding -> Border -> Margin",
        "Content -> Margin -> Padding -> Border",
        "Border -> Padding -> Content -> Margin"
      ],
      "answer": 1,
      "explanation": "From inside out: Content -> Padding (inner space) -> Border -> Margin (outer spacing).",
      "difficulty": "Beginner"
    },
    {
      "q": "Which HTML5 semantic element is designed to encapsulate self-contained content that could be distributed independently (e.g. blog post, forum thread)?",
      "options": [
        "<div>",
        "<section>",
        "<article>",
        "<aside>"
      ],
      "answer": 2,
      "explanation": "<article> specifies independent, reusable content that makes sense on its own outside the page layout.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the primary architectural constraint of REST (Representational State Transfer)?",
      "options": [
        "Statelessness: each client request must contain all information required to understand and process the request",
        "Server must store client session variables",
        "Must use XML only",
        "Requires persistent TCP connections"
      ],
      "answer": 0,
      "explanation": "Statelessness is a fundamental REST constraint; servers do not store client session context between requests.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which HTTP status code indicates a permanent redirection where search engines should update their indexed link?",
      "options": [
        "301 Moved Permanently",
        "302 Found",
        "304 Not Modified",
        "307 Temporary Redirect"
      ],
      "answer": 0,
      "explanation": "301 indicates the target resource has been permanently assigned a new URI.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 304 Not Modified HTTP status code indicate to the browser?",
      "options": [
        "The request failed",
        "The cached version of the resource is still fresh and valid; no response body is sent over the network",
        "The user is not logged in",
        "The page is deleted"
      ],
      "answer": 1,
      "explanation": "304 informs the browser that headers like ETag or If-Modified-Since match, saving bandwidth by reusing cached assets.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the CSS 'display: flex' property establish on a container element?",
      "options": [
        "A block formatting context with strict tables",
        "A flexible box layout with main and cross axes for aligning children",
        "A 3D perspective scene",
        "A responsive grid with 12 fixed columns"
      ],
      "answer": 1,
      "explanation": "Flexbox creates a flex container organizing child items dynamically along main and cross axes.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which CSS Flexbox property aligns flex items along the cross axis (vertical in row direction)?",
      "options": [
        "justify-content",
        "align-items",
        "flex-direction",
        "flex-wrap"
      ],
      "answer": 1,
      "explanation": "align-items controls cross-axis alignment; justify-content governs main-axis distribution.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Event Bubbling in JavaScript?",
      "options": [
        "Creating animated UI bubbles",
        "An event triggered on a nested element propagates upwards through its ancestor hierarchy in the DOM tree",
        "Memory leak in event listeners",
        "Events executing in random order"
      ],
      "answer": 1,
      "explanation": "Bubbling causes events to fire on the target element first, then bubble up through parent nodes up to window.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How can event propagation (bubbling) be prevented inside a JavaScript event handler?",
      "options": [
        "e.preventDefault()",
        "e.stopPropagation()",
        "return false",
        "delete event"
      ],
      "answer": 1,
      "explanation": "stopPropagation() halts the upward traversal of the event through parent DOM nodes.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does event.preventDefault() do in a JavaScript event listener?",
      "options": [
        "Stops event bubbling",
        "Suppresses the browser's default action associated with the event (e.g., submitting a form or following a link)",
        "Removes the element from the DOM",
        "Clears form fields"
      ],
      "answer": 1,
      "explanation": "preventDefault() cancels the default browser behavior triggered by the event without stopping propagation.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an ETag in HTTP response headers?",
      "options": [
        "An electronic price tag",
        "An entity tag string representing a specific version of a resource used for web cache validation",
        "An encryption key",
        "A tracking cookie"
      ],
      "answer": 1,
      "explanation": "ETag is an opaque identifier (often a hash) assigned by web servers to check if a cached resource has changed.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which HTML5 attribute specifies that a script should execute asynchronously as soon as it is downloaded without blocking HTML parsing?",
      "options": [
        "defer",
        "async",
        "preload",
        "lazy"
      ],
      "answer": 1,
      "explanation": "async downloads scripts in background and executes them immediately upon receipt without pausing parser.",
      "difficulty": "Intermediate"
    }
  ],
  "cn-u6-frontend-frameworks": [
    {
      "q": "What is the total number of grid columns in a standard Bootstrap responsive layout row?",
      "options": [
        "8",
        "10",
        "12",
        "16"
      ],
      "answer": 2,
      "explanation": "Bootstrap's flexible grid system is divided into 12 proportional columns.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Single Page Application (SPA)?",
      "options": [
        "A website that has only one paragraph of text",
        "A web application that interacts with the user by dynamically rewriting the current web page rather than loading entire new pages from the server",
        "A website without JavaScript",
        "A static HTML flyer"
      ],
      "answer": 1,
      "explanation": "SPAs load an initial HTML shell and update views dynamically via client-side routing and API calls.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Virtual DOM used by modern frontend libraries like React?",
      "options": [
        "A browser extension",
        "An in-memory lightweight JavaScript object tree mirroring the real DOM to compute optimal diffs before updating the real DOM",
        "A headless browser",
        "A 3D VR interface"
      ],
      "answer": 1,
      "explanation": "The Virtual DOM calculates changes (reconciliation) in memory and applies batch updates to minimize expensive real DOM operations.",
      "difficulty": "Beginner"
    },
    {
      "q": "In Bootstrap, which class creates a full-width responsive container that stretches across the entire viewport width?",
      "options": [
        ".container",
        ".container-fluid",
        ".row",
        ".col-full"
      ],
      "answer": 1,
      "explanation": ".container-fluid spans 100% of the viewport width across all breakpoint sizes.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Component-Based Architecture in frontend frameworks?",
      "options": [
        "Writing all code in one 10,000-line file",
        "Structuring UIs into reusable, self-contained, modular pieces that manage their own state and rendering",
        "Using only CSS components",
        "Running code on backend components"
      ],
      "answer": 1,
      "explanation": "Components encapsulate HTML markup, CSS styling, and JavaScript logic into independent building blocks.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the difference between One-Way and Two-Way Data Binding?",
      "options": [
        "One-way flows from model to UI; two-way synchronizes changes automatically between model and UI in both directions",
        "Two-way binding uses two database tables",
        "One-way is deprecated",
        "Two-way binding requires WebSockets"
      ],
      "answer": 0,
      "explanation": "One-way data flow (React) ensures predictable state; two-way binding (Angular/Vue v-model) synchronizes UI input and model.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In CSS Grid, which property defines the columns of a grid layout with explicit widths or fractional (fr) units?",
      "options": [
        "grid-template-columns",
        "grid-column-gap",
        "display: grid-columns",
        "grid-auto-flow"
      ],
      "answer": 0,
      "explanation": "grid-template-columns defines the track sizing functions and column lines of the grid container.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the 'Diffing' algorithm in React reconciliation?",
      "options": [
        "Comparing two database tables",
        "An O(n) heuristic algorithm that compares two Virtual DOM trees to identify modified subtrees",
        "Subtracting numbers in JavaScript",
        "Compressing files"
      ],
      "answer": 1,
      "explanation": "React's diffing algorithm compares Virtual DOM nodes by element type and unique 'key' props to update only what changed.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Why are unique 'key' props essential when rendering dynamic lists in component frameworks?",
      "options": [
        "To style list items with CSS",
        "To help the framework identify which items have changed, been added, or removed, enabling efficient DOM re-use",
        "To count list items",
        "To encrypt list data"
      ],
      "answer": 1,
      "explanation": "Stable keys allow reconciliation to match list items across renders without destroying and recreating DOM nodes.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is State in a frontend web component?",
      "options": [
        "The physical location of the server",
        "An internal data object that determines how the component renders and behaves, triggering re-renders when updated",
        "A CSS class name",
        "The HTTP status code"
      ],
      "answer": 1,
      "explanation": "Component state holds dynamic data; changing state causes the component to automatically re-render its view.",
      "difficulty": "Beginner"
    },
    {
      "q": "What are Props in component-based UI libraries?",
      "options": [
        "Theater decorations",
        "Read-only input parameters passed from a parent component down to a child component",
        "Database primary keys",
        "Global variables"
      ],
      "answer": 1,
      "explanation": "Props (properties) pass data and callbacks downwards through the component hierarchy in a unidirectional flow.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Client-Side Routing in Single Page Applications?",
      "options": [
        "Hardware routing on the user's Wi-Fi router",
        "Intercepting URL changes in JavaScript (using the History API) to render different views without contacting the server for new HTML pages",
        "DNS lookups in the browser",
        "Redirecting 404 pages"
      ],
      "answer": 1,
      "explanation": "Client-side routers use history.pushState() to switch views instantly without triggering full browser page refreshes.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which Bootstrap class makes an image automatically scale responsively with its parent element (max-width: 100%; height: auto)?",
      "options": [
        ".img-scale",
        ".img-fluid",
        ".responsive-img",
        ".img-fit"
      ],
      "answer": 1,
      "explanation": "The .img-fluid class applies max-width: 100% and height: auto to ensure images scale smoothly across devices.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Lazy Loading in modern frontend performance optimization?",
      "options": [
        "Delaying program execution until the user clicks a button",
        "Deferring initialization or loading of non-critical assets/components until they are needed (e.g. entering viewport)",
        "Writing minimal code",
        "Running slow database queries"
      ],
      "answer": 1,
      "explanation": "Lazy loading reduces initial bundle size by fetching code chunks or images on-demand as users navigate.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Tree Shaking in modern JavaScript bundlers (like Webpack, Vite, Rollup)?",
      "options": [
        "Cleaning files from hard drives",
        "Dead-code elimination that removes unused ES module exports from the final production bundle",
        "Animating visual trees",
        "Restarting the development server"
      ],
      "answer": 1,
      "explanation": "Tree shaking analyzes static import/export statements and discards unreferenced code to minimize download size.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In responsive web design, what is a CSS Media Query?",
      "options": [
        "A search query for video files",
        "A CSS rule (e.g. @media (max-width: 768px)) that applies styles conditionally based on device characteristics like viewport width",
        "A database query for media",
        "A JavaScript alert"
      ],
      "answer": 1,
      "explanation": "Media queries tailor CSS layouts dynamically to mobile screens, tablets, or desktop viewports.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of CSS Reset / Normalize.css stylesheets?",
      "options": [
        "To delete all styles",
        "To eliminate cross-browser inconsistencies in default element margins, paddings, and font sizes",
        "To enforce dark mode",
        "To speed up JavaScript"
      ],
      "answer": 1,
      "explanation": "Normalize.css standardizes default HTML element styles across all web browsers (Chrome, Safari, Firefox).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Jamstack architecture in modern web engineering?",
      "options": [
        "Java, Apache, MySQL",
        "JavaScript, APIs, and pre-rendered Markup delivered via CDN",
        "JSON and Multimedia stack",
        "Just A Monolith"
      ],
      "answer": 1,
      "explanation": "Jamstack decouples the frontend static markup from backend dynamic APIs, delivering ultra-fast pages via CDNs.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Server-Side Rendering (SSR) compared to Client-Side Rendering (CSR)?",
      "options": [
        "Rendering graphics on the GPU",
        "Generating complete HTML on the server for each request, delivering faster initial paint and superior SEO compared to CSR",
        "Hosting websites on shared servers",
        "Using server databases"
      ],
      "answer": 1,
      "explanation": "SSR builds full HTML on the server before transmitting it to the browser, optimizing SEO and First Contentful Paint.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Hydration in modern SSR frameworks (like Next.js or Nuxt)?",
      "options": [
        "Drinking water while coding",
        "The process of attaching client-side JavaScript event listeners and state to server-rendered static HTML",
        "Caching images in service workers",
        "Compiling TypeScript to JavaScript"
      ],
      "answer": 1,
      "explanation": "Hydration brings server-rendered HTML to life by initializing client-side reactive components and event handlers.",
      "difficulty": "Advanced"
    }
  ],
  "py-basics": [
    {
      "q": "What will type(5) return in Python 3?",
      "options": [
        "<class 'int'>",
        "<class 'float'>",
        "<class 'number'>",
        "<class 'digit'>"
      ],
      "answer": 0,
      "explanation": "Integer literals in Python 3 are instances of the built-in 'int' class.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the output of the expression 7 // 2 in Python?",
      "options": [
        "3.5",
        "3",
        "4",
        "3.0"
      ],
      "answer": 1,
      "explanation": "The // operator performs floor division, rounding down to the nearest integer (3).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the expression 2 ** 3 evaluate to in Python?",
      "options": [
        "6",
        "8",
        "9",
        "5"
      ],
      "answer": 1,
      "explanation": "The ** operator computes exponentiation: 2 cubed equals 8.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the result of 'Python'[1:4] string slicing?",
      "options": [
        "'Pyt'",
        "'yth'",
        "'ytho'",
        "'Pyth'"
      ],
      "answer": 1,
      "explanation": "Slicing [start:end] includes start index 1 ('y') up to but excluding index 4: 'yth'.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which built-in function is used to take textual input from the user in Python 3?",
      "options": [
        "scan()",
        "read()",
        "input()",
        "cin>>"
      ],
      "answer": 2,
      "explanation": "input() pauses execution, reads a line of input from stdin, and returns it as a string.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does type(3.14) return in Python?",
      "options": [
        "<class 'double'>",
        "<class 'float'>",
        "<class 'real'>",
        "<class 'decimal'>"
      ],
      "answer": 1,
      "explanation": "Numbers with decimal points are represented by Python's 'float' data type.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the boolean evaluation of bool([]) in Python?",
      "options": [
        "True",
        "False",
        "None",
        "Error"
      ],
      "answer": 1,
      "explanation": "Empty sequences (empty lists, tuples, strings, dictionaries) evaluate to False (falsy).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the output of 'Hello' * 3 in Python?",
      "options": [
        "'HelloHelloHello'",
        "SyntaxError",
        "['Hello', 'Hello', 'Hello']",
        "'Hello 3'"
      ],
      "answer": 0,
      "explanation": "Multiplying a string by an integer repeats the string that many times.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which character is used to write single-line comments in Python?",
      "options": [
        "//",
        "/*",
        "#",
        "--"
      ],
      "answer": 2,
      "explanation": "The '#' symbol begins a single-line comment in Python.",
      "difficulty": "Beginner"
    },
    {
      "q": "What will float('10.5') produce?",
      "options": [
        "10",
        "10.5",
        "TypeError",
        "10.50000000"
      ],
      "answer": 1,
      "explanation": "float() converts a valid numerical string into a floating-point number.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does formatted string syntax f'{x:.2f}' do when x = 3.14159?",
      "options": [
        "Formats x with 2 decimal places: '3.14'",
        "Rounds x to 3",
        "Prints x twice",
        "Throws format error"
      ],
      "answer": 0,
      "explanation": "f-strings with .2f format floating-point numbers to two digits after the decimal point.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the output of 10 % 3 in Python?",
      "options": [
        "3",
        "1",
        "0.33",
        "0"
      ],
      "answer": 1,
      "explanation": "The modulo operator % returns the remainder of 10 divided by 3, which is 1.",
      "difficulty": "Beginner"
    },
    {
      "q": "How are variables declared in Python?",
      "options": [
        "int x = 5;",
        "var x = 5;",
        "x = 5 (dynamically typed upon assignment)",
        "dim x as integer"
      ],
      "answer": 2,
      "explanation": "Python is dynamically typed; variables are created automatically when assigned a value.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does 'Python'[-1] return?",
      "options": [
        "'P'",
        "'n'",
        "IndexError",
        "'-1'"
      ],
      "answer": 1,
      "explanation": "Negative indices index from the end: -1 accesses the last character ('n').",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the result of the expression 5 == 5.0 in Python?",
      "options": [
        "True",
        "False",
        "TypeError",
        "None"
      ],
      "answer": 0,
      "explanation": "Python compares numerical values across int and float types; 5 is numerically equal to 5.0.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the 'is' operator test in Python compared to '=='?",
      "options": [
        "'is' tests value equality; '==' tests memory identity",
        "'is' tests object identity (same memory address); '==' tests value equality",
        "They are 100% identical",
        "'is' is used only for strings"
      ],
      "answer": 1,
      "explanation": "'is' checks whether two variables point to the exact same object in RAM (id(a) == id(b)).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the output of len('Data\\nScience') in Python?",
      "options": [
        "13",
        "12",
        "11",
        "14"
      ],
      "answer": 1,
      "explanation": "'\\n' is an escape sequence representing a single newline character: 4 + 1 + 7 = 12 characters.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which keyword converts an integer to its binary string representation?",
      "options": [
        "bin()",
        "binary()",
        "to_bin()",
        "hex()"
      ],
      "answer": 0,
      "explanation": "bin(10) returns '0b1010', the binary representation prefixed with '0b'.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the expression bool(None) return in Python?",
      "options": [
        "True",
        "False",
        "None",
        "Error"
      ],
      "answer": 1,
      "explanation": "None is a falsy value in Python; bool(None) returns False.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the result of int(True) in Python?",
      "options": [
        "1",
        "0",
        "TypeError",
        "True"
      ],
      "answer": 0,
      "explanation": "In Python, bool is a subclass of int, where True evaluates to 1 and False evaluates to 0.",
      "difficulty": "Intermediate"
    }
  ],
  "py-control-flow": [
    {
      "q": "Which keyword immediately exits the nearest enclosing loop in Python?",
      "options": [
        "stop",
        "break",
        "continue",
        "pass"
      ],
      "answer": 1,
      "explanation": "break terminates execution of the enclosing for or while loop prematurely.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'continue' keyword do in a loop?",
      "options": [
        "Terminates the loop",
        "Skips the remainder of the current iteration and jumps to the next iteration",
        "Restarts the loop from 0",
        "Pauses execution"
      ],
      "answer": 1,
      "explanation": "continue skips remaining statements in the current iteration and proceeds with the next loop cycle.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of the 'pass' statement in Python?",
      "options": [
        "Passes variables to a function",
        "Acts as a null statement / placeholder where code is syntactically required but no action is needed",
        "Skips code execution",
        "Returns a value"
      ],
      "answer": 1,
      "explanation": "pass serves as a syntactic no-op placeholder for empty functions, classes, or loops.",
      "difficulty": "Beginner"
    },
    {
      "q": "What values does range(1, 5) generate in a Python for loop?",
      "options": [
        "1, 2, 3, 4, 5",
        "1, 2, 3, 4",
        "0, 1, 2, 3, 4",
        "1, 3, 5"
      ],
      "answer": 1,
      "explanation": "range(start, stop) generates numbers starting at 1 up to but not including 5 (1, 2, 3, 4).",
      "difficulty": "Beginner"
    },
    {
      "q": "What happens when an 'else' block is attached to a for or while loop in Python?",
      "options": [
        "The else block executes only if the loop is terminated by a break statement",
        "The else block executes when the loop finishes naturally without encountering a break",
        "SyntaxError",
        "It executes before the loop begins"
      ],
      "answer": 1,
      "explanation": "Loop 'else' blocks execute upon normal loop completion, but are bypassed if 'break' triggers.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the step value in range(10, 0, -2)?",
      "options": [
        "10",
        "0",
        "-2",
        "2"
      ],
      "answer": 2,
      "explanation": "The third parameter in range(start, stop, step) is the step decrement (-2).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the output of: for i in range(3): print(i, end=' ')?",
      "options": [
        "1 2 3",
        "0 1 2",
        "0 1 2 3",
        "1 2"
      ],
      "answer": 1,
      "explanation": "range(3) defaults start to 0 and stops before 3: 0, 1, 2.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which structure introduced in Python 3.10 enables structural pattern matching similar to switch-case?",
      "options": [
        "switch-case",
        "match-case",
        "select-case",
        "choose-when"
      ],
      "answer": 1,
      "explanation": "Python 3.10 introduced the match-case statement for structural pattern matching.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How do you write a ternary conditional expression in Python?",
      "options": [
        "condition ? val1 : val2",
        "val1 if condition else val2",
        "if condition then val1 else val2",
        "val1 ?: val2"
      ],
      "answer": 1,
      "explanation": "Python ternary syntax is: <expression1> if <condition> else <expression2>.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the result of: 5 in [1, 2, 3, 4, 5]?",
      "options": [
        "True",
        "False",
        "None",
        "5"
      ],
      "answer": 0,
      "explanation": "The 'in' membership operator returns True if the element exists in the collection.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an infinite loop condition?",
      "options": [
        "while False:",
        "while True:",
        "for i in []:",
        "if True:"
      ],
      "answer": 1,
      "explanation": "while True creates an endless loop that continues until an internal break or return executes.",
      "difficulty": "Beginner"
    },
    {
      "q": "What will the following code print?\nx = 10\nif x > 5:\n    print('A')\nelif x > 2:\n    print('B')\nelse:\n    print('C')",
      "options": [
        "A",
        "B",
        "C",
        "A and B"
      ],
      "answer": 0,
      "explanation": "In an if-elif chain, the first truthy condition executes and the remaining branches are skipped: 'A'.",
      "difficulty": "Beginner"
    },
    {
      "q": "How many times does this loop execute?\ncount = 0\nwhile count < 5:\n    count += 2",
      "options": [
        "5 times",
        "3 times (count: 0->2, 2->4, 4->6)",
        "2 times",
        "Infinite"
      ],
      "answer": 1,
      "explanation": "Iterations: 1st (count becomes 2), 2nd (count becomes 4), 3rd (count becomes 6 >= 5, stops): 3 times.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the enumerate() function provide when iterating over a list?",
      "options": [
        "Only the list elements",
        "Pairs of (index, element) for each item in the iterable",
        "The length of the list",
        "A reversed list"
      ],
      "answer": 1,
      "explanation": "enumerate(iterable) generates tuples yielding the current loop count index and item value.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the zip() function do in Python?",
      "options": [
        "Compresses files to .zip",
        "Aggregates elements from two or more iterables pairwise into tuples",
        "Sorts two lists",
        "Deletes duplicates"
      ],
      "answer": 1,
      "explanation": "zip(list1, list2) pairs corresponding elements from both sequences into tuples.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the output of: [x for x in range(5) if x % 2 != 0]?",
      "options": [
        "[0, 2, 4]",
        "[1, 3]",
        "[1, 2, 3, 4, 5]",
        "[1, 3, 5]"
      ],
      "answer": 1,
      "explanation": "This list comprehension filters for odd numbers in range(5): 1 and 3.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Can a while loop have an 'else' block in Python?",
      "options": [
        "No, only for loops have else blocks",
        "Yes, it executes when the while condition becomes false (unless broken)",
        "Only in Python 2",
        "SyntaxError"
      ],
      "answer": 1,
      "explanation": "while...else executes when the test condition evaluates to false, unless exited via break.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What happens if no indentation is provided after an if statement in Python?",
      "options": [
        "The code runs normally",
        "IndentationError: expected an indented block",
        "Warning only",
        "Code assumes 4 spaces automatically"
      ],
      "answer": 1,
      "explanation": "Python enforces scope through indentation; missing indentation raises an IndentationError.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is short-circuit evaluation in Python logical operators (and, or)?",
      "options": [
        "Stopping electrical current",
        "Evaluating the right-hand operand only if the left-hand operand does not determine the final boolean result",
        "Converting booleans to integers",
        "Crashing on False"
      ],
      "answer": 1,
      "explanation": "'and' short-circuits on first False; 'or' short-circuits on first True without evaluating further.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does any([False, False, True]) evaluate to?",
      "options": [
        "True",
        "False",
        "None",
        "Error"
      ],
      "answer": 0,
      "explanation": "any() returns True if at least one element of the iterable evaluates to True.",
      "difficulty": "Beginner"
    }
  ],
  "py-functions": [
    {
      "q": "Which keyword defines a function in Python?",
      "options": [
        "func",
        "function",
        "def",
        "define"
      ],
      "answer": 2,
      "explanation": "The 'def' keyword is used to declare and define functions in Python.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does *args allow in a Python function definition?",
      "options": [
        "Passing a fixed array",
        "Accepting an arbitrary number of positional arguments as a tuple",
        "Passing a dictionary",
        "Creating pointer variables"
      ],
      "answer": 1,
      "explanation": "*args collects excess positional arguments passed to the function into a tuple.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does **kwargs allow in a Python function definition?",
      "options": [
        "Passing keyword arguments as a dictionary",
        "Passing double precision numbers",
        "Passing two arguments only",
        "Calling a function twice"
      ],
      "answer": 0,
      "explanation": "**kwargs packs arbitrary named keyword arguments into a standard dictionary.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an anonymous function called in Python?",
      "options": [
        "Inline function",
        "Lambda function",
        "Ghost function",
        "Macro"
      ],
      "answer": 1,
      "explanation": "A lambda function is an anonymous inline function defined using the 'lambda' keyword.",
      "difficulty": "Beginner"
    },
    {
      "q": "What will a Python function return if it contains no explicit return statement?",
      "options": [
        "0",
        "None",
        "False",
        "Empty string"
      ],
      "answer": 1,
      "explanation": "Functions without an explicit return statement implicitly return the special object None.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the output of: (lambda x, y: x * y)(4, 5)?",
      "options": [
        "9",
        "20",
        "45",
        "None"
      ],
      "answer": 1,
      "explanation": "The lambda multiplies arguments 4 and 5, returning 20.",
      "difficulty": "Beginner"
    },
    {
      "q": "What keyword allows modifying a variable defined in the global scope from inside a function?",
      "options": [
        "extern",
        "global",
        "nonlocal",
        "outer"
      ],
      "answer": 1,
      "explanation": "The 'global' keyword informs Python to bind the variable name to the module-level global namespace.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What keyword is used in nested functions to rebind variables in an outer (enclosing) non-global scope?",
      "options": [
        "global",
        "nonlocal",
        "parent",
        "super"
      ],
      "answer": 1,
      "explanation": "The 'nonlocal' keyword allows closures to modify variables in the nearest enclosing outer scope.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Docstring in Python?",
      "options": [
        "A string representing doctors",
        "A string literal written as the first statement in a function, module, or class to document its purpose",
        "A comment starting with //",
        "A text file"
      ],
      "answer": 1,
      "explanation": "Docstrings (triple-quoted strings) document subprograms and are accessible via func.__doc__.",
      "difficulty": "Beginner"
    },
    {
      "q": "What dangerous side-effect occurs when using a mutable default argument (e.g. def func(item, list=[])):",
      "options": [
        "Memory leak crashes Python",
        "The default list is created only once when the function is defined, sharing state across all subsequent calls",
        "List is emptied every call",
        "SyntaxError"
      ],
      "answer": 1,
      "explanation": "Default arguments are evaluated once at definition time; mutating it affects future calls that use default.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the recommended idiom for default mutable arguments in Python?",
      "options": [
        "def func(item, lst=None):\n    if lst is None: lst = []",
        "Use global lists",
        "Use tuples only",
        "Set lst = {}"
      ],
      "answer": 0,
      "explanation": "Using None as default and instantiating a fresh empty list inside ensures isolated mutable state.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Recursion in computer programming?",
      "options": [
        "Running loops with while",
        "A function calling itself directly or indirectly to solve smaller instances of a problem",
        "Importing external libraries",
        "Using multiple threads"
      ],
      "answer": 1,
      "explanation": "Recursion is when a function calls itself until reaching a defined base case.",
      "difficulty": "Beginner"
    },
    {
      "q": "What error is raised when a recursive function in Python exceeds the maximum recursion depth?",
      "options": [
        "StackOverflowError",
        "RecursionError: maximum recursion depth exceeded",
        "MemoryLimitExceeded",
        "SystemHalt"
      ],
      "answer": 1,
      "explanation": "Python protects the call stack by throwing RecursionError when recursion exceeds sys.getrecursionlimit().",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the map() built-in function do in Python?",
      "options": [
        "Displays geographical maps",
        "Applies a given function to each item of an iterable and returns an iterator",
        "Finds coordinates",
        "Creates hash tables"
      ],
      "answer": 1,
      "explanation": "map(func, iterable) yields elements resulting from applying func to each element in iterable.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the filter() built-in function do in Python?",
      "options": [
        "Deletes files",
        "Constructs an iterator from elements of an iterable for which a function returns True",
        "Filters spam comments",
        "Removes duplicate characters"
      ],
      "answer": 1,
      "explanation": "filter(predicate, iterable) retains only items for which the predicate returns True.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the LEGB rule refer to in Python variable scope resolution?",
      "options": [
        "Logical, Equivalence, Greater, Binary",
        "Local, Enclosing, Global, Built-in namespaces",
        "Loop, Element, Grid, Block",
        "Linear, Exponential, Geometric, Base"
      ],
      "answer": 1,
      "explanation": "Python resolves variable names in LEGB order: Local -> Enclosing -> Global -> Built-in.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Decorator in Python?",
      "options": [
        "CSS styling for Python UI",
        "A callable that takes another function as an argument, extends its behavior without modifying it, and returns a function",
        "An animated cursor",
        "A string formatting tool"
      ],
      "answer": 1,
      "explanation": "Decorators (@decorator_name) wrap functions to add cross-cutting behavior like logging or auth.",
      "difficulty": "Advanced"
    },
    {
      "q": "What does the 'yield' keyword do inside a Python function?",
      "options": [
        "Pauses function execution and produces a value, turning the function into a Generator",
        "Immediately terminates the program",
        "Waits for network response",
        "Returns None"
      ],
      "answer": 0,
      "explanation": "yield produces a value and saves local state, allowing generators to produce sequences lazily.",
      "difficulty": "Advanced"
    },
    {
      "q": "Can a Python function return multiple values?",
      "options": [
        "No, only one value is allowed",
        "Yes, returning comma-separated values packages them into a single Tuple automatically",
        "Only using global variables",
        "Only in Python 2"
      ],
      "answer": 1,
      "explanation": "return x, y packages values into a tuple (x, y), which can be unpacked by the caller.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the output of: (lambda x: x + 10)(5)?",
      "options": [
        "10",
        "15",
        "5",
        "None"
      ],
      "answer": 1,
      "explanation": "The lambda adds 10 to the argument 5, evaluating to 15.",
      "difficulty": "Beginner"
    }
  ],
  "py-data-structures": [
    {
      "q": "Which Python data structure is immutable once created?",
      "options": [
        "List",
        "Tuple",
        "Dictionary",
        "Set"
      ],
      "answer": 1,
      "explanation": "Tuples are immutable; their elements cannot be modified, added, or removed after creation.",
      "difficulty": "Beginner"
    },
    {
      "q": "What will my_list.append([1, 2]) do to a list?",
      "options": [
        "Appends 1 and 2 as separate individual elements",
        "Appends the entire list [1, 2] as a single nested element",
        "Throws a TypeError",
        "Sorts the list"
      ],
      "answer": 1,
      "explanation": "append() adds its argument as a single element, creating a nested sublist.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which list method adds all elements of an iterable to the end of the list individually?",
      "options": [
        "append()",
        "extend()",
        "insert()",
        "concat()"
      ],
      "answer": 1,
      "explanation": "extend() iterates over its argument and appends each element individually to the list.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the key characteristic of a Python Set?",
      "options": [
        "Maintains insertion order strictly and allows duplicates",
        "Stores an unordered collection of unique elements with no duplicates",
        "Stores key-value pairs",
        "Can contain mutable lists"
      ],
      "answer": 1,
      "explanation": "Sets enforce uniqueness; duplicate elements are discarded automatically.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the average time complexity for checking membership ('key in d') in a Python dictionary?",
      "options": [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(n^2)"
      ],
      "answer": 2,
      "explanation": "Python dictionaries use hash tables, achieving O(1) average time complexity for key lookups.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What happens when you access a non-existent key in a dictionary using dict['invalid_key']?",
      "options": [
        "Returns None",
        "Raises KeyError",
        "Returns 0",
        "Creates the key automatically"
      ],
      "answer": 1,
      "explanation": "Direct square-bracket indexing raises KeyError if the key is not present; use dict.get() for safe lookups.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does dict.get('missing', 'default_val') return if 'missing' is not in dict?",
      "options": [
        "None",
        "KeyError",
        "'default_val'",
        "False"
      ],
      "answer": 2,
      "explanation": "dict.get(key, default) returns the specified fallback default value if the key does not exist.",
      "difficulty": "Beginner"
    },
    {
      "q": "How can duplicates be removed from a list 'lst = [1, 2, 2, 3]' easily?",
      "options": [
        "list(set(lst))",
        "lst.remove_duplicates()",
        "lst.unique()",
        "tuple(lst)"
      ],
      "answer": 0,
      "explanation": "Converting to set() discards duplicate entries; wrapping with list() restores list type.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the output of: {x: x**2 for x in (1, 2, 3)}?",
      "options": [
        "{1: 1, 2: 4, 3: 9}",
        "[1, 4, 9]",
        "(1, 4, 9)",
        "{1, 4, 9}"
      ],
      "answer": 0,
      "explanation": "This dictionary comprehension maps each number to its squared value.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the difference between list.sort() and the sorted() function?",
      "options": [
        "list.sort() modifies the list in-place and returns None; sorted() returns a new sorted list",
        "sorted() is for tuples only",
        "list.sort() is deprecated",
        "They do the exact same thing"
      ],
      "answer": 0,
      "explanation": "list.sort() sorts in-place returning None; built-in sorted(iterable) returns a newly created sorted list.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which method removes and returns the last element of a list in Python?",
      "options": [
        "remove()",
        "pop()",
        "discard()",
        "delete()"
      ],
      "answer": 1,
      "explanation": "pop() removes and returns the element at the specified index (defaulting to the last element -1).",
      "difficulty": "Beginner"
    },
    {
      "q": "Can a Python list be used as a key in a standard dictionary?",
      "options": [
        "Yes, always",
        "No, because lists are mutable and therefore unhashable (TypeError: unhashable type: 'list')",
        "Only if the list contains strings",
        "Only if length < 5"
      ],
      "answer": 1,
      "explanation": "Dictionary keys must be hashable and immutable; mutable objects like lists cannot serve as keys.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which set operation produces elements that are in Set A or Set B, but NOT in both?",
      "options": [
        "Union (A | B)",
        "Intersection (A & B)",
        "Difference (A - B)",
        "Symmetric Difference (A ^ B)"
      ],
      "answer": 3,
      "explanation": "Symmetric difference (A ^ B) returns items present in either set but excluded from their intersection.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the expression 'tuple([1, 2, 3])' create?",
      "options": [
        "(1, 2, 3)",
        "[1, 2, 3]",
        "{1, 2, 3}",
        "TypeError"
      ],
      "answer": 0,
      "explanation": "The tuple() constructor converts an iterable list into an immutable tuple: (1, 2, 3).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the collections.defaultdict do in Python?",
      "options": [
        "Locks dictionaries from editing",
        "Provides a default factory function that automatically initializes missing keys upon first access",
        "Encrypts dictionary keys",
        "Enforces maximum key count"
      ],
      "answer": 1,
      "explanation": "defaultdict invokes a factory (like int, list) to generate default values for absent keys rather than raising KeyError.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the time complexity of appending an element to the end of a dynamic Python list?",
      "options": [
        "O(1) amortized",
        "O(n)",
        "O(log n)",
        "O(n^2)"
      ],
      "answer": 0,
      "explanation": "Python lists over-allocate backing arrays, achieving O(1) amortized time complexity for append().",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does d.items() return when called on a dictionary?",
      "options": [
        "A list of keys",
        "A list of values",
        "A dynamic view object displaying (key, value) tuple pairs",
        "A copy of the dictionary"
      ],
      "answer": 2,
      "explanation": "dict.items() returns a dict_items view yielding (key, value) pairs.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Tuple Unpacking in Python?",
      "options": [
        "Deleting a tuple",
        "Assigning individual tuple elements to multiple variables simultaneously (e.g. a, b = (10, 20))",
        "Converting tuple to list",
        "Sorting a tuple"
      ],
      "answer": 1,
      "explanation": "Unpacking extracts values from a sequence directly into corresponding target variables.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the popitem() method do on a Python dictionary in Python 3.7+?",
      "options": [
        "Removes a random item",
        "Removes and returns the last inserted (key, value) pair in LIFO order",
        "Clears the dictionary",
        "Removes the smallest key"
      ],
      "answer": 1,
      "explanation": "Since Python 3.7 dictionaries maintain insertion order, popitem() removes the most recently added item (LIFO).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the result of set('hello')?",
      "options": [
        "{'h', 'e', 'l', 'l', 'o'}",
        "{'h', 'e', 'l', 'o'} (duplicates removed)",
        "['h', 'e', 'l', 'o']",
        "'hello'"
      ],
      "answer": 1,
      "explanation": "Constructing a set from the string 'hello' removes the duplicate 'l', leaving {'h', 'e', 'l', 'o'}.",
      "difficulty": "Beginner"
    }
  ],
  "web-html": [
    {
      "q": "Which HTML5 tag is best suited for wrapping main navigation links?",
      "options": [
        "<nav>",
        "<menu>",
        "<header>",
        "<section>"
      ],
      "answer": 0,
      "explanation": "The <nav> semantic element denotes a section intended for major site navigation links.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the HTML5 <!DOCTYPE html> declaration accomplish?",
      "options": [
        "Links the CSS file",
        "Instructs the browser to render the document in modern standards mode rather than quirks mode",
        "Specifies JavaScript version",
        "Validates server certificates"
      ],
      "answer": 1,
      "explanation": "<!DOCTYPE html> is the preamble required to trigger standards-compliant rendering mode in modern web engines.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which attribute in an <input> element specifies placeholder text displayed before the user types?",
      "options": [
        "value",
        "placeholder",
        "title",
        "label"
      ],
      "answer": 1,
      "explanation": "placeholder displays temporary gray helper text inside text inputs until input begins.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which semantic tag represents tangential content, such as a sidebar or pull quote, related to surrounding content?",
      "options": [
        "<aside>",
        "<section>",
        "<div>",
        "<footer>"
      ],
      "answer": 0,
      "explanation": "<aside> represents content indirectly related to main page content (like sidebars and callouts).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of the 'alt' attribute on an <img> tag?",
      "options": [
        "Specifies image alignment",
        "Provides alternative text for screen readers and displays if the image fails to load",
        "Links to another URL",
        "Sets image resolution"
      ],
      "answer": 1,
      "explanation": "alt text ensures accessibility for visually impaired users and displays descriptive text on image failure.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which HTML5 input type provides built-in browser validation for email addresses on mobile and desktop?",
      "options": [
        "<input type='text'>",
        "<input type='email'>",
        "<input type='mail'>",
        "<input type='address'>"
      ],
      "answer": 1,
      "explanation": "type='email' triggers native syntax validation and tailored mobile keyboards with '@' keys.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the <meta name='viewport' content='width=device-width, initial-scale=1.0'> tag achieve?",
      "options": [
        "Downloads desktop styles",
        "Controls viewport dimensions and scaling on mobile devices to ensure responsive layouts",
        "Enables 3D viewing",
        "Sets browser language"
      ],
      "answer": 1,
      "explanation": "The viewport meta tag matches screen width in device-independent pixels and sets initial zoom to 1.0.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which tag is used to embed native video files into a web page in HTML5 without third-party plugins?",
      "options": [
        "<video>",
        "<movie>",
        "<embed-media>",
        "<flash>"
      ],
      "answer": 0,
      "explanation": "HTML5 introduced the native <video> tag with controls and multi-source playback capabilities.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which attribute on an <a> tag specifies that a hyperlink should open in a new browser tab?",
      "options": [
        "target='_blank'",
        "target='_new'",
        "open='tab'",
        "rel='external'"
      ],
      "answer": 0,
      "explanation": "target='_blank' instructs the browser to open the referenced link in a new tab or window.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does ARIA stand for in web accessibility?",
      "options": [
        "Automated Responsive Internet Applications",
        "Accessible Rich Internet Applications",
        "Advanced Routing Internet Access",
        "Audio Recording Interface Asset"
      ],
      "answer": 1,
      "explanation": "W3C ARIA provides attributes to make dynamic web content accessible to assistive technologies.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which HTML element represents tabular data with rows and cells?",
      "options": [
        "<grid>",
        "<table>",
        "<sheet>",
        "<data-box>"
      ],
      "answer": 1,
      "explanation": "<table> organizes structured data into rows (<tr>), header cells (<th>), and data cells (<td>).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the difference between <section> and <div> in HTML5?",
      "options": [
        "<div> is semantic; <section> is not",
        "<section> is a semantic element representing a thematic grouping of content with a heading; <div> is a non-semantic generic container",
        "They are identical in meaning",
        "<section> cannot contain CSS"
      ],
      "answer": 1,
      "explanation": "<section> groups thematic content; <div> carries no semantic meaning and is used purely for styling.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which tag should be used to display code snippets in monospace typography on a webpage?",
      "options": [
        "<code>",
        "<pre>",
        "<var>",
        "<samp>"
      ],
      "answer": 0,
      "explanation": "<code> semantically identifies fragments of computer programming code.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the <pre> tag do?",
      "options": [
        "Renders pre-formatted text preserving exact whitespace, tabs, and line breaks",
        "Prevents JavaScript execution",
        "Preloads web pages",
        "Predicts user input"
      ],
      "answer": 0,
      "explanation": "<pre> presents text exactly as written, preserving literal spaces and line endings.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which attribute makes an HTML form input mandatory before submission?",
      "options": [
        "validate",
        "required",
        "mandatory",
        "need='true'"
      ],
      "answer": 1,
      "explanation": "The 'required' boolean attribute blocks form submission if the field is empty.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the correct tag hierarchy for a standard HTML table?",
      "options": [
        "<table> -> <tr> -> <td>",
        "<table> -> <td> -> <tr>",
        "<tr> -> <table> -> <td>",
        "<table> -> <tb> -> <td>"
      ],
      "answer": 0,
      "explanation": "Tables contain Table Rows (<tr>), which enclose Table Data cells (<td>).",
      "difficulty": "Beginner"
    },
    {
      "q": "Which tag defines client-side form controls to select one option from a dropdown list?",
      "options": [
        "<list>",
        "<select>",
        "<dropdown>",
        "<picker>"
      ],
      "answer": 1,
      "explanation": "<select> encloses <option> elements to present a dropdown selection menu.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of the <label> element and its 'for' attribute?",
      "options": [
        "Styles text in bold",
        "Associates descriptive text with a specific form control id, increasing clickable hit areas for accessibility",
        "Labels database tables",
        "Creates tags for SEO"
      ],
      "answer": 1,
      "explanation": "Clicking a <label for='element_id'> focuses or toggles the referenced form input, improving accessibility.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which HTML5 tag is used to draw dynamic bitmap 2D and 3D graphics on the fly via JavaScript?",
      "options": [
        "<svg>",
        "<canvas>",
        "<graphics>",
        "<paint>"
      ],
      "answer": 1,
      "explanation": "<canvas> exposes a raster rendering context (e.g. getContext('2d')) for scriptable pixel graphics.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How does SVG (Scalable Vector Graphics) differ from HTML5 Canvas?",
      "options": [
        "SVG uses XML vector elements that scale infinitely without pixelation; Canvas is resolution-dependent pixel raster drawing",
        "Canvas is vector-based; SVG is raster",
        "Canvas cannot be scripted",
        "SVG requires Flash"
      ],
      "answer": 0,
      "explanation": "SVG describes vectors as DOM elements that scale crisply to any resolution; Canvas manipulates pixel bitmaps.",
      "difficulty": "Intermediate"
    }
  ],
  "web-css": [
    {
      "q": "In the CSS box model, what directly surrounds the border?",
      "options": [
        "Padding",
        "Margin",
        "Content",
        "Outline"
      ],
      "answer": 1,
      "explanation": "Margin provides transparent outer spacing surrounding the border.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which CSS selector has the highest specificity?",
      "options": [
        "Element selector (div)",
        "Class selector (.card)",
        "ID selector (#header)",
        "Universal selector (*)"
      ],
      "answer": 2,
      "explanation": "ID selectors carry specificity weight (0,1,0,0), overriding class selectors (0,0,1,0) and element selectors (0,0,0,1).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does 'display: none' do compared to 'visibility: hidden'?",
      "options": [
        "'display: none' removes the element from document flow entirely; 'visibility: hidden' hides the element while preserving its empty space",
        "They are identical",
        "'visibility: hidden' deletes the element from DOM",
        "'display: none' makes it transparent"
      ],
      "answer": 0,
      "explanation": "display: none collapses the element's layout space; visibility: hidden renders it invisible while holding its place.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which CSS property is used to change the text color of an element?",
      "options": [
        "text-color",
        "color",
        "font-color",
        "text-style"
      ],
      "answer": 1,
      "explanation": "The 'color' property sets the foreground color of text and decorative text elements.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the CSS position property value 'absolute' do?",
      "options": [
        "Positions element relative to the viewport always",
        "Positions element relative to its nearest positioned ancestor (non-static)",
        "Leaves element in normal document flow",
        "Locks element against scrolling"
      ],
      "answer": 1,
      "explanation": "position: absolute removes the element from flow and offsets it relative to its closest positioned ancestor.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does position: fixed do?",
      "options": [
        "Positions element relative to the browser viewport, remaining anchored during page scrolling",
        "Positions element relative to its parent",
        "Prevents element modification",
        "Centers the element"
      ],
      "answer": 0,
      "explanation": "position: fixed anchors the element relative to the browser viewport coordinate system.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which CSS Flexbox property specifies how flex items are placed in the flex container along the main axis?",
      "options": [
        "align-items",
        "justify-content",
        "flex-wrap",
        "align-content"
      ],
      "answer": 1,
      "explanation": "justify-content distributes extra space along the main axis (flex-start, center, space-between, etc.).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'rem' CSS unit represent?",
      "options": [
        "Relative to the font-size of the current parent element",
        "Relative to the font-size of the root <html> element",
        "Raw screen millimetres",
        "Resolution of monitor"
      ],
      "answer": 1,
      "explanation": "1rem equals the computed font-size of the root <html> element (typically 16px by default).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'em' CSS unit represent?",
      "options": [
        "Relative to the root element",
        "Relative to the font-size of the element on which it is used (or its direct parent)",
        "Exact pixels",
        "Viewport percentage"
      ],
      "answer": 1,
      "explanation": "em units scale relative to the font-size of the current element or parent.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which CSS property creates a smooth color transition effect across an element's background?",
      "options": [
        "background: linear-gradient(...)",
        "background-blend: smooth",
        "transition: color",
        "filter: blur()"
      ],
      "answer": 0,
      "explanation": "CSS linear-gradient() and radial-gradient() render smooth color transitions across surfaces.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the CSS Grid property to specify gap spacing between rows and columns simultaneously?",
      "options": [
        "gap (or grid-gap)",
        "spacing",
        "grid-margin",
        "cell-padding"
      ],
      "answer": 0,
      "explanation": "The 'gap' shorthand property sets gutter spacing between grid rows and columns.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which CSS property specifies the stack order of positioned elements (which appears in front)?",
      "options": [
        "order",
        "z-index",
        "elevation",
        "layer"
      ],
      "answer": 1,
      "explanation": "z-index controls 3D stacking order along the z-axis for positioned elements.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the '!important' declaration in CSS do?",
      "options": [
        "Accelerates GPU rendering",
        "Overrides standard cascade specificity rules, giving the rule highest precedence",
        "Exports style to JavaScript",
        "Logs a console warning"
      ],
      "answer": 1,
      "explanation": "!important elevates a style rule above normal specificity calculations.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the pseudo-class :hover represent?",
      "options": [
        "An element currently focused with keyboard",
        "An element when the user designates it with a pointing device (cursor mouseover)",
        "A link that has been visited",
        "The first child element"
      ],
      "answer": 1,
      "explanation": ":hover applies styles when the pointer device hovers over an interactive element.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a CSS variable (custom property) defined as in standard CSS?",
      "options": [
        "$primary-color: #2563eb;",
        "--primary-color: #2563eb;",
        "@var primary = #2563eb;",
        "let primary = #2563eb;"
      ],
      "answer": 1,
      "explanation": "CSS custom properties are prefixed with double dashes (--name) and accessed via var(--name).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the CSS property used to add drop shadows to text?",
      "options": [
        "box-shadow",
        "text-shadow",
        "drop-shadow()",
        "font-shadow"
      ],
      "answer": 1,
      "explanation": "text-shadow: x-offset y-offset blur color applies shadow effects to text characters.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which property allows an element to transition smoothly between property states over time?",
      "options": [
        "transition: all 0.3s ease;",
        "animation-duration: 0.3s;",
        "smooth: true;",
        "transform: ease;"
      ],
      "answer": 0,
      "explanation": "The 'transition' property animates changes in CSS properties over a specified duration.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the CSS 'transform: rotate(45deg);' property do?",
      "options": [
        "Translates element 45 pixels",
        "Rotates the element clockwise by 45 degrees around its transform origin",
        "Skews the element by 45%",
        "Changes font angle"
      ],
      "answer": 1,
      "explanation": "transform: rotate(angle) rotates elements in 2D space without altering document flow.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which CSS pseudo-element targets the very first letter of a block of text to create a drop cap?",
      "options": [
        "::first-line",
        "::first-letter",
        ":first-child",
        "::initial"
      ],
      "answer": 1,
      "explanation": "::first-letter styles the opening character of a paragraph for drop cap typography.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does 'backdrop-filter: blur(10px);' achieve in modern CSS UI design?",
      "options": [
        "Blurs the element's own text",
        "Blurs the area behind an element (creating a glassmorphism frosted glass effect)",
        "Blurs browser tab",
        "Blurs the monitor display"
      ],
      "answer": 1,
      "explanation": "backdrop-filter applies graphic effects like blurring to the background content visible beneath a translucent element.",
      "difficulty": "Intermediate"
    }
  ],
  "dm-u1": [
    {
      "q": "If a set S has n elements, what is the cardinality of its Power Set P(S)?",
      "options": [
        "n^2",
        "2^n",
        "2n",
        "n!"
      ],
      "answer": 1,
      "explanation": "Each element can either be included or excluded from a subset, yielding 2^n possible subsets in the power set.",
      "difficulty": "Beginner"
    },
    {
      "q": "A relation R on a set A is an Equivalence Relation if and only if it satisfies which three properties?",
      "options": [
        "Reflexive, Symmetric, and Transitive",
        "Reflexive, Antisymmetric, and Transitive",
        "Irreflexive, Symmetric, and Transitive",
        "Reflexive, Asymmetric, and Total"
      ],
      "answer": 0,
      "explanation": "Equivalence relations must be simultaneously reflexive (aRa), symmetric (aRb => bRa), and transitive (aRb & bRc => aRc).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a compound proposition that is always TRUE regardless of the truth values of its constituent variables?",
      "options": [
        "Contradiction",
        "Tautology",
        "Contingency",
        "Fallacy"
      ],
      "answer": 1,
      "explanation": "A tautology is a formula that evaluates to true under all possible truth value assignments.",
      "difficulty": "Beginner"
    },
    {
      "q": "According to De Morgan's Laws in propositional logic, what is the negation of (p ∧ q)?",
      "options": [
        "¬p ∧ ¬q",
        "¬p ∨ ¬q",
        "¬p → ¬q",
        "p ∨ q"
      ],
      "answer": 1,
      "explanation": "Negating a conjunction distributes the negation across terms and inverts AND to OR: ¬(p ∧ q) ≡ ¬p ∨ ¬q.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the contrapositive of the conditional statement 'If p, then q' (p → q)?",
      "options": [
        "q → p",
        "¬p → ¬q",
        "¬q → ¬p",
        "¬p ∨ q"
      ],
      "answer": 2,
      "explanation": "The contrapositive (¬q → ¬p) is logically equivalent to the original conditional statement (p → q).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the truth value of the implication (p → q) when p is FALSE and q is FALSE?",
      "options": [
        "True (vacuously true)",
        "False",
        "Undefined",
        "Contradiction"
      ],
      "answer": 0,
      "explanation": "An implication (p → q) is false only when a true antecedent leads to a false consequent; false implies false is True.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What mathematical structure is formed by a relation that is Reflexive, Antisymmetric, and Transitive?",
      "options": [
        "Equivalence Relation",
        "Partial Order (Poset)",
        "Strict Order",
        "Partition"
      ],
      "answer": 1,
      "explanation": "A partially ordered set (Poset) requires reflexivity, antisymmetry (if aRb and bRa then a = b), and transitivity.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the Universal Quantifier (∀) represent in first-order predicate logic?",
      "options": [
        "'There exists at least one'",
        "'For all' or 'For every'",
        "'For no elements'",
        "'Exactly one element'"
      ],
      "answer": 1,
      "explanation": "∀x P(x) asserts that predicate P is true for every element x in the domain of discourse.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the negation of the quantified statement: ∀x P(x)?",
      "options": [
        "∀x ¬P(x)",
        "∃x ¬P(x)",
        "¬∃x P(x)",
        "∃x P(x)"
      ],
      "answer": 1,
      "explanation": "Negating 'for all x, P(x) holds' yields 'there exists an x such that P(x) does not hold': ∃x ¬P(x).",
      "difficulty": "Intermediate"
    },
    {
      "q": "If set A has 3 elements and set B has 4 elements, how many elements are in the Cartesian product A × B?",
      "options": [
        "7",
        "12",
        "64",
        "81"
      ],
      "answer": 1,
      "explanation": "|A × B| = |A| * |B| = 3 * 4 = 12 ordered pairs.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Symmetric Difference of two sets A and B (A ⊕ B)?",
      "options": [
        "(A ∪ B) ∩ (A ∩ B)",
        "(A ∪ B) - (A ∩ B)",
        "A ∩ B",
        "Complement of (A ∪ B)"
      ],
      "answer": 1,
      "explanation": "Symmetric difference contains elements that belong to either set A or B, but not both: (A - B) ∪ (B - A).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the converse of the implication statement 'p → q'?",
      "options": [
        "q → p",
        "¬p → ¬q",
        "¬q → ¬p",
        "p ∧ ¬q"
      ],
      "answer": 0,
      "explanation": "The converse swaps antecedent and consequent: q → p.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a compound statement that is always FALSE under every truth assignment called?",
      "options": [
        "Tautology",
        "Contradiction (Absurdity)",
        "Contingency",
        "Converse"
      ],
      "answer": 1,
      "explanation": "A contradiction evaluates to false for all combinations of variable truth assignments (e.g. p ∧ ¬p).",
      "difficulty": "Beginner"
    },
    {
      "q": "Which law states that p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)?",
      "options": [
        "Associative Law",
        "Distributive Law",
        "Commutative Law",
        "Absorption Law"
      ],
      "answer": 1,
      "explanation": "The Distributive Law distributes disjunction over conjunction across compound expressions.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the absorption law in Boolean logic?",
      "options": [
        "p ∧ (p ∨ q) ≡ p",
        "p ∧ ¬p ≡ False",
        "p ∨ ¬p ≡ True",
        "p ∧ p ≡ p"
      ],
      "answer": 0,
      "explanation": "The Absorption Law: p ∧ (p ∨ q) ≡ p and p ∨ (p ∧ q) ≡ p.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In a set of 100 students, 60 study AI, 50 study Data Science, and 20 study both. How many study at least one subject?",
      "options": [
        "110",
        "90",
        "70",
        "80"
      ],
      "answer": 1,
      "explanation": "Principle of Inclusion-Exclusion: |A ∪ B| = |A| + |B| - |A ∩ B| = 60 + 50 - 20 = 90 students.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a function called if every element in the codomain has at most one pre-image in the domain (one-to-one)?",
      "options": [
        "Surjective (Onto)",
        "Injective (One-to-One)",
        "Bijective",
        "Constant"
      ],
      "answer": 1,
      "explanation": "An injective function maps distinct domain elements to distinct codomain elements (f(a) = f(b) => a = b).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Bijective function?",
      "options": [
        "Injective only",
        "Surjective only",
        "Both Injective and Surjective (One-to-One and Onto)",
        "Neither injective nor surjective"
      ],
      "answer": 2,
      "explanation": "Bijective functions are both injective and surjective, establishing an exact one-to-one correspondence.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Modus Ponens in rules of inference?",
      "options": [
        "If p → q is true and p is true, then q is true",
        "If p → q is true and q is true, then p is true",
        "If p is true, ¬p is false",
        "p ∧ q implies p"
      ],
      "answer": 0,
      "explanation": "Modus Ponens (affirming the antecedent) states: [p ∧ (p → q)] ⊢ q.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Modus Tollens in formal logic?",
      "options": [
        "[¬q ∧ (p → q)] ⊢ ¬p (denying the consequent)",
        "[p ∧ (p → q)] ⊢ q",
        "[p ∨ q] ⊢ p",
        "¬(¬p) ≡ p"
      ],
      "answer": 0,
      "explanation": "Modus Tollens: If 'if p then q' holds, and q is false, then p must be false.",
      "difficulty": "Intermediate"
    }
  ],
  "dm-u2": [
    {
      "q": "In an undirected graph with e edges, what is the sum of the degrees of all vertices according to the Handshaking Lemma?",
      "options": [
        "e",
        "2 * e",
        "e / 2",
        "e^2"
      ],
      "answer": 1,
      "explanation": "Each edge connects two endpoints, contributing 2 to the degree sum: ∑ deg(v) = 2e.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an Eulerian Circuit in graph theory?",
      "options": [
        "A closed walk that visits every vertex exactly once",
        "A closed trail that visits every edge in the graph exactly once and returns to the starting vertex",
        "A path with no cycles",
        "A tree with n-1 edges"
      ],
      "answer": 1,
      "explanation": "An Eulerian circuit traverses every edge of the graph exactly once and terminates at the origin vertex.",
      "difficulty": "Beginner"
    },
    {
      "q": "What condition is necessary and sufficient for a connected undirected graph to have an Eulerian Circuit (Euler's Theorem)?",
      "options": [
        "Every vertex has an even degree",
        "Exactly two vertices have odd degree",
        "Graph must be complete",
        "Graph must be planar"
      ],
      "answer": 0,
      "explanation": "Euler proved that a connected graph has an Eulerian circuit if and only if every vertex has an even degree.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What condition allows a connected undirected graph to have an Eulerian Path (trail) but NOT a circuit?",
      "options": [
        "All vertices have odd degree",
        "Exactly two vertices have odd degree (serving as start and end points)",
        "No vertex has degree > 3",
        "Graph has a Hamiltonian cycle"
      ],
      "answer": 1,
      "explanation": "Having exactly two vertices of odd degree permits an Eulerian trail starting at one odd vertex and ending at the other.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Hamiltonian Cycle in graph theory?",
      "options": [
        "A cycle that visits every edge exactly once",
        "A closed cycle that visits every vertex in the graph exactly once (except starting/ending vertex)",
        "A tree with n vertices",
        "A bipartite matching"
      ],
      "answer": 1,
      "explanation": "A Hamiltonian cycle visits every vertex of the graph exactly once before returning to the start.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Euler's Formula for connected planar graphs with V vertices, E edges, and R regions (faces)?",
      "options": [
        "V - E + R = 2",
        "V + E - R = 2",
        "V - E - R = 0",
        "V * E = R"
      ],
      "answer": 0,
      "explanation": "Euler's planar formula states: Vertices - Edges + Regions = 2.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the maximum number of edges in a planar simple connected graph with V >= 3 vertices?",
      "options": [
        "E <= 2V - 4",
        "E <= 3V - 6",
        "E <= V(V - 1)/2",
        "E <= V^2"
      ],
      "answer": 1,
      "explanation": "For planar graphs without multi-edges, 3R <= 2E; substituting into Euler's formula gives E <= 3V - 6.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the Chromatic Number χ(G) of a bipartite graph with at least one edge?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "answer": 1,
      "explanation": "A bipartite graph can be properly 2-colored such that no two adjacent vertices share the same color.",
      "difficulty": "Beginner"
    },
    {
      "q": "According to the famous Four Color Theorem, what is the maximum chromatic number needed to color any planar graph?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "answer": 1,
      "explanation": "The Four Color Theorem proves that any planar map/graph requires at most 4 colors.",
      "difficulty": "Beginner"
    },
    {
      "q": "How many edges are in a Complete Graph K_n with n vertices?",
      "options": [
        "n",
        "n(n - 1) / 2",
        "n(n - 1)",
        "2^n"
      ],
      "answer": 1,
      "explanation": "In a complete graph K_n, every pair of distinct vertices is joined by an edge: C(n, 2) = n(n - 1) / 2.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which of the following complete graphs is non-planar (cannot be drawn in a plane without edge crossings)?",
      "options": [
        "K_3",
        "K_4",
        "K_5",
        "K_2"
      ],
      "answer": 2,
      "explanation": "By Kuratowski's theorem, K_5 and K_{3,3} are the fundamental non-planar utility graphs.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Kuratowski's Theorem for graph planarity?",
      "options": [
        "A graph is planar if and only if it contains no subgraph homeomorphic to K_5 or K_{3,3}",
        "All trees are planar",
        "Every bipartite graph is planar",
        "Planar graphs have degree 4"
      ],
      "answer": 0,
      "explanation": "Kuratowski proved that a graph is planar iff it contains no subdivision of K_5 or K_{3,3}.",
      "difficulty": "Advanced"
    },
    {
      "q": "In a simple undirected graph, what is the maximum number of odd-degree vertices possible?",
      "options": [
        "Any odd number",
        "Must always be an even number",
        "Exactly 2",
        "At most V/2"
      ],
      "answer": 1,
      "explanation": "Because sum of degrees is 2E (an even number), the count of vertices with odd degrees must always be even.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is an isolated vertex in a graph?",
      "options": [
        "A vertex with degree 0 (no incident edges)",
        "A vertex with degree 1",
        "A vertex connected to all others",
        "A vertex in a tree"
      ],
      "answer": 0,
      "explanation": "An isolated vertex has degree 0 and is not connected to any other vertex in the graph.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a pendant vertex?",
      "options": [
        "A vertex with degree 0",
        "A vertex with degree 1 (leaf node)",
        "A vertex with degree 2",
        "A cut vertex"
      ],
      "answer": 1,
      "explanation": "A pendant vertex (or leaf) is an endpoint having degree 1.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Regular Graph?",
      "options": [
        "A graph with no cycles",
        "A graph where every vertex has the exact same degree",
        "A graph with straight edges",
        "A planar graph"
      ],
      "answer": 1,
      "explanation": "A k-regular graph is one where every vertex has degree k.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Dirac's Theorem for Hamiltonian graphs?",
      "options": [
        "If a simple graph with n >= 3 vertices has deg(v) >= n/2 for every vertex, then G is Hamiltonian",
        "Every graph with 4 vertices has a cycle",
        "Graphs with even edges are Hamiltonian",
        "Planar graphs are Hamiltonian"
      ],
      "answer": 0,
      "explanation": "Dirac's theorem states that if every vertex has degree at least n/2, the graph contains a Hamiltonian cycle.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is an Adjacency Matrix representation of an undirected graph?",
      "options": [
        "A symmetric binary matrix where A[i][j] = 1 if edge (i, j) exists",
        "A linked list of nodes",
        "A list of edge weights",
        "An asymmetric matrix"
      ],
      "answer": 0,
      "explanation": "Because edges are bidirectional, A[i][j] = A[j][i], producing a symmetric square matrix.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the complement of a complete graph K_n?",
      "options": [
        "A cycle graph C_n",
        "An empty/null graph with n isolated vertices and 0 edges",
        "A bipartite graph",
        "A tree"
      ],
      "answer": 1,
      "explanation": "Since K_n contains all possible edges, its complement has zero edges (isolated vertices).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a bridge (cut-edge) in a connected graph?",
      "options": [
        "An edge whose removal increases the number of connected components",
        "An edge that crosses another edge",
        "An edge with weight 0",
        "The longest edge in a cycle"
      ],
      "answer": 0,
      "explanation": "A bridge is an edge whose deletion disconnects the graph into two separate components.",
      "difficulty": "Intermediate"
    }
  ],
  "dm-u3": [
    {
      "q": "Which property defines a Tree in discrete mathematics?",
      "options": [
        "A connected undirected graph with no simple cycles",
        "A directed graph with multiple cycles",
        "A graph with V edges",
        "A complete graph"
      ],
      "answer": 0,
      "explanation": "A tree is a connected acyclic undirected graph.",
      "difficulty": "Beginner"
    },
    {
      "q": "How many edges does any tree with n vertices have?",
      "options": [
        "n",
        "n - 1",
        "n + 1",
        "2n"
      ],
      "answer": 1,
      "explanation": "Every tree with n vertices contains exactly n - 1 edges.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Spanning Tree of a connected graph G?",
      "options": [
        "A tree containing a subset of vertices",
        "A subgraph that is a tree and includes every vertex of G",
        "A graph with max cycles",
        "The complement graph"
      ],
      "answer": 1,
      "explanation": "A spanning tree touches all V vertices of the parent graph with exactly V - 1 edges and no cycles.",
      "difficulty": "Beginner"
    },
    {
      "q": "According to Cayley's Formula, how many distinct labeled trees can be formed on n vertices?",
      "options": [
        "n!",
        "n^(n - 2)",
        "2^n",
        "(n - 1)!"
      ],
      "answer": 1,
      "explanation": "Cayley's theorem proves that the number of labeled trees on n vertices is n^(n - 2).",
      "difficulty": "Advanced"
    },
    {
      "q": "What is Huffman Coding used for?",
      "options": [
        "Graph coloring",
        "Lossless data compression using variable-length prefix codes built from a binary frequency tree",
        "Sorting numbers",
        "Detecting cycles"
      ],
      "answer": 1,
      "explanation": "Huffman coding assigns shorter bit-strings to more frequent characters using a greedy binary tree.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In an m-ary tree where every internal node has exactly m children, if there are i internal nodes, how many leaves L are there?",
      "options": [
        "L = (m - 1) * i + 1",
        "L = m * i",
        "L = i + 1",
        "L = 2i"
      ],
      "answer": 0,
      "explanation": "Total nodes N = m*i + 1; since N = i + L, subtracting gives L = i(m - 1) + 1.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the root of an Expression Tree for the arithmetic expression (A + B) * (C - D)?",
      "options": [
        "+",
        "*",
        "-",
        "A"
      ],
      "answer": 1,
      "explanation": "The root of an expression tree corresponds to the operator evaluated last: multiplication (*).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What traversal of an expression tree produces the Postfix notation of the arithmetic expression?",
      "options": [
        "Pre-Order",
        "In-Order",
        "Post-Order",
        "Level-Order"
      ],
      "answer": 2,
      "explanation": "Post-Order traversal (Left -> Right -> Root) directly emits the reverse Polish / postfix notation.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the eccentricity of a vertex v in a tree?",
      "options": [
        "The degree of vertex v",
        "The maximum distance from v to any other vertex in the tree",
        "The number of children",
        "The sum of edge weights"
      ],
      "answer": 1,
      "explanation": "Eccentricity e(v) is the greatest shortest-path distance between v and any other vertex in the tree.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Center of a tree?",
      "options": [
        "The vertex (or pair of vertices) with the minimum eccentricity",
        "The root node",
        "The leaf with highest degree",
        "The geometric midpoint"
      ],
      "answer": 0,
      "explanation": "The center consists of vertices that minimize maximum distance to all other nodes (every tree has 1 or 2 centers).",
      "difficulty": "Intermediate"
    },
    {
      "q": "If you add an edge between any two non-adjacent vertices in a tree, what is always created?",
      "options": [
        "A disconnected component",
        "Exactly one unique fundamental cycle",
        "A forest",
        "A bipartite graph"
      ],
      "answer": 1,
      "explanation": "Adding any edge between existing vertices in a tree creates exactly one elementary cycle.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Forest in graph theory?",
      "options": [
        "A single tree",
        "An acyclic graph whose connected components are trees",
        "A complete graph",
        "A tree with leaves removed"
      ],
      "answer": 1,
      "explanation": "A forest is a disjoint collection of zero or more trees (an acyclic graph).",
      "difficulty": "Beginner"
    },
    {
      "q": "How many edges are in a forest with V vertices and k connected components?",
      "options": [
        "V - k",
        "V - 1",
        "V + k",
        "k * V"
      ],
      "answer": 0,
      "explanation": "Each of the k tree components with vi vertices has vi - 1 edges; summing gives ∑(vi - 1) = V - k edges.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Minimal Spanning Tree (MST)?",
      "options": [
        "A spanning tree with the fewest vertices",
        "A spanning tree whose sum of edge weights is minimal among all spanning trees",
        "A tree with height 1",
        "A binary search tree"
      ],
      "answer": 1,
      "explanation": "An MST connects all vertices of a weighted graph with the smallest possible total edge weight.",
      "difficulty": "Beginner"
    },
    {
      "q": "In a rooted binary tree, what is a node with zero children called?",
      "options": [
        "Internal node",
        "Leaf (External node)",
        "Root",
        "Sibling"
      ],
      "answer": 1,
      "explanation": "A leaf node is a terminal node with degree 1 (in undirected) or out-degree 0 (in rooted trees).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the maximum number of nodes at level k (root at level 0) of a binary tree?",
      "options": [
        "2k",
        "2^k",
        "k^2",
        "2^(k + 1)"
      ],
      "answer": 1,
      "explanation": "At level k, a binary tree can hold at most 2^k nodes (1 at level 0, 2 at level 1, 4 at level 2, etc.).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Prefix Code in coding theory?",
      "options": [
        "A code where every codeword begins with 0",
        "A code system where no valid codeword is a prefix of any other valid codeword",
        "An encryption code",
        "A postal code"
      ],
      "answer": 1,
      "explanation": "Prefix-free codes allow unambiguous instantaneous decoding without lookahead separators.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Between any two distinct vertices in a tree, how many simple paths exist?",
      "options": [
        "0",
        "Exactly 1",
        "At least 2",
        "Infinitely many"
      ],
      "answer": 1,
      "explanation": "A graph is a tree if and only if there is a unique simple path between every pair of vertices.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the radius of a tree?",
      "options": [
        "The diameter divided by 2",
        "The minimum eccentricity among all vertices in the tree",
        "The number of leaves",
        "The tree height"
      ],
      "answer": 1,
      "explanation": "The radius of a graph/tree is the minimum eccentricity of any vertex in the tree.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the diameter of a tree?",
      "options": [
        "The length of the longest simple path between any two vertices in the tree",
        "Total number of edges",
        "Double the height",
        "The degree of the root"
      ],
      "answer": 0,
      "explanation": "Diameter is the maximum distance (longest path) between any pair of vertices in the tree.",
      "difficulty": "Beginner"
    }
  ],
  "dm-u4": [
    {
      "q": "What is the fundamental difference between a Population and a Sample in statistics?",
      "options": [
        "Population is the complete collection of all elements under study; a sample is a representative subset of the population",
        "Sample is always larger than population",
        "Population is numeric; sample is text",
        "They are identical"
      ],
      "answer": 0,
      "explanation": "A population represents the entire universe of interest; a sample is an analyzed fraction.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which level of data measurement has a true, meaningful absolute zero point allowing ratio comparisons?",
      "options": [
        "Nominal",
        "Ordinal",
        "Interval",
        "Ratio"
      ],
      "answer": 3,
      "explanation": "Ratio data (e.g. height, weight, Kelvin) has a true zero point where ratios like 'twice as much' are valid.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which level of measurement categorizes data into ordered ranks, but differences between ranks cannot be quantified (e.g., Low, Medium, High)?",
      "options": [
        "Nominal",
        "Ordinal",
        "Interval",
        "Ratio"
      ],
      "answer": 1,
      "explanation": "Ordinal data has meaningful ranking order without equal measurable intervals between categories.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Stratified Random Sampling?",
      "options": [
        "Selecting whoever is closest",
        "Dividing the population into non-overlapping homogeneous strata and taking random samples from each stratum",
        "Picking every 10th person",
        "Testing the whole population"
      ],
      "answer": 1,
      "explanation": "Stratified sampling ensures subgroups (strata) are proportionately represented in the final sample.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Systematic Sampling?",
      "options": [
        "Selecting every k-th element from a randomly ordered list after a random starting point",
        "Drawing names from a hat",
        "Dividing by city zones",
        "Voluntary response"
      ],
      "answer": 0,
      "explanation": "Systematic sampling selects elements at a constant periodic interval k = N/n.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Cluster Sampling?",
      "options": [
        "Dividing the population into naturally occurring diverse clusters and surveying all members of randomly selected clusters",
        "Sampling only the richest members",
        "Selecting every 5th item",
        "Asking friends"
      ],
      "answer": 0,
      "explanation": "Cluster sampling randomly chooses entire heterogeneous clusters (e.g. schools, geographic blocks).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What type of data takes on countable separate values (e.g. number of students, cars in parking)?",
      "options": [
        "Continuous quantitative data",
        "Discrete quantitative data",
        "Qualitative nominal data",
        "Ordinal data"
      ],
      "answer": 1,
      "explanation": "Discrete data consists of distinct, separate integer count values.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which graphical display shows the distribution of continuous numerical data using adjacent contiguous vertical bars?",
      "options": [
        "Bar chart (categorical)",
        "Histogram",
        "Pie chart",
        "Scatter plot"
      ],
      "answer": 1,
      "explanation": "Histograms display continuous numerical frequency distributions across interval bins without gaps.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Sampling Error in statistical sampling?",
      "options": [
        "Mistakes made when calculating numbers",
        "The natural discrepancy between a sample statistic and the true population parameter due to observing only a subset",
        "A computer glitch",
        "Biased survey questions"
      ],
      "answer": 1,
      "explanation": "Sampling error is the inherent statistical variance between sample estimates and population truths.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Non-Sampling Error?",
      "options": [
        "Error caused by sampling variation",
        "Errors arising from measurement errors, non-response bias, flawed questions, or recording mistakes",
        "Mathematical formulas",
        "Rounding decimals"
      ],
      "answer": 1,
      "explanation": "Non-sampling errors stem from human, methodological, or instrumental flaws rather than sample size.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a parameter versus a statistic?",
      "options": [
        "A parameter describes a population; a statistic describes a sample",
        "A statistic describes a population; a parameter describes a sample",
        "They are identical terms",
        "Parameters are always known"
      ],
      "answer": 0,
      "explanation": "Parameters characterize populations (Greek letters μ, σ); statistics describe samples (Roman letters x̄, s).",
      "difficulty": "Beginner"
    },
    {
      "q": "In an Ogive graph, what is plotted on the vertical y-axis?",
      "options": [
        "Simple frequency",
        "Cumulative frequency (less-than or more-than)",
        "Class midpoints",
        "Relative variance"
      ],
      "answer": 1,
      "explanation": "An Ogive is a cumulative frequency polygon displaying running cumulative totals.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Convenience Sampling?",
      "options": [
        "Sampling based on rigorous random numbers",
        "A non-probability sampling technique where subjects are selected because of convenient accessibility to the researcher",
        "Cluster sampling",
        "Stratified random sampling"
      ],
      "answer": 1,
      "explanation": "Convenience sampling relies on readily available participants, introducing high potential bias.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Class Mark (Midpoint) of the class interval 20 - 30?",
      "options": [
        "20",
        "30",
        "25",
        "50"
      ],
      "answer": 2,
      "explanation": "Class Midpoint = (Lower Limit + Upper Limit) / 2 = (20 + 30) / 2 = 25.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Relative Frequency of a class in a frequency table?",
      "options": [
        "Class frequency divided by total sample size (f / N)",
        "Class frequency times 100",
        "Upper limit minus lower limit",
        "Average of frequencies"
      ],
      "answer": 0,
      "explanation": "Relative frequency is the proportion or percentage of total observations falling into that class.",
      "difficulty": "Beginner"
    },
    {
      "q": "What type of measurement scale is Temperature measured in Celsius or Fahrenheit?",
      "options": [
        "Nominal",
        "Ordinal",
        "Interval (no true zero point)",
        "Ratio"
      ],
      "answer": 2,
      "explanation": "Celsius/Fahrenheit scales have arbitrary zero points (0°C is not the total absence of heat), making them Interval.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Selection Bias in statistical surveys?",
      "options": [
        "Choosing the wrong chart",
        "A systematic distortion resulting from a sampling method that favors certain population members over others",
        "Calculating the wrong mean",
        "Typographical error"
      ],
      "answer": 1,
      "explanation": "Selection bias occurs when the sample does not accurately represent the intended population.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Cumulative Frequency of the third class if the first three classes have frequencies 5, 8, and 12?",
      "options": [
        "12",
        "25",
        "20",
        "13"
      ],
      "answer": 1,
      "explanation": "Cumulative frequency sums frequencies up to that class: 5 + 8 + 12 = 25.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Stem-and-Leaf display used for?",
      "options": [
        "Botany diagrams",
        "Organizing quantitative data while retaining the actual individual raw data values",
        "Displaying categorical percentages",
        "Showing timeline events"
      ],
      "answer": 1,
      "explanation": "Stem-and-leaf plots split numbers into stems (leading digits) and leaves (trailing digits), retaining exact data.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Central Limit Theorem (CLT) fundamental principle regarding sampling distributions?",
      "options": [
        "Data is always normally distributed",
        "As sample size n increases (typically n >= 30), the distribution of sample means approaches a normal distribution regardless of the underlying population shape",
        "Samples must be smaller than 30",
        "Variances cancel out"
      ],
      "answer": 1,
      "explanation": "CLT proves that sample means become normally distributed as n grows, enabling parametric inference.",
      "difficulty": "Advanced"
    }
  ],
  "dm-u5": [
    {
      "q": "Which measure of central tendency is most heavily distorted by extreme outliers in a dataset?",
      "options": [
        "Median",
        "Mode",
        "Arithmetic Mean",
        "Interquartile Range"
      ],
      "answer": 2,
      "explanation": "The arithmetic mean sums all values, so extreme high or low outliers skew the average significantly.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Median of the dataset: [3, 7, 8, 12, 14, 18, 21]?",
      "options": [
        "8",
        "12",
        "14",
        "11.8"
      ],
      "answer": 1,
      "explanation": "With 7 ordered values, the middle element at position (7 + 1)/2 = 4th position is 12.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Mode of a dataset?",
      "options": [
        "The arithmetic average",
        "The middle value",
        "The value that appears with the greatest frequency",
        "The difference between max and min"
      ],
      "answer": 2,
      "explanation": "The mode is the most frequently occurring score or category in a distribution.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Geometric Mean of the numbers 2, 8?",
      "options": [
        "5",
        "4",
        "6",
        "10"
      ],
      "answer": 1,
      "explanation": "Geometric Mean = sqrt(2 * 8) = sqrt(16) = 4.",
      "difficulty": "Beginner"
    },
    {
      "q": "When is the Harmonic Mean typically preferred over the arithmetic mean?",
      "options": [
        "For calculating average rates, speeds, and ratios over equal distances",
        "For counting discrete objects",
        "For normal distributions",
        "For symmetric curves"
      ],
      "answer": 0,
      "explanation": "Harmonic mean is the reciprocal of arithmetic mean of reciprocals, ideal for averaging rates and speeds.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the mathematical relationship between Arithmetic Mean (AM), Geometric Mean (GM), and Harmonic Mean (HM) for positive distinct numbers?",
      "options": [
        "AM > GM > HM",
        "HM > GM > AM",
        "GM > AM > HM",
        "AM = GM = HM"
      ],
      "answer": 0,
      "explanation": "For any collection of distinct positive real numbers, the inequality AM > GM > HM strictly holds.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Standard Deviation (σ)?",
      "options": [
        "The square of the variance",
        "The positive square root of the variance, measuring data dispersion in original units",
        "The difference between mean and median",
        "The range divided by 2"
      ],
      "answer": 1,
      "explanation": "Standard deviation is σ = sqrt(Variance), quantifying average spread around the mean in identical units.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Coefficient of Variation (CV) formula?",
      "options": [
        "CV = (Mean / SD) * 100",
        "CV = (Standard Deviation / Mean) * 100",
        "CV = Variance * Mean",
        "CV = Range / SD"
      ],
      "answer": 1,
      "explanation": "CV = (σ / μ) * 100 expresses relative dispersion as a percentage, enabling comparison across different units.",
      "difficulty": "Intermediate"
    },
    {
      "q": "If events A and B are Mutually Exclusive (disjoint), what is the probability P(A ∩ B)?",
      "options": [
        "P(A) * P(B)",
        "0",
        "1",
        "P(A) + P(B)"
      ],
      "answer": 1,
      "explanation": "Mutually exclusive events cannot occur simultaneously, so their intersection probability is zero.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the formula for Conditional Probability P(A | B) (probability of A given B has occurred)?",
      "options": [
        "P(A) * P(B)",
        "P(A ∩ B) / P(B) (where P(B) > 0)",
        "P(A) + P(B)",
        "P(A) / P(B)"
      ],
      "answer": 1,
      "explanation": "Conditional probability restricts the sample space to event B: P(A | B) = P(A ∩ B) / P(B).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does Bayes' Theorem compute?",
      "options": [
        "The mean of a distribution",
        "Posterior probability P(A | B) updated from prior probability P(A) using observed evidence B",
        "The sum of variances",
        "The median of a sample"
      ],
      "answer": 1,
      "explanation": "Bayes' theorem updates probability estimates given evidence: P(A|B) = [P(B|A) * P(A)] / P(B).",
      "difficulty": "Intermediate"
    },
    {
      "q": "How many ways can 5 books be arranged on a shelf (Permutations of 5 items)?",
      "options": [
        "25",
        "60",
        "120 (5!)",
        "24"
      ],
      "answer": 2,
      "explanation": "The number of permutations of n distinct objects is n! = 5 * 4 * 3 * 2 * 1 = 120.",
      "difficulty": "Beginner"
    },
    {
      "q": "How many distinct committees of 3 members can be selected from a group of 8 people (Combinations)?",
      "options": [
        "336",
        "56",
        "24",
        "120"
      ],
      "answer": 1,
      "explanation": "Combinations C(8, 3) = 8! / (3! * 5!) = (8 * 7 * 6) / (3 * 2 * 1) = 56.",
      "difficulty": "Beginner"
    },
    {
      "q": "If a fair 6-sided die is rolled, what is the probability of rolling a prime number (2, 3, 5)?",
      "options": [
        "1/6",
        "1/2 (3/6)",
        "2/3",
        "1/3"
      ],
      "answer": 1,
      "explanation": "Prime outcomes are {2, 3, 5}; 3 favorable outcomes out of 6 possible = 3/6 = 1/2.",
      "difficulty": "Beginner"
    },
    {
      "q": "If two events A and B are Independent, what does P(A ∩ B) equal?",
      "options": [
        "P(A) + P(B)",
        "P(A) * P(B)",
        "P(A | B)",
        "0"
      ],
      "answer": 1,
      "explanation": "Independence means occurrence of one does not alter probability of the other: P(A ∩ B) = P(A) * P(B).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Interquartile Range (IQR)?",
      "options": [
        "Q3 - Q1 (difference between 75th and 25th percentiles)",
        "Max - Min",
        "Mean - Median",
        "Q2 / 2"
      ],
      "answer": 0,
      "explanation": "IQR = Q3 - Q1 measures the spread of the middle 50% of ordered data, resistant to outliers.",
      "difficulty": "Beginner"
    },
    {
      "q": "In a positively skewed (right-skewed) distribution, what is the typical relationship between Mean, Median, and Mode?",
      "options": [
        "Mean < Median < Mode",
        "Mean > Median > Mode",
        "Mean = Median = Mode",
        "Median > Mean > Mode"
      ],
      "answer": 1,
      "explanation": "Right-skewed distributions have a long right tail that pulls the Mean highest: Mean > Median > Mode.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Variance of a dataset if its standard deviation is 7?",
      "options": [
        "14",
        "49",
        "3.5",
        "sqrt(7)"
      ],
      "answer": 1,
      "explanation": "Variance = σ^2 = 7^2 = 49.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does Chebyshev's Inequality guarantee about any dataset regardless of distribution shape?",
      "options": [
        "At least 1 - 1/k^2 of data values fall within k standard deviations of the mean (for k > 1)",
        "Data is symmetric",
        "99% of data is within 1 SD",
        "Mean equals median"
      ],
      "answer": 0,
      "explanation": "Chebyshev proves that at least 1 - 1/k^2 of values lie within k standard deviations for any distribution.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the sum of probabilities of all mutually exclusive and exhaustive elementary events in a sample space?",
      "options": [
        "0",
        "0.5",
        "1.0",
        "Depends on sample size"
      ],
      "answer": 2,
      "explanation": "By probability axioms, the total probability across all disjoint outcomes in sample space S equals 1.",
      "difficulty": "Beginner"
    }
  ],
  "dm-u6": [
    {
      "q": "In statistical hypothesis testing, what is the Null Hypothesis (H0)?",
      "options": [
        "The hypothesis the researcher hopes to prove true",
        "The baseline statement of no effect, no difference, or status quo to be tested against evidence",
        "The alternative hypothesis",
        "A verified fact"
      ],
      "answer": 1,
      "explanation": "The Null Hypothesis (H0) assumes no significant difference or effect until data provides evidence to reject it.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Type I Error in hypothesis testing?",
      "options": [
        "Failing to reject H0 when H0 is false",
        "Rejecting the Null Hypothesis H0 when it is actually true (False Positive)",
        "Arithmetic error",
        "Measuring the wrong variable"
      ],
      "answer": 1,
      "explanation": "A Type I error (alpha α) occurs when a true null hypothesis is incorrectly rejected.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Type II Error?",
      "options": [
        "Rejecting H0 when true",
        "Failing to reject the Null Hypothesis H0 when it is actually false (False Negative)",
        "Typographical error",
        "Using a z-test instead of t-test"
      ],
      "answer": 1,
      "explanation": "A Type II error (beta β) occurs when a false null hypothesis fails to be rejected.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the p-value in hypothesis testing?",
      "options": [
        "The probability that the null hypothesis is true",
        "The probability of obtaining test results at least as extreme as observed, assuming H0 is true",
        "The level of significance alpha",
        "The sample size"
      ],
      "answer": 1,
      "explanation": "p-value measures evidence against H0; smaller p-values indicate observed data is unlikely under H0.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the standard statistical decision rule when p-value is less than or equal to the significance level α (e.g., p <= 0.05)?",
      "options": [
        "Accept H0 unconditionally",
        "Reject the Null Hypothesis H0 (result is statistically significant)",
        "Inconclusive; collect more data",
        "Increase alpha"
      ],
      "answer": 1,
      "explanation": "If p <= α, observed data is sufficiently improbable under H0, justifying rejection of H0.",
      "difficulty": "Beginner"
    },
    {
      "q": "When is a Student's t-test used instead of a z-test for comparing sample means?",
      "options": [
        "When population standard deviation σ is unknown and sample size n is small (< 30)",
        "When sample size is > 10,000",
        "When data is nominal",
        "When testing proportions"
      ],
      "answer": 0,
      "explanation": "When population variance σ^2 is unknown and n < 30, the t-distribution accounts for extra sampling uncertainty.",
      "difficulty": "Beginner"
    },
    {
      "q": "How many Degrees of Freedom are there in a single-sample t-test with sample size n?",
      "options": [
        "n",
        "n - 1",
        "n - 2",
        "2n"
      ],
      "answer": 1,
      "explanation": "Degrees of freedom df = n - 1 because estimating sample mean uses one constraint.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Chi-Square (χ²) Test of Independence used to evaluate?",
      "options": [
        "Whether there is a significant association between two categorical variables in a contingency table",
        "Whether two population variances are equal",
        "Comparing means of 3 groups",
        "Linear regression slopes"
      ],
      "answer": 0,
      "explanation": "Chi-square test of independence tests whether row and column categorical factors are statistically independent.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the formula for the Chi-Square statistic?",
      "options": [
        "χ² = ∑ [(O - E)² / E] where O is Observed and E is Expected frequency",
        "χ² = (Mean - Median) / SD",
        "χ² = O - E",
        "χ² = n - 1"
      ],
      "answer": 0,
      "explanation": "Chi-square sums normalized squared residuals: ∑ (Observed - Expected)² / Expected.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In an r × c contingency table, what are the degrees of freedom for a Chi-Square test?",
      "options": [
        "(r - 1) * (c - 1)",
        "r * c",
        "r + c - 1",
        "(r - 1) + (c - 1)"
      ],
      "answer": 0,
      "explanation": "Degrees of freedom in contingency tables equals (rows - 1) * (columns - 1).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Two-Tailed Hypothesis Test?",
      "options": [
        "A test that tests only if parameter is greater than value",
        "A non-directional test where the critical region is split across both tails of the sampling distribution",
        "A test with two samples",
        "A test with two null hypotheses"
      ],
      "answer": 1,
      "explanation": "Two-tailed tests evaluate whether the parameter differs significantly in either direction (≠).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Critical Region (Rejection Region) in hypothesis testing?",
      "options": [
        "The set of test statistic values that leads to rejection of the Null Hypothesis H0",
        "The confidence interval",
        "The range of acceptable errors",
        "The sample mean range"
      ],
      "answer": 0,
      "explanation": "The critical region defines test statistic values extreme enough to reject H0 at chosen alpha.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Power of a statistical test (1 - β)?",
      "options": [
        "Probability of committing a Type I error",
        "Probability of correctly rejecting a false Null Hypothesis",
        "Sample size divided by alpha",
        "The computational speed"
      ],
      "answer": 1,
      "explanation": "Statistical power (1 - β) is the sensitivity of the test to detect an effect when an effect truly exists.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What critical z-value corresponds to a two-tailed test at 95% confidence level (α = 0.05)?",
      "options": [
        "1.645",
        "1.96",
        "2.576",
        "3.00"
      ],
      "answer": 1,
      "explanation": "For a two-tailed standard normal test at α = 0.05 (2.5% in each tail), z_critical = ±1.96.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does ANOVA (Analysis of Variance) test?",
      "options": [
        "Differences between variances only",
        "Whether the means of three or more independent groups are statistically significantly different",
        "Correlation between two variables",
        "Median of ranks"
      ],
      "answer": 1,
      "explanation": "ANOVA partitions total variance into between-group and within-group components to compare 3+ group means.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What test statistic is calculated in an ANOVA test?",
      "options": [
        "t-statistic",
        "F-statistic (ratio of Between-Group Variance to Within-Group Variance)",
        "z-score",
        "Chi-square"
      ],
      "answer": 1,
      "explanation": "The F-statistic compares variance between group means against unexplained error variance within groups.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a 95% Confidence Interval for a population mean?",
      "options": [
        "95% of data values fall within this range",
        "A range computed from sample data such that 95% of such constructed intervals would contain the true population parameter μ",
        "A 95% probability that sample mean is correct",
        "The range between min and max"
      ],
      "answer": 1,
      "explanation": "In repeated sampling, 95% of intervals constructed via x̄ ± z*(σ/√n) will capture true parameter μ.",
      "difficulty": "Intermediate"
    },
    {
      "q": "If sample size n increases while confidence level remains constant, what happens to the width of the confidence interval?",
      "options": [
        "Becomes wider",
        "Becomes narrower (more precise estimate)",
        "Remains unchanged",
        "Doubles"
      ],
      "answer": 1,
      "explanation": "Margin of error is inversely proportional to √n; larger samples reduce standard error, narrowing the interval.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Chi-Square Goodness-of-Fit test used for?",
      "options": [
        "Testing if observed sample frequencies conform to an expected theoretical probability distribution",
        "Finding outliers",
        "Testing equality of two means",
        "Calculating correlation"
      ],
      "answer": 0,
      "explanation": "Goodness-of-fit evaluates whether empirical sample categorical counts match hypothesized population distributions.",
      "difficulty": "Intermediate"
    },
    {
      "q": "When can the normal distribution be safely used as an approximation to the binomial distribution?",
      "options": [
        "When n <= 5",
        "When np >= 5 and n(1 - p) >= 5",
        "Only when p = 0.5",
        "When n is odd"
      ],
      "answer": 1,
      "explanation": "Binomial approaches normal when both expected successes (np) and failures n(1-p) are at least 5 to 10.",
      "difficulty": "Advanced"
    }
  ],
  "cga-u1": [
    {
      "q": "What is the primary difference between Raster Scan displays and Random Scan (Vector) displays?",
      "options": [
        "Raster scan paints pixels line-by-line across the entire screen from top to bottom; Random scan directs the electron beam only along the lines of the picture",
        "Random scan uses a frame buffer; raster scan does not",
        "Raster scan is analog; random scan is digital",
        "Random scan supports realistic photorealism"
      ],
      "answer": 0,
      "explanation": "Raster scan refreshes entire rectangular grid row by row; vector displays draw directly from point to point.",
      "difficulty": "Beginner"
    },
    {
      "q": "In Bresenham's Line Generation Algorithm, what type of arithmetic operations are used exclusively for computing decision parameters?",
      "options": [
        "Floating-point division",
        "Pure integer addition, subtraction, and bit shifting",
        "Trigonometric sines and cosines",
        "Matrix inversions"
      ],
      "answer": 1,
      "explanation": "Bresenham's breakthrough was formulating the decision parameter using only integer arithmetic, avoiding slow floating-point ops.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Frame Buffer in computer graphics architecture?",
      "options": [
        "A video camera lens",
        "A dedicated block of memory storing the color or intensity value for each pixel on the screen",
        "A CPU register",
        "A cache for textures on disk"
      ],
      "answer": 1,
      "explanation": "The frame buffer (video memory/VRAM) holds the bitmap image that the video display controller scans out.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Aspect Ratio of a display monitor?",
      "options": [
        "The refresh rate in Hertz",
        "The ratio of the width to the height of the screen image (e.g. 16:9)",
        "The number of colors supported",
        "The contrast ratio"
      ],
      "answer": 1,
      "explanation": "Aspect ratio describes proportional relationship between display width and height.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the main drawback of the Digital Differential Analyzer (DDA) line algorithm compared to Bresenham's algorithm?",
      "options": [
        "DDA cannot draw diagonal lines",
        "DDA requires floating-point arithmetic and rounding operations in every step",
        "DDA requires 3D coordinates",
        "DDA is too complex to implement"
      ],
      "answer": 1,
      "explanation": "DDA computes floating-point incremental steps and applies round() at each pixel, making it slower on older hardware.",
      "difficulty": "Beginner"
    },
    {
      "q": "In Midpoint Circle Generation algorithm, how many octants need to be calculated explicitly due to 8-way symmetry?",
      "options": [
        "1 octant (45 degrees)",
        "2 octants",
        "4 octants",
        "All 8 octants"
      ],
      "answer": 0,
      "explanation": "Using 8-way symmetry, computing one octant (x from 0 to y) provides all other 7 points by swapping coordinates and signs.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Aliasing (jaggies) in computer graphics?",
      "options": [
        "Color fading over time",
        "The visual stair-stepped distortion of continuous lines and curves when mapped to discrete pixel grids",
        "Screen flicker",
        "Incorrect lighting"
      ],
      "answer": 1,
      "explanation": "Aliasing causes jagged stair-stepped artifacts when high-frequency continuous signals are sampled into finite discrete pixels.",
      "difficulty": "Beginner"
    },
    {
      "q": "What technique blends pixel colors with surrounding background pixels along edges to reduce stair-stepped jaggies?",
      "options": [
        "Dithering",
        "Antialiasing (e.g. supersampling, MSAA)",
        "Clipping",
        "Quantization"
      ],
      "answer": 1,
      "explanation": "Antialiasing smooths jagged edges by assigning intermediate sub-pixel color intensities along boundaries.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the initial decision parameter p0 in Bresenham's line algorithm for slope 0 < m < 1?",
      "options": [
        "p0 = 2Δy - Δx",
        "p0 = 2Δx - Δy",
        "p0 = Δy / Δx",
        "p0 = 0"
      ],
      "answer": 0,
      "explanation": "At the start point, the initial decision parameter evaluates to p0 = 2Δy - Δx.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How many bits per pixel (bpp) are required for True Color (24-bit color depth)?",
      "options": [
        "8 bits",
        "16 bits",
        "24 bits (8 bits each for Red, Green, Blue)",
        "32 bits"
      ],
      "answer": 2,
      "explanation": "True color allocates 8 bits (256 levels) for each of the 3 color channels (R, G, B), totaling 16.7 million colors.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the refresh rate of a display monitor?",
      "options": [
        "The number of times per second the display hardware redraws the frame buffer onto the screen (measured in Hz)",
        "The pixel density",
        "The maximum resolution",
        "The video RAM size"
      ],
      "answer": 0,
      "explanation": "Refresh rate (e.g. 60Hz, 144Hz) defines how frequently the display controller cycles through the frame buffer.",
      "difficulty": "Beginner"
    },
    {
      "q": "In the Midpoint Circle algorithm for circle radius r centered at origin, what is the initial decision parameter p0?",
      "options": [
        "p0 = 1 - r (or 5/4 - r)",
        "p0 = 2r",
        "p0 = r^2",
        "p0 = 0"
      ],
      "answer": 0,
      "explanation": "Evaluating the midpoint (1, r - 0.5) in the circle equation yields p0 = 5/4 - r, rounded to 1 - r for integer math.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the Video Controller (Display Controller) do in graphics hardware?",
      "options": [
        "Compiles C++ code",
        "Reads pixel values continuously from the frame buffer and converts them to signals driving the monitor display",
        "Applies physics equations",
        "Stores user input"
      ],
      "answer": 1,
      "explanation": "The display controller reads frame buffer memory at the video refresh rate and produces raster scan signals.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Dithering in computer graphics?",
      "options": [
        "Increasing polygon count",
        "Creating the illusion of additional color shades and depth by alternating patterns of available palette pixels",
        "Smoothing fonts",
        "Scaling textures"
      ],
      "answer": 1,
      "explanation": "Dithering interleaves dots of limited palette colors to approximate subtle gradients and shades to the human eye.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is horizontal retrace in a CRT or raster scan beam?",
      "options": [
        "The return of the electron beam from the end of a scan line to the start of the next line while blanked",
        "The beam turning off completely",
        "Scanning from bottom to top",
        "Color calibration"
      ],
      "answer": 0,
      "explanation": "Horizontal retrace is the blanked return sweep of the beam to the left edge of the next raster scanline.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is vertical retrace (VBLANK)?",
      "options": [
        "The beam resetting from the bottom-right corner to top-left after finishing an entire frame refresh",
        "A graphics crash",
        "A line drawing algorithm",
        "A video compression codec"
      ],
      "answer": 0,
      "explanation": "Vertical retrace is the blanked interval during which the scan beam moves back to the top of the screen to start the next frame.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Look-Up Table (LUT) / Color Map in indexed color graphics?",
      "options": [
        "A list of screen resolutions",
        "An array where pixel values in the frame buffer act as pointers/indices to stored color palette entries",
        "A font table",
        "A list of GPU drivers"
      ],
      "answer": 1,
      "explanation": "Indexed color stores smaller indices (e.g. 8-bit) that look up 24-bit RGB values from a color palette LUT.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which line algorithm handles all slope octants uniformly without division by swapping coordinates when |m| > 1?",
      "options": [
        "Generalized Bresenham's Algorithm",
        "Standard DDA",
        "Midpoint Ellipse",
        "Polygon Fill"
      ],
      "answer": 0,
      "explanation": "Generalized Bresenham swaps x and y roles when slope |m| > 1, ensuring single-pixel steps along the major axis.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is resolution in display technology?",
      "options": [
        "The number of distinct pixels in each dimension that can be displayed (e.g. 1920 × 1080)",
        "The physical screen width in inches",
        "The brightness in nits",
        "The power consumption"
      ],
      "answer": 0,
      "explanation": "Resolution specifies horizontal and vertical pixel counts, determining visual sharpness.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is pixel (picture element)?",
      "options": [
        "The smallest addressable visual element on a digital display grid",
        "A hardware wire",
        "A file format",
        "A mouse cursor"
      ],
      "answer": 0,
      "explanation": "A pixel is the smallest controllable illuminated element on a digital raster display.",
      "difficulty": "Beginner"
    }
  ],
  "cga-u2": [
    {
      "q": "What 4-bit region code (outcode) represents a point lying strictly INSIDE the clipping window in the Cohen-Sutherland algorithm?",
      "options": [
        "0000",
        "1111",
        "0001",
        "1000"
      ],
      "answer": 0,
      "explanation": "The outcode bits represent [Top, Bottom, Right, Left]. A point inside all 4 boundary planes has code 0000.",
      "difficulty": "Beginner"
    },
    {
      "q": "In Cohen-Sutherland line clipping, when can a line segment with endpoints P1 and P2 be trivially REJECTED (discarded)?",
      "options": [
        "When code(P1) OR code(P2) == 0000",
        "When code(P1) AND code(P2) != 0000 (bitwise AND is non-zero)",
        "When both codes are 0000",
        "When the line slope is 1"
      ],
      "answer": 1,
      "explanation": "If bitwise AND of both endpoint outcodes is non-zero, both points lie completely outside on the same side of a boundary.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In Cohen-Sutherland line clipping, when can a line segment be trivially ACCEPTED?",
      "options": [
        "When code(P1) | code(P2) == 0000 (both endpoints have outcode 0000)",
        "When bitwise AND is 1111",
        "When line length is 0",
        "When line is vertical"
      ],
      "answer": 0,
      "explanation": "If both endpoint outcodes are 0000, both endpoints reside strictly inside the clip window.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Liang-Barsky line clipping algorithm based on?",
      "options": [
        "Parametric line equations (P(u) = P1 + u*(P2 - P1)) and inequalities testing intersections with infinite clipping edges",
        "4-bit region outcodes",
        "Subdivision of triangles",
        "Recursive midpoint search"
      ],
      "answer": 0,
      "explanation": "Liang-Barsky uses parametric line equations to calculate exact enter/exit parameter values u1 and u2.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which polygon clipping algorithm clips a polygon against one clipping boundary plane at a time, generating a new vertex sequence for subsequent stages?",
      "options": [
        "Sutherland-Hodgman Algorithm",
        "Cohen-Sutherland Algorithm",
        "Bresenham Algorithm",
        "DDA Clipper"
      ],
      "answer": 0,
      "explanation": "Sutherland-Hodgman pipeline clips polygons against Left, Right, Bottom, and Top boundaries sequentially.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In Sutherland-Hodgman polygon clipping, what output is produced when an edge goes from OUTSIDE the clipping window to INSIDE?",
      "options": [
        "No vertices output",
        "Intersection point only",
        "Both Intersection point AND the Inside vertex",
        "Inside vertex only"
      ],
      "answer": 2,
      "explanation": "Crossing from outside to inside outputs the boundary intersection point followed by the inside destination vertex.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What output is produced in Sutherland-Hodgman clipping when traversing an edge from INSIDE to OUTSIDE?",
      "options": [
        "Only the Intersection point",
        "Both vertices",
        "No vertices",
        "Inside vertex only"
      ],
      "answer": 0,
      "explanation": "Exiting the window generates only the intersection point where the edge pierces the clipping boundary.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What test determines whether an interior point is inside a complex polygon by counting ray intersections with polygon edges?",
      "options": [
        "Even-Odd Rule (Crossing Test)",
        "Midpoint rule",
        "Circle equation",
        "Outcode test"
      ],
      "answer": 0,
      "explanation": "The Even-Odd rule casts a ray to infinity; an odd number of boundary edge crossings indicates the point is inside.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Winding Number rule for polygon interior testing?",
      "options": [
        "Counting how many times the polygon boundary winds around the test point (non-zero winding means inside)",
        "Counting vertices",
        "Measuring polygon area",
        "Checking color"
      ],
      "answer": 0,
      "explanation": "The winding number tracks net revolutions made by the perimeter around the point; non-zero denotes interior.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Scan-Line Polygon Fill algorithm?",
      "options": [
        "A method that draws random dots",
        "An algorithm that determines edge intersections for each horizontal scanline, sorts them by x, and fills pixels between pairs of intersections",
        "A 3D mesh generator",
        "A brush tool"
      ],
      "answer": 1,
      "explanation": "Scan-line filling finds scanline intersections with polygon edges, sorts by x, and fills spans between odd/even pairs.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Boundary-Fill algorithm?",
      "options": [
        "Starts at an interior seed point and fills connected neighbors until encountering a specified boundary edge color",
        "Fills entire screen with black",
        "Clips lines against boundary",
        "Draws bounding boxes"
      ],
      "answer": 0,
      "explanation": "Boundary-fill recursively paints neighbor pixels until hitting a designated boundary color.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Flood-Fill algorithm?",
      "options": [
        "Replaces a designated old interior target color with a new replacement fill color across connected pixels starting from a seed point",
        "Floods computer memory",
        "Deletes polygons",
        "Calculates water dynamics"
      ],
      "answer": 0,
      "explanation": "Flood-fill replaces an existing target color with a replacement fill color, used in paint bucket tools.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the difference between 4-connected and 8-connected flood fill?",
      "options": [
        "4-connected inspects horizontal/vertical neighbors (N, S, E, W); 8-connected also checks 4 diagonal neighbors",
        "8-connected uses 8-bit color",
        "4-connected is 3D",
        "They produce identical fills"
      ],
      "answer": 0,
      "explanation": "4-connected checks cardinal directions; 8-connected includes diagonal neighbors, preventing leaks through corner gaps.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an Active Edge Table (AET) in scan-line polygon filling?",
      "options": [
        "A list of all polygon edges",
        "A dynamically maintained list containing only edges that currently intersect the active scanline, sorted by x",
        "A GPU hardware buffer",
        "A database of textures"
      ],
      "answer": 1,
      "explanation": "The AET maintains active edges spanning the current scanline, updated incrementally with scanline progression.",
      "difficulty": "Advanced"
    },
    {
      "q": "Why is Sutherland-Hodgman polygon clipping problematic for non-convex (concave) polygons?",
      "options": [
        "It produces invalid floating-point numbers",
        "It can introduce extraneous connecting line segments joining separate polygon parts",
        "It crashes memory",
        "It only clips circles"
      ],
      "answer": 1,
      "explanation": "Sutherland-Hodgman can generate bridge edges across concave notches (Weiler-Atherton solves this).",
      "difficulty": "Advanced"
    },
    {
      "q": "Which polygon clipping algorithm correctly handles concave polygons with holes by traversing alternating clipping and subject boundaries?",
      "options": [
        "Weiler-Atherton Algorithm",
        "Cohen-Sutherland",
        "Bresenham Algorithm",
        "DDA"
      ],
      "answer": 0,
      "explanation": "Weiler-Atherton follows entering and exiting vertices along boundaries to output disjoint clipped polygons and holes.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is a convex polygon?",
      "options": [
        "A polygon where a line segment connecting any two internal points lies entirely inside the polygon",
        "A polygon with at least one internal angle > 180 degrees",
        "A polygon with 3 sides",
        "A circle"
      ],
      "answer": 0,
      "explanation": "A polygon is convex if all internal angles are <= 180° and all internal chords remain entirely within the shape.",
      "difficulty": "Beginner"
    },
    {
      "q": "In Cohen-Sutherland outcode, which bit position represents TOP when bits are labeled [Bit 4: Top, Bit 3: Bottom, Bit 2: Right, Bit 1: Left]?",
      "options": [
        "Bit 4 (value 8, 1000)",
        "Bit 1 (value 1, 0001)",
        "Bit 2 (value 2, 0010)",
        "Bit 3 (value 4, 0100)"
      ],
      "answer": 0,
      "explanation": "Standard convention defines Top as bit 4 (1000 in binary, or value 8).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is viewport clipping?",
      "options": [
        "Clipping primitives to the boundaries of the normalized viewport or screen display window",
        "Deleting files",
        "Rotating camera",
        "Changing screen brightness"
      ],
      "answer": 0,
      "explanation": "Viewport clipping discards visual primitives or sections lying outside the visible display window bounds.",
      "difficulty": "Beginner"
    },
    {
      "q": "In edge coherence of scan-line polygon fill, how is the x-intersection updated from scanline y to y + 1?",
      "options": [
        "x_{new} = x_{old} + 1/m (where m is edge slope)",
        "x_{new} = x_{old} * m",
        "x_{new} = x_{old} + m",
        "x does not change"
      ],
      "answer": 0,
      "explanation": "Since dx/dy = 1/m, advancing y by 1 increments x by the reciprocal of the slope: x_{i+1} = x_i + 1/m.",
      "difficulty": "Intermediate"
    }
  ],
  "cga-u3": [
    {
      "q": "Why are Homogeneous Coordinates used in 2D and 3D computer graphics transformations?",
      "options": [
        "To reduce floating-point numbers",
        "To represent affine transformations (including Translation, Rotation, Scaling) uniformly as matrix multiplications",
        "To eliminate the z-axis",
        "To compress 3D models"
      ],
      "answer": 1,
      "explanation": "Homogeneous coordinates (adding an extra dimension w=1) allow translation to be expressed as a matrix multiplication.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the 2D Translation matrix using homogeneous coordinates for displacements tx and ty?",
      "options": [
        "[[1, 0, tx], [0, 1, ty], [0, 0, 1]]",
        "[[tx, 0, 0], [0, ty, 0], [0, 0, 1]]",
        "[[cos θ, -sin θ, 0], [sin θ, cos θ, 0], [0, 0, 1]]",
        "[[1, 1, tx], [1, 1, ty], [0, 0, 1]]"
      ],
      "answer": 0,
      "explanation": "The standard 2D translation matrix has 1s on diagonal, with tx and ty in the third column: [x', y', 1]^T = T * [x, y, 1]^T.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the 2D Rotation matrix for rotating a point counter-clockwise by angle θ around the origin (0, 0)?",
      "options": [
        "[[cos θ, -sin θ, 0], [sin θ, cos θ, 0], [0, 0, 1]]",
        "[[sin θ, cos θ, 0], [-cos θ, sin θ, 0], [0, 0, 1]]",
        "[[1, 0, θ], [0, 1, θ], [0, 0, 1]]",
        "[[cos θ, sin θ, 0], [sin θ, cos θ, 0], [0, 0, 1]]"
      ],
      "answer": 0,
      "explanation": "x' = x cos θ - y sin θ and y' = x sin θ + y cos θ, expressed as [[cos θ, -sin θ], [sin θ, cos θ]].",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the 2D Scaling matrix with scaling factors Sx and Sy relative to the origin?",
      "options": [
        "[[Sx, 0, 0], [0, Sy, 0], [0, 0, 1]]",
        "[[1, Sx, 0], [Sy, 1, 0], [0, 0, 1]]",
        "[[0, Sx, 0], [Sy, 0, 0], [0, 0, 1]]",
        "[[Sx, Sy, 0], [0, 0, 0], [0, 0, 1]]"
      ],
      "answer": 0,
      "explanation": "Scaling multiplies x by Sx and y by Sy via diagonal matrix entries: [[Sx, 0, 0], [0, Sy, 0], [0, 0, 1]].",
      "difficulty": "Beginner"
    },
    {
      "q": "What sequence of transformations performs 2D Rotation around an arbitrary pivot point (xp, yp)?",
      "options": [
        "Translate origin to pivot -> Rotate -> Translate back",
        "Translate pivot to origin T(-xp, -yp) -> Rotate R(θ) -> Translate back T(xp, yp)",
        "Rotate -> Translate",
        "Scale -> Rotate"
      ],
      "answer": 1,
      "explanation": "First translate pivot to origin T(-xp, -yp), apply rotation R(θ) around origin, then translate back T(xp, yp).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Shearing transformation in 2D?",
      "options": [
        "Cutting an object in two",
        "A transformation that slants the shape of an object along the x or y direction proportional to the other coordinate",
        "Rotating by 90 degrees",
        "Scaling uniformly"
      ],
      "answer": 1,
      "explanation": "Shear shifts coordinate values proportionally: x' = x + sh_x * y, creating a slanted parallelogram effect.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What transformation produces the mirror image of an object across a coordinate axis?",
      "options": [
        "Translation",
        "Reflection",
        "Shear",
        "Projection"
      ],
      "answer": 1,
      "explanation": "Reflection produces a mirror image by negating coordinates (e.g. reflection across x-axis negates y).",
      "difficulty": "Beginner"
    },
    {
      "q": "Is matrix multiplication commutative in composite geometric transformations (i.e., does A * B = B * A)?",
      "options": [
        "Yes, always",
        "No, matrix multiplication is generally non-commutative (order of transformations matters)",
        "Only for 3D matrices",
        "Only when scaling"
      ],
      "answer": 1,
      "explanation": "Transformations do not commute: translating then rotating yields a completely different result than rotating then translating.",
      "difficulty": "Beginner"
    },
    {
      "q": "What size matrix is required to represent 3D transformations using homogeneous coordinates?",
      "options": [
        "2 × 2",
        "3 × 3",
        "4 × 4",
        "5 × 5"
      ],
      "answer": 2,
      "explanation": "3D coordinates (x, y, z, 1) require 4 × 4 transformation matrices in homogeneous coordinates.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an Affine Transformation?",
      "options": [
        "A transformation that transforms circles to squares",
        "A transformation that preserves collinearity (points on a line remain on a line) and ratios of distances along lines",
        "A non-linear warp",
        "A random displacement"
      ],
      "answer": 1,
      "explanation": "Affine transformations preserve straight lines and parallelism (includes translation, rotation, scale, shear).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does a reflection across the line y = x do to coordinates (x, y)?",
      "options": [
        "(-x, -y)",
        "(y, x)",
        "(-y, -x)",
        "(x, -y)"
      ],
      "answer": 1,
      "explanation": "Reflecting across the diagonal line y = x swaps coordinate roles: (x, y) becomes (y, x).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Uniform Scaling in 2D or 3D?",
      "options": [
        "Scaling where Sx = Sy = Sz (aspect ratio is preserved)",
        "Scaling along x-axis only",
        "Random scaling",
        "Inverting coordinates"
      ],
      "answer": 0,
      "explanation": "Uniform scaling uses identical scale factors across all axes, preserving object proportions without distortion.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the inverse of a 2D Translation matrix T(tx, ty)?",
      "options": [
        "T(-tx, -ty)",
        "T(1/tx, 1/ty)",
        "T(ty, tx)",
        "T(tx^2, ty^2)"
      ],
      "answer": 0,
      "explanation": "To undo a translation by (tx, ty), translate by negative displacement: T(-tx, -ty).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the inverse of a 2D Rotation matrix R(θ)?",
      "options": [
        "R(-θ) or the transpose of matrix R",
        "R(1/θ)",
        "R(2θ)",
        "R(θ + 90)"
      ],
      "answer": 0,
      "explanation": "Rotation matrices are orthogonal; their inverse is simply rotating by -θ, which equals their matrix transpose.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Differential Scaling?",
      "options": [
        "Scaling by derivatives",
        "Scaling where Sx != Sy (altering the proportions and aspect ratio of the object)",
        "Continuous smooth scaling",
        "Scaling by zero"
      ],
      "answer": 1,
      "explanation": "Differential scaling uses unequal scale factors, stretching or compressing the object along specific dimensions.",
      "difficulty": "Beginner"
    },
    {
      "q": "In 3D graphics, what is rotation around the Z-axis in right-handed coordinate systems?",
      "options": [
        "Transforms x and y like standard 2D rotation while leaving z coordinate unchanged",
        "Alters z only",
        "Inverts camera",
        "Translates along z"
      ],
      "answer": 0,
      "explanation": "Z-axis rotation maintains z' = z while rotating x and y according to standard 2D rotation formulas.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the 3D homogeneous coordinate point [X, Y, Z, W] with W != 1 represent in Cartesian 3D space?",
      "options": [
        "[X, Y, Z]",
        "[X/W, Y/W, Z/W] (perspective division)",
        "[X*W, Y*W, Z*W]",
        "[0, 0, 0]"
      ],
      "answer": 1,
      "explanation": "Homogeneous coordinates are normalized to Cartesian coordinates by dividing through by W (perspective division).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Euler Angle representation of 3D rotations, and what major mathematical issue can it suffer from?",
      "options": [
        "Pitch, Yaw, Roll rotations; suffers from Gimbal Lock (loss of one degree of rotational freedom)",
        "Matrix scaling; suffers from memory leak",
        "Vertex colors; suffers from clipping",
        "Texture coordinates; suffers from blur"
      ],
      "answer": 0,
      "explanation": "Euler angles describe 3D rotation via 3 sequential axis rotations, susceptible to Gimbal Lock when two axes align.",
      "difficulty": "Advanced"
    },
    {
      "q": "What mathematical construct avoids Gimbal Lock and provides smooth spherical interpolation (SLERP) for 3D rotations in game engines?",
      "options": [
        "Quaternions (4D hypercomplex numbers)",
        "2D matrices",
        "B-Splines",
        "Vector dots"
      ],
      "answer": 0,
      "explanation": "Quaternions represent 3D orientation as 4-tuples, enabling compact, singularity-free rotations and smooth interpolation.",
      "difficulty": "Advanced"
    },
    {
      "q": "What is the Window-to-Viewport transformation?",
      "options": [
        "Resizing browser windows",
        "Mapping 2D geometric world coordinates within a defined window onto normalized device or viewport screen coordinates",
        "Minimizing an application",
        "Switching monitors"
      ],
      "answer": 1,
      "explanation": "Window-to-viewport maps a rectangular region of world coordinates onto a designated screen viewport region.",
      "difficulty": "Intermediate"
    }
  ],
  "cga-u4": [
    {
      "q": "Which illumination model calculates diffuse reflection based on Lambert's Cosine Law (I_diff = I_p * k_d * cos θ)?",
      "options": [
        "Lambertian Diffuse Reflection",
        "Phong Specular Model",
        "Ray Tracing",
        "Ambient Occlusion"
      ],
      "answer": 0,
      "explanation": "Lambert's law states reflected diffuse light intensity is proportional to cosine of angle between light vector and surface normal.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Phong Illumination Model composed of?",
      "options": [
        "Ambient + Diffuse + Specular reflection",
        "Shadow + Light only",
        "Direct sunlight + Moon",
        "RGB colors"
      ],
      "answer": 0,
      "explanation": "The classic Phong model combines uniform Ambient light, Lambertian Diffuse reflection, and shiny Specular highlights.",
      "difficulty": "Beginner"
    },
    {
      "q": "How does Gouraud Shading interpolate lighting across a polygon surface?",
      "options": [
        "Calculates lighting once per polygon",
        "Calculates lighting intensity at polygon vertices and linearly interpolates intensity across the interior pixels",
        "Calculates lighting per pixel using interpolated surface normals",
        "Uses ray marching"
      ],
      "answer": 1,
      "explanation": "Gouraud shading evaluates vertex colors and bilinearly interpolates intensities across scanlines.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How does Phong Shading differ from Gouraud Shading?",
      "options": [
        "Phong interpolates surface normal vectors across polygon pixels and evaluates the lighting model at every individual pixel",
        "Phong is faster than Gouraud",
        "Gouraud calculates per-pixel normals",
        "Phong only works for flat surfaces"
      ],
      "answer": 0,
      "explanation": "Phong shading interpolates surface normals across the polygon and recalculates lighting equations per-pixel, producing crisp specular highlights.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Flat Shading (Constant Shading)?",
      "options": [
        "Calculates lighting once using a single surface normal for the entire polygon and paints all pixels with that identical color",
        "Paints without color",
        "Shades using textures only",
        "Uses 3D ray tracing"
      ],
      "answer": 0,
      "explanation": "Flat shading computes lighting once per facet, resulting in visible polygonal facet boundaries.",
      "difficulty": "Beginner"
    },
    {
      "q": "In the RGB Color Model, what secondary color is produced by combining full Red and full Green light (255, 255, 0)?",
      "options": [
        "Magenta",
        "Cyan",
        "Yellow",
        "White"
      ],
      "answer": 2,
      "explanation": "In additive RGB lighting, mixing Red and Green wavelengths produces Yellow.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which color model is Subtractive and used predominantly in color printing?",
      "options": [
        "RGB",
        "CMYK (Cyan, Magenta, Yellow, Key/Black)",
        "HSV",
        "HSL"
      ],
      "answer": 1,
      "explanation": "CMYK is subtractive: ink pigments absorb specific light wavelengths reflected from paper.",
      "difficulty": "Beginner"
    },
    {
      "q": "What do the three dimensions of the HSV color model represent?",
      "options": [
        "Height, Surface, Vector",
        "Hue (color angle), Saturation (vibrancy), Value (brightness)",
        "Heat, Shade, Vapor",
        "Horizontal, Slant, Vertical"
      ],
      "answer": 1,
      "explanation": "HSV maps color to intuitive artistic parameters: Hue (0-360°), Saturation (0-100%), and Value (0-100%).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Ambient Light in computer graphics illumination?",
      "options": [
        "Direct glare from headlights",
        "A constant background illumination resulting from multiple diffuse reflections from all room surfaces, illuminating all objects equally",
        "Flashlight beam",
        "Neon glow"
      ],
      "answer": 1,
      "explanation": "Ambient light approximates indirect scattered environmental light, ensuring unlit surfaces are not pitch black.",
      "difficulty": "Beginner"
    },
    {
      "q": "What controls the size and sharpness of the specular highlight in the Phong illumination model (cos^n α)?",
      "options": [
        "Ambient coefficient",
        "Specular reflection exponent n (shininess factor)",
        "Color hue",
        "Polygon area"
      ],
      "answer": 1,
      "explanation": "Higher shininess exponent n concentrates the highlight into a smaller, tighter, glossier bright spot.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How many control points define a standard Cubic Bézier curve?",
      "options": [
        "2",
        "3",
        "4",
        "5"
      ],
      "answer": 2,
      "explanation": "A cubic Bézier curve is governed by 4 control points: P0 (start), P1, P2 (tangent handles), and P3 (end).",
      "difficulty": "Beginner"
    },
    {
      "q": "What mathematical polynomials form the blending basis functions of a Bézier curve?",
      "options": [
        "Fourier Series",
        "Bernstein Polynomials",
        "Taylor Series",
        "Lagrange Multipliers"
      ],
      "answer": 1,
      "explanation": "Bézier curves sum control points weighted by Bernstein basis polynomials: B_{i,n}(t) = C(n,i) t^i (1-t)^{n-i}.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Convex Hull property of Bézier curves?",
      "options": [
        "The curve never bends",
        "The entire generated curve is guaranteed to lie completely within the convex polygon formed by connecting its control points",
        "The curve passes through all control points",
        "The curve is a closed circle"
      ],
      "answer": 1,
      "explanation": "Because Bernstein basis polynomials sum to 1, the curve is a convex combination strictly bounded inside control point hull.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Why are B-Spline curves often preferred over high-degree Bézier curves in CAD modeling?",
      "options": [
        "B-Splines offer local control: moving a control point affects only nearby curve segments rather than the entire global curve",
        "B-Splines require no math",
        "B-Splines cannot be curved",
        "B-Splines only work in 2D"
      ],
      "answer": 0,
      "explanation": "B-Splines decouple curve order from control point count, providing local control where editing points does not alter far segments.",
      "difficulty": "Advanced"
    },
    {
      "q": "What does NURBS stand for in 3D surface modeling?",
      "options": [
        "New Universal Rendering Binary System",
        "Non-Uniform Rational B-Splines",
        "Network Unified Raster Bitmap Shading",
        "Non-linear Uniform Ray Base Shader"
      ],
      "answer": 1,
      "explanation": "NURBS provides mathematical precision for modeling both freeform organic curves and analytic geometric shapes (spheres, cones).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Blinn-Phong shading model modification over the standard Phong model?",
      "options": [
        "Uses ray tracing instead",
        "Uses the Halfway vector H = (L + V)/|L + V| instead of reflecting light vectors, significantly accelerating computation",
        "Eliminates diffuse light",
        "Uses 8-bit integers"
      ],
      "answer": 1,
      "explanation": "Blinn-Phong uses the halfway vector between light and view direction, avoiding expensive reflection vector calculations.",
      "difficulty": "Advanced"
    },
    {
      "q": "What visual artifact commonly affects Gouraud shading on low-poly meshes?",
      "options": [
        "Mach Banding (perceptual exaggerated bands at derivative intensity discontinuities along edges)",
        "Pixelation",
        "Inverted colors",
        "Z-fighting"
      ],
      "answer": 0,
      "explanation": "Mach bands are visual artifacts caused by human optical exaggeration of linear intensity gradient discontinuities across edges.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Specular Reflection?",
      "options": [
        "Dull matte reflection",
        "Bright, mirror-like reflection of light that causes highlights on polished or glossy surfaces",
        "Light trapped in fog",
        "Light emitted by lasers"
      ],
      "answer": 1,
      "explanation": "Specular reflection bounces light preferentially in the direction of the reflection angle, creating shiny highlights.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of Bump Mapping?",
      "options": [
        "Deforms the actual polygon geometry mesh",
        "Simulates bumps and wrinkles on a surface by perturbing the surface normal vectors without modifying the actual underlying polygon mesh",
        "Applies collision physics",
        "Smoothes jagged textures"
      ],
      "answer": 1,
      "explanation": "Bump mapping perturbs surface normals before lighting calculations, creating the visual illusion of texture depth.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How does Normal Mapping improve upon standard grayscale Bump Mapping?",
      "options": [
        "Stores full 3D normal vector perturbations directly into the RGB color channels of a normal map texture",
        "Uses ray marching",
        "Doubles polygon vertices",
        "Generates audio waves"
      ],
      "answer": 0,
      "explanation": "Normal maps store tangent-space (x, y, z) normal vectors in the (R, G, B) texture channels.",
      "difficulty": "Intermediate"
    }
  ],
  "cga-u5": [
    {
      "q": "Which of the following is one of the classic 12 Principles of Animation developed by Disney animators?",
      "options": [
        "Squash and Stretch",
        "Binary Search",
        "Rasterization",
        "Ray Tracing"
      ],
      "answer": 0,
      "explanation": "Squash and Stretch conveys weight, flexibility, and mass to animated characters and objects.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Keyframing in computer animation?",
      "options": [
        "Pressing keys on a keyboard",
        "Defining the starting and ending critical pose frames of a motion sequence, while intermediate frames are interpolated",
        "Locking animation files",
        "Drawing every frame by hand"
      ],
      "answer": 1,
      "explanation": "Keyframes define major poses at specific timestamps; software generates the intermediate frames between them.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the term for automatically generating intermediate frames between two keyframes in digital animation?",
      "options": [
        "In-betweening (Tweening)",
        "Keying",
        "Rotoscoping",
        "Rigging"
      ],
      "answer": 0,
      "explanation": "Tweening (short for in-betweening) interpolates position, rotation, and scale between designated keyframes.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Forward Kinematics (FK) in character skeletal animation?",
      "options": [
        "Calculating end-effector position by specifying rotation angles of parent joints down the hierarchical kinematic chain",
        "Placing the hand and having elbows compute automatically",
        "Simulating gravity",
        "Animating clothes"
      ],
      "answer": 0,
      "explanation": "FK computes positions from the root outwards: rotating the shoulder rotates the arm, which moves the hand.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Inverse Kinematics (IK)?",
      "options": [
        "Moving parent joints to move children",
        "Specifying the desired position of the end-effector (e.g. hand or foot) and mathematically solving the required rotations of all parent joints",
        "Reversing animation playback",
        "Scaling skeletons down"
      ],
      "answer": 1,
      "explanation": "IK calculates parent joint angles needed to position an end-effector at a target location (e.g. foot on uneven terrain).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Onion Skinning in 2D animation software?",
      "options": [
        "Peeling texture maps",
        "A feature that displays translucent ghosted silhouettes of previous and upcoming frames simultaneously to assist timing and spacing",
        "Layering vegetables in UI",
        "Compressing SVG assets"
      ],
      "answer": 1,
      "explanation": "Onion skinning superimposes faint previews of neighboring frames so animators can visualize motion flow.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Morphing in digital visual effects?",
      "options": [
        "A special effects technique that smoothly transforms one image or 3D object into another through seamless shape interpolation and cross-dissolving",
        "Scaling an image",
        "Rotating an asset",
        "Converting PNG to JPG"
      ],
      "answer": 0,
      "explanation": "Morphing combines geometric warping and color cross-dissolving to transition seamlessly between two subjects.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Animation Principle of 'Anticipation'?",
      "options": [
        "Waiting for video to buffer",
        "A preparatory movement or action that cues the audience that a major action is about to take place (e.g. crouching before jumping)",
        "Ending a scene abruptly",
        "Speeding up video"
      ],
      "answer": 1,
      "explanation": "Anticipation prepares viewers for what is to follow, making physical actions believable and readable.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does 'Ease-In and Ease-Out' (Slow-In and Slow-Out) replicate in realistic animation physics?",
      "options": [
        "Inertia and acceleration: objects start moving gradually, reach maximum speed, and decelerate to a stop rather than moving linearly",
        "Instantaneous teleportation",
        "Constant velocity motion",
        "Flipping directions randomly"
      ],
      "answer": 0,
      "explanation": "Natural physical motion involves acceleration and deceleration curves rather than abrupt robotic linear movement.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Rigging in 3D character animation?",
      "options": [
        "Writing cheat codes",
        "Creating an underlying digital skeletal bone structure and joint hierarchy to control and deform a 3D character mesh",
        "Lighting a scene",
        "Texturing a building"
      ],
      "answer": 1,
      "explanation": "Rigging binds a skeleton of bones and controls to a polygonal mesh, allowing animators to pose characters.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Skinning (Weight Painting) in 3D character setup?",
      "options": [
        "Drawing character skin textures",
        "Assigning vertex weights to determine how much influence each skeleton bone exerts on nearby surface mesh vertices during deformation",
        "Applying normal maps",
        "Deleting internal polygons"
      ],
      "answer": 1,
      "explanation": "Skinning binds mesh vertices to bones with weighting coefficients, preventing unnatural collapsing at joints.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Stop Motion animation?",
      "options": [
        "Pausing a game",
        "An animation technique where physical objects are physically moved in tiny increments and photographed frame-by-frame",
        "A bug in rendering engines",
        "GPU lag"
      ],
      "answer": 1,
      "explanation": "Stop motion captures sequential still photographs of tangible puppets or clay figures moved by hand between shots.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Motion Capture (Mocap)?",
      "options": [
        "Recording screenshots",
        "Recording real-world movement of human actors or objects using optical markers/sensors and mapping that data onto digital 3D character rigs",
        "Screen recording software",
        "Video streaming"
      ],
      "answer": 1,
      "explanation": "Motion capture tracks physical performers via marker suits to produce realistic animated skeleton data.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Animation Principle of 'Secondary Action'?",
      "options": [
        "A backup animation file",
        "An additional supplementary action that enriches and supports the main action (e.g. arms swinging or hair swaying while walking)",
        "Second camera angle",
        "The antagonist's movement"
      ],
      "answer": 1,
      "explanation": "Secondary actions add realistic nuance and depth to a character's primary movement.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is 'Follow Through and Overlapping Action' in animation?",
      "options": [
        "Unrelated scenes playing together",
        "Different body parts continue moving after the character stops (follow through), and different parts move at different rates (overlap)",
        "Playing video backwards",
        "Drawing outlines twice"
      ],
      "answer": 1,
      "explanation": "Follow-through reflects inertia: when a character stops abruptly, hair, clothing, and loose limbs continue forward briefly.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Frame Rate in animation and video playback?",
      "options": [
        "The speed of sound",
        "The frequency at which consecutive individual frames are displayed per second (measured in fps, e.g. 24fps, 60fps)",
        "The size of pixels",
        "The resolution of the camera"
      ],
      "answer": 1,
      "explanation": "Frame rate (frames per second / fps) determines visual motion smoothness; cinematic film is traditionally 24 fps.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Rotoscoping?",
      "options": [
        "Rotating 3D models",
        "Tracing over live-action film footage frame by frame to produce realistic animation or composite matte cutouts",
        "Applying blur filters",
        "Drawing circles"
      ],
      "answer": 1,
      "explanation": "Rotoscoping projects live-action footage for artists to trace real human movement or isolate elements.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Particle System in 3D computer graphics animation?",
      "options": [
        "Atom simulation software",
        "A technique that uses an aggregate of large numbers of tiny graphic sprites to simulate fuzzy chaotic phenomena like fire, smoke, rain, and sparks",
        "Physics engine for rigid bodies",
        "Audio equalizer"
      ],
      "answer": 1,
      "explanation": "Particle systems animate hundreds or thousands of reactive miniature sprites governed by physics emitters.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Morph Target (Blend Shape) animation used primarily for in 3D character work?",
      "options": [
        "Walking cycles",
        "Facial expressions and speech phoneme lip-syncing by blending between predefined facial target meshes",
        "Clothing physics",
        "Vehicles"
      ],
      "answer": 1,
      "explanation": "Blend shapes linearly interpolate vertex offsets between neutral and target expressions (smile, blink, speech shapes).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does an Animation Curve (F-Curve) editor in 3D software represent?",
      "options": [
        "A curve showing polygon wireframe",
        "A 2D graph plotting an animated property's value (position, rotation) against time, with tangent handles to adjust easing",
        "CPU usage over time",
        "Color grading histogram"
      ],
      "answer": 1,
      "explanation": "F-Curve graphs plot animation values across timeline frames, allowing animators to fine-tune bezier interpolation.",
      "difficulty": "Intermediate"
    }
  ],
  "cga-u6": [
    {
      "q": "What is the fundamental building block of all entities in a Unity scene?",
      "options": [
        "GameObject",
        "Shader",
        "Prefab",
        "Rigidbody"
      ],
      "answer": 0,
      "explanation": "Every object in a Unity scene (characters, lights, cameras, props) is a GameObject.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which Component is mandatory and exists on EVERY GameObject in Unity to define its position, rotation, and scale?",
      "options": [
        "MeshRenderer",
        "Transform",
        "Collider",
        "AudioSource"
      ],
      "answer": 1,
      "explanation": "The Transform component is intrinsic to all GameObjects, specifying 3D position, rotation, and scale.",
      "difficulty": "Beginner"
    },
    {
      "q": "In Unity C# scripting, what is the key difference between the Update() and FixedUpdate() lifecycle methods?",
      "options": [
        "Update() runs once per rendered frame (variable delta time); FixedUpdate() runs on a strictly consistent fixed timer synced with the physics engine",
        "FixedUpdate() is deprecated",
        "Update() is for physics only",
        "FixedUpdate() runs only once"
      ],
      "answer": 0,
      "explanation": "FixedUpdate() runs at deterministic intervals for physics calculations (default 0.02s); Update() varies with frame rate.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which Unity component enables a GameObject to be influenced by real-time physics, gravity, and forces?",
      "options": [
        "BoxCollider",
        "Rigidbody",
        "MeshFilter",
        "Animator"
      ],
      "answer": 1,
      "explanation": "Attaching a Rigidbody component brings the GameObject under the control of the PhysX physics engine.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Prefab in Unity?",
      "options": [
        "A pre-rendered cutscene",
        "A reusable, pre-configured asset template that can be instantiated multiple times across scenes while sharing properties",
        "A 3D modeling tool",
        "A sound effect file"
      ],
      "answer": 1,
      "explanation": "Prefabs act as asset templates; modifying the master prefab propagates updates across all instantiated clones.",
      "difficulty": "Beginner"
    },
    {
      "q": "What happens when you check the 'Is Trigger' property on a 3D Collider in Unity?",
      "options": [
        "The collider explodes",
        "The collider stops physical solid collisions and allows objects to pass through, firing OnTriggerEnter events instead of OnCollisionEnter",
        "The object becomes invisible",
        "Gravity is doubled"
      ],
      "answer": 1,
      "explanation": "Trigger colliders disable solid physical repulsion while detecting overlap events via OnTriggerEnter/Exit callbacks.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Raycasting in Unity game development?",
      "options": [
        "Sending network packets",
        "Projecting an invisible mathematical ray from a point in a given direction to detect intersections with colliders in the scene",
        "Drawing rays of light",
        "Audio raytracing"
      ],
      "answer": 1,
      "explanation": "Physics.Raycast casts a ray through the 3D world to detect object hits, line-of-sight, and mouse clicks.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the difference between Perspective and Orthographic camera projections in Unity?",
      "options": [
        "Perspective mimics human vision where distant objects appear smaller; Orthographic projects parallel rays with no depth foreshortening (used in 2D and isometric games)",
        "Orthographic is faster than perspective",
        "Perspective only works in 2D",
        "They are identical"
      ],
      "answer": 0,
      "explanation": "Perspective camera scales with distance; orthographic maintains uniform parallel sizing regardless of distance.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which Unity C# lifecycle method executes FIRST when a script instance is initialized, even before Start()?",
      "options": [
        "Awake()",
        "Start()",
        "Update()",
        "OnEnable()"
      ],
      "answer": 0,
      "explanation": "Awake() is called first when the scene loads to initialize variables before any Start() methods fire.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How do you access another component (e.g. Rigidbody) attached to the same GameObject in a Unity C# script?",
      "options": [
        "GetComponent<Rigidbody>()",
        "FindObject<Rigidbody>()",
        "this.Rigidbody",
        "new Rigidbody()"
      ],
      "answer": 0,
      "explanation": "GetComponent<T>() queries the GameObject's component list and returns the reference of matching type.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Time.deltaTime in Unity C# scripting, and why is it used?",
      "options": [
        "The current clock time",
        "The time elapsed in seconds since the previous rendered frame, used to make movement frame-rate independent (e.g. speed * Time.deltaTime)",
        "The game frame rate",
        "A countdown timer"
      ],
      "answer": 1,
      "explanation": "Multiplying speeds by Time.deltaTime ensures consistent physical movement speed across variable frame rates.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a NavMesh (Navigation Mesh) in Unity?",
      "options": [
        "A 3D water texture",
        "A geometric representation of walkable surfaces in the scene used for AI pathfinding and navigation",
        "A network multiplayer grid",
        "A collision wireframe"
      ],
      "answer": 1,
      "explanation": "NavMesh defines walkable surfaces, allowing NavMeshAgent components to calculate paths and avoid obstacles.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which shader type calculates lighting across standard realistic materials using metallic and smoothness maps in Unity?",
      "options": [
        "Unlit Shader",
        "Standard PBR (Physically Based Rendering) Shader",
        "Toon Shader",
        "Wireframe Shader"
      ],
      "answer": 1,
      "explanation": "Standard PBR shaders accurately simulate real-world material physics using albedo, metallic, roughness, and normal maps.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the purpose of the Asset Store in Unity?",
      "options": [
        "A place to buy physical merchandise",
        "An online marketplace where developers can download and purchase 3D models, textures, audio, tools, and code plugins",
        "A local folder on disk",
        "A database of textures"
      ],
      "answer": 1,
      "explanation": "The Unity Asset Store provides thousands of community and official tools, models, and scripts for developers.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the Tag system in Unity do?",
      "options": [
        "Styles GameObjects with CSS",
        "Assigns word markers (e.g. 'Player', 'Enemy') to GameObjects to identify and categorize them quickly in code via CompareTag()",
        "Compresses assets",
        "Renames scenes"
      ],
      "answer": 1,
      "explanation": "Tags serve as identification labels for querying or filtering GameObjects (e.g., if (col.CompareTag('Enemy'))).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the Layer system in Unity used for?",
      "options": [
        "Sorting UI layers",
        "Filtering GameObjects for selective camera rendering, raycast masking, and collision matrix separation",
        "Applying multiple textures",
        "Saving game states"
      ],
      "answer": 1,
      "explanation": "Layers (0-31) classify objects for camera culling masks, raycast layers, and physics collision matrix rules.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does Instantiate() do in Unity scripting?",
      "options": [
        "Clones an existing GameObject or Prefab and places it into the active scene at a specified position and rotation",
        "Deletes an object",
        "Compiles C# scripts",
        "Renders a camera"
      ],
      "answer": 0,
      "explanation": "Instantiate(prefab, position, rotation) spawns a dynamic runtime instance of a GameObject/Prefab.",
      "difficulty": "Beginner"
    },
    {
      "q": "What method permanently destroys a GameObject or component at runtime in Unity?",
      "options": [
        "Destroy(gameObject);",
        "Delete(gameObject);",
        "Remove(gameObject);",
        "Kill(gameObject);"
      ],
      "answer": 0,
      "explanation": "Destroy(obj) unregisters and deallocates the specified GameObject or component.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the difference between Local Space and World Space coordinates in Unity?",
      "options": [
        "World Space is relative to the absolute origin (0,0,0) of the scene; Local Space is relative to the GameObject's parent Transform",
        "Local space is 2D; world space is 3D",
        "They are identical",
        "Local space is in inches"
      ],
      "answer": 0,
      "explanation": "World coordinates specify global position; local coordinates define offsets relative to parent objects.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Animator Controller in Unity?",
      "options": [
        "A hardware gamepad",
        "A visual state machine asset that manages transitions between different animation clips based on parameter conditions (e.g., speed, isJumping)",
        "A video editor",
        "A script that moves cameras"
      ],
      "answer": 1,
      "explanation": "The Animator Controller uses a hierarchical state machine to blend and transition between character animations.",
      "difficulty": "Intermediate"
    }
  ],
  "linux-u1": [
    {
      "q": "According to the Linux Filesystem Hierarchy Standard (FHS), which directory holds machine-local configuration files?",
      "options": [
        "/bin",
        "/etc",
        "/var",
        "/usr"
      ],
      "answer": 1,
      "explanation": "/etc contains host-specific system-wide configuration files (e.g. /etc/fstab, /etc/passwd).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the key difference between a Hard Link and a Soft (Symbolic) Link in Linux?",
      "options": [
        "Hard links point directly to the inode of the file data and share the same inode number; soft links point to the file path by name",
        "Soft links cannot be deleted",
        "Hard links work across different filesystems",
        "Soft links take more RAM"
      ],
      "answer": 0,
      "explanation": "Hard links share the same underlying inode number on the filesystem; soft links store a path pointer to another file.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which command lists all files including hidden files (files beginning with a dot '.') with detailed permissions and sizes?",
      "options": [
        "ls -l",
        "ls -a",
        "ls -la (or ls -al)",
        "dir -all"
      ],
      "answer": 2,
      "explanation": "Combining -a (all including hidden) and -l (long listing with permissions and timestamps) displays full file metadata.",
      "difficulty": "Beginner"
    },
    {
      "q": "What happens to the target data when the original file of a Symbolic Link is deleted?",
      "options": [
        "The data is retained in the link",
        "The symbolic link becomes a broken (dangling) link pointing to a non-existent target",
        "The link is deleted automatically",
        "The kernel restores the file"
      ],
      "answer": 1,
      "explanation": "Because soft links reference files by name/path, deleting the target breaks the pointer.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which command displays the last 15 lines of a system log file and continuously monitors it for newly appended lines in real time?",
      "options": [
        "tail -n 15 -f /var/log/syslog",
        "head -15 /var/log/syslog",
        "cat /var/log/syslog",
        "less /var/log/syslog"
      ],
      "answer": 0,
      "explanation": "tail -n 15 -f outputs the trailing 15 lines and the -f (follow) flag streams live log appends.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which directory contains dynamic, variable data files such as system logs, spool directories, and temporary mailboxes?",
      "options": [
        "/var",
        "/tmp",
        "/dev",
        "/opt"
      ],
      "answer": 0,
      "explanation": "/var is designated for variable data that changes continuously during system operation (e.g. /var/log, /var/spool).",
      "difficulty": "Beginner"
    },
    {
      "q": "Which Linux command searches for files in a directory hierarchy based on criteria like name, size, or modification time?",
      "options": [
        "search",
        "find",
        "grep",
        "which"
      ],
      "answer": 1,
      "explanation": "The find command navigates the filesystem tree to locate files matching specific flags (e.g. find / -name '*.conf').",
      "difficulty": "Beginner"
    },
    {
      "q": "How does the 'grep' command differ from the 'find' command?",
      "options": [
        "find searches for file paths and names in the directory tree; grep searches for text patterns inside file contents",
        "grep searches files by size",
        "find edits files",
        "grep is for images only"
      ],
      "answer": 0,
      "explanation": "find locates files on the filesystem; grep searches inside files for lines matching regular expressions.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the directory '/dev' contain in Linux?",
      "options": [
        "Developer scripts",
        "Special device files representing hardware peripherals, storage disks, and virtual devices (e.g. /dev/sda, /dev/null)",
        "Temporary compile binaries",
        "C++ headers"
      ],
      "answer": 1,
      "explanation": "Linux follows the 'everything is a file' philosophy; hardware devices are represented as nodes in /dev.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is '/dev/null' commonly called in Unix/Linux?",
      "options": [
        "The default printer",
        "The null device or 'black hole' that discards all data written to it and returns EOF on reads",
        "A hardware tester",
        "A backup partition"
      ],
      "answer": 1,
      "explanation": "/dev/null discards unwanted output (e.g. command > /dev/null 2>&1).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'cp -r' command flag do?",
      "options": [
        "Replaces files without asking",
        "Recursively copies directories and all their nested contents",
        "Renames files",
        "Removes files"
      ],
      "answer": 1,
      "explanation": "The -r or -R flag instructs cp to copy directories recursively including all subdirectories and files.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which command shows the full absolute path of the current working directory?",
      "options": [
        "whoami",
        "pwd (print working directory)",
        "cd",
        "whereami"
      ],
      "answer": 1,
      "explanation": "pwd prints the current working directory path to stdout.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'touch' command do if the specified file does not exist?",
      "options": [
        "Displays an error",
        "Creates a new empty file with zero bytes",
        "Opens a text editor",
        "Searches the web"
      ],
      "answer": 1,
      "explanation": "touch creates a new empty file if it doesn't exist, or updates access and modification timestamps if it does.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is an Inode (index node) in a Linux filesystem?",
      "options": [
        "A user password",
        "A data structure that stores all metadata about a file (permissions, size, owner, block pointers) except its filename",
        "The filename string",
        "The USB port"
      ],
      "answer": 1,
      "explanation": "An inode contains all file metadata and disk block pointers; filenames are mapped to inodes inside directory files.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Can a Hard Link point to a directory in standard Linux filesystems?",
      "options": [
        "Yes, anytime",
        "No, standard Linux filesystems prohibit hard links to directories to prevent infinite circular filesystem loops",
        "Only if root",
        "Only on ext2"
      ],
      "answer": 1,
      "explanation": "To prevent directory tree corruption and infinite traversal loops, hard links to directories are disallowed.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which directory contains virtual pseudo-files exposing real-time kernel data structures and hardware status (e.g. /proc/cpuinfo, /proc/meminfo)?",
      "options": [
        "/proc",
        "/sys",
        "/kernel",
        "/boot"
      ],
      "answer": 0,
      "explanation": "/proc is a virtual filesystem (procfs) generated dynamically in RAM by the kernel exposing process and system state.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the 'rm -rf' command do?",
      "options": [
        "Renames a folder",
        "Forcibly and recursively removes files and directories without prompting for confirmation",
        "Reboots the system",
        "Reads files"
      ],
      "answer": 1,
      "explanation": "rm -r recursively traverses subdirectories and -f forces deletion without confirmation prompts.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which command displays the first 10 lines of a text file by default?",
      "options": [
        "top",
        "head",
        "lead",
        "start"
      ],
      "answer": 1,
      "explanation": "head prints the first 10 lines of a file by default (customizable via -n).",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the difference between 'less' and 'more' pagers?",
      "options": [
        "'less' allows backward navigation as well as forward scrolling through files, whereas 'more' only allows forward scrolling",
        "'more' is faster",
        "'less' cannot view text",
        "'less' edits files"
      ],
      "answer": 0,
      "explanation": "'less' (hence 'less is more') supports bi-directional scrolling, search navigation, and doesn't preload huge files.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which directory holds essential boot loader files, the Linux kernel image (vmlinuz), and initial RAM disks (initrd)?",
      "options": [
        "/root",
        "/boot",
        "/bin",
        "/kernel"
      ],
      "answer": 1,
      "explanation": "/boot contains the GRUB configuration, Linux kernel binaries, and initramfs necessary to boot the system.",
      "difficulty": "Beginner"
    }
  ],
  "linux-u2": [
    {
      "q": "What does the Shebang line (#!/bin/bash) at the very top of a script specify?",
      "options": [
        "A comment for developers",
        "The interpreter path used by the operating system to execute the script",
        "A compiler instruction",
        "A variable declaration"
      ],
      "answer": 1,
      "explanation": "The shebang (#!) informs the kernel program loader which binary interpreter to spawn to execute the script.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which file descriptor number corresponds to Standard Error (stderr) in Linux?",
      "options": [
        "0 (stdin)",
        "1 (stdout)",
        "2 (stderr)",
        "3"
      ],
      "answer": 2,
      "explanation": "Standard POSIX file descriptors are: 0 = stdin, 1 = stdout, 2 = stderr.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the redirection operator '>>' do compared to '>'?",
      "options": [
        "'>' appends to a file; '>>' overwrites the file",
        "'>' overwrites or creates the file; '>>' appends new output to the end of the file without erasing existing contents",
        "They do the exact same thing",
        "'>>' redirects to printer"
      ],
      "answer": 1,
      "explanation": "'>' truncates and overwrites destination files, whereas '>>' appends data to the end.",
      "difficulty": "Beginner"
    },
    {
      "q": "How do you redirect BOTH stdout and stderr to a file named 'output.log'?",
      "options": [
        "command > output.log 2>&1 (or command &> output.log)",
        "command >> 2 output.log",
        "command 1+2> output.log",
        "command | output.log"
      ],
      "answer": 0,
      "explanation": "command > output.log 2>&1 redirects stdout to the file, and points stderr (2) to stdout's descriptor (1).",
      "difficulty": "Intermediate"
    },
    {
      "q": "What special variable holds the exit status of the most recently executed command in BASH?",
      "options": [
        "$$",
        "$#",
        "$?",
        "$@"
      ],
      "answer": 2,
      "explanation": "$? holds the exit code of the last command (0 indicates success; non-zero indicates an error).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the Pipe operator (|) do in BASH?",
      "options": [
        "Combines two files",
        "Directs the standard output (stdout) of the preceding command as standard input (stdin) to the succeeding command",
        "Runs commands in parallel",
        "Separates variables"
      ],
      "answer": 1,
      "explanation": "Pipes create a unidirectional data flow connecting one program's stdout to the next program's stdin.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which command reads from standard input and simultaneously writes both to standard output and to one or more files?",
      "options": [
        "tee",
        "split",
        "pipe",
        "echo"
      ],
      "answer": 0,
      "explanation": "The tee command splits an I/O pipeline like a T-junction, displaying output while saving to disk.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In a BASH script, what does the special variable '$#' represent?",
      "options": [
        "The PID of the script",
        "The total count of positional command-line arguments passed to the script",
        "All arguments as a string",
        "The script filename"
      ],
      "answer": 1,
      "explanation": "$# expands to the number of positional parameters supplied by the caller.",
      "difficulty": "Beginner"
    },
    {
      "q": "In a BASH script, what does '$0' contain?",
      "options": [
        "The first parameter passed to the script",
        "The filename / name of the script itself",
        "The exit code",
        "The user's home directory"
      ],
      "answer": 1,
      "explanation": "$0 contains the name of the script executable as invoked from the shell.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'export' command do in BASH?",
      "options": [
        "Sends files over FTP",
        "Marks an environment variable to be exported to all child subshells and spawned processes",
        "Encrypts variables",
        "Deletes variables"
      ],
      "answer": 1,
      "explanation": "export ensures child processes inherit the specified environment variable.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What syntax performs Command Substitution in modern BASH scripts?",
      "options": [
        "$(command) or `command`",
        "${command}",
        "$command",
        "((command))"
      ],
      "answer": 0,
      "explanation": "$(command) executes the subshell command and replaces the construct with its stdout text.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the difference between single quotes ('...') and double quotes (\"...\") in BASH?",
      "options": [
        "Double quotes expand variables ($var) and command substitutions; single quotes preserve the literal string value of all characters",
        "Single quotes expand variables",
        "They are identical in BASH",
        "Single quotes are for numbers"
      ],
      "answer": 0,
      "explanation": "Single quotes enforce strict literal string preservation; double quotes permit variable and command expansion.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the test expression '[ -f /path/to/file ]' evaluate?",
      "options": [
        "Checks if the file is full",
        "Returns true if the path exists and is a regular file",
        "Returns true if directory",
        "Deletes the file"
      ],
      "answer": 1,
      "explanation": "-f tests whether a path exists and is a regular file (as opposed to a directory or device).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does '[ -d /path/to/dir ]' test?",
      "options": [
        "Returns true if the target exists and is a directory",
        "Tests if disk is full",
        "Deletes directory",
        "Lists directory"
      ],
      "answer": 0,
      "explanation": "-d evaluates to true if the file exists and is a directory.",
      "difficulty": "Beginner"
    },
    {
      "q": "How do you perform integer arithmetic inside a BASH script natively?",
      "options": [
        "result=$(( 5 + 3 ))",
        "result=5 + 3",
        "calc 5 + 3",
        "result = [5 + 3]"
      ],
      "answer": 0,
      "explanation": "$(( expression )) performs arithmetic expansion in BASH using integer math.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of the 'chmod +x script.sh' command?",
      "options": [
        "Compiles the script",
        "Adds execute permissions to script.sh, allowing it to be run directly as a program",
        "Encrypts script",
        "Edits script"
      ],
      "answer": 1,
      "explanation": "+x grants execution rights to the file.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the command 'source ~/.bashrc' (or '. ~/.bashrc') do?",
      "options": [
        "Deletes the file",
        "Executes the script in the current active shell environment rather than spawning a subshell, applying environment updates immediately",
        "Opens it in nano",
        "Backs up the file"
      ],
      "answer": 1,
      "explanation": "source executes commands in the current shell context so variable exports take effect immediately.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the purpose of the PATH environment variable in Linux?",
      "options": [
        "Shows file sizes",
        "A colon-separated list of directories searched by the shell to find executable programs when a command is typed",
        "Stores user passwords",
        "Specifies network routing"
      ],
      "answer": 1,
      "explanation": "When you run a command like 'ls', the shell scans directories listed in $PATH in order to locate the binary.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the conditional operator '&&' do between two shell commands (e.g. cmd1 && cmd2)?",
      "options": [
        "Runs both in background",
        "Executes cmd2 ONLY IF cmd1 completes successfully (exit code 0)",
        "Runs both regardless of failure",
        "Pipes cmd1 into cmd2"
      ],
      "answer": 1,
      "explanation": "&& provides logical short-circuiting: cmd2 executes only if cmd1 returns exit status 0 (success).",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the conditional operator '||' do between two shell commands (e.g. cmd1 || cmd2)?",
      "options": [
        "Runs cmd2 ONLY IF cmd1 fails (returns non-zero exit code)",
        "Runs both commands",
        "Pipes output",
        "Halts the system"
      ],
      "answer": 0,
      "explanation": "|| executes the second command only as a fallback if the first command encounters an error.",
      "difficulty": "Beginner"
    }
  ],
  "linux-u3": [
    {
      "q": "What Process ID (PID) is assigned to the root ancestor systemd / init process in Linux?",
      "options": [
        "PID 0",
        "PID 1",
        "PID 100",
        "PID -1"
      ],
      "answer": 1,
      "explanation": "PID 1 is the first userspace process spawned by the Linux kernel, acting as the parent of all processes.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which Linux signal forcibly and immediately terminates a process without allowing it to catch the signal or clean up resources?",
      "options": [
        "SIGTERM (15)",
        "SIGINT (2)",
        "SIGKILL (9)",
        "SIGHUP (1)"
      ],
      "answer": 2,
      "explanation": "SIGKILL (signal 9) cannot be caught, blocked, or ignored by the target process, terminating it immediately at kernel level.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which signal is sent when a user presses Ctrl + C in an interactive terminal session?",
      "options": [
        "SIGKILL (9)",
        "SIGINT (2)",
        "SIGSTOP (19)",
        "SIGQUIT (3)"
      ],
      "answer": 1,
      "explanation": "Ctrl + C generates SIGINT (Interrupt), requesting the foreground process to terminate gracefully.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the signal SIGHUP (Signal 1) typically instruct system daemon services (like Nginx or Apache) to do?",
      "options": [
        "Crash immediately",
        "Reload their configuration files dynamically without terminating active client connections",
        "Reboot the machine",
        "Purge all log files"
      ],
      "answer": 1,
      "explanation": "Many Linux daemons intercept SIGHUP to reload altered configuration files seamlessly without a full restart.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which systemd command enables a service to start automatically during system boot?",
      "options": [
        "systemctl start service_name",
        "systemctl enable service_name",
        "systemctl boot service_name",
        "systemctl auto service_name"
      ],
      "answer": 1,
      "explanation": "systemctl enable creates symbolic links in /etc/systemd/system to register the unit for boot activation.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is a Zombie Process (defunct) in Linux?",
      "options": [
        "A malicious rootkit virus",
        "A process that has finished execution but remains in the process table because its parent has not yet read its exit status via wait()",
        "A background service",
        "A crashed kernel"
      ],
      "answer": 1,
      "explanation": "Zombies have released their memory and resources, but retain their process table slot until the parent reads wait().",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is an Orphan Process in Linux?",
      "options": [
        "A process whose parent process terminated before it did, which is then adopted by init / systemd (PID 1)",
        "A process with no PID",
        "A process that cannot write files",
        "A crashed process"
      ],
      "answer": 0,
      "explanation": "Orphans have their parent exit prematurely; the kernel automatically re-parents them to systemd (PID 1).",
      "difficulty": "Intermediate"
    },
    {
      "q": "How do you run a long-running shell command in the background immediately from the terminal?",
      "options": [
        "Append an ampersand '&' at the end of the command (e.g. ./job.sh &)",
        "Prepend 'bg'",
        "Press Ctrl + X",
        "Add 'async'"
      ],
      "answer": 0,
      "explanation": "Appending '&' spawns the command asynchronously in the background, immediately returning control to the shell prompt.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which keystroke suspends an active foreground process and sends it the SIGTSTP signal?",
      "options": [
        "Ctrl + C",
        "Ctrl + Z",
        "Ctrl + D",
        "Ctrl + \\"
      ],
      "answer": 1,
      "explanation": "Ctrl + Z pauses the active foreground job, sending SIGTSTP and placing it in suspended background state.",
      "difficulty": "Beginner"
    },
    {
      "q": "How many fields are in a standard cron schedule expression in Linux crontab?",
      "options": [
        "3 fields",
        "5 fields (minute, hour, day-of-month, month, day-of-week)",
        "6 fields",
        "7 fields"
      ],
      "answer": 1,
      "explanation": "Standard crontab format uses 5 time/date fields: minute (0-59), hour (0-23), day (1-31), month (1-12), weekday (0-6).",
      "difficulty": "Beginner"
    },
    {
      "q": "What crontab schedule expression runs a backup script every day at 2:30 AM?",
      "options": [
        "30 2 * * * /backup.sh",
        "2 30 * * * /backup.sh",
        "* 2 30 * * /backup.sh",
        "30 2 1 * * /backup.sh"
      ],
      "answer": 0,
      "explanation": "Field order is: Minute (30) Hour (2) Day (*) Month (*) Weekday (*) -> 30 2 * * *.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which command queries and displays centralized systemd system and service logs?",
      "options": [
        "syslog",
        "journalctl",
        "dmesg",
        "logcat"
      ],
      "answer": 1,
      "explanation": "journalctl queries systemd's journald logging daemon, supporting filters by unit, time, and priority.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'top' (or 'htop') command display?",
      "options": [
        "Disk partition sizes",
        "Real-time dynamic view of active system processes, CPU consumption, memory usage, and load averages",
        "List of installed packages",
        "Network cables"
      ],
      "answer": 1,
      "explanation": "top and htop provide interactive monitoring of running processes and system resource utilization.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does 'Load Average: 2.50, 1.80, 1.20' in uptime/top represent?",
      "options": [
        "RAM usage in GB",
        "The average number of runnable and uninterruptible processes over the past 1, 5, and 15 minutes",
        "Network speed in Mbps",
        "Temperature of CPU cores"
      ],
      "answer": 1,
      "explanation": "Load averages represent the average CPU and I/O run-queue backlog over 1, 5, and 15-minute windows.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Niceness value range of a Linux process, and what does it influence?",
      "options": [
        "From -20 (highest CPU priority) to +19 (lowest CPU priority / nicest to others)",
        "0 to 100",
        "1 to 5",
        "Always positive"
      ],
      "answer": 0,
      "explanation": "Nice values range from -20 to 19; lower values give higher scheduling priority to the CPU.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which command changes the scheduling priority of an ALREADY RUNNING process with a known PID?",
      "options": [
        "nice",
        "renice -n <value> -p <PID>",
        "chpri",
        "setpriority"
      ],
      "answer": 1,
      "explanation": "nice launches new programs with altered priority; renice modifies the priority of existing running processes.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the 'at' command used for in Linux?",
      "options": [
        "Running recurring tasks",
        "Executing a one-time command or script at a designated future time",
        "Finding files",
        "Sending emails"
      ],
      "answer": 1,
      "explanation": "The at daemon (atd) schedules non-recurring tasks to execute once at a specified date and time.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which command kills all processes matching a given process name rather than needing a PID?",
      "options": [
        "killall process_name (or pkill)",
        "rm process_name",
        "halt process_name",
        "stop process_name"
      ],
      "answer": 0,
      "explanation": "killall and pkill match process names or patterns and send signals without looking up individual PIDs.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'ps aux' command flag combination show?",
      "options": [
        "Only root processes",
        "Every running process on the system (a: all users, u: user-oriented format with CPU/MEM, x: processes without a controlling tty)",
        "Only audio processes",
        "Network ports"
      ],
      "answer": 1,
      "explanation": "ps aux displays a comprehensive BSD-style snapshot of all active processes across all users.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which command displays kernel ring buffer messages and boot diagnostics?",
      "options": [
        "journalctl -k (or dmesg)",
        "kernel_log",
        "kmsg",
        "bootlog"
      ],
      "answer": 0,
      "explanation": "dmesg (and journalctl -k) prints hardware initialization and driver messages recorded in the kernel ring buffer.",
      "difficulty": "Intermediate"
    }
  ],
  "linux-u4": [
    {
      "q": "What is the maximum disk size supported by a legacy Master Boot Record (MBR) partition table?",
      "options": [
        "512 GB",
        "2 TB (Tebibytes)",
        "4 TB",
        "16 TB"
      ],
      "answer": 1,
      "explanation": "MBR uses 32-bit sector addressing with 512-byte sectors, limiting maximum addressable disk capacity to 2TB.",
      "difficulty": "Intermediate"
    },
    {
      "q": "How many primary partitions can an MBR partition table support directly?",
      "options": [
        "2",
        "4 primary partitions (or 3 primary + 1 extended partition)",
        "8",
        "128"
      ],
      "answer": 1,
      "explanation": "The MBR partition table allocates 64 bytes for partition records, accommodating at most 4 primary partitions.",
      "difficulty": "Beginner"
    },
    {
      "q": "What modern partitioning scheme replaces MBR, supporting disks larger than 2TB and up to 128 primary partitions?",
      "options": [
        "GPT (GUID Partition Table)",
        "NTFS",
        "FAT32",
        "LVM"
      ],
      "answer": 0,
      "explanation": "GPT is part of the UEFI standard, using 64-bit logical block addressing to support disks up to 9.4 ZB.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which Linux utility displays block storage devices and partitions in a tree-like hierarchy?",
      "options": [
        "lsblk",
        "fdisk -l",
        "blkid",
        "df"
      ],
      "answer": 0,
      "explanation": "lsblk reads sysfs to list all storage block devices, sizes, mount points, and partition trees clearly.",
      "difficulty": "Beginner"
    },
    {
      "q": "What command creates an ext4 filesystem on partition /dev/sdb1?",
      "options": [
        "format /dev/sdb1",
        "mkfs.ext4 /dev/sdb1",
        "ext4-create /dev/sdb1",
        "fsck /dev/sdb1"
      ],
      "answer": 1,
      "explanation": "mkfs.ext4 (make filesystem) formats the block partition with the ext4 filesystem structure.",
      "difficulty": "Beginner"
    },
    {
      "q": "What configuration file contains persistent filesystem mount definitions loaded automatically during system boot?",
      "options": [
        "/etc/mount.conf",
        "/etc/fstab",
        "/etc/filesystems",
        "/boot/grub.cfg"
      ],
      "answer": 1,
      "explanation": "/etc/fstab (file system table) defines partitions, mount points, filesystem types, and mount options.",
      "difficulty": "Beginner"
    },
    {
      "q": "Why is it best practice to use UUIDs (Universally Unique Identifiers) in /etc/fstab instead of device node names like /dev/sdb1?",
      "options": [
        "UUIDs make reads faster",
        "Device names (like /dev/sdb) can change unpredictably across reboots if drive order changes; UUIDs remain constant",
        "UUIDs encrypt the disk",
        "Kernel requires UUIDs"
      ],
      "answer": 1,
      "explanation": "UUIDs identify storage volumes uniquely, preventing incorrect mounts if disks are reordered or detected differently.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the purpose of Logical Volume Management (LVM) in Linux?",
      "options": [
        "To format USB drives",
        "To create flexible virtual storage volumes that can span multiple physical disks and be resized on the fly without unmounting",
        "To encrypt passwords",
        "To accelerate graphics"
      ],
      "answer": 1,
      "explanation": "LVM abstracts physical storage into Physical Volumes, Volume Groups, and Logical Volumes for flexible dynamic resizing.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In LVM architecture, what is the correct hierarchy from raw storage to usable mountable volume?",
      "options": [
        "Physical Volumes (PV) -> Volume Group (VG) -> Logical Volumes (LV)",
        "Logical Volume -> Volume Group -> Physical Volume",
        "Volume Group -> Physical Volume -> Logical Volume",
        "Hard Drive -> File -> Volume"
      ],
      "answer": 0,
      "explanation": "Raw disks become Physical Volumes (PVs), combined into a Volume Group (VG) pool, sliced into Logical Volumes (LVs).",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which command checks and displays disk space usage of mounted filesystems in human-readable units (GB, MB)?",
      "options": [
        "du -sh",
        "df -h",
        "free -m",
        "lsblk"
      ],
      "answer": 1,
      "explanation": "df -h (disk free human-readable) summarizes filesystem space, used capacity, and available mount space.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'du -sh /var' command accomplish?",
      "options": [
        "Formats /var",
        "Displays the summary (s) disk space used by the /var directory in human-readable (h) units",
        "Deletes /var files",
        "Scans for viruses"
      ],
      "answer": 1,
      "explanation": "du (disk usage) with -s (summary total) and -h (human-readable) tallies total disk consumption of a directory.",
      "difficulty": "Beginner"
    },
    {
      "q": "What command is used to attach a storage partition /dev/sdb1 to an existing directory /mnt/data?",
      "options": [
        "attach /dev/sdb1 /mnt/data",
        "mount /dev/sdb1 /mnt/data",
        "link /dev/sdb1 /mnt/data",
        "bind /dev/sdb1 /mnt/data"
      ],
      "answer": 1,
      "explanation": "mount <device> <directory> attaches the storage filesystem into the unified Linux directory hierarchy.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is Swap Space in Linux memory management?",
      "options": [
        "Temporary RAM buffer",
        "Dedicated disk space used as virtual memory when physical RAM becomes exhausted",
        "CPU L1 cache",
        "Hard drive cache"
      ],
      "answer": 1,
      "explanation": "Swap provides paging overflow on disk when RAM is constrained, moving inactive memory pages out.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which command initializes a partition as Linux swap area?",
      "options": [
        "mkswap /dev/sdb2",
        "swapon /dev/sdb2",
        "mkfs.swap /dev/sdb2",
        "swapinit /dev/sdb2"
      ],
      "answer": 0,
      "explanation": "mkswap formats a designated partition or file with swap header structures.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'fsck' (File System Consistency Check) utility do?",
      "options": [
        "Overclocks the hard drive",
        "Inspects and repairs filesystem metadata corruption and damaged disk blocks",
        "Defragments files",
        "Encrypts volumes"
      ],
      "answer": 1,
      "explanation": "fsck scans filesystems for structural inconsistencies, broken directory chains, and repairs corrupted blocks.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which command displays the UUID and filesystem type of all storage partitions on the system?",
      "options": [
        "blkid",
        "id",
        "fdisk",
        "mount"
      ],
      "answer": 0,
      "explanation": "blkid locates and prints block device attributes, including UUIDs, PARTUUIDs, and filesystem labels.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'umount /mnt/data' command do, and what error occurs if a process has an open file in that directory?",
      "options": [
        "Unmounts the filesystem; fails with 'target is busy' if a terminal or process is currently active inside the directory",
        "Deletes all files",
        "Formats the drive",
        "Unplugs the power"
      ],
      "answer": 0,
      "explanation": "umount detaches the filesystem; if any process holds an open file handle, kernel blocks unmounting ('device busy').",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which partitioning tool is best suited for interactive GPT partitioning on modern UEFI systems?",
      "options": [
        "gdisk (or parted)",
        "old fdisk",
        "dosfs",
        "mkfs"
      ],
      "answer": 0,
      "explanation": "gdisk is tailored specifically for GPT disks, supporting GUID partition tables natively.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the purpose of the 'noatime' mount option in /etc/fstab?",
      "options": [
        "Disables clock syncing",
        "Prevents writing updated access timestamps every time a file is read, boosting disk read performance",
        "Enforces strict access time",
        "Logs read times"
      ],
      "answer": 1,
      "explanation": "noatime skips writing access times on reads, substantially reducing disk write wear and latency on SSDs.",
      "difficulty": "Advanced"
    },
    {
      "q": "What command grows an ext4 filesystem online to fill expanded LVM logical volume space?",
      "options": [
        "resize2fs /dev/vg0/lv_data",
        "growfs /dev/vg0/lv_data",
        "ext4-expand",
        "mkfs.ext4 -u"
      ],
      "answer": 0,
      "explanation": "resize2fs dynamically resizes ext2/ext3/ext4 filesystems to fill enlarged logical volumes online.",
      "difficulty": "Intermediate"
    }
  ],
  "linux-u5": [
    {
      "q": "In Linux file permissions (rwxr-xr--), what are the octal numeric values for Read (r), Write (w), and Execute (x)?",
      "options": [
        "r = 1, w = 2, x = 4",
        "r = 4, w = 2, x = 1",
        "r = 3, w = 2, x = 1",
        "r = 2, w = 4, x = 8"
      ],
      "answer": 1,
      "explanation": "Standard POSIX permission weights are: Read (r) = 4, Write (w) = 2, Execute (x) = 1.",
      "difficulty": "Beginner"
    },
    {
      "q": "What numeric permission code grants the Owner Full permissions (rwx), Group Read and Execute (r-x), and Others Read only (r--)?",
      "options": [
        "755",
        "754",
        "644",
        "777"
      ],
      "answer": 1,
      "explanation": "Owner: 4+2+1 = 7; Group: 4+0+1 = 5; Others: 4+0+0 = 4 -> 754.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which command changes the user and group ownership of a file named report.pdf to user 'kushal' and group 'staff'?",
      "options": [
        "chmod kushal:staff report.pdf",
        "chown kushal:staff report.pdf",
        "chgrp kushal report.pdf",
        "own kushal:staff report.pdf"
      ],
      "answer": 1,
      "explanation": "chown user:group filename updates both owner and group attributes.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the purpose of the SUID (Set User ID) special permission bit on an executable binary (e.g. /usr/bin/passwd)?",
      "options": [
        "Encrypts the binary",
        "Allows users running the executable to execute it with the permissions of the file owner (typically root) rather than the executing user",
        "Allows only root to run it",
        "Locks the executable"
      ],
      "answer": 1,
      "explanation": "SUID executes the binary with the file owner's privileges, enabling standard users to update /etc/shadow safely.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does the Sticky Bit permission on a shared directory (such as /tmp) enforce?",
      "options": [
        "Prevents anyone from writing files",
        "Allows any user to create files, but files can only be deleted or renamed by the file owner or root",
        "Deletes files after 1 hour",
        "Makes files hidden"
      ],
      "answer": 1,
      "explanation": "The sticky bit (octal 1000, chmod +t) prevents users from deleting each other's temporary files in public directories.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is the Umask (User File-Creation Mode Mask) in Linux?",
      "options": [
        "An antivirus filter",
        "A default octal mask subtracted from base permissions (666 for files, 777 for directories) when new files or directories are created",
        "A password hash",
        "A firewall rule"
      ],
      "answer": 1,
      "explanation": "Umask filters out specific permissions automatically upon file creation (e.g. umask 022 leaves 755/644).",
      "difficulty": "Intermediate"
    },
    {
      "q": "If default directory base permission is 777 and umask is 027, what will be the permissions of a newly created directory?",
      "options": [
        "750 (rwxr-x---)",
        "755",
        "720",
        "644"
      ],
      "answer": 0,
      "explanation": "777 minus 027 = 750 (Owner: rwx = 7, Group: r-x = 5, Others: --- = 0).",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which dedicated utility should ALWAYS be used to edit the /etc/sudoers file safely with syntax validation?",
      "options": [
        "nano",
        "visudo",
        "vim /etc/sudoers directly",
        "gedit"
      ],
      "answer": 1,
      "explanation": "visudo locks the file against concurrent edits and validates syntax before saving, preventing accidental system lockouts.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the SGID (Set Group ID) bit on a directory do?",
      "options": [
        "Encrypts group files",
        "Causes any new files created inside that directory to automatically inherit the group ownership of the directory rather than the primary group of the creating user",
        "Locks the directory",
        "Deletes group users"
      ],
      "answer": 1,
      "explanation": "SGID on directories ensures group collaboration by inheriting parent directory group ownership.",
      "difficulty": "Intermediate"
    },
    {
      "q": "In OpenSSH, where does a remote SSH server store the public keys of authorized client users for passwordless login?",
      "options": [
        "~/.ssh/id_rsa",
        "~/.ssh/authorized_keys",
        "/etc/ssh/ssh_config",
        "/etc/shadow"
      ],
      "answer": 1,
      "explanation": "Public keys added to ~/.ssh/authorized_keys allow corresponding private key holders to authenticate without passwords.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which file contains the private SSH key generated by ssh-keygen on the local client machine?",
      "options": [
        "id_rsa.pub",
        "id_rsa (never share this private key)",
        "known_hosts",
        "config"
      ],
      "answer": 1,
      "explanation": "id_rsa is the private secret key and must remain confidential on the client machine.",
      "difficulty": "Beginner"
    },
    {
      "q": "What configuration setting in /etc/ssh/sshd_config should be set to 'no' on production servers to prevent brute-force attacks against the root account?",
      "options": [
        "PermitRootLogin no",
        "AllowRoot false",
        "DisableRootAccess yes",
        "RootAuth 0"
      ],
      "answer": 0,
      "explanation": "PermitRootLogin no disallows direct SSH logins as root, requiring users to log in as normal accounts and sudo.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the 'sudo' command allow an authorized user to do?",
      "options": [
        "Bypass firewalls",
        "Execute an administrative command with the security privileges of the superuser (root) as specified in /etc/sudoers",
        "Switch permanently to root without logging",
        "Create SSH keys"
      ],
      "answer": 1,
      "explanation": "sudo (SuperUser DO) executes commands with elevated privileges while logging actions for auditing.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which command recursively changes permissions on all files and subdirectories in /var/www to 755?",
      "options": [
        "chmod 755 /var/www",
        "chmod -R 755 /var/www",
        "chown -R 755 /var/www",
        "chmod -a 755 /var/www"
      ],
      "answer": 1,
      "explanation": "The -R (recursive) flag applies permissions across all nested directory contents.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does a file permission string like '-rwsr-xr-x' indicate?",
      "options": [
        "The file is a directory",
        "The file has SUID enabled (indicated by 's' in the owner execute position)",
        "The file is corrupt",
        "The file is read-only"
      ],
      "answer": 1,
      "explanation": "The letter 's' in place of 'x' in the owner permissions indicates the SUID bit is set.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does 'chmod g+w filename' do using symbolic permission notation?",
      "options": [
        "Adds write permission for the Group",
        "Adds read permission for Owner",
        "Removes write permission",
        "Grants global write"
      ],
      "answer": 0,
      "explanation": "g+w targets group (g) and adds (+) write (w) permissions.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which file stores the actual encrypted password hashes and password expiration parameters for Linux users?",
      "options": [
        "/etc/passwd",
        "/etc/shadow",
        "/etc/group",
        "/etc/security"
      ],
      "answer": 1,
      "explanation": "/etc/shadow is readable only by root (permissions 000 or 640) and stores salt-hashed passwords.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is SELinux (Security-Enhanced Linux)?",
      "options": [
        "An antivirus tool",
        "A Mandatory Access Control (MAC) kernel architecture providing fine-grained security policies beyond standard Discretionary Access Control (DAC)",
        "A password manager",
        "A network firewall"
      ],
      "answer": 1,
      "explanation": "SELinux implements Mandatory Access Control, enforcing strict label-based policies on process capabilities.",
      "difficulty": "Advanced"
    },
    {
      "q": "What are the three operational modes of SELinux?",
      "options": [
        "Active, Passive, Disabled",
        "Enforcing, Permissive, Disabled",
        "Strict, Soft, Off",
        "Root, User, Guest"
      ],
      "answer": 1,
      "explanation": "Enforcing blocks unauthorized actions; Permissive logs violations without blocking; Disabled turns SELinux off.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which file records the host key fingerprints of remote servers you have previously connected to via SSH?",
      "options": [
        "~/.ssh/known_hosts",
        "~/.ssh/authorized_keys",
        "/etc/hosts",
        "~/.ssh/config"
      ],
      "answer": 0,
      "explanation": "known_hosts stores public keys of visited servers, alerting users if a server's key changes (potential MitM).",
      "difficulty": "Intermediate"
    }
  ],
  "linux-u6": [
    {
      "q": "Which command is used to create a new user account named 'student' in modern Linux systems?",
      "options": [
        "useradd -m student (or adduser student)",
        "newuser student",
        "createuser student",
        "mkuser student"
      ],
      "answer": 0,
      "explanation": "useradd -m creates the user and initializes their home directory (/home/student).",
      "difficulty": "Beginner"
    },
    {
      "q": "What information is stored in the 7 colon-separated fields of the '/etc/passwd' file?",
      "options": [
        "Username, Password flag (x), UID, GID, GECOS/Full Name, Home directory, Default login shell",
        "Passwords and credit cards",
        "File permissions only",
        "System boot parameters"
      ],
      "answer": 0,
      "explanation": "/etc/passwd stores: username:x:UID:GID:comment:home_directory:login_shell.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which command adds an existing user 'kushal' to an auxiliary supplementary group 'docker' without removing them from other groups?",
      "options": [
        "usermod -g docker kushal",
        "usermod -aG docker kushal",
        "useradd -G docker kushal",
        "groupadd kushal docker"
      ],
      "answer": 1,
      "explanation": "usermod with -a (append) and -G (supplementary group) adds the group without wiping other memberships.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What command locks a user account's password, preventing them from logging in?",
      "options": [
        "passwd -l username (or usermod -L username)",
        "passwd -d username",
        "userdel username",
        "lock username"
      ],
      "answer": 0,
      "explanation": "passwd -l prepends an exclamation mark '!' to the encrypted password string in /etc/shadow, disabling password auth.",
      "difficulty": "Beginner"
    },
    {
      "q": "What command is used to manage password aging and expiration policies (e.g. max days, warning days) for a Linux user?",
      "options": [
        "chage",
        "passwd -e",
        "expire",
        "usermod -p"
      ],
      "answer": 0,
      "explanation": "chage (change age) configures password validity periods, warning countdowns, and account expiration dates.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which command permanently deletes a user account AND removes their home directory and mail spool?",
      "options": [
        "userdel -r username",
        "userdel username",
        "rmuser username",
        "killuser username"
      ],
      "answer": 0,
      "explanation": "The -r flag instructs userdel to remove the user's home directory and mail spool.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the primary difference between a Docker Container and a traditional Virtual Machine (VM)?",
      "options": [
        "Containers run their own complete guest operating system kernel; VMs share the host kernel",
        "Containers share the host OS kernel and isolate user-space via Linux namespaces and cgroups, making them lightweight and fast; VMs virtualize entire hardware with guest OS kernels",
        "Containers are hardware chips",
        "VMs do not use RAM"
      ],
      "answer": 1,
      "explanation": "Containers package only application and dependencies on a shared host kernel, whereas VMs emulate full hardware and guest kernels.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which Linux kernel feature provides process resource isolation (CPU, memory, disk I/O limits) for Docker containers?",
      "options": [
        "Control Groups (cgroups)",
        "Namespaces",
        "SELinux",
        "Systemd"
      ],
      "answer": 0,
      "explanation": "cgroups meter and throttle hardware resource consumption (memory, CPU shares, block I/O) across container groups.",
      "difficulty": "Intermediate"
    },
    {
      "q": "Which Linux kernel feature provides process visibility isolation (isolated PIDs, mount points, network interfaces) for containers?",
      "options": [
        "Namespaces (PID, NET, MNT, IPC, UTS, USER)",
        "cgroups",
        "cron",
        "IPTables"
      ],
      "answer": 0,
      "explanation": "Namespaces partition system resources so a container perceives its own isolated process table, network stack, and mounts.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is a Dockerfile?",
      "options": [
        "A compressed zip archive",
        "A plain text script containing sequential commands and instructions to automatically build a Docker container image",
        "A database file",
        "A Linux kernel patch"
      ],
      "answer": 1,
      "explanation": "A Dockerfile contains instructions (FROM, RUN, COPY, EXPOSE, CMD) that assemble a container image layer by layer.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which Docker CLI command launches a new container in detached background mode (-d) with port forwarding from host 8080 to container 80?",
      "options": [
        "docker run -d -p 8080:80 nginx",
        "docker start -p 8080:80 nginx",
        "docker build -p 8080:80 nginx",
        "docker exec -d nginx"
      ],
      "answer": 0,
      "explanation": "docker run -d -p 8080:80 nginx fetches the image, maps port 8080 to container port 80, and runs in background.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the command to list all currently running Docker containers?",
      "options": [
        "docker list",
        "docker ps",
        "docker images",
        "docker status"
      ],
      "answer": 1,
      "explanation": "docker ps lists active running containers (docker ps -a lists all including stopped ones).",
      "difficulty": "Beginner"
    },
    {
      "q": "Which package management tool is standard on Debian and Ubuntu Linux distributions?",
      "options": [
        "apt (Advanced Package Tool) / dpkg",
        "dnf / rpm",
        "pacman",
        "yum"
      ],
      "answer": 0,
      "explanation": "Debian and Ubuntu use apt and dpkg for .deb package management.",
      "difficulty": "Beginner"
    },
    {
      "q": "Which package management tool is used on Red Hat Enterprise Linux, Fedora, and Rocky Linux?",
      "options": [
        "apt",
        "dnf / yum / rpm",
        "brew",
        "emerge"
      ],
      "answer": 1,
      "explanation": "RHEL derivatives utilize dnf (Dandified YUM) and rpm for .rpm package archives.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the difference between a Docker Image and a Docker Container?",
      "options": [
        "An Image is a read-only immutable blueprint/template; a Container is a live, running instance of an image with a writable layer",
        "They are identical terms",
        "Containers are stored in Docker Hub; images run on servers",
        "Images use more RAM"
      ],
      "answer": 0,
      "explanation": "Images are inert build templates; containers are dynamic runtime instantiations with a thin read/write layer.",
      "difficulty": "Beginner"
    },
    {
      "q": "What command creates a new group named 'developers'?",
      "options": [
        "groupadd developers",
        "addgroup developers",
        "newgroup developers",
        "mkgroup developers"
      ],
      "answer": 0,
      "explanation": "groupadd creates a new group definition entry in /etc/group.",
      "difficulty": "Beginner"
    },
    {
      "q": "What does the UID 0 always represent in any Linux operating system?",
      "options": [
        "A disabled guest account",
        "The root superuser account with unrestricted administrative access",
        "The system installer",
        "The default login shell"
      ],
      "answer": 1,
      "explanation": "In Linux, user ID 0 (UID 0) is hardcoded into the kernel as the root superuser.",
      "difficulty": "Beginner"
    },
    {
      "q": "What is the command to open an interactive BASH shell inside an already running Docker container named 'webserver'?",
      "options": [
        "docker exec -it webserver /bin/bash",
        "docker run -it webserver bash",
        "docker ssh webserver",
        "docker open webserver"
      ],
      "answer": 0,
      "explanation": "docker exec -it <container> /bin/bash attaches an interactive pseudo-TTY session inside the active container.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What is Docker Volume used for in containerized applications?",
      "options": [
        "Increasing audio volume",
        "Persisting data generated by and used by Docker containers outside the container's lifecycle on the host filesystem",
        "Virtual RAM",
        "Compressing files"
      ],
      "answer": 1,
      "explanation": "Volumes decouple data persistence from the container container lifecycle so data survives container deletion.",
      "difficulty": "Intermediate"
    },
    {
      "q": "What does 'docker stop container_id' do before terminating a container?",
      "options": [
        "Immediately cuts power",
        "Sends SIGTERM to allow graceful shutdown, waiting 10 seconds before falling back to SIGKILL",
        "Deletes container files",
        "Restarts the container"
      ],
      "answer": 1,
      "explanation": "docker stop sends SIGTERM to PID 1, allows grace period (default 10s), then issues SIGKILL if unresponsive.",
      "difficulty": "Intermediate"
    }
  ]
};

  // Expose to window for browser access
  if (typeof window !== "undefined") {
    window.YUKTARA_QUESTION_BANK = QUESTION_BANK;
  }
  if (typeof global !== "undefined") {
    global.YUKTARA_QUESTION_BANK = QUESTION_BANK;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = QUESTION_BANK;
  }

  // Augment SUBJECT_LIBRARY in browser
  function augmentSubjectLibrary() {
    const lib = (typeof SUBJECT_LIBRARY !== "undefined") ? SUBJECT_LIBRARY : (typeof window !== "undefined" ? window.SUBJECT_LIBRARY : null);
    if (!lib) return;

    for (const [subjKey, subjData] of Object.entries(lib)) {
      if (!subjData || !Array.isArray(subjData.topics)) continue;
      subjData.topics.forEach(topic => {
        if (QUESTION_BANK[topic.id] && Array.isArray(QUESTION_BANK[topic.id])) {
          topic.quiz = topic.quiz || {};
          topic.quiz.mcq = QUESTION_BANK[topic.id];
        }
      });
    }
    console.log("YUKTARA Question Bank successfully loaded: 20+ MCQs active per unit across all subjects.");
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", augmentSubjectLibrary);
    } else {
      augmentSubjectLibrary();
    }
  } else {
    augmentSubjectLibrary();
  }
})();
