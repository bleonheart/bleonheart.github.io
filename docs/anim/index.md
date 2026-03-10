# Advanced Bone Manipulation Animation

Advanced bone manipulation system that provides realistic roleplay animations through precise skeletal control. Utilizes ValveBiped bone structure to create natural-looking poses including surrender (hands-up), military salutes, crossed arms, attention stances, typing posture, and various gestures. Features automatic interruption on movement, jumping, weapon switching, or vehicle entry to maintain gameplay flow. Integrates with lia.playerinteract for seamless context menu access, supports timed animations with auto-deactivation, and includes comprehensive cleanup systems for map changes and character respawns. Server-authoritative with networked synchronization ensures all players see consistent animations across the multiplayer environment.

---

## Changelog

<details class="realm-shared no-icon">
  <summary>Version 1.1</summary>
  <div class="details-content" style="margin-left: 20px;">
    <ul>
      <li>Added smooth blend-in/blend-out transitions for animations</li>
      <li>Adjusted interruption logic (including crouch and lower movement threshold) and centralized animation updating</li>
      <li>Added additional gesture animations (e.g., Peace Sign, Thumbs Up/Down, Pew Pew, etc.)</li>
      <li>Added player interaction action to sequence/play all animations and ensured Stop Animation cancels active sequence</li>
    </ul>
  </div>
</details>

<details class="realm-shared no-icon">
  <summary>Version 1.0</summary>
  <div class="details-content" style="margin-left: 20px;">
    <ul>
      <li>Initial Release</li>
    </ul>
  </div>
</details>


---

## Video Demo

<video controls width="100%" style="width: 100%;">
  <source src="https://bleonheart.github.io/assets/anim.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
