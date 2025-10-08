// script.js - simple todo logic

const taskForm = document.getElementById('taskForm');
const titleInput = document.getElementById('titleInput');
const descInput = document.getElementById('descInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const template = document.getElementById('taskTemplate');

function createTaskElement(title, desc){
  const node = template.content.firstElementChild.cloneNode(true);
  const titleEl = node.querySelector('.task-title');
  const descEl = node.querySelector('.task-desc');
  const completeBtn = node.querySelector('.complete-btn');
  const editBtn = node.querySelector('.edit-btn');
  const deleteBtn = node.querySelector('.delete-btn');

  titleEl.textContent = title;
  descEl.textContent = desc;

  // Completion toggle
  completeBtn.addEventListener('click', () => {
    const completed = titleEl.classList.toggle('completed');
    descEl.classList.toggle('completed');
    if(completed) completeBtn.textContent = 'Mark as Incomplete';
    else completeBtn.textContent = 'Mark as Completed';
  });

  // Delete
  deleteBtn.addEventListener('click', () => {
    if(confirm('Delete this task?')){
      node.remove();
    }
  });

  // Edit / Save
  editBtn.addEventListener('click', () => {
    const isEditing = node.classList.toggle('editing');
    if(isEditing){
      // switch to edit mode: replace title & desc with inputs
      const tInput = document.createElement('input');
      tInput.value = titleEl.textContent;
      tInput.maxLength = 100;
      const dInput = document.createElement('textarea');
      dInput.rows = 3;
      dInput.value = descEl.textContent;
      dInput.maxLength = 300;

      // hide static nodes and insert inputs
      titleEl.style.display = 'none';
      descEl.style.display = 'none';
      node.querySelector('.task-texts').prepend(dInput);
      node.querySelector('.task-texts').prepend(tInput);

      editBtn.textContent = 'Save';

      // focus title
      tInput.focus();

      // Save handler when clicking Save
      const saveHandler = () => {
        const newTitle = tInput.value.trim() || 'Untitled task';
        const newDesc = dInput.value.trim();
        titleEl.textContent = newTitle;
        descEl.textContent = newDesc;
        // cleanup inputs
        tInput.remove();
        dInput.remove();
        titleEl.style.display = '';
        descEl.style.display = '';
        node.classList.remove('editing');
        editBtn.textContent = 'Edit';

        // remove this listener to avoid duplicates
        editBtn.removeEventListener('click', saveHandler);
      };

      // Replace click listener with saveHandler
      editBtn.removeEventListener('click', arguments.callee);
      editBtn.addEventListener('click', saveHandler);

    } else {
      // should not reach here because saveHandler handles toggling back
      node.classList.remove('editing');
      editBtn.textContent = 'Edit';
    }
  });

  return node;
}

addBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  if(!title){
    alert('Please enter a task title.');
    titleInput.focus();
    return;
  }
  const taskNode = createTaskElement(title, desc);
  taskList.prepend(taskNode);
  // reset form
  titleInput.value = '';
  descInput.value = '';
  titleInput.focus();
});

// Allow Enter to add when focus is on title input
titleInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    addBtn.click();
  }
});
