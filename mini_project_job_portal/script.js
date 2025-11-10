console.log("CareerConnect Job Portal initialized");

document.addEventListener('DOMContentLoaded', function() {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) greeting = "Good morning";
    else if (hour < 18) greeting = "Good afternoon";
    else greeting = "Good evening";

    document.getElementById('welcomeMessage').innerHTML = `
        <h3>${greeting}, Job Seeker!</h3>
        <p>Welcome to CareerConnect, your one-stop solution for finding the perfect job.</p>
    `;

    console.log("User environment logged");
    console.error("This is a simulated error message");
    
    const jobData = [
        { id: 1, title: "Frontend Developer", company: "TechCorp", salary: 75000 },
        { id: 2, title: "Backend Developer", company: "DataSystems", salary: 85000 },
        { id: 3, title: "UX Designer", company: "CreativeMinds", salary: 70000 }
    ];
    console.table(jobData);
    
    function demonstrateTrace() {
        console.trace("Function call trace");
    }
    demonstrateTrace();
});

var globalVar = "I'm a global variable";
let jobCount = 0;
const MAX_JOBS = 100;

function createJobListing({ 
    title = "Unknown Position", 
    company = "Unknown Company", 
    location = "Remote", 
    salary = "Not specified",
    type = "Full-time"
} = {}) {
    return `
        <div class="job-item">
            <div class="job-info">
                <h3>${title}</h3>
                <p>${company} • ${location}</p>
                <div class="job-meta">
                    <span>$${salary}/year</span>
                    <span>${type}</span>
                </div>
            </div>
            <div class="actions">
                <button class="btn-apply" data-job="${title}">Apply</button>
            </div>
        </div>
    `;
}

document.getElementById('calculateSalary').addEventListener('click', function() {
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 0;
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value) || 0;
    const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
    
    function calculateNetSalary(rate = 0, hours = 0, tax = 0) {
        const grossSalary = rate * hours;
        const taxAmount = grossSalary * (tax / 100);
        const netSalary = grossSalary - taxAmount;
        
        const salaryDetails = { gross: grossSalary, tax: taxAmount, net: netSalary };
        const { gross, tax: taxDeduction, net } = salaryDetails;
        
        return { gross, taxDeduction, net };
    }
    
    const { gross, taxDeduction, net } = calculateNetSalary(hourlyRate, hoursWorked, taxRate);
    
    document.getElementById('salaryResult').innerHTML = `
        <h3>Salary Calculation:</h3>
        <p>Gross Salary: $${gross.toFixed(2)}</p>
        <p>Tax Deduction: $${taxDeduction.toFixed(2)}</p>
        <p><strong>Net Salary: $${net.toFixed(2)}</strong></p>
    `;
});

document.getElementById('gradeScore').addEventListener('click', function() {
    const score = parseInt(document.getElementById('testScore').value);
    let grade, message;
    
    if (score >= 90) {
        grade = 'A';
        message = 'Excellent! You qualify for senior positions.';
    } else if (score >= 80) {
        grade = 'B';
        message = 'Good! You qualify for mid-level positions.';
    } else if (score >= 70) {
        grade = 'C';
        message = 'Fair. Consider junior positions or skill improvement.';
    } else if (score >= 60) {
        grade = 'D';
        message = 'Needs improvement. Focus on skill development.';
    } else {
        grade = 'F';
        message = 'Failed. Please retake the assessment after preparation.';
    }
    
    switch(grade) {
        case 'A':
            message += ' You are a top candidate!';
            break;
        case 'B':
            message += ' You have strong potential.';
            break;
        case 'C':
            message += ' Continue developing your skills.';
            break;
        case 'D':
        case 'F':
            message += ' We recommend our career counseling services.';
            break;
        default:
            message += ' Please contact support for guidance.';
    }
    
    document.getElementById('gradeResult').innerHTML = `
        <h3>Assessment Result: ${grade}</h3>
        <p>${message}</p>
    `;
    
    let indicators = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= (score / 20)) {
            indicators += '★ ';
        } else {
            indicators += '☆ ';
        }
    }
    
    document.getElementById('gradeResult').innerHTML += `<p>Skill Level: ${indicators}</p>`;
});

