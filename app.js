const express = require("express");
const { Voice } = require("@fonoster/sdk");

const app = express();
app.use(express.json());

// In the new SDK, you create a Voice instance this way
const voice = new Voice();

// The listen function remains the same
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

// Health check endpoint for Render
app.get("/", (req, res) => {
  res.send("Voice App is running.");
});

// We need to use the PORT environment variable provided by Render
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
