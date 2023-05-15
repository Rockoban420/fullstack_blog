const $todosubmitBtn = document.getElementById('todosubmitBtn');
const $logoutBtn = document.getElementById('logoutBtn');
const $todoInput = document.getElementById('todo');


$todosubmitBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  if ($todoInput.value.trim() === '') {
    return alert('Please enter a todo');
  }


  try {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({content: $todoInput.value}),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    location.reload();

  } catch (error) {
    console.log(error);
  }


});

if ($logoutBtn) {
  $logoutBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
      });
      const data = await response.json();
      location.href = '/login';
    } catch (error) {
      alert(error);
    }
  });
  }