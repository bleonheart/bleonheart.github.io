# Changelog

### Version 1.5

- **Authorship Update**: Standardized all author and contact information
  - MODULE.author = "Samael"
  - MODULE.discord = "liliaplayer" → "@liliaplayer"
  - Updated SWEP.Author to "Samael"
  - Added SWEP.Contact = "@liliaplayer" to radio weapon
  - Updated ENT.Author fields to "Samael"
  - Added ENT.Contact = "@liliaplayer" to static radio entity
- Code attribution consistency improvements

### Version 1.4

- Removed comments from Lua files for cleaner code
- Additional comment cleanup in client and shared libraries for cleaner code
- Added comprehensive hooks and libraries documentation
- Enhanced radio functionality and frequency management
- Improved encrypted frequency access controls
- Fixed minor bugs in radio communication system

### Version 1.3

- Code optimizations and improvements
- Enhanced compatibility with recent game updates

### Version 1.2

- **Breaking Change**: Additional function name standardization to lowercase
  - `GetPos():Distance()` → `GetPos():Distance()` (method call standardization)

### Version 1.1

- **Breaking Change**: Standardized function names to camelCase
  - `CanAccessEncryptedFrequency()` → `canAccessEncryptedFrequency()`
  - `IsVoiceViable()` → `isVoiceViable()`
  - `StartStaticMonitoring()` → `startStaticMonitoring()`
  - `StopStaticMonitoring()` → `stopStaticMonitoring()`
  - `GetItemWithDataKeyValue()` → `getItemWithDataKeyValue()`
  - `FindNearbyRadio()` → `findNearbyRadio()`

### Version 1.0

- Initial Release

