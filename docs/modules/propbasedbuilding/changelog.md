# Changelog

### Version 1.6

- Code cleanup and structure improvements
- Enhanced prop validation and entity management
- Improved module compatibility and performance
- Documentation updates and code optimization

### Version 1.5

- Centralized prop definitions from individual item files into MODULE.Props table in libraries/shared.lua
- Removed individual prop item files (box, cabinet, chair, example, metalsheet, plant, redcouch, roundtable)
- Added comprehensive prop definitions system with 50+ prop types including furniture, barriers, crates, appliances, and decorative items
- Added new prop types: sofas, tables, chairs, dressers, beds, appliances (fridge, stove, sink, toilet, bathtub), barriers (wood, concrete, metal), fences, crates, barrels, generators, signs, benches, fountains, electronics, and more
- Propbreaker item validation with distance checks (250 unit limit) and enhanced entity validation
- Entity loading logic now checks for itemID data instead of relying solely on isConstruct flag
- Prop registration now handled automatically through InitializedModules() hook using centralized data

### Version 1.4

- Standardized all author and contact information
- MODULE.author = "Samael"
- MODULE.discord = "liliaplayer" → "@liliaplayer"
- Code attribution consistency improvements

### Version 1.3

- Updated module documentation

### Version 1.2

- Code optimizations and improvements
- Enhanced compatibility with recent game updates

### Version 1.1

- Function name standardization to lowercase
- Various internal function names standardized

### Version 1.0

- Initial Release

