const express = require("express");
const { Voice } = require("@fonoster/sdk");

const app = express();
app.use(express.json());

// Correct way to initialize the Voice API
const voice = new Voice({
  endpoint: process.env.FONOS_ENDPOINT || "localhost:51901" 
});

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

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Voice App is running.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
