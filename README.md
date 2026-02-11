# Terminal API Backend

Real shell access via WebSocket for AI agents and automation.

## Features

✅ **Real bash/shell access** via WebSocket  
✅ **Python 3 + pip** pre-installed  
✅ **Node.js + npm** included  
✅ **Git, curl, wget** for cloning repos and downloading files  
✅ **unzip/zip** for extracting projects  
✅ **vim/nano** for file editing  
✅ **Build tools** (gcc, make, etc.) for compiling code  

## What You Can Do

- Extract and run multi-file projects from zip archives
- Deploy Python scripts (including OCR with pytesseract)
- Test Telegram bots temporarily
- Run Node.js applications
- Clone GitHub repos and work on them
- Install packages with pip/npm
- All standard shell commands (ls, cd, cat, grep, etc.)

## API Endpoints

### Health Check
```bash
GET /health
```
Returns server status and platform info.

### Terminal WebSocket
```
ws://your-domain/
```
Connect via WebSocket to get a real shell.

## Usage Example

### Frontend (HTML + xterm.js)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css" />
</head>
<body>
  <div id="terminal"></div>
  <script src="https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.js"></script>
  <script>
    const term = new Terminal();
    term.open(document.getElementById('terminal'));
    
    const ws = new WebSocket('wss://your-app.onrender.com');
    
    term.onData(data => ws.send(data));
    ws.onmessage = (event) => term.write(event.data);
  </script>
</body>
</html>
```

## Deploy on Render

1. Fork this repo
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Create new **Web Service**
4. Connect your GitHub repo
5. Render will auto-detect Dockerfile
6. Deploy!

## Environment

- **Node.js**: 18+
- **Python**: 3.x
- **Shell**: bash (Linux)

## License

MIT
