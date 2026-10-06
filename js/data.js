/* ==========================================================================
   js/data.js — Rich Academic Knowledge Base for YUKTARA
   Aligned with Second Year B.Tech in Artificial Intelligence & Data Science
   Curriculum: SNJB Autonomous / Savitribai Phule Pune University (SPPU)
   ========================================================================== */

const SUBJECT_LIBRARY = {
  "data structures & algorithms": {
    "displayName": "Data Structures & Algorithms",
    "courseCode": "24-PCC-AD-2-02",
    "semester": "Semester-III",
    "credits": 3,
    "topics": [
      {
        "id": "dsa-u1-intro",
        "name": "Unit 1: Introduction to Data Structures & Algorithms",
        "unitNumber": 1,
        "hours": 8,
        "subtopics": [
          "Data Structure Classifications (Primitive vs Non-primitive, Linear vs Non-linear)",
          "Static vs Dynamic & Persistent vs Transient Structures",
          "Algorithm Characteristics & Design Principles",
          "Space and Time Complexity Analysis & Asymptotic Orders",
          "Asymptotic Notations: Big-O (Upper Bound), Big-Omega (Lower Bound), Big-Theta (Tight Bound)",
          "Best, Worst, and Average Case Analysis",
          "Algorithmic Strategies: Divide and Conquer vs Greedy Strategy",
          "Applications of Array: Polynomial Addition & Sparse Matrix Transpose"
        ],
        "explanations": {
          "beginner": "A data structure is a specialized format for organizing, processing, retrieving, and storing data in computer memory. Primitive types (int, float, char) hold single values, while non-primitive structures (arrays, linked lists, trees) organize collections of elements. Linear structures arrange elements sequentially, whereas non-linear structures (trees, graphs) represent hierarchical and interconnected networks. Asymptotic notation like Big-O describes how algorithm execution time grows as input size n expands.",
          "intermediate": "Static data structures (arrays) possess fixed memory allocated at compile-time, leading to O(1) random access but static capacity limits. Dynamic data structures allocate heap memory at runtime using pointers or references. Asymptotic bounds formalize efficiency: f(n) = O(g(n)) means c*g(n) serves as an upper bound for large n; Ω(g(n)) is the lower bound; and Θ(g(n)) indicates a tight bound. Algorithmic paradigms include Divide-and-Conquer (breaking problems into independent subproblems, e.g., Merge Sort) and Greedy strategies (making locally optimal choices, e.g., Prim's algorithm).",
          "advanced": "Persistent data structures preserve historical versions upon mutation (functional paradigms), unlike transient structures which mutate in place. Space complexity encompasses both fixed instruction space and dynamic data/stack space. For sparse matrices where zero elements predominate, standard 2D arrays waste O(m*n) space; tuple 3-row/column representations (Row, Column, Value) compress storage to O(non-zero elements), enabling fast transpose algorithms in O(columns + non-zero) time complexity."
        },
        "caseStudy": "Managing Student Examination Database: A university department stores scores for 1,000 students across 6 subjects. Since many students take optional electives, the grade matrix contains 85% null/zero values. Using a 3-tuple sparse matrix representation drastically reduces RAM usage while enabling rapid calculation of class averages, highest marks, and lowest marks.",
        "formulas": [
          "Time Complexity: T(n) <= c * g(n) for all n >= n0 (Big-O)",
          "Lower Bound: T(n) >= c * g(n) for all n >= n0 (Big-Omega)",
          "Tight Bound: c1 * g(n) <= T(n) <= c2 * g(n) (Big-Theta)",
          "Sparse Matrix Triplet: Element(row_index, col_index, non_zero_val)"
        ],
        "vivaQuestions": [
          {
            "q": "What is the difference between a linear and non-linear data structure?",
            "a": "In linear data structures (arrays, linked lists, stacks, queues), elements are arranged sequentially and traversed in single level. In non-linear structures (trees, graphs), elements have hierarchical or multi-connected relationships."
          },
          {
            "q": "Why is Big-O notation preferred over actual CPU execution time in seconds?",
            "a": "CPU execution time varies across hardware, OS, and background processes. Big-O provides a hardware-independent mathematical measure of how an algorithm scales as input size approaches infinity."
          },
          {
            "q": "How does Fast Transpose of a sparse matrix achieve O(cols + non-zero) complexity?",
            "a": "By precomputing the frequency count of elements in each column and computing starting address indices (row_terms array), each non-zero element is placed directly into its final transposed position in a single pass."
          }
        ],
        "example": "Consider a phone book. If you look up names one by one from page 1, that is linear search O(n). If you open the book in the middle and halve the remaining pages each step because names are alphabetically sorted, that is binary search O(log n), illustrating divide-and-conquer efficiency.",
        "codeExample": "// Sparse Matrix Representation & Fast Transpose in C++\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Element {\n    int row, col, val;\n};\n\nvoid fastTranspose(const vector<Element>& a, vector<Element>& b, int totalCols, int nonZero) {\n    b.resize(nonZero);\n    vector<int> rowTerms(totalCols, 0), startingPos(totalCols, 0);\n\n    for (int i = 0; i < nonZero; i++) rowTerms[a[i].col]++;\n    startingPos[0] = 0;\n    for (int i = 1; i < totalCols; i++) startingPos[i] = startingPos[i - 1] + rowTerms[i - 1];\n\n    for (int i = 0; i < nonZero; i++) {\n        int pos = startingPos[a[i].col]++;\n        b[pos] = {a[i].col, a[i].row, a[i].val};\n    }\n}\n\nint main() {\n    vector<Element> mat = {{0, 1, 10}, {1, 2, 20}, {2, 0, 30}};\n    vector<Element> trans;\n    fastTranspose(mat, trans, 3, 3);\n    cout << \"Transposed Elements (Row, Col, Val):\" << endl;\n    for (auto &e : trans) cout << e.row << \" \" << e.col << \" \" << e.val << endl;\n    return 0;\n}",
        "pitfalls": [
          "1. Confusing worst-case time complexity O(n) with Big-O notation itself: Big-O is an upper bound on growth, not synonymous with worst-case.",
          "2. Omitting space required by the recursion call stack when analyzing auxiliary space complexity in divide-and-conquer algorithms.",
          "3. Storing dense matrices in triplet sparse matrix format, which creates a 3x memory overhead compared to a standard 2D array."
        ],
        "quiz": {
          "mcq": [
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
              "q": "If an algorithm's running time is described by T(n) = 2T(n/2) + O(n), what is its asymptotic time complexity by the Master Theorem?",
              "options": [
                "O(n)",
                "O(n log n)",
                "O(n^2)",
                "O(log n)"
              ],
              "answer": 1,
              "explanation": "By Master Theorem Case 2 (a=2, b=2, k=1, log_b(a) = 1 = k), the time complexity is O(n log n), characteristic of Merge Sort.",
              "difficulty": "Advanced"
            },
            {
              "q": "In a persistent data structure, what happens when an element is modified?",
              "options": [
                "The original structure is overwritten in memory",
                "A new version is created while the previous version remains accessible",
                "The entire system crashes due to memory leaks",
                "Pointers are permanently locked"
              ],
              "answer": 1,
              "explanation": "Persistent data structures preserve historical states by allocating new nodes along the mutation path while sharing unmodified substructures.",
              "difficulty": "Intermediate"
            }
          ],
          "short": [
            {
              "q": "Define space complexity and state the two components that constitute total memory space for an algorithm.",
              "keywords": [
                "fixed",
                "variable",
                "instruction",
                "data",
                "stack",
                "space"
              ],
              "modelAnswer": "Space complexity is the total amount of memory required by an algorithm to run to completion. It consists of: (1) Fixed part (instruction space, simple variables, constants) and (2) Variable part (dynamically allocated memory, recursion stack space, dependent on problem instance size n).",
              "explanation": "Focus on the distinction between fixed instruction space and input-dependent dynamic/stack memory."
            }
          ]
        }
      },
      {
        "id": "dsa-u2-stacks-queues",
        "name": "Unit 2: Stacks and Queues",
        "unitNumber": 2,
        "hours": 8,
        "subtopics": [
          "Stack Abstract Data Type (ADT) & Array/Linked Representation",
          "Stack Operations: Push, Pop, Peek, IsEmpty, IsFull",
          "Polish Notation: Infix, Prefix, and Postfix Expressions",
          "Infix to Postfix Conversion & Postfix Expression Evaluation",
          "Function Call Stack, Activation Records & Recursion Mechanics",
          "Queue ADT & Linear Queue Limitations (False Overflow)",
          "Circular Queue: Modulo Arithmetic Implementation",
          "Priority Queue (Ascending & Descending) & Double Ended Queue (Deque)",
          "Real-World Applications: CPU Scheduling & Print Spooling"
        ],
        "explanations": {
          "beginner": "A Stack is a Last-In, First-Out (LIFO) structure where additions and removals occur solely at the 'Top'. Imagine a stack of cafeteria trays: the last tray placed on top is the first one removed. A Queue is a First-In, First-Out (FIFO) structure where items enter at the 'Rear' and depart from the 'Front', like customers standing in line at a cinema ticket counter.",
          "intermediate": "Linear queues implemented in arrays suffer from 'false overflow' when elements are dequeued, leaving unused memory at the beginning. Circular queues resolve this using modulo arithmetic: `rear = (rear + 1) % capacity`. Stacks play a vital role in parsing arithmetic expressions: human-readable infix expressions (e.g., A + B * C) are converted to compiler-friendly postfix (A B C * +) to eliminate ambiguity without needing parentheses.",
          "advanced": "A Double-Ended Queue (Deque) permits insertions and deletions at both ends (Input-Restricted and Output-Restricted variants). Priority Queues process elements based on priority rather than arrival order, implemented using binary heaps with O(log n) enqueue/dequeue operations. The call stack manages activation records (stack frames) during recursion, containing local variables, parameters, and return addresses; unbounded recursion exhausts stack memory, triggering stack overflow."
        },
        "caseStudy": "Expression Evaluation Engine in Scientific Calculators: When a user enters complex mathematical strings like '5 + 3 * (8 - 2) / 4', the calculator tokenizes the string, converts it to postfix notation using an operator stack and operator precedence rules (BODMAS), and subsequently evaluates the postfix stream using an operand stack to compute the exact result in linear O(n) time.",
        "formulas": [
          "Circular Queue Next Position: (index + 1) % MAX_SIZE",
          "Circular Queue Full Condition: (rear + 1) % MAX_SIZE == front",
          "Circular Queue Empty Condition: front == -1"
        ],
        "vivaQuestions": [
          {
            "q": "What is the primary advantage of a Circular Queue over a Linear Queue?",
            "a": "In a linear array queue, dequeuing elements leaves empty slots at the front that cannot be reused without shifting. A circular queue wraps around using modulo indexing, eliminating false overflow and utilizing memory fully."
          },
          {
            "q": "How does a stack evaluate a postfix expression?",
            "a": "Read operands and push them onto the stack. When an operator is encountered, pop the top two operands, apply the operator (op2 [operator] op1), and push the result back onto the stack. At the end, the stack top holds the evaluated answer."
          },
          {
            "q": "What is an activation record in recursion?",
            "a": "An activation record (stack frame) is a memory block pushed onto the runtime call stack containing a function call's parameters, local variables, and return address."
          }
        ],
        "example": "Your browser's 'Back' button uses a Stack: every page you visit is pushed onto the navigation stack. Clicking 'Back' pops the current URL and takes you to the previous one. In contrast, documents sent to an office printer form a Queue: the first document submitted prints first.",
        "codeExample": "// Infix to Postfix Conversion using Stack in C++\n#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint precedence(char op) {\n    if (op == '+' || op == '-') return 1;\n    if (op == '*' || op == '/') return 2;\n    if (op == '^') return 3;\n    return 0;\n}\n\nstring infixToPostfix(string infix) {\n    stack<char> s;\n    string postfix = \"\";\n    for (char c : infix) {\n        if (isalnum(c)) {\n            postfix += c;\n        } else if (c == '(') {\n            s.push(c);\n        } else if (c == ')') {\n            while (!s.empty() && s.top() != '(') {\n                postfix += s.top();\n                s.pop();\n            }\n            if (!s.empty()) s.pop(); // discard '('\n        } else {\n            while (!s.empty() && precedence(s.top()) >= precedence(c)) {\n                postfix += s.top();\n                s.pop();\n            }\n            s.push(c);\n        }\n    }\n    while (!s.empty()) {\n        postfix += s.top();\n        s.pop();\n    }\n    return postfix;\n}\n\nint main() {\n    string exp = \"A+B*(C-D)/E\";\n    cout << \"Infix: \" << exp << endl;\n    cout << \"Postfix: \" << infixToPostfix(exp) << endl; // Output: ABCD-*E/+\n    return 0;\n}",
        "pitfalls": [
          "1. Incorrect operand order when popping from stack during subtraction/division: when popping A then B for operator '-', the operation is B - A, not A - B.",
          "2. Forgetting to check for stack underflow before calling `pop()` or `top()`.",
          "3. In circular queues, confusing the empty condition (`front == -1`) with the single-element condition (`front == rear`)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which data structure follows the Last-In, First-Out (LIFO) discipline?",
              "options": [
                "Queue",
                "Stack",
                "Binary Search Tree",
                "Linked List"
              ],
              "answer": 1,
              "explanation": "A Stack enforces LIFO: the most recently pushed element is the first to be popped.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the equivalent postfix expression for the infix expression: (A + B) * C?",
              "options": [
                "A B + C *",
                "A B C + *",
                "* + A B C",
                "A B + * C"
              ],
              "answer": 0,
              "explanation": "Parenthesized (A + B) evaluates first as `A B +`, which is then multiplied with C to yield `A B + C *`.",
              "difficulty": "Beginner"
            },
            {
              "q": "In a circular queue of capacity N represented by an array with indices 0 to N-1, what is the formula to advance the rear pointer?",
              "options": [
                "rear = rear + 1",
                "rear = (rear + 1) % N",
                "rear = (rear - 1) % N",
                "rear = (front + rear) / 2"
              ],
              "answer": 1,
              "explanation": "Modulo arithmetic `(rear + 1) % N` wraps index N-1 back to 0, creating a circular buffer.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the output of evaluating the postfix expression: `6 3 2 * + 4 -`?",
              "options": [
                "8",
                "14",
                "10",
                "12"
              ],
              "answer": 0,
              "explanation": "Step 1: 3 * 2 = 6. Step 2: 6 + 6 = 12. Step 3: 12 - 4 = 8.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which queue variant restricts insertions to one end but allows deletions from both ends?",
              "options": [
                "Output-Restricted Deque",
                "Input-Restricted Deque",
                "Circular Queue",
                "Priority Queue"
              ],
              "answer": 1,
              "explanation": "An Input-Restricted Deque allows insertion at only one end while permitting deletions at both front and rear.",
              "difficulty": "Advanced"
            }
          ],
          "short": [
            {
              "q": "Explain why linear queues suffer from false overflow and how a circular queue overcomes this problem.",
              "keywords": [
                "rear",
                "front",
                "false overflow",
                "wrap",
                "modulo",
                "space"
              ],
              "modelAnswer": "In a linear queue, when elements are repeatedly inserted and deleted, the rear pointer reaches the end of the array (MAX-1), causing an overflow condition even if front slots are empty. A circular queue treats the array as a ring by calculating `(rear + 1) % MAX`, wrapping around to reuse freed space at the front.",
              "explanation": "Highlight how pointer progression and modulo indexing reuse available space."
            }
          ]
        }
      },
      {
        "id": "dsa-u3-linked-lists",
        "name": "Unit 3: Linked Lists",
        "unitNumber": 3,
        "hours": 6,
        "subtopics": [
          "Linked List Fundamentals: Nodes, Data Field, and Pointer References",
          "Singly Linked List: Insertion (Head, Tail, Middle), Deletion, and Traversal",
          "Doubly Linked List (DLL): Forward and Backward Navigation & Node Structure",
          "Circular Singly & Circular Doubly Linked Lists",
          "Generalized Linked List (GLL): Definition, Head/Tail Representation & Depth",
          "Polynomial Representation and Addition using Linked Structures",
          "Dynamic Memory Allocation: malloc/free vs new/delete & Dangling Pointers",
          "Comparative Analysis: Arrays vs Linked Lists (Time & Space Trade-offs)"
        ],
        "explanations": {
          "beginner": "A Linked List is a linear collection of data elements called 'nodes', where linear order is determined not by physical memory addresses, but by pointers connecting each node to the next. In a Singly Linked List, each node holds data and a pointer to the next node (`next`). The first node is the 'head', and the last node points to `NULL`. Unlike arrays, linked lists can grow or shrink dynamically without requiring contiguous memory.",
          "intermediate": "Doubly Linked Lists (DLL) add a `prev` pointer to each node, enabling bidirectional traversal and O(1) deletion given a pointer to the target node. Circular Linked Lists loop the last node back to the head node (`last->next = head`), making them ideal for continuous cyclic processes like round-robin CPU scheduling. Memory overhead is higher than arrays due to pointer storage (4 or 8 bytes per node).",
          "advanced": "A Generalized Linked List (GLL) is a list where each element is either an atom (single value) or another sublist: `L = (a1, a2, ..., an)`. GLLs represent multivariate polynomials, set hierarchies, and LISP expressions. When implementing polynomial addition with linked lists, terms are sorted by descending exponents; identical exponents add coefficients, while distinct exponents append directly in O(m + n) time."
        },
        "caseStudy": "Music Streaming Playlist Management: A music app requires smooth playback where users can skip forward to the next song, return to the previous track, insert tracks anywhere in the queue, and loop the playlist indefinitely. A Circular Doubly Linked List perfectly implements this with O(1) track insertion/removal, instant bidirectional navigation, and seamless loop playback.",
        "formulas": [
          "Singly Node Size = sizeof(data) + sizeof(Node*)",
          "Doubly Node Size = sizeof(data) + 2 * sizeof(Node*)",
          "Circular LL Termination: pointer->next == head"
        ],
        "vivaQuestions": [
          {
            "q": "What is the primary advantage of a linked list over a dynamic array (like std::vector)?",
            "a": "Linked lists provide O(1) insertions and deletions at known positions without shifting subsequent elements, and they do not require contiguous memory blocks."
          },
          {
            "q": "What is a Generalized Linked List (GLL)?",
            "a": "A GLL is an extension of linked lists where elements can be either an atomic data value or a pointer to another generalized sublist, represented with flag, tag, and union structures."
          },
          {
            "q": "What is a memory leak in linked lists?",
            "a": "A memory leak occurs when a node is removed or unlinked from the list without freeing its heap-allocated memory, making that memory unreachable yet unclaimable by the operating system."
          }
        ],
        "example": "Think of a scavenger hunt: each clue gives you some information and the address of where to find the next clue. You cannot jump directly to clue #5 without following clues 1 through 4. That is exactly how singly linked list traversal works.",
        "codeExample": "// Singly Linked List Insertion, Deletion and Traversal in C++\n#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nclass LinkedList {\npublic:\n    Node* head;\n    LinkedList() : head(nullptr) {}\n\n    void insertHead(int val) {\n        Node* newNode = new Node(val);\n        newNode->next = head;\n        head = newNode;\n    }\n\n    void deleteValue(int val) {\n        if (!head) return;\n        if (head->data == val) {\n            Node* temp = head;\n            head = head->next;\n            delete temp;\n            return;\n        }\n        Node* curr = head;\n        while (curr->next && curr->next->data != val) curr = curr->next;\n        if (curr->next) {\n            Node* temp = curr->next;\n            curr->next = curr->next->next;\n            delete temp;\n        }\n    }\n\n    void display() {\n        Node* temp = head;\n        while (temp) {\n            cout << temp->data << \" -> \";\n            temp = temp->next;\n        }\n        cout << \"NULL\" << endl;\n    }\n};\n\nint main() {\n    LinkedList list;\n    list.insertHead(30);\n    list.insertHead(20);\n    list.insertHead(10);\n    list.display(); // Output: 10 -> 20 -> 30 -> NULL\n    list.deleteValue(20);\n    list.display(); // Output: 10 -> 30 -> NULL\n    return 0;\n}",
        "pitfalls": [
          "1. Losing the head pointer reference during traversal by writing `head = head->next` instead of using a temporary cursor `temp = head`.",
          "2. Dereferencing `NULL` pointers (Segmentation Fault) by checking `temp->next->data` before verifying that `temp->next != NULL`.",
          "3. In circular linked lists, using `while(temp != NULL)` causes an infinite loop since the tail node points back to head."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "What is the time complexity to insert a new node at the beginning of a singly linked list with n nodes?",
              "options": [
                "O(1)",
                "O(n)",
                "O(log n)",
                "O(n^2)"
              ],
              "answer": 0,
              "explanation": "Inserting at the head requires updating only the new node's next pointer and head reference, taking constant O(1) time.",
              "difficulty": "Beginner"
            },
            {
              "q": "In a Doubly Linked List, how many pointer fields are stored in each individual node?",
              "options": [
                "1",
                "2",
                "3",
                "0"
              ],
              "answer": 1,
              "explanation": "Each node in a doubly linked list holds 2 pointers: one to the `next` node and one to the `prev` node.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the condition that indicates the end of a Circular Singly Linked List during traversal?",
              "options": [
                "temp == NULL",
                "temp->next == head",
                "temp->next == NULL",
                "temp->data == 0"
              ],
              "answer": 1,
              "explanation": "In a circular linked list, the tail node points back to `head`, so `temp->next == head` identifies the cycle boundary.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which data structure is best suited for representing multivariate polynomials where terms contain sub-lists of variables?",
              "options": [
                "Stack",
                "Generalized Linked List (GLL)",
                "Queue",
                "Static Array"
              ],
              "answer": 1,
              "explanation": "Generalized Linked Lists allow nodes to point to sub-lists, directly mapping recursive structures like multivariate polynomials.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the time complexity to access the k-th element in a singly linked list of size n?",
              "options": [
                "O(1)",
                "O(k)",
                "O(n log n)",
                "O(log k)"
              ],
              "answer": 1,
              "explanation": "Linked lists lack random access indexing; accessing the k-th element requires traversing sequentially from head, taking O(k) steps.",
              "difficulty": "Beginner"
            }
          ],
          "short": [
            {
              "q": "Compare arrays and linked lists in terms of memory allocation, random access, and insertion/deletion efficiency.",
              "keywords": [
                "contiguous",
                "random access",
                "dynamic",
                "insert",
                "delete",
                "shift",
                "pointer"
              ],
              "modelAnswer": "Arrays use contiguous memory and provide O(1) random access by index, but require expensive O(n) element shifting for insertions/deletions. Linked lists use non-contiguous heap nodes with pointer overhead, require O(n) sequential traversal to access elements, but achieve O(1) insertions/deletions once the node pointer is known.",
              "explanation": "Address memory layout, indexing speeds, and mutation trade-offs."
            }
          ]
        }
      },
      {
        "id": "dsa-u4-searching-sorting",
        "name": "Unit 4: Searching and Sorting Techniques",
        "unitNumber": 4,
        "hours": 6,
        "subtopics": [
          "Linear Search: Unsorted Arrays & Best/Worst Case Bounds",
          "Binary Search: Divide-and-Conquer on Sorted Arrays (Iterative & Recursive)",
          "Fibonacci Search: Golden Ratio Division using Addition & Subtraction",
          "Quadratic Sorting: Bubble Sort, Selection Sort, and Insertion Sort",
          "Advanced Sorting: Quick Sort (Partitioning, Pivot Selection, Worst-Case Avoidance)",
          "Merge Sort: Divide, Conquer, and Combine (Stable O(n log n))",
          "Heap Sort: Complete Binary Trees, Max-Heapify, and In-Place Sorting",
          "Hashing Concepts: Hash Functions (Division, Mid-Square, Folding)",
          "Collision Resolution: Linear Probing with and without Replacement"
        ],
        "explanations": {
          "beginner": "Searching finds the location of a target value within a collection. Linear search inspects every element sequentially (O(n)). Binary search divides sorted collections in half repeatedly, achieving rapid O(log n) lookups. Sorting arranges elements in ascending or descending order. Elementary sorts like Bubble Sort compare adjacent items, while Insertion Sort builds a sorted section one item at a time.",
          "intermediate": "Advanced sorting algorithms achieve O(n log n) average efficiency: Quick Sort partitions around a pivot, sorting subarrays recursively. Merge Sort splits the array into single-element lists and merges them in sorted order (stable sort). Heap Sort uses a complete binary tree satisfying the heap property (max-heap). Hashing maps keys to table indices using a hash function `h(k) = k % table_size`. When multiple keys hash to the same index, a collision occurs.",
          "advanced": "Fibonacci search divides search ranges using Fibonacci numbers, utilizing only addition and subtraction rather than division/bit-shifts. In open addressing hashing, Linear Probing checks sequential slots `(h(k) + i) % m`. Under 'Linear Probing with Replacement', if a colliding key encounters a slot occupied by an element that belongs to a different hash chain, the occupant is evicted to its secondary position, eliminating clustering and significantly reducing search chain lengths."
        },
        "caseStudy": "E-Commerce Product Catalog Search by Price Range: An online retail store lists 2,000,000 products. When shoppers filter items between $20 and $100, the catalog uses a pre-sorted price index with Binary Search to find the lower and upper bounds in O(log n) time, returning matching inventory in milliseconds rather than scanning millions of rows sequentially.",
        "formulas": [
          "Binary Search Mid: mid = low + (high - low) / 2",
          "Division Hash Function: h(k) = k % TableSize",
          "Linear Probing Address: h(k, i) = (h(k) + i) % TableSize"
        ],
        "vivaQuestions": [
          {
            "q": "Why is Quick Sort often faster in practice than Merge Sort despite having a worst-case of O(n^2)?",
            "a": "Quick Sort operates in-place with excellent CPU cache locality and small constant factors, whereas Merge Sort requires O(n) auxiliary memory for buffer allocations."
          },
          {
            "q": "What is the difference between Linear Probing with and without replacement in hashing?",
            "a": "Without replacement, a colliding key takes the next empty slot without disturbing current occupants. With replacement, if a slot is occupied by an element whose home address is different, that occupant is moved to an alternate slot, keeping primary chain sequences intact."
          },
          {
            "q": "What makes a sorting algorithm 'stable'?",
            "a": "A sorting algorithm is stable if it preserves the relative order of elements that have equal key values (e.g., Merge Sort and Insertion Sort are stable, while Quick Sort and Heap Sort are not)."
          }
        ],
        "example": "Searching for a word in an English dictionary: you do not start at the first page reading every entry (linear search). You open to the middle, check the letter, and discard the entire half where the word cannot exist (binary search).",
        "codeExample": "// Quick Sort and Binary Search Implementation in Python\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid # found at index mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1 # not found\n\ndata = [64, 34, 25, 12, 22, 11, 90]\nsorted_data = quick_sort(data)\nprint(\"Sorted Array:\", sorted_data)\nidx = binary_search(sorted_data, 25)\nprint(\"Index of 25:\", idx) # Output: 3",
        "pitfalls": [
          "1. Calculating `mid = (low + high) / 2` in C/C++/Java can trigger integer overflow for large arrays; use `mid = low + (high - low) / 2`.",
          "2. Performing Binary Search on an unsorted array, which produces incorrect negative or corrupted search results.",
          "3. Choosing the first element as pivot in Quick Sort: on already sorted data, this degrades performance to worst-case O(n^2)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "What is the worst-case time complexity of Quick Sort?",
              "options": [
                "O(n log n)",
                "O(n^2)",
                "O(n)",
                "O(log n)"
              ],
              "answer": 1,
              "explanation": "When the chosen pivot is consistently the smallest or largest element (e.g., sorted array with first element as pivot), Quick Sort degrades to O(n^2).",
              "difficulty": "Beginner"
            },
            {
              "q": "Which of the following sorting algorithms is guaranteed to run in O(n log n) time in all cases (best, average, and worst)?",
              "options": [
                "Quick Sort",
                "Bubble Sort",
                "Merge Sort",
                "Insertion Sort"
              ],
              "answer": 2,
              "explanation": "Merge Sort always divides the array in half and merges sorted halves, guaranteeing O(n log n) across best, average, and worst cases.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the prerequisite condition for applying Binary Search on a dataset?",
              "options": [
                "Elements must be stored in a linked list",
                "The array must be sorted",
                "The array size must be a power of 2",
                "All elements must be positive integers"
              ],
              "answer": 1,
              "explanation": "Binary Search relies on sorted order to eliminate half of the remaining search space on each comparison.",
              "difficulty": "Beginner"
            },
            {
              "q": "In open addressing hashing, what problem occurs when consecutive occupied slots create long continuous blocks?",
              "options": [
                "Secondary Clustering",
                "Primary Clustering",
                "Hash Overflow",
                "Underflow"
              ],
              "answer": 1,
              "explanation": "Linear probing creates primary clustering: occupied slots group together, increasing average search time for subsequent keys.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the time complexity of building a Max-Heap from an unsorted array of n elements?",
              "options": [
                "O(n log n)",
                "O(n)",
                "O(n^2)",
                "O(log n)"
              ],
              "answer": 1,
              "explanation": "Bottom-up heap construction (Floyd's algorithm) builds a heap in linear O(n) time, not O(n log n).",
              "difficulty": "Advanced"
            }
          ],
          "short": [
            {
              "q": "Explain the difference between Quick Sort and Merge Sort in terms of algorithmic strategy, stability, and auxiliary memory.",
              "keywords": [
                "divide and conquer",
                "pivot",
                "merge",
                "stable",
                "auxiliary",
                "in-place",
                "memory"
              ],
              "modelAnswer": "Both use Divide and Conquer. Quick Sort partitions around a pivot in-place (O(1) extra space, unstable, O(n^2) worst case). Merge Sort divides into equal halves, requires O(n) auxiliary memory for merging, is strictly stable, and guarantees O(n log n) worst-case time.",
              "explanation": "Focus on in-place partitioning vs auxiliary merging, stability, and worst-case bounds."
            }
          ]
        }
      },
      {
        "id": "dsa-u5-trees",
        "name": "Unit 5: Trees",
        "unitNumber": 5,
        "hours": 8,
        "subtopics": [
          "Tree Terminology: Root, Node, Edge, Degree, Depth, Height, and Level",
          "Binary Tree Properties: Maximum Nodes per Level & Full vs Complete Trees",
          "Representations of Binary Trees: Array-based Sequential vs Linked Pointer",
          "Binary Tree Traversals: In-Order (LDR), Pre-Order (DLR), Post-Order (LRD)",
          "Expression Trees: Construction from Postfix and Evaluation",
          "Binary Search Tree (BST): Definition, Insertion, Deletion (3 Cases), and Search",
          "Optimal Binary Search Tree (OBST) Concepts",
          "AVL Tree Fundamentals: Balance Factor (-1, 0, +1)",
          "AVL Rotations: Single (LL, RR) and Double (LR, RL) Rebalancing"
        ],
        "explanations": {
          "beginner": "A Tree is a non-linear, hierarchical data structure composed of nodes connected by edges. The topmost node is the 'Root'. Nodes without children are 'Leaves'. A Binary Tree restricts each node to at most two children: 'Left Child' and 'Right Child'. In-order traversal visits Left subtree, Root node, then Right subtree. In a Binary Search Tree (BST), every node to the left is smaller than the parent, and every node to the right is larger.",
          "intermediate": "Deleting a node in a BST involves three cases: (1) Leaf node (simply remove), (2) Node with one child (bypass to child), (3) Node with two children (replace with In-order Successor or Predecessor, then delete that node). If insertions occur in sorted order, a regular BST degrades into a skewed linked list with O(n) operations. An AVL Tree is a self-balancing BST where the height difference (Balance Factor = height(left) - height(right)) between left and right subtrees never exceeds ±1.",
          "advanced": "When an AVL tree becomes unbalanced after insertion or deletion (|BF| > 1), one of four rotations restores equilibrium in O(1) time: Single Left-Left (LL), Single Right-Right (RR), Double Left-Right (LR), or Double Right-Left (RL). An Optimal Binary Search Tree (OBST) uses dynamic programming to minimize total search cost based on access probabilities of successful and unsuccessful search keys."
        },
        "caseStudy": "Organizational Hierarchy of an Engineering College: A college management system represents its administration as a tree: the Principal is the Root node; Deans are internal branch nodes; Heads of Departments (HODs) are child nodes; faculty and lab assistants form leaf nodes. This hierarchical representation enables recursive traversal for reporting structures and role-based access permissions.",
        "formulas": [
          "Max nodes at level i of binary tree: 2^i (level 0 is root)",
          "Max nodes in binary tree of height h: 2^(h+1) - 1",
          "AVL Balance Factor: BF(node) = height(left_subtree) - height(right_subtree)",
          "Valid AVL Balance Factor: BF in {-1, 0, +1}"
        ],
        "vivaQuestions": [
          {
            "q": "What is the In-order traversal property of a Binary Search Tree?",
            "a": "The In-order traversal (Left, Root, Right) of any valid Binary Search Tree always outputs keys in strictly ascending sorted order."
          },
          {
            "q": "What are the four rotation types used to balance an AVL tree?",
            "a": "LL (Single Right Rotation), RR (Single Left Rotation), LR (Left Rotation on child followed by Right Rotation on parent), and RL (Right Rotation on child followed by Left Rotation on parent)."
          },
          {
            "q": "How do you delete a node with two children from a BST?",
            "a": "Find the node's In-order Successor (smallest value in right subtree) or In-order Predecessor (largest value in left subtree), copy its value into the target node, and recursively delete the successor/predecessor node."
          }
        ],
        "example": "Consider a computer's file system: the C: drive is the root folder. Inside it are subfolders (Windows, Users, Program Files), and inside those are individual files (leaves). Searching or moving through folders mirrors hierarchical tree traversal.",
        "codeExample": "// Binary Search Tree (BST) Insertion and Inorder Traversal in C++\n#include <iostream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* insertBST(TreeNode* root, int key) {\n    if (!root) return new TreeNode(key);\n    if (key < root->val) root->left = insertBST(root->left, key);\n    else if (key > root->val) root->right = insertBST(root->right, key);\n    return root;\n}\n\nvoid inorder(TreeNode* root) {\n    if (!root) return;\n    inorder(root->left);\n    cout << root->val << \" \"; // Always prints sorted order\n    inorder(root->right);\n}\n\nint main() {\n    TreeNode* root = nullptr;\n    int keys[] = {50, 30, 20, 40, 70, 60, 80};\n    for (int k : keys) root = insertBST(root, k);\n    cout << \"BST Inorder Traversal (Sorted): \";\n    inorder(root); // Output: 20 30 40 50 60 70 80\n    cout << endl;\n    return 0;\n}",
        "pitfalls": [
          "1. Assuming all binary trees are balanced: inserting sorted data (1, 2, 3, 4, 5) into a BST creates a skewed tree of height n with O(n) search time.",
          "2. In AVL rotations, forgetting that double rotation (LR) requires rotating the left child left first, then rotating the root right.",
          "3. Confusing tree depth (number of edges from root to node) with tree height (number of edges on longest downward path to a leaf)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "What is the In-Order traversal order of a Binary Tree?",
              "options": [
                "Root, Left, Right",
                "Left, Root, Right",
                "Left, Right, Root",
                "Right, Root, Left"
              ],
              "answer": 1,
              "explanation": "In-Order traversal follows the sequence: Left Subtree -> Root Node -> Right Subtree (LDR).",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the maximum number of nodes in a binary tree of height h (where a tree with a single root node has height 0)?",
              "options": [
                "2^h",
                "2^(h+1) - 1",
                "2h + 1",
                "h^2"
              ],
              "answer": 1,
              "explanation": "A complete binary tree of height h contains sum(2^i for i=0 to h) = 2^(h+1) - 1 nodes.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the valid range of the Balance Factor for any node in an AVL tree?",
              "options": [
                "Any positive number",
                "{-1, 0, 1}",
                "{-2, 0, 2}",
                "{0, 1}"
              ],
              "answer": 1,
              "explanation": "An AVL tree guarantees that for every node, |height(left) - height(right)| <= 1, meaning Balance Factor is in {-1, 0, 1}.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which rotation is required when a new node is inserted into the right subtree of the left child of an unbalanced node?",
              "options": [
                "LL Rotation",
                "RR Rotation",
                "LR Rotation",
                "RL Rotation"
              ],
              "answer": 2,
              "explanation": "Left-Right (LR) imbalance requires a double rotation: left rotation on left child, followed by right rotation on parent.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the worst-case search time complexity in a self-balancing AVL Tree with n nodes?",
              "options": [
                "O(n)",
                "O(log n)",
                "O(n log n)",
                "O(1)"
              ],
              "answer": 1,
              "explanation": "Because an AVL tree strictly balances its height to O(log n), searches never exceed O(log n) even in the worst case.",
              "difficulty": "Intermediate"
            }
          ],
          "short": [
            {
              "q": "Explain the 3 cases encountered when deleting a node from a Binary Search Tree (BST).",
              "keywords": [
                "leaf",
                "one child",
                "two children",
                "successor",
                "predecessor",
                "inorder"
              ],
              "modelAnswer": "Case 1 (Leaf Node): Node has 0 children; directly delete and set parent pointer to null. Case 2 (Single Child): Node has 1 child; bypass target node by linking its parent directly to its child. Case 3 (Two Children): Find In-order Successor (minimum in right subtree), copy its value into the target node, then delete the successor node.",
              "explanation": "Must address 0, 1, and 2 children cases with in-order successor replacement."
            }
          ]
        }
      },
      {
        "id": "dsa-u6-graphs",
        "name": "Unit 6: Graphs",
        "unitNumber": 6,
        "hours": 7,
        "subtopics": [
          "Graph Definitions: Vertices, Edges, Directed vs Undirected, Weighted Graphs",
          "Graph Representations: Adjacency Matrix vs Adjacency List (Space & Density Analysis)",
          "Breadth First Search (BFS): Queue-based Traversal & Level-Order Discovery",
          "Depth First Search (DFS): Stack/Recursion-based Traversal & Backtracking",
          "Minimum Spanning Tree (MST): Cut Property & Cycle Property",
          "Kruskal's Algorithm: Greedy Edge Sorting & Disjoint Set Union (DSU)",
          "Prim's Algorithm: Growing Tree from Cut with Priority Queue",
          "Single-Source Shortest Path: Dijkstra's Algorithm (Greedy Relaxation)",
          "All-Pairs Shortest Path: Floyd-Warshall Algorithm (Transitive Closure)"
        ],
        "explanations": {
          "beginner": "A Graph G = (V, E) consists of a set of Vertices (nodes) and Edges (connections). Graphs model networks like roads, electrical grids, and social connections. In an undirected graph, connections are two-way; in a directed graph (digraph), edges point one-way. Breadth First Search (BFS) explores all neighbors level-by-level using a Queue. Depth First Search (DFS) dives deep along a branch until it hits a dead end, then backtracks using a Stack or recursion.",
          "intermediate": "An Adjacency Matrix uses an |V| x |V| 2D array, consuming O(V^2) memory—ideal for dense graphs where checking edge existence is O(1). An Adjacency List uses an array of linked lists consuming O(V + E) space—optimal for sparse real-world networks. A Spanning Tree of a connected graph is a subgraph containing all vertices with exactly |V| - 1 edges and no cycles. A Minimum Spanning Tree (MST) minimizes total edge weight.",
          "advanced": "Kruskal's algorithm finds an MST by sorting edges and using Disjoint Set Union (DSU) with path compression in O(E log E) time. Prim's algorithm grows a single tree from an arbitrary start node using a min-heap in O(E log V). Dijkstra's algorithm finds the shortest paths from a single source to all vertices on non-negative weighted graphs using edge relaxation: `if (dist[u] + weight < dist[v]) dist[v] = dist[u] + weight`. Floyd-Warshall computes shortest paths between all vertex pairs in O(V^3) using dynamic programming."
        },
        "caseStudy": "Google Maps Route Navigation & Traffic Optimization: Road intersections represent vertices and roads represent edges weighted by travel time. When calculating the fastest route between Chandwad and Pune, the navigation engine executes Dijkstra's / A* shortest path algorithm across the road graph, dynamically relaxing edge weights based on real-time traffic sensor data.",
        "formulas": [
          "Number of edges in MST: |E_mst| = |V| - 1",
          "Dijkstra Edge Relaxation: if (d[u] + w(u,v) < d[v]) d[v] = d[u] + w(u,v)",
          "Floyd-Warshall DP: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])"
        ],
        "vivaQuestions": [
          {
            "q": "What is the difference between Prim's and Kruskal's MST algorithms?",
            "a": "Prim's grows a single connected tree vertex-by-vertex using a priority queue, making it faster for dense graphs. Kruskal's sorts all edges globally and adds them one-by-one using Disjoint Set Union (DSU) to avoid cycles, performing better on sparse graphs."
          },
          {
            "q": "Why does Dijkstra's algorithm fail on graphs with negative edge weights?",
            "a": "Dijkstra assumes that once a vertex is marked visited and extracted from the priority queue, its shortest distance is finalized. Negative edge weights can yield a shorter path later, violating this greedy premise; the Bellman-Ford algorithm must be used instead."
          },
          {
            "q": "What is the space complexity of an Adjacency Matrix vs an Adjacency List?",
            "a": "Adjacency Matrix requires O(V^2) space regardless of edges. Adjacency List requires O(V + E) space for directed graphs and O(V + 2E) for undirected graphs, saving massive memory for sparse networks."
          }
        ],
        "example": "Social Networks (like LinkedIn or Instagram): users are vertices. A connection or follow is an edge. Finding '2nd-degree connections' (friends of friends) is solved directly by running Breadth First Search (BFS) starting from your profile to depth 2.",
        "codeExample": "# Dijkstra's Shortest Path Algorithm in Python using heapq\nimport heapq\n\ndef dijkstra(graph, start):\n    distances = {node: float('inf') for node in graph}\n    distances[start] = 0\n    pq = [(0, start)] # (distance, node)\n\n    while pq:\n        curr_dist, curr_node = heapq.heappop(pq)\n        if curr_dist > distances[curr_node]:\n            continue\n        for neighbor, weight in graph[curr_node].items():\n            distance = curr_dist + weight\n            if distance < distances[neighbor]:\n                distances[neighbor] = distance\n                heapq.heappush(pq, (distance, neighbor))\n\n    return distances\n\n# Graph represented as Adjacency List\ngraph = {\n    'A': {'B': 4, 'C': 2},\n    'B': {'A': 4, 'C': 1, 'D': 5},\n    'C': {'A': 2, 'B': 1, 'D': 8, 'E': 10},\n    'D': {'B': 5, 'C': 8, 'E': 2},\n    'E': {'C': 10, 'D': 2}\n}\n\nshortest_paths = dijkstra(graph, 'A')\nprint(\"Shortest distances from node A:\")\nfor node, d in shortest_paths.items():\n    print(f\"To {node}: {d}\") # Output: A:0, C:2, B:3, D:8, E:10",
        "pitfalls": [
          "1. Using Dijkstra's algorithm when negative weight edges exist: it will return suboptimal paths or loop infinitely without error flags.",
          "2. Forgetting to mark nodes as 'visited' in BFS/DFS, causing infinite loops in cyclic graphs.",
          "3. In Kruskal's algorithm, attempting to check for cycles with DFS instead of Disjoint Set Union (DSU), resulting in O(E * V) runtime instead of O(E log E)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which data structure is typically used to implement Breadth First Search (BFS) on a graph?",
              "options": [
                "Stack",
                "Queue",
                "Binary Heap",
                "Hash Table"
              ],
              "answer": 1,
              "explanation": "BFS discovers nodes level-by-level using a FIFO Queue to ensure all immediate neighbors are visited first.",
              "difficulty": "Beginner"
            },
            {
              "q": "How many edges are present in a Minimum Spanning Tree of a connected graph with V vertices?",
              "options": [
                "V",
                "V - 1",
                "V + 1",
                "2V"
              ],
              "answer": 1,
              "explanation": "Any spanning tree of a graph with V vertices connects all vertices with no cycles, containing exactly V - 1 edges.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the time complexity of Dijkstra's algorithm implemented with a min-priority queue (binary heap)?",
              "options": [
                "O(V^2)",
                "O((V + E) log V)",
                "O(V * E)",
                "O(V^3)"
              ],
              "answer": 1,
              "explanation": "Extract-min takes O(log V) for V vertices and edge relaxations take O(E log V), giving total time O((V + E) log V).",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which algorithm is capable of computing all-pairs shortest paths on a weighted graph using dynamic programming?",
              "options": [
                "Prim's Algorithm",
                "Floyd-Warshall Algorithm",
                "Kruskal's Algorithm",
                "Breadth First Search"
              ],
              "answer": 1,
              "explanation": "Floyd-Warshall uses a 3-nested loop dynamic programming formula to compute shortest paths between all pairs in O(V^3) time.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What data structure enables Kruskal's algorithm to perform cycle detection in near constant amortized time?",
              "options": [
                "Adjacency Matrix",
                "Disjoint Set Union (DSU) with Path Compression",
                "Balanced AVL Tree",
                "Circular Queue"
              ],
              "answer": 1,
              "explanation": "DSU with union by rank and path compression checks and unites sets in O(α(V)) time, where α is the inverse Ackermann function.",
              "difficulty": "Advanced"
            }
          ],
          "short": [
            {
              "q": "State the relaxation condition in Dijkstra's algorithm and explain how edge weights determine shortest paths.",
              "keywords": [
                "relaxation",
                "dist",
                "weight",
                "shorter",
                "greedy",
                "update"
              ],
              "modelAnswer": "Edge relaxation examines an edge (u, v) with weight w. If the known distance to u plus weight w is strictly less than the currently recorded distance to v (`dist[u] + w < dist[v]`), `dist[v]` is updated to `dist[u] + w`. This greedy update ensures that paths continually settle toward minimum cost.",
              "explanation": "State the mathematical inequality and explain its iterative convergence toward the shortest path."
            }
          ]
        }
      }
    ]
  },
  "database management system": {
    "displayName": "Database Management System",
    "courseCode": "24-PCC-AD-2-07",
    "semester": "Semester-IV",
    "credits": 3,
    "topics": [
      {
        "id": "dbms-u1-intro-er",
        "name": "Unit 1: Introduction to DBMS & Data Modeling",
        "unitNumber": 1,
        "hours": 7,
        "subtopics": [
          "Database System Concepts, Applications, and Limitations of File Systems",
          "Three-Schema Architecture & Data Independence (Logical vs Physical)",
          "Data Models: Hierarchical, Network, Relational, and Object-Oriented",
          "Entity-Relationship (ER) Modeling: Entities, Attributes (Simple, Composite, Multi-valued, Derived)",
          "Relationship Types, Degree, Structural Constraints, and Cardinality Ratios (1:1, 1:N, M:N)",
          "Keys: Super Key, Candidate Key, Primary Key, Foreign Key, and Composite Key",
          "Extended ER (EER) Features: Specialization, Generalization, Aggregation, and Category (Union Type)",
          "Converting ER and EER Diagrams into Relational Schema Tables"
        ],
        "explanations": {
          "beginner": "A Database Management System (DBMS) is software that manages data securely and efficiently, overcoming file system issues like data redundancy, inconsistency, and unauthorized access. The 3-schema architecture separates the Physical view (how bytes are stored on disk), Conceptual view (what entities and relationships exist), and External view (what individual users see). Data independence ensures changing storage structures on disk doesn't break user application queries.",
          "intermediate": "Entity-Relationship (ER) modeling visually represents real-world systems. An Entity is a distinguishable object (e.g., Student), Attributes describe its properties (RollNo, Name, CGPA), and Relationships connect entities. Keys establish identity: a Candidate Key uniquely identifies tuples; one is chosen as the Primary Key. Foreign Keys enforce referential integrity between tables. Extended ER (EER) introduces object-oriented concepts like Specialization (top-down breakdown, e.g., Employee specialized into Engineer and Manager) and Generalization (bottom-up synthesis).",
          "advanced": "Converting ER/EER to relational tables follows strict algorithmic rules: Strong entities become tables with primary keys; Weak entities include the owner's primary key as part of their composite key; 1:N relationships place the 1-side's primary key as a foreign key on the N-side table; M:N relationships require an independent associative/junction table containing foreign keys from both participating entities plus any relationship attributes."
        },
        "caseStudy": "Hospital Management Database ER Modeling: Designing a healthcare database tracking Patients, Doctors, Appointments, and Prescriptions. Doctors and Patients form an M:N relationship resolved through an 'Appointment' junction table with date, time, and diagnosis attributes. Specialized subtypes (Inpatient vs Outpatient) inherit base Patient attributes while tracking room numbers or consultation fees.",
        "formulas": [
          "Relational Degree: Number of attributes (columns) in a relation",
          "Relational Cardinality: Number of tuples (rows) in a relation",
          "Composite Key = Attribute_1 + Attribute_2 + ... + Attribute_k",
          "Foreign Key Rule: FK value in child table must match a PK value in parent table or be NULL"
        ],
        "vivaQuestions": [
          {
            "q": "What is the difference between physical and logical data independence?",
            "a": "Physical data independence allows modifying physical storage devices, file organizations, or indexes without altering the conceptual schema. Logical data independence allows modifying conceptual schema (adding columns, splitting tables) without rewriting external views or user queries."
          },
          {
            "q": "How is a Many-to-Many (M:N) relationship mapped into relational tables?",
            "a": "An M:N relationship cannot be represented with a foreign key in either entity table alone. It requires a separate junction (cross-reference) table whose primary key is composed of the primary keys of both participating entity tables."
          },
          {
            "q": "What is a weak entity and how is it identified in an ER diagram?",
            "a": "A weak entity lacks a sufficient primary key of its own and depends on an identifying strong entity for existence. It is shown with a double rectangle, its identifying relationship has a double diamond, and its partial discriminator is underlined with a dashed line."
          }
        ],
        "example": "In a college library: a 'Book' is an entity, 'ISBN' is the primary key. A 'Student' is an entity, 'RollNo' is the primary key. 'Borrow' is a relationship connecting them with attributes 'IssueDate' and 'DueDate'. That ER model maps cleanly into tables: Students, Books, and BorrowRecords.",
        "codeExample": "-- Relational Schema Mapping with Foreign Keys in SQL\nCREATE TABLE Department (\n    dept_id INT PRIMARY KEY,\n    dept_name VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE Student (\n    roll_no INT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    cgpa DECIMAL(3, 2) CHECK (cgpa >= 0.0 AND cgpa <= 10.0),\n    dept_id INT,\n    FOREIGN KEY (dept_id) REFERENCES Department(dept_id) ON DELETE SET NULL\n);\n\nCREATE TABLE Course (\n    course_code VARCHAR(15) PRIMARY KEY,\n    course_name VARCHAR(100) NOT NULL,\n    credits INT CHECK (credits > 0)\n);\n\n-- M:N Relationship resolved via Enrollment Junction Table\nCREATE TABLE Enrollment (\n    roll_no INT,\n    course_code VARCHAR(15),\n    enrollment_date DATE NOT NULL,\n    grade CHAR(2),\n    PRIMARY KEY (roll_no, course_code),\n    FOREIGN KEY (roll_no) REFERENCES Student(roll_no) ON DELETE CASCADE,\n    FOREIGN KEY (course_code) REFERENCES Course(course_code) ON DELETE CASCADE\n);",
        "pitfalls": [
          "1. Designing an M:N relationship by placing comma-separated IDs inside a single column, violating First Normal Form (1NF).",
          "2. Forgetting to specify cascading delete rules (`ON DELETE CASCADE` vs `ON DELETE SET NULL`) on foreign keys, causing orphan child records.",
          "3. Confusing derived attributes (like Age, which can be computed from DateOfBirth) with stored attributes."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which level of database architecture describes how data is physically stored on magnetic disks or SSDs?",
              "options": [
                "External View",
                "Conceptual Level",
                "Internal / Physical Level",
                "User Level"
              ],
              "answer": 2,
              "explanation": "The Internal/Physical level describes low-level data structures, disk allocation, and access paths.",
              "difficulty": "Beginner"
            },
            {
              "q": "How is a Many-to-Many (M:N) relationship between two entities represented in a relational database?",
              "options": [
                "Adding a foreign key to the first table",
                "Adding a foreign key to the second table",
                "Creating a new junction table containing foreign keys of both entities",
                "Combining both tables into a single table with duplicate rows"
              ],
              "answer": 2,
              "explanation": "An M:N relationship requires an associative (junction) table containing foreign keys referencing the primary keys of both related tables.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is an attribute called if its value can be derived from other existing stored attributes (e.g., Age from DateOfBirth)?",
              "options": [
                "Composite Attribute",
                "Derived Attribute",
                "Multivalued Attribute",
                "Key Attribute"
              ],
              "answer": 1,
              "explanation": "A derived attribute is calculated on demand from other attributes and is represented with a dashed ellipse in ER diagrams.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which ER model concept represents a bottom-up process of synthesizing multiple entity sets with common features into a generalized superclass?",
              "options": [
                "Specialization",
                "Aggregation",
                "Generalization",
                "Normalization"
              ],
              "answer": 2,
              "explanation": "Generalization is the bottom-up process of extracting shared attributes across multiple subclasses into a single generalized superclass.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What constitutes the primary key of a weak entity set in a relational schema?",
              "options": [
                "Only its own partial discriminator",
                "The primary key of the identifying owner entity plus its partial discriminator",
                "A newly generated random integer only",
                "The foreign key of any related table"
              ],
              "answer": 1,
              "explanation": "A weak entity's primary key is formed by combining the primary key of its identifying owner entity with its own partial discriminator attribute.",
              "difficulty": "Intermediate"
            }
          ],
          "short": [
            {
              "q": "Explain the 3-schema architecture of a DBMS and explain why data independence is important.",
              "keywords": [
                "external",
                "conceptual",
                "internal",
                "physical",
                "logical",
                "independence",
                "schema"
              ],
              "modelAnswer": "The ANSI-SPARC 3-schema architecture defines External (user views), Conceptual (logical entity and constraint structure), and Internal (physical disk storage layout) levels. Data independence isolates these layers: physical independence allows changing storage without altering the conceptual schema; logical independence allows changing table structures without rewriting user views or application code.",
              "explanation": "Cover External, Conceptual, and Internal levels and define both physical and logical data independence."
            }
          ]
        }
      },
      {
        "id": "dbms-u2-relational-norm",
        "name": "Unit 2: Relational Database Design & Normalization",
        "unitNumber": 2,
        "hours": 8,
        "subtopics": [
          "Relational Model Concepts: Relations, Tuples, Attributes, Domains, and Schemas",
          "Integrity Constraints: Domain, Entity Integrity (PK not null), Referential Integrity, Enterprise Rules",
          "Database Design Anomalies: Insertion, Deletion, and Modification/Update Anomalies",
          "Functional Dependencies (FD): Definition, Trivial vs Non-trivial FDs",
          "Armstrong's Axioms (Reflexivity, Augmentation, Transitivity) & Secondary Inference Rules",
          "Attribute Closure Algorithm & Finding Candidate Keys of a Relation",
          "First Normal Form (1NF: Atomicity) and Second Normal Form (2NF: No Partial Dependencies)",
          "Third Normal Form (3NF: No Transitive Dependencies) and Boyce-Codd Normal Form (BCNF)",
          "Decomposition Properties: Lossless-Join Decomposition & Dependency Preservation"
        ],
        "explanations": {
          "beginner": "Normalization is the systematic process of organizing database tables to reduce redundant data and eliminate anomalies. An anomaly is an error that occurs during database updates: Insertion anomaly (unable to record data without missing mandatory fields), Deletion anomaly (deleting one piece of data accidentally wipes out unrelated data), and Update anomaly (updating an address requires modifying hundreds of redundant rows).",
          "intermediate": "A Functional Dependency X -> Y means if two tuples agree on attribute X, they must also agree on attribute Y. Attribute Closure X+ is the set of all attributes functionally determined by X. If X+ includes all attributes of the relation R, then X is a Super Key. A minimal super key is a Candidate Key. 1NF mandates that all attribute values are atomic (no repeating groups or comma-separated lists). 2NF requires 1NF and guarantees that no non-prime attribute is partially dependent on any candidate key.",
          "advanced": "3NF requires that for every non-trivial FD X -> Y, either X is a super key or Y is a prime attribute (eliminating transitive dependencies). Boyce-Codd Normal Form (BCNF) is a stricter variant requiring that for every non-trivial FD X -> Y, X must strictly be a super key. A decomposition into sub-relations R1 and R2 is Lossless-Join if and only if R1 ∩ R2 forms a super key of R1 or R2. A decomposition is Dependency-Preserving if all original functional dependencies can be enforced within individual decomposed tables without expensive multi-table joins."
        },
        "caseStudy": "Normalizing Student Examination Records: A raw university marksheet spreadsheet contains (RollNo, StudentName, CourseCode, CourseName, Instructor, InstructorOffice, Marks). Storing this in one flat table causes redundant instructor names, an update anomaly if an instructor moves offices, and a deletion anomaly if the last student drops a course. Normalizing to 3NF yields Student(RollNo, StudentName), Course(CourseCode, CourseName, Instructor), Instructor(Instructor, InstructorOffice), and Marks(RollNo, CourseCode, Marks), eliminating all anomalies.",
        "formulas": [
          "1NF: Atomic values only (no sets/lists)",
          "2NF: 1NF + No partial dependencies (No non-prime dependent on subset of candidate key)",
          "3NF: For all X -> Y, X is Super Key OR Y is Prime Attribute",
          "BCNF: For all X -> Y, X must be a Super Key",
          "Lossless Join Test: (R1 ∩ R2) -> R1 OR (R1 ∩ R2) -> R2"
        ],
        "vivaQuestions": [
          {
            "q": "What is the key difference between 3NF and BCNF?",
            "a": "In 3NF, for any FD X -> Y, Y can be a prime attribute even if X is not a super key. In BCNF, this exception is removed: X must strictly be a super key for every non-trivial dependency."
          },
          {
            "q": "What is a partial dependency and which normal form eliminates it?",
            "a": "A partial dependency occurs when a non-prime attribute depends on only a proper subset of a composite candidate key. Second Normal Form (2NF) strictly eliminates partial dependencies."
          },
          {
            "q": "Can every relational schema be decomposed into BCNF while preserving all functional dependencies?",
            "a": "No. While every schema can be decomposed into 3NF with both lossless join and dependency preservation, decomposing into BCNF guarantees lossless join but may not always preserve all original dependencies."
          }
        ],
        "example": "If a table stores (StudentID, CourseID, StudentAddress), StudentAddress depends only on StudentID, not the full composite key (StudentID, CourseID). That is a partial dependency violating 2NF. Separating it into Student(StudentID, StudentAddress) and Enrollment(StudentID, CourseID) fixes 2NF.",
        "codeExample": "-- SQL Schema Refactoring: From Unnormalized to 3NF/BCNF\n-- UNNORMALIZED TABLE (Violates 2NF and 3NF)\n-- StudentGrades(roll_no, student_name, course_code, course_name, instructor_name, instructor_room, marks)\n\n-- NORMALIZED INTO BCNF TABLES:\nCREATE TABLE Students (\n    roll_no INT PRIMARY KEY,\n    student_name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE Instructors (\n    instructor_id INT PRIMARY KEY,\n    instructor_name VARCHAR(100) NOT NULL,\n    office_room VARCHAR(20)\n);\n\nCREATE TABLE Courses (\n    course_code VARCHAR(15) PRIMARY KEY,\n    course_name VARCHAR(100) NOT NULL,\n    instructor_id INT,\n    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)\n);\n\nCREATE TABLE StudentGrades (\n    roll_no INT,\n    course_code VARCHAR(15),\n    marks INT CHECK (marks >= 0 AND marks <= 100),\n    PRIMARY KEY (roll_no, course_code),\n    FOREIGN KEY (roll_no) REFERENCES Students(roll_no),\n    FOREIGN KEY (course_code) REFERENCES Courses(course_code)\n);",
        "pitfalls": [
          "1. Forgetting that 2NF only applies when the primary key is composite: if the primary key is a single attribute, the table is automatically in 2NF if it is in 1NF.",
          "2. Confusing a Candidate Key (minimal super key) with a Super Key (any key containing a candidate key).",
          "3. Performing lossy decompositions where tables cannot be rejoined using natural join without generating spurious/fake tuples."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which normal form requires that all attribute values in every tuple must be atomic and non-divisible?",
              "options": [
                "First Normal Form (1NF)",
                "Second Normal Form (2NF)",
                "Third Normal Form (3NF)",
                "Boyce-Codd Normal Form (BCNF)"
              ],
              "answer": 0,
              "explanation": "1NF requires that domains of attributes contain only atomic (indivisible) values with no repeating groups.",
              "difficulty": "Beginner"
            },
            {
              "q": "A table is in 1NF. What additional condition must be satisfied for it to achieve Second Normal Form (2NF)?",
              "options": [
                "No transitive dependencies",
                "No partial dependencies on candidate keys",
                "Every determinant must be a candidate key",
                "All foreign keys must be non-null"
              ],
              "answer": 1,
              "explanation": "2NF requires that no non-prime attribute is functionally dependent on a proper subset of any candidate key.",
              "difficulty": "Beginner"
            },
            {
              "q": "For relation R(A, B, C) with FD: A -> B and B -> C, what type of dependency exists between A and C?",
              "options": [
                "Partial Dependency",
                "Transitive Dependency",
                "Trivial Dependency",
                "Multivalued Dependency"
              ],
              "answer": 1,
              "explanation": "Since A determines B and B determines non-prime C, A determines C transitively via B, which violates 3NF.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the condition for a decomposition of R into R1 and R2 to be a Lossless-Join Decomposition?",
              "options": [
                "R1 ∪ R2 = R",
                "R1 ∩ R2 -> R1 or R1 ∩ R2 -> R2",
                "R1 and R2 must have the same number of columns",
                "Both tables must be in BCNF"
              ],
              "answer": 1,
              "explanation": "By the lossless-join theorem, the common attributes (R1 ∩ R2) must form a super key for at least one of the decomposed relations.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which normal form guarantees lossless decomposition and dependency preservation, but may still permit transitive dependencies on prime attributes?",
              "options": [
                "1NF",
                "2NF",
                "3NF",
                "BCNF"
              ],
              "answer": 2,
              "explanation": "3NF always allows a decomposition that is both lossless-join and dependency-preserving, unlike BCNF which may sacrifice dependency preservation.",
              "difficulty": "Advanced"
            }
          ],
          "short": [
            {
              "q": "Define Boyce-Codd Normal Form (BCNF) and explain why it is stricter than Third Normal Form (3NF).",
              "keywords": [
                "super key",
                "determinant",
                "prime",
                "transitive",
                "candidate key",
                "dependency"
              ],
              "modelAnswer": "A relation is in BCNF if for every non-trivial functional dependency X -> Y, X is strictly a super key. In 3NF, an exception is permitted where Y can be a prime attribute (part of any candidate key) even if X is not a super key. BCNF disallows this exception, completely eliminating all redundancy caused by functional dependencies.",
              "explanation": "Highlight the determinant condition in BCNF and contrast it with 3NF's prime attribute allowance."
            }
          ]
        }
      },
      {
        "id": "dbms-u3-sql",
        "name": "Unit 3: Structured Query Language (SQL)",
        "unitNumber": 3,
        "hours": 7,
        "subtopics": [
          "Relational Algebra: Select (σ), Project (π), Cartesian Product (×), Joins (⋈), Set Union (∪), Intersection (∩)",
          "SQL Characteristics, Data Types (VARCHAR, NUMERIC, TIMESTAMP, BLOB), and Literals",
          "Data Definition Language (DDL): CREATE, ALTER, DROP, TRUNCATE with Column and Table Constraints",
          "Data Manipulation Language (DML): INSERT, UPDATE, DELETE, and Advanced SELECT Queries",
          "Filtering and Aggregation: WHERE, GROUP BY, HAVING, ORDER BY, and Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)",
          "SQL Joins: Natural Join, Inner Join, Left Outer Join, Right Outer Join, and Full Outer Join",
          "Nested Subqueries (IN, EXISTS, ALL, ANY) and Correlated Subqueries",
          "Database Views: Creating, Updating, and Dropping Views & Materialized Views",
          "Data Control (DCL: GRANT, REVOKE) & Transaction Control (TCL: COMMIT, ROLLBACK, SAVEPOINT)"
        ],
        "explanations": {
          "beginner": "Structured Query Language (SQL) is the standard declarative language for interacting with relational databases. Instead of writing procedural loops, you declare *what* data you want and the database query engine optimizes *how* to fetch it. DDL commands (CREATE, DROP) define table schemas, while DML commands (SELECT, INSERT, UPDATE, DELETE) query and manipulate table rows.",
          "intermediate": "The `WHERE` clause filters individual rows before grouping, while `HAVING` filters aggregated groups after `GROUP BY`. SQL Joins merge rows from multiple tables based on related keys: an `INNER JOIN` returns rows with matches in both tables; `LEFT OUTER JOIN` preserves all rows from the left table even if no right-table match exists. Subqueries are queries nested inside another query; a 'correlated subquery' references columns from the outer query and re-evaluates for each row.",
          "advanced": "Under the hood, SQL maps declarations into procedural Relational Algebra expressions (Selections σ, Projections π, and Joins ⋈). The Cost-Based Optimizer (CBO) evaluates alternate query execution plans using database catalog statistics and B-Tree indexes. TCL commands manage ACID transaction boundaries: `COMMIT` makes changes permanent, `ROLLBACK` undoes operations back to the start or a `SAVEPOINT`. DCL commands (`GRANT`, `REVOKE`) configure role-based access control."
        },
        "caseStudy": "E-Commerce Order Fulfillment & Customer Query System: An online retail platform uses SQL to generate monthly revenue reports. The query joins Customers, Orders, and OrderItems, groups results by product category, filters out categories with less than $50,000 in total sales using a HAVING clause, and sorts high-revenue categories at the top using ORDER BY DESC.",
        "formulas": [
          "Relational Algebra Selection: σ_condition(R)",
          "Relational Algebra Projection: π_attribute_list(R)",
          "Natural Join: R ⋈ S = π_attributes(σ_R.A=S.A(R × S))",
          "Query Execution Order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY"
        ],
        "vivaQuestions": [
          {
            "q": "What is the difference between WHERE and HAVING clauses in SQL?",
            "a": "WHERE filters individual records before grouping and cannot operate directly on aggregate functions. HAVING filters aggregated group results after GROUP BY is applied."
          },
          {
            "q": "What is the difference between TRUNCATE and DELETE in SQL?",
            "a": "DELETE is a DML statement that removes rows one-by-one, logs each deletion, activates DELETE triggers, and can be filtered with a WHERE clause. TRUNCATE is a DDL statement that deallocates entire data pages, runs much faster, cannot be filtered, and resets identity seeds."
          },
          {
            "q": "What is a correlated subquery?",
            "a": "A correlated subquery is a subquery that references attributes from the outer query. It cannot be executed independently because it runs repeatedly once for each tuple evaluated by the outer query."
          }
        ],
        "example": "To find all students with GPA greater than 8.0 who enrolled in 2025: `SELECT name, cgpa FROM Student WHERE cgpa > 8.0 AND enrollment_year = 2025 ORDER BY cgpa DESC;` - this filters, sorts, and displays the exact subset of records instantly.",
        "codeExample": "-- Advanced SQL Queries: Joins, Aggregation, and Correlated Subqueries\n-- 1. Find Total Revenue per Product Category for orders > $1,000\nSELECT \n    c.category_name,\n    COUNT(o.order_id) AS total_orders,\n    SUM(oi.quantity * oi.unit_price) AS total_revenue\nFROM Categories c\nINNER JOIN Products p ON c.category_id = p.category_id\nINNER JOIN OrderItems oi ON p.product_id = oi.product_id\nINNER JOIN Orders o ON oi.order_id = o.order_id\nWHERE o.order_status = 'COMPLETED'\nGROUP BY c.category_name\nHAVING SUM(oi.quantity * oi.unit_price) > 1000.00\nORDER BY total_revenue DESC;\n\n-- 2. Correlated Subquery: Find employees earning more than their department's average\nSELECT emp_name, salary, dept_id\nFROM Employees e1\nWHERE salary > (\n    SELECT AVG(salary)\n    FROM Employees e2\n    WHERE e2.dept_id = e1.dept_id\n);",
        "pitfalls": [
          "1. Using `WHERE` to filter on aggregate functions like `WHERE SUM(marks) > 80`, which triggers an SQL syntax error; you must use `HAVING SUM(marks) > 80`.",
          "2. Omitting the join condition between two tables, resulting in an unintended Cartesian Product (Cross Join) that generates millions of invalid rows.",
          "3. Performing `NULL = NULL` comparisons: in SQL, `NULL = NULL` evaluates to UNKNOWN, not TRUE; you must write `IS NULL` or `IS NOT NULL`."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which SQL clause is used to filter aggregated group results generated by the GROUP BY clause?",
              "options": [
                "WHERE",
                "HAVING",
                "FILTER",
                "ORDER BY"
              ],
              "answer": 1,
              "explanation": "HAVING applies conditions to grouped summaries (e.g. HAVING COUNT(*) > 5), whereas WHERE filters individual rows prior to grouping.",
              "difficulty": "Beginner"
            },
            {
              "q": "What type of join returns all rows from the left table along with matched rows from the right table, filling with NULL where no match exists?",
              "options": [
                "Inner Join",
                "Left Outer Join",
                "Full Outer Join",
                "Cross Join"
              ],
              "answer": 1,
              "explanation": "A Left Outer Join preserves every row from the left relation, padding right-table columns with NULL when join conditions fail.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which of the following is classified as a Data Definition Language (DDL) command in SQL?",
              "options": [
                "SELECT",
                "INSERT",
                "TRUNCATE",
                "UPDATE"
              ],
              "answer": 2,
              "explanation": "TRUNCATE, CREATE, ALTER, and DROP modify table schema structures and data allocations, categorizing them as DDL.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the result of evaluating the condition `NULL = NULL` in SQL standard three-valued logic?",
              "options": [
                "TRUE",
                "FALSE",
                "UNKNOWN",
                "ERROR"
              ],
              "answer": 2,
              "explanation": "In SQL three-valued logic (True, False, Unknown), comparing any value to NULL using '=' yields UNKNOWN; `IS NULL` must be used.",
              "difficulty": "Intermediate"
            },
            {
              "q": "In relational algebra, which fundamental operator corresponds to selecting specified columns and discarding all other attributes?",
              "options": [
                "Selection (σ)",
                "Projection (π)",
                "Cartesian Product (×)",
                "Set Difference (-)"
              ],
              "answer": 1,
              "explanation": "Projection (π) extracts designated columns from a relation while eliminating unwanted attributes and duplicate tuples.",
              "difficulty": "Beginner"
            }
          ],
          "short": [
            {
              "q": "Explain the difference between an INNER JOIN, LEFT OUTER JOIN, and FULL OUTER JOIN with a brief example.",
              "keywords": [
                "inner",
                "left outer",
                "full outer",
                "null",
                "match",
                "unmatched",
                "preserve"
              ],
              "modelAnswer": "An INNER JOIN returns only records where the join key matches in both tables. A LEFT OUTER JOIN returns all records from the left table plus matching records from the right table (filling non-matches with NULL). A FULL OUTER JOIN returns all records from both tables, preserving unmatched rows from both sides with NULL placeholders.",
              "explanation": "Describe how matched and unmatched rows are handled by all three join types."
            }
          ]
        }
      },
      {
        "id": "dbms-u4-plsql",
        "name": "Unit 4: Procedural Language SQL (PL/SQL)",
        "unitNumber": 4,
        "hours": 7,
        "subtopics": [
          "PL/SQL Architecture & Block Structure (DECLARE, BEGIN, EXCEPTION, END)",
          "Variables, Constants, Anchor Types (%TYPE, %ROWTYPE), and Scope",
          "Control Structures: Conditional (IF-THEN-ELSIF, CASE) and Iterative Loops (BASIC, WHILE, FOR)",
          "Cursors in PL/SQL: Implicit Cursors vs Explicit Cursors (OPEN, FETCH, CLOSE)",
          "Cursor Attributes: %FOUND, %NOTFOUND, %ROWCOUNT, and %ISOPEN",
          "Parameterized Cursors and Cursor FOR Loops",
          "Stored Procedures: Syntax, IN, OUT, IN OUT Parameter Modes, and Execution",
          "Stored Functions: Return Types, Deterministic Functions, and Invocation in SQL",
          "Database Triggers: Row-level vs Statement-level, BEFORE vs AFTER, and INSTEAD OF Triggers",
          "Exception Handling: Predefined Exceptions (NO_DATA_FOUND, TOO_MANY_ROWS) & User-Defined Exceptions"
        ],
        "explanations": {
          "beginner": "Standard SQL executes one statement at a time. PL/SQL (Procedural Language extension to SQL) allows writing entire programming blocks with conditional logic (IF/ELSE), loops (WHILE, FOR), variables, and error handling. A PL/SQL block consists of three sections: DECLARE (variables), BEGIN (procedural logic and SQL commands), and EXCEPTION (handling errors).",
          "intermediate": "A Cursor is a pointer to the private memory area (Context Area) allocated by the database to process a SQL statement. Implicit cursors manage single-row queries automatically. Explicit cursors handle multi-row result sets through four lifecycle steps: DECLARE -> OPEN -> FETCH -> CLOSE. Stored Procedures and Functions are precompiled PL/SQL blocks stored directly inside the database catalog, reducing network latency by executing logic on the server.",
          "advanced": "Database Triggers are special stored procedures that fire automatically when specified DDL or DML events occur on a table. BEFORE triggers validate or modify input values before they hit disk; AFTER triggers record audit trails into history tables. Row-level triggers (`FOR EACH ROW`) expose `:OLD` and `:NEW` pseudo-records, enabling row-by-row data change inspection. System and User-Defined exceptions guarantee graceful recovery without leaving open transaction locks."
        },
        "caseStudy": "Automated Banking Balance Validation & Audit Trigger: A bank must record every account withdrawal. A BEFORE UPDATE row-level trigger verifies that `NEW.balance >= 1000` (minimum balance constraint); if violated, it raises an application error. Simultaneously, an AFTER UPDATE trigger automatically logs the AccountNumber, OldBalance, NewBalance, Timestamp, and User into an AuditLog table for fraud compliance.",
        "formulas": [
          "Anchor Type: v_name Students.student_name%TYPE",
          "Cursor Lifecycle: DECLARE -> OPEN -> FETCH -> CLOSE",
          "Row Trigger Pseudo-records: :OLD.column_name and :NEW.column_name"
        ],
        "vivaQuestions": [
          {
            "q": "What is the difference between a Stored Procedure and a Stored Function in PL/SQL?",
            "a": "A Function must always return a value using the RETURN statement and can be embedded directly inside SQL SELECT statements. A Procedure can return zero, one, or multiple values via OUT/IN OUT parameters, but cannot be invoked directly within an SQL expression."
          },
          {
            "q": "What is the difference between a Statement-level trigger and a Row-level trigger?",
            "a": "A Statement-level trigger fires exactly once per SQL statement regardless of how many rows are modified. A Row-level trigger includes the 'FOR EACH ROW' clause and fires once for every individual row affected by the statement."
          },
          {
            "q": "What is the purpose of %ROWTYPE in PL/SQL?",
            "a": "%ROWTYPE provides a record type that represents the complete column structure of a database table or cursor, ensuring variables adapt automatically if table schemas change."
          }
        ],
        "example": "If a payroll system needs to give a 5% bonus to all employees in the IT department: instead of sending 500 individual UPDATE network requests, a single PL/SQL Stored Procedure runs on the database server, looping over the records and updating balances in one optimized step.",
        "codeExample": "-- PL/SQL Stored Procedure and Audit Trigger Example\n-- 1. Stored Procedure with Explicit Cursor to calculate bonuses\nCREATE OR REPLACE PROCEDURE GiveDepartmentBonus(\n    p_dept_id IN NUMBER,\n    p_bonus_percent IN NUMBER\n) AS\n    CURSOR emp_cursor IS\n        SELECT emp_id, salary FROM Employees WHERE dept_id = p_dept_id;\n    v_emp_id Employees.emp_id%TYPE;\n    v_salary Employees.salary%TYPE;\nBEGIN\n    OPEN emp_cursor;\n    LOOP\n        FETCH emp_cursor INTO v_emp_id, v_salary;\n        EXIT WHEN emp_cursor%NOTFOUND;\n        \n        UPDATE Employees \n        SET salary = salary + (salary * (p_bonus_percent / 100))\n        WHERE emp_id = v_emp_id;\n    END LOOP;\n    CLOSE emp_cursor;\n    COMMIT;\nEND;\n/\n\n-- 2. Row-Level BEFORE UPDATE Trigger to enforce minimum balance\nCREATE OR REPLACE TRIGGER CheckMinBalance\nBEFORE UPDATE OF balance ON Accounts\nFOR EACH ROW\nBEGIN\n    IF :NEW.balance < 500 THEN\n        RAISE_APPLICATION_ERROR(-20001, 'Account balance cannot fall below $500 minimum.');\n    END IF;\nEND;\n/",
        "pitfalls": [
          "1. Mutating Table Error (ORA-04091): attempting to query or modify the same table that fired a row-level trigger within that trigger body.",
          "2. Forgetting to close an explicit cursor (`CLOSE cursor_name`), resulting in memory leaks in the database SGA/UGA cursor cache.",
          "3. Omitting the `EXIT WHEN cursor%NOTFOUND` statement inside cursor fetch loops, causing infinite execution loops."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which section of a PL/SQL block is mandatory for the block to be syntactically valid?",
              "options": [
                "DECLARE",
                "BEGIN ... END;",
                "EXCEPTION",
                "HEADER"
              ],
              "answer": 1,
              "explanation": "The executable section enclosed by BEGIN and END; is the only strictly mandatory section in a PL/SQL block.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which cursor attribute returns TRUE if the most recent FETCH statement successfully retrieved a row?",
              "options": [
                "%NOTFOUND",
                "%FOUND",
                "%ROWCOUNT",
                "%ISOPEN"
              ],
              "answer": 1,
              "explanation": "%FOUND evaluates to TRUE if the prior FETCH successfully retrieved a record from the active set.",
              "difficulty": "Beginner"
            },
            {
              "q": "What trigger clause causes a trigger to fire individually for every single row affected by an SQL statement?",
              "options": [
                "INSTEAD OF",
                "FOR EACH ROW",
                "BEFORE EACH",
                "EXECUTE ROW"
              ],
              "answer": 1,
              "explanation": "The 'FOR EACH ROW' clause designates the trigger as a row-level trigger that executes once per affected row.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What pseudo-record in a row-level trigger contains the new attribute value being written during an UPDATE or INSERT statement?",
              "options": [
                ":OLD",
                ":CURRENT",
                ":NEW",
                ":FUTURE"
              ],
              "answer": 2,
              "explanation": "The `:NEW` pseudo-record allows inspecting and altering the new column value prior to committing it to the table.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which parameter mode allows passing a value into a stored procedure and also returning a modified value through the exact same variable?",
              "options": [
                "IN",
                "OUT",
                "IN OUT",
                "STATIC"
              ],
              "answer": 2,
              "explanation": "The `IN OUT` parameter mode allows a procedure to receive an initial value and overwrite it with an output value.",
              "difficulty": "Intermediate"
            }
          ],
          "short": [
            {
              "q": "Explain the lifecycle steps of an Explicit Cursor in PL/SQL with syntax.",
              "keywords": [
                "declare",
                "open",
                "fetch",
                "close",
                "active set",
                "memory"
              ],
              "modelAnswer": "An explicit cursor manages queries returning multiple rows through 4 steps: (1) DECLARE: Defines the query and allocates named cursor pointer; (2) OPEN: Executes the query, binds variables, and identifies the active result set; (3) FETCH: Reads the current row into variables and advances the pointer; (4) CLOSE: Releases context area memory.",
              "explanation": "Explain Declare, Open, Fetch, and Close in order with their functional purpose."
            }
          ]
        }
      },
      {
        "id": "dbms-u5-transactions",
        "name": "Unit 5: Transaction Management & Concurrency Control",
        "unitNumber": 5,
        "hours": 8,
        "subtopics": [
          "Transaction Concepts & ACID Properties (Atomicity, Consistency, Isolation, Durability)",
          "Transaction States: Active, Partially Committed, Committed, Failed, and Aborted",
          "Transaction Schedules: Serial Schedules vs Concurrent Schedules",
          "Serializability: Conflict Serializability (Precedence Graph / Dependency Graph) and View Serializability",
          "Concurrency Anomalies: Lost Updates, Dirty Reads (Uncommitted Dependency), and Unrepeatable Reads",
          "Concurrency Control: Lock-Based Protocols (Shared Locks S vs Exclusive Locks X)",
          "Two-Phase Locking (2PL): Basic 2PL, Strict 2PL, and Rigorous 2PL (Cascadeless Recoverability)",
          "Timestamp-Based Protocols & Thomas Write Rule",
          "Deadlocks: Deadlock Detection (Wait-For Graph), Prevention (Wait-Die, Wound-Wait), and Recovery",
          "Database Recovery Techniques: Shadow Paging, Write-Ahead Logging (WAL), and Checkpoints"
        ],
        "explanations": {
          "beginner": "A Transaction is a single logical unit of database work (e.g., transferring $100 from Account A to Account B). Transactions must guarantee ACID properties: Atomicity (all operations succeed, or all rollback—'all or nothing'); Consistency (database transitions from one valid state to another); Isolation (concurrent transactions execute without interfering with one another); Durability (committed changes persist permanently even after hardware crashes).",
          "intermediate": "Concurrent execution improves system throughput and CPU utilization, but unmanaged transactions cause anomalies: Dirty Reads (reading uncommitted data that is later rolled back) and Lost Updates (concurrent overwrites). A schedule is Conflict Serializable if it can be transformed into an equivalent serial schedule by swapping non-conflicting operations. Two operations conflict if they belong to different transactions, access the same data item, and at least one is a WRITE.",
          "advanced": "Two-Phase Locking (2PL) guarantees conflict serializability: during the Growing Phase, locks are acquired; during the Shrinking Phase, locks are released (no new locks can be acquired). Strict 2PL holds all Exclusive locks until commit/abort, guaranteeing cascadeless recovery. Rigorous 2PL holds both Shared and Exclusive locks until termination. Deadlock occurs when transactions cycle waiting for locks held by each other. Prevention schemes include Wait-Die (older waits, younger dies) and Wound-Wait (older wounds younger, younger waits)."
        },
        "caseStudy": "Financial Fund Transfer Application: User A transfers $500 to User B. Step 1: Deduct $500 from A. Step 2: Add $500 to B. If system power fails after Step 1, Atomicity ensures the database rolls back Step 1 using transaction undo logs. Meanwhile, Isolation prevents User B's statement from displaying intermediate partial amounts before the transfer commits.",
        "formulas": [
          "Conflict Condition: Trans_i != Trans_j AND Item_i == Item_j AND (Op_i == 'W' OR Op_j == 'W')",
          "Conflict Equivalence: Precedence Graph must be a Directed Acyclic Graph (DAG - no cycles)",
          "Wait-Die (Older Ti, Younger Tj): If Ti requests item held by Tj, Ti waits; if Tj requests item held by Ti, Tj dies",
          "Wound-Wait (Older Ti, Younger Tj): If Ti requests item held by Tj, Ti wounds (aborts) Tj; if Tj requests item held by Ti, Tj waits"
        ],
        "vivaQuestions": [
          {
            "q": "What is the difference between Conflict Serializability and View Serializability?",
            "a": "Conflict serializability is a stricter condition where schedules can be transformed into serial ones by swapping non-conflicting operations; it is tested in polynomial time using a Precedence Graph. View serializability is broader and allows blind writes, but testing view serializability is NP-complete."
          },
          {
            "q": "What is Strict Two-Phase Locking (Strict 2PL) and what does it prevent?",
            "a": "Strict 2PL requires that all exclusive (write) locks acquired by a transaction be held until the transaction commits or aborts. This prevents cascading aborts (cascading rollbacks) and ensures cascadeless schedules."
          },
          {
            "q": "How does Write-Ahead Logging (WAL) ensure Atomicity and Durability?",
            "a": "WAL dictates that log records describing updates must be written and flushed to non-volatile disk before the corresponding actual database data pages are written to disk. On recovery, REDO reapplies committed changes and UNDO reverses uncommitted changes."
          }
        ],
        "example": "Withdrawing money from an ATM: you authenticate, request cash, the ATM dispenses notes, and your account updates. If the cash dispenser jams mid-way, Atomicity triggers an immediate ROLLBACK so your bank account balance remains untouched.",
        "codeExample": "-- SQL Transaction Boundary with Rollback and Savepoint\nSTART TRANSACTION;\n\n-- Deduct $500 from Account A\nUPDATE Accounts \nSET balance = balance - 500 \nWHERE account_no = 101;\n\n-- Create an intermediate savepoint\nSAVEPOINT deducted_from_sender;\n\n-- Credit $500 to Account B\nUPDATE Accounts \nSET balance = balance + 500 \nWHERE account_no = 202;\n\n-- Check if Account B exists and is active; if failed, rollback to savepoint\n-- Otherwise commit changes permanently\nCOMMIT;",
        "pitfalls": [
          "1. Believing that Conflict Serializability and View Serializability are identical: all conflict serializable schedules are view serializable, but not all view serializable schedules are conflict serializable.",
          "2. Assuming Basic 2PL prevents deadlocks: 2PL guarantees serializability, but deadlocks can and do frequently occur under 2PL.",
          "3. Omitting Checkpoints in write-ahead logs, which forces the database recovery manager to scan and replay logs from the beginning of time upon reboot."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which ACID property guarantees that all operations of a transaction execute completely, or none at all (all-or-nothing)?",
              "options": [
                "Atomicity",
                "Consistency",
                "Isolation",
                "Durability"
              ],
              "answer": 0,
              "explanation": "Atomicity ensures that partial transaction execution is impossible: either all mutations commit or the transaction is rolled back.",
              "difficulty": "Beginner"
            },
            {
              "q": "What graphical test is used to verify whether a concurrent schedule is Conflict Serializable?",
              "options": [
                "Wait-For Graph",
                "Precedence / Serialization Graph",
                "State Machine Graph",
                "B-Tree Diagram"
              ],
              "answer": 1,
              "explanation": "A schedule is conflict serializable if and only if its Precedence (Serialization) Graph contains no directed cycles (is a DAG).",
              "difficulty": "Intermediate"
            },
            {
              "q": "In Two-Phase Locking (2PL), what occurs during the 'Shrinking Phase'?",
              "options": [
                "Locks can only be acquired",
                "Locks can only be released and no new locks acquired",
                "Database memory pages are compressed",
                "Transactions are aborted"
              ],
              "answer": 1,
              "explanation": "In the shrinking phase of 2PL, locks are progressively released, and the transaction is forbidden from acquiring any new locks.",
              "difficulty": "Beginner"
            },
            {
              "q": "Under the Wait-Die deadlock prevention scheme, what happens when an older transaction Ti requests a lock held by a younger transaction Tj?",
              "options": [
                "Ti dies immediately",
                "Ti is allowed to wait for Tj",
                "Tj is wounded and rolled back",
                "Both transactions abort"
              ],
              "answer": 1,
              "explanation": "Under Wait-Die (non-preemptive): if an older transaction requests from a younger transaction, the older waits (Ti waits).",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the primary role of a Checkpoint in database log-based recovery?",
              "options": [
                "To encrypt all log files",
                "To limit how far back the recovery engine must scan the log during crash recovery",
                "To lock all user tables permanently",
                "To eliminate foreign keys"
              ],
              "answer": 1,
              "explanation": "Checkpoints flush dirty pages to disk, assuring that transactions committed prior to the checkpoint do not need to be redone.",
              "difficulty": "Advanced"
            }
          ],
          "short": [
            {
              "q": "State and explain the ACID properties of database transactions.",
              "keywords": [
                "atomicity",
                "consistency",
                "isolation",
                "durability",
                "all or nothing",
                "valid",
                "concurrent",
                "permanent"
              ],
              "modelAnswer": "Atomicity guarantees all operations complete successfully or none do ('all or nothing'). Consistency ensures transactions preserve all database integrity constraints. Isolation ensures concurrent transactions execute independently without observing intermediate states. Durability guarantees committed changes persist permanently in non-volatile storage despite power or system failures.",
              "explanation": "Define Atomicity, Consistency, Isolation, and Durability clearly."
            }
          ]
        }
      },
      {
        "id": "dbms-u6-nosql",
        "name": "Unit 6: NoSQL Databases & Big Data",
        "unitNumber": 6,
        "hours": 7,
        "subtopics": [
          "Data Classifications: Structured (RDBMS), Semi-Structured (JSON/XML), and Unstructured Data (Media, Text)",
          "Limitations of RDBMS in Modern Web-Scale Applications (Horizontal vs Vertical Scaling)",
          "CAP Theorem: Consistency, Availability, and Partition Tolerance Trade-offs",
          "BASE Properties (Basically Available, Soft State, Eventual Consistency) vs ACID",
          "NoSQL Categories: Key-Value Stores (Redis), Document Stores (MongoDB), Column Stores (Cassandra), Graph Databases (Neo4j)",
          "MongoDB Architecture, Collections, Documents, and BSON (Binary JSON) Serialization",
          "MongoDB CRUD Operations: insertOne, insertMany, find, updateOne, deleteOne, and Query Operators ($gt, $in, $set)",
          "MongoDB Aggregation Pipeline: Stages ($match, $group, $project, $sort, $limit, $lookup)",
          "Introduction to Big Data Characteristics (5 Vs: Volume, Velocity, Variety, Veracity, Value)",
          "Hadoop Ecosystem: HDFS (NameNode, DataNode Architecture) and MapReduce Processing Model"
        ],
        "explanations": {
          "beginner": "NoSQL ('Not Only SQL') databases are non-relational database systems designed to handle massive volumes of rapidly changing, unstructured or semi-structured data. Traditional relational databases scale vertically (buying larger, more expensive servers), whereas NoSQL databases scale horizontally by distributing data across clusters of standard, commodity machines. Instead of tables with rigid schemas, document databases store data in flexible JSON/BSON documents.",
          "intermediate": "The CAP Theorem states that in a distributed data system subject to network partitions (P), you can only guarantee either strong Consistency (C) or Availability (A), but never both simultaneously. Relational databases prioritize ACID, while distributed NoSQL systems prioritize BASE (Basically Available, Soft State, Eventual Consistency). The four major NoSQL architectures are: Key-Value (fastest caching, e.g., Redis), Document (hierarchical flexible schemas, e.g., MongoDB), Column-Family (massive write throughput, e.g., Cassandra), and Graph (interconnected relationships, e.g., Neo4j).",
          "advanced": "MongoDB represents documents in BSON (Binary JSON), supporting rich types like dates, ObjectIDs, and binary buffers. Secondary indexes utilize B-Trees for fast lookups. The Aggregation Framework provides an in-memory data processing pipeline where documents flow sequentially through stages (`$match` filters rows, `$group` aggregates sums/averages, `$project` reshapes schemas, `$lookup` performs left outer joins). Big Data architectures pair NoSQL with Hadoop HDFS (replicated distributed file blocks) and MapReduce for parallel batch processing."
        },
        "caseStudy": "Social Media Platform Post & Engagement Analytics: A platform stores user posts, reactions, hashtags, and comments. Rigid SQL joins struggle as millions of comments arrive per minute. MongoDB stores each post as a self-contained document containing embedded arrays of comments and author sub-documents. The Aggregation Pipeline calculates trending hashtags in real-time using `$unwind`, `$group`, and `$sort`.",
        "formulas": [
          "CAP Theorem Constraint: P is inevitable in distributed networks => Choose CP or AP",
          "MongoDB CRUD: db.collection.find({ query }, { projection })",
          "Aggregation Pipeline: db.collection.aggregate([ { stage1 }, { stage2 } ])",
          "Hadoop HDFS Default Block Size: 128 MB (with 3x replication factor)"
        ],
        "vivaQuestions": [
          {
            "q": "What does the CAP Theorem state for distributed databases?",
            "a": "The CAP theorem states that a distributed data store can simultaneously provide at most two out of three guarantees: Consistency (every read receives the most recent write), Availability (every non-failing node returns a response), and Partition Tolerance (system continues operating despite dropped network messages)."
          },
          {
            "q": "What is the difference between BSON and JSON in MongoDB?",
            "a": "JSON is a human-readable text format supporting strings, numbers, booleans, and arrays. BSON is a binary-encoded serialization of JSON that is faster to traverse and parse, and adds extra data types like ObjectID, Date, Raw Binary, and 64-bit Integers."
          },
          {
            "q": "How does the MongoDB Aggregation Pipeline work?",
            "a": "Documents pass through a sequence of processing stages where each stage transforms the input documents into an aggregated output stream (e.g. $match filters, $unwind flattens arrays, $group aggregates, and $sort orders)."
          }
        ],
        "example": "Storing an e-commerce product catalog: one item is a t-shirt with sizes and colors (arrays), while another item is a laptop with RAM and CPU specifications (sub-objects). Storing this in MongoDB requires no table restructuring because documents in the same collection have dynamic schemas.",
        "codeExample": "// MongoDB CRUD & Aggregation Pipeline Syntax\n// 1. Insert a document with embedded arrays\ndb.products.insertOne({\n    name: \"Wireless Headphones\",\n    category: \"Audio\",\n    price: 89.99,\n    tags: [\"bluetooth\", \"sound\", \"gadget\"],\n    specs: { battery_hours: 30, weight_grams: 220 },\n    in_stock: true\n});\n\n// 2. Query with comparison operator\ndb.products.find(\n    { category: \"Audio\", price: { $lt: 100.00 } },\n    { name: 1, price: 1, _id: 0 }\n);\n\n// 3. Aggregation Pipeline: Average price per category for in-stock items\ndb.products.aggregate([\n    { $match: { in_stock: true } },\n    { $group: {\n        _id: \"$category\",\n        avg_price: { $avg: \"$price\" },\n        total_items: { $sum: 1 }\n    }},\n    { $sort: { avg_price: -1 } }\n]);",
        "pitfalls": [
          "1. Treating MongoDB like an RDBMS by normalizing everything into separate collections and attempting multiple application-level queries instead of leveraging embedding.",
          "2. Unbounded array growth: embedding infinitely growing arrays (like millions of log entries inside one user document) will exceed MongoDB's strict 16MB document size limit.",
          "3. Assuming Eventual Consistency provides immediate read-your-writes consistency across all secondary replica nodes without specifying write concerns."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "According to the CAP Theorem, which two guarantees must a distributed system choose between when a network partition (P) occurs?",
              "options": [
                "Speed vs Security",
                "Consistency vs Availability",
                "Durability vs Atomicity",
                "Reliability vs Scalability"
              ],
              "answer": 1,
              "explanation": "Because network partitions are inevitable in real-world distributed networks, systems must choose between Consistency (CP) or Availability (AP).",
              "difficulty": "Beginner"
            },
            {
              "q": "What binary serialization format does MongoDB use to store documents internally?",
              "options": [
                "XML",
                "Protocol Buffers",
                "BSON",
                "YAML"
              ],
              "answer": 2,
              "explanation": "MongoDB stores documents in BSON (Binary JSON), enabling fast scanning and expanded data types like Date and ObjectId.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which NoSQL database category is specifically optimized for storing highly interconnected entities like social networks and recommendation graphs?",
              "options": [
                "Document Store",
                "Key-Value Store",
                "Graph Database",
                "Wide-Column Store"
              ],
              "answer": 2,
              "explanation": "Graph databases (e.g. Neo4j) use nodes and edges to model and traverse interconnected relationships in O(1) pointer-hop time.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which aggregation pipeline stage in MongoDB is used to filter incoming documents, analogous to the SQL WHERE clause?",
              "options": [
                "$project",
                "$match",
                "$group",
                "$filter"
              ],
              "answer": 1,
              "explanation": "The `$match` stage filters documents so that only those matching specified criteria advance to subsequent pipeline stages.",
              "difficulty": "Intermediate"
            },
            {
              "q": "In the Hadoop HDFS architecture, which node manages the file system namespace and metadata block locations?",
              "options": [
                "DataNode",
                "NameNode",
                "TaskTracker",
                "ResourceManager"
              ],
              "answer": 1,
              "explanation": "The NameNode acts as master in HDFS, managing file directory trees and mapping data blocks to physical DataNodes.",
              "difficulty": "Intermediate"
            }
          ],
          "short": [
            {
              "q": "Compare ACID properties in traditional RDBMS with BASE properties in NoSQL databases.",
              "keywords": [
                "atomicity",
                "consistency",
                "isolation",
                "durability",
                "basically available",
                "soft state",
                "eventual consistency",
                "scaling"
              ],
              "modelAnswer": "ACID emphasizes strict immediate consistency, data integrity, and isolation, suited for vertical scaling in banking and transactions. BASE (Basically Available, Soft state, Eventual consistency) trades immediate consistency for high availability, fault tolerance, and horizontal scalability, guaranteeing that data across distributed replicas will settle to an identical state eventually.",
              "explanation": "Compare the core trade-off: strict immediate consistency (ACID) versus high availability and eventual consistency (BASE)."
            }
          ]
        }
      }
    ]
  },
  "computer networks": {
    "displayName": "Computer Networks",
    "courseCode": "24-PCC-AD-2-06",
    "semester": "Semester-IV",
    "credits": 3,
    "topics": [
      {
        "id": "cn-u1-intro-phy-dll",
        "name": "Unit 1: Introduction to Computer Networks & Physical/Data Link Layer",
        "unitNumber": 1,
        "hours": 7,
        "subtopics": [
          "Network Topologies (Bus, Star, Ring, Mesh, Hybrid) & Classifications (LAN, MAN, WAN)",
          "Layered Network Architecture: OSI 7-Layer Reference Model vs TCP/IP 4-Layer Protocol Suite",
          "Physical Layer: Transmission Media (Twisted Pair, Coaxial Cable, Optical Fiber, Wireless RF)",
          "Modulation, Multiplexing (FDM, TDM, WDM) and Transmission Impairments (Attenuation, Distortion, Noise)",
          "Data Link Layer Services: Framing Methods (Character/Byte Stuffing, Bit Stuffing with 01111110 Flag)",
          "Flow Control Protocols: Stop-and-Wait, Go-Back-N ARQ, and Selective Repeat ARQ (Sliding Window)",
          "Error Detection and Correction: Parity Check, Internet Checksum, Cyclic Redundancy Check (CRC), and Hamming Code",
          "Medium Access Control (MAC) Sublayer: CSMA/CD (Ethernet) & CSMA/CA (Wireless LAN IEEE 802.11)",
          "Basic Network CLI Diagnostics (ping, traceroute, ipconfig/ifconfig, netstat, arp)"
        ],
        "explanations": {
          "beginner": "A Computer Network connects multiple computers to share resources, transfer data, and communicate. The OSI 7-layer model standardizes network communication into distinct layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. The Physical layer transmits raw binary bits (0s and 1s) over wires or radio waves. The Data Link Layer packages these raw bits into frames and ensures error-free transmission between directly connected devices.",
          "intermediate": "Framing delineates bit sequences using byte or bit stuffing (inserting a 0 after five consecutive 1s to prevent false flag triggers). Flow control prevents a fast sender from swamping a slow receiver: the Sliding Window Protocol maintains send/receive windows; Go-Back-N retransmits all frames from the lost frame onwards, whereas Selective Repeat buffers out-of-order frames and retransmits only corrupted packets. Error detection relies on Cyclic Redundancy Check (CRC) polynomial division; Hamming code adds parity bits to achieve 1-bit error correction.",
          "advanced": "CSMA/CD (Carrier Sense Multiple Access with Collision Detection) manages shared Ethernet cables using 1-persistent sensing and truncated binary exponential backoff upon collision. Wireless networks cannot detect collisions while transmitting due to signal attenuation; instead, IEEE 802.11 WLANs use CSMA/CA (Collision Avoidance) with RTS/CTS (Request-to-Send / Clear-to-Send) handshakes and Network Allocation Vector (NAV) timers to overcome hidden terminal and exposed terminal problems."
        },
        "caseStudy": "Campus Network Infrastructure Design and WLAN Optimization: An engineering institute requires high-speed Wi-Fi across administrative blocks, student hostels, and labs. The architecture implements a hybrid Star-Mesh topology with redundant fiber-optic backbones connecting distribution switches, configuring IEEE 802.11ax dual-band access points with CSMA/CA to prevent channel interference in high-density lecture halls.",
        "formulas": [
          "Sliding Window Maximum Window Size (Go-Back-N): W_s <= 2^k - 1 (for k-bit sequence numbers)",
          "Selective Repeat Window Size: W_s = W_r <= 2^(k-1)",
          "CRC Generator Polynomial Division: (Data * 2^r) / Generator_Poly",
          "Hamming Code Parity Bits Condition: 2^p >= m + p + 1 (m data bits, p parity bits)"
        ],
        "vivaQuestions": [
          {
            "q": "What is the difference between Go-Back-N ARQ and Selective Repeat ARQ?",
            "a": "In Go-Back-N, the receiver only accepts frames in strict sequential order; if a frame is lost, all subsequent frames are discarded and the sender retransmits the entire window. In Selective Repeat, the receiver buffers out-of-order frames, and the sender retransmits only the specific damaged or lost frame."
          },
          {
            "q": "Why does Wireless LAN (Wi-Fi) use CSMA/CA instead of CSMA/CD?",
            "a": "In wireless transmission, a station's own outgoing signal drowns out all incoming signals at its antenna, preventing it from detecting collisions during transmission. Additionally, the hidden terminal problem hides collisions occurring at the receiver, making collision avoidance (CSMA/CA with RTS/CTS) necessary."
          },
          {
            "q": "How does Bit Stuffing work in Data Link framing?",
            "a": "To ensure that user data never accidentally matches the reserved 8-bit frame flag pattern `01111110`, the transmitter automatically injects a dummy '0' bit after any sequence of five consecutive '1' bits. The receiver reverses this by stripping any '0' immediately following five '1' bits."
          }
        ],
        "example": "Sending a letter via postal mail: you write your message (Application layer), translate it into English (Presentation), write names (Session), choose registered tracking (Transport), seal it in an addressed envelope (Network & Data Link), and the mail truck physically drives it along the road (Physical layer).",
        "codeExample": "# Cyclic Redundancy Check (CRC) Error Detection in Python\ndef xor(a, b):\n    result = []\n    for i in range(1, len(b)):\n        result.append('0' if a[i] == b[i] else '1')\n    return ''.join(result)\n\ndef mod2div(dividend, divisor):\n    pick = len(divisor)\n    tmp = dividend[0:pick]\n    while pick < len(dividend):\n        if tmp[0] == '1':\n            tmp = xor(divisor, tmp) + dividend[pick]\n        else:\n            tmp = xor('0' * pick, tmp) + dividend[pick]\n        pick += 1\n    if tmp[0] == '1':\n        tmp = xor(divisor, tmp)\n    else:\n        tmp = xor('0' * pick, tmp)\n    return tmp\n\ndef encode_data(data, key):\n    appended_data = data + '0' * (len(key) - 1)\n    remainder = mod2div(appended_data, key)\n    codeword = data + remainder\n    return codeword, remainder\n\ndata = \"11010011101100\"\nkey = \"1011\" # Generator Polynomial: x^3 + x + 1\ncodeword, checksum = encode_data(data, key)\nprint(\"Data Bits:   \", data)\nprint(\"CRC Checksum:\", checksum)\nprint(\"Codeword Sent:\", codeword)",
        "pitfalls": [
          "1. Confusing Go-Back-N window size: setting window size to 2^k instead of 2^k - 1 causes the receiver to accept duplicate frames when an entire window of ACKs is lost.",
          "2. Assuming CSMA/CD guarantees zero collisions: collisions still occur within the vulnerability period (one round-trip propagation delay 2*tau).",
          "3. Confusing bandwidth (bits transmitted per second) with propagation delay (time for a signal to physically travel the medium distance)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which layer of the OSI model is responsible for node-to-node framing, physical MAC addressing, and error detection?",
              "options": [
                "Physical Layer",
                "Data Link Layer",
                "Network Layer",
                "Transport Layer"
              ],
              "answer": 1,
              "explanation": "The Data Link layer encapsulates network packets into frames, handles MAC addresses, and verifies integrity via checksums/CRC.",
              "difficulty": "Beginner"
            },
            {
              "q": "In bit stuffing, what bit is inserted by the transmitter after detecting five consecutive '1' bits in the data stream?",
              "options": [
                "1",
                "0",
                "Flag byte",
                "Parity bit"
              ],
              "answer": 1,
              "explanation": "A '0' bit is stuffed after five consecutive '1' bits to prevent user payload from matching the reserved frame flag 01111110.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the maximum sender window size in Go-Back-N ARQ using k-bit sequence numbers?",
              "options": [
                "2^k",
                "2^k - 1",
                "2^(k-1)",
                "k"
              ],
              "answer": 1,
              "explanation": "To prevent sequence number ambiguity when ACKs are lost, the sender window size must be at most 2^k - 1.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which multiple access technique is standard for 802.11 Wireless LANs to mitigate hidden terminal collisions?",
              "options": [
                "CSMA/CD",
                "CSMA/CA with RTS/CTS",
                "Token Ring",
                "Pure ALOHA"
              ],
              "answer": 1,
              "explanation": "Wireless radios cannot detect collisions while transmitting; hence, CSMA/CA with RTS/CTS reservations is used.",
              "difficulty": "Intermediate"
            },
            {
              "q": "If data consists of m = 4 bits, what is the minimum number of parity bits p required to construct a single-error-correcting Hamming Code?",
              "options": [
                "2",
                "3",
                "4",
                "5"
              ],
              "answer": 1,
              "explanation": "Using 2^p >= m + p + 1: for m=4, p=3 satisfies 2^3 (8) >= 4 + 3 + 1 (8), requiring 3 parity bits (total 7-bit Hamming code).",
              "difficulty": "Intermediate"
            }
          ],
          "short": [
            {
              "q": "Explain the difference between Go-Back-N ARQ and Selective Repeat ARQ flow control protocols.",
              "keywords": [
                "window",
                "retransmit",
                "buffer",
                "discard",
                "out of order",
                "selective",
                "cumulative"
              ],
              "modelAnswer": "In Go-Back-N ARQ, the receiver accepts only in-order frames and discards any out-of-order frames without buffering; on a lost frame, the sender retransmits the lost frame and all subsequent frames in the window. In Selective Repeat ARQ, the receiver buffers out-of-order frames, acknowledges individual frames, and the sender retransmits solely the damaged frame.",
              "explanation": "Compare receiver buffering capabilities and sender retransmission policies."
            }
          ]
        }
      },
      {
        "id": "cn-u2-network-layer",
        "name": "Unit 2: Network Layer & Routing",
        "unitNumber": 2,
        "hours": 7,
        "subtopics": [
          "Network Layer Functions: Logical Addressing, Packet Switching (Datagram vs Virtual Circuit)",
          "IPv4 Addressing: Classful Addressing (Classes A, B, C, D, E) & Classless Inter-Domain Routing (CIDR)",
          "Subnetting: Subnet Masks, Network ID, Broadcast ID, and Usable Host Range Calculations",
          "IPv6 Architecture: 128-bit Hexadecimal Notation, Address Scopes, and IPv4 to IPv6 Migration (Dual Stack, Tunneling)",
          "Internet Protocol (IP) Datagram: Header Format, Time-to-Live (TTL), Fragmentation and Reassembly",
          "Internet Control Message Protocol (ICMP): Error Reporting (Destination Unreachable, Time Exceeded) and ping",
          "Address Resolution: ARP (IP to MAC mapping) and Reverse ARP (RARP)",
          "Network Address Translation (NAT): Static NAT, Dynamic NAT, and Port Address Translation (PAT / NAPT)",
          "Routing Algorithms: Distance Vector Routing (RIP, Bellman-Ford, Count-to-Infinity) vs Link State Routing (OSPF, Dijkstra)",
          "Inter-Domain Routing: Border Gateway Protocol (BGP) & Network Devices (Routers, Layer-3 Switches)"
        ],
        "explanations": {
          "beginner": "The Network Layer is responsible for host-to-host packet delivery across different networks using logical IP addresses. Unlike MAC addresses which identify a physical network card on a local cable, IP addresses identify devices globally on the Internet. Routers inspect destination IP addresses in packet headers and forward them across networks hop-by-hop toward their destination.",
          "intermediate": "IPv4 uses 32-bit addresses written in dotted-decimal format (e.g. 192.168.1.1). Subnetting divides a large network into smaller sub-networks using a subnet mask (e.g., /24 indicates 24 network bits and 8 host bits). The Address Resolution Protocol (ARP) dynamically discovers the MAC address corresponding to a target IP address on the local LAN. Network Address Translation (NAT) translates private IP addresses (10.x, 192.168.x) into a single public routable IP, conserving global IPv4 address space.",
          "advanced": "Routing protocols determine the most optimal path across networks: Distance Vector (RIP) periodically exchanges routing vectors with neighbors using the Bellman-Ford algorithm, suffering from slow convergence and count-to-infinity loops (mitigated via split horizon and poison reverse). Link State (OSPF) floods link-state advertisements (LSAs) so every router builds an identical topological map, running Dijkstra's shortest-path tree algorithm. Border Gateway Protocol (BGP) governs inter-autonomous system routing using path-vector policies."
        },
        "caseStudy": "Corporate Migration to Network Address Translation (NAT) & IPv6 Dual-Stack: An enterprise with 5,000 workstations holds only one public IPv4 block. By deploying Port Address Translation (PAT) on border edge routers, thousands of employee devices simultaneously browse the web using unique ephemeral TCP source ports mapped to one public IP. To future-proof infrastructure, routers enable Dual-Stack routing, processing IPv4 and IPv6 traffic concurrently.",
        "formulas": [
          "Number of Subnets = 2^(borrowed_subnet_bits)",
          "Usable Hosts per Subnet = 2^(host_bits) - 2 (subtracting Network ID & Broadcast ID)",
          "IPv4 Fragmentation Offset: offset = byte_index / 8",
          "Distance Vector Equation: D_x(y) = min_v { c(x, v) + D_v(y) }"
        ],
        "vivaQuestions": [
          {
            "q": "Why are two IP addresses subtracted when calculating usable hosts per subnet?",
            "a": "The all-zeros host address is reserved as the Network Identifier, and the all-ones host address is reserved as the Directed Broadcast Address, making them unavailable for assignment to individual host interfaces."
          },
          {
            "q": "How does ARP resolve an IP address to a physical MAC address?",
            "a": "The source broadcasts an ARP Request frame (`FF:FF:FF:FF:FF:FF`) across the local LAN asking 'Who has this IP?'. The host possessing that IP sends a unicast ARP Reply containing its MAC address, which the requester caches in its local ARP table."
          },
          {
            "q": "What causes the 'Count-to-Infinity' problem in Distance Vector routing?",
            "a": "When a link fails, routing loops can occur where two routers exchange outdated cost estimates back and forth, slowly incrementing distance values by 1 on each iteration until hitting the infinity threshold (16 in RIP)."
          }
        ],
        "example": "Sending a letter internationally: the IP address is like the city, street name, and house number (directing the mail carrier to your house). The MAC address is your personal passport name (ensuring the letter is handed to you specifically once it reaches the house).",
        "codeExample": "# Python IPv4 Subnet Calculator (CIDR Notation)\nimport ipaddress\n\ndef calculate_subnet(cidr_str):\n    net = ipaddress.IPv4Network(cidr_str, strict=False)\n    print(f\"Network Address:    {net.network_address}\")\n    print(f\"Broadcast Address:  {net.broadcast_address}\")\n    print(f\"Subnet Mask:        {net.netmask}\")\n    print(f\"Total Addresses:    {net.num_addresses}\")\n    print(f\"Usable Host Range:  {net.network_address + 1} - {net.broadcast_address - 1}\")\n    print(f\"Usable Hosts:       {max(0, net.num_addresses - 2)}\")\n\n# Calculate properties for a typical /26 departmental subnet\ncidr = \"192.168.10.130/26\"\nprint(f\"Analyzing CIDR: {cidr}\")\ncalculate_subnet(cidr)",
        "pitfalls": [
          "1. Forgetting that IPv4 fragmentation offsets are measured in units of 8-byte blocks, not individual bytes.",
          "2. Forgetting to subtract 2 (Network and Broadcast addresses) when calculating available host IP allocations for a subnet.",
          "3. Confusing ARP (Network layer to Data Link layer translation) with DNS (Application layer to Network layer translation)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "How many total bits are used in an IPv6 address compared to an IPv4 address?",
              "options": [
                "64 bits vs 32 bits",
                "128 bits vs 32 bits",
                "256 bits vs 64 bits",
                "128 bits vs 64 bits"
              ],
              "answer": 1,
              "explanation": "IPv6 uses 128-bit addresses (written in 8 groups of 4 hexadecimal digits), whereas IPv4 uses 32-bit addresses.",
              "difficulty": "Beginner"
            },
            {
              "q": "For an IPv4 subnet configured with prefix `/27`, how many usable host IP addresses can be assigned to devices?",
              "options": [
                "32",
                "30",
                "62",
                "14"
              ],
              "answer": 1,
              "explanation": "A /27 subnet leaves 32 - 27 = 5 host bits. Total addresses = 2^5 = 32. Subtracting network and broadcast yields 30 usable hosts.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which protocol dynamically maps a known 32-bit logical IP address to a 48-bit physical MAC address on a local network?",
              "options": [
                "DNS",
                "DHCP",
                "ARP",
                "ICMP"
              ],
              "answer": 2,
              "explanation": "Address Resolution Protocol (ARP) translates a known IP address to its corresponding physical MAC hardware address.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the primary routing metric algorithm employed by Open Shortest Path First (OSPF)?",
              "options": [
                "Bellman-Ford Algorithm",
                "Dijkstra's Shortest Path Algorithm",
                "Floyd-Warshall Algorithm",
                "Kruskal's Algorithm"
              ],
              "answer": 1,
              "explanation": "OSPF is a Link State routing protocol where every router builds a link-state database and computes routes using Dijkstra's algorithm.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What happens to an IPv4 packet when its Time-to-Live (TTL) field decrements to zero at a transit router?",
              "options": [
                "The packet is instantly broadcast to all LAN hosts",
                "The router discards the packet and sends an ICMP Time Exceeded message to the sender",
                "The packet is stored in RAM indefinitely",
                "The router doubles the TTL and re-forwards it"
              ],
              "answer": 1,
              "explanation": "When TTL reaches 0, the router drops the packet to eliminate routing loops and sends back an ICMP Type 11 (Time Exceeded) message.",
              "difficulty": "Intermediate"
            }
          ],
          "short": [
            {
              "q": "Explain the purpose of Network Address Translation (NAT) and explain how Port Address Translation (PAT) conserves public IP addresses.",
              "keywords": [
                "private",
                "public",
                "translate",
                "port",
                "pat",
                "conserve",
                "table",
                "router"
              ],
              "modelAnswer": "NAT translates private IP addresses (non-routable on the public Internet) into globally unique public IP addresses. Port Address Translation (PAT/NAPT) allows thousands of internal hosts to share a single public IP address by assigning a unique ephemeral TCP/UDP port number to each connection, mapping private socket pairs (IP:port) to public socket pairs.",
              "explanation": "Explain private-to-public mapping and the role of port numbers in PAT."
            }
          ]
        }
      },
      {
        "id": "cn-u3-transport-layer",
        "name": "Unit 3: Transport Layer & Socket Programming",
        "unitNumber": 3,
        "hours": 7,
        "subtopics": [
          "Transport Layer Responsibilities: Process-to-Process Delivery, Multiplexing and Demultiplexing",
          "Port Numbers: Well-Known Ports (0-1023), Registered Ports (1024-49151), and Ephemeral/Dynamic Ports",
          "User Datagram Protocol (UDP): Connectionless Header, Checksum Calculation, and Fast Low-Overhead Use Cases",
          "Transmission Control Protocol (TCP): Connection-Oriented Features, Byte-Stream Delivery, and Segment Header Structure",
          "TCP Connection Establishment: 3-Way Handshake (SYN, SYN-ACK, ACK) & Sequence Number Synchronization",
          "TCP Connection Termination: 4-Way Handshake (FIN, ACK, FIN, ACK) and TIME_WAIT State",
          "TCP Flow Control: Sliding Window, Receive Window (rwnd), and Silly Window Syndrome Mitigation (Nagle's Algorithm & Clark's Solution)",
          "TCP Congestion Control: AIMD (Additive Increase Multiplicative Decrease), Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery",
          "Modern Transport Protocols: Real-Time Protocol (RTP), SCTP, and QUIC (HTTP/3 over UDP)",
          "Socket Programming: Berkeley Sockets API (socket, bind, listen, accept, connect, send, recv) & Client-Server Architecture"
        ],
        "explanations": {
          "beginner": "While the Network Layer delivers packets between computers (host-to-host), the Transport Layer delivers data directly to the specific application program running on that computer (process-to-process) using 16-bit Port Numbers. UDP is lightweight and fast without guarantees—like sending postcards. TCP is reliable and orderly—like registered courier mail—guaranteeing that every byte arrives in correct sequence without loss or duplication.",
          "intermediate": "TCP establishes connections via a 3-Way Handshake: Client sends SYN with initial sequence number x; Server replies with SYN-ACK acknowledging x+1 and sending sequence y; Client responds with ACK y+1. Flow control prevents buffer overflow at the receiver by advertising a Receive Window (`rwnd`). Silly Window Syndrome occurs when tiny chunks are transmitted inefficiently; Nagle's algorithm buffers tiny application writes on the sender until an ACK arrives, while Clark's solution prevents the receiver from advertising small window openings.",
          "advanced": "TCP Congestion Control prevents network collapse using four coupled algorithms: (1) Slow Start exponentially doubles Congestion Window (`cwnd`) every RTT until `ssthresh`; (2) Congestion Avoidance increases `cwnd` linearly (+1 MSS per RTT); (3) Fast Retransmit triggers upon receiving 3 duplicate ACKs, retransmitting without waiting for RTO timer; (4) Fast Recovery reduces `ssthresh` by half and continues linearly. QUIC implements multiplexed streams directly over UDP, eliminating Head-of-Line blocking and enabling 0-RTT connection resumption for HTTP/3."
        },
        "caseStudy": "Online Multiplayer Game Networking: An action multiplayer game requires instantaneous positional updates (60 updates/sec). Using TCP introduces stutter due to retransmission delays when packets drop. The architecture routes real-time player coordinates over UDP/QUIC for zero head-of-line blocking, while reserving TCP for reliable transactions like in-game purchases and chat logins.",
        "formulas": [
          "TCP Window Capacity: Effective Window = min(cwnd, rwnd)",
          "Slow Start Growth: cwnd = cwnd + 1 MSS (for each received ACK => doubles per RTT)",
          "Congestion Avoidance Growth: cwnd = cwnd + (1 / cwnd) per ACK (+1 MSS per RTT)",
          "TCP Retransmission Timeout (Jacobson's Algorithm): RTO = SRTT + 4 * RTTVAR"
        ],
        "vivaQuestions": [
          {
            "q": "What is the purpose of the 3-Way Handshake in TCP?",
            "a": "It synchronizes initial sequence numbers (ISNs) between client and server, verifies bidirectional network reachability, and exchanges initial connection parameters like Maximum Segment Size (MSS) and window scale options."
          },
          {
            "q": "What is Silly Window Syndrome and how is it resolved?",
            "a": "It occurs when either the sender generates or the receiver advertises very small data chunks (e.g. 1 byte), creating massive header overhead (40 bytes of headers for 1 byte of payload). Nagle's algorithm fixes sender syndrome by buffering data until an ACK arrives; Clark's solution fixes receiver syndrome by withholding window updates until at least 1 MSS or half the buffer is free."
          },
          {
            "q": "Why does TCP enter the TIME_WAIT state for 2*MSL after closing?",
            "a": "To ensure the final ACK reaches the remote host (retransmitting if lost) and to prevent lingering delayed duplicate packets from a previous connection from corrupting a newly opened socket on the same port."
          }
        ],
        "example": "Streaming live video: if a single video frame pixel is dropped in transmission, dropping or skipping it is far better than freezing the video stream for 500ms while waiting for TCP retransmission. Hence, live video streaming uses UDP/RTP, whereas file downloads require TCP.",
        "codeExample": "# Python Multithreaded TCP Echo Server using Socket API\nimport socket\nimport threading\n\ndef handle_client(conn, addr):\n    print(f\"[CONNECTED] Client {addr} connected.\")\n    try:\n        while True:\n            data = conn.recv(1024)\n            if not data:\n                break\n            message = data.decode('utf-8')\n            print(f\"[{addr}] Received: {message}\")\n            conn.sendall(f\"ECHO: {message}\".encode('utf-8'))\n    finally:\n        conn.close()\n        print(f\"[DISCONNECTED] Client {addr} disconnected.\")\n\ndef start_server():\n    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    server.bind(('127.0.0.1', 8080))\n    server.listen(5)\n    print(\"[SERVER RUNNING] Listening on 127.0.0.1:8080...\")\n    while True:\n        conn, addr = server.accept()\n        thread = threading.Thread(target=handle_client, args=(conn, addr))\n        thread.daemon = True\n        thread.start()\n\nif __name__ == '__main__':\n    # start_server() # Uncomment to run locally\n    print(\"Socket Server Ready.\")",
        "pitfalls": [
          "1. Assuming TCP socket `send()` guarantees all bytes were delivered to the remote application in that call: `send()` only writes to the local OS kernel buffer.",
          "2. Omitting `server.listen()` before invoking `server.accept()` in socket programs.",
          "3. In UDP socket programming, trying to call `listen()` or `accept()`: UDP is connectionless and only uses `sendto()` and `recvfrom()`."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "What flags are exchanged between client and server during the TCP 3-Way Handshake in correct sequence?",
              "options": [
                "ACK -> SYN -> SYN-ACK",
                "SYN -> SYN-ACK -> ACK",
                "SYN -> ACK -> DATA",
                "FIN -> ACK -> FIN-ACK"
              ],
              "answer": 1,
              "explanation": "The client initiates with SYN, the server responds with SYN-ACK, and the client completes the handshake with ACK.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which transport protocol is connectionless, unreliable, does not perform flow control, but offers minimal header overhead (8 bytes)?",
              "options": [
                "TCP",
                "UDP",
                "SCTP",
                "BGP"
              ],
              "answer": 1,
              "explanation": "UDP has a compact 8-byte header and sends datagrams without establishing connections or tracking acknowledgments.",
              "difficulty": "Beginner"
            },
            {
              "q": "During TCP congestion control, how does the congestion window (cwnd) increase during the 'Slow Start' phase upon each received ACK?",
              "options": [
                "Linearly by 1 MSS",
                "Exponentially (doubles every RTT)",
                "Decreases by half",
                "Remains strictly constant"
              ],
              "answer": 1,
              "explanation": "During Slow Start, cwnd increases by 1 MSS for every received ACK, causing the window size to double every round-trip time.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What problem does Nagle's algorithm solve on the sender side in TCP transmission?",
              "options": [
                "Buffer Overflow",
                "Silly Window Syndrome",
                "Deadlock",
                "Packet Sniffing"
              ],
              "answer": 1,
              "explanation": "Nagle's algorithm prevents Silly Window Syndrome on the sender by buffering small data writes until preceding ACKs arrive.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which state does a TCP endpoint enter after initiating connection closure to ensure delayed duplicate packets expire in the network?",
              "options": [
                "ESTABLISHED",
                "CLOSE_WAIT",
                "TIME_WAIT",
                "SYN_SENT"
              ],
              "answer": 2,
              "explanation": "The TIME_WAIT state lasts for 2*MSL (Maximum Segment Lifetime) to ensure that the final ACK was received and old packets flush out.",
              "difficulty": "Advanced"
            }
          ],
          "short": [
            {
              "q": "Explain the TCP 3-Way Handshake process for establishing a connection with sequence numbers.",
              "keywords": [
                "syn",
                "syn-ack",
                "ack",
                "isn",
                "sequence",
                "synchronize",
                "connection"
              ],
              "modelAnswer": "Step 1: The client sends a TCP segment with SYN flag set and an initial sequence number x (ISN_c). Step 2: The server responds with SYN and ACK flags set, acknowledging x+1 (ACK=x+1) and providing its own sequence number y (ISN_s). Step 3: The client replies with an ACK segment acknowledging y+1 (ACK=y+1). Both hosts are now synchronized and ready for bidirectional data transfer.",
              "explanation": "Describe each of the 3 steps, the flags exchanged, and sequence/acknowledgment numbers."
            }
          ]
        }
      },
      {
        "id": "cn-u4-app-security",
        "name": "Unit 4: Application Layer & Network Security",
        "unitNumber": 4,
        "hours": 7,
        "subtopics": [
          "Domain Name System (DNS): Hierarchical Tree Namespace, Resource Records (A, AAAA, CNAME, MX, NS), and Resolution (Recursive vs Iterative)",
          "Hypertext Transfer Protocol (HTTP): Request/Response Headers, Status Codes (200, 301, 404, 500), and Evolution (HTTP/1.1 vs HTTP/2 vs HTTP/3)",
          "Electronic Mail Architecture: Simple Mail Transfer Protocol (SMTP), Post Office Protocol (POP3), and Internet Message Access Protocol (IMAP)",
          "Dynamic Host Configuration Protocol (DHCP): DORA Process (Discover, Offer, Request, Acknowledge) and Lease Times",
          "File Transfer Protocol (FTP - Control Port 21 vs Data Port 20) and Secure Shell (SSH Port 22)",
          "Network Security Principles: Confidentiality, Integrity, Availability (CIA Triad), Non-Repudiation, and Authentication",
          "Firewall Architectures: Packet Filtering, Stateful Inspection, and Application Layer Proxy Firewalls",
          "Intrusion Detection and Prevention Systems (Signature-based vs Anomaly-based IDS/IPS)",
          "Cryptographic Protocols: Symmetric (AES, DES) vs Asymmetric Encryption (RSA, ECC), SSL/TLS Handshake Mechanics",
          "Network Security & Diagnostics Tools: Wireshark Packet Sniffing, Nmap Port Scanning, and AI/ML for Traffic Anomaly Detection"
        ],
        "explanations": {
          "beginner": "The Application Layer is the layer closest to the end user, containing protocols that power web browsing, email, and file transfers. DNS acts as the Internet's telephone directory, translating human-readable domain names (like `google.com`) into numerical IP addresses (`142.250.190.46`). HTTP handles fetching web pages. Network security protects data confidentiality (encryption), integrity (preventing unauthorized tampering), and availability (preventing DDoS attacks).",
          "intermediate": "DHCP automatically assigns IP addresses, default gateways, and DNS servers to connecting devices via the 4-step DORA process (Discover, Offer, Request, Acknowledge). In cryptography, Symmetric Encryption uses one shared secret key for fast bulk encryption (AES); Asymmetric Encryption uses a public-private keypair (RSA). HTTPS secures web communications by executing an SSL/TLS Handshake where public-key cryptography authenticates the server's certificate and negotiates an ephemeral symmetric session key.",
          "advanced": "Firewalls filter traffic across layers: Packet-Filtering inspects IP headers statelessly; Stateful Inspection tracks TCP connection states (`ESTABLISHED`, `NEW`); Application Proxies inspect payload contents (preventing SQL injection and malicious HTTP requests). Machine Learning enhances network defense: supervised models classify known malware signatures, while unsupervised anomaly detection algorithms (Isolation Forests, Autoencoders) detect zero-day DDoS spikes and exfiltration patterns in high-velocity network packet logs."
        },
        "caseStudy": "AI-Powered Anomaly Detection and Intrusion Prevention in Campus Networks: A university network handles 10,000 concurrent students. Attackers attempt credential-stuffing and distributed port scanning. An AI-based Network Intrusion Detection System (NIDS) analyzes flow logs (NetFlow) using an autoencoder neural network. When traffic anomalies deviate from the baseline by 3 standard deviations, the NIDS triggers automated firewall rule updates via SDN APIs to isolate the offending IP subnets.",
        "formulas": [
          "RSA Key Generation: n = p * q, phi(n) = (p - 1) * (q - 1)",
          "RSA Encryption: Ciphertext C = (Message M)^e mod n",
          "RSA Decryption: Message M = (Ciphertext C)^d mod n where (e * d) mod phi(n) = 1"
        ],
        "vivaQuestions": [
          {
            "q": "What is the 4-step DHCP DORA process?",
            "a": "1. Discover: Client broadcasts DHCPDISCOVER to find available servers. 2. Offer: Server unicasts/broadcasts DHCPOFFER with an available IP. 3. Request: Client broadcasts DHCPREQUEST requesting the offered IP. 4. Acknowledge: Server sends DHCPACK confirming the lease."
          },
          {
            "q": "What is the difference between Symmetric and Asymmetric Encryption?",
            "a": "Symmetric encryption uses the identical secret key for both encryption and decryption (e.g. AES), making it very fast but requiring secure key exchange. Asymmetric encryption uses a public key for encryption and a distinct private key for decryption (e.g. RSA), solving key distribution at the expense of higher mathematical computation."
          },
          {
            "q": "What is the difference between HTTP/1.1 and HTTP/2?",
            "a": "HTTP/1.1 uses text-based commands and handles one request-response per TCP connection (or pipelined), leading to head-of-line blocking. HTTP/2 is binary, multiplexes multiple streams over a single TCP connection concurrently, and supports server push and header compression (HPACK)."
          }
        ],
        "example": "When you type `https://snjb.org` in your browser: (1) DNS resolves `snjb.org` to an IP, (2) TCP executes the 3-way handshake on port 443, (3) TLS completes the cryptographic handshake, verifying the SSL certificate, and (4) your browser sends an encrypted HTTP GET request, receiving the homepage HTML.",
        "codeExample": "# Python DNS Lookup and SSL Certificate Inspector\nimport socket\nimport ssl\n\ndef inspect_domain(domain_name):\n    print(f\"--- Querying Domain: {domain_name} ---\")\n    # 1. DNS Resolution\n    ip_addr = socket.gethostbyname(domain_name)\n    print(f\"Resolved IP Address: {ip_addr}\")\n\n    # 2. SSL/TLS Certificate Inspection\n    ctx = ssl.create_default_context()\n    with ctx.wrap_socket(socket.socket(), server_hostname=domain_name) as s:\n        s.settimeout(3.0)\n        s.connect((domain_name, 443))\n        cert = s.getpeercert()\n        subject = dict(x[0] for x in cert['subject'])\n        issuer = dict(x[0] for x in cert['issuer'])\n        print(f\"Subject Common Name: {subject.get('commonName')}\")\n        print(f\"Certificate Issuer:  {issuer.get('organizationName')}\")\n        print(f\"Valid Until:         {cert.get('notAfter')}\")\n\n# Test domain inspection\ninspect_domain(\"google.com\")",
        "pitfalls": [
          "1. Assuming HTTPS encrypts the destination IP address or domain name in standard DNS: the destination IP and SNI (Server Name Indication) remain visible in transit without Encrypted Client Hello (ECH) or DoH.",
          "2. Confusing an IDS (Intrusion Detection System - passive alerting) with an IPS (Intrusion Prevention System - active in-line traffic blocking).",
          "3. Setting DHCP lease times too long in dynamic environments (like guest Wi-Fi networks), causing IP address pool exhaustion."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "What is the correct chronological sequence of messages in the DHCP client-server IP allocation process?",
              "options": [
                "Request -> Offer -> Discover -> Acknowledge",
                "Discover -> Offer -> Request -> Acknowledge (DORA)",
                "Offer -> Discover -> Request -> Acknowledge",
                "Acknowledge -> Request -> Offer -> Discover"
              ],
              "answer": 1,
              "explanation": "DHCP follows DORA: Discover (broadcast), Offer (server response), Request (client selection), Acknowledge (server confirmation).",
              "difficulty": "Beginner"
            },
            {
              "q": "Which DNS resource record type maps a domain name to its corresponding 32-bit IPv4 address?",
              "options": [
                "AAAA Record",
                "CNAME Record",
                "A Record",
                "MX Record"
              ],
              "answer": 2,
              "explanation": "An 'A' (Address) record maps a hostname to an IPv4 address, whereas 'AAAA' maps to an IPv6 address.",
              "difficulty": "Beginner"
            },
            {
              "q": "In asymmetric cryptography (such as RSA), which key is used by a sender to encrypt a secret message intended for a recipient?",
              "options": [
                "The sender's private key",
                "The recipient's public key",
                "The recipient's private key",
                "The certificate authority's root key"
              ],
              "answer": 1,
              "explanation": "Messages encrypted using the recipient's public key can only be decrypted by the recipient's corresponding private key.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which firewall architecture maintains an internal state table to track active TCP connections and inspects flags (SYN, ACK) across state transitions?",
              "options": [
                "Packet Filtering Firewall",
                "Stateful Inspection Firewall",
                "Application Gateway",
                "Circuit-Level Gateway"
              ],
              "answer": 1,
              "explanation": "Stateful inspection firewalls track dynamic connection states (e.g. ESTABLISHED, NEW) in state tables rather than checking isolated packets.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What major optimization was introduced in HTTP/2 to prevent Head-of-Line blocking at the application protocol layer?",
              "options": [
                "UDP Transport",
                "Binary Stream Multiplexing over a single TCP connection",
                "Removal of Cookies",
                "Disabling TLS"
              ],
              "answer": 1,
              "explanation": "HTTP/2 introduces a binary framing layer allowing concurrent, interleaved request and response streams over one TCP socket.",
              "difficulty": "Advanced"
            }
          ],
          "short": [
            {
              "q": "Explain the role of the 3 components of the CIA Triad in network security.",
              "keywords": [
                "confidentiality",
                "integrity",
                "availability",
                "encryption",
                "hash",
                "tamper",
                "dos",
                "access"
              ],
              "modelAnswer": "Confidentiality ensures that sensitive data is accessible only to authorized entities, implemented through encryption (e.g. AES, TLS). Integrity guarantees that transmitted data has not been altered, modified, or forged in transit, verified via cryptographic hashes and digital signatures. Availability ensures that network resources and services remain accessible to legitimate users when needed, protected against DDoS attacks and hardware failures.",
              "explanation": "Define Confidentiality, Integrity, and Availability with corresponding mechanisms."
            }
          ]
        }
      },
      {
        "id": "cn-u5-web-fundamentals",
        "name": "Unit 5: Web Development Fundamentals",
        "unitNumber": 5,
        "hours": 7,
        "subtopics": [
          "Web Architecture: Client-Server Model, HTTP Request/Response Cycle, and Browser Rendering Engine Workflow",
          "HTML5 Core & Semantic Tags: header, nav, main, section, article, aside, and footer",
          "HTML5 Forms, Input Attributes (type, pattern, required, autofocus) and Native Client-side Validation",
          "CSS3 Selectors, Specificity Rules, Cascading Order, and Inheritance Hierarchy",
          "CSS Box Model: Content Dimensions, Padding, Border, and Margin Calculations (box-sizing: border-box)",
          "Modern Layout Systems: CSS Flexbox 1D Alignment (flex-direction, justify-content, align-items, flex-wrap)",
          "CSS Grid Layout 2D Matrix (grid-template-columns, grid-template-rows, gap, grid-area)",
          "Responsive Web Design (RWD): Viewport Meta Tag, Fluid Units (rem, %, vh, vw) and CSS Media Queries (@media)",
          "JavaScript Core Syntax: let/const, Data Types, Template Literals, Arrow Functions, and Array Methods (map, filter, reduce)",
          "Document Object Model (DOM) Manipulation, Event Handling, and Event Delegation"
        ],
        "explanations": {
          "beginner": "Web Development encompasses creating interactive websites accessed through web browsers. HTML5 defines the structure and meaning of web content using semantic tags (`<header>`, `<main>`, `<article>`). CSS3 styles the layout, colors, typography, and responsive positioning. JavaScript adds programmatic interactivity, responding to user actions like button clicks, form submissions, and data updates.",
          "intermediate": "The CSS Box Model determines the physical rectangular footprint of elements: `total width = content + padding + border + margin`. Setting `box-sizing: border-box` includes padding and border within the declared width, avoiding layout breaking. Flexbox coordinates linear 1-dimensional layouts (rows or columns), while CSS Grid manages complex 2-dimensional layouts. Responsive design utilizes the viewport meta tag and `@media (max-width: 768px)` breakpoints to restyle interfaces for mobile screens.",
          "advanced": "The browser parses HTML into the Document Object Model (DOM) tree and CSS into the CSSOM tree, combining them into a Render Tree before executing Layout (Reflow) and Paint. JavaScript interacts with this tree via DOM APIs. Event Delegation leverages event bubbling: attaching a single event listener to a common parent element handles events for dynamically added child elements efficiently, conserving browser memory."
        },
        "caseStudy": "Designing a Responsive, Accessible Online Quiz Platform: Developing an educational portal that runs seamlessly on mobile phones and widescreen desktops. The layout utilizes CSS Grid for a 12-column dashboard that gracefully stacks into a single-column layout on mobile devices using media queries. JavaScript dynamically renders questions from a JSON dataset and binds answer choice clicks using Event Delegation on the quiz container.",
        "formulas": [
          "Standard Box Model Width = width + 2*padding + 2*border + 2*margin",
          "Border-Box Model Width = specified width (padding & border absorbed inside)",
          "CSS Specificity Calculation: (Inline Style, IDs, Classes/Attributes/Pseudo-classes, Elements/Pseudo-elements)"
        ],
        "vivaQuestions": [
          {
            "q": "What is the difference between `box-sizing: content-box` and `box-sizing: border-box`?",
            "a": "In content-box (default), padding and border are added to the specified width, making elements wider than declared. In border-box, padding and border are absorbed inside the specified width, making responsive layout sizing predictable."
          },
          {
            "q": "What is Event Bubbling in JavaScript and how does Event Delegation utilize it?",
            "a": "Event bubbling is the phase where an event triggered on a child element propagates upward through its ancestors in the DOM tree. Event delegation attaches a single event handler to a common parent that listens for bubbled events from any child using `event.target`."
          },
          {
            "q": "Why are semantic HTML5 tags preferred over generic `<div>` tags?",
            "a": "Semantic tags (`<nav>`, `<header>`, `<article>`) communicate document structure to search engines (SEO), improve screen reader accessibility (ARIA), and make code cleaner and more maintainable."
          }
        ],
        "example": "Building a house: HTML is the concrete foundation and brick walls (structure). CSS is the interior paint, floor tiles, and wallpaper (visual design). JavaScript is the electrical wiring, light switches, and plumbing (interactive behavior).",
        "codeExample": "<!-- HTML5 Semantic Quiz Card with CSS Flexbox & JS Event Listener -->\n<div class=\"quiz-container\" id=\"quizContainer\">\n    <div class=\"quiz-card\">\n        <span class=\"badge\">Question 1 of 5</span>\n        <h3 class=\"quiz-title\">What is the function of the CSS flexbox property justify-content?</h3>\n        <div class=\"options-list\">\n            <button class=\"opt-btn\" data-choice=\"0\">Aligns items along the cross axis</button>\n            <button class=\"opt-btn\" data-choice=\"1\">Aligns items along the main axis</button>\n            <button class=\"opt-btn\" data-choice=\"2\">Changes font size</button>\n        </div>\n    </div>\n</div>\n\n<script>\n// Event Delegation: Single listener on parent container\ndocument.getElementById('quizContainer').addEventListener('click', (e) => {\n    if (e.target.classList.contains('opt-btn')) {\n        const choice = e.target.getAttribute('data-choice');\n        console.log(`User selected option index: ${choice}`);\n        e.target.style.backgroundColor = (choice === \"1\") ? \"#10b981\" : \"#ef4444\";\n    }\n});\n</script>",
        "pitfalls": [
          "1. Forgetting the `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` tag in HTML `<head>`, which disables mobile responsive scaling.",
          "2. Using `==` instead of `===` in JavaScript, which causes unexpected type coercion bugs (e.g. `'0' == 0` is true, but `'0' === 0` is false).",
          "3. Attaching separate event listeners to hundreds of individual list items in a loop instead of using a single delegated event listener on the parent."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which CSS property ensures that an element's padding and border are included within its total specified width and height?",
              "options": [
                "box-sizing: border-box",
                "box-sizing: content-box",
                "display: flex",
                "overflow: hidden"
              ],
              "answer": 0,
              "explanation": "With `box-sizing: border-box`, width includes content, padding, and border, preventing layout overflow.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which HTML5 semantic element is most appropriate for containing self-contained, independently distributable content such as a blog post or quiz review?",
              "options": [
                "<aside>",
                "<section>",
                "<article>",
                "<div>"
              ],
              "answer": 2,
              "explanation": "The `<article>` element represents a complete, self-contained composition that can be syndicated or reused independently.",
              "difficulty": "Beginner"
            },
            {
              "q": "In CSS Flexbox, which property controls the alignment of items along the MAIN axis?",
              "options": [
                "align-items",
                "justify-content",
                "align-content",
                "flex-direction"
              ],
              "answer": 1,
              "explanation": "`justify-content` aligns flex items along the main axis, while `align-items` aligns items along the cross axis.",
              "difficulty": "Beginner"
            },
            {
              "q": "What mechanism allows a single event listener on a parent DOM element to handle events triggered by its child elements?",
              "options": [
                "Event Capturing",
                "Event Delegation (Bubbling)",
                "Event Throttling",
                "Event Debouncing"
              ],
              "answer": 1,
              "explanation": "Event Delegation takes advantage of event bubbling up the DOM hierarchy to process events on a single parent handler.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which array method creates a new array populated with the results of calling a provided function on every element in the calling array?",
              "options": [
                "forEach()",
                "filter()",
                "map()",
                "reduce()"
              ],
              "answer": 2,
              "explanation": "The `map()` method transforms each element of an array and returns a new array of the same length without mutating the original.",
              "difficulty": "Beginner"
            }
          ],
          "short": [
            {
              "q": "Explain the difference between CSS Flexbox and CSS Grid layout models and state when each should be used.",
              "keywords": [
                "flexbox",
                "grid",
                "1d",
                "2d",
                "one dimensional",
                "two dimensional",
                "rows",
                "columns",
                "alignment"
              ],
              "modelAnswer": "CSS Flexbox is a 1-dimensional layout system designed for distributing space and aligning items along either a single row OR a single column (ideal for navbars, toolbars, and button groups). CSS Grid is a 2-dimensional layout system that handles both rows AND columns simultaneously (ideal for complete page architectures, image galleries, and multi-column dashboards).",
              "explanation": "Contrast 1D linear alignment (Flexbox) with 2D matrix layout (CSS Grid)."
            }
          ]
        }
      },
      {
        "id": "cn-u6-frontend-frameworks",
        "name": "Unit 6: Front-end Web Frameworks",
        "unitNumber": 6,
        "hours": 7,
        "subtopics": [
          "Evolution of Client-Side Web: Static Sites vs Server-Rendered vs Single Page Applications (SPAs)",
          "Bootstrap Framework Architecture: Mobile-First Responsive Philosophy, Containers (fixed vs fluid)",
          "Bootstrap 12-Column Grid System, Breakpoints (xs, sm, md, lg, xl, xxl), and Auto-Layout Columns",
          "Bootstrap Core UI Components: Navbars, Cards, Modals, Badges, Alert Callouts, and Utility Classes",
          "jQuery Core Concepts: DOM Ready `$(document).ready()`, CSS Selectors, and Chaining",
          "jQuery Event Handling, DOM Manipulation, Effects (fade, slide), and Asynchronous HTTP (`$.ajax`, `$.getJSON`)",
          "React Framework Architecture: Component-Based Architecture & Declarative UI Paradigm",
          "Virtual DOM & Reconciliation Algorithm (Diffing Algorithm & Fiber Tree Updates)",
          "React Fundamentals: JSX (JavaScript XML), Props (Read-only inputs) vs State (Mutable component memory)",
          "React Hooks: Managing Local State with `useState` and Handling Lifecycle Side-Effects with `useEffect`"
        ],
        "explanations": {
          "beginner": "Front-end frameworks streamline building modern web user interfaces by providing pre-styled components and reactive architectural patterns. Bootstrap offers a battle-tested CSS framework with a 12-column responsive grid and ready-made UI components (navbars, buttons, modals). React is a JavaScript component library created by Meta that allows developers to assemble complex user interfaces from small, reusable, isolated pieces of code called Components.",
          "intermediate": "jQuery simplifies DOM selection, animation, and cross-browser AJAX calls using concise syntax like `$('button').click(...)`. React revolutionizes front-end architecture through the Virtual DOM: rather than directly manipulating the browser's slow physical DOM on every state change, React computes changes in an in-memory Virtual DOM tree, calculates the minimal diff, and batches optimal updates to the real DOM through a process called Reconciliation.",
          "advanced": "In React, Components accept immutable inputs called `props` and manage dynamic internal data called `state`. Functional components utilize React Hooks: `useState` initializes and updates reactive state variables, triggering targeted re-renders when changed; `useEffect` performs side-effects (data fetching from REST APIs, timer setup, event subscriptions) after DOM paint. Dependency arrays `[deps]` control when `useEffect` re-executes, preventing infinite render cycles."
        },
        "caseStudy": "Recipe Sharing & Educational Material Platform using React: Developing an interactive web application where students explore, filter, and bookmark course modules and recipes. The application structures UI into modular React components (`RecipeCard`, `SearchBar`, `FilterPills`). When users type in the search bar, state updates in the parent component, instantaneously filtering the child component grid via Virtual DOM diffing without reloading the web page.",
        "formulas": [
          "Bootstrap Total Columns per Row = 12",
          "React State Update Hook: const [state, setState] = useState(initialValue)",
          "React Effect Lifecycle: useEffect(() => { /* mount/update */ return () => { /* cleanup */ }; }, [dependencies])"
        ],
        "vivaQuestions": [
          {
            "q": "What is the Virtual DOM in React and why is it faster than direct DOM manipulation?",
            "a": "The Virtual DOM is a lightweight, in-memory JavaScript representation of the actual DOM. When state changes, React updates the Virtual DOM, diffs it against the previous snapshot (reconciliation), and updates only the specific changed nodes in the real browser DOM in a single batched operation, minimizing expensive reflows and repaints."
          },
          {
            "q": "What is the difference between Props and State in React?",
            "a": "Props (short for properties) are read-only inputs passed from a parent component down to a child component to configure it. State is mutable internal data managed within the component that can change over time in response to user actions, triggering a component re-render when updated."
          },
          {
            "q": "What is the purpose of the dependency array in React's `useEffect` hook?",
            "a": "The dependency array tells React when to re-execute the effect: if omitted, the effect runs on every render; if empty `[]`, it runs once on mount and unmount; if containing variables `[a, b]`, it re-runs only when any of those specific dependency values change."
          }
        ],
        "example": "Consider LEGO bricks: instead of molding an entire toy plane out of one solid block of plastic, you build it using standardized LEGO pieces (wings, wheels, cockpit). React components are like LEGO bricks: you build small, reusable components (`Header`, `Sidebar`, `QuizCard`) and assemble them into full web applications.",
        "codeExample": "// Modern React Functional Component with Hooks (useState & useEffect)\nimport React, { useState, useEffect } from 'react';\n\nfunction SyllabusTopicViewer({ unitTitle }) {\n    const [completed, setCompleted] = useState(false);\n    const [studyMinutes, setStudyMinutes] = useState(0);\n\n    // Side-Effect: Timer tracking study duration\n    useEffect(() => {\n        const interval = setInterval(() => {\n            setStudyMinutes(prev => prev + 1);\n        }, 60000);\n        return () => clearInterval(interval); // Cleanup on unmount\n    }, []);\n\n    return (\n        <div className=\"card\">\n            <h2>{unitTitle}</h2>\n            <p>Active Study Time: {studyMinutes} mins</p>\n            <button \n                className={completed ? \"btn-success\" : \"btn-primary\"}\n                onClick={() => setCompleted(prev => !prev)}\n            >\n                {completed ? \"✓ Completed\" : \"Mark as Done\"}\n            </button>\n        </div>\n    );\n}\n\nexport default SyllabusTopicViewer;",
        "pitfalls": [
          "1. Mutating React state directly (e.g. `state.count = 5`): this will not notify React of the change and the component will fail to re-render; always use `setCount(5)`.",
          "2. Omitting dependencies from the `useEffect` dependency array while referencing them inside the effect callback, leading to stale closures.",
          "3. In Bootstrap, exceeding 12 column units inside a `.row` without intending a column wrap to the next line."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "What is the total number of grid columns in a standard Bootstrap responsive layout row?",
              "options": [
                "8",
                "10",
                "12",
                "16"
              ],
              "answer": 2,
              "explanation": "Bootstrap's responsive grid system divides every horizontal row into 12 proportional columns.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which React hook is used to introduce and update local state variables in a functional component?",
              "options": [
                "useEffect",
                "useState",
                "useContext",
                "useReducer"
              ],
              "answer": 1,
              "explanation": "The `useState` hook returns a stateful value and a function to update it across component re-renders.",
              "difficulty": "Beginner"
            },
            {
              "q": "How does React avoid costly browser DOM re-renders whenever application state changes?",
              "options": [
                "By updating the Virtual DOM first and computing minimal batched diffs",
                "By reloading the browser window",
                "By compiling JavaScript into WebAssembly",
                "By disabling CSS animations"
              ],
              "answer": 0,
              "explanation": "React diffs Virtual DOM trees and applies only the minimal required patches to the real browser DOM (reconciliation).",
              "difficulty": "Intermediate"
            },
            {
              "q": "What happens if you provide an empty dependency array `[]` as the second argument to `useEffect` in React?",
              "options": [
                "The effect never runs",
                "The effect runs on every single re-render",
                "The effect runs once when the component mounts and cleans up on unmount",
                "It causes an infinite loop"
              ],
              "answer": 2,
              "explanation": "An empty dependency array indicates that the effect has no reactive dependencies, executing only once on mount.",
              "difficulty": "Intermediate"
            },
            {
              "q": "In React, what is the primary characteristic of component 'props'?",
              "options": [
                "They are mutable by the child component",
                "They are immutable (read-only) inputs received from a parent",
                "They can only store integer numbers",
                "They automatically clear on every click"
              ],
              "answer": 1,
              "explanation": "Props are strictly read-only and immutable; child components cannot alter props passed to them by parent components.",
              "difficulty": "Beginner"
            }
          ],
          "short": [
            {
              "q": "Explain the concept of Reconciliation and the Virtual DOM in React.",
              "keywords": [
                "virtual dom",
                "in-memory",
                "diffing",
                "reconciliation",
                "batch",
                "render tree",
                "patch"
              ],
              "modelAnswer": "The Virtual DOM is an in-memory representation of real DOM elements. When component state changes, React renders a new Virtual DOM tree, compares it with the previous snapshot using a heuristic O(n) diffing algorithm, and calculates the minimal set of changes. This reconciliation process batches real DOM updates, preventing slow, redundant browser layout reflows and repaints.",
              "explanation": "Explain what the Virtual DOM is, the diffing step, and how batched updates optimize performance."
            }
          ]
        }
      }
    ]
  },
  "python programming": {
    "displayName": "Python Programming",
    "topics": [
      {
        "id": "py-basics",
        "name": "Getting Started & Data Types",
        "subtopics": [
          "Python Setup & Statements",
          "Variables & Dynamic Typing",
          "Basic Types (int, float, str, bool)",
          "Console I/O & F-Strings"
        ],
        "explanations": {
          "beginner": "Python is a language you 'talk to' using plain statements. A variable is a labeled container for data (`age = 15`). Built-in types include numbers (int, float), text (str), and True/False (bool). `print()` outputs text and `input()` receives input.",
          "intermediate": "Python is dynamically typed; variable types are inferred at runtime. `input()` always returns a string (requires explicit casting like `int()`). F-strings (`f'Hello {name}'`) enable inline string formatting.",
          "advanced": "In Python, everything is an object with a type, identity (`id()`), and value. Immutable types (int, str, tuple) create new objects on modification, whereas mutable types (list, dict) mutate in place."
        },
        "example": "Think of a variable like a labeled jar. `fruit = 'apple'` puts 'apple' into a jar named fruit. Later `print(fruit)` reads what's inside.",
        "codeExample": "# Python Variables & Data Types Example\nname = \"Kunal\"        # str (text)\nage = 20            # int (whole number)\ngpa = 3.85          # float (decimal)\nis_student = True   # bool (True/False)\n\nprint(f\"Student: {name}, Age: {age}, GPA: {gpa}\")\nprint(f\"Type of age: {type(age)}\")  # Output: <class 'int'>",
        "pitfalls": [
          "1. Forgetting to cast `input()` to int or float before doing math (e.g. `input()` returns string `'5'` instead of number `5`).",
          "2. Using single `=` for equality comparison instead of `==` inside conditional statements.",
          "3. Case sensitivity: `Name` and `name` are two completely different variable names in Python."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "What will `type(5)` return in Python?",
              "options": [
                "<class 'str'>",
                "<class 'int'>",
                "<class 'float'>",
                "<class 'bool'>"
              ],
              "answer": 1,
              "explanation": "Whole numbers without decimals belong to `<class 'int'>` in Python.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which string format syntax is known as an f-string?",
              "options": [
                "'Hello %s' % name",
                "'Hello ' + name",
                "f'Hello {name}'",
                "format('Hello', name)"
              ],
              "answer": 2,
              "explanation": "Prefixing a string literal with `f` allows expressions inside `{}` to be evaluated dynamically.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What data type does `input()` return by default?",
              "options": [
                "Integer",
                "String",
                "Float",
                "Boolean"
              ],
              "answer": 1,
              "explanation": "The `input()` function always returns user console input as a string (`str`).",
              "difficulty": "Beginner"
            },
            {
              "q": "Which of the following is a valid variable name in Python?",
              "options": [
                "2user_name",
                "user-name",
                "user_name",
                "user name"
              ],
              "answer": 2,
              "explanation": "Python variable names must start with a letter or underscore and contain only alphanumeric characters and underscores.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the result of `type(3.14)` in Python?",
              "options": [
                "<class 'int'>",
                "<class 'str'>",
                "<class 'float'>",
                "<class 'number'>"
              ],
              "answer": 2,
              "explanation": "Numbers with decimal points belong to `<class 'float'>` in Python.",
              "difficulty": "Beginner"
            }
          ],
          "short": [
            {
              "q": "Explain what happens when you run `x = input('Enter number: ')` without type casting.",
              "keywords": [
                "string",
                "str",
                "input",
                "cast",
                "int",
                "text"
              ],
              "modelAnswer": "`input()` returns user input as a string (`str`). If you perform math operations without casting (e.g. `int()`), Python will raise a TypeError or concatenate strings instead of adding numbers.",
              "explanation": "Focus on `input()` returning strings by default."
            }
          ]
        }
      },
      {
        "id": "py-control-flow",
        "name": "Control Flow & Decisions",
        "subtopics": [
          "If / Elif / Else Chains",
          "For Loops & Ranges",
          "While Loops & Conditions",
          "Break & Continue Keywords"
        ],
        "explanations": {
          "beginner": "Control flow decides which code runs. `if` checks a condition; `else` handles alternative cases. `for` loops iterate over lists or ranges; `while` loops repeat as long as a condition stays True.",
          "intermediate": "If/elif chains stop evaluating at the first True branch. `break` exits a loop immediately; `continue` skips to the next iteration. `range(start, stop, step)` generates numeric sequences.",
          "advanced": "Python 3.10+ introduced structural pattern matching via `match/case`. Loop `else` clauses run only if the loop completes without hitting a `break` statement."
        },
        "example": "Imagine sorting laundry: if white, put in white pile; else put in colors pile. That's an if/else decision.",
        "codeExample": "# Control Flow Example\nscore = 85\n\nif score >= 90:\n    print(\"Grade A\")\nelif score >= 80:\n    print(\"Grade B\")\nelse:\n    print(\"Keep practicing!\")\n\n# Loop over a range\nfor i in range(1, 4):\n    print(f\"Iteration {i}\")",
        "pitfalls": [
          "1. Off-by-one errors with `range(a, b)`: `range(1, 5)` stops at 4, not 5.",
          "2. Infinite while loops: forgetting to update the loop condition variable inside the loop body.",
          "3. Indentation errors: mixing tabs and spaces in Python code blocks."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which keyword immediately exits a loop in Python?",
              "options": [
                "continue",
                "pass",
                "break",
                "return"
              ],
              "answer": 2,
              "explanation": "`break` immediately terminates the loop execution.",
              "difficulty": "Beginner"
            },
            {
              "q": "What does `range(1, 5)` generate?",
              "options": [
                "[1, 2, 3, 4, 5]",
                "Numbers 1, 2, 3, 4",
                "Numbers 0, 1, 2, 3, 4",
                "Numbers 1 to 5 inclusive"
              ],
              "answer": 1,
              "explanation": "`range(a, b)` generates integers from `a` up to (but not including) `b`.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What does the `continue` keyword do inside a loop?",
              "options": [
                "Terminates the loop",
                "Skips the rest of current iteration and moves to next",
                "Restarts the whole program",
                "Pauses execution for 1 second"
              ],
              "answer": 1,
              "explanation": "`continue` halts the current iteration and jumps directly to evaluating the next loop iteration.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which operator is used for checking equality in Python if statements?",
              "options": [
                "=",
                "==",
                "===",
                "->"
              ],
              "answer": 1,
              "explanation": "`==` is the equality comparison operator; `=` is used for variable assignment.",
              "difficulty": "Beginner"
            },
            {
              "q": "How many times will `for i in range(3):` execute its body?",
              "options": [
                "2 times",
                "3 times",
                "4 times",
                "Infinite times"
              ],
              "answer": 1,
              "explanation": "`range(3)` produces values 0, 1, 2, so the loop body executes 3 times.",
              "difficulty": "Beginner"
            }
          ],
          "short": [
            {
              "q": "Explain the difference between break and continue inside a loop.",
              "keywords": [
                "break",
                "continue",
                "exit",
                "stop",
                "skip",
                "next",
                "iteration"
              ],
              "modelAnswer": "`break` completely terminates the loop, whereas `continue` skips the remainder of the current iteration and jumps to the next loop iteration.",
              "explanation": "Contrasts loop termination vs iteration skipping."
            }
          ]
        }
      },
      {
        "id": "py-functions",
        "name": "Functions & Scope",
        "subtopics": [
          "Defining Functions (def)",
          "Arguments & Default Values",
          "Return Values vs Print",
          "Scope (Local vs Global)"
        ],
        "explanations": {
          "beginner": "Functions are reusable code blocks defined with `def name():`. You pass data in via parameters and get results out using `return`.",
          "intermediate": "Functions support positional, keyword, default parameters, and `*args` / `**kwargs` for variable arguments. `return` hands data back to callers; `print()` only displays text on screen.",
          "advanced": "Python uses LEGB scope resolution (Local, Enclosing, Global, Built-in). Functions are first-class citizens, meaning they can be passed as arguments or returned from decorators."
        },
        "example": "A function is like a blender: put in ingredients (arguments), press start, get a smoothie back (return value).",
        "codeExample": "# Defining a reusable function\ndef calculate_total(price, tax_rate=0.05):\n    total = price + (price * tax_rate)\n    return round(total, 2)\n\nfinal_price = calculate_total(100.0)\nprint(f\"Total: ${final_price}\") # Output: Total: $105.0",
        "pitfalls": [
          "1. Confusing `return` with `print()`: `print()` displays text but returns `None` to the caller.",
          "2. Trying to access local variables outside the function where they were defined.",
          "3. Modifying mutable default arguments like `def func(lst=[])` across calls."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which keyword defines a function in Python?",
              "options": [
                "func",
                "function",
                "def",
                "lambda"
              ],
              "answer": 2,
              "explanation": "`def` is the official Python keyword for function definition.",
              "difficulty": "Beginner"
            },
            {
              "q": "What does `*args` allow a function to accept?",
              "options": [
                "A dictionary of keyword arguments",
                "Any number of positional arguments",
                "Only integer values",
                "Global scope variables"
              ],
              "answer": 1,
              "explanation": "`*args` packs variable positional arguments into a tuple inside the function.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What does `**kwargs` pass to a Python function?",
              "options": [
                "A tuple of values",
                "Arbitrary keyword arguments as a dictionary",
                "A list of strings",
                "An error code"
              ],
              "answer": 1,
              "explanation": "`**kwargs` captures arbitrary named keyword arguments as a dictionary.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What happens if a function in Python has no return statement?",
              "options": [
                "It returns 0",
                "It returns None",
                "It raises an Error",
                "It returns False"
              ],
              "answer": 1,
              "explanation": "Functions without an explicit `return` statement implicitly return `None` upon completion.",
              "difficulty": "Beginner"
            },
            {
              "q": "Where is a variable declared inside a function accessible by default?",
              "options": [
                "Everywhere in the program",
                "Only inside that function (Local Scope)",
                "Inside all imported modules",
                "Only in global scope"
              ],
              "answer": 1,
              "explanation": "Variables declared inside a function belong to its local scope and are not visible outside.",
              "difficulty": "Beginner"
            }
          ],
          "short": [
            {
              "q": "Why is return used in functions instead of print?",
              "keywords": [
                "return",
                "print",
                "caller",
                "reuse",
                "variable",
                "value"
              ],
              "modelAnswer": "`return` sends the computed value back to the caller so it can be stored in variables or used in calculations, whereas `print` only displays text on screen.",
              "explanation": "Highlights returning reusable data vs console printing."
            }
          ]
        }
      },
      {
        "id": "py-data-structures",
        "name": "Built-in Data Structures",
        "subtopics": [
          "Lists & Mutability",
          "Tuples & Immutability",
          "Dictionaries (Key-Value)",
          "Sets & Unique Items",
          "List Comprehensions"
        ],
        "explanations": {
          "beginner": "Lists `[1, 2]` store ordered items you can change. Tuples `(1, 2)` cannot be changed. Dictionaries `{'a': 1}` store key-value pairs. Sets `{1, 2}` hold unique unordered items.",
          "intermediate": "List comprehensions (`[x*2 for x in nums]`) provide a concise way to create lists. Dict key lookups are average O(1) time complexity.",
          "advanced": "Dictionary keys must be hashable (immutable objects like strings, numbers, tuples). Modifying mutable defaults in function arguments leads to persistent shared state bugs."
        },
        "example": "A dictionary is like a contact list: look up a name (key) to instantly find their phone number (value).",
        "codeExample": "# Python Data Structures Example\nfruits = [\"apple\", \"banana\", \"cherry\"] # List (mutable)\ncoordinates = (10, 20)                 # Tuple (immutable)\nuser = {\"name\": \"Priya\", \"age\": 22}    # Dict (key-value)\n\n# Access dict value\nprint(user[\"name\"]) # Output: Priya",
        "pitfalls": [
          "1. Trying to modify a tuple: `tup[0] = 5` raises a TypeError.",
          "2. KeyError when accessing non-existent dictionary keys: use `dict.get('key')` safely.",
          "3. Modifying a list while iterating over it in a for loop."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which Python data structure is immutable once created?",
              "options": [
                "List",
                "Dictionary",
                "Tuple",
                "Set"
              ],
              "answer": 2,
              "explanation": "Tuples are immutable; their elements cannot be modified, added, or removed after creation.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the output of `[x for x in range(3)]`?",
              "options": [
                "[0, 1, 2, 3]",
                "[0, 1, 2]",
                "[1, 2, 3]",
                "(0, 1, 2)"
              ],
              "answer": 1,
              "explanation": "List comprehension iterating over `range(3)` produces `[0, 1, 2]`.",
              "difficulty": "Intermediate"
            },
            {
              "q": "How do you access the value for key `'age'` in dictionary `d`?",
              "options": [
                "d.age",
                "d['age']",
                "d(age)",
                "d->age"
              ],
              "answer": 1,
              "explanation": "Dictionary values are accessed using bracket notation `d['age']`.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which method adds a new element to the end of a Python list?",
              "options": [
                "list.add()",
                "list.append()",
                "list.push()",
                "list.insert()"
              ],
              "answer": 1,
              "explanation": "`append()` appends a single item to the end of a list.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is a defining characteristic of a Python set?",
              "options": [
                "Allows duplicate values",
                "Stores unique elements only",
                "Is indexed by numbers",
                "Cannot store numbers"
              ],
              "answer": 1,
              "explanation": "Sets store an unordered collection of unique elements, automatically eliminating duplicates.",
              "difficulty": "Beginner"
            }
          ],
          "short": [
            {
              "q": "When would you choose a set over a list in Python?",
              "keywords": [
                "set",
                "list",
                "duplicate",
                "unique",
                "fast",
                "lookup",
                "membership"
              ],
              "modelAnswer": "Choose a set when you need to store unique items without duplicates or perform fast O(1) membership testing (`x in my_set`).",
              "explanation": "Focus on uniqueness and fast membership testing."
            }
          ]
        }
      }
    ]
  },
  "web development": {
    "displayName": "Web Development",
    "topics": [
      {
        "id": "web-html",
        "name": "HTML5 & Semantic Web",
        "subtopics": [
          "Document Shell & Head Metadata",
          "Semantic Tags (header, nav, main, footer)",
          "Forms, Input Types & Validation",
          "Accessibility & ARIA Attributes"
        ],
        "explanations": {
          "beginner": "HTML provides structure using tags like `<h1>` and `<p>`. Semantic tags like `<main>` and `<nav>` describe content role. Forms collect user input.",
          "intermediate": "Semantic HTML improves SEO and screen reader accessibility over generic `<div>`s. HTML5 inputs support built-in validation attributes (`required`, `type='email'`, `pattern`).",
          "advanced": "The DOM tree is parsed synchronously. ARIA role attributes (`role='dialog'`) bridge accessibility gaps when custom interactive widgets are constructed."
        },
        "example": "HTML is like a house frame: walls, doors, and rooms before paint or decoration.",
        "codeExample": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Semantic HTML Example</title>\n</head>\n<body>\n  <header><h1>My Website</h1></header>\n  <nav><a href=\"#about\">About</a></nav>\n  <main>\n    <article>\n      <h2>HTML5 Semantics</h2>\n      <p>Semantic tags improve SEO and accessibility.</p>\n    </article>\n  </main>\n</body>\n</html>",
        "pitfalls": [
          "1. Using `<div>` for everything instead of semantic tags (`<nav>`, `<main>`, `<article>`).",
          "2. Missing `alt` attributes on `<img>` tags, hurting screen reader accessibility.",
          "3. Multiple `<h1>` tags on a single page instead of proper heading hierarchy (`<h1>` to `<h6>`)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which tag is best suited for wrapping main navigation links?",
              "options": [
                "<div>",
                "<nav>",
                "<section>",
                "<span>"
              ],
              "answer": 1,
              "explanation": "`<nav>` is the dedicated semantic HTML5 element for primary navigation.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which tag represents the top-level main heading on a webpage?",
              "options": [
                "<h6>",
                "<head>",
                "<h1>",
                "<header>"
              ],
              "answer": 2,
              "explanation": "`<h1>` represents the highest section level heading on a page.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which input attribute makes a form field compulsory before submission?",
              "options": [
                "mandatory",
                "required",
                "validate",
                "important"
              ],
              "answer": 1,
              "explanation": "`required` prevents form submission if the input field is empty.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which semantic tag should contain the main unique content of a document?",
              "options": [
                "<aside>",
                "<main>",
                "<header>",
                "<footer>"
              ],
              "answer": 1,
              "explanation": "`<main>` wraps the primary dominant content of the document body.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What does the `alt` attribute on an `<img>` tag provide?",
              "options": [
                "Alternative image URL",
                "Alternative text description for screen readers and broken links",
                "Image height",
                "Tooltip label"
              ],
              "answer": 1,
              "explanation": "`alt` provides descriptive text for screen readers and displays when images fail to load.",
              "difficulty": "Beginner"
            }
          ],
          "short": [
            {
              "q": "Why are semantic tags preferred over plain div tags?",
              "keywords": [
                "semantic",
                "accessibility",
                "seo",
                "meaning",
                "screen reader"
              ],
              "modelAnswer": "Semantic tags provide clear structural meaning to search engines (SEO) and screen readers for accessibility, unlike unsemantic div tags.",
              "explanation": "Highlights SEO, accessibility, and structural meaning."
            }
          ]
        }
      },
      {
        "id": "web-css",
        "name": "CSS3 Box Model & Layouts",
        "subtopics": [
          "Selectors & Specificity",
          "The Box Model (Content, Padding, Border, Margin)",
          "Flexbox Alignment",
          "CSS Grid 2D Matrix",
          "Responsive Design & Media Queries"
        ],
        "explanations": {
          "beginner": "CSS styles HTML. Every element is a box with content, padding, border, and margin. Flexbox aligns items along a row or column.",
          "intermediate": "CSS Grid manages 2D layouts (rows AND columns). Media queries (`@media (max-width: 768px)`) adjust layouts for mobile screens.",
          "advanced": "Specificity hierarchy: Inline style > ID selector > Class selector > Element selector. Flexbox `flex-grow`, `flex-shrink`, and `flex-basis` dictate space distribution."
        },
        "example": "Flexbox is arranging items on one shelf; Grid is organizing items across a multi-shelf bookcase.",
        "codeExample": "/* Flexbox Layout Example */\n.card-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}\n\n@media (max-width: 768px) {\n  .card-container {\n    flex-direction: column;\n  }\n}",
        "pitfalls": [
          "1. Confusing padding (inside the border) with margin (outside the border).",
          "2. Specificity conflicts: using `!important` excessively instead of clean selector hierarchy.",
          "3. Not setting `box-sizing: border-box`, leading to unexpected element width calculations."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "In the CSS box model, what directly surrounds the border?",
              "options": [
                "Padding",
                "Margin",
                "Content",
                "Outline"
              ],
              "answer": 1,
              "explanation": "Margin creates space outside the element's border.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which property transforms a container into a 1D flexbox layout?",
              "options": [
                "display: flex",
                "display: grid",
                "display: inline-block",
                "display: block"
              ],
              "answer": 0,
              "explanation": "`display: flex` establishes a flexible box formatting context.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which layout tool is designed for two-dimensional grid layouts?",
              "options": [
                "Flexbox",
                "Float",
                "CSS Grid",
                "Positioning"
              ],
              "answer": 2,
              "explanation": "CSS Grid handles two-dimensional layouts (rows and columns simultaneously).",
              "difficulty": "Intermediate"
            },
            {
              "q": "What CSS rule applies styles based on device screen sizes?",
              "options": [
                "@screen",
                "@media",
                "@container",
                "@responsive"
              ],
              "answer": 1,
              "explanation": "`@media` queries apply conditional CSS rules based on screen conditions.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which selector has the highest CSS specificity?",
              "options": [
                "Element selector (`p`)",
                "Class selector (`.card`)",
                "ID selector (`#header`)",
                "Universal selector (`*`)"
              ],
              "answer": 2,
              "explanation": "ID selectors (`#id`) carry higher specificity than class or element selectors.",
              "difficulty": "Intermediate"
            }
          ],
          "short": [
            {
              "q": "Explain the difference between Flexbox and CSS Grid.",
              "keywords": [
                "flexbox",
                "grid",
                "1d",
                "2d",
                "one-dimensional",
                "two-dimensional",
                "row",
                "column"
              ],
              "modelAnswer": "Flexbox is built for one-dimensional layouts (a single row or column), whereas CSS Grid is designed for two-dimensional layouts (rows and columns simultaneously).",
              "explanation": "Contrasts 1D vs 2D layout control."
            }
          ]
        }
      }
    ]
  },
  "data structures and algorithms": {
    "displayName": "Data Structures & Algorithms",
    "courseCode": "24-PCC-AD-2-02",
    "semester": "Semester-III",
    "credits": 3,
    "topics": [
      {
        "id": "dsa-u1-intro",
        "name": "Unit 1: Introduction to Data Structures & Algorithms",
        "unitNumber": 1,
        "hours": 8,
        "subtopics": [
          "Data Structure Classifications (Primitive vs Non-primitive, Linear vs Non-linear)",
          "Static vs Dynamic & Persistent vs Transient Structures",
          "Algorithm Characteristics & Design Principles",
          "Space and Time Complexity Analysis & Asymptotic Orders",
          "Asymptotic Notations: Big-O (Upper Bound), Big-Omega (Lower Bound), Big-Theta (Tight Bound)",
          "Best, Worst, and Average Case Analysis",
          "Algorithmic Strategies: Divide and Conquer vs Greedy Strategy",
          "Applications of Array: Polynomial Addition & Sparse Matrix Transpose"
        ],
        "explanations": {
          "beginner": "A data structure is a specialized format for organizing, processing, retrieving, and storing data in computer memory. Primitive types (int, float, char) hold single values, while non-primitive structures (arrays, linked lists, trees) organize collections of elements. Linear structures arrange elements sequentially, whereas non-linear structures (trees, graphs) represent hierarchical and interconnected networks. Asymptotic notation like Big-O describes how algorithm execution time grows as input size n expands.",
          "intermediate": "Static data structures (arrays) possess fixed memory allocated at compile-time, leading to O(1) random access but static capacity limits. Dynamic data structures allocate heap memory at runtime using pointers or references. Asymptotic bounds formalize efficiency: f(n) = O(g(n)) means c*g(n) serves as an upper bound for large n; Ω(g(n)) is the lower bound; and Θ(g(n)) indicates a tight bound. Algorithmic paradigms include Divide-and-Conquer (breaking problems into independent subproblems, e.g., Merge Sort) and Greedy strategies (making locally optimal choices, e.g., Prim's algorithm).",
          "advanced": "Persistent data structures preserve historical versions upon mutation (functional paradigms), unlike transient structures which mutate in place. Space complexity encompasses both fixed instruction space and dynamic data/stack space. For sparse matrices where zero elements predominate, standard 2D arrays waste O(m*n) space; tuple 3-row/column representations (Row, Column, Value) compress storage to O(non-zero elements), enabling fast transpose algorithms in O(columns + non-zero) time complexity."
        },
        "caseStudy": "Managing Student Examination Database: A university department stores scores for 1,000 students across 6 subjects. Since many students take optional electives, the grade matrix contains 85% null/zero values. Using a 3-tuple sparse matrix representation drastically reduces RAM usage while enabling rapid calculation of class averages, highest marks, and lowest marks.",
        "formulas": [
          "Time Complexity: T(n) <= c * g(n) for all n >= n0 (Big-O)",
          "Lower Bound: T(n) >= c * g(n) for all n >= n0 (Big-Omega)",
          "Tight Bound: c1 * g(n) <= T(n) <= c2 * g(n) (Big-Theta)",
          "Sparse Matrix Triplet: Element(row_index, col_index, non_zero_val)"
        ],
        "vivaQuestions": [
          {
            "q": "What is the difference between a linear and non-linear data structure?",
            "a": "In linear data structures (arrays, linked lists, stacks, queues), elements are arranged sequentially and traversed in single level. In non-linear structures (trees, graphs), elements have hierarchical or multi-connected relationships."
          },
          {
            "q": "Why is Big-O notation preferred over actual CPU execution time in seconds?",
            "a": "CPU execution time varies across hardware, OS, and background processes. Big-O provides a hardware-independent mathematical measure of how an algorithm scales as input size approaches infinity."
          },
          {
            "q": "How does Fast Transpose of a sparse matrix achieve O(cols + non-zero) complexity?",
            "a": "By precomputing the frequency count of elements in each column and computing starting address indices (row_terms array), each non-zero element is placed directly into its final transposed position in a single pass."
          }
        ],
        "example": "Consider a phone book. If you look up names one by one from page 1, that is linear search O(n). If you open the book in the middle and halve the remaining pages each step because names are alphabetically sorted, that is binary search O(log n), illustrating divide-and-conquer efficiency.",
        "codeExample": "// Sparse Matrix Representation & Fast Transpose in C++\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Element {\n    int row, col, val;\n};\n\nvoid fastTranspose(const vector<Element>& a, vector<Element>& b, int totalCols, int nonZero) {\n    b.resize(nonZero);\n    vector<int> rowTerms(totalCols, 0), startingPos(totalCols, 0);\n\n    for (int i = 0; i < nonZero; i++) rowTerms[a[i].col]++;\n    startingPos[0] = 0;\n    for (int i = 1; i < totalCols; i++) startingPos[i] = startingPos[i - 1] + rowTerms[i - 1];\n\n    for (int i = 0; i < nonZero; i++) {\n        int pos = startingPos[a[i].col]++;\n        b[pos] = {a[i].col, a[i].row, a[i].val};\n    }\n}\n\nint main() {\n    vector<Element> mat = {{0, 1, 10}, {1, 2, 20}, {2, 0, 30}};\n    vector<Element> trans;\n    fastTranspose(mat, trans, 3, 3);\n    cout << \"Transposed Elements (Row, Col, Val):\" << endl;\n    for (auto &e : trans) cout << e.row << \" \" << e.col << \" \" << e.val << endl;\n    return 0;\n}",
        "pitfalls": [
          "1. Confusing worst-case time complexity O(n) with Big-O notation itself: Big-O is an upper bound on growth, not synonymous with worst-case.",
          "2. Omitting space required by the recursion call stack when analyzing auxiliary space complexity in divide-and-conquer algorithms.",
          "3. Storing dense matrices in triplet sparse matrix format, which creates a 3x memory overhead compared to a standard 2D array."
        ],
        "quiz": {
          "mcq": [
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
              "q": "If an algorithm's running time is described by T(n) = 2T(n/2) + O(n), what is its asymptotic time complexity by the Master Theorem?",
              "options": [
                "O(n)",
                "O(n log n)",
                "O(n^2)",
                "O(log n)"
              ],
              "answer": 1,
              "explanation": "By Master Theorem Case 2 (a=2, b=2, k=1, log_b(a) = 1 = k), the time complexity is O(n log n), characteristic of Merge Sort.",
              "difficulty": "Advanced"
            },
            {
              "q": "In a persistent data structure, what happens when an element is modified?",
              "options": [
                "The original structure is overwritten in memory",
                "A new version is created while the previous version remains accessible",
                "The entire system crashes due to memory leaks",
                "Pointers are permanently locked"
              ],
              "answer": 1,
              "explanation": "Persistent data structures preserve historical states by allocating new nodes along the mutation path while sharing unmodified substructures.",
              "difficulty": "Intermediate"
            }
          ],
          "short": [
            {
              "q": "Define space complexity and state the two components that constitute total memory space for an algorithm.",
              "keywords": [
                "fixed",
                "variable",
                "instruction",
                "data",
                "stack",
                "space"
              ],
              "modelAnswer": "Space complexity is the total amount of memory required by an algorithm to run to completion. It consists of: (1) Fixed part (instruction space, simple variables, constants) and (2) Variable part (dynamically allocated memory, recursion stack space, dependent on problem instance size n).",
              "explanation": "Focus on the distinction between fixed instruction space and input-dependent dynamic/stack memory."
            }
          ]
        }
      },
      {
        "id": "dsa-u2-stacks-queues",
        "name": "Unit 2: Stacks and Queues",
        "unitNumber": 2,
        "hours": 8,
        "subtopics": [
          "Stack Abstract Data Type (ADT) & Array/Linked Representation",
          "Stack Operations: Push, Pop, Peek, IsEmpty, IsFull",
          "Polish Notation: Infix, Prefix, and Postfix Expressions",
          "Infix to Postfix Conversion & Postfix Expression Evaluation",
          "Function Call Stack, Activation Records & Recursion Mechanics",
          "Queue ADT & Linear Queue Limitations (False Overflow)",
          "Circular Queue: Modulo Arithmetic Implementation",
          "Priority Queue (Ascending & Descending) & Double Ended Queue (Deque)",
          "Real-World Applications: CPU Scheduling & Print Spooling"
        ],
        "explanations": {
          "beginner": "A Stack is a Last-In, First-Out (LIFO) structure where additions and removals occur solely at the 'Top'. Imagine a stack of cafeteria trays: the last tray placed on top is the first one removed. A Queue is a First-In, First-Out (FIFO) structure where items enter at the 'Rear' and depart from the 'Front', like customers standing in line at a cinema ticket counter.",
          "intermediate": "Linear queues implemented in arrays suffer from 'false overflow' when elements are dequeued, leaving unused memory at the beginning. Circular queues resolve this using modulo arithmetic: `rear = (rear + 1) % capacity`. Stacks play a vital role in parsing arithmetic expressions: human-readable infix expressions (e.g., A + B * C) are converted to compiler-friendly postfix (A B C * +) to eliminate ambiguity without needing parentheses.",
          "advanced": "A Double-Ended Queue (Deque) permits insertions and deletions at both ends (Input-Restricted and Output-Restricted variants). Priority Queues process elements based on priority rather than arrival order, implemented using binary heaps with O(log n) enqueue/dequeue operations. The call stack manages activation records (stack frames) during recursion, containing local variables, parameters, and return addresses; unbounded recursion exhausts stack memory, triggering stack overflow."
        },
        "caseStudy": "Expression Evaluation Engine in Scientific Calculators: When a user enters complex mathematical strings like '5 + 3 * (8 - 2) / 4', the calculator tokenizes the string, converts it to postfix notation using an operator stack and operator precedence rules (BODMAS), and subsequently evaluates the postfix stream using an operand stack to compute the exact result in linear O(n) time.",
        "formulas": [
          "Circular Queue Next Position: (index + 1) % MAX_SIZE",
          "Circular Queue Full Condition: (rear + 1) % MAX_SIZE == front",
          "Circular Queue Empty Condition: front == -1"
        ],
        "vivaQuestions": [
          {
            "q": "What is the primary advantage of a Circular Queue over a Linear Queue?",
            "a": "In a linear array queue, dequeuing elements leaves empty slots at the front that cannot be reused without shifting. A circular queue wraps around using modulo indexing, eliminating false overflow and utilizing memory fully."
          },
          {
            "q": "How does a stack evaluate a postfix expression?",
            "a": "Read operands and push them onto the stack. When an operator is encountered, pop the top two operands, apply the operator (op2 [operator] op1), and push the result back onto the stack. At the end, the stack top holds the evaluated answer."
          },
          {
            "q": "What is an activation record in recursion?",
            "a": "An activation record (stack frame) is a memory block pushed onto the runtime call stack containing a function call's parameters, local variables, and return address."
          }
        ],
        "example": "Your browser's 'Back' button uses a Stack: every page you visit is pushed onto the navigation stack. Clicking 'Back' pops the current URL and takes you to the previous one. In contrast, documents sent to an office printer form a Queue: the first document submitted prints first.",
        "codeExample": "// Infix to Postfix Conversion using Stack in C++\n#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;\n\nint precedence(char op) {\n    if (op == '+' || op == '-') return 1;\n    if (op == '*' || op == '/') return 2;\n    if (op == '^') return 3;\n    return 0;\n}\n\nstring infixToPostfix(string infix) {\n    stack<char> s;\n    string postfix = \"\";\n    for (char c : infix) {\n        if (isalnum(c)) {\n            postfix += c;\n        } else if (c == '(') {\n            s.push(c);\n        } else if (c == ')') {\n            while (!s.empty() && s.top() != '(') {\n                postfix += s.top();\n                s.pop();\n            }\n            if (!s.empty()) s.pop(); // discard '('\n        } else {\n            while (!s.empty() && precedence(s.top()) >= precedence(c)) {\n                postfix += s.top();\n                s.pop();\n            }\n            s.push(c);\n        }\n    }\n    while (!s.empty()) {\n        postfix += s.top();\n        s.pop();\n    }\n    return postfix;\n}\n\nint main() {\n    string exp = \"A+B*(C-D)/E\";\n    cout << \"Infix: \" << exp << endl;\n    cout << \"Postfix: \" << infixToPostfix(exp) << endl; // Output: ABCD-*E/+\n    return 0;\n}",
        "pitfalls": [
          "1. Incorrect operand order when popping from stack during subtraction/division: when popping A then B for operator '-', the operation is B - A, not A - B.",
          "2. Forgetting to check for stack underflow before calling `pop()` or `top()`.",
          "3. In circular queues, confusing the empty condition (`front == -1`) with the single-element condition (`front == rear`)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which data structure follows the Last-In, First-Out (LIFO) discipline?",
              "options": [
                "Queue",
                "Stack",
                "Binary Search Tree",
                "Linked List"
              ],
              "answer": 1,
              "explanation": "A Stack enforces LIFO: the most recently pushed element is the first to be popped.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the equivalent postfix expression for the infix expression: (A + B) * C?",
              "options": [
                "A B + C *",
                "A B C + *",
                "* + A B C",
                "A B + * C"
              ],
              "answer": 0,
              "explanation": "Parenthesized (A + B) evaluates first as `A B +`, which is then multiplied with C to yield `A B + C *`.",
              "difficulty": "Beginner"
            },
            {
              "q": "In a circular queue of capacity N represented by an array with indices 0 to N-1, what is the formula to advance the rear pointer?",
              "options": [
                "rear = rear + 1",
                "rear = (rear + 1) % N",
                "rear = (rear - 1) % N",
                "rear = (front + rear) / 2"
              ],
              "answer": 1,
              "explanation": "Modulo arithmetic `(rear + 1) % N` wraps index N-1 back to 0, creating a circular buffer.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the output of evaluating the postfix expression: `6 3 2 * + 4 -`?",
              "options": [
                "8",
                "14",
                "10",
                "12"
              ],
              "answer": 0,
              "explanation": "Step 1: 3 * 2 = 6. Step 2: 6 + 6 = 12. Step 3: 12 - 4 = 8.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which queue variant restricts insertions to one end but allows deletions from both ends?",
              "options": [
                "Output-Restricted Deque",
                "Input-Restricted Deque",
                "Circular Queue",
                "Priority Queue"
              ],
              "answer": 1,
              "explanation": "An Input-Restricted Deque allows insertion at only one end while permitting deletions at both front and rear.",
              "difficulty": "Advanced"
            }
          ],
          "short": [
            {
              "q": "Explain why linear queues suffer from false overflow and how a circular queue overcomes this problem.",
              "keywords": [
                "rear",
                "front",
                "false overflow",
                "wrap",
                "modulo",
                "space"
              ],
              "modelAnswer": "In a linear queue, when elements are repeatedly inserted and deleted, the rear pointer reaches the end of the array (MAX-1), causing an overflow condition even if front slots are empty. A circular queue treats the array as a ring by calculating `(rear + 1) % MAX`, wrapping around to reuse freed space at the front.",
              "explanation": "Highlight how pointer progression and modulo indexing reuse available space."
            }
          ]
        }
      },
      {
        "id": "dsa-u3-linked-lists",
        "name": "Unit 3: Linked Lists",
        "unitNumber": 3,
        "hours": 6,
        "subtopics": [
          "Linked List Fundamentals: Nodes, Data Field, and Pointer References",
          "Singly Linked List: Insertion (Head, Tail, Middle), Deletion, and Traversal",
          "Doubly Linked List (DLL): Forward and Backward Navigation & Node Structure",
          "Circular Singly & Circular Doubly Linked Lists",
          "Generalized Linked List (GLL): Definition, Head/Tail Representation & Depth",
          "Polynomial Representation and Addition using Linked Structures",
          "Dynamic Memory Allocation: malloc/free vs new/delete & Dangling Pointers",
          "Comparative Analysis: Arrays vs Linked Lists (Time & Space Trade-offs)"
        ],
        "explanations": {
          "beginner": "A Linked List is a linear collection of data elements called 'nodes', where linear order is determined not by physical memory addresses, but by pointers connecting each node to the next. In a Singly Linked List, each node holds data and a pointer to the next node (`next`). The first node is the 'head', and the last node points to `NULL`. Unlike arrays, linked lists can grow or shrink dynamically without requiring contiguous memory.",
          "intermediate": "Doubly Linked Lists (DLL) add a `prev` pointer to each node, enabling bidirectional traversal and O(1) deletion given a pointer to the target node. Circular Linked Lists loop the last node back to the head node (`last->next = head`), making them ideal for continuous cyclic processes like round-robin CPU scheduling. Memory overhead is higher than arrays due to pointer storage (4 or 8 bytes per node).",
          "advanced": "A Generalized Linked List (GLL) is a list where each element is either an atom (single value) or another sublist: `L = (a1, a2, ..., an)`. GLLs represent multivariate polynomials, set hierarchies, and LISP expressions. When implementing polynomial addition with linked lists, terms are sorted by descending exponents; identical exponents add coefficients, while distinct exponents append directly in O(m + n) time."
        },
        "caseStudy": "Music Streaming Playlist Management: A music app requires smooth playback where users can skip forward to the next song, return to the previous track, insert tracks anywhere in the queue, and loop the playlist indefinitely. A Circular Doubly Linked List perfectly implements this with O(1) track insertion/removal, instant bidirectional navigation, and seamless loop playback.",
        "formulas": [
          "Singly Node Size = sizeof(data) + sizeof(Node*)",
          "Doubly Node Size = sizeof(data) + 2 * sizeof(Node*)",
          "Circular LL Termination: pointer->next == head"
        ],
        "vivaQuestions": [
          {
            "q": "What is the primary advantage of a linked list over a dynamic array (like std::vector)?",
            "a": "Linked lists provide O(1) insertions and deletions at known positions without shifting subsequent elements, and they do not require contiguous memory blocks."
          },
          {
            "q": "What is a Generalized Linked List (GLL)?",
            "a": "A GLL is an extension of linked lists where elements can be either an atomic data value or a pointer to another generalized sublist, represented with flag, tag, and union structures."
          },
          {
            "q": "What is a memory leak in linked lists?",
            "a": "A memory leak occurs when a node is removed or unlinked from the list without freeing its heap-allocated memory, making that memory unreachable yet unclaimable by the operating system."
          }
        ],
        "example": "Think of a scavenger hunt: each clue gives you some information and the address of where to find the next clue. You cannot jump directly to clue #5 without following clues 1 through 4. That is exactly how singly linked list traversal works.",
        "codeExample": "// Singly Linked List Insertion, Deletion and Traversal in C++\n#include <iostream>\nusing namespace std;\n\nstruct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\nclass LinkedList {\npublic:\n    Node* head;\n    LinkedList() : head(nullptr) {}\n\n    void insertHead(int val) {\n        Node* newNode = new Node(val);\n        newNode->next = head;\n        head = newNode;\n    }\n\n    void deleteValue(int val) {\n        if (!head) return;\n        if (head->data == val) {\n            Node* temp = head;\n            head = head->next;\n            delete temp;\n            return;\n        }\n        Node* curr = head;\n        while (curr->next && curr->next->data != val) curr = curr->next;\n        if (curr->next) {\n            Node* temp = curr->next;\n            curr->next = curr->next->next;\n            delete temp;\n        }\n    }\n\n    void display() {\n        Node* temp = head;\n        while (temp) {\n            cout << temp->data << \" -> \";\n            temp = temp->next;\n        }\n        cout << \"NULL\" << endl;\n    }\n};\n\nint main() {\n    LinkedList list;\n    list.insertHead(30);\n    list.insertHead(20);\n    list.insertHead(10);\n    list.display(); // Output: 10 -> 20 -> 30 -> NULL\n    list.deleteValue(20);\n    list.display(); // Output: 10 -> 30 -> NULL\n    return 0;\n}",
        "pitfalls": [
          "1. Losing the head pointer reference during traversal by writing `head = head->next` instead of using a temporary cursor `temp = head`.",
          "2. Dereferencing `NULL` pointers (Segmentation Fault) by checking `temp->next->data` before verifying that `temp->next != NULL`.",
          "3. In circular linked lists, using `while(temp != NULL)` causes an infinite loop since the tail node points back to head."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "What is the time complexity to insert a new node at the beginning of a singly linked list with n nodes?",
              "options": [
                "O(1)",
                "O(n)",
                "O(log n)",
                "O(n^2)"
              ],
              "answer": 0,
              "explanation": "Inserting at the head requires updating only the new node's next pointer and head reference, taking constant O(1) time.",
              "difficulty": "Beginner"
            },
            {
              "q": "In a Doubly Linked List, how many pointer fields are stored in each individual node?",
              "options": [
                "1",
                "2",
                "3",
                "0"
              ],
              "answer": 1,
              "explanation": "Each node in a doubly linked list holds 2 pointers: one to the `next` node and one to the `prev` node.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the condition that indicates the end of a Circular Singly Linked List during traversal?",
              "options": [
                "temp == NULL",
                "temp->next == head",
                "temp->next == NULL",
                "temp->data == 0"
              ],
              "answer": 1,
              "explanation": "In a circular linked list, the tail node points back to `head`, so `temp->next == head` identifies the cycle boundary.",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which data structure is best suited for representing multivariate polynomials where terms contain sub-lists of variables?",
              "options": [
                "Stack",
                "Generalized Linked List (GLL)",
                "Queue",
                "Static Array"
              ],
              "answer": 1,
              "explanation": "Generalized Linked Lists allow nodes to point to sub-lists, directly mapping recursive structures like multivariate polynomials.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the time complexity to access the k-th element in a singly linked list of size n?",
              "options": [
                "O(1)",
                "O(k)",
                "O(n log n)",
                "O(log k)"
              ],
              "answer": 1,
              "explanation": "Linked lists lack random access indexing; accessing the k-th element requires traversing sequentially from head, taking O(k) steps.",
              "difficulty": "Beginner"
            }
          ],
          "short": [
            {
              "q": "Compare arrays and linked lists in terms of memory allocation, random access, and insertion/deletion efficiency.",
              "keywords": [
                "contiguous",
                "random access",
                "dynamic",
                "insert",
                "delete",
                "shift",
                "pointer"
              ],
              "modelAnswer": "Arrays use contiguous memory and provide O(1) random access by index, but require expensive O(n) element shifting for insertions/deletions. Linked lists use non-contiguous heap nodes with pointer overhead, require O(n) sequential traversal to access elements, but achieve O(1) insertions/deletions once the node pointer is known.",
              "explanation": "Address memory layout, indexing speeds, and mutation trade-offs."
            }
          ]
        }
      },
      {
        "id": "dsa-u4-searching-sorting",
        "name": "Unit 4: Searching and Sorting Techniques",
        "unitNumber": 4,
        "hours": 6,
        "subtopics": [
          "Linear Search: Unsorted Arrays & Best/Worst Case Bounds",
          "Binary Search: Divide-and-Conquer on Sorted Arrays (Iterative & Recursive)",
          "Fibonacci Search: Golden Ratio Division using Addition & Subtraction",
          "Quadratic Sorting: Bubble Sort, Selection Sort, and Insertion Sort",
          "Advanced Sorting: Quick Sort (Partitioning, Pivot Selection, Worst-Case Avoidance)",
          "Merge Sort: Divide, Conquer, and Combine (Stable O(n log n))",
          "Heap Sort: Complete Binary Trees, Max-Heapify, and In-Place Sorting",
          "Hashing Concepts: Hash Functions (Division, Mid-Square, Folding)",
          "Collision Resolution: Linear Probing with and without Replacement"
        ],
        "explanations": {
          "beginner": "Searching finds the location of a target value within a collection. Linear search inspects every element sequentially (O(n)). Binary search divides sorted collections in half repeatedly, achieving rapid O(log n) lookups. Sorting arranges elements in ascending or descending order. Elementary sorts like Bubble Sort compare adjacent items, while Insertion Sort builds a sorted section one item at a time.",
          "intermediate": "Advanced sorting algorithms achieve O(n log n) average efficiency: Quick Sort partitions around a pivot, sorting subarrays recursively. Merge Sort splits the array into single-element lists and merges them in sorted order (stable sort). Heap Sort uses a complete binary tree satisfying the heap property (max-heap). Hashing maps keys to table indices using a hash function `h(k) = k % table_size`. When multiple keys hash to the same index, a collision occurs.",
          "advanced": "Fibonacci search divides search ranges using Fibonacci numbers, utilizing only addition and subtraction rather than division/bit-shifts. In open addressing hashing, Linear Probing checks sequential slots `(h(k) + i) % m`. Under 'Linear Probing with Replacement', if a colliding key encounters a slot occupied by an element that belongs to a different hash chain, the occupant is evicted to its secondary position, eliminating clustering and significantly reducing search chain lengths."
        },
        "caseStudy": "E-Commerce Product Catalog Search by Price Range: An online retail store lists 2,000,000 products. When shoppers filter items between $20 and $100, the catalog uses a pre-sorted price index with Binary Search to find the lower and upper bounds in O(log n) time, returning matching inventory in milliseconds rather than scanning millions of rows sequentially.",
        "formulas": [
          "Binary Search Mid: mid = low + (high - low) / 2",
          "Division Hash Function: h(k) = k % TableSize",
          "Linear Probing Address: h(k, i) = (h(k) + i) % TableSize"
        ],
        "vivaQuestions": [
          {
            "q": "Why is Quick Sort often faster in practice than Merge Sort despite having a worst-case of O(n^2)?",
            "a": "Quick Sort operates in-place with excellent CPU cache locality and small constant factors, whereas Merge Sort requires O(n) auxiliary memory for buffer allocations."
          },
          {
            "q": "What is the difference between Linear Probing with and without replacement in hashing?",
            "a": "Without replacement, a colliding key takes the next empty slot without disturbing current occupants. With replacement, if a slot is occupied by an element whose home address is different, that occupant is moved to an alternate slot, keeping primary chain sequences intact."
          },
          {
            "q": "What makes a sorting algorithm 'stable'?",
            "a": "A sorting algorithm is stable if it preserves the relative order of elements that have equal key values (e.g., Merge Sort and Insertion Sort are stable, while Quick Sort and Heap Sort are not)."
          }
        ],
        "example": "Searching for a word in an English dictionary: you do not start at the first page reading every entry (linear search). You open to the middle, check the letter, and discard the entire half where the word cannot exist (binary search).",
        "codeExample": "// Quick Sort and Binary Search Implementation in Python\ndef quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid # found at index mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1 # not found\n\ndata = [64, 34, 25, 12, 22, 11, 90]\nsorted_data = quick_sort(data)\nprint(\"Sorted Array:\", sorted_data)\nidx = binary_search(sorted_data, 25)\nprint(\"Index of 25:\", idx) # Output: 3",
        "pitfalls": [
          "1. Calculating `mid = (low + high) / 2` in C/C++/Java can trigger integer overflow for large arrays; use `mid = low + (high - low) / 2`.",
          "2. Performing Binary Search on an unsorted array, which produces incorrect negative or corrupted search results.",
          "3. Choosing the first element as pivot in Quick Sort: on already sorted data, this degrades performance to worst-case O(n^2)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "What is the worst-case time complexity of Quick Sort?",
              "options": [
                "O(n log n)",
                "O(n^2)",
                "O(n)",
                "O(log n)"
              ],
              "answer": 1,
              "explanation": "When the chosen pivot is consistently the smallest or largest element (e.g., sorted array with first element as pivot), Quick Sort degrades to O(n^2).",
              "difficulty": "Beginner"
            },
            {
              "q": "Which of the following sorting algorithms is guaranteed to run in O(n log n) time in all cases (best, average, and worst)?",
              "options": [
                "Quick Sort",
                "Bubble Sort",
                "Merge Sort",
                "Insertion Sort"
              ],
              "answer": 2,
              "explanation": "Merge Sort always divides the array in half and merges sorted halves, guaranteeing O(n log n) across best, average, and worst cases.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the prerequisite condition for applying Binary Search on a dataset?",
              "options": [
                "Elements must be stored in a linked list",
                "The array must be sorted",
                "The array size must be a power of 2",
                "All elements must be positive integers"
              ],
              "answer": 1,
              "explanation": "Binary Search relies on sorted order to eliminate half of the remaining search space on each comparison.",
              "difficulty": "Beginner"
            },
            {
              "q": "In open addressing hashing, what problem occurs when consecutive occupied slots create long continuous blocks?",
              "options": [
                "Secondary Clustering",
                "Primary Clustering",
                "Hash Overflow",
                "Underflow"
              ],
              "answer": 1,
              "explanation": "Linear probing creates primary clustering: occupied slots group together, increasing average search time for subsequent keys.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the time complexity of building a Max-Heap from an unsorted array of n elements?",
              "options": [
                "O(n log n)",
                "O(n)",
                "O(n^2)",
                "O(log n)"
              ],
              "answer": 1,
              "explanation": "Bottom-up heap construction (Floyd's algorithm) builds a heap in linear O(n) time, not O(n log n).",
              "difficulty": "Advanced"
            }
          ],
          "short": [
            {
              "q": "Explain the difference between Quick Sort and Merge Sort in terms of algorithmic strategy, stability, and auxiliary memory.",
              "keywords": [
                "divide and conquer",
                "pivot",
                "merge",
                "stable",
                "auxiliary",
                "in-place",
                "memory"
              ],
              "modelAnswer": "Both use Divide and Conquer. Quick Sort partitions around a pivot in-place (O(1) extra space, unstable, O(n^2) worst case). Merge Sort divides into equal halves, requires O(n) auxiliary memory for merging, is strictly stable, and guarantees O(n log n) worst-case time.",
              "explanation": "Focus on in-place partitioning vs auxiliary merging, stability, and worst-case bounds."
            }
          ]
        }
      },
      {
        "id": "dsa-u5-trees",
        "name": "Unit 5: Trees",
        "unitNumber": 5,
        "hours": 8,
        "subtopics": [
          "Tree Terminology: Root, Node, Edge, Degree, Depth, Height, and Level",
          "Binary Tree Properties: Maximum Nodes per Level & Full vs Complete Trees",
          "Representations of Binary Trees: Array-based Sequential vs Linked Pointer",
          "Binary Tree Traversals: In-Order (LDR), Pre-Order (DLR), Post-Order (LRD)",
          "Expression Trees: Construction from Postfix and Evaluation",
          "Binary Search Tree (BST): Definition, Insertion, Deletion (3 Cases), and Search",
          "Optimal Binary Search Tree (OBST) Concepts",
          "AVL Tree Fundamentals: Balance Factor (-1, 0, +1)",
          "AVL Rotations: Single (LL, RR) and Double (LR, RL) Rebalancing"
        ],
        "explanations": {
          "beginner": "A Tree is a non-linear, hierarchical data structure composed of nodes connected by edges. The topmost node is the 'Root'. Nodes without children are 'Leaves'. A Binary Tree restricts each node to at most two children: 'Left Child' and 'Right Child'. In-order traversal visits Left subtree, Root node, then Right subtree. In a Binary Search Tree (BST), every node to the left is smaller than the parent, and every node to the right is larger.",
          "intermediate": "Deleting a node in a BST involves three cases: (1) Leaf node (simply remove), (2) Node with one child (bypass to child), (3) Node with two children (replace with In-order Successor or Predecessor, then delete that node). If insertions occur in sorted order, a regular BST degrades into a skewed linked list with O(n) operations. An AVL Tree is a self-balancing BST where the height difference (Balance Factor = height(left) - height(right)) between left and right subtrees never exceeds ±1.",
          "advanced": "When an AVL tree becomes unbalanced after insertion or deletion (|BF| > 1), one of four rotations restores equilibrium in O(1) time: Single Left-Left (LL), Single Right-Right (RR), Double Left-Right (LR), or Double Right-Left (RL). An Optimal Binary Search Tree (OBST) uses dynamic programming to minimize total search cost based on access probabilities of successful and unsuccessful search keys."
        },
        "caseStudy": "Organizational Hierarchy of an Engineering College: A college management system represents its administration as a tree: the Principal is the Root node; Deans are internal branch nodes; Heads of Departments (HODs) are child nodes; faculty and lab assistants form leaf nodes. This hierarchical representation enables recursive traversal for reporting structures and role-based access permissions.",
        "formulas": [
          "Max nodes at level i of binary tree: 2^i (level 0 is root)",
          "Max nodes in binary tree of height h: 2^(h+1) - 1",
          "AVL Balance Factor: BF(node) = height(left_subtree) - height(right_subtree)",
          "Valid AVL Balance Factor: BF in {-1, 0, +1}"
        ],
        "vivaQuestions": [
          {
            "q": "What is the In-order traversal property of a Binary Search Tree?",
            "a": "The In-order traversal (Left, Root, Right) of any valid Binary Search Tree always outputs keys in strictly ascending sorted order."
          },
          {
            "q": "What are the four rotation types used to balance an AVL tree?",
            "a": "LL (Single Right Rotation), RR (Single Left Rotation), LR (Left Rotation on child followed by Right Rotation on parent), and RL (Right Rotation on child followed by Left Rotation on parent)."
          },
          {
            "q": "How do you delete a node with two children from a BST?",
            "a": "Find the node's In-order Successor (smallest value in right subtree) or In-order Predecessor (largest value in left subtree), copy its value into the target node, and recursively delete the successor/predecessor node."
          }
        ],
        "example": "Consider a computer's file system: the C: drive is the root folder. Inside it are subfolders (Windows, Users, Program Files), and inside those are individual files (leaves). Searching or moving through folders mirrors hierarchical tree traversal.",
        "codeExample": "// Binary Search Tree (BST) Insertion and Inorder Traversal in C++\n#include <iostream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* insertBST(TreeNode* root, int key) {\n    if (!root) return new TreeNode(key);\n    if (key < root->val) root->left = insertBST(root->left, key);\n    else if (key > root->val) root->right = insertBST(root->right, key);\n    return root;\n}\n\nvoid inorder(TreeNode* root) {\n    if (!root) return;\n    inorder(root->left);\n    cout << root->val << \" \"; // Always prints sorted order\n    inorder(root->right);\n}\n\nint main() {\n    TreeNode* root = nullptr;\n    int keys[] = {50, 30, 20, 40, 70, 60, 80};\n    for (int k : keys) root = insertBST(root, k);\n    cout << \"BST Inorder Traversal (Sorted): \";\n    inorder(root); // Output: 20 30 40 50 60 70 80\n    cout << endl;\n    return 0;\n}",
        "pitfalls": [
          "1. Assuming all binary trees are balanced: inserting sorted data (1, 2, 3, 4, 5) into a BST creates a skewed tree of height n with O(n) search time.",
          "2. In AVL rotations, forgetting that double rotation (LR) requires rotating the left child left first, then rotating the root right.",
          "3. Confusing tree depth (number of edges from root to node) with tree height (number of edges on longest downward path to a leaf)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "What is the In-Order traversal order of a Binary Tree?",
              "options": [
                "Root, Left, Right",
                "Left, Root, Right",
                "Left, Right, Root",
                "Right, Root, Left"
              ],
              "answer": 1,
              "explanation": "In-Order traversal follows the sequence: Left Subtree -> Root Node -> Right Subtree (LDR).",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the maximum number of nodes in a binary tree of height h (where a tree with a single root node has height 0)?",
              "options": [
                "2^h",
                "2^(h+1) - 1",
                "2h + 1",
                "h^2"
              ],
              "answer": 1,
              "explanation": "A complete binary tree of height h contains sum(2^i for i=0 to h) = 2^(h+1) - 1 nodes.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the valid range of the Balance Factor for any node in an AVL tree?",
              "options": [
                "Any positive number",
                "{-1, 0, 1}",
                "{-2, 0, 2}",
                "{0, 1}"
              ],
              "answer": 1,
              "explanation": "An AVL tree guarantees that for every node, |height(left) - height(right)| <= 1, meaning Balance Factor is in {-1, 0, 1}.",
              "difficulty": "Beginner"
            },
            {
              "q": "Which rotation is required when a new node is inserted into the right subtree of the left child of an unbalanced node?",
              "options": [
                "LL Rotation",
                "RR Rotation",
                "LR Rotation",
                "RL Rotation"
              ],
              "answer": 2,
              "explanation": "Left-Right (LR) imbalance requires a double rotation: left rotation on left child, followed by right rotation on parent.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What is the worst-case search time complexity in a self-balancing AVL Tree with n nodes?",
              "options": [
                "O(n)",
                "O(log n)",
                "O(n log n)",
                "O(1)"
              ],
              "answer": 1,
              "explanation": "Because an AVL tree strictly balances its height to O(log n), searches never exceed O(log n) even in the worst case.",
              "difficulty": "Intermediate"
            }
          ],
          "short": [
            {
              "q": "Explain the 3 cases encountered when deleting a node from a Binary Search Tree (BST).",
              "keywords": [
                "leaf",
                "one child",
                "two children",
                "successor",
                "predecessor",
                "inorder"
              ],
              "modelAnswer": "Case 1 (Leaf Node): Node has 0 children; directly delete and set parent pointer to null. Case 2 (Single Child): Node has 1 child; bypass target node by linking its parent directly to its child. Case 3 (Two Children): Find In-order Successor (minimum in right subtree), copy its value into the target node, then delete the successor node.",
              "explanation": "Must address 0, 1, and 2 children cases with in-order successor replacement."
            }
          ]
        }
      },
      {
        "id": "dsa-u6-graphs",
        "name": "Unit 6: Graphs",
        "unitNumber": 6,
        "hours": 7,
        "subtopics": [
          "Graph Definitions: Vertices, Edges, Directed vs Undirected, Weighted Graphs",
          "Graph Representations: Adjacency Matrix vs Adjacency List (Space & Density Analysis)",
          "Breadth First Search (BFS): Queue-based Traversal & Level-Order Discovery",
          "Depth First Search (DFS): Stack/Recursion-based Traversal & Backtracking",
          "Minimum Spanning Tree (MST): Cut Property & Cycle Property",
          "Kruskal's Algorithm: Greedy Edge Sorting & Disjoint Set Union (DSU)",
          "Prim's Algorithm: Growing Tree from Cut with Priority Queue",
          "Single-Source Shortest Path: Dijkstra's Algorithm (Greedy Relaxation)",
          "All-Pairs Shortest Path: Floyd-Warshall Algorithm (Transitive Closure)"
        ],
        "explanations": {
          "beginner": "A Graph G = (V, E) consists of a set of Vertices (nodes) and Edges (connections). Graphs model networks like roads, electrical grids, and social connections. In an undirected graph, connections are two-way; in a directed graph (digraph), edges point one-way. Breadth First Search (BFS) explores all neighbors level-by-level using a Queue. Depth First Search (DFS) dives deep along a branch until it hits a dead end, then backtracks using a Stack or recursion.",
          "intermediate": "An Adjacency Matrix uses an |V| x |V| 2D array, consuming O(V^2) memory—ideal for dense graphs where checking edge existence is O(1). An Adjacency List uses an array of linked lists consuming O(V + E) space—optimal for sparse real-world networks. A Spanning Tree of a connected graph is a subgraph containing all vertices with exactly |V| - 1 edges and no cycles. A Minimum Spanning Tree (MST) minimizes total edge weight.",
          "advanced": "Kruskal's algorithm finds an MST by sorting edges and using Disjoint Set Union (DSU) with path compression in O(E log E) time. Prim's algorithm grows a single tree from an arbitrary start node using a min-heap in O(E log V). Dijkstra's algorithm finds the shortest paths from a single source to all vertices on non-negative weighted graphs using edge relaxation: `if (dist[u] + weight < dist[v]) dist[v] = dist[u] + weight`. Floyd-Warshall computes shortest paths between all vertex pairs in O(V^3) using dynamic programming."
        },
        "caseStudy": "Google Maps Route Navigation & Traffic Optimization: Road intersections represent vertices and roads represent edges weighted by travel time. When calculating the fastest route between Chandwad and Pune, the navigation engine executes Dijkstra's / A* shortest path algorithm across the road graph, dynamically relaxing edge weights based on real-time traffic sensor data.",
        "formulas": [
          "Number of edges in MST: |E_mst| = |V| - 1",
          "Dijkstra Edge Relaxation: if (d[u] + w(u,v) < d[v]) d[v] = d[u] + w(u,v)",
          "Floyd-Warshall DP: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])"
        ],
        "vivaQuestions": [
          {
            "q": "What is the difference between Prim's and Kruskal's MST algorithms?",
            "a": "Prim's grows a single connected tree vertex-by-vertex using a priority queue, making it faster for dense graphs. Kruskal's sorts all edges globally and adds them one-by-one using Disjoint Set Union (DSU) to avoid cycles, performing better on sparse graphs."
          },
          {
            "q": "Why does Dijkstra's algorithm fail on graphs with negative edge weights?",
            "a": "Dijkstra assumes that once a vertex is marked visited and extracted from the priority queue, its shortest distance is finalized. Negative edge weights can yield a shorter path later, violating this greedy premise; the Bellman-Ford algorithm must be used instead."
          },
          {
            "q": "What is the space complexity of an Adjacency Matrix vs an Adjacency List?",
            "a": "Adjacency Matrix requires O(V^2) space regardless of edges. Adjacency List requires O(V + E) space for directed graphs and O(V + 2E) for undirected graphs, saving massive memory for sparse networks."
          }
        ],
        "example": "Social Networks (like LinkedIn or Instagram): users are vertices. A connection or follow is an edge. Finding '2nd-degree connections' (friends of friends) is solved directly by running Breadth First Search (BFS) starting from your profile to depth 2.",
        "codeExample": "# Dijkstra's Shortest Path Algorithm in Python using heapq\nimport heapq\n\ndef dijkstra(graph, start):\n    distances = {node: float('inf') for node in graph}\n    distances[start] = 0\n    pq = [(0, start)] # (distance, node)\n\n    while pq:\n        curr_dist, curr_node = heapq.heappop(pq)\n        if curr_dist > distances[curr_node]:\n            continue\n        for neighbor, weight in graph[curr_node].items():\n            distance = curr_dist + weight\n            if distance < distances[neighbor]:\n                distances[neighbor] = distance\n                heapq.heappush(pq, (distance, neighbor))\n\n    return distances\n\n# Graph represented as Adjacency List\ngraph = {\n    'A': {'B': 4, 'C': 2},\n    'B': {'A': 4, 'C': 1, 'D': 5},\n    'C': {'A': 2, 'B': 1, 'D': 8, 'E': 10},\n    'D': {'B': 5, 'C': 8, 'E': 2},\n    'E': {'C': 10, 'D': 2}\n}\n\nshortest_paths = dijkstra(graph, 'A')\nprint(\"Shortest distances from node A:\")\nfor node, d in shortest_paths.items():\n    print(f\"To {node}: {d}\") # Output: A:0, C:2, B:3, D:8, E:10",
        "pitfalls": [
          "1. Using Dijkstra's algorithm when negative weight edges exist: it will return suboptimal paths or loop infinitely without error flags.",
          "2. Forgetting to mark nodes as 'visited' in BFS/DFS, causing infinite loops in cyclic graphs.",
          "3. In Kruskal's algorithm, attempting to check for cycles with DFS instead of Disjoint Set Union (DSU), resulting in O(E * V) runtime instead of O(E log E)."
        ],
        "quiz": {
          "mcq": [
            {
              "q": "Which data structure is typically used to implement Breadth First Search (BFS) on a graph?",
              "options": [
                "Stack",
                "Queue",
                "Binary Heap",
                "Hash Table"
              ],
              "answer": 1,
              "explanation": "BFS discovers nodes level-by-level using a FIFO Queue to ensure all immediate neighbors are visited first.",
              "difficulty": "Beginner"
            },
            {
              "q": "How many edges are present in a Minimum Spanning Tree of a connected graph with V vertices?",
              "options": [
                "V",
                "V - 1",
                "V + 1",
                "2V"
              ],
              "answer": 1,
              "explanation": "Any spanning tree of a graph with V vertices connects all vertices with no cycles, containing exactly V - 1 edges.",
              "difficulty": "Beginner"
            },
            {
              "q": "What is the time complexity of Dijkstra's algorithm implemented with a min-priority queue (binary heap)?",
              "options": [
                "O(V^2)",
                "O((V + E) log V)",
                "O(V * E)",
                "O(V^3)"
              ],
              "answer": 1,
              "explanation": "Extract-min takes O(log V) for V vertices and edge relaxations take O(E log V), giving total time O((V + E) log V).",
              "difficulty": "Intermediate"
            },
            {
              "q": "Which algorithm is capable of computing all-pairs shortest paths on a weighted graph using dynamic programming?",
              "options": [
                "Prim's Algorithm",
                "Floyd-Warshall Algorithm",
                "Kruskal's Algorithm",
                "Breadth First Search"
              ],
              "answer": 1,
              "explanation": "Floyd-Warshall uses a 3-nested loop dynamic programming formula to compute shortest paths between all pairs in O(V^3) time.",
              "difficulty": "Intermediate"
            },
            {
              "q": "What data structure enables Kruskal's algorithm to perform cycle detection in near constant amortized time?",
              "options": [
                "Adjacency Matrix",
                "Disjoint Set Union (DSU) with Path Compression",
                "Balanced AVL Tree",
                "Circular Queue"
              ],
              "answer": 1,
              "explanation": "DSU with union by rank and path compression checks and unites sets in O(α(V)) time, where α is the inverse Ackermann function.",
              "difficulty": "Advanced"
            }
          ],
          "short": [
            {
              "q": "State the relaxation condition in Dijkstra's algorithm and explain how edge weights determine shortest paths.",
              "keywords": [
                "relaxation",
                "dist",
                "weight",
                "shorter",
                "greedy",
                "update"
              ],
              "modelAnswer": "Edge relaxation examines an edge (u, v) with weight w. If the known distance to u plus weight w is strictly less than the currently recorded distance to v (`dist[u] + w < dist[v]`), `dist[v]` is updated to `dist[u] + w`. This greedy update ensures that paths continually settle toward minimum cost.",
              "explanation": "State the mathematical inequality and explain its iterative convergence toward the shortest path."
            }
          ]
        }
      }
    ]
  }
