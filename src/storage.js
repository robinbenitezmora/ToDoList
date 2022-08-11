export const storage = (task) => {
  localStorage.setItem('task', JSON.stringify(task));
};

