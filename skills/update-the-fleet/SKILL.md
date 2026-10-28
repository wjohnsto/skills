---
name: update-the-fleet
description: Use when asked to update all devices or update the fleet.
---

# Update the fleet

1. If `nixos-desktop` is not reachable, stop and report it. Do not continue.
2. Synchronize all Git repositories on each reachable device.
3. Run `make update` in the dotfiles repository on `nixos-desktop`.
4. Report whether each device needs a reboot.
5. Wait for instructions about a reboot. Do not reboot a device without an
   instruction.
