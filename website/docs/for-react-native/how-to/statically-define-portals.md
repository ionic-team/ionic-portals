---
title: Static Portals Configuration File
sidebar_label: Statically Register Portals
---

An additional configuration method is now included to support a JSON configuration file to configure Portals on application start. The JSON file must be named `portals.config.json` and be placed in the application root on iOS and `assets` root on Android.

## JSON Schema

This Typescript schema is for illustration purposes only.

```typescript
type PortalConfig = {
  // The name of the public key file for secure live updates. If secure 
  // live updates are not being used, this field is not needed.
  // Must be located in the Bundle.main root on iOS and assets root on Android.
  liveUpdatesKey?: string;
  // The portals registration key normally passed to `register`.
  // This can be omitted if the `register` function is called before
  // attempting to render any portals in code.
  registrationKey?: string; 
}
```

### Example Configuration

```json title=portals.config.json
{
  "registrationKey": "YOUR_PORTALS_KEY",
}
```

