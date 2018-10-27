module.exports = (requests = []) => `
<html>

<head>
    <meta charset="utf-8">
    <title>Save ur IP</title>
</head>
<style>
    body {
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    h1 {
        font-size: 42px;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .req {
        display: flex;
    }

    .req:nth-child(odd) {
        background-color: #fff3d4;
    }

    .ip {
        min-width: 140px;
        margin-right: 10px;
    }
    .date {
        min-width: 230px
    }
</style>

<body>
    <h1>🏠</h1>
    <div class="container">
        <div>
            ${requests
              .map(
                req =>
                  `<div class="req">
                <p>${req.toId}</p>
                <p class="ip">${req.ip}</p>
                <p class="date" data-time="true">${req.date.toJSON()}</p>
            </div>`
              )
              .join('')}
        <div>
    </div>
</body>
<script>
document
  .querySelectorAll('[data-time]')
  .forEach(e => (e.innerText = new Date(e.innerText).toLocaleString()));
</script>
</html>
`;
