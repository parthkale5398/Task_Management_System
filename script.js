
let tasks = [];
let currentEditTaskId = null;

function isParentIdUnique(id) {
  return tasks.every(task => task.id !== id);
}

function validateFields(id, name, startDate, endDate, status) {
  return id.trim() !== '' && name.match(/^[a-zA-Z\s]+$/) !== null && startDate <= endDate;
}

function addParentTask() {
  const parentTaskId = document.getElementById('parentTaskId').value;
  const parentTaskName = document.getElementById('parentTaskName').value;
  const parentStartDate = new Date(document.getElementById('parentStartDate').value);
  const parentEndDate = new Date(document.getElementById('parentEndDate').value);
  const parentStatus = document.getElementById('parentStatus').value;

  if (validateFields(parentTaskId, parentTaskName, parentStartDate, parentEndDate, parentStatus)) {
    if (isParentIdUnique(parentTaskId)) {
      const parentTask = {
        id: parentTaskId,
        name: parentTaskName,
        startDate: parentStartDate.toLocaleDateString(),
        endDate: parentEndDate.toLocaleDateString(),
        status: parentStatus,
      };

      tasks.push(parentTask);

      document.getElementById('parentTaskId').value = '';
      document.getElementById('parentTaskName').value = '';
      document.getElementById('parentStartDate').value = '';
      document.getElementById('parentEndDate').value = '';
      document.getElementById('parentStatus').value = '';

      updateTaskList();
    } else {
      alert("Parent ID already in use.");
    }
  } else {
    alert("Please fill in all fields correctly.");
  }
}


function updateTaskList() {
  const taskTableBody = document.getElementById('taskTableBody');
  
  taskTableBody.innerHTML = ''; 
  
  for (const task of tasks) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.id}</td>
      <td>${task.name}</td>
      <td>${task.startDate}</td>
      <td>${task.endDate}</td>
      <td>${task.status}</td>
      <td><button onclick="editTask('${task.id}')">Edit</button></td>
      <td><button onclick="deleteTask('${task.id}')">Delete</button></td>
    `;

    taskTableBody.appendChild(row);
  }
}

function editTask(taskId) {
  const taskToEdit = tasks.find(task => task.id === taskId);
  
  if (taskToEdit) {
    
    document.getElementById('editTaskName').value = taskToEdit.name;
    document.getElementById('editTaskStartDate').value = taskToEdit.startDate;

    document.getElementById('editTaskEndDate').value = taskToEdit.endDate;
    document.getElementById('editTaskStatus').value = taskToEdit.status;

    currentEditTaskId = taskId;
    document.getElementById('modalBackdrop').style.display = 'block';
    document.getElementById('editModal').style.display = 'block';
  }
}


function closeEditedTask() {
  currentEditTaskId = null;
  document.getElementById('modalBackdrop').style.display = 'none';
  document.getElementById('editModal').style.display = 'none';
}


function saveEditedTask() {
  if (currentEditTaskId !== null) {
    const editedTaskName = document.getElementById('editTaskName').value;
    const editedTaskStartDate = document.getElementById('editTaskStartDate').value;
    const editedTaskEndDate = document.getElementById('editTaskEndDate').value;
    const editedTaskStatus = document.getElementById('editTaskStatus').value;
   
    const taskToUpdate = tasks.find(task => task.id === currentEditTaskId);
    if (taskToUpdate) {
      taskToUpdate.name = editedTaskName;
      taskToUpdate.startDate = editedTaskStartDate;
      taskToUpdate.endDate = editedTaskEndDate;
      taskToUpdate.status = editedTaskStatus;
    }

    
    currentEditTaskId = null;    
    updateTaskList();
    document.getElementById('editModal').style.display = 'none';
  }
}

function deleteTask(taskId) { 
  tasks = tasks.filter(task => task.id !== taskId);
  updateTaskList();
}


updateTaskList();
