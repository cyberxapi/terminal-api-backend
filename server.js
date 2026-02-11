const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const cors = require('cors');
const os = require('os');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', platform: os.platform(), arch: os.arch() });
});

// Terminal WebSocket endpoint
wss.on('connection', (ws) => {
  console.log('New terminal connection');
  
  // Create shell process
  const shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';
  const pty = spawn(shell, [], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env, TERM: 'xterm-256color' },
    cwd: process.env.HOME || process.cwd()
  });

  // Send shell output to WebSocket
  pty.stdout.on('data', (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data.toString());
    }
  });

  pty.stderr.on('data', (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data.toString());
    }
  });

  // Handle WebSocket input (send to shell)
  ws.on('message', (message) => {
    pty.stdin.write(message);
  });

  // Clean up on close
  ws.on('close', () => {
    console.log('Terminal connection closed');
    pty.kill();
  });

  pty.on('exit', (code) => {
    console.log('Shell exited with code:', code);
    ws.close();
  });

  // Send welcome message
  const welcomeMsg = `\r\n=== Terminal API Connected ===\r\nPlatform: ${os.platform()}\r\nNode: ${process.version}\r\nWorking directory: ${process.cwd()}\r\n\r\n`;
  ws.send(welcomeMsg);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Terminal API running on port ${PORT}`);
  console.log(`WebSocket: ws://localhost:${PORT}`);
});