document.getElementById('checkPalindrome').addEventListener('click', function() {
    const input = document.getElementById('applicationId').value;
    
    try {
        if (!input) {
            throw new Error('Please enter an Application ID');
        }
        
        function reverseString(str) {
            return str.split('').reverse().join('');
        }
        
        const cleanString = function(str) {
            return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        };
        
        const isPalindrome = (str) => {
            const cleaned = cleanString(str);
            const reversed = reverseString(cleaned);
            return cleaned === reversed;
        };
        
        const result = isPalindrome(input);
        
        function createPalindromeChecker() {
            let checkCount = 0;
            
            return function(str) {
                checkCount++;
                console.log(`Palindrome check #${checkCount}`);
                return isPalindrome(str);
            };
        }
        
        const palindromeChecker = createPalindromeChecker();
        const isPal = palindromeChecker(input);
        
        document.getElementById('palindromeResult').innerHTML = `
            <p>Application ID: "${input}"</p>
            <p><strong>${isPal ? '✓ This is a palindrome!' : '✗ This is not a palindrome.'}</strong></p>
        `;
        
    } catch (error) {
        document.getElementById('palindromeResult').innerHTML = `
            <p class="error">Error: ${error.message}</p>
        `;
        console.error('Palindrome check error:', error);
    }
});

const jobs = [
    { id: 1, title: "Frontend Developer", company: "TechCorp", salary: 75000, category: "IT", experience: "Mid-level" },
    { id: 2, title: "Backend Developer", company: "DataSystems", salary: 85000, category: "IT", experience: "Senior" },
    { id: 3, title: "UX Designer", company: "CreativeMinds", salary: 70000, category: "Design", experience: "Mid-level" },
    { id: 4, title: "Data Analyst", company: "AnalyticsPro", salary: 65000, category: "Data", experience: "Junior" },
    { id: 5, title: "Project Manager", company: "ManageWell", salary: 90000, category: "Management", experience: "Senior" }
];

let appliedJobs = [];

function displayJobs(jobList = jobs) {
    const jobListElement = document.getElementById('jobList');
    jobListElement.innerHTML = '';
    
    jobList.forEach(job => {
        const jobElement = document.createElement('li');
        jobElement.innerHTML = createJobListing(job);
        jobListElement.appendChild(jobElement);
    });
    
    document.querySelectorAll('.btn-apply').forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.getAttribute('data-job');
            applyForJob(jobTitle);
        });
    });
    
    updateCartTotal();
}

function applyForJob(jobTitle) {
    const job = jobs.find(j => j.title === jobTitle);
    if (job && !appliedJobs.find(aj => aj.id === job.id)) {
        appliedJobs.push(job);
        
        showNotification(`Successfully applied for ${jobTitle}`);
        
        updateCartTotal();
    }
}

function updateCartTotal() {
    const totalSalary = appliedJobs.map(job => job.salary).reduce((sum, salary) => sum + salary, 0);
    const jobCount = appliedJobs.length;
    
    const seniorJobs = appliedJobs.filter(job => job.experience === "Senior");
    const discount = seniorJobs.length > 0 ? seniorJobs.length * 5000 : 0;
    
    const finalTotal = totalSalary - discount;
    
    document.getElementById('cartTotal').innerHTML = `
        <h3>Application Summary:</h3>
        <p>Jobs Applied: ${jobCount}</p>
        <p>Total Salary Range: $${totalSalary.toLocaleString()}</p>
        ${discount > 0 ? `<p>Senior Position Discount: -$${discount.toLocaleString()}</p>` : ''}
        <p><strong>Adjusted Salary Range: $${finalTotal.toLocaleString()}</strong></p>
    `;
}

document.getElementById('searchJobs').addEventListener('click', function() {
    const searchTerm = document.getElementById('jobSearch').value.toLowerCase();
    
    if (!searchTerm) {
        displayJobs();
        return;
    }
    
    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) || 
        job.company.toLowerCase().includes(searchTerm) ||
        job.category.toLowerCase().includes(searchTerm)
    );
    
    displayJobs(filteredJobs);
});

