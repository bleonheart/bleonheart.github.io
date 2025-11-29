# Changelog

### Version 1.6

- Added new taser weapon (lia_taser) with deployable taser prong entity
- Added lia_taserprong entity for taser projectile mechanics
- Major config expansion with enhanced police equipment options
- Standardized entity/weapon naming to lia_ prefix (lia_policecomputer, lia_policelocker, lia_finebook, lia_nightstick)
- Library improvements for client and server police operations
- Hook updates for improved police system integration

### Version 1.5

- Major code cleanup: removed comments from client and server libraries for cleaner code
- Enhanced module structure and code organization
- Improved error handling and logging throughout the police system
- Code optimizations and compatibility improvements

### Version 1.4

- Complete overhaul of police computer system with async database queries and pagination
- Removed alarm system (alarm sounds, visual alarms, ECM jammer blocking functionality)
- Removed 999 emergency call system
- Removed separate netcalls files (consolidated into libraries)
- Panic button renamed to "Request Backup" with simplified interface
- Added MODULE.Privileges system for admin bypasses (bypassPoliceFaction, bypassPolicePromotion)
- Added police quiz system with question randomization and scoring
- Added police roster system showing online/offline officers with ranks
- Added dispatcher system for help requests with pagination
- Enhanced criminal record viewing with character ID lookup
- Improved error handling and logging for police computer operations
- Added weapon selling functionality with distance and validation checks
- Updated module metadata (discord format standardized to "@liliaplayer", removed WebSounds)
- Removed alarm-related network strings and workshop content
- Updated getLegalArrestReasons() to use crimes table structure
- Comment cleanup in client and server libraries

### Version 1.3

- Comment cleanup in client and server libraries for cleaner code
- Added comprehensive config, hooks, and libraries documentation
- Code optimizations and improvements
- Enhanced compatibility with recent game updates

### Version 1.2

- **Breaking Change**: Additional function name standardization to lowercase
  - Various internal function names standardized

### Version 1.1

- **Breaking Change**: Standardized function names to camelCase
  - `PlayAlarm()` → `playAlarm()`
  - `TriggerVisualAlarm()` → `triggerVisualAlarm()`
  - `StopVisualAlarm()` → `stopVisualAlarm()`

### Version 1.0

- Initial Release

