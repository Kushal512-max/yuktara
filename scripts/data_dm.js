// scripts/data_dm.js
// 20 MCQs per unit for Discrete Mathematics & Statistics (Units 1 to 6)

module.exports = {
  "dm-u1": [
    {
      q: "If a set S has n elements, what is the cardinality of its Power Set P(S)?",
      options: ["n^2", "2^n", "2n", "n!"],
      answer: 1,
      explanation: "Each element can either be included or excluded from a subset, yielding 2^n possible subsets in the power set.",
      difficulty: "Beginner"
    },
    {
      q: "A relation R on a set A is an Equivalence Relation if and only if it satisfies which three properties?",
      options: ["Reflexive, Symmetric, and Transitive", "Reflexive, Antisymmetric, and Transitive", "Irreflexive, Symmetric, and Transitive", "Reflexive, Asymmetric, and Total"],
      answer: 0,
      explanation: "Equivalence relations must be simultaneously reflexive (aRa), symmetric (aRb => bRa), and transitive (aRb & bRc => aRc).",
      difficulty: "Beginner"
    },
    {
      q: "What is a compound proposition that is always TRUE regardless of the truth values of its constituent variables?",
      options: ["Contradiction", "Tautology", "Contingency", "Fallacy"],
      answer: 1,
      explanation: "A tautology is a formula that evaluates to true under all possible truth value assignments.",
      difficulty: "Beginner"
    },
    {
      q: "According to De Morgan's Laws in propositional logic, what is the negation of (p ∧ q)?",
      options: ["¬p ∧ ¬q", "¬p ∨ ¬q", "¬p → ¬q", "p ∨ q"],
      answer: 1,
      explanation: "Negating a conjunction distributes the negation across terms and inverts AND to OR: ¬(p ∧ q) ≡ ¬p ∨ ¬q.",
      difficulty: "Beginner"
    },
    {
      q: "What is the contrapositive of the conditional statement 'If p, then q' (p → q)?",
      options: ["q → p", "¬p → ¬q", "¬q → ¬p", "¬p ∨ q"],
      answer: 2,
      explanation: "The contrapositive (¬q → ¬p) is logically equivalent to the original conditional statement (p → q).",
      difficulty: "Beginner"
    },
    {
      q: "What is the truth value of the implication (p → q) when p is FALSE and q is FALSE?",
      options: ["True (vacuously true)", "False", "Undefined", "Contradiction"],
      answer: 0,
      explanation: "An implication (p → q) is false only when a true antecedent leads to a false consequent; false implies false is True.",
      difficulty: "Intermediate"
    },
    {
      q: "What mathematical structure is formed by a relation that is Reflexive, Antisymmetric, and Transitive?",
      options: ["Equivalence Relation", "Partial Order (Poset)", "Strict Order", "Partition"],
      answer: 1,
      explanation: "A partially ordered set (Poset) requires reflexivity, antisymmetry (if aRb and bRa then a = b), and transitivity.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the Universal Quantifier (∀) represent in first-order predicate logic?",
      options: ["'There exists at least one'", "'For all' or 'For every'", "'For no elements'", "'Exactly one element'"],
      answer: 1,
      explanation: "∀x P(x) asserts that predicate P is true for every element x in the domain of discourse.",
      difficulty: "Beginner"
    },
    {
      q: "What is the negation of the quantified statement: ∀x P(x)?",
      options: ["∀x ¬P(x)", "∃x ¬P(x)", "¬∃x P(x)", "∃x P(x)"],
      answer: 1,
      explanation: "Negating 'for all x, P(x) holds' yields 'there exists an x such that P(x) does not hold': ∃x ¬P(x).",
      difficulty: "Intermediate"
    },
    {
      q: "If set A has 3 elements and set B has 4 elements, how many elements are in the Cartesian product A × B?",
      options: ["7", "12", "64", "81"],
      answer: 1,
      explanation: "|A × B| = |A| * |B| = 3 * 4 = 12 ordered pairs.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Symmetric Difference of two sets A and B (A ⊕ B)?",
      options: ["(A ∪ B) ∩ (A ∩ B)", "(A ∪ B) - (A ∩ B)", "A ∩ B", "Complement of (A ∪ B)"],
      answer: 1,
      explanation: "Symmetric difference contains elements that belong to either set A or B, but not both: (A - B) ∪ (B - A).",
      difficulty: "Beginner"
    },
    {
      q: "What is the converse of the implication statement 'p → q'?",
      options: ["q → p", "¬p → ¬q", "¬q → ¬p", "p ∧ ¬q"],
      answer: 0,
      explanation: "The converse swaps antecedent and consequent: q → p.",
      difficulty: "Beginner"
    },
    {
      q: "What is a compound statement that is always FALSE under every truth assignment called?",
      options: ["Tautology", "Contradiction (Absurdity)", "Contingency", "Converse"],
      answer: 1,
      explanation: "A contradiction evaluates to false for all combinations of variable truth assignments (e.g. p ∧ ¬p).",
      difficulty: "Beginner"
    },
    {
      q: "Which law states that p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)?",
      options: ["Associative Law", "Distributive Law", "Commutative Law", "Absorption Law"],
      answer: 1,
      explanation: "The Distributive Law distributes disjunction over conjunction across compound expressions.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the absorption law in Boolean logic?",
      options: ["p ∧ (p ∨ q) ≡ p", "p ∧ ¬p ≡ False", "p ∨ ¬p ≡ True", "p ∧ p ≡ p"],
      answer: 0,
      explanation: "The Absorption Law: p ∧ (p ∨ q) ≡ p and p ∨ (p ∧ q) ≡ p.",
      difficulty: "Intermediate"
    },
    {
      q: "In a set of 100 students, 60 study AI, 50 study Data Science, and 20 study both. How many study at least one subject?",
      options: ["110", "90", "70", "80"],
      answer: 1,
      explanation: "Principle of Inclusion-Exclusion: |A ∪ B| = |A| + |B| - |A ∩ B| = 60 + 50 - 20 = 90 students.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a function called if every element in the codomain has at most one pre-image in the domain (one-to-one)?",
      options: ["Surjective (Onto)", "Injective (One-to-One)", "Bijective", "Constant"],
      answer: 1,
      explanation: "An injective function maps distinct domain elements to distinct codomain elements (f(a) = f(b) => a = b).",
      difficulty: "Beginner"
    },
    {
      q: "What is a Bijective function?",
      options: ["Injective only", "Surjective only", "Both Injective and Surjective (One-to-One and Onto)", "Neither injective nor surjective"],
      answer: 2,
      explanation: "Bijective functions are both injective and surjective, establishing an exact one-to-one correspondence.",
      difficulty: "Beginner"
    },
    {
      q: "What is Modus Ponens in rules of inference?",
      options: ["If p → q is true and p is true, then q is true", "If p → q is true and q is true, then p is true", "If p is true, ¬p is false", "p ∧ q implies p"],
      answer: 0,
      explanation: "Modus Ponens (affirming the antecedent) states: [p ∧ (p → q)] ⊢ q.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Modus Tollens in formal logic?",
      options: ["[¬q ∧ (p → q)] ⊢ ¬p (denying the consequent)", "[p ∧ (p → q)] ⊢ q", "[p ∨ q] ⊢ p", "¬(¬p) ≡ p"],
      answer: 0,
      explanation: "Modus Tollens: If 'if p then q' holds, and q is false, then p must be false.",
      difficulty: "Intermediate"
    }
  ],
  "dm-u2": [
    {
      q: "In an undirected graph with e edges, what is the sum of the degrees of all vertices according to the Handshaking Lemma?",
      options: ["e", "2 * e", "e / 2", "e^2"],
      answer: 1,
      explanation: "Each edge connects two endpoints, contributing 2 to the degree sum: ∑ deg(v) = 2e.",
      difficulty: "Beginner"
    },
    {
      q: "What is an Eulerian Circuit in graph theory?",
      options: ["A closed walk that visits every vertex exactly once", "A closed trail that visits every edge in the graph exactly once and returns to the starting vertex", "A path with no cycles", "A tree with n-1 edges"],
      answer: 1,
      explanation: "An Eulerian circuit traverses every edge of the graph exactly once and terminates at the origin vertex.",
      difficulty: "Beginner"
    },
    {
      q: "What condition is necessary and sufficient for a connected undirected graph to have an Eulerian Circuit (Euler's Theorem)?",
      options: ["Every vertex has an even degree", "Exactly two vertices have odd degree", "Graph must be complete", "Graph must be planar"],
      answer: 0,
      explanation: "Euler proved that a connected graph has an Eulerian circuit if and only if every vertex has an even degree.",
      difficulty: "Intermediate"
    },
    {
      q: "What condition allows a connected undirected graph to have an Eulerian Path (trail) but NOT a circuit?",
      options: ["All vertices have odd degree", "Exactly two vertices have odd degree (serving as start and end points)", "No vertex has degree > 3", "Graph has a Hamiltonian cycle"],
      answer: 1,
      explanation: "Having exactly two vertices of odd degree permits an Eulerian trail starting at one odd vertex and ending at the other.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Hamiltonian Cycle in graph theory?",
      options: ["A cycle that visits every edge exactly once", "A closed cycle that visits every vertex in the graph exactly once (except starting/ending vertex)", "A tree with n vertices", "A bipartite matching"],
      answer: 1,
      explanation: "A Hamiltonian cycle visits every vertex of the graph exactly once before returning to the start.",
      difficulty: "Beginner"
    },
    {
      q: "What is Euler's Formula for connected planar graphs with V vertices, E edges, and R regions (faces)?",
      options: ["V - E + R = 2", "V + E - R = 2", "V - E - R = 0", "V * E = R"],
      answer: 0,
      explanation: "Euler's planar formula states: Vertices - Edges + Regions = 2.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the maximum number of edges in a planar simple connected graph with V >= 3 vertices?",
      options: ["E <= 2V - 4", "E <= 3V - 6", "E <= V(V - 1)/2", "E <= V^2"],
      answer: 1,
      explanation: "For planar graphs without multi-edges, 3R <= 2E; substituting into Euler's formula gives E <= 3V - 6.",
      difficulty: "Advanced"
    },
    {
      q: "What is the Chromatic Number χ(G) of a bipartite graph with at least one edge?",
      options: ["1", "2", "3", "4"],
      answer: 1,
      explanation: "A bipartite graph can be properly 2-colored such that no two adjacent vertices share the same color.",
      difficulty: "Beginner"
    },
    {
      q: "According to the famous Four Color Theorem, what is the maximum chromatic number needed to color any planar graph?",
      options: ["3", "4", "5", "6"],
      answer: 1,
      explanation: "The Four Color Theorem proves that any planar map/graph requires at most 4 colors.",
      difficulty: "Beginner"
    },
    {
      q: "How many edges are in a Complete Graph K_n with n vertices?",
      options: ["n", "n(n - 1) / 2", "n(n - 1)", "2^n"],
      answer: 1,
      explanation: "In a complete graph K_n, every pair of distinct vertices is joined by an edge: C(n, 2) = n(n - 1) / 2.",
      difficulty: "Beginner"
    },
    {
      q: "Which of the following complete graphs is non-planar (cannot be drawn in a plane without edge crossings)?",
      options: ["K_3", "K_4", "K_5", "K_2"],
      answer: 2,
      explanation: "By Kuratowski's theorem, K_5 and K_{3,3} are the fundamental non-planar utility graphs.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Kuratowski's Theorem for graph planarity?",
      options: ["A graph is planar if and only if it contains no subgraph homeomorphic to K_5 or K_{3,3}", "All trees are planar", "Every bipartite graph is planar", "Planar graphs have degree 4"],
      answer: 0,
      explanation: "Kuratowski proved that a graph is planar iff it contains no subdivision of K_5 or K_{3,3}.",
      difficulty: "Advanced"
    },
    {
      q: "In a simple undirected graph, what is the maximum number of odd-degree vertices possible?",
      options: ["Any odd number", "Must always be an even number", "Exactly 2", "At most V/2"],
      answer: 1,
      explanation: "Because sum of degrees is 2E (an even number), the count of vertices with odd degrees must always be even.",
      difficulty: "Intermediate"
    },
    {
      q: "What is an isolated vertex in a graph?",
      options: ["A vertex with degree 0 (no incident edges)", "A vertex with degree 1", "A vertex connected to all others", "A vertex in a tree"],
      answer: 0,
      explanation: "An isolated vertex has degree 0 and is not connected to any other vertex in the graph.",
      difficulty: "Beginner"
    },
    {
      q: "What is a pendant vertex?",
      options: ["A vertex with degree 0", "A vertex with degree 1 (leaf node)", "A vertex with degree 2", "A cut vertex"],
      answer: 1,
      explanation: "A pendant vertex (or leaf) is an endpoint having degree 1.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Regular Graph?",
      options: ["A graph with no cycles", "A graph where every vertex has the exact same degree", "A graph with straight edges", "A planar graph"],
      answer: 1,
      explanation: "A k-regular graph is one where every vertex has degree k.",
      difficulty: "Beginner"
    },
    {
      q: "What is Dirac's Theorem for Hamiltonian graphs?",
      options: ["If a simple graph with n >= 3 vertices has deg(v) >= n/2 for every vertex, then G is Hamiltonian", "Every graph with 4 vertices has a cycle", "Graphs with even edges are Hamiltonian", "Planar graphs are Hamiltonian"],
      answer: 0,
      explanation: "Dirac's theorem states that if every vertex has degree at least n/2, the graph contains a Hamiltonian cycle.",
      difficulty: "Advanced"
    },
    {
      q: "What is an Adjacency Matrix representation of an undirected graph?",
      options: ["A symmetric binary matrix where A[i][j] = 1 if edge (i, j) exists", "A linked list of nodes", "A list of edge weights", "An asymmetric matrix"],
      answer: 0,
      explanation: "Because edges are bidirectional, A[i][j] = A[j][i], producing a symmetric square matrix.",
      difficulty: "Beginner"
    },
    {
      q: "What is the complement of a complete graph K_n?",
      options: ["A cycle graph C_n", "An empty/null graph with n isolated vertices and 0 edges", "A bipartite graph", "A tree"],
      answer: 1,
      explanation: "Since K_n contains all possible edges, its complement has zero edges (isolated vertices).",
      difficulty: "Intermediate"
    },
    {
      q: "What is a bridge (cut-edge) in a connected graph?",
      options: ["An edge whose removal increases the number of connected components", "An edge that crosses another edge", "An edge with weight 0", "The longest edge in a cycle"],
      answer: 0,
      explanation: "A bridge is an edge whose deletion disconnects the graph into two separate components.",
      difficulty: "Intermediate"
    }
  ],
  "dm-u3": [
    {
      q: "Which property defines a Tree in discrete mathematics?",
      options: ["A connected undirected graph with no simple cycles", "A directed graph with multiple cycles", "A graph with V edges", "A complete graph"],
      answer: 0,
      explanation: "A tree is a connected acyclic undirected graph.",
      difficulty: "Beginner"
    },
    {
      q: "How many edges does any tree with n vertices have?",
      options: ["n", "n - 1", "n + 1", "2n"],
      answer: 1,
      explanation: "Every tree with n vertices contains exactly n - 1 edges.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Spanning Tree of a connected graph G?",
      options: ["A tree containing a subset of vertices", "A subgraph that is a tree and includes every vertex of G", "A graph with max cycles", "The complement graph"],
      answer: 1,
      explanation: "A spanning tree touches all V vertices of the parent graph with exactly V - 1 edges and no cycles.",
      difficulty: "Beginner"
    },
    {
      q: "According to Cayley's Formula, how many distinct labeled trees can be formed on n vertices?",
      options: ["n!", "n^(n - 2)", "2^n", "(n - 1)!"],
      answer: 1,
      explanation: "Cayley's theorem proves that the number of labeled trees on n vertices is n^(n - 2).",
      difficulty: "Advanced"
    },
    {
      q: "What is Huffman Coding used for?",
      options: ["Graph coloring", "Lossless data compression using variable-length prefix codes built from a binary frequency tree", "Sorting numbers", "Detecting cycles"],
      answer: 1,
      explanation: "Huffman coding assigns shorter bit-strings to more frequent characters using a greedy binary tree.",
      difficulty: "Intermediate"
    },
    {
      q: "In an m-ary tree where every internal node has exactly m children, if there are i internal nodes, how many leaves L are there?",
      options: ["L = (m - 1) * i + 1", "L = m * i", "L = i + 1", "L = 2i"],
      answer: 0,
      explanation: "Total nodes N = m*i + 1; since N = i + L, subtracting gives L = i(m - 1) + 1.",
      difficulty: "Advanced"
    },
    {
      q: "What is the root of an Expression Tree for the arithmetic expression (A + B) * (C - D)?",
      options: ["+", "*", "-", "A"],
      answer: 1,
      explanation: "The root of an expression tree corresponds to the operator evaluated last: multiplication (*).",
      difficulty: "Intermediate"
    },
    {
      q: "What traversal of an expression tree produces the Postfix notation of the arithmetic expression?",
      options: ["Pre-Order", "In-Order", "Post-Order", "Level-Order"],
      answer: 2,
      explanation: "Post-Order traversal (Left -> Right -> Root) directly emits the reverse Polish / postfix notation.",
      difficulty: "Beginner"
    },
    {
      q: "What is the eccentricity of a vertex v in a tree?",
      options: ["The degree of vertex v", "The maximum distance from v to any other vertex in the tree", "The number of children", "The sum of edge weights"],
      answer: 1,
      explanation: "Eccentricity e(v) is the greatest shortest-path distance between v and any other vertex in the tree.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Center of a tree?",
      options: ["The vertex (or pair of vertices) with the minimum eccentricity", "The root node", "The leaf with highest degree", "The geometric midpoint"],
      answer: 0,
      explanation: "The center consists of vertices that minimize maximum distance to all other nodes (every tree has 1 or 2 centers).",
      difficulty: "Intermediate"
    },
    {
      q: "If you add an edge between any two non-adjacent vertices in a tree, what is always created?",
      options: ["A disconnected component", "Exactly one unique fundamental cycle", "A forest", "A bipartite graph"],
      answer: 1,
      explanation: "Adding any edge between existing vertices in a tree creates exactly one elementary cycle.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Forest in graph theory?",
      options: ["A single tree", "An acyclic graph whose connected components are trees", "A complete graph", "A tree with leaves removed"],
      answer: 1,
      explanation: "A forest is a disjoint collection of zero or more trees (an acyclic graph).",
      difficulty: "Beginner"
    },
    {
      q: "How many edges are in a forest with V vertices and k connected components?",
      options: ["V - k", "V - 1", "V + k", "k * V"],
      answer: 0,
      explanation: "Each of the k tree components with vi vertices has vi - 1 edges; summing gives ∑(vi - 1) = V - k edges.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Minimal Spanning Tree (MST)?",
      options: ["A spanning tree with the fewest vertices", "A spanning tree whose sum of edge weights is minimal among all spanning trees", "A tree with height 1", "A binary search tree"],
      answer: 1,
      explanation: "An MST connects all vertices of a weighted graph with the smallest possible total edge weight.",
      difficulty: "Beginner"
    },
    {
      q: "In a rooted binary tree, what is a node with zero children called?",
      options: ["Internal node", "Leaf (External node)", "Root", "Sibling"],
      answer: 1,
      explanation: "A leaf node is a terminal node with degree 1 (in undirected) or out-degree 0 (in rooted trees).",
      difficulty: "Beginner"
    },
    {
      q: "What is the maximum number of nodes at level k (root at level 0) of a binary tree?",
      options: ["2k", "2^k", "k^2", "2^(k + 1)"],
      answer: 1,
      explanation: "At level k, a binary tree can hold at most 2^k nodes (1 at level 0, 2 at level 1, 4 at level 2, etc.).",
      difficulty: "Beginner"
    },
    {
      q: "What is a Prefix Code in coding theory?",
      options: ["A code where every codeword begins with 0", "A code system where no valid codeword is a prefix of any other valid codeword", "An encryption code", "A postal code"],
      answer: 1,
      explanation: "Prefix-free codes allow unambiguous instantaneous decoding without lookahead separators.",
      difficulty: "Intermediate"
    },
    {
      q: "Between any two distinct vertices in a tree, how many simple paths exist?",
      options: ["0", "Exactly 1", "At least 2", "Infinitely many"],
      answer: 1,
      explanation: "A graph is a tree if and only if there is a unique simple path between every pair of vertices.",
      difficulty: "Beginner"
    },
    {
      q: "What is the radius of a tree?",
      options: ["The diameter divided by 2", "The minimum eccentricity among all vertices in the tree", "The number of leaves", "The tree height"],
      answer: 1,
      explanation: "The radius of a graph/tree is the minimum eccentricity of any vertex in the tree.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the diameter of a tree?",
      options: ["The length of the longest simple path between any two vertices in the tree", "Total number of edges", "Double the height", "The degree of the root"],
      answer: 0,
      explanation: "Diameter is the maximum distance (longest path) between any pair of vertices in the tree.",
      difficulty: "Beginner"
    }
  ],
  "dm-u4": [
    {
      q: "What is the fundamental difference between a Population and a Sample in statistics?",
      options: ["Population is the complete collection of all elements under study; a sample is a representative subset of the population", "Sample is always larger than population", "Population is numeric; sample is text", "They are identical"],
      answer: 0,
      explanation: "A population represents the entire universe of interest; a sample is an analyzed fraction.",
      difficulty: "Beginner"
    },
    {
      q: "Which level of data measurement has a true, meaningful absolute zero point allowing ratio comparisons?",
      options: ["Nominal", "Ordinal", "Interval", "Ratio"],
      answer: 3,
      explanation: "Ratio data (e.g. height, weight, Kelvin) has a true zero point where ratios like 'twice as much' are valid.",
      difficulty: "Beginner"
    },
    {
      q: "Which level of measurement categorizes data into ordered ranks, but differences between ranks cannot be quantified (e.g., Low, Medium, High)?",
      options: ["Nominal", "Ordinal", "Interval", "Ratio"],
      answer: 1,
      explanation: "Ordinal data has meaningful ranking order without equal measurable intervals between categories.",
      difficulty: "Beginner"
    },
    {
      q: "What is Stratified Random Sampling?",
      options: ["Selecting whoever is closest", "Dividing the population into non-overlapping homogeneous strata and taking random samples from each stratum", "Picking every 10th person", "Testing the whole population"],
      answer: 1,
      explanation: "Stratified sampling ensures subgroups (strata) are proportionately represented in the final sample.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Systematic Sampling?",
      options: ["Selecting every k-th element from a randomly ordered list after a random starting point", "Drawing names from a hat", "Dividing by city zones", "Voluntary response"],
      answer: 0,
      explanation: "Systematic sampling selects elements at a constant periodic interval k = N/n.",
      difficulty: "Beginner"
    },
    {
      q: "What is Cluster Sampling?",
      options: ["Dividing the population into naturally occurring diverse clusters and surveying all members of randomly selected clusters", "Sampling only the richest members", "Selecting every 5th item", "Asking friends"],
      answer: 0,
      explanation: "Cluster sampling randomly chooses entire heterogeneous clusters (e.g. schools, geographic blocks).",
      difficulty: "Intermediate"
    },
    {
      q: "What type of data takes on countable separate values (e.g. number of students, cars in parking)?",
      options: ["Continuous quantitative data", "Discrete quantitative data", "Qualitative nominal data", "Ordinal data"],
      answer: 1,
      explanation: "Discrete data consists of distinct, separate integer count values.",
      difficulty: "Beginner"
    },
    {
      q: "Which graphical display shows the distribution of continuous numerical data using adjacent contiguous vertical bars?",
      options: ["Bar chart (categorical)", "Histogram", "Pie chart", "Scatter plot"],
      answer: 1,
      explanation: "Histograms display continuous numerical frequency distributions across interval bins without gaps.",
      difficulty: "Beginner"
    },
    {
      q: "What is Sampling Error in statistical sampling?",
      options: ["Mistakes made when calculating numbers", "The natural discrepancy between a sample statistic and the true population parameter due to observing only a subset", "A computer glitch", "Biased survey questions"],
      answer: 1,
      explanation: "Sampling error is the inherent statistical variance between sample estimates and population truths.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Non-Sampling Error?",
      options: ["Error caused by sampling variation", "Errors arising from measurement errors, non-response bias, flawed questions, or recording mistakes", "Mathematical formulas", "Rounding decimals"],
      answer: 1,
      explanation: "Non-sampling errors stem from human, methodological, or instrumental flaws rather than sample size.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a parameter versus a statistic?",
      options: ["A parameter describes a population; a statistic describes a sample", "A statistic describes a population; a parameter describes a sample", "They are identical terms", "Parameters are always known"],
      answer: 0,
      explanation: "Parameters characterize populations (Greek letters μ, σ); statistics describe samples (Roman letters x̄, s).",
      difficulty: "Beginner"
    },
    {
      q: "In an Ogive graph, what is plotted on the vertical y-axis?",
      options: ["Simple frequency", "Cumulative frequency (less-than or more-than)", "Class midpoints", "Relative variance"],
      answer: 1,
      explanation: "An Ogive is a cumulative frequency polygon displaying running cumulative totals.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Convenience Sampling?",
      options: ["Sampling based on rigorous random numbers", "A non-probability sampling technique where subjects are selected because of convenient accessibility to the researcher", "Cluster sampling", "Stratified random sampling"],
      answer: 1,
      explanation: "Convenience sampling relies on readily available participants, introducing high potential bias.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Class Mark (Midpoint) of the class interval 20 - 30?",
      options: ["20", "30", "25", "50"],
      answer: 2,
      explanation: "Class Midpoint = (Lower Limit + Upper Limit) / 2 = (20 + 30) / 2 = 25.",
      difficulty: "Beginner"
    },
    {
      q: "What is Relative Frequency of a class in a frequency table?",
      options: ["Class frequency divided by total sample size (f / N)", "Class frequency times 100", "Upper limit minus lower limit", "Average of frequencies"],
      answer: 0,
      explanation: "Relative frequency is the proportion or percentage of total observations falling into that class.",
      difficulty: "Beginner"
    },
    {
      q: "What type of measurement scale is Temperature measured in Celsius or Fahrenheit?",
      options: ["Nominal", "Ordinal", "Interval (no true zero point)", "Ratio"],
      answer: 2,
      explanation: "Celsius/Fahrenheit scales have arbitrary zero points (0°C is not the total absence of heat), making them Interval.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Selection Bias in statistical surveys?",
      options: ["Choosing the wrong chart", "A systematic distortion resulting from a sampling method that favors certain population members over others", "Calculating the wrong mean", "Typographical error"],
      answer: 1,
      explanation: "Selection bias occurs when the sample does not accurately represent the intended population.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Cumulative Frequency of the third class if the first three classes have frequencies 5, 8, and 12?",
      options: ["12", "25", "20", "13"],
      answer: 1,
      explanation: "Cumulative frequency sums frequencies up to that class: 5 + 8 + 12 = 25.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Stem-and-Leaf display used for?",
      options: ["Botany diagrams", "Organizing quantitative data while retaining the actual individual raw data values", "Displaying categorical percentages", "Showing timeline events"],
      answer: 1,
      explanation: "Stem-and-leaf plots split numbers into stems (leading digits) and leaves (trailing digits), retaining exact data.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Central Limit Theorem (CLT) fundamental principle regarding sampling distributions?",
      options: ["Data is always normally distributed", "As sample size n increases (typically n >= 30), the distribution of sample means approaches a normal distribution regardless of the underlying population shape", "Samples must be smaller than 30", "Variances cancel out"],
      answer: 1,
      explanation: "CLT proves that sample means become normally distributed as n grows, enabling parametric inference.",
      difficulty: "Advanced"
    }
  ],
  "dm-u5": [
    {
      q: "Which measure of central tendency is most heavily distorted by extreme outliers in a dataset?",
      options: ["Median", "Mode", "Arithmetic Mean", "Interquartile Range"],
      answer: 2,
      explanation: "The arithmetic mean sums all values, so extreme high or low outliers skew the average significantly.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Median of the dataset: [3, 7, 8, 12, 14, 18, 21]?",
      options: ["8", "12", "14", "11.8"],
      answer: 1,
      explanation: "With 7 ordered values, the middle element at position (7 + 1)/2 = 4th position is 12.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Mode of a dataset?",
      options: ["The arithmetic average", "The middle value", "The value that appears with the greatest frequency", "The difference between max and min"],
      answer: 2,
      explanation: "The mode is the most frequently occurring score or category in a distribution.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Geometric Mean of the numbers 2, 8?",
      options: ["5", "4", "6", "10"],
      answer: 1,
      explanation: "Geometric Mean = sqrt(2 * 8) = sqrt(16) = 4.",
      difficulty: "Beginner"
    },
    {
      q: "When is the Harmonic Mean typically preferred over the arithmetic mean?",
      options: ["For calculating average rates, speeds, and ratios over equal distances", "For counting discrete objects", "For normal distributions", "For symmetric curves"],
      answer: 0,
      explanation: "Harmonic mean is the reciprocal of arithmetic mean of reciprocals, ideal for averaging rates and speeds.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the mathematical relationship between Arithmetic Mean (AM), Geometric Mean (GM), and Harmonic Mean (HM) for positive distinct numbers?",
      options: ["AM > GM > HM", "HM > GM > AM", "GM > AM > HM", "AM = GM = HM"],
      answer: 0,
      explanation: "For any collection of distinct positive real numbers, the inequality AM > GM > HM strictly holds.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Standard Deviation (σ)?",
      options: ["The square of the variance", "The positive square root of the variance, measuring data dispersion in original units", "The difference between mean and median", "The range divided by 2"],
      answer: 1,
      explanation: "Standard deviation is σ = sqrt(Variance), quantifying average spread around the mean in identical units.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Coefficient of Variation (CV) formula?",
      options: ["CV = (Mean / SD) * 100", "CV = (Standard Deviation / Mean) * 100", "CV = Variance * Mean", "CV = Range / SD"],
      answer: 1,
      explanation: "CV = (σ / μ) * 100 expresses relative dispersion as a percentage, enabling comparison across different units.",
      difficulty: "Intermediate"
    },
    {
      q: "If events A and B are Mutually Exclusive (disjoint), what is the probability P(A ∩ B)?",
      options: ["P(A) * P(B)", "0", "1", "P(A) + P(B)"],
      answer: 1,
      explanation: "Mutually exclusive events cannot occur simultaneously, so their intersection probability is zero.",
      difficulty: "Beginner"
    },
    {
      q: "What is the formula for Conditional Probability P(A | B) (probability of A given B has occurred)?",
      options: ["P(A) * P(B)", "P(A ∩ B) / P(B) (where P(B) > 0)", "P(A) + P(B)", "P(A) / P(B)"],
      answer: 1,
      explanation: "Conditional probability restricts the sample space to event B: P(A | B) = P(A ∩ B) / P(B).",
      difficulty: "Beginner"
    },
    {
      q: "What does Bayes' Theorem compute?",
      options: ["The mean of a distribution", "Posterior probability P(A | B) updated from prior probability P(A) using observed evidence B", "The sum of variances", "The median of a sample"],
      answer: 1,
      explanation: "Bayes' theorem updates probability estimates given evidence: P(A|B) = [P(B|A) * P(A)] / P(B).",
      difficulty: "Intermediate"
    },
    {
      q: "How many ways can 5 books be arranged on a shelf (Permutations of 5 items)?",
      options: ["25", "60", "120 (5!)", "24"],
      answer: 2,
      explanation: "The number of permutations of n distinct objects is n! = 5 * 4 * 3 * 2 * 1 = 120.",
      difficulty: "Beginner"
    },
    {
      q: "How many distinct committees of 3 members can be selected from a group of 8 people (Combinations)?",
      options: ["336", "56", "24", "120"],
      answer: 1,
      explanation: "Combinations C(8, 3) = 8! / (3! * 5!) = (8 * 7 * 6) / (3 * 2 * 1) = 56.",
      difficulty: "Beginner"
    },
    {
      q: "If a fair 6-sided die is rolled, what is the probability of rolling a prime number (2, 3, 5)?",
      options: ["1/6", "1/2 (3/6)", "2/3", "1/3"],
      answer: 1,
      explanation: "Prime outcomes are {2, 3, 5}; 3 favorable outcomes out of 6 possible = 3/6 = 1/2.",
      difficulty: "Beginner"
    },
    {
      q: "If two events A and B are Independent, what does P(A ∩ B) equal?",
      options: ["P(A) + P(B)", "P(A) * P(B)", "P(A | B)", "0"],
      answer: 1,
      explanation: "Independence means occurrence of one does not alter probability of the other: P(A ∩ B) = P(A) * P(B).",
      difficulty: "Beginner"
    },
    {
      q: "What is the Interquartile Range (IQR)?",
      options: ["Q3 - Q1 (difference between 75th and 25th percentiles)", "Max - Min", "Mean - Median", "Q2 / 2"],
      answer: 0,
      explanation: "IQR = Q3 - Q1 measures the spread of the middle 50% of ordered data, resistant to outliers.",
      difficulty: "Beginner"
    },
    {
      q: "In a positively skewed (right-skewed) distribution, what is the typical relationship between Mean, Median, and Mode?",
      options: ["Mean < Median < Mode", "Mean > Median > Mode", "Mean = Median = Mode", "Median > Mean > Mode"],
      answer: 1,
      explanation: "Right-skewed distributions have a long right tail that pulls the Mean highest: Mean > Median > Mode.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Variance of a dataset if its standard deviation is 7?",
      options: ["14", "49", "3.5", "sqrt(7)"],
      answer: 1,
      explanation: "Variance = σ^2 = 7^2 = 49.",
      difficulty: "Beginner"
    },
    {
      q: "What does Chebyshev's Inequality guarantee about any dataset regardless of distribution shape?",
      options: ["At least 1 - 1/k^2 of data values fall within k standard deviations of the mean (for k > 1)", "Data is symmetric", "99% of data is within 1 SD", "Mean equals median"],
      answer: 0,
      explanation: "Chebyshev proves that at least 1 - 1/k^2 of values lie within k standard deviations for any distribution.",
      difficulty: "Advanced"
    },
    {
      q: "What is the sum of probabilities of all mutually exclusive and exhaustive elementary events in a sample space?",
      options: ["0", "0.5", "1.0", "Depends on sample size"],
      answer: 2,
      explanation: "By probability axioms, the total probability across all disjoint outcomes in sample space S equals 1.",
      difficulty: "Beginner"
    }
  ],
  "dm-u6": [
    {
      q: "In statistical hypothesis testing, what is the Null Hypothesis (H0)?",
      options: ["The hypothesis the researcher hopes to prove true", "The baseline statement of no effect, no difference, or status quo to be tested against evidence", "The alternative hypothesis", "A verified fact"],
      answer: 1,
      explanation: "The Null Hypothesis (H0) assumes no significant difference or effect until data provides evidence to reject it.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Type I Error in hypothesis testing?",
      options: ["Failing to reject H0 when H0 is false", "Rejecting the Null Hypothesis H0 when it is actually true (False Positive)", "Arithmetic error", "Measuring the wrong variable"],
      answer: 1,
      explanation: "A Type I error (alpha α) occurs when a true null hypothesis is incorrectly rejected.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Type II Error?",
      options: ["Rejecting H0 when true", "Failing to reject the Null Hypothesis H0 when it is actually false (False Negative)", "Typographical error", "Using a z-test instead of t-test"],
      answer: 1,
      explanation: "A Type II error (beta β) occurs when a false null hypothesis fails to be rejected.",
      difficulty: "Beginner"
    },
    {
      q: "What is the p-value in hypothesis testing?",
      options: ["The probability that the null hypothesis is true", "The probability of obtaining test results at least as extreme as observed, assuming H0 is true", "The level of significance alpha", "The sample size"],
      answer: 1,
      explanation: "p-value measures evidence against H0; smaller p-values indicate observed data is unlikely under H0.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the standard statistical decision rule when p-value is less than or equal to the significance level α (e.g., p <= 0.05)?",
      options: ["Accept H0 unconditionally", "Reject the Null Hypothesis H0 (result is statistically significant)", "Inconclusive; collect more data", "Increase alpha"],
      answer: 1,
      explanation: "If p <= α, observed data is sufficiently improbable under H0, justifying rejection of H0.",
      difficulty: "Beginner"
    },
    {
      q: "When is a Student's t-test used instead of a z-test for comparing sample means?",
      options: ["When population standard deviation σ is unknown and sample size n is small (< 30)", "When sample size is > 10,000", "When data is nominal", "When testing proportions"],
      answer: 0,
      explanation: "When population variance σ^2 is unknown and n < 30, the t-distribution accounts for extra sampling uncertainty.",
      difficulty: "Beginner"
    },
    {
      q: "How many Degrees of Freedom are there in a single-sample t-test with sample size n?",
      options: ["n", "n - 1", "n - 2", "2n"],
      answer: 1,
      explanation: "Degrees of freedom df = n - 1 because estimating sample mean uses one constraint.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Chi-Square (χ²) Test of Independence used to evaluate?",
      options: ["Whether there is a significant association between two categorical variables in a contingency table", "Whether two population variances are equal", "Comparing means of 3 groups", "Linear regression slopes"],
      answer: 0,
      explanation: "Chi-square test of independence tests whether row and column categorical factors are statistically independent.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the formula for the Chi-Square statistic?",
      options: ["χ² = ∑ [(O - E)² / E] where O is Observed and E is Expected frequency", "χ² = (Mean - Median) / SD", "χ² = O - E", "χ² = n - 1"],
      answer: 0,
      explanation: "Chi-square sums normalized squared residuals: ∑ (Observed - Expected)² / Expected.",
      difficulty: "Intermediate"
    },
    {
      q: "In an r × c contingency table, what are the degrees of freedom for a Chi-Square test?",
      options: ["(r - 1) * (c - 1)", "r * c", "r + c - 1", "(r - 1) + (c - 1)"],
      answer: 0,
      explanation: "Degrees of freedom in contingency tables equals (rows - 1) * (columns - 1).",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Two-Tailed Hypothesis Test?",
      options: ["A test that tests only if parameter is greater than value", "A non-directional test where the critical region is split across both tails of the sampling distribution", "A test with two samples", "A test with two null hypotheses"],
      answer: 1,
      explanation: "Two-tailed tests evaluate whether the parameter differs significantly in either direction (≠).",
      difficulty: "Beginner"
    },
    {
      q: "What is the Critical Region (Rejection Region) in hypothesis testing?",
      options: ["The set of test statistic values that leads to rejection of the Null Hypothesis H0", "The confidence interval", "The range of acceptable errors", "The sample mean range"],
      answer: 0,
      explanation: "The critical region defines test statistic values extreme enough to reject H0 at chosen alpha.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Power of a statistical test (1 - β)?",
      options: ["Probability of committing a Type I error", "Probability of correctly rejecting a false Null Hypothesis", "Sample size divided by alpha", "The computational speed"],
      answer: 1,
      explanation: "Statistical power (1 - β) is the sensitivity of the test to detect an effect when an effect truly exists.",
      difficulty: "Intermediate"
    },
    {
      q: "What critical z-value corresponds to a two-tailed test at 95% confidence level (α = 0.05)?",
      options: ["1.645", "1.96", "2.576", "3.00"],
      answer: 1,
      explanation: "For a two-tailed standard normal test at α = 0.05 (2.5% in each tail), z_critical = ±1.96.",
      difficulty: "Intermediate"
    },
    {
      q: "What does ANOVA (Analysis of Variance) test?",
      options: ["Differences between variances only", "Whether the means of three or more independent groups are statistically significantly different", "Correlation between two variables", "Median of ranks"],
      answer: 1,
      explanation: "ANOVA partitions total variance into between-group and within-group components to compare 3+ group means.",
      difficulty: "Intermediate"
    },
    {
      q: "What test statistic is calculated in an ANOVA test?",
      options: ["t-statistic", "F-statistic (ratio of Between-Group Variance to Within-Group Variance)", "z-score", "Chi-square"],
      answer: 1,
      explanation: "The F-statistic compares variance between group means against unexplained error variance within groups.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a 95% Confidence Interval for a population mean?",
      options: ["95% of data values fall within this range", "A range computed from sample data such that 95% of such constructed intervals would contain the true population parameter μ", "A 95% probability that sample mean is correct", "The range between min and max"],
      answer: 1,
      explanation: "In repeated sampling, 95% of intervals constructed via x̄ ± z*(σ/√n) will capture true parameter μ.",
      difficulty: "Intermediate"
    },
    {
      q: "If sample size n increases while confidence level remains constant, what happens to the width of the confidence interval?",
      options: ["Becomes wider", "Becomes narrower (more precise estimate)", "Remains unchanged", "Doubles"],
      answer: 1,
      explanation: "Margin of error is inversely proportional to √n; larger samples reduce standard error, narrowing the interval.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Chi-Square Goodness-of-Fit test used for?",
      options: ["Testing if observed sample frequencies conform to an expected theoretical probability distribution", "Finding outliers", "Testing equality of two means", "Calculating correlation"],
      answer: 0,
      explanation: "Goodness-of-fit evaluates whether empirical sample categorical counts match hypothesized population distributions.",
      difficulty: "Intermediate"
    },
    {
      q: "When can the normal distribution be safely used as an approximation to the binomial distribution?",
      options: ["When n <= 5", "When np >= 5 and n(1 - p) >= 5", "Only when p = 0.5", "When n is odd"],
      answer: 1,
      explanation: "Binomial approaches normal when both expected successes (np) and failures n(1-p) are at least 5 to 10.",
      difficulty: "Advanced"
    }
  ]
};
