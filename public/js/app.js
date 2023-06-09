const $username = document.getElementById('username');
const $email = document.getElementById('email');
const $password = document.getElementById('password');
const $passwordConfirm = document.getElementById('passwordConfirm');
const $submitBtn = document.getElementById('submitBtn');
const $loginsubmitBtn = document.getElementById('loginsubmitBtn');
const $postListEl = document.getElementById('fullList');
const $comment = document.getElementById('comment');
const $commentSubmitBtn = document.getElementById('commentSubmitBtn');

if ($commentSubmitBtn) {
  $commentSubmitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const content = $comment.value;
    const blogId = location.href.split('/').slice(-1)[0];
    
    if (!content) {
      return alert('Comment must be provided');
    }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content, blogId}),
      });
      const data = await response.json();
      if (data.message) {
        return alert(data.message);
      }
      location.reload();
    }
    catch (error) {
      console.log(error);
      alert(error);
    }
  });
}


if ($postListEl) {
  $postListEl.addEventListener('click', async (event) => {
    console.log(event.target.offsetParent.id);
    const blogId = event.target.offsetParent.id;
    location.href = `/blogs/${blogId}`;
  });
}

if ($loginsubmitBtn) {
$loginsubmitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const username = $username.value;
  const password = $password.value;

  if (!username || !password) {
    return alert('Username and password must be provided');
  }

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
    });
    const data = await response.json();
    if (data.message) {
      return alert(data.message);
    } else {
      location.href = `/users/${data.id}`;
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
});
}


if ($submitBtn) {
$submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const username = $username.value;
  const email = $email.value;
  const password = $password.value;
  const passwordConfirm = $passwordConfirm.value;

  if (!username || !password || !email || !passwordConfirm) {
    return alert('Username, email and password must be provided');
  }

  if (password !== passwordConfirm) {
    return alert('Passwords must match');
  }

  try {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password, email}),
    });
    const data = await response.json();
    console.log(data);
    if (data.message) {
      return alert(data.message);
    }
    if (data.errors) {
      return alert(data.errors[0].message);
    }
    if (data.id) {
    location.href = `/users/${data.id}`;
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
});
}