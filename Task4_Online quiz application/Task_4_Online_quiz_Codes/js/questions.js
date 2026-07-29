/* ==========================================================================
   Sentinel Exams — Question Bank
   Categories mirror a real data-analytics certification track.
   ========================================================================== */

const EXAM_BANK = {
  sql: {
    title: "SQL Fundamentals",
    icon: "sql",
    description: "Queries, joins, aggregation, and filtering.",
    questions: [
      { q: "Which clause filters rows BEFORE aggregation is performed?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], answer: 0 },
      { q: "Which JOIN returns all rows from the left table, matched rows from the right, and NULLs where there's no match?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"], answer: 1 },
      { q: "What does the SQL DISTINCT keyword do?", options: ["Removes duplicate rows from the result set", "Sorts the result set", "Renames a column", "Deletes rows from a table"], answer: 0 },
      { q: "Which clause is used to filter groups AFTER a GROUP BY aggregation?", options: ["WHERE", "HAVING", "LIMIT", "ON"], answer: 1 },
      { q: "What does COUNT(*) return?", options: ["The number of rows in the result set", "The sum of all numeric columns", "The number of distinct tables", "The average row size"], answer: 0 },
      { q: "Which statement is used to combine the result sets of two queries with the same column structure?", options: ["JOIN", "UNION", "MERGE", "APPEND"], answer: 1 },
      { q: "What is a primary key?", options: ["A column (or set of columns) that uniquely identifies each row", "Any column with numeric data", "A column that allows duplicates", "The first column in a table"], answer: 0 },
      { q: "Which function returns the number of rows matching a condition, ignoring NULLs in that column?", options: ["COUNT(column_name)", "SUM(column_name)", "AVG(column_name)", "LEN(column_name)"], answer: 0 }
    ]
  },
  powerbi: {
    title: "Power BI & Visualization",
    icon: "powerbi",
    description: "Data modeling, DAX basics, and dashboard design.",
    questions: [
      { q: "In Power BI, what is DAX primarily used for?", options: ["Writing formulas for calculated columns and measures", "Styling report themes", "Connecting to a database", "Exporting to PDF"], answer: 0 },
      { q: "What does a 'Sync Slicers' feature allow across report pages?", options: ["The same slicer selection applies across multiple pages", "Automatic translation of visuals", "Merging two datasets", "Refreshing the dataset on a schedule"], answer: 0 },
      { q: "In a star schema data model, what does the fact table typically contain?", options: ["Quantitative, measurable transaction data", "Only descriptive text fields", "User login credentials", "Report formatting settings"], answer: 0 },
      { q: "What is the purpose of a Power BI 'Matrix' visual header?", options: ["To label rows/columns and allow drill-down in a cross-tab layout", "To store a stored procedure", "To connect to a REST API", "To encrypt sensitive fields"], answer: 0 },
      { q: "Which DAX function calculates the difference in days between two dates?", options: ["DATEDIF", "TODAY", "FILTER", "RELATED"], answer: 0 },
      { q: "What does a Power BI 'relationship' between two tables define?", options: ["How rows in one table relate to rows in another for filtering", "The visual color palette", "The refresh schedule", "The export file format"], answer: 0 },
      { q: "Which visual type is best suited for showing part-to-whole composition over a few categories?", options: ["Pie or donut chart", "Line chart", "Scatter plot", "Gauge"], answer: 0 },
      { q: "What is the main benefit of using bookmarks in a Power BI report?", options: ["Capturing a specific view/state to navigate back to", "Encrypting the dataset", "Creating new tables", "Scheduling data refresh"], answer: 0 }
    ]
  },
  python: {
    title: "Python for Data Analysis",
    icon: "python",
    description: "Pandas, data cleaning, and scripting basics.",
    questions: [
      { q: "Which pandas method is the modern replacement for the deprecated DataFrame.append()?", options: ["pd.concat()", "pd.merge_all()", "df.join_rows()", "df.extend()"], answer: 0 },
      { q: "What does df.dropna() do by default?", options: ["Removes rows containing any NaN values", "Fills NaN values with zero", "Removes duplicate rows", "Sorts the DataFrame"], answer: 0 },
      { q: "Which pandas function reads a CSV file into a DataFrame?", options: ["pd.read_csv()", "pd.load_csv()", "pd.open_csv()", "pd.import_csv()"], answer: 0 },
      { q: "What is the purpose of a virtual environment (e.g. conda env) in Python projects?", options: ["To isolate project dependencies from the global Python install", "To speed up internet connections", "To encrypt source code", "To compile Python to machine code"], answer: 0 },
      { q: "Which library is commonly used for working with geospatial DataFrames in Python?", options: ["GeoPandas", "Matplotlib", "Requests", "Flask"], answer: 0 },
      { q: "What does df.groupby('column').mean() compute?", options: ["The average of numeric columns for each group in 'column'", "The count of unique values", "The maximum value in the DataFrame", "A random sample of rows"], answer: 0 },
      { q: "Which of these best explains a positional indexing bug (e.g. via .iloc misalignment)?", options: ["Referencing rows/columns by position when the underlying order has changed", "A missing import statement", "A syntax error in a for-loop", "An incorrect file path"], answer: 0 },
      { q: "What is the benefit of using Jupyter notebooks for data analysis?", options: ["Interactive, cell-by-cell execution with inline output and visualization", "Faster raw execution than any script", "Built-in database hosting", "Automatic report translation"], answer: 0 }
    ]
  },
  ethics: {
    title: "Data Ethics & Integrity",
    icon: "ethics",
    description: "Academic and professional integrity in data work.",
    questions: [
      { q: "Why is data provenance (tracking where data came from) important?", options: ["It allows others to verify and trust the source and handling of the data", "It makes files load faster", "It is required for CSV formatting", "It replaces the need for data cleaning"], answer: 0 },
      { q: "What is a key principle of academic integrity during a proctored assessment?", options: ["Completing the assessment using only permitted resources, without external help", "Using any resource as long as you finish on time", "Collaborating freely with other candidates", "Copying answers if the proctor is not visible"], answer: 0 },
      { q: "Why do many exam platforms flag tab-switching during a timed assessment?", options: ["To help ensure the candidate isn't consulting unauthorized resources", "To track the candidate's internet speed", "To automatically translate the exam", "To adjust the exam's color theme"], answer: 0 },
      { q: "What does 'data anonymization' primarily protect?", options: ["The privacy of individuals identifiable in a dataset", "The file size of a dataset", "The color formatting of a spreadsheet", "The speed of a database query"], answer: 0 },
      { q: "In a survey data pipeline (e.g. SurveyCTO/ODK), why are fraud-detection checks used?", options: ["To flag anomalous or fabricated field responses", "To translate the survey into other languages", "To automatically increase the sample size", "To format the survey PDF"], answer: 0 },
      { q: "What is the purpose of a Child Labor Monitoring and Remediation System in supply chains?", options: ["To detect and respond to child labor risk cases", "To calculate shipping costs", "To grade commodity quality", "To manage warehouse inventory"], answer: 0 },
      { q: "Why should analysts disclose assumptions made during data cleaning?", options: ["So others can evaluate and reproduce the analysis accurately", "To make the report longer", "It is not necessary if the analyst is confident", "To satisfy file naming conventions"], answer: 0 },
      { q: "What is the main ethical concern with silently interpolating missing survey data?", options: ["It can misrepresent the real dataset without transparency", "It always improves data accuracy", "It automatically corrects respondent bias", "It is required by every statistical method"], answer: 0 }
    ]
  }
};

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildExamSet(categoryKey, count = 8) {
  const cat = EXAM_BANK[categoryKey];
  if (!cat) return [];
  const picked = shuffleArray(cat.questions).slice(0, Math.min(count, cat.questions.length));
  return picked.map(item => {
    const correctText = item.options[item.answer];
    const shuffled = shuffleArray(item.options);
    return { q: item.q, options: shuffled, answer: shuffled.indexOf(correctText) };
  });
}
