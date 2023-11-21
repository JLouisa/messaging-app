const snippets = {
  ping: `<div id="parent-div">
        <button hx-post="/clicked-pong" hx-trigger="click" hx-target="#parent-div" hx-swap="outerHTML">
          Ping!
        </button>`,
  pong: `<div id="parent-div">
        <button hx-post="/clicked-ping" hx-trigger="click" hx-target="#parent-div" hx-swap="outerHTML">
          Pong!
        </button>`,
};

module.exports = snippets;