,"discrete mathematics & statistics": {
  "displayName": "Discrete Mathematics & Statistics",
  "courseCode": "24-PCC-AD-2-01",
  "semester": "Semester III",
  "credits": 3,
  "topics": [
    {
      "id": "dm-u1",
      "name": "Unit 1: Set Theory & Mathematical Logic",
      "unitNumber": 1,
      "hours": 7,
      "subtopics": [
        "Sets",
        "set operations (union, intersection, complement)",
        "Venn diagrams",
        "propositional logic",
        "truth tables",
        "tautologies",
        "predicates",
        "quantifiers"
      ],
      "explanation": {
        "beginner": "An introduction to Set Theory & Mathematical Logic.",
        "intermediate": "Detailed breakdown of Set Theory & Mathematical Logic concepts.",
        "advanced": "Advanced theoretical aspects of Set Theory & Mathematical Logic."
      },
      "caseStudy": "Direct, indirect, contradiction proofs",
      "formulas": [
        "A U B = B U A",
        "De Morgan: ~(P ^ Q) = ~P v ~Q"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Sets.",
          "a": "Sets is a foundational concept."
        },
        {
          "q": "How does set operations (union, intersection, complement) work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of Venn diagrams?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Set Theory & Mathematical Logic like building a house.",
      "example": {
        "problem": "Solve a basic Set Theory & Mathematical Logic problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Sets",
        "Applying set operations (union, intersection, complement) incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "dm-u1-q1",
            "q": "Which of the following relates to Sets?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Sets."
          },
          {
            "id": "dm-u1-q2",
            "q": "Which of the following relates to set operations (union, intersection, complement)?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding set operations (union, intersection, complement)."
          },
          {
            "id": "dm-u1-q3",
            "q": "Which of the following relates to Venn diagrams?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Venn diagrams."
          },
          {
            "id": "dm-u1-q4",
            "q": "Which of the following relates to propositional logic?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding propositional logic."
          },
          {
            "id": "dm-u1-q5",
            "q": "Which of the following relates to truth tables?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding truth tables."
          }
        ],
        "short": [
          {
            "id": "dm-u1-s1",
            "q": "Briefly describe Sets and set operations (union, intersection, complement).",
            "keywords": [
              "Sets",
              "set operations (union, intersection, complement)",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Sets and set operations (union, intersection, complement) comprehensively."
          }
        ]
      }
    },
    {
      "id": "dm-u2",
      "name": "Unit 2: Graph Theory",
      "unitNumber": 2,
      "hours": 7,
      "subtopics": [
        "Introduction to graphs",
        "directed/undirected graphs",
        "isomorphism",
        "Euler paths",
        "Hamilton circuits",
        "Dijkstra algorithm",
        "graph coloring",
        "chromatic number"
      ],
      "explanation": {
        "beginner": "An introduction to Graph Theory.",
        "intermediate": "Detailed breakdown of Graph Theory concepts.",
        "advanced": "Advanced theoretical aspects of Graph Theory."
      },
      "caseStudy": "Web Graph, Google Maps",
      "formulas": [
        "V - E + F = 2"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Introduction to graphs.",
          "a": "Introduction to graphs is a foundational concept."
        },
        {
          "q": "How does directed/undirected graphs work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of isomorphism?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Graph Theory like building a house.",
      "example": {
        "problem": "Solve a basic Graph Theory problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Introduction to graphs",
        "Applying directed/undirected graphs incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "dm-u2-q1",
            "q": "Which of the following relates to Introduction to graphs?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Introduction to graphs."
          },
          {
            "id": "dm-u2-q2",
            "q": "Which of the following relates to directed/undirected graphs?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding directed/undirected graphs."
          },
          {
            "id": "dm-u2-q3",
            "q": "Which of the following relates to isomorphism?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding isomorphism."
          },
          {
            "id": "dm-u2-q4",
            "q": "Which of the following relates to Euler paths?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Euler paths."
          },
          {
            "id": "dm-u2-q5",
            "q": "Which of the following relates to Hamilton circuits?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Hamilton circuits."
          }
        ],
        "short": [
          {
            "id": "dm-u2-s1",
            "q": "Briefly describe Introduction to graphs and directed/undirected graphs.",
            "keywords": [
              "Introduction to graphs",
              "directed/undirected graphs",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Introduction to graphs and directed/undirected graphs comprehensively."
          }
        ]
      }
    },
    {
      "id": "dm-u3",
      "name": "Unit 3: Tree Theory",
      "unitNumber": 3,
      "hours": 8,
      "subtopics": [
        "Trees and properties",
        "binary trees",
        "BST",
        "inorder/preorder/postorder",
        "Huffman coding",
        "spanning trees",
        "Prim algorithm",
        "Kruskal algorithm"
      ],
      "explanation": {
        "beginner": "An introduction to Tree Theory.",
        "intermediate": "Detailed breakdown of Tree Theory concepts.",
        "advanced": "Advanced theoretical aspects of Tree Theory."
      },
      "caseStudy": "Expression Tree, Tic-Tac-Toe",
      "formulas": [
        "Max nodes in binary tree = 2^(h+1) - 1"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Trees and properties.",
          "a": "Trees and properties is a foundational concept."
        },
        {
          "q": "How does binary trees work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of BST?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Tree Theory like building a house.",
      "example": {
        "problem": "Solve a basic Tree Theory problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Trees and properties",
        "Applying binary trees incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "dm-u3-q1",
            "q": "Which of the following relates to Trees and properties?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Trees and properties."
          },
          {
            "id": "dm-u3-q2",
            "q": "Which of the following relates to binary trees?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding binary trees."
          },
          {
            "id": "dm-u3-q3",
            "q": "Which of the following relates to BST?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding BST."
          },
          {
            "id": "dm-u3-q4",
            "q": "Which of the following relates to inorder/preorder/postorder?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding inorder/preorder/postorder."
          },
          {
            "id": "dm-u3-q5",
            "q": "Which of the following relates to Huffman coding?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Huffman coding."
          }
        ],
        "short": [
          {
            "id": "dm-u3-s1",
            "q": "Briefly describe Trees and properties and binary trees.",
            "keywords": [
              "Trees and properties",
              "binary trees",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Trees and properties and binary trees comprehensively."
          }
        ]
      }
    },
    {
      "id": "dm-u4",
      "name": "Unit 4: Statistical Methods & Sampling",
      "unitNumber": 4,
      "hours": 7,
      "subtopics": [
        "Introduction to statistics",
        "population vs sample",
        "purposive sampling",
        "random sampling",
        "stratified sampling",
        "random numbers",
        "sampling distributions",
        "statistical inference"
      ],
      "explanation": {
        "beginner": "An introduction to Statistical Methods & Sampling.",
        "intermediate": "Detailed breakdown of Statistical Methods & Sampling concepts.",
        "advanced": "Advanced theoretical aspects of Statistical Methods & Sampling."
      },
      "caseStudy": "Stratified sampling for consumer behavior",
      "formulas": [
        "P(S) = n/N"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Introduction to statistics.",
          "a": "Introduction to statistics is a foundational concept."
        },
        {
          "q": "How does population vs sample work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of purposive sampling?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Statistical Methods & Sampling like building a house.",
      "example": {
        "problem": "Solve a basic Statistical Methods & Sampling problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Introduction to statistics",
        "Applying population vs sample incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "dm-u4-q1",
            "q": "Which of the following relates to Introduction to statistics?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Introduction to statistics."
          },
          {
            "id": "dm-u4-q2",
            "q": "Which of the following relates to population vs sample?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding population vs sample."
          },
          {
            "id": "dm-u4-q3",
            "q": "Which of the following relates to purposive sampling?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding purposive sampling."
          },
          {
            "id": "dm-u4-q4",
            "q": "Which of the following relates to random sampling?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding random sampling."
          },
          {
            "id": "dm-u4-q5",
            "q": "Which of the following relates to stratified sampling?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding stratified sampling."
          }
        ],
        "short": [
          {
            "id": "dm-u4-s1",
            "q": "Briefly describe Introduction to statistics and population vs sample.",
            "keywords": [
              "Introduction to statistics",
              "population vs sample",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Introduction to statistics and population vs sample comprehensively."
          }
        ]
      }
    },
    {
      "id": "dm-u5",
      "name": "Unit 5: Descriptive Statistics & Probability",
      "unitNumber": 5,
      "hours": 7,
      "subtopics": [
        "Geometric mean",
        "harmonic mean",
        "range",
        "standard deviation",
        "Geometric distribution",
        "Gaussian/Normal",
        "Uniform",
        "Exponential"
      ],
      "explanation": {
        "beginner": "An introduction to Descriptive Statistics & Probability.",
        "intermediate": "Detailed breakdown of Descriptive Statistics & Probability concepts.",
        "advanced": "Advanced theoretical aspects of Descriptive Statistics & Probability."
      },
      "caseStudy": "Measures of central tendency",
      "formulas": [
        "SD = sqrt(Var)"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Geometric mean.",
          "a": "Geometric mean is a foundational concept."
        },
        {
          "q": "How does harmonic mean work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of range?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Descriptive Statistics & Probability like building a house.",
      "example": {
        "problem": "Solve a basic Descriptive Statistics & Probability problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Geometric mean",
        "Applying harmonic mean incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "dm-u5-q1",
            "q": "Which of the following relates to Geometric mean?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Geometric mean."
          },
          {
            "id": "dm-u5-q2",
            "q": "Which of the following relates to harmonic mean?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding harmonic mean."
          },
          {
            "id": "dm-u5-q3",
            "q": "Which of the following relates to range?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding range."
          },
          {
            "id": "dm-u5-q4",
            "q": "Which of the following relates to standard deviation?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding standard deviation."
          },
          {
            "id": "dm-u5-q5",
            "q": "Which of the following relates to Geometric distribution?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Geometric distribution."
          }
        ],
        "short": [
          {
            "id": "dm-u5-s1",
            "q": "Briefly describe Geometric mean and harmonic mean.",
            "keywords": [
              "Geometric mean",
              "harmonic mean",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Geometric mean and harmonic mean comprehensively."
          }
        ]
      }
    },
    {
      "id": "dm-u6",
      "name": "Unit 6: Inferential Statistics & Hypothesis Testing",
      "unitNumber": 6,
      "hours": 7,
      "subtopics": [
        "Hypothesis testing",
        "Type I/Type II errors",
        "level of significance",
        "testing mean of normal",
        "variance tests",
        "Likelihood ratio test",
        "model selection",
        "AI applications"
      ],
      "explanation": {
        "beginner": "An introduction to Inferential Statistics & Hypothesis Testing.",
        "intermediate": "Detailed breakdown of Inferential Statistics & Hypothesis Testing concepts.",
        "advanced": "Advanced theoretical aspects of Inferential Statistics & Hypothesis Testing."
      },
      "caseStudy": "Testing if new advertising strategy generates more leads",
      "formulas": [
        "Z = (X - mu) / (sigma / sqrt(n))"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Hypothesis testing.",
          "a": "Hypothesis testing is a foundational concept."
        },
        {
          "q": "How does Type I/Type II errors work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of level of significance?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Inferential Statistics & Hypothesis Testing like building a house.",
      "example": {
        "problem": "Solve a basic Inferential Statistics & Hypothesis Testing problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Hypothesis testing",
        "Applying Type I/Type II errors incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "dm-u6-q1",
            "q": "Which of the following relates to Hypothesis testing?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Hypothesis testing."
          },
          {
            "id": "dm-u6-q2",
            "q": "Which of the following relates to Type I/Type II errors?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Type I/Type II errors."
          },
          {
            "id": "dm-u6-q3",
            "q": "Which of the following relates to level of significance?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding level of significance."
          },
          {
            "id": "dm-u6-q4",
            "q": "Which of the following relates to testing mean of normal?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding testing mean of normal."
          },
          {
            "id": "dm-u6-q5",
            "q": "Which of the following relates to variance tests?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding variance tests."
          }
        ],
        "short": [
          {
            "id": "dm-u6-s1",
            "q": "Briefly describe Hypothesis testing and Type I/Type II errors.",
            "keywords": [
              "Hypothesis testing",
              "Type I/Type II errors",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Hypothesis testing and Type I/Type II errors comprehensively."
          }
        ]
      }
    }
  ]
}
,"computer graphics & animation": {
  "displayName": "Computer Graphics & Animation",
  "courseCode": "24-PCC-AD-2-03",
  "semester": "Semester III",
  "credits": 3,
  "topics": [
    {
      "id": "cga-u1",
      "name": "Unit 1: Introduction & Graphics Systems",
      "unitNumber": 1,
      "hours": 7,
      "subtopics": [
        "Graphics primitives",
        "pixel resolution",
        "aspect ratio",
        "OLED",
        "QLED",
        "OpenGL",
        "DirectX",
        "file formats"
      ],
      "explanation": {
        "beginner": "An introduction to Introduction & Graphics Systems.",
        "intermediate": "Detailed breakdown of Introduction & Graphics Systems concepts.",
        "advanced": "Advanced theoretical aspects of Introduction & Graphics Systems."
      },
      "caseStudy": "Impact of pixel density on smartphone display",
      "formulas": [
        "Aspect Ratio = W / H"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Graphics primitives.",
          "a": "Graphics primitives is a foundational concept."
        },
        {
          "q": "How does pixel resolution work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of aspect ratio?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Introduction & Graphics Systems like building a house.",
      "example": {
        "problem": "Solve a basic Introduction & Graphics Systems problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Graphics primitives",
        "Applying pixel resolution incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "cga-u1-q1",
            "q": "Which of the following relates to Graphics primitives?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Graphics primitives."
          },
          {
            "id": "cga-u1-q2",
            "q": "Which of the following relates to pixel resolution?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding pixel resolution."
          },
          {
            "id": "cga-u1-q3",
            "q": "Which of the following relates to aspect ratio?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding aspect ratio."
          },
          {
            "id": "cga-u1-q4",
            "q": "Which of the following relates to OLED?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding OLED."
          },
          {
            "id": "cga-u1-q5",
            "q": "Which of the following relates to QLED?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding QLED."
          }
        ],
        "short": [
          {
            "id": "cga-u1-s1",
            "q": "Briefly describe Graphics primitives and pixel resolution.",
            "keywords": [
              "Graphics primitives",
              "pixel resolution",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Graphics primitives and pixel resolution comprehensively."
          }
        ]
      }
    },
    {
      "id": "cga-u2",
      "name": "Unit 2: Polygons & Clipping",
      "unitNumber": 2,
      "hours": 7,
      "subtopics": [
        "Polygon types",
        "inside test",
        "flood fill",
        "seed fill",
        "scan line fill",
        "windowing",
        "Cohen-Sutherland",
        "Sutherland-Hodgman"
      ],
      "explanation": {
        "beginner": "An introduction to Polygons & Clipping.",
        "intermediate": "Detailed breakdown of Polygons & Clipping concepts.",
        "advanced": "Advanced theoretical aspects of Polygons & Clipping."
      },
      "caseStudy": "Guard clipping in rendering software",
      "formulas": [
        "Cohen-Sutherland outcodes"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Polygon types.",
          "a": "Polygon types is a foundational concept."
        },
        {
          "q": "How does inside test work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of flood fill?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Polygons & Clipping like building a house.",
      "example": {
        "problem": "Solve a basic Polygons & Clipping problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Polygon types",
        "Applying inside test incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "cga-u2-q1",
            "q": "Which of the following relates to Polygon types?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Polygon types."
          },
          {
            "id": "cga-u2-q2",
            "q": "Which of the following relates to inside test?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding inside test."
          },
          {
            "id": "cga-u2-q3",
            "q": "Which of the following relates to flood fill?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding flood fill."
          },
          {
            "id": "cga-u2-q4",
            "q": "Which of the following relates to seed fill?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding seed fill."
          },
          {
            "id": "cga-u2-q5",
            "q": "Which of the following relates to scan line fill?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding scan line fill."
          }
        ],
        "short": [
          {
            "id": "cga-u2-s1",
            "q": "Briefly describe Polygon types and inside test.",
            "keywords": [
              "Polygon types",
              "inside test",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Polygon types and inside test comprehensively."
          }
        ]
      }
    },
    {
      "id": "cga-u3",
      "name": "Unit 3: Geometric Transformations",
      "unitNumber": 3,
      "hours": 7,
      "subtopics": [
        "2D translation",
        "2D scaling",
        "2D rotation",
        "3D homogeneous coordinates",
        "3D scaling",
        "parallel projection",
        "perspective projection",
        "viewing"
      ],
      "explanation": {
        "beginner": "An introduction to Geometric Transformations.",
        "intermediate": "Detailed breakdown of Geometric Transformations concepts.",
        "advanced": "Advanced theoretical aspects of Geometric Transformations."
      },
      "caseStudy": "Use of transformations in education/training software",
      "formulas": [
        "[x', y', 1] = [x, y, 1] * T"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of 2D translation.",
          "a": "2D translation is a foundational concept."
        },
        {
          "q": "How does 2D scaling work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of 2D rotation?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Geometric Transformations like building a house.",
      "example": {
        "problem": "Solve a basic Geometric Transformations problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding 2D translation",
        "Applying 2D scaling incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "cga-u3-q1",
            "q": "Which of the following relates to 2D translation?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding 2D translation."
          },
          {
            "id": "cga-u3-q2",
            "q": "Which of the following relates to 2D scaling?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding 2D scaling."
          },
          {
            "id": "cga-u3-q3",
            "q": "Which of the following relates to 2D rotation?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding 2D rotation."
          },
          {
            "id": "cga-u3-q4",
            "q": "Which of the following relates to 3D homogeneous coordinates?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding 3D homogeneous coordinates."
          },
          {
            "id": "cga-u3-q5",
            "q": "Which of the following relates to 3D scaling?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding 3D scaling."
          }
        ],
        "short": [
          {
            "id": "cga-u3-s1",
            "q": "Briefly describe 2D translation and 2D scaling.",
            "keywords": [
              "2D translation",
              "2D scaling",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers 2D translation and 2D scaling comprehensively."
          }
        ]
      }
    },
    {
      "id": "cga-u4",
      "name": "Unit 4: Light, Color & Complex Shapes",
      "unitNumber": 4,
      "hours": 7,
      "subtopics": [
        "Illumination models",
        "Phong model",
        "RGB",
        "CMY",
        "Gouraud shading",
        "B-Spline curves",
        "Bezier curves",
        "fractals"
      ],
      "explanation": {
        "beginner": "An introduction to Light, Color & Complex Shapes.",
        "intermediate": "Detailed breakdown of Light, Color & Complex Shapes concepts.",
        "advanced": "Advanced theoretical aspects of Light, Color & Complex Shapes."
      },
      "caseStudy": "Study of popular graphics software",
      "formulas": [
        "I = IaKa + IpKd(L.N) + IpKs(R.V)^n"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Illumination models.",
          "a": "Illumination models is a foundational concept."
        },
        {
          "q": "How does Phong model work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of RGB?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Light, Color & Complex Shapes like building a house.",
      "example": {
        "problem": "Solve a basic Light, Color & Complex Shapes problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Illumination models",
        "Applying Phong model incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "cga-u4-q1",
            "q": "Which of the following relates to Illumination models?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Illumination models."
          },
          {
            "id": "cga-u4-q2",
            "q": "Which of the following relates to Phong model?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Phong model."
          },
          {
            "id": "cga-u4-q3",
            "q": "Which of the following relates to RGB?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding RGB."
          },
          {
            "id": "cga-u4-q4",
            "q": "Which of the following relates to CMY?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding CMY."
          },
          {
            "id": "cga-u4-q5",
            "q": "Which of the following relates to Gouraud shading?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Gouraud shading."
          }
        ],
        "short": [
          {
            "id": "cga-u4-s1",
            "q": "Briefly describe Illumination models and Phong model.",
            "keywords": [
              "Illumination models",
              "Phong model",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Illumination models and Phong model comprehensively."
          }
        ]
      }
    },
    {
      "id": "cga-u5",
      "name": "Unit 5: 2D & 3D Animation Tools",
      "unitNumber": 5,
      "hours": 7,
      "subtopics": [
        "2D image editing",
        "layers and masks",
        "shapes/paths",
        "typography",
        "3D modeling basics",
        "materials",
        "lighting",
        "rendering"
      ],
      "explanation": {
        "beginner": "An introduction to 2D & 3D Animation Tools.",
        "intermediate": "Detailed breakdown of 2D & 3D Animation Tools concepts.",
        "advanced": "Advanced theoretical aspects of 2D & 3D Animation Tools."
      },
      "caseStudy": "Design a mobile app launch",
      "formulas": [
        "Bezier P(t) = (1-t)^3 P0 + ..."
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of 2D image editing.",
          "a": "2D image editing is a foundational concept."
        },
        {
          "q": "How does layers and masks work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of shapes/paths?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of 2D & 3D Animation Tools like building a house.",
      "example": {
        "problem": "Solve a basic 2D & 3D Animation Tools problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding 2D image editing",
        "Applying layers and masks incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "cga-u5-q1",
            "q": "Which of the following relates to 2D image editing?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding 2D image editing."
          },
          {
            "id": "cga-u5-q2",
            "q": "Which of the following relates to layers and masks?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding layers and masks."
          },
          {
            "id": "cga-u5-q3",
            "q": "Which of the following relates to shapes/paths?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding shapes/paths."
          },
          {
            "id": "cga-u5-q4",
            "q": "Which of the following relates to typography?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding typography."
          },
          {
            "id": "cga-u5-q5",
            "q": "Which of the following relates to 3D modeling basics?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding 3D modeling basics."
          }
        ],
        "short": [
          {
            "id": "cga-u5-s1",
            "q": "Briefly describe 2D image editing and layers and masks.",
            "keywords": [
              "2D image editing",
              "layers and masks",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers 2D image editing and layers and masks comprehensively."
          }
        ]
      }
    },
    {
      "id": "cga-u6",
      "name": "Unit 6: Unity Game Development",
      "unitNumber": 6,
      "hours": 7,
      "subtopics": [
        "Game engine concepts",
        "Unity environment",
        "C# fundamentals",
        "2D physics",
        "prefabs",
        "creating/destroying objects",
        "multiple scenes",
        "publishing games"
      ],
      "explanation": {
        "beginner": "An introduction to Unity Game Development.",
        "intermediate": "Detailed breakdown of Unity Game Development concepts.",
        "advanced": "Advanced theoretical aspects of Unity Game Development."
      },
      "caseStudy": "Design a simple 2D platformer game in Unity",
      "formulas": [
        "F = ma (Physics engine base)"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Game engine concepts.",
          "a": "Game engine concepts is a foundational concept."
        },
        {
          "q": "How does Unity environment work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of C# fundamentals?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Unity Game Development like building a house.",
      "example": {
        "problem": "Solve a basic Unity Game Development problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Game engine concepts",
        "Applying Unity environment incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "cga-u6-q1",
            "q": "Which of the following relates to Game engine concepts?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Game engine concepts."
          },
          {
            "id": "cga-u6-q2",
            "q": "Which of the following relates to Unity environment?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Unity environment."
          },
          {
            "id": "cga-u6-q3",
            "q": "Which of the following relates to C# fundamentals?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding C# fundamentals."
          },
          {
            "id": "cga-u6-q4",
            "q": "Which of the following relates to 2D physics?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding 2D physics."
          },
          {
            "id": "cga-u6-q5",
            "q": "Which of the following relates to prefabs?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding prefabs."
          }
        ],
        "short": [
          {
            "id": "cga-u6-s1",
            "q": "Briefly describe Game engine concepts and Unity environment.",
            "keywords": [
              "Game engine concepts",
              "Unity environment",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Game engine concepts and Unity environment comprehensively."
          }
        ]
      }
    }
  ]
}
,"linux administration": {
  "displayName": "Linux Administration",
  "courseCode": "24-VSEC-AD-2-01",
  "semester": "Semester IV",
  "credits": 2,
  "topics": [
    {
      "id": "linux-u1",
      "name": "Unit 1: File & Directory Management",
      "unitNumber": 1,
      "hours": 7,
      "subtopics": [
        "ls, cd, pwd, tree",
        "cp, mv, rm",
        "mkdir, touch",
        "nano, vim",
        "echo, grep",
        "man, --help",
        "file permissions basics",
        "directory structures"
      ],
      "explanation": {
        "beginner": "An introduction to File & Directory Management.",
        "intermediate": "Detailed breakdown of File & Directory Management concepts.",
        "advanced": "Advanced theoretical aspects of File & Directory Management."
      },
      "caseStudy": "Build an automated directory organizer shell script",
      "formulas": [
        "chmod 755 file"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of ls, cd, pwd, tree.",
          "a": "ls, cd, pwd, tree is a foundational concept."
        },
        {
          "q": "How does cp, mv, rm work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of mkdir, touch?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of File & Directory Management like building a house.",
      "example": {
        "problem": "Solve a basic File & Directory Management problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding ls, cd, pwd, tree",
        "Applying cp, mv, rm incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "linux-u1-q1",
            "q": "Which of the following relates to ls, cd, pwd, tree?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding ls, cd, pwd, tree."
          },
          {
            "id": "linux-u1-q2",
            "q": "Which of the following relates to cp, mv, rm?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding cp, mv, rm."
          },
          {
            "id": "linux-u1-q3",
            "q": "Which of the following relates to mkdir, touch?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding mkdir, touch."
          },
          {
            "id": "linux-u1-q4",
            "q": "Which of the following relates to nano, vim?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding nano, vim."
          },
          {
            "id": "linux-u1-q5",
            "q": "Which of the following relates to echo, grep?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding echo, grep."
          }
        ],
        "short": [
          {
            "id": "linux-u1-s1",
            "q": "Briefly describe ls, cd, pwd, tree and cp, mv, rm.",
            "keywords": [
              "ls, cd, pwd, tree",
              "cp, mv, rm",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers ls, cd, pwd, tree and cp, mv, rm comprehensively."
          }
        ]
      }
    },
    {
      "id": "linux-u2",
      "name": "Unit 2: Shell Scripting & I/O",
      "unitNumber": 2,
      "hours": 7,
      "subtopics": [
        "Variables",
        "user input (read)",
        "conditionals (if/else)",
        "loops (for/while)",
        "functions",
        "chmod +x",
        "bash -x debugging",
        "exit codes"
      ],
      "explanation": {
        "beginner": "An introduction to Shell Scripting & I/O.",
        "intermediate": "Detailed breakdown of Shell Scripting & I/O concepts.",
        "advanced": "Advanced theoretical aspects of Shell Scripting & I/O."
      },
      "caseStudy": "Create an automated system info reporter script",
      "formulas": [
        "#!/bin/bash"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of Variables.",
          "a": "Variables is a foundational concept."
        },
        {
          "q": "How does user input (read) work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of conditionals (if/else)?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Shell Scripting & I/O like building a house.",
      "example": {
        "problem": "Solve a basic Shell Scripting & I/O problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding Variables",
        "Applying user input (read) incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "linux-u2-q1",
            "q": "Which of the following relates to Variables?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Variables."
          },
          {
            "id": "linux-u2-q2",
            "q": "Which of the following relates to user input (read)?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding user input (read)."
          },
          {
            "id": "linux-u2-q3",
            "q": "Which of the following relates to conditionals (if/else)?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding conditionals (if/else)."
          },
          {
            "id": "linux-u2-q4",
            "q": "Which of the following relates to loops (for/while)?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding loops (for/while)."
          },
          {
            "id": "linux-u2-q5",
            "q": "Which of the following relates to functions?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding functions."
          }
        ],
        "short": [
          {
            "id": "linux-u2-s1",
            "q": "Briefly describe Variables and user input (read).",
            "keywords": [
              "Variables",
              "user input (read)",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers Variables and user input (read) comprehensively."
          }
        ]
      }
    },
    {
      "id": "linux-u3",
      "name": "Unit 3: Process & Service Management",
      "unitNumber": 3,
      "hours": 7,
      "subtopics": [
        "ps aux, top",
        "kill, killall",
        "systemctl start/stop",
        "systemctl enable/disable",
        "single-user mode",
        "run levels",
        "systemctl list-units",
        "daemon management"
      ],
      "explanation": {
        "beginner": "An introduction to Process & Service Management.",
        "intermediate": "Detailed breakdown of Process & Service Management concepts.",
        "advanced": "Advanced theoretical aspects of Process & Service Management."
      },
      "caseStudy": "Monitor and auto-restart crashed services",
      "formulas": [
        "kill -9 PID"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of ps aux, top.",
          "a": "ps aux, top is a foundational concept."
        },
        {
          "q": "How does kill, killall work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of systemctl start/stop?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Process & Service Management like building a house.",
      "example": {
        "problem": "Solve a basic Process & Service Management problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding ps aux, top",
        "Applying kill, killall incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "linux-u3-q1",
            "q": "Which of the following relates to ps aux, top?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding ps aux, top."
          },
          {
            "id": "linux-u3-q2",
            "q": "Which of the following relates to kill, killall?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding kill, killall."
          },
          {
            "id": "linux-u3-q3",
            "q": "Which of the following relates to systemctl start/stop?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding systemctl start/stop."
          },
          {
            "id": "linux-u3-q4",
            "q": "Which of the following relates to systemctl enable/disable?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding systemctl enable/disable."
          },
          {
            "id": "linux-u3-q5",
            "q": "Which of the following relates to single-user mode?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding single-user mode."
          }
        ],
        "short": [
          {
            "id": "linux-u3-s1",
            "q": "Briefly describe ps aux, top and kill, killall.",
            "keywords": [
              "ps aux, top",
              "kill, killall",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers ps aux, top and kill, killall comprehensively."
          }
        ]
      }
    },
    {
      "id": "linux-u4",
      "name": "Unit 4: Disk & Storage Management",
      "unitNumber": 4,
      "hours": 7,
      "subtopics": [
        "lsblk, fdisk",
        "parted, mkfs.ext4",
        "mount, df -h",
        "LVM (pvcreate/vgcreate)",
        "swap partition",
        "XFS filesystem",
        "resize logical volumes",
        "storage allocation"
      ],
      "explanation": {
        "beginner": "An introduction to Disk & Storage Management.",
        "intermediate": "Detailed breakdown of Disk & Storage Management concepts.",
        "advanced": "Advanced theoretical aspects of Disk & Storage Management."
      },
      "caseStudy": "Set up automated backup using LVM snapshots",
      "formulas": [
        "mount /dev/sda1 /mnt"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of lsblk, fdisk.",
          "a": "lsblk, fdisk is a foundational concept."
        },
        {
          "q": "How does parted, mkfs.ext4 work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of mount, df -h?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of Disk & Storage Management like building a house.",
      "example": {
        "problem": "Solve a basic Disk & Storage Management problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding lsblk, fdisk",
        "Applying parted, mkfs.ext4 incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "linux-u4-q1",
            "q": "Which of the following relates to lsblk, fdisk?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding lsblk, fdisk."
          },
          {
            "id": "linux-u4-q2",
            "q": "Which of the following relates to parted, mkfs.ext4?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding parted, mkfs.ext4."
          },
          {
            "id": "linux-u4-q3",
            "q": "Which of the following relates to mount, df -h?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding mount, df -h."
          },
          {
            "id": "linux-u4-q4",
            "q": "Which of the following relates to LVM (pvcreate/vgcreate)?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding LVM (pvcreate/vgcreate)."
          },
          {
            "id": "linux-u4-q5",
            "q": "Which of the following relates to swap partition?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding swap partition."
          }
        ],
        "short": [
          {
            "id": "linux-u4-s1",
            "q": "Briefly describe lsblk, fdisk and parted, mkfs.ext4.",
            "keywords": [
              "lsblk, fdisk",
              "parted, mkfs.ext4",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers lsblk, fdisk and parted, mkfs.ext4 comprehensively."
          }
        ]
      }
    },
    {
      "id": "linux-u5",
      "name": "Unit 5: File Permissions & Security",
      "unitNumber": 5,
      "hours": 7,
      "subtopics": [
        "chmod, chown",
        "ACLs (setfacl)",
        "SELinux basics",
        "chcon, ls -Z",
        "restorecon",
        "httpd_t context",
        "network filesystems",
        "security policies"
      ],
      "explanation": {
        "beginner": "An introduction to File Permissions & Security.",
        "intermediate": "Detailed breakdown of File Permissions & Security concepts.",
        "advanced": "Advanced theoretical aspects of File Permissions & Security."
      },
      "caseStudy": "Implement a multi-user secure document sharing system",
      "formulas": [
        "chown user:group file"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of chmod, chown.",
          "a": "chmod, chown is a foundational concept."
        },
        {
          "q": "How does ACLs (setfacl) work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of SELinux basics?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of File Permissions & Security like building a house.",
      "example": {
        "problem": "Solve a basic File Permissions & Security problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding chmod, chown",
        "Applying ACLs (setfacl) incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "linux-u5-q1",
            "q": "Which of the following relates to chmod, chown?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding chmod, chown."
          },
          {
            "id": "linux-u5-q2",
            "q": "Which of the following relates to ACLs (setfacl)?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding ACLs (setfacl)."
          },
          {
            "id": "linux-u5-q3",
            "q": "Which of the following relates to SELinux basics?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding SELinux basics."
          },
          {
            "id": "linux-u5-q4",
            "q": "Which of the following relates to chcon, ls -Z?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding chcon, ls -Z."
          },
          {
            "id": "linux-u5-q5",
            "q": "Which of the following relates to restorecon?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding restorecon."
          }
        ],
        "short": [
          {
            "id": "linux-u5-s1",
            "q": "Briefly describe chmod, chown and ACLs (setfacl).",
            "keywords": [
              "chmod, chown",
              "ACLs (setfacl)",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers chmod, chown and ACLs (setfacl) comprehensively."
          }
        ]
      }
    },
    {
      "id": "linux-u6",
      "name": "Unit 6: User Management & Containers",
      "unitNumber": 6,
      "hours": 7,
      "subtopics": [
        "useradd, groupadd",
        "passwd, usermod",
        "userdel",
        "sudo access",
        "Docker basics",
        "podman",
        "container lifecycle",
        "images"
      ],
      "explanation": {
        "beginner": "An introduction to User Management & Containers.",
        "intermediate": "Detailed breakdown of User Management & Containers concepts.",
        "advanced": "Advanced theoretical aspects of User Management & Containers."
      },
      "caseStudy": "Deploy a web application using Docker containers",
      "formulas": [
        "docker run -d -p 80:80 nginx"
      ],
      "vivaQuestions": [
        {
          "q": "Explain the concept of useradd, groupadd.",
          "a": "useradd, groupadd is a foundational concept."
        },
        {
          "q": "How does passwd, usermod work?",
          "a": "It operates by defined principles."
        },
        {
          "q": "What are the applications of userdel?",
          "a": "Used in real-world scenarios."
        }
      ],
      "analogy": "Think of User Management & Containers like building a house.",
      "example": {
        "problem": "Solve a basic User Management & Containers problem.",
        "solution": "Apply the formulas and steps systematically.",
        "code": "// Code snippet\nprint(\"Success\");"
      },
      "pitfalls": [
        "Misunderstanding useradd, groupadd",
        "Applying passwd, usermod incorrectly",
        "Forgetting to check constraints"
      ],
      "quiz": {
        "mcq": [
          {
            "id": "linux-u6-q1",
            "q": "Which of the following relates to useradd, groupadd?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding useradd, groupadd."
          },
          {
            "id": "linux-u6-q2",
            "q": "Which of the following relates to passwd, usermod?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding passwd, usermod."
          },
          {
            "id": "linux-u6-q3",
            "q": "Which of the following relates to userdel?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding userdel."
          },
          {
            "id": "linux-u6-q4",
            "q": "Which of the following relates to sudo access?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding sudo access."
          },
          {
            "id": "linux-u6-q5",
            "q": "Which of the following relates to Docker basics?",
            "options": [
              "Option A (Correct)",
              "Option B",
              "Option C",
              "Option D"
            ],
            "correct": 0,
            "difficulty": "intermediate",
            "explanation": "This is the correct choice regarding Docker basics."
          }
        ],
        "short": [
          {
            "id": "linux-u6-s1",
            "q": "Briefly describe useradd, groupadd and passwd, usermod.",
            "keywords": [
              "useradd, groupadd",
              "passwd, usermod",
              "concept",
              "system",
              "application"
            ],
            "modelAnswer": "The model answer covers useradd, groupadd and passwd, usermod comprehensively."
          }
        ]
      }
    }
  ]
}

};

