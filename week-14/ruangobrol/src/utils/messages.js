function generateMessage(username, text) {
  return {
    username,
    text,
    // send ISO timestamp so client-side libs (moment) parse reliably
    time: new Date().toISOString(),
  };
}

function generateLocationMessage(username, url) {
  return {
    username,
    url,
    time: new Date().toISOString(),
  };
}

module.exports = { generateMessage, generateLocationMessage };