document.getElementById('applyDiscount').addEventListener('click', function() {
    updateCartTotal();
    showNotification("Senior discount applied to eligible positions");
});

displayJobs();

document.getElementById('emailInput').addEventListener('blur', function() {
    const email = this.value;
    const validationElement = document.getElementById('emailValidation');
    
    if (!email) {
        validationElement.textContent = '';
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
        validationElement.textContent = '✓ Valid email address';
        validationElement.className = 'success';
    } else {
        validationElement.textContent = '✗ Please enter a valid email address';
        validationElement.className = 'error';
    }
});

document.getElementById('analyzeText').addEventListener('click', function() {
    const text = document.getElementById('textAnalysis').value;
    
    if (!text) {
        document.getElementById('textAnalysisResult').innerHTML = '<p class="error">Please enter some text to analyze</p>';
        return;
    }
    
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const charCount = text.length;
    const sentenceCount = text.split(/[.!?]+/).filter(sentence => sentence.length > 0).length;
    
    const vowelCount = (text.match(/[aeiou]/gi) || []).length;
    
    const reversedText = text.split('').reverse().join('');
    
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
    const emails = text.match(emailRegex) || [];
    
    document.getElementById('textAnalysisResult').innerHTML = `
        <h3>Text Analysis Results:</h3>
        <p><strong>Word Count:</strong> ${wordCount}</p>
        <p><strong>Character Count:</strong> ${charCount}</p>
        <p><strong>Sentence Count:</strong> ${sentenceCount}</p>
        <p><strong>Vowel Count:</strong> ${vowelCount}</p>
        ${emails.length > 0 ? `<p><strong>Email Addresses Found:</strong> ${emails.join(', ')}</p>` : ''}
        <p><strong>Reversed Text:</strong> ${reversedText.substring(0, 100)}${reversedText.length > 100 ? '...' : ''}</p>
    `;
});

let tasks = JSON.parse(localStorage.getItem('jobTasks')) || [];