/* Dynamic generator for generic subjects created by the user */
function buildGenericSubject(subjectName) {
  const name = subjectName.trim();
  const stages = [
    {
      stage: "Core Fundamentals & Principles",
      subtopics: ["Basic Vocabulary", "Environment Setup", "Big-Picture Concepts", "First Steps"],
      questions: [
        { q: `What is the primary foundation of ${name}?`, options: ["Core Vocabulary & Structural Principles", "Deprecated Features", "Legacy Hardware", "Unrelated Syntax"], answer: 0, exp: "Core vocabulary forms the structural foundation." },
        { q: `Why is setting up the environment important for ${name}?`, options: ["To run and test code reliably", "It is optional", "It slows down development", "To hide source files"], answer: 0, exp: "Environment setup allows building and running projects." },
        { q: `Which concept is essential in ${name}?`, options: ["Basic Setup & Concepts", "Obsolete Code", "Manual Disk Allocation", "Random Guesses"], answer: 0, exp: "Basic setup concepts enable problem solving." },
        { q: `What is the first step when starting ${name}?`, options: ["Understanding key terms", "Deleting config files", "Skipping documentation", "Writing production code directly"], answer: 0, exp: "Understanding key terms precedes complex tasks." },
        { q: `Which tool is most commonly associated with ${name}?`, options: ["Standard Development Tools", "Photoshop", "Word Processor", "Audio Editor"], answer: 0, exp: "Standard dev tools are used for building projects." }
      ]
    }
  ];

  const topics = stages.map((s, i) => {
    const topicName = `Unit ${i + 1}: ${s.stage} - ${name}`;
    return {
      id: `generic-${i}-${slugify(name)}`,
      name: topicName,
      unitNumber: i + 1,
      hours: 6,
      subtopics: s.subtopics,
      explanations: {
        beginner: `Welcome to ${s.stage} in ${name}. Focus on building intuitive understanding of ${s.subtopics.join(", ")} before diving into syntax.`,
        intermediate: `At this stage of ${name}, connect ${s.stage} to real-world scenarios. Practice applying ${s.subtopics[0]} and ${s.subtopics[1]}.`,
        advanced: `For advanced mastery in ${name}, examine performance trade-offs and edge cases surrounding ${s.subtopics[s.subtopics.length - 1]}.`
      },
      caseStudy: `Real-world implementation of ${name} in an enterprise production environment.`,
      formulas: ["Core Principle: Practical Application + Continuous Testing"],
      vivaQuestions: [
        { q: `What is the fundamental goal of studying ${name}?`, a: `To systematically master foundational theory and apply it to real-world problem solving.` }
      ],
      example: `Imagine explaining ${s.subtopics[0]} in ${name} to a novice using an everyday real-world analogy.`,
      codeExample: `// Sample implementation for ${name}\nfunction initModule() {\n  console.log("Initialized ${s.subtopics[0]} for ${name}");\n}`,
      pitfalls: [
        `1. Skipping foundational concepts in ${name} before moving to advanced implementation.`,
        `2. Neglecting unit testing and error handling in ${name}.`,
        `3. Copying code snippets without understanding the underlying mechanics.`
      ],
      quiz: {
        mcq: s.questions.map(qItem => ({
          q: qItem.q,
          options: qItem.options,
          answer: qItem.answer,
          explanation: qItem.exp,
          difficulty: "Standard"
        })),
        short: [
          {
            q: `In your own words, summarize why "${s.subtopics[0]}" is important when studying ${name}.`,
            keywords: s.subtopics.flatMap(t => t.toLowerCase().split(" ")).concat([name.toLowerCase()]),
            modelAnswer: `Understanding ${s.subtopics[0]} provides the essential foundation needed to master ${name}.`,
            explanation: "Highlight key vocabulary and practical relevance."
          }
        ]
      }
    };
  });

  return { displayName: name, topics };
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "subject";
}

function getSubjectData(subjectName) {
  if (!subjectName) return buildGenericSubject("Your Chosen Subject");
  const normalized = subjectName.trim().toLowerCase().replace(/&/g, "and").replace(/\s+/g, " ");
  
  // Direct check
  const rawKey = subjectName.trim().toLowerCase();
  if (SUBJECT_LIBRARY[rawKey]) return SUBJECT_LIBRARY[rawKey];
  if (SUBJECT_LIBRARY[normalized]) return SUBJECT_LIBRARY[normalized];

  // Fuzzy check
  const found = Object.keys(SUBJECT_LIBRARY).find(k => {
    const normK = k.replace(/&/g, "and").replace(/\s+/g, " ");
    return normK === normalized || normK.includes(normalized) || normalized.includes(normK);
  });
  if (found) return SUBJECT_LIBRARY[found];

  return buildGenericSubject(subjectName);
}

const SUBJECT_SUGGESTIONS = [
  "Data Structures & Algorithms",
  "Database Management System",
  "Computer Networks",
  "Python Programming",
  "Web Development"
,
  "Discrete Mathematics & Statistics",
  "Computer Graphics & Animation",
  "Linux Administration"];
