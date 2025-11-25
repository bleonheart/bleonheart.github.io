<h1 style="text-align:center; font-size:2rem; font-weight:bold;">About</h1>

Provides a recruiter NPC that allows players to join or resign from a list of configured jobs. Features dynamic dialog options based on player's current job status, per-faction NPC types, and easy configuration through faction definitions.

<h2 style="text-align:center; font-size:1.5rem; font-weight:bold;">Main Features</h2>

- **Per-Faction NPC Types** Each configured faction gets its own unique NPC type (e.g., "recruiternpc_police", "recruiternpc_medic")
- **Job Management** Players can join or resign from their specific faction through NPC interaction
- **Dynamic Dialog** Options automatically adjust based on player's current faction
- **Configurable Jobs** Easy to add or remove jobs from the available list
- **Three Options** 
  - Join [JOB NAME] Job - Available when player is not in that job
  - Resign from [JOB NAME] - Available when player is in that job
  - Goodbye - Always available to close the conversation

<h2 style="text-align:center; font-size:1.5rem; font-weight:bold;">Configuration</h2>

To make a faction available through the Recruiter NPC system, simply add `FACTION.isJob = true` to the faction definition file. The recruiternpc module will automatically detect all factions with `isJob = true` and create a dedicated NPC type for each one. Each faction will get its own NPC type with the ID format `recruiternpc_[faction_uniqueid]`.

**Example:**
```lua
FACTION.name = "Police Department"
FACTION.isJob = true  -- This faction will get a recruiter NPC
-- ... other faction properties
```

<br><br>

<p align="center">
  <video width="1200" style="max-width:100%; margin-bottom: 40px; margin-top: 20px;" controls>
    <source src="https://bleonheart.github.io/assets/RecruiterNPC.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

<br><br>