function displayTasks() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'todo-item';
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="btn-edit" data-index="${index}">Edit</button>
                <button class="btn-delete" data-index="${index}">Delete</button>
            </div>
        `;
        todoList.appendChild(taskItem);
    });
    
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            editTask(index);
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteTask(index);
        });
    });
}

function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const taskText = newTaskInput.value.trim();
    
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        newTaskInput.value = '';
        saveTasks();
        displayTasks();
        showNotification('Task added successfully');
    }
}

function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        displayTasks();
        showNotification('Task updated successfully');
    }
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
        showNotification('Task deleted successfully');
    }
}

function saveTasks() {
    localStorage.setItem('jobTasks', JSON.stringify(tasks));
}

document.getElementById('addTask').addEventListener('click', addTask);

document.getElementById('newTask').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

displayTasks();

document.getElementById('applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('applicantName').value.trim();
    const email = document.getElementById('applicantEmail').value.trim();
    const age = parseInt(document.getElementById('applicantAge').value);
    const resume = document.getElementById('applicantResume').files[0];
    
    let isValid = true;
    
    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required';
        isValid = false;
    } else if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }
    
    if (!age) {
        document.getElementById('ageError').textContent = 'Age is required';
        isValid = false;
    } else if (age < 18) {
        document.getElementById('ageError').textContent = 'You must be at least 18 years old';
        isValid = false;
    } else if (age > 100) {
        document.getElementById('ageError').textContent = 'Please enter a valid age';
        isValid = false;
    } else {
        document.getElementById('ageError').textContent = '';
    }
    
    if (!resume) {
        document.getElementById('resumeError').textContent = 'Resume is required';
        isValid = false;
    } else if (resume.type !== 'application/pdf') {
        document.getElementById('resumeError').textContent = 'Please upload a PDF file';
        isValid = false;
    } else {
        document.getElementById('resumeError').textContent = '';
    }
    
    if (isValid) {
        showNotification('Application submitted successfully!');
        this.reset();
    }
});

document.getElementById('applicantName').addEventListener('blur', function() {
    const name = this.value.trim();
    if (!name) {
        document.getElementById('nameError').textContent = 'Name is required';
    } else if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
    } else {
        document.getElementById('nameError').textContent = '';
    }
});

document.getElementById('applicantEmail').addEventListener('blur', function() {
    const email = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
    } else {
        document.getElementById('emailError').textContent = '';
    }
});

document.getElementById('applicantAge').addEventListener('blur', function() {
    const age = parseInt(this.value);
    if (!age) {
        document.getElementById('ageError').textContent = 'Age is required';
    } else if (age < 18) {
        document.getElementById('ageError').textContent = 'You must be at least 18 years old';
    } else if (age > 100) {
        document.getElementById('ageError').textContent = 'Please enter a valid age';
    } else {
        document.getElementById('ageError').textContent = '';
    }
});

document.getElementById('applicantResume').addEventListener('change', function() {
    const resume = this.files[0];
    if (!resume) {
        document.getElementById('resumeError').textContent = 'Resume is required';
    } else if (resume.type !== 'application/pdf') {
        document.getElementById('resumeError').textContent = 'Please upload a PDF file';
    } else {
        document.getElementById('resumeError').textContent = '';
    }
});

const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = 'Dark Mode';
    }
});

document.getElementById('loadSchedule').addEventListener('click', function() {
    const scheduleData = [
        { date: "2023-10-15", time: "10:00 AM", company: "TechCorp", position: "Frontend Developer", status: "Scheduled" },
        { date: "2023-10-18", time: "2:30 PM", company: "DataSystems", position: "Backend Developer", status: "Scheduled" },
        { date: "2023-10-12", time: "9:00 AM", company: "CreativeMinds", position: "UX Designer", status: "Completed" },
        { date: "2023-10-20", time: "11:00 AM", company: "AnalyticsPro", position: "Data Analyst", status: "Scheduled" },
        { date: "2023-10-25", time: "3:00 PM", company: "ManageWell", position: "Project Manager", status: "Scheduled" }
    ];
    
    showNotification('Loading interview schedule...');
    
    setTimeout(() => {
        displaySchedule(scheduleData);
        showNotification('Schedule loaded successfully');
    }, 1000);
});

function displaySchedule(schedule) {
    const scheduleBody = document.getElementById('scheduleBody');
    scheduleBody.innerHTML = '';
    
    schedule.forEach(item => {
        const row = document.createElement('tr');
        
        const dateObj = new Date(item.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${item.time}</td>
            <td>${item.company}</td>
            <td>${item.position}</td>
            <td>${item.status}</td>
        `;
        
        if (item.status === 'Scheduled') {
            const today = new Date();
            const interviewDate = new Date(item.date);
            
            if (interviewDate > today) {
                row.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
            }
        }
        
        scheduleBody.appendChild(row);
    });
}

let countdownInterval;

document.getElementById('startTimer').addEventListener('click', function() {
    const interviewDateInput = document.getElementById('interviewDate').value;
    
    if (!interviewDateInput) {
        alert('Please select an interview date and time');
        return;
    }
    
    const interviewDate = new Date(interviewDateInput).getTime();
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = interviewDate - now;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "INTERVIEW TIME!";
            showNotification('Your interview is starting now!', 'warning');
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('countdown').innerHTML = 
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
        
        if (distance < 3600000 && distance > 3595000) {
            showNotification('Your interview starts in 1 hour!', 'warning');
        }
        
        if (distance < 900000 && distance > 895000) {
            showNotification('Your interview starts in 15 minutes!', 'warning');
        }
        
    }, 1000);
    
    showNotification('Countdown timer started');
});

document.getElementById('stopTimer').addEventListener('click', function() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "00:00:00";
        showNotification('Countdown timer stopped');
    }
});

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    if (type === 'warning') {
        notification.style.backgroundColor = 'var(--warning-color)';
    } else if (type === 'error') {
        notification.style.backgroundColor = 'var(--danger-color)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}