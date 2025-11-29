# Changelog

### Version 1.51

- Renamed chess admin tool to lia_chessadmintool for naming consistency

### Version 1.5

- Major database updates with enhanced chess game tracking (194+ line changes)
- Renamed chess board entities for consistency (ent_chess_board → lia_chess_board)
- Renamed draughts board entities for consistency (ent_draughts_board → lia_draughts_board)
- Updated chess admin tool with improved functionality
- Enhanced multiplayer chess and draughts systems
- Improved wagering and leaderboard mechanics

### Version 1.4

- Standardized all author and contact information
- MODULE.author = "Samael"
- MODULE.discord = "liliaplayer" → "@liliaplayer"
- Updated all ENT.Author fields to "Samael"
- Added ENT.Contact = "@liliaplayer" to chess board entities
- Updated SWEP.Author in chess admin tool to "Samael"
- Added SWEP.Contact = "@liliaplayer" to chess admin tool
- Code attribution consistency improvements

### Version 1.3

- Fixed missing newlines at end of files
- Updated module documentation
- Code optimizations and improvements
- Enhanced compatibility with recent game updates

### Version 1.2

- Additional function name standardization to lowercase
- Various internal function names standardized

### Version 1.1

- Standardized function names to camelCase
- `SetChessElo()` → `setChessElo()`
- `SetDraughtsElo()` → `setDraughtsElo()`
- `ExpectedChessWin()` → `expectedChessWin()`
- `ExpectedDraughtsWin()` → `expectedDraughtsWin()`
- `GetChessKFactor()` → `getChessKFactor()`
- `GetDraughtsKFactor()` → `getDraughtsKFactor()`
- `DoChessElo()` → `doChessElo()`
- `ChessWin()` → `chessWin()`
- `ChessDraw()` → `chessDraw()`
- `DoDraughtsElo()` → `doDraughtsElo()`
- `DraughtsWin()` → `draughtsWin()`
- `DraughtsDraw()` → `draughtsDraw()`
- `GetChessEloWithRecognition()` → `getChessEloWithRecognition()`
- `GetDraughtsEloWithRecognition()` → `getDraughtsEloWithRecognition()`

### Version 1.0

- Initial Release

