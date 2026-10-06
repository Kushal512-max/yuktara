// scripts/data_dsa.js
// 20 MCQs per unit for Data Structures & Algorithms (Units 1 to 6)

module.exports = {
  "dsa-u1-intro": [
    {
      q: "Which asymptotic notation represents the tight asymptotic bound of an algorithm?",
      options: ["Big-O (O)", "Big-Omega (Ω)", "Big-Theta (Θ)", "Little-o (o)"],
      answer: 2,
      explanation: "Big-Theta (Θ) defines both upper and lower bounds simultaneously, indicating the exact tight growth rate.",
      difficulty: "Beginner"
    },
    {
      q: "What is the time complexity of the Fast Transpose algorithm for a sparse matrix with n non-zero elements and c columns?",
      options: ["O(n * c)", "O(c + n)", "O(n^2)", "O(log n)"],
      answer: 1,
      explanation: "Fast Transpose calculates column frequencies and starting positions in O(c) time and positions elements in O(n) time, yielding O(c + n).",
      difficulty: "Intermediate"
    },
    {
      q: "Which data structure is inherently non-linear?",
      options: ["Queue", "Binary Tree", "Doubly Linked List", "Circular Array"],
      answer: 1,
      explanation: "Binary Trees organize nodes hierarchically with parent-child relationships, making them non-linear.",
      difficulty: "Beginner"
    },
    {
      q: "What does Big-Omega (Ω) notation mathematically represent?",
      options: ["Asymptotic upper bound", "Asymptotic lower bound", "Average case runtime", "Space requirement"],
      answer: 1,
      explanation: "Big-Omega (Ω) defines an asymptotic lower bound on algorithm execution time for all sufficiently large inputs.",
      difficulty: "Beginner"
    },
    {
      q: "In a 3-tuple sparse matrix representation, what three attributes are stored for each non-zero cell?",
      options: ["Row index, Column index, Value", "Memory address, Value, Pointer", "Row index, Data type, Hash code", "Key, Left child, Right child"],
      answer: 0,
      explanation: "The 3-tuple format stores (Row, Column, Value) to represent sparse matrix elements efficiently.",
      difficulty: "Beginner"
    },
    {
      q: "Which algorithm design paradigm solves a problem by breaking it into non-overlapping subproblems, solving them recursively, and combining answers?",
      options: ["Greedy Method", "Divide and Conquer", "Dynamic Programming", "Backtracking"],
      answer: 1,
      explanation: "Divide and Conquer partitions problems into independent subproblems, as seen in Merge Sort and Binary Search.",
      difficulty: "Beginner"
    },
    {
      q: "If an algorithm requires f(n) = 3n^2 + 5n + 12 steps, what is its asymptotic complexity in Big-O notation?",
      options: ["O(n^3)", "O(n^2)", "O(n)", "O(1)"],
      answer: 1,
      explanation: "Big-O drops lower-order terms and constant coefficients, leaving O(n^2) as the dominant term.",
      difficulty: "Beginner"
    },
    {
      q: "What is the primary advantage of dynamic data structures over static data structures?",
      options: ["Guaranteed O(1) random memory access", "Memory size can expand or contract at runtime", "No pointer overhead", "Compile-time memory allocation"],
      answer: 1,
      explanation: "Dynamic structures allocate memory from heap storage as required during program execution.",
      difficulty: "Intermediate"
    },
    {
      q: "When evaluating polynomial addition using arrays, what power of terms is typically matched?",
      options: ["Coefficient", "Exponent", "Variable name", "Index number"],
      answer: 1,
      explanation: "Like terms are identified by matching exponents so their coefficients can be summed.",
      difficulty: "Intermediate"
    },
    {
      q: "Which order of growth indicates the fastest-growing (least scalable) algorithm for large n?",
      options: ["O(n log n)", "O(n^2)", "O(2^n)", "O(n!)"],
      answer: 3,
      explanation: "Factorial growth O(n!) grows even faster than exponential O(2^n) and polynomial orders.",
      difficulty: "Advanced"
    },
    {
      q: "What is auxiliary space complexity in algorithm analysis?",
      options: ["Total memory occupied by inputs", "Extra or temporary space used aside from the input data", "Disk storage for program binaries", "Operating system cache size"],
      answer: 1,
      explanation: "Auxiliary space measures only the temporary working memory needed by the algorithm during execution.",
      difficulty: "Intermediate"
    },
    {
      q: "In Little-o notation, what does f(n) = o(g(n)) imply as n approaches infinity?",
      options: ["f(n) grows at least as fast as g(n)", "f(n) / g(n) approaches 0", "f(n) is strictly equal to g(n)", "f(n) is bounded between two constants"],
      answer: 1,
      explanation: "Little-o represents an upper bound that is strictly non-tight, meaning lim (f(n)/g(n)) = 0 as n -> infinity.",
      difficulty: "Advanced"
    },
    {
      q: "Why does standard Transpose of an m x n sparse matrix with non-zero elements t take O(n * t) time?",
      options: ["It performs column-by-column linear scans over all t elements", "It uses matrix multiplication", "It reallocates the array repeatedly", "It converts the matrix to binary"],
      answer: 0,
      explanation: "Standard transpose iterates over all columns (0 to n-1) and searches through all t non-zero elements in each pass.",
      difficulty: "Intermediate"
    },
    {
      q: "Which classification applies to stacks, queues, and linked lists?",
      options: ["Non-linear data structures", "Linear data structures", "Hierarchical data structures", "Graph networks"],
      answer: 1,
      explanation: "All these structures maintain a sequential, one-dimensional logical arrangement of items.",
      difficulty: "Beginner"
    },
    {
      q: "What is an abstract data type (ADT)?",
      options: ["A hardware circuit for data storage", "A mathematical specification of data objects and operations without implementation details", "A low-level C assembly structure", "A database table schema"],
      answer: 1,
      explanation: "An ADT specifies what operations can be performed on the data without specifying how they are implemented.",
      difficulty: "Beginner"
    },
    {
      q: "If an array of integers starts at memory address 1000 and each integer occupies 4 bytes, where is index 5 stored (assuming 0-indexed)?",
      options: ["1005", "1020", "1016", "1024"],
      answer: 1,
      explanation: "Address = Base + (Index * ElementSize) = 1000 + (5 * 4) = 1020.",
      difficulty: "Intermediate"
    },
    {
      q: "Which case analysis provides a guarantee that the algorithm will never take longer than this bound?",
      options: ["Best case", "Average case", "Worst case", "Amortized case"],
      answer: 2,
      explanation: "Worst-case analysis calculates the maximum possible time taken on any input of size n.",
      difficulty: "Beginner"
    },
    {
      q: "What is a persistent data structure?",
      options: ["A structure stored on hard drives permanently", "A structure that preserves its previous versions when modified", "A read-only lookup table", "A hardware EEPROM register"],
      answer: 1,
      explanation: "Persistent data structures allow access to past versions after modifications (immutability).",
      difficulty: "Advanced"
    },
    {
      q: "What is the space complexity of an in-place algorithm?",
      options: ["O(n)", "O(1) auxiliary space", "O(n log n)", "O(2^n)"],
      answer: 1,
      explanation: "In-place algorithms modify input without allocating proportional extra memory, achieving O(1) auxiliary space.",
      difficulty: "Intermediate"
    },
    {
      q: "Which recurrence relation describes the Binary Search divide-and-conquer algorithm?",
      options: ["T(n) = 2T(n/2) + O(n)", "T(n) = T(n/2) + O(1)", "T(n) = T(n-1) + O(1)", "T(n) = 2T(n/2) + O(1)"],
      answer: 1,
      explanation: "Binary search cuts the search space in half with one comparison: T(n) = T(n/2) + O(1), yielding O(log n).",
      difficulty: "Advanced"
    }
  ],
  "dsa-u2-stacks-queues": [
    {
      q: "Which data structure follows the Last-In, First-Out (LIFO) discipline?",
      options: ["Queue", "Stack", "Binary Search Tree", "Linked List"],
      answer: 1,
      explanation: "A stack restricts insertions and deletions to the top element, adhering to LIFO discipline.",
      difficulty: "Beginner"
    },
    {
      q: "What happens when you attempt to pop an element from an empty stack?",
      options: ["Stack Overflow", "Stack Underflow", "Memory Leak", "Garbage Collection"],
      answer: 1,
      explanation: "Attempting to remove an item from an empty stack triggers a Stack Underflow error condition.",
      difficulty: "Beginner"
    },
    {
      q: "Which expression represents the postfix notation of (A + B) * C?",
      options: ["+ A B * C", "A B + C *", "A B C + *", "* + A B C"],
      answer: 1,
      explanation: "(A + B) transforms to AB+, and multiplying by C yields AB+C*.",
      difficulty: "Intermediate"
    },
    {
      q: "In a circular queue implemented using an array of size N, what is the formula to advance the rear pointer?",
      options: ["rear = rear + 1", "rear = (rear + 1) % N", "rear = (rear - 1) % N", "rear = N % rear"],
      answer: 1,
      explanation: "Modulo arithmetic wrap-around: rear = (rear + 1) % N connects the end of the array back to index 0.",
      difficulty: "Intermediate"
    },
    {
      q: "Which data structure is fundamentally used by compilers to manage function call frames and recursion?",
      options: ["Queue", "Call Stack", "Priority Queue", "Hash Table"],
      answer: 1,
      explanation: "The runtime call stack preserves local variables, return addresses, and parameters for nested function calls.",
      difficulty: "Beginner"
    },
    {
      q: "In a Priority Queue, how are elements dequeued?",
      options: ["In strictly FIFO order", "According to assigned priority values rather than arrival time", "Randomly", "In reverse order of arrival"],
      answer: 1,
      explanation: "A priority queue removes the element with highest (or lowest) priority first.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Double-Ended Queue (Deque)?",
      options: ["A queue that supports insertion and deletion at both front and rear ends", "Two queues combined sequentially", "A queue that discards old elements", "A stack with two tops"],
      answer: 0,
      explanation: "A Deque allows insertion and deletion operations at both the front and rear endpoints.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the time complexity of Push and Pop operations in a properly implemented stack?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
      answer: 2,
      explanation: "Since elements are always added and removed from the designated top pointer, stack operations take O(1) constant time.",
      difficulty: "Beginner"
    },
    {
      q: "When converting infix to postfix using Dijkstra's Shunting-yard algorithm, where are operands placed?",
      options: ["Pushed onto the operator stack", "Directly appended to the output expression", "Discarded", "Pushed into an operand queue"],
      answer: 1,
      explanation: "Operands (variables/numbers) are sent immediately to the output string; operators go onto the stack.",
      difficulty: "Intermediate"
    },
    {
      q: "How can a queue be implemented using two stacks (Stack 1 and Stack 2)?",
      options: ["Enqueue pushes to Stack 1; Dequeue pops from Stack 2 (transferring from Stack 1 when Stack 2 is empty)", "Both push and pop from Stack 1 only", "Alternate between Stack 1 and Stack 2 on every operation", "Push to both stacks simultaneously"],
      answer: 0,
      explanation: "Pushing to Stack 1 and popping from Stack 2 reverses the LIFO order twice, producing FIFO behavior.",
      difficulty: "Advanced"
    },
    {
      q: "What is the condition for an ordinary linear queue of capacity N to be full?",
      options: ["front == 0", "rear == N - 1", "front == rear", "front == -1"],
      answer: 1,
      explanation: "In a simple array queue, rear == N - 1 indicates that the rear pointer has reached the maximum capacity.",
      difficulty: "Beginner"
    },
    {
      q: "Why is a Circular Queue preferred over a standard linear array queue?",
      options: ["It uses less total memory", "It avoids false full conditions by recycling vacated spaces at the front", "It allows faster sorting", "It supports random access by key"],
      answer: 1,
      explanation: "Linear queues can appear full when rear reaches the end even if front spaces were vacated by dequeues; circular queues recycle those spaces.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the value of the postfix expression: 6 3 2 + * 5 - ?",
      options: ["25", "30", "28", "20"],
      answer: 0,
      explanation: "3 + 2 = 5; 6 * 5 = 30; 30 - 5 = 25.",
      difficulty: "Intermediate"
    },
    {
      q: "Which data structure is ideal for checking balanced parentheses in code syntax checking?",
      options: ["Queue", "Stack", "Hash Set", "Binary Tree"],
      answer: 1,
      explanation: "Pushing opening brackets onto a stack and popping to match closing brackets verifies proper balance in O(n) time.",
      difficulty: "Beginner"
    },
    {
      q: "In a circular queue of size N with front and rear pointers, what is the empty queue condition?",
      options: ["front == rear == -1", "rear == front + 1", "front == 0", "rear == N"],
      answer: 0,
      explanation: "When empty, both front and rear are typically reset to -1.",
      difficulty: "Intermediate"
    },
    {
      q: "What is an Input-Restricted Deque?",
      options: ["Insertion allowed at both ends, deletion at one end", "Insertion allowed only at one end, deletion allowed at both ends", "No insertion allowed", "Deletions restricted to middle elements"],
      answer: 1,
      explanation: "An input-restricted deque permits insertion at one end only, while deletion is allowed at both ends.",
      difficulty: "Intermediate"
    },
    {
      q: "Which real-world system uses a Queue structure?",
      options: ["Undo command in text editors", "Printer spooler managing print jobs", "Back button in web browsers", "Syntax tree evaluation"],
      answer: 1,
      explanation: "Printer spoolers process print jobs in the exact order they were received (First-In, First-Out).",
      difficulty: "Beginner"
    },
    {
      q: "What is the maximum number of elements a circular queue with array size N can hold if front == (rear + 1) % N denotes full?",
      options: ["N", "N - 1", "N + 1", "2N"],
      answer: 1,
      explanation: "Leaving one slot empty distinguishes between completely full and completely empty states without extra flags.",
      difficulty: "Advanced"
    },
    {
      q: "When an operator with lower precedence is encountered during infix to postfix conversion, what action is taken on the stack?",
      options: ["It is discarded", "Operators of higher or equal precedence are popped to output before pushing the current operator", "It is pushed directly without popping", "The entire stack is cleared"],
      answer: 1,
      explanation: "Precedence rules require operators with >= precedence on top of the stack to be popped to output first.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the space complexity of converting an infix string of length n to postfix?",
      options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"],
      answer: 1,
      explanation: "The operator stack and output string require memory linearly proportional to input length n.",
      difficulty: "Beginner"
    }
  ],
  "dsa-u3-linked-lists": [
    {
      q: "What is the time complexity to insert a new node at the beginning of a singly linked list with n nodes?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
      answer: 2,
      explanation: "Prepending to a linked list only updates the new node's next pointer and head pointer, requiring O(1) time.",
      difficulty: "Beginner"
    },
    {
      q: "In a Doubly Linked List, how many pointer fields does each node contain?",
      options: ["1", "2", "3", "0"],
      answer: 1,
      explanation: "Each node contains two pointers: 'prev' (pointing to preceding node) and 'next' (pointing to succeeding node).",
      difficulty: "Beginner"
    },
    {
      q: "What does the 'next' pointer of the last node in a Circular Singly Linked List point to?",
      options: ["NULL", "Head node", "Previous node", "Random node"],
      answer: 1,
      explanation: "In a circular list, the last node's next pointer loops back to the head node.",
      difficulty: "Beginner"
    },
    {
      q: "Which algorithm is used to detect a cycle/loop in a linked list in O(n) time and O(1) space?",
      options: ["Dijkstra's Algorithm", "Floyd's Cycle-Finding Algorithm (Tortoise & Hare)", "Kruskal's Algorithm", "Bresenham's Algorithm"],
      answer: 1,
      explanation: "Floyd's algorithm uses slow (1 step) and fast (2 steps) pointers; if a cycle exists, they must meet.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the primary memory disadvantage of a Linked List compared to an Array?",
      options: ["Linked lists cannot store dynamic data", "Extra memory overhead for storing pointer references in each node", "Linked lists cannot be traversed", "Fixed capacity at compile time"],
      answer: 1,
      explanation: "Every node requires extra memory to store pointer addresses in addition to payload data.",
      difficulty: "Beginner"
    },
    {
      q: "What is the time complexity to search for an element in an unsorted singly linked list of size n?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 2,
      explanation: "Without indexing or ordering, every node must be examined sequentially from the head, taking O(n) time.",
      difficulty: "Beginner"
    },
    {
      q: "How do you reverse a singly linked list iteratively in O(n) time?",
      options: ["By using three pointers: prev, curr, and next", "By sorting the elements", "By using a 2D matrix", "By deleting each node"],
      answer: 0,
      explanation: "Maintaining prev, curr, and next pointers allows reversing links one by one in a single pass.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Header Linked List?",
      options: ["A list stored in the program header", "A list that contains a special designated dummy node at the beginning", "A list containing only strings", "A list without pointers"],
      answer: 1,
      explanation: "A header linked list contains a dummy head node containing metadata (like count) to simplify boundary insertions/deletions.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the time complexity to delete a node given only a pointer to that node in a singly linked list (not the last node)?",
      options: ["O(n)", "O(1)", "O(log n)", "Cannot be done"],
      answer: 1,
      explanation: "Copy data from the next node into the current node and bypass next node: curr->val = curr->next->val; curr->next = curr->next->next.",
      difficulty: "Advanced"
    },
    {
      q: "How can polynomials be represented using linked lists?",
      options: ["Each node stores coefficient, exponent, and next pointer", "Each node stores only the variable name", "Using an adjacency matrix", "Polynomials cannot be represented in lists"],
      answer: 0,
      explanation: "Each term is modeled as a node containing (coeff, exp, next_node_ptr), arranged in descending degree.",
      difficulty: "Intermediate"
    },
    {
      q: "To find the middle element of a linked list in a single pass, how should the pointers move?",
      options: ["Both move one step", "Slow pointer moves 1 step; Fast pointer moves 2 steps", "Slow moves 2 steps; Fast moves 1 step", "Traverse backwards from tail"],
      answer: 1,
      explanation: "When fast reaches the end, slow is exactly at the midpoint (n/2).",
      difficulty: "Intermediate"
    },
    {
      q: "What is the main advantage of a Doubly Linked List over a Singly Linked List?",
      options: ["Uses half the memory", "Allows bidirectional traversal (forward and backward)", "Guarantees O(1) search time", "Eliminates need for dynamic allocation"],
      answer: 1,
      explanation: "Bidirectional pointers permit navigation towards predecessors as well as successors.",
      difficulty: "Beginner"
    },
    {
      q: "What is the time complexity to insert an element at the end of a singly linked list if only the head pointer is maintained?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: 1,
      explanation: "Without a tail pointer, the list must be traversed from head to the last node (n steps), taking O(n).",
      difficulty: "Beginner"
    },
    {
      q: "If both head and tail pointers are maintained, what is the time complexity to append to a singly linked list?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: 0,
      explanation: "With a direct tail pointer, appending takes O(1) time: tail->next = newNode; tail = newNode.",
      difficulty: "Beginner"
    },
    {
      q: "In an XOR Linked List (memory-efficient doubly linked list), what does each node's pointer field store?",
      options: ["Both addresses concatenated", "Bitwise XOR of previous and next node addresses", "A hash code of the data", "Address of the head node"],
      answer: 1,
      explanation: "By storing (prev XOR next), a doubly linked list uses only one pointer field per node.",
      difficulty: "Advanced"
    },
    {
      q: "What happens if you free a node in C without updating adjacent pointers in a linked list?",
      options: ["Memory compaction", "Dangling pointers and broken list links", "Automatic garbage collection", "The list reverses"],
      answer: 1,
      explanation: "Pointers still referencing deallocated memory become dangling pointers, causing undefined behavior or crashes.",
      difficulty: "Intermediate"
    },
    {
      q: "How do you check if a linked list has an even or odd number of nodes using two pointers?",
      options: ["By checking if fast pointer becomes NULL (even) or fast->next becomes NULL (odd)", "By counting digits", "By summing values", "By hashing node addresses"],
      answer: 0,
      explanation: "If fast == NULL, length is even; if fast->next == NULL, length is odd.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the worst-case time complexity of merging two sorted linked lists of lengths m and n?",
      options: ["O(m * n)", "O(m + n)", "O(log(m + n))", "O(m log n)"],
      answer: 1,
      explanation: "Comparing head nodes one by one takes linear time proportional to the total number of nodes (m + n).",
      difficulty: "Intermediate"
    },
    {
      q: "Can binary search be implemented on a singly linked list with O(log n) time complexity?",
      options: ["Yes, using random pointers", "No, because linked lists lack O(1) random access to middle elements", "Yes, always", "Only if sorted descending"],
      answer: 1,
      explanation: "Accessing the middle node requires O(n) traversal, destroying the O(log n) performance of binary search.",
      difficulty: "Intermediate"
    },
    {
      q: "What data structure can be used to achieve O(log n) search on linked list concepts?",
      options: ["Skip List", "Circular Queue", "Stack", "Tuple Matrix"],
      answer: 0,
      explanation: "Skip Lists introduce multiple hierarchical layers of forward pointers, achieving O(log n) search in linked lists.",
      difficulty: "Advanced"
    }
  ],
  "dsa-u4-searching-sorting": [
    {
      q: "What is the worst-case time complexity of Quick Sort?",
      options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
      answer: 1,
      explanation: "Quick Sort degrades to O(n^2) when the pivot divides the array into unbalanced partitions of 0 and n-1 elements.",
      difficulty: "Beginner"
    },
    {
      q: "Which sorting algorithm is guaranteed to be stable and have O(n log n) worst-case time complexity?",
      options: ["Quick Sort", "Merge Sort", "Heap Sort", "Selection Sort"],
      answer: 1,
      explanation: "Merge Sort consistently divides arrays in half and maintains relative order of equal keys in O(n log n).",
      difficulty: "Beginner"
    },
    {
      q: "What is the best-case time complexity of Insertion Sort when the input is already sorted?",
      options: ["O(n^2)", "O(n)", "O(n log n)", "O(1)"],
      answer: 1,
      explanation: "When sorted, each element only needs one comparison with its predecessor, achieving O(n) linear time.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the precondition required to execute Binary Search on an array?",
      options: ["Array size must be even", "Array must be sorted", "Array must contain only positive integers", "Array must have no duplicates"],
      answer: 1,
      explanation: "Binary search relies on monotonic ordering to eliminate half of the remaining elements at each step.",
      difficulty: "Beginner"
    },
    {
      q: "How many comparisons does Selection Sort perform on an array of size n in all cases?",
      options: ["n - 1", "n(n - 1) / 2", "n log n", "2^n"],
      answer: 1,
      explanation: "Selection Sort always scans all unsorted elements to find the minimum: (n-1) + (n-2) + ... + 1 = n(n-1)/2.",
      difficulty: "Intermediate"
    },
    {
      q: "Which sorting algorithm sorts elements digit by digit, from least significant to most significant digit?",
      options: ["Bubble Sort", "Radix Sort", "Quick Sort", "Heap Sort"],
      answer: 1,
      explanation: "Radix Sort (LSD) processes numbers digit-by-digit using a stable sub-routine like Counting Sort.",
      difficulty: "Intermediate"
    },
    {
      q: "What does it mean for a sorting algorithm to be 'stable'?",
      options: ["It never crashes due to memory overflow", "It preserves the relative order of elements with equal keys", "It runs in O(n log n) time", "It uses O(1) auxiliary space"],
      answer: 1,
      explanation: "Stability ensures that duplicate values appear in the output in the same relative order as in the input.",
      difficulty: "Beginner"
    },
    {
      q: "What is the average-case time complexity of Linear Search on an array of size n?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      answer: 2,
      explanation: "On average, linear search examines (n + 1)/2 elements, which evaluates to O(n) complexity.",
      difficulty: "Beginner"
    },
    {
      q: "What is the space complexity of standard recursive Merge Sort?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      answer: 1,
      explanation: "Merge Sort requires an auxiliary array of size n to merge halves back together.",
      difficulty: "Intermediate"
    },
    {
      q: "Which sorting algorithm has O(n log n) time complexity in all cases (best, worst, average) and runs in-place with O(1) auxiliary space?",
      options: ["Merge Sort", "Quick Sort", "Heap Sort", "Bubble Sort"],
      answer: 2,
      explanation: "Heap Sort operates directly on an array representation of a binary heap, achieving O(n log n) in O(1) extra space.",
      difficulty: "Advanced"
    },
    {
      q: "In Bubble Sort, what optimization allows early termination in O(n) time if the array is already sorted?",
      options: ["Using binary search", "Using a swapped boolean flag that breaks if no swaps occur in a pass", "Halving the array size", "Reversing the loop"],
      answer: 1,
      explanation: "If an entire pass completes without a single swap, the array is already sorted and sorting can terminate.",
      difficulty: "Beginner"
    },
    {
      q: "What is the maximum number of comparisons needed in Binary Search for an array of size n?",
      options: ["n", "floor(log2(n)) + 1", "n / 2", "n^2"],
      answer: 1,
      explanation: "At each comparison, search space is halved; maximum comparisons is floor(log2(n)) + 1.",
      difficulty: "Intermediate"
    },
    {
      q: "What technique does Randomized Quick Sort use to avoid the O(n^2) worst case on already sorted arrays?",
      options: ["Choosing the pivot uniformly at random", "Reversing the array first", "Using 3 pivots", "Counting all elements"],
      answer: 0,
      explanation: "Random pivot selection breaks adversarial input patterns, yielding an expected O(n log n) runtime.",
      difficulty: "Intermediate"
    },
    {
      q: "Which searching algorithm divides the search space using golden ratio or probe positions based on key values rather than strictly middle index?",
      options: ["Binary Search", "Interpolation Search", "Linear Search", "Breadth First Search"],
      answer: 1,
      explanation: "Interpolation Search estimates the target position using the formula pos = low + [(x - arr[low])*(high - low)] / (arr[high] - arr[low]).",
      difficulty: "Advanced"
    },
    {
      q: "What is the time complexity of Interpolation Search on uniformly distributed sorted data?",
      options: ["O(n)", "O(log(log n))", "O(log n)", "O(1)"],
      answer: 1,
      explanation: "On uniformly distributed keys, interpolation search achieves O(log log n) average time complexity.",
      difficulty: "Advanced"
    },
    {
      q: "Which sorting technique is considered an 'internal sort'?",
      options: ["Sorting data that completely fits into main memory (RAM)", "Sorting data across external tape drives", "Sorting databases across distributed clusters", "Writing intermediate runs to disk"],
      answer: 0,
      explanation: "Internal sorting takes place entirely in high-speed primary RAM without auxiliary disk storage.",
      difficulty: "Beginner"
    },
    {
      q: "What is the minimum number of comparisons needed to find both the minimum and maximum elements in an array of size n?",
      options: ["2n - 2", "3n/2 - 2 (in pairs)", "n log n", "n^2"],
      answer: 1,
      explanation: "Comparing elements in pairs reduces total comparisons to approximately 3n/2 - 2.",
      difficulty: "Advanced"
    },
    {
      q: "Why is Quick Sort practically faster in practice than Merge Sort and Heap Sort on modern CPUs?",
      options: ["It performs fewer comparisons", "Good cache locality of reference and minimal pointer dereferencing", "It uses multiple threads automatically", "It has lower Big-O bound"],
      answer: 1,
      explanation: "Quick Sort works sequentially within contiguous cache blocks without secondary array copies.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the lower bound for comparison-based sorting algorithms in the worst case?",
      options: ["Ω(n)", "Ω(n log n)", "Ω(n^2)", "Ω(log n)"],
      answer: 1,
      explanation: "A decision tree for n! permutations requires height of at least log2(n!) = Ω(n log n).",
      difficulty: "Advanced"
    },
    {
      q: "Which non-comparison sort operates in O(n + k) time where k is the range of key values?",
      options: ["Quick Sort", "Counting Sort", "Selection Sort", "Shell Sort"],
      answer: 1,
      explanation: "Counting Sort tallies frequencies of keys in range k, completing in linear O(n + k) time.",
      difficulty: "Intermediate"
    }
  ],
  "dsa-u5-trees": [
    {
      q: "What is the In-Order traversal order of a Binary Tree?",
      options: ["Root, Left, Right", "Left, Root, Right", "Left, Right, Root", "Right, Root, Left"],
      answer: 1,
      explanation: "In-Order traversal recursively visits Left Subtree -> Root Node -> Right Subtree.",
      difficulty: "Beginner"
    },
    {
      q: "In a Binary Search Tree (BST), what traversal sequence produces keys in strictly ascending sorted order?",
      options: ["Pre-Order", "In-Order", "Post-Order", "Level-Order"],
      answer: 1,
      explanation: "Because Left < Root < Right, an In-Order traversal naturally yields strictly ascending sorted values.",
      difficulty: "Beginner"
    },
    {
      q: "What is the balance factor of a node in an AVL tree?",
      options: ["Height(Left) - Height(Right)", "Number of children", "Degree of node", "Depth of node"],
      answer: 0,
      explanation: "Balance Factor = Height(Left Subtree) - Height(Right Subtree), and must be in {-1, 0, +1}.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the maximum number of nodes in a binary tree of height h (where height of single-node tree is 0)?",
      options: ["2^h", "2^(h+1) - 1", "2h", "h^2"],
      answer: 1,
      explanation: "A full binary tree contains 2^(h+1) - 1 nodes across levels 0 to h.",
      difficulty: "Intermediate"
    },
    {
      q: "What rotation is required in an AVL tree when an insertion occurs in the Right subtree of a Left child (LR imbalance)?",
      options: ["Single Left Rotation (LL)", "Single Right Rotation (RR)", "Left-Right Double Rotation (LR)", "Right-Left Double Rotation (RL)"],
      answer: 2,
      explanation: "An LR imbalance requires a Left rotation on the child followed by a Right rotation on the parent.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the worst-case time complexity of searching in a standard (unbalanced) Binary Search Tree with n nodes?",
      options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"],
      answer: 2,
      explanation: "If keys are inserted in sorted order, the BST degenerates into a skewed line (linked list) of height n, taking O(n).",
      difficulty: "Beginner"
    },
    {
      q: "What is the time complexity of search, insertion, and deletion in an AVL tree with n nodes?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      answer: 1,
      explanation: "Strict height-balancing guarantees height h <= 1.44 log2(n), ensuring O(log n) operations in all cases.",
      difficulty: "Intermediate"
    },
    {
      q: "In a complete binary tree with n nodes stored in an array starting at index 1, where is the parent of node i located?",
      options: ["2 * i", "2 * i + 1", "floor(i / 2)", "i - 1"],
      answer: 2,
      explanation: "For 1-based indexing, the parent of node i is at index floor(i / 2).",
      difficulty: "Beginner"
    },
    {
      q: "Which traversal of a tree uses a Queue data structure?",
      options: ["Pre-Order", "In-Order", "Post-Order", "Level-Order (Breadth-First)"],
      answer: 3,
      explanation: "Level-Order traversal inspects nodes level by level, enqueueing children and dequeueing visited nodes.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Threaded Binary Tree?",
      options: ["A tree executed across multi-core threads", "A binary tree where null pointers are replaced with pointers to in-order predecessor or successor", "A tree with cyclic edges", "A tree where each node has 3 children"],
      answer: 1,
      explanation: "Threaded binary trees utilize null pointer fields to store threads pointing to in-order successors/predecessors.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the In-Order predecessor of a node in a Binary Search Tree?",
      options: ["The minimum value in its left subtree", "The maximum value in its left subtree", "Its parent node", "The minimum value in its right subtree"],
      answer: 1,
      explanation: "The in-order predecessor is the largest element smaller than the current node (rightmost node in left subtree).",
      difficulty: "Intermediate"
    },
    {
      q: "What is the minimum number of nodes in an AVL tree of height h (where h0=1 node, h1=2 nodes)?",
      options: ["N(h) = N(h-1) + N(h-2) + 1", "N(h) = 2^h", "N(h) = 2h + 1", "N(h) = h^2"],
      answer: 0,
      explanation: "AVL minimum nodes follow Fibonacci-like recurrence: N(h) = N(h-1) + N(h-2) + 1.",
      difficulty: "Advanced"
    },
    {
      q: "In a full binary tree with L leaves, how many internal (non-leaf) nodes are there?",
      options: ["L - 1", "L + 1", "2L", "L / 2"],
      answer: 0,
      explanation: "In any strictly binary tree where every node has 0 or 2 children, InternalNodes = Leaves - 1.",
      difficulty: "Intermediate"
    },
    {
      q: "Which tree structure is commonly used to implement file systems and database indices?",
      options: ["AVL Tree", "B-Tree / B+ Tree", "Binary Search Tree", "Threaded Binary Tree"],
      answer: 1,
      explanation: "B-Trees and B+ Trees have large branching factors, minimizing expensive disk block I/O operations.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Pre-Order traversal of a tree with Root 1, Left child 2, and Right child 3?",
      options: ["2, 1, 3", "1, 2, 3", "2, 3, 1", "3, 2, 1"],
      answer: 1,
      explanation: "Pre-Order visits Root first (1), then Left (2), then Right (3): 1, 2, 3.",
      difficulty: "Beginner"
    },
    {
      q: "What property defines a Max-Heap?",
      options: ["Every node is smaller than its children", "Every node is greater than or equal to its children", "All leaves are on left", "Keys are sorted alphabetically"],
      answer: 1,
      explanation: "In a max-heap, the value of each node is >= the values of its children, with the maximum at the root.",
      difficulty: "Beginner"
    },
    {
      q: "What is the time complexity to build a binary heap from an unsorted array of n elements (heapify)?",
      options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"],
      answer: 1,
      explanation: "Bottom-up heap construction sums to n/4 * 1 + n/8 * 2 + ... which converges to O(n) linear time.",
      difficulty: "Advanced"
    },
    {
      q: "How many distinct binary search trees can be constructed from n distinct keys?",
      options: ["n!", "2^n", "Catalan Number C(n) = (2n)! / ((n+1)! * n!)", "n^2"],
      answer: 2,
      explanation: "The number of unique structurally valid BSTs for n keys is given by the n-th Catalan number.",
      difficulty: "Advanced"
    },
    {
      q: "What is the depth of the root node in a tree?",
      options: ["0", "1", "-1", "Depends on number of children"],
      answer: 0,
      explanation: "The depth of a node is the length of the path from the root; hence root depth is 0.",
      difficulty: "Beginner"
    },
    {
      q: "If a tree has n vertices, how many edges does it contain?",
      options: ["n", "n - 1", "n + 1", "2n"],
      answer: 1,
      explanation: "A connected acyclic graph (tree) with n vertices always contains exactly n - 1 edges.",
      difficulty: "Beginner"
    }
  ],
  "dsa-u6-graphs": [
    {
      q: "Which data structure is typically used to implement Breadth First Search (BFS) on a graph?",
      options: ["Stack", "Queue", "Priority Queue", "Binary Search Tree"],
      answer: 1,
      explanation: "BFS explores vertices level-by-level using a FIFO Queue.",
      difficulty: "Beginner"
    },
    {
      q: "Which algorithm finds the Single Source Shortest Path on a weighted graph with non-negative edge weights?",
      options: ["Prim's Algorithm", "Dijkstra's Algorithm", "Kruskal's Algorithm", "Floyd-Warshall Algorithm"],
      answer: 1,
      explanation: "Dijkstra's algorithm uses a greedy approach with a min-priority queue to find shortest paths from a single source.",
      difficulty: "Beginner"
    },
    {
      q: "What is the time complexity of Breadth First Search (BFS) using an adjacency list representation with V vertices and E edges?",
      options: ["O(V^2)", "O(V + E)", "O(E log V)", "O(V * E)"],
      answer: 1,
      explanation: "Each vertex is enqueued once and every incident edge is inspected once, yielding O(V + E).",
      difficulty: "Intermediate"
    },
    {
      q: "Which algorithm finds a Minimum Spanning Tree (MST) by sorting all edges and adding the lowest-weight edges that do not form a cycle?",
      options: ["Dijkstra's Algorithm", "Kruskal's Algorithm", "Bellman-Ford Algorithm", "Warshall's Algorithm"],
      answer: 1,
      explanation: "Kruskal's algorithm sorts edges by weight and uses a Disjoint-Set Union (DSU) to avoid cycles.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Topological Sorting?",
      options: ["Sorting graph nodes by degree", "A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge (u, v), u comes before v", "Alphabetical sorting of vertex labels", "Finding the longest path"],
      answer: 1,
      explanation: "Topological sorting is a linear ordering of vertices in a DAG respecting precedence constraints.",
      difficulty: "Intermediate"
    },
    {
      q: "Can Dijkstra's algorithm guarantee correct results on graphs containing negative edge weights?",
      options: ["Yes, always", "No, it can produce incorrect shortest path distances", "Only if the graph is undirected", "Only if there are no cycles"],
      answer: 1,
      explanation: "Dijkstra's greedy assumption assumes path distances never decrease; negative weights violate this (use Bellman-Ford).",
      difficulty: "Intermediate"
    },
    {
      q: "What is the space complexity of an Adjacency Matrix for a graph with V vertices?",
      options: ["O(V + E)", "O(V^2)", "O(E^2)", "O(log V)"],
      answer: 1,
      explanation: "An adjacency matrix allocates a 2D V x V array, requiring O(V^2) memory regardless of edge density.",
      difficulty: "Beginner"
    },
    {
      q: "Which graph traversal technique uses a Stack or recursive call stack?",
      options: ["Breadth First Search (BFS)", "Depth First Search (DFS)", "Dijkstra's Search", "Level Order Traversal"],
      answer: 1,
      explanation: "DFS traverses as deep as possible along each branch before backtracking, utilizing LIFO stack mechanics.",
      difficulty: "Beginner"
    },
    {
      q: "In an undirected graph with V vertices and no self-loops, what is the maximum number of edges possible?",
      options: ["V", "V * (V - 1)", "V * (V - 1) / 2", "2^V"],
      answer: 2,
      explanation: "Each vertex can connect to V-1 other vertices; dividing by 2 accounts for undirected symmetry: V(V-1)/2.",
      difficulty: "Intermediate"
    },
    {
      q: "What data structure does Kruskal's algorithm use to check for cycles efficiently?",
      options: ["Queue", "Disjoint-Set Union (DSU) / Union-Find", "Binary Heap", "Hash Map"],
      answer: 1,
      explanation: "DSU provides near O(1) find and union operations with path compression and rank heuristics.",
      difficulty: "Intermediate"
    },
    {
      q: "Which algorithm finds the transitive closure of a directed graph?",
      options: ["Warshall's Algorithm", "Dijkstra's Algorithm", "Prim's Algorithm", "DFS Traversal"],
      answer: 0,
      explanation: "Warshall's algorithm computes the reachability matrix between all pairs of vertices in O(V^3) time.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the sum of degrees of all vertices in an undirected graph with E edges (Handshaking Lemma)?",
      options: ["E", "2 * E", "E / 2", "V * E"],
      answer: 1,
      explanation: "Every edge has two endpoints, contributing exactly 2 to the sum of degrees: sum(deg) = 2E.",
      difficulty: "Beginner"
    },
    {
      q: "What is a bipartite graph?",
      options: ["A graph with two cycles", "A graph whose vertices can be partitioned into two disjoint sets such that every edge connects vertices across the two sets", "A graph with degree 2 at every vertex", "A graph that can be drawn on a plane"],
      answer: 1,
      explanation: "A graph is bipartite if its vertices can be 2-colored such that no two adjacent vertices share the same color.",
      difficulty: "Intermediate"
    },
    {
      q: "Which of the following is equivalent to saying a graph is bipartite?",
      options: ["It contains no triangles", "It contains no odd-length cycles", "It is planar", "It is strongly connected"],
      answer: 1,
      explanation: "A graph is bipartite if and only if it contains no cycles of odd length.",
      difficulty: "Advanced"
    },
    {
      q: "What is the time complexity of Prim's algorithm using a binary min-heap and adjacency lists?",
      options: ["O(V^2)", "O(E log V)", "O(V log E)", "O(V + E)"],
      answer: 1,
      explanation: "Extracting min vertices takes O(V log V) and updating edge weights takes O(E log V), yielding O(E log V).",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Strongly Connected Component (SCC) in a directed graph?",
      options: ["A component where every vertex is connected to an external graph", "A maximal subgraph where every vertex is reachable from every other vertex in that subgraph", "A graph with no directed edges", "A tree with V-1 edges"],
      answer: 1,
      explanation: "In an SCC, there exists a directed path between any pair of vertices within the component.",
      difficulty: "Intermediate"
    },
    {
      q: "Which algorithm finds all Strongly Connected Components in linear O(V + E) time using two DFS passes?",
      options: ["Kosaraju's Algorithm", "Kruskal's Algorithm", "Prim's Algorithm", "Bellman-Ford Algorithm"],
      answer: 0,
      explanation: "Kosaraju's algorithm performs one DFS on the original graph and a second DFS on the transposed graph in O(V + E).",
      difficulty: "Advanced"
    },
    {
      q: "What condition indicates that a directed graph contains a cycle during DFS?",
      options: ["Encountering a forward edge", "Encountering a back edge to an ancestor currently on the recursion stack", "Encountering a cross edge", "Reaching a leaf node"],
      answer: 1,
      explanation: "A back edge connects a vertex to an active ancestor in the DFS tree, confirming a cyclic loop.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the time complexity of the Floyd-Warshall all-pairs shortest path algorithm?",
      options: ["O(V^2)", "O(V^3)", "O(V * E)", "O(E log V)"],
      answer: 1,
      explanation: "Floyd-Warshall uses three nested loops iterating from 1 to V, running in O(V^3) time.",
      difficulty: "Beginner"
    },
    {
      q: "How many edges are in a Minimum Spanning Tree of a connected graph with V vertices?",
      options: ["V", "V - 1", "V + 1", "E / 2"],
      answer: 1,
      explanation: "Any spanning tree on V vertices has exactly V - 1 edges and connects all vertices without cycles.",
      difficulty: "Beginner"
    }
  ]
};
