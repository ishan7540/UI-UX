function twoNumberCalculator(a, b) {
  a = Number(a);
  b = Number(b);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('Inputs must be valid numbers.');
  }
  const sum = a + b;
  const difference = a - b;
  const product = a * b;
  const quotient = (b === 0) ? (a === 0 ? NaN : Infinity) : (a / b);
  return { sum, difference, product, quotient };
}

function parseNumberArrayString(s) {
  if (typeof s !== 'string') return [];
  return s.split(',')
          .map(x => x.trim())
          .filter(x => x.length > 0)
          .map(x => Number(x))
          .filter(n => Number.isFinite(n));
}

function arrayOpsFive(arr) {
  if (!Array.isArray(arr)) throw new Error('arr must be an array');
  const nums = arr.slice(0, 5).map(Number).filter(n => Number.isFinite(n));
  if (nums.length === 0) throw new Error('Need at least one valid number');
  const largest = Math.max(...nums);
  const smallest = Math.min(...nums);
  const asc = [...nums].sort((a, b) => a - b);
  const desc = [...asc].slice().reverse();
  return { used: nums, largest, smallest, asc, desc };
}

function validateForm({ name, email, age }) {
  const errors = [];
  if (typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name cannot be empty.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('Email is not valid.');
  }
  const nAge = Number(age);
  if (!Number.isFinite(nAge)) {
    errors.push('Age must be a number.');
  } else if (nAge < 18 || nAge > 100) {
    errors.push('Age must be between 18 and 100.');
  }
  return {
    valid: errors.length === 0,
    errors,
    data: errors.length === 0 ? { name: name.trim(), email: email.trim(), age: nAge } : null
  };
}

function createStudent({ name = 'Student Name', age = 18, grades = {} } = {}) {
  return { name, age, grades };
}

function addClassProperty(student, classValue) {
  if (!student || typeof student !== 'object') throw new Error('Invalid student');
  student.class = classValue;
  return student;
}

function updateStudentGrade(student, subject, newGrade) {
  if (!student || typeof student !== 'object') throw new Error('Invalid student');
  if (!student.grades || typeof student.grades !== 'object') student.grades = {};
  student.grades[subject] = newGrade;
  return student;
}

function studentInfo(student) {
  if (!student || typeof student !== 'object') throw new Error('Invalid student');
  return JSON.parse(JSON.stringify(student));
}

function processNumbersPipeline(numbers) {
  if (!Array.isArray(numbers)) throw new Error('numbers must be an array');
  const nums = numbers.map(Number).filter(n => Number.isFinite(n));
  const evens = nums.filter(n => n % 2 === 0);
  const doubled = evens.map(n => n * 2);
  const sum = doubled.reduce((acc, val) => acc + val, 0);
  return { original: nums, evens, doubled, sum };
}

try {
  const res1 = twoNumberCalculator(12, 5);
  console.log('i) Two-number calculator result:', res1);
  console.log('Divide by zero example:', twoNumberCalculator(10, 0));
} catch (e) {
  console.error(e.message);
}

const arrInput = parseNumberArrayString('3, 8, -1, 14, 5');
const arrOps = arrayOpsFive(arrInput);
console.log('ii) Array operations:', arrOps);

const formCheck1 = validateForm({ name: 'Ishan', email: 'ishan@example.com', age: 21 });
console.log('iii) Form validation (valid):', formCheck1);
const formCheck2 = validateForm({ name: '', email: 'bad-email', age: 17 });
console.log('iii) Form validation (invalid):', formCheck2);

let student = createStudent({ name: 'Aisha Verma', age: 19, grades: { math: 85, physics: 78 } });
console.log('iv) Created student:', student);
addClassProperty(student, '12-A');
updateStudentGrade(student, 'math', 90);
console.log('iv) Updated student:', studentInfo(student));

const pipeline = processNumbersPipeline([1, 2, 3, 4, 5, 6]);
console.log('v) Pipeline result:', pipeline);
