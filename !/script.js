const REDIRECT_URL = window.origin;

function getRedirectUrl() {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const redirectUrl = queryParams.get('r') ?? REDIRECT_URL;

  return redirectUrl;
}

function redirect() {
  const redirectUrl = getRedirectUrl();
  if (!!redirectUrl) {
    return window.location.replace(redirectUrl);
  }

  return false;
}

function showMessage() {
  setTimeout(() => {
    setMessage('If you are not redirected automatically,\nplease click the button below.');

    const buttonElement = document.getElementById('redirect-button');
    buttonElement.classList.add('visible');

    const linkElement = document.getElementById('link');
    linkElement.classList.add('hide');
  }, 2000);
}

function setMessage(messageText, linkText) {
  if (messageText !== undefined) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = messageText;
  }

  if (linkText !== undefined) {
    const linkElement = document.getElementById('link')
    linkElement.textContent = linkText;
  }
}

function init() {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message');

  const messageElement = document.createElement('h2');
  messageElement.setAttribute('id', 'message');
  messageContainer.appendChild(messageElement);

  const linkElement = document.createElement('p');
  linkElement.setAttribute('id', 'link');
  messageContainer.appendChild(linkElement);

  const buttonRedirectElement = document.createElement('button');
  buttonRedirectElement.setAttribute('id', 'redirect-button');
  buttonRedirectElement.classList.add('button');
  buttonRedirectElement.textContent = 'Go';
  buttonRedirectElement.addEventListener('click', redirect);

  const mainElement = document.createElement('main');
  mainElement.appendChild(messageContainer);
  mainElement.appendChild(buttonRedirectElement);

  document.body.appendChild(mainElement);
}

document.addEventListener('DOMContentLoaded', function () {
  init();
  setMessage('Redirecting...', getRedirectUrl());

  setTimeout(() => {
    if (!redirect()) {
      showMessage();
    }
  }, (1000));
})
