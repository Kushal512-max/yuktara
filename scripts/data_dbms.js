// scripts/data_dbms.js
// 20 MCQs per unit for Database Management System (Units 1 to 6)

module.exports = {
  "dbms-u1-intro-er": [
    {
      q: "Which level of database architecture describes how data is physically stored on magnetic disks or SSDs?",
      options: ["Conceptual level", "External level", "Internal (Physical) level", "Logical level"],
      answer: 2,
      explanation: "The internal or physical schema describes record formats, file structures, and disk access paths.",
      difficulty: "Beginner"
    },
    {
      q: "What is logical data independence in database systems?",
      options: ["The capacity to modify the conceptual schema without altering external schemas or application programs", "The ability to change storage hardware without reformatting databases", "The ability to run without a query optimizer", "Independence between client and server hardware"],
      answer: 0,
      explanation: "Logical data independence decouples the user's external view from modifications to the conceptual schema.",
      difficulty: "Intermediate"
    },
    {
      q: "In an Entity-Relationship (ER) diagram, how are Weak Entities visually represented?",
      options: ["Single rectangle", "Double rectangle", "Dashed ellipse", "Double diamond"],
      answer: 1,
      explanation: "Weak entities, which depend on an identifying owner entity, are drawn inside double rectangles.",
      difficulty: "Beginner"
    },
    {
      q: "How is a Multivalued Attribute represented in an ER diagram?",
      options: ["Single ellipse", "Double ellipse", "Dashed ellipse", "Underlined rectangle"],
      answer: 1,
      explanation: "Attributes that can store multiple values (e.g. phone numbers) are represented using concentric double ellipses.",
      difficulty: "Beginner"
    },
    {
      q: "What defines a Weak Entity Set?",
      options: ["It has no primary key of its own and depends on an identifying owner entity", "It contains only foreign keys", "It has no attributes", "It is deleted after each transaction"],
      answer: 0,
      explanation: "A weak entity does not possess sufficient attributes to form a primary key on its own.",
      difficulty: "Intermediate"
    },
    {
      q: "How is a Derived Attribute represented in an ER diagram?",
      options: ["Double rectangle", "Dashed ellipse", "Solid ellipse", "Rhombus"],
      answer: 1,
      explanation: "Derived attributes (e.g., Age computed from Date_of_Birth) are drawn with dashed ellipses.",
      difficulty: "Beginner"
    },
    {
      q: "What is the discriminator or partial key of a weak entity set?",
      options: ["A key borrowed from another table", "A set of attributes that distinguishes weak entity tuples belonging to the same owner", "A surrogate UUID", "The candidate key of the database"],
      answer: 1,
      explanation: "A partial key (underlined with dashed line) distinguishes entities of the weak set that relate to the same owner entity.",
      difficulty: "Intermediate"
    },
    {
      q: "What is cardinality ratio in an ER relationship?",
      options: ["The number of attributes in an entity", "The maximum number of relationship instances in which an entity can participate", "The size of database records in bytes", "The ratio of rows to columns"],
      answer: 1,
      explanation: "Cardinality ratio specifies maximum instances (e.g., 1:1, 1:N, N:M) an entity participates in a relationship.",
      difficulty: "Beginner"
    },
    {
      q: "Which ER symbol represents relationships between entity sets?",
      options: ["Rectangle", "Diamond (Rhombus)", "Ellipse", "Triangle"],
      answer: 1,
      explanation: "Diamonds represent relationship sets connecting entities.",
      difficulty: "Beginner"
    },
    {
      q: "What is total participation of an entity set in a relationship represented by in standard ER notation?",
      options: ["Single line", "Double line", "Dashed line", "Arrow"],
      answer: 1,
      explanation: "Total participation (every entity instance must participate in the relationship) is drawn with double lines.",
      difficulty: "Intermediate"
    },
    {
      q: "Which of the following is an example of a composite attribute?",
      options: ["Roll number", "Address (composed of Street, City, State, Pin)", "Age", "Gender"],
      answer: 1,
      explanation: "Composite attributes can be divided into smaller sub-parts with independent meanings.",
      difficulty: "Beginner"
    },
    {
      q: "What role does the Data Dictionary (system catalog) play in a DBMS?",
      options: ["Stores all user passwords in clear text", "Stores metadata describing the database schema, constraints, and authorization rules", "Runs periodic file backups", "Translates SQL into HTML"],
      answer: 1,
      explanation: "The data dictionary stores metadata (data about data), schema definitions, and system constraints.",
      difficulty: "Beginner"
    },
    {
      q: "In an Extended ER (EER) model, what is Specialization?",
      options: ["Combining multiple entity sets into a general superclass", "Top-down process of defining sub-groupings within an entity set based on distinguishing characteristics", "Deleting redundant attributes", "Adding foreign keys"],
      answer: 1,
      explanation: "Specialization is top-down refinement where an entity set is partitioned into sub-entities.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Generalization in EER modeling?",
      options: ["Bottom-up process of synthesizing multiple lower-level entity sets into a higher-level superclass", "Partitioning tables across servers", "Creating temporary tables", "Indexing all columns"],
      answer: 0,
      explanation: "Generalization is the bottom-up synthesis of entity sets with shared attributes into a generalized superclass.",
      difficulty: "Intermediate"
    },
    {
      q: "What is an aggregation in ER modeling?",
      options: ["SUM and AVG queries", "Treating a relationship set and its participating entities as a higher-level abstract entity", "Combining two tables with UNION", "Deleting weak entities"],
      answer: 1,
      explanation: "Aggregation allows relationships to be treated as higher-level entities that can participate in other relationships.",
      difficulty: "Advanced"
    },
    {
      q: "What is the primary function of the Database Administrator (DBA)?",
      options: ["Designing web UI frontends", "Authorizing access, monitoring performance, coordinating recovery, and managing schemas", "Writing client-side JavaScript", "Purchasing office computers"],
      answer: 1,
      explanation: "The DBA manages overall database security, configuration, integrity constraints, and physical storage.",
      difficulty: "Beginner"
    },
    {
      q: "Which level of ANSI/SPARC 3-tier architecture is seen by the end user?",
      options: ["Physical schema", "Conceptual schema", "External (View) schema", "Internal storage level"],
      answer: 2,
      explanation: "The external level describes customized user views tailored to specific applications or roles.",
      difficulty: "Beginner"
    },
    {
      q: "In an ER diagram, what does an underlined attribute in a solid ellipse signify?",
      options: ["Derived attribute", "Primary key / Key attribute", "Foreign key", "Composite attribute"],
      answer: 1,
      explanation: "An underlined attribute represents the primary key that uniquely identifies each entity instance.",
      difficulty: "Beginner"
    },
    {
      q: "What constraint enforces that an entity cannot belong to more than one subclass in specialization?",
      options: ["Overlap constraint", "Disjoint constraint", "Total participation", "Partial key constraint"],
      answer: 1,
      explanation: "The disjoint constraint dictates that an entity can be a member of at most one subclass.",
      difficulty: "Intermediate"
    },
    {
      q: "Why is a file processing system inferior to a DBMS?",
      options: ["File systems are more expensive", "File systems suffer from data redundancy, inconsistency, difficulty in data access, and lack of atomicity", "File systems do not support text files", "File systems have no storage limits"],
      answer: 1,
      explanation: "Traditional file systems lack concurrency control, data integrity enforcement, and crash recovery mechanisms.",
      difficulty: "Beginner"
    }
  ],
  "dbms-u2-relational-norm": [
    {
      q: "Which normal form requires that all attribute values in every tuple must be atomic and non-divisible?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: 0,
      explanation: "First Normal Form (1NF) disallows composite and multivalued attributes, requiring atomic scalar values.",
      difficulty: "Beginner"
    },
    {
      q: "What condition must be satisfied for a relation to be in Second Normal Form (2NF)?",
      options: ["Must be in 1NF and have no partial functional dependencies on candidate keys", "Must be in 3NF", "Must have no transitive dependencies", "Must use only numeric keys"],
      answer: 0,
      explanation: "2NF requires 1NF and ensures every non-prime attribute is fully functionally dependent on every candidate key.",
      difficulty: "Intermediate"
    },
    {
      q: "What constitutes a transitive dependency in a relation R?",
      options: ["X -> Y and Y -> Z where Z is not a candidate key and Y is not a superkey", "X -> Y where Y is a subset of X", "Foreign key referencing primary key", "Cyclic foreign keys"],
      answer: 0,
      explanation: "Transitive dependency occurs when non-key attribute Z depends on non-key attribute Y which depends on X.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Boyce-Codd Normal Form (BCNF)?",
      options: ["For every non-trivial functional dependency X -> Y, X must be a superkey", "Every non-prime attribute is partially dependent", "Relation must have no foreign keys", "Relation must be in 4NF"],
      answer: 0,
      explanation: "BCNF is a stricter version of 3NF where every determinant X in non-trivial dependencies must be a superkey.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the key difference between 3NF and BCNF?",
      options: ["3NF allows X -> Y if Y is a prime attribute even if X is not a superkey; BCNF strictly requires X to be a superkey", "BCNF is weaker than 3NF", "3NF eliminates multivalued dependencies", "BCNF allows partial dependencies"],
      answer: 0,
      explanation: "3NF allows dependency X -> A if A is a prime attribute; BCNF eliminates this exception entirely.",
      difficulty: "Advanced"
    },
    {
      q: "What is a Candidate Key?",
      options: ["Any attribute containing integers", "A minimal superkey with no redundant attributes", "The foreign key of a child table", "An attribute that allows NULL values"],
      answer: 1,
      explanation: "A candidate key is a minimal set of attributes that uniquely identifies tuples in a relation.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Entity Integrity constraint in relational databases?",
      options: ["Foreign keys cannot be NULL", "No primary key value can be NULL", "Table names must be unique", "Every column must have check constraints"],
      answer: 1,
      explanation: "Entity integrity mandates that primary key components cannot have NULL values.",
      difficulty: "Beginner"
    },
    {
      q: "What does Referential Integrity enforce?",
      options: ["A foreign key value must match an existing primary key value in the referenced relation or be NULL", "Primary keys must be auto-incrementing", "Columns cannot share the same name", "Queries must return results in order"],
      answer: 0,
      explanation: "Referential integrity prevents orphaned child records by verifying foreign keys exist in parent tables.",
      difficulty: "Beginner"
    },
    {
      q: "Which relational algebra operation selects tuples that satisfy a given predicate condition?",
      options: ["Projection (π)", "Selection (σ)", "Cartesian Product (×)", "Natural Join (⋈)"],
      answer: 1,
      explanation: "Selection (sigma σ) filters rows/tuples based on a specified boolean condition.",
      difficulty: "Beginner"
    },
    {
      q: "Which relational algebra operator selects specific columns/attributes from a relation and removes duplicate tuples?",
      options: ["Selection (σ)", "Projection (π)", "Union (∪)", "Rename (ρ)"],
      answer: 1,
      explanation: "Projection (pi π) extracts specified columns and discards unwanted attributes.",
      difficulty: "Beginner"
    },
    {
      q: "What condition must two relations R and S satisfy to perform Union (R ∪ S)?",
      options: ["They must have the same number of rows", "They must be Union-Compatible (same number of attributes with compatible domains)", "They must have identical primary keys", "They must reside on the same server"],
      answer: 1,
      explanation: "Union compatibility requires the same number of columns with corresponding data types.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Lossless-Join Decomposition?",
      options: ["A decomposition where no rows are dropped when projecting", "A decomposition of R into R1 and R2 such that R1 ⋈ R2 equals original relation R exactly", "A join without foreign keys", "A join that preserves all primary keys"],
      answer: 1,
      explanation: "Lossless-join guarantees that natural joining decomposed tables reproduces original tuples without spurious data.",
      difficulty: "Intermediate"
    },
    {
      q: "What mathematical property tests if decomposition of R into (R1, R2) is lossless under functional dependencies F?",
      options: ["(R1 ∩ R2) -> R1 or (R1 ∩ R2) -> R2 must belong to F+", "R1 ∪ R2 must be empty", "R1 and R2 must have no attributes in common", "R1 must equal R2"],
      answer: 0,
      explanation: "The intersection of attributes must functionally determine either R1 or R2.",
      difficulty: "Advanced"
    },
    {
      q: "What is Armstrong's Axiom of Reflexivity?",
      options: ["If X ⊆ Y, then Y -> X", "If Y ⊆ X, then X -> Y", "If X -> Y, then XZ -> YZ", "If X -> Y and Y -> Z, then X -> Z"],
      answer: 1,
      explanation: "Reflexivity states that if Y is a subset of X, then X functionally determines Y.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the closure of an attribute set X (denoted X+) represent?",
      options: ["The number of rows in the table", "The set of all attributes that are functionally determined by X under given dependencies", "All NULL values in column X", "The primary key of X"],
      answer: 1,
      explanation: "Attribute closure X+ contains all attributes logically determined by X using Armstrong's axioms.",
      difficulty: "Intermediate"
    },
    {
      q: "Which normal form addresses Multi-Valued Dependencies (MVD)?",
      options: ["2NF", "3NF", "4NF", "5NF"],
      answer: 2,
      explanation: "Fourth Normal Form (4NF) removes non-trivial multivalued dependencies (X ->-> Y).",
      difficulty: "Advanced"
    },
    {
      q: "What is Fifth Normal Form (5NF) also known as?",
      options: ["Project-Join Normal Form (PJNF)", "Boyce-Codd Normal Form", "Domain-Key Normal Form", "Multivalued Normal Form"],
      answer: 0,
      explanation: "5NF, or Project-Join Normal Form, deals with join dependencies that cannot be decomposed into 2-way joins.",
      difficulty: "Advanced"
    },
    {
      q: "What is a Superkey in relational databases?",
      options: ["A key with encryption enabled", "A set of one or more attributes that uniquely identifies a tuple within a relation", "A key with at least 5 columns", "The secondary index"],
      answer: 1,
      explanation: "Any superset of attributes that uniquely distinguishes tuples is a superkey.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Cartesian Product (R × S) of relation R with m tuples and relation S with n tuples?",
      options: ["m + n tuples", "m * n tuples", "max(m, n) tuples", "m / n tuples"],
      answer: 1,
      explanation: "Cartesian product pairs every tuple of R with every tuple of S, yielding m * n tuples.",
      difficulty: "Beginner"
    },
    {
      q: "Why might a database designer intentionally choose Denormalization?",
      options: ["To eliminate all SQL queries", "To improve read query performance by reducing the need for expensive multi-table JOINs", "To save hard disk space", "To remove database security"],
      answer: 1,
      explanation: "Denormalization introduces controlled redundancy to accelerate frequent read-heavy reporting queries.",
      difficulty: "Intermediate"
    }
  ],
  "dbms-u3-sql": [
    {
      q: "Which SQL clause is used to filter aggregated group results generated by the GROUP BY clause?",
      options: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
      answer: 1,
      explanation: "HAVING filters groups post-aggregation; WHERE filters individual records before aggregation.",
      difficulty: "Beginner"
    },
    {
      q: "What is the key functional difference between TRUNCATE and DELETE commands in SQL?",
      options: ["DELETE is DDL while TRUNCATE is DML", "TRUNCATE is a DDL command that deallocates data pages rapidly without logging row deletions; DELETE is DML that removes rows one-by-one", "TRUNCATE allows WHERE clauses; DELETE does not", "DELETE drops table schema"],
      answer: 1,
      explanation: "TRUNCATE deallocates pages instantly (DDL) and cannot be filtered with WHERE, unlike DELETE (DML).",
      difficulty: "Intermediate"
    },
    {
      q: "Which JOIN returns all rows from the left table and matched rows from the right table, filling missing right values with NULL?",
      options: ["INNER JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "CROSS JOIN"],
      answer: 1,
      explanation: "LEFT OUTER JOIN preserves every row from the left table regardless of right table matches.",
      difficulty: "Beginner"
    },
    {
      q: "Which SQL constraint guarantees that all values in a column are distinct and not null?",
      options: ["UNIQUE", "NOT NULL", "PRIMARY KEY", "CHECK"],
      answer: 2,
      explanation: "PRIMARY KEY combines UNIQUE and NOT NULL constraints into one identifier.",
      difficulty: "Beginner"
    },
    {
      q: "What does the SQL command GRANT SELECT ON students TO user1; accomplish?",
      options: ["Revokes access from user1", "Authorizes user1 to read rows from the students table (DCL command)", "Creates a student view for user1", "Changes user1's password"],
      answer: 1,
      explanation: "GRANT is a Data Control Language (DCL) statement that assigns database permissions to roles or users.",
      difficulty: "Beginner"
    },
    {
      q: "What type of subquery references columns from the outer query and executes once for each candidate row of the outer query?",
      options: ["Scalar subquery", "Correlated subquery", "Independent subquery", "View subquery"],
      answer: 1,
      explanation: "A correlated subquery depends on current row values of the outer query for its evaluation.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the result of the SQL expression: SELECT COUNT(*) FROM table WHERE val = NULL;?",
      options: ["0, because NULL cannot be compared using = (must use IS NULL)", "Total rows in table", "Syntax error", "Throws NullPointerException"],
      answer: 0,
      explanation: "Comparisons with NULL using '=' evaluate to UNKNOWN, returning 0 matched rows.",
      difficulty: "Intermediate"
    },
    {
      q: "Which aggregate function ignores NULL values when calculating averages in SQL?",
      options: ["COUNT(*)", "AVG(column_name)", "SUM_NULL()", "MEAN()"],
      answer: 1,
      explanation: "AVG(column) sums non-null values and divides by the count of non-null rows.",
      difficulty: "Beginner"
    },
    {
      q: "What is an index in SQL and why is it used?",
      options: ["A copy of the entire table on another drive", "A B-tree / hash auxiliary data structure that speeds up query retrieval operations at the cost of slower writes", "A visual diagram of table columns", "A command that drops tables"],
      answer: 1,
      explanation: "Indexes provide rapid pointer lookups to matching rows without scanning the whole table.",
      difficulty: "Beginner"
    },
    {
      q: "What is a SQL View?",
      options: ["A physical hard drive partition", "A virtual table based on the result-set of a stored SQL query", "A backup snapshot", "An animated database chart"],
      answer: 1,
      explanation: "A View is a virtual table that encapsulates a SELECT query and dynamically renders data on demand.",
      difficulty: "Beginner"
    },
    {
      q: "Which SQL statement is used to remove an existing table and its entire schema structure permanently?",
      options: ["DELETE TABLE table_name;", "DROP TABLE table_name;", "TRUNCATE TABLE table_name;", "REMOVE TABLE table_name;"],
      answer: 1,
      explanation: "DROP TABLE destroys both the table data and metadata definition in the catalog.",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of the COMMIT statement in SQL?",
      options: ["Rolls back uncommitted changes", "Permanently saves all changes made by the current transaction to the database", "Locks the table against reads", "Creates a checkpoint in the log"],
      answer: 1,
      explanation: "COMMIT ends the active transaction and commits updates permanently to disk.",
      difficulty: "Beginner"
    },
    {
      q: "What does the SQL command ROLLBACK do?",
      options: ["Deletes all tables", "Undoes transactions that have not yet been saved with COMMIT", "Restores the database from tape", "Backs up the schema"],
      answer: 1,
      explanation: "ROLLBACK reverses operations performed since the transaction began or since the last SAVEPOINT.",
      difficulty: "Beginner"
    },
    {
      q: "Which operator is used for pattern matching in SQL queries with wildcards like % and _?",
      options: ["MATCH", "LIKE", "CONTAINS", "REGEX_EQUAL"],
      answer: 1,
      explanation: "LIKE evaluates wildcard patterns: '%' matches any sequence of characters, and '_' matches a single character.",
      difficulty: "Beginner"
    },
    {
      q: "What does UNION ALL do compared to UNION in SQL?",
      options: ["UNION ALL keeps duplicate rows; UNION removes duplicates", "UNION ALL is slower than UNION", "UNION ALL requires tables to have different schemas", "UNION ALL works only with numbers"],
      answer: 0,
      explanation: "UNION ALL concatenates result sets without the overhead of duplicate elimination sorting.",
      difficulty: "Intermediate"
    },
    {
      q: "Which SQL constraint specifies that the values in a column must satisfy a boolean expression?",
      options: ["DEFAULT", "CHECK", "FOREIGN KEY", "UNIQUE"],
      answer: 1,
      explanation: "CHECK constraints (e.g. CHECK (age >= 18)) enforce domain validity rules on table insertions.",
      difficulty: "Beginner"
    },
    {
      q: "What is a clustered index in SQL Server / MySQL InnoDB?",
      options: ["An index that determines the physical ordering of data rows in the table", "An index stored in memory only", "An index on foreign keys only", "An index created without keys"],
      answer: 0,
      explanation: "A clustered index sorts and stores data rows in disk pages based on the clustered index key.",
      difficulty: "Intermediate"
    },
    {
      q: "How many clustered indexes can a relational table have?",
      options: ["1", "2", "Unlimited", "Up to number of columns"],
      answer: 0,
      explanation: "Since physical data rows can only be ordered in one way on disk, a table can have only one clustered index.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the order of execution in a standard SQL query?",
      options: ["SELECT -> FROM -> WHERE -> GROUP BY", "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY", "WHERE -> FROM -> SELECT -> GROUP BY", "SELECT -> ORDER BY -> WHERE"],
      answer: 1,
      explanation: "Logical processing starts with FROM/JOINs, filters with WHERE, groups, applies HAVING, projects SELECT, and sorts ORDER BY.",
      difficulty: "Advanced"
    },
    {
      q: "What does the COALESCE(val1, val2, val3) function return in SQL?",
      options: ["The average of values", "The first non-null expression among its arguments", "The maximum value", "A concatenated string"],
      answer: 1,
      explanation: "COALESCE evaluates arguments in sequence and returns the first argument that is not NULL.",
      difficulty: "Intermediate"
    }
  ],
  "dbms-u4-plsql": [
    {
      q: "Which section of a PL/SQL block is mandatory for the block to be syntactically valid?",
      options: ["DECLARE section", "BEGIN ... END; executable section", "EXCEPTION section", "INIT section"],
      answer: 1,
      explanation: "The executable section (BEGIN ... END;) is the only mandatory component of a PL/SQL block.",
      difficulty: "Beginner"
    },
    {
      q: "What are the two major components of a PL/SQL Package?",
      options: ["Header and Body", "Specification and Body", "Query and Trigger", "Schema and Index"],
      answer: 1,
      explanation: "Packages comprise a Package Specification (public declarations) and Package Body (private implementations).",
      difficulty: "Beginner"
    },
    {
      q: "Which cursor attribute returns TRUE if an INSERT, UPDATE, or DELETE affected one or more rows?",
      options: ["%ISOPEN", "%FOUND", "%NOTFOUND", "%ROWCOUNT"],
      answer: 1,
      explanation: "%FOUND returns TRUE if an SQL DML statement successfully touched at least one row.",
      difficulty: "Beginner"
    },
    {
      q: "What is an Explicit Cursor in PL/SQL?",
      options: ["A cursor opened automatically for single SELECT queries", "A programmer-declared cursor to process multi-row query results one row at a time", "A cursor that cannot be closed", "A database index pointer"],
      answer: 1,
      explanation: "Explicit cursors are explicitly declared, opened, fetched, and closed by the developer to handle multiple rows.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the correct sequence of operations when managing an explicit cursor in PL/SQL?",
      options: ["FETCH -> OPEN -> DECLARE -> CLOSE", "DECLARE -> OPEN -> FETCH -> CLOSE", "OPEN -> DECLARE -> FETCH -> CLOSE", "CLOSE -> OPEN -> FETCH -> DECLARE"],
      answer: 1,
      explanation: "The lifecycle of an explicit cursor is: DECLARE cursor, OPEN cursor, FETCH rows in a loop, and CLOSE cursor.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Database Trigger in PL/SQL?",
      options: ["A button clicked in a web interface", "A stored PL/SQL procedure that automatically executes in response to specified database events (like INSERT, UPDATE, DELETE)", "A scheduled backup cron", "A key constraint"],
      answer: 1,
      explanation: "Triggers fire automatically when specified DML/DDL events occur on an associated table or view.",
      difficulty: "Beginner"
    },
    {
      q: "What clause distinguishes a Row-Level Trigger from a Statement-Level Trigger in PL/SQL?",
      options: ["FOR EACH ROW", "FOR ALL ROWS", "EXECUTE ROW", "APPLY TO EACH"],
      answer: 0,
      explanation: "Specifying 'FOR EACH ROW' creates a row-level trigger that fires once for every row modified.",
      difficulty: "Intermediate"
    },
    {
      q: "In a PL/SQL row-level trigger, what pseudo-record contains values of columns BEFORE modification?",
      options: [":OLD", ":NEW", ":PREV", ":INITIAL"],
      answer: 0,
      explanation: ":OLD holds original column values before an UPDATE or DELETE operation executes.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the difference between a Stored Procedure and a Function in PL/SQL?",
      options: ["Procedures must return a value; functions cannot", "Functions must return a value via the RETURN clause; procedures do not have to return values", "Procedures run in browser; functions run in database", "Functions cannot accept parameters"],
      answer: 1,
      explanation: "Functions must compute and return a value using RETURN; procedures perform actions without mandatory returns.",
      difficulty: "Beginner"
    },
    {
      q: "Which parameter mode allows values to be passed into a PL/SQL subprogram and updated values to be returned to the caller?",
      options: ["IN", "OUT", "IN OUT", "REF"],
      answer: 2,
      explanation: "The IN OUT parameter mode enables passing an initial value that can be modified and read back by the caller.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the %TYPE attribute in PL/SQL variable declaration achieve?",
      options: ["Converts a string to number", "Inherits the exact data type of a specified database table column or variable", "Defines a new user type", "Creates a composite record"],
      answer: 1,
      explanation: "table.column%TYPE anchors a variable to the column's data type, adapting automatically if the schema changes.",
      difficulty: "Intermediate"
    },
    {
      q: "What does the %ROWTYPE attribute do?",
      options: ["Counts rows in a table", "Declares a record variable whose structure matches an entire row of a table or cursor", "Converts rows into JSON", "Deletes empty rows"],
      answer: 1,
      explanation: "%ROWTYPE declares a composite record with fields corresponding to all columns in a table or cursor.",
      difficulty: "Intermediate"
    },
    {
      q: "Which built-in exception is raised when a SELECT INTO statement returns more than one row?",
      options: ["NO_DATA_FOUND", "TOO_MANY_ROWS", "ZERO_DIVIDE", "VALUE_ERROR"],
      answer: 1,
      explanation: "TOO_MANY_ROWS is raised when an implicit singleton SELECT ... INTO query produces multiple records.",
      difficulty: "Beginner"
    },
    {
      q: "Which built-in exception is raised when a SELECT INTO statement returns no rows at all?",
      options: ["EMPTY_QUERY", "NO_DATA_FOUND", "NULL_POINTER", "CASE_NOT_FOUND"],
      answer: 1,
      explanation: "NO_DATA_FOUND fires when an implicit singleton query finds no matching records.",
      difficulty: "Beginner"
    },
    {
      q: "How can user-defined exceptions be explicitly raised in PL/SQL?",
      options: ["RAISE exception_name;", "THROW exception_name;", "CATCH exception_name;", "EMIT exception_name;"],
      answer: 0,
      explanation: "The RAISE keyword triggers execution of user-defined or system exceptions.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Cursor FOR Loop in PL/SQL?",
      options: ["A loop that requires manual OPEN, FETCH, and CLOSE", "A convenience loop that automatically opens the cursor, fetches records, and closes it when done", "An infinite loop", "A loop that skips NULL rows"],
      answer: 1,
      explanation: "Cursor FOR loops automate opening, fetching row by row, and closing the cursor upon loop exit.",
      difficulty: "Intermediate"
    },
    {
      q: "What is an INSTEAD OF trigger used for in PL/SQL?",
      options: ["To replace table primary keys", "To make non-updatable complex views modifiable by intercepting DML statements", "To drop tables on schedule", "To bypass transactions"],
      answer: 1,
      explanation: "INSTEAD OF triggers fire in place of DML on complex views, updating the underlying base tables properly.",
      difficulty: "Advanced"
    },
    {
      q: "What error occurs if a trigger attempts to read or modify a table that is currently undergoing DML changes (mutating table)?",
      options: ["Deadlock Detected", "ORA-04091: table is mutating, trigger/function may not see it", "Memory Violation", "Stack Overflow"],
      answer: 1,
      explanation: "Mutating table errors occur when a row-level trigger queries or modifies the same table that triggered it.",
      difficulty: "Advanced"
    },
    {
      q: "What is the purpose of the PRAGMA AUTONOMOUS_TRANSACTION compiler directive?",
      options: ["Executes queries in parallel", "Allows a subprogram to execute an independent transaction that commits or rolls back without affecting the main transaction", "Encrypts stored code", "Enables multi-threading"],
      answer: 1,
      explanation: "Autonomous transactions run outside the context of caller transactions, useful for logging errors independently.",
      difficulty: "Advanced"
    },
    {
      q: "Which construct allows grouping related PL/SQL variables into a single record type?",
      options: ["TYPE record_name IS RECORD (...);", "CREATE TABLE", "DEF STRUCT", "GROUP BY RECORD"],
      answer: 0,
      explanation: "The TYPE ... IS RECORD statement defines custom composite record structures in PL/SQL.",
      difficulty: "Intermediate"
    }
  ],
  "dbms-u5-transactions": [
    {
      q: "Which ACID property guarantees that all operations of a transaction execute completely, or none at all (all-or-nothing)?",
      options: ["Atomicity", "Consistency", "Isolation", "Durability"],
      answer: 0,
      explanation: "Atomicity ensures that a transaction is treated as a single atomic unit of work.",
      difficulty: "Beginner"
    },
    {
      q: "Which ACID property ensures that the database remains in a valid state satisfying all integrity constraints before and after execution?",
      options: ["Atomicity", "Consistency", "Isolation", "Durability"],
      answer: 1,
      explanation: "Consistency guarantees that execution preserves invariants and schema integrity constraints.",
      difficulty: "Beginner"
    },
    {
      q: "Which ACID property guarantees that concurrently executing transactions do not interfere with each other?",
      options: ["Atomicity", "Consistency", "Isolation", "Durability"],
      answer: 2,
      explanation: "Isolation guarantees that intermediate states of a transaction are hidden from concurrent transactions.",
      difficulty: "Beginner"
    },
    {
      q: "Which ACID property guarantees that once a transaction commits, its changes survive system crashes or power failures?",
      options: ["Atomicity", "Consistency", "Isolation", "Durability"],
      answer: 3,
      explanation: "Durability guarantees committed data persists permanently in non-volatile storage.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Conflict Serializable schedule?",
      options: ["A schedule with no conflicts", "A schedule that can be transformed into a serial schedule by swapping non-conflicting adjacent operations", "A schedule that has no locks", "A schedule executed on one CPU"],
      answer: 1,
      explanation: "Conflict serializability ensures equivalent behavior to a serial schedule by swapping non-conflicting pairs.",
      difficulty: "Intermediate"
    },
    {
      q: "When do two operations in a concurrent schedule conflict?",
      options: ["They belong to the same transaction", "They belong to different transactions, access the same data item, and at least one is a Write operation", "They both perform Read operations", "They occur at different times"],
      answer: 1,
      explanation: "Operations conflict if they are issued by different transactions on the same item, and at least one is a write.",
      difficulty: "Intermediate"
    },
    {
      q: "What tool is used to test if a concurrent schedule is Conflict Serializable?",
      options: ["Precedence Graph (Serialization Graph)", "Venn Diagram", "ER Diagram", "Histogram"],
      answer: 0,
      explanation: "A schedule is conflict serializable if and only if its precedence graph contains no directed cycles.",
      difficulty: "Intermediate"
    },
    {
      q: "What rule defines the Two-Phase Locking (2PL) protocol?",
      options: ["A transaction cannot release any locks until it has acquired all locks (Growing phase followed by Shrinking phase)", "Transactions must lock tables twice", "Transactions must use two different keys", "Transactions have 2 seconds to complete"],
      answer: 0,
      explanation: "2PL prohibits acquiring new locks once any lock has been released (Growing -> Shrinking).",
      difficulty: "Intermediate"
    },
    {
      q: "What does the Basic 2PL protocol guarantee?",
      options: ["Freedom from deadlocks", "Conflict serializability", "Fastest execution speed", "Zero memory overhead"],
      answer: 1,
      explanation: "Basic 2PL guarantees conflict serializability, but it does NOT prevent deadlocks.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Strict Two-Phase Locking (Strict 2PL)?",
      options: ["All exclusive (write) locks must be held until the transaction commits or aborts", "No shared locks allowed", "All locks released immediately after write", "Only one transaction can run at a time"],
      answer: 0,
      explanation: "Strict 2PL holds all exclusive locks until commit/abort, preventing cascading aborts.",
      difficulty: "Intermediate"
    },
    {
      q: "What is a Cascading Abort (Cascading Rollback)?",
      options: ["When one transaction commits causing others to commit", "When the failure of one transaction forces other dependent transactions that read uncommitted data to roll back", "When memory runs out", "When queries timeout"],
      answer: 1,
      explanation: "Cascading aborts occur when transactions read dirty data written by an uncommitted transaction that later aborts.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Dirty Read anomaly?",
      options: ["A transaction reads data written by another uncommitted transaction that subsequently aborts", "Reading data twice and getting different results", "Reading old data from tape", "Reading NULL values"],
      answer: 0,
      explanation: "Dirty read happens when T2 reads an item modified by uncommitted T1; if T1 rolls back, T2 read invalid state.",
      difficulty: "Beginner"
    },
    {
      q: "What is the Non-Repeatable Read anomaly?",
      options: ["Reading the same row twice within a transaction yields different values because another transaction modified and committed it", "A query that runs only once", "A query that fails with an error", "A transaction that cannot write"],
      answer: 0,
      explanation: "Non-repeatable read occurs when T1 reads an item, T2 updates/deletes it and commits, and T1 re-reads different data.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Phantom Read anomaly?",
      options: ["A ghost transaction", "A transaction re-executes a range query and finds new rows inserted and committed by another transaction", "Reading from deleted tables", "Reading from index files"],
      answer: 1,
      explanation: "Phantom read occurs when a transaction queries a range of rows and another transaction inserts new matching rows.",
      difficulty: "Intermediate"
    },
    {
      q: "Which SQL transaction isolation level prevents all anomalies: dirty reads, non-repeatable reads, and phantom reads?",
      options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
      answer: 3,
      explanation: "Serializable is the highest isolation level, completely eliminating dirty, non-repeatable, and phantom reads.",
      difficulty: "Beginner"
    },
    {
      q: "What is a Deadlock in database concurrency?",
      options: ["When a query finishes in 0 seconds", "A cycle of transactions where each is waiting for a lock held by another transaction in the cycle", "When the power fails", "When hard disks are disconnected"],
      answer: 1,
      explanation: "Deadlock is a circular wait condition where none of the involved transactions can make progress.",
      difficulty: "Beginner"
    },
    {
      q: "How can deadlocks be detected by a DBMS?",
      options: ["By checking CPU temperature", "By constructing a Wait-For Graph (WFG) and detecting directed cycles", "By counting tables", "By measuring network bandwidth"],
      answer: 1,
      explanation: "A cycle in a Wait-For Graph (where nodes are transactions and edges represent lock waits) indicates a deadlock.",
      difficulty: "Intermediate"
    },
    {
      q: "What is the Wait-Die deadlock prevention scheme?",
      options: ["Older transaction waits for younger; younger transaction dies (rolls back) if it requests a lock held by older", "Younger transaction kills older", "All transactions wait indefinitely", "Transactions die after 10 seconds"],
      answer: 0,
      explanation: "Wait-Die is a non-preemptive timestamp scheme: older waits, younger dies.",
      difficulty: "Advanced"
    },
    {
      q: "What is Write-Ahead Logging (WAL) in database recovery?",
      options: ["Writing data before creating tables", "Log records describing changes must be flushed to non-volatile disk BEFORE the corresponding dirty data pages are written", "Writing documentation before coding", "Writing SQL in log files"],
      answer: 1,
      explanation: "WAL protocol ensures recovery log records reach disk before dirty pages to guarantee rollback ability.",
      difficulty: "Intermediate"
    },
    {
      q: "What happens during Checkpointing in database recovery?",
      options: ["Database is deleted", "Dirty buffer pages are flushed to disk, and a checkpoint record is written to the log to limit recovery time", "All users are logged out", "Passwords are reset"],
      answer: 1,
      explanation: "Checkpointing synchronizes memory buffers with disk, bounding the number of log records needed during crash recovery.",
      difficulty: "Intermediate"
    }
  ],
  "dbms-u6-nosql": [
    {
      q: "According to the CAP Theorem, which two guarantees must a distributed system choose between when a network partition (P) occurs?",
      options: ["Consistency and Availability", "Concurrency and Atomicity", "Performance and Security", "Durability and Scalability"],
      answer: 0,
      explanation: "When network partitions occur, distributed systems must trade off between strict Consistency (CP) or high Availability (AP).",
      difficulty: "Beginner"
    },
    {
      q: "Which data model does MongoDB use to store records?",
      options: ["Tables with fixed rows and columns", "BSON (Binary JSON) documents organized in collections", "Triplets of subjects, predicates, objects", "Tab-separated text files"],
      answer: 1,
      explanation: "MongoDB stores data as flexible, self-describing BSON documents within collections.",
      difficulty: "Beginner"
    },
    {
      q: "What does the BASE acronym stand for in NoSQL distributed database systems?",
      options: ["Basic, ACID, Secure, Efficient", "Basically Available, Soft state, Eventual consistency", "Binary, Asynchronous, Storage, Engine", "Base, Array, Structured, Entity"],
      answer: 1,
      explanation: "BASE contrasts with ACID by prioritizing availability and acknowledging gradual convergence via eventual consistency.",
      difficulty: "Beginner"
    },
    {
      q: "Which type of NoSQL database is Neo4j?",
      options: ["Key-Value Store", "Document Store", "Graph Database", "Wide-Column Store"],
      answer: 2,
      explanation: "Neo4j is a graph database optimized for traversing highly interconnected nodes, edges, and properties.",
      difficulty: "Beginner"
    },
    {
      q: "Which type of NoSQL database is Redis?",
      options: ["In-memory Key-Value Store", "Relational Database", "Graph Database", "XML Database"],
      answer: 0,
      explanation: "Redis is a high-speed in-memory data store using key-value structures like strings, hashes, and sorted sets.",
      difficulty: "Beginner"
    },
    {
      q: "Which NoSQL category do Apache Cassandra and Google Bigtable belong to?",
      options: ["Wide-Column (Column-Family) Stores", "Pure Document Stores", "Relational Stores", "Graph Stores"],
      answer: 0,
      explanation: "Cassandra and Bigtable organize data into dynamic column families indexed by row keys.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Horizontal Scaling (Sharding) in NoSQL databases?",
      options: ["Upgrading to a bigger CPU and more RAM on a single machine", "Partitioning and distributing dataset rows/documents across multiple commodity servers", "Deleting old records to save space", "Splitting tables into columns"],
      answer: 1,
      explanation: "Sharding scales out horizontally by distributing subsets of data across a cluster of servers.",
      difficulty: "Beginner"
    },
    {
      q: "What is Eventual Consistency in distributed systems?",
      options: ["Data is never consistent", "If no new updates are made, all replicas will eventually converge and return the same value", "Data is consistent only on weekends", "Queries always block until all servers reply"],
      answer: 1,
      explanation: "Eventual consistency guarantees that in the absence of new writes, all replica nodes eventually hold identical data.",
      difficulty: "Intermediate"
    },
    {
      q: "In MongoDB, what is equivalent to a 'Table' in an RDBMS?",
      options: ["Document", "Collection", "Field", "Index"],
      answer: 1,
      explanation: "A MongoDB Collection groups multiple documents together, analogous to a relational table.",
      difficulty: "Beginner"
    },
    {
      q: "In MongoDB, what is equivalent to a 'Row' or 'Tuple' in an RDBMS?",
      options: ["Schema", "Database", "Document", "Column"],
      answer: 2,
      explanation: "An individual BSON Document corresponds directly to a row or tuple in a relational database.",
      difficulty: "Beginner"
    },
    {
      q: "What is the primary key field created automatically for every document in MongoDB?",
      options: ["id", "_id", "primary_key", "doc_key"],
      answer: 1,
      explanation: "MongoDB assigns a unique 12-byte ObjectId to the '_id' field by default if not supplied.",
      difficulty: "Beginner"
    },
    {
      q: "What is the main limitation of RDBMS that led to the rise of NoSQL architectures?",
      options: ["Inability to run on Linux", "Difficulty scaling out horizontally across distributed clusters for unstructured, high-velocity Big Data", "Slow arithmetic operations", "Lack of SQL syntax"],
      answer: 1,
      explanation: "Traditional relational databases struggle to scale writes horizontally across massive distributed commodity hardware.",
      difficulty: "Intermediate"
    },
    {
      q: "In the context of the PACELC theorem, what does it extend beyond the CAP theorem?",
      options: ["Considers performance in cloud environments", "States that if there is a Partition (P), trade off Availability (A) and Consistency (C); Else (E), trade off Latency (L) and Consistency (C)", "Adds Security and Encryption guarantees", "Measures disk wear and tear"],
      answer: 1,
      explanation: "PACELC accounts for normal operating conditions: even without partitions (Else), systems trade off Latency vs Consistency.",
      difficulty: "Advanced"
    },
    {
      q: "Which query language is used by Neo4j for graph traversals?",
      options: ["SQL", "Cypher", "SPARQL", "GraphQL"],
      answer: 1,
      explanation: "Neo4j uses Cypher, a declarative graph query language matching patterns like (n:Person)-[:FRIENDS_WITH]->(m).",
      difficulty: "Intermediate"
    },
    {
      q: "What is a major advantage of Document Stores over Relational Databases for agile software development?",
      options: ["Zero CPU usage", "Schema flexibility: documents can evolve without running expensive ALTER TABLE schema migrations", "No need for primary keys", "Guaranteed single-threaded safety"],
      answer: 1,
      explanation: "Document databases are schema-free/dynamic, allowing fields to vary across documents without table alterations.",
      difficulty: "Beginner"
    },
    {
      q: "What is MapReduce in Big Data processing?",
      options: ["A hardware chip", "A distributed programming model: Map filters/sorts data, and Reduce aggregates intermediate results across nodes", "A CSS styling rule", "A compression codec"],
      answer: 1,
      explanation: "MapReduce processes vast datasets concurrently by dividing tasks into mapping and reduction stages.",
      difficulty: "Intermediate"
    },
    {
      q: "What is Master-Slave (Primary-Replica) replication in distributed databases?",
      options: ["All nodes are identical and write simultaneously", "Writes are directed to a Primary node which asynchronously replicates updates to secondary read replicas", "Computers share the same power supply", "Data is copied to USB drives"],
      answer: 1,
      explanation: "Primary-Replica topology concentrates writes on the primary node and distributes read traffic across replicas.",
      difficulty: "Beginner"
    },
    {
      q: "What is the purpose of Consistent Hashing in distributed NoSQL key-value stores?",
      options: ["To encrypt user passwords", "To distribute keys across a dynamic ring of servers such that adding or removing nodes minimizes remapped keys", "To ensure all hash tables have the same size", "To prevent SQL injection"],
      answer: 1,
      explanation: "Consistent hashing maps nodes and keys to a logical circle, remapping only K/N keys when a server joins or leaves.",
      difficulty: "Advanced"
    },
    {
      q: "Which NoSQL database is widely used by companies like Netflix for global multi-region active-active deployments?",
      options: ["SQLite", "Apache Cassandra", "Microsoft Access", "FoxPro"],
      answer: 1,
      explanation: "Cassandra's masterless peer-to-peer ring architecture supports multi-region active-active distributed setups.",
      difficulty: "Intermediate"
    },
    {
      q: "What is polyglot persistence in modern software architecture?",
      options: ["Writing database drivers in different languages", "Using different database engines (e.g. Relational for billing, Redis for cache, Mongo for product catalogs, Neo4j for social graphs) suited to each task", "Translating SQL queries to multiple spoken languages", "Storing backups in multiple formats"],
      answer: 1,
      explanation: "Polyglot persistence matches specific storage technologies to the unique needs of different microservices.",
      difficulty: "Intermediate"
    }
  ]
};
