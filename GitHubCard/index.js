
const cards = document.querySelector('.cards');

axios.get('https://api.github.com/users/ardissam0')
.then(response => {
  console.log(response.data);
  const card = createComponent(response.data);
  cards.append(card);
})
  .catch(err => {
  console.log(err);
});

function createComponent(gitUser) {
  const card = document.createElement('div');
  const img = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  cards.append(card);
  card.append(img, cardInfo);
  cardInfo.append(name, username, location, profile, followers, following, bio);

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');

  img.src = gitUser.avatar_url;
  name.textContent = gitUser.name;
  username.textContent = gitUser.login;
  location.textContent = `location: ${gitUser.location}`;
  profile.innerHTML = `Profile: <a href="${gitUser.html_url}">${gitUser.html_url}</a>`;
  followers.textContent = `Followers: ${gitUser.followers}`;
  following.textContent = `Following: ${gitUser.following}`;
  bio.textContent = `Bio: ${gitUser.bio}`;

return card;
};

const followersArray = [];

axios.get('https://api.github.com/users/ardissam0/followers')
.then(response => {
  console.log(response.data);
  response.data.forEach(item => {
    followersArray.push(item.url)
    })
  followersArray.forEach(item => {
      axios.get(item)
      .then(response => {
        cards.appendChild(createComponent(response.data));
      })
    });
  });

  console.log(followersArray);
