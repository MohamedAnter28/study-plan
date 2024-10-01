// script.js

// التعامل مع نموذج الامتحانات
const examForm = document.getElementById('exam-form');
examForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('exam-name').value;
    const date = document.getElementById('exam-date').value;
    const percentage = document.getElementById('exam-percentage').value;
    
    const exams = JSON.parse(localStorage.getItem('exams')) || [];
    exams.push({ name, date, percentage });
    localStorage.setItem('exams', JSON.stringify(exams));
    
    examForm.reset();
    updateChart();
});

// التعامل مع نموذج الواجبات
const assignmentForm = document.getElementById('assignment-form');
assignmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('assignment-name').value;
    const deadline = document.getElementById('assignment-deadline').value;
    const description = document.getElementById('assignment-description').value;
    
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    assignments.push({ name, deadline, description });
    localStorage.setItem('assignments', JSON.stringify(assignments));
    
    assignmentForm.reset();
    displayAssignments();
    alert('تمت إضافة الواجب بنجاح!');
});

// التعامل مع نموذج الحصص الدراسية
const classForm = document.getElementById('class-form');
classForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const className = document.getElementById('class-name').value;
    const subject = document.getElementById('class-subject').value;
    const date = document.getElementById('class-date').value;
    const type = document.getElementById('class-type').value;
    
    const classes = JSON.parse(localStorage.getItem('classes')) || [];
    classes.push({ className, subject, date, type });
    localStorage.setItem('classes', JSON.stringify(classes));
    
    classForm.reset();
    displayClasses();
});

// عرض الحصص الدراسية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayClasses();
    displayAssignments();
    updateChart();
});

// دالة لعرض الحصص الدراسية في الجدول
function displayClasses() {
    const classes = JSON.parse(localStorage.getItem('classes')) || [];
    const classesTableBody = document.querySelector('#classes-table tbody');
    classesTableBody.innerHTML = '';
    
    classes.forEach((cls, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${cls.className}</td>
            <td>${cls.subject}</td>
            <td>${cls.date}</td>
            <td>${cls.type}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteClass(${index})">حذف</button>
            </td>
        `;
        
        classesTableBody.appendChild(row);
    });
}

// دالة لحذف حصة دراسية
function deleteClass(index) {
    let classes = JSON.parse(localStorage.getItem('classes')) || [];
    classes.splice(index, 1);
    localStorage.setItem('classes', JSON.stringify(classes));
    displayClasses();
}

// دالة لعرض الواجبات في الجدول
function displayAssignments() {
    const assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    const assignmentsTableBody = document.querySelector('#assignments-table tbody');
    assignmentsTableBody.innerHTML = '';
    
    assignments.forEach((assignment, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${assignment.name}</td>
            <td>${assignment.deadline}</td>
            <td>${assignment.description}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteAssignment(${index})">حذف</button>
            </td>
        `;
        
        assignmentsTableBody.appendChild(row);
    });
}

// دالة لحذف واجب
function deleteAssignment(index) {
    let assignments = JSON.parse(localStorage.getItem('assignments')) || [];
    assignments.splice(index, 1);
    localStorage.setItem('assignments', JSON.stringify(assignments));
    displayAssignments();
}

// إعداد الرسم البياني للأداء الدراسي
let myChart;

function updateChart() {
    const exams = JSON.parse(localStorage.getItem('exams')) || [];
    const labels = exams.map(exam => exam.name);
    const data = exams.map(exam => exam.percentage);
    
    if (myChart) {
        myChart.destroy();
    }
    
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'نسبة الامتحانات (%)',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}
