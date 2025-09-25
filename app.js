const express = require("express");
const { VoiceServer } = require("@fonoster/sdk");

const app = express();
app.use(express.json());

const voice = new VoiceServer();

voice.listen(async (req, res) => {
  const retellAgentId = process.env.RETELL_AGENT_ID;

  if (!retellAgentId) {
    console.error("FATAL: RETELL_AGENT_ID environment variable is not set!");
    return res.hangup();
  }

  console.log(`Bridging call to Retell Agent: ${retellAgentId}`);
  
  await res.dial({
    endpoint: `sip:${retellAgentId}@beta.voice.retellai.com`
  });
});

// This is just a health check endpoint for Render
app.get("/", (req, res) => {
  res.send("Voice App is running.");
});

app.listen(3000, () => console.log("Server is running on port 3000!"));
