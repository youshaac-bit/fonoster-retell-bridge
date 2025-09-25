const VoiceServer = require("@fonoster/voice").default;
const express = require("express");

// This is just a health check endpoint for Render
const app = express();
app.get("/", (req, res) => {
  res.send("Voice App is running.");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}!`));


// This is the main Fonoster application logic
new VoiceServer().listen(async (req, res) => {
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
