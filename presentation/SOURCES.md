# Source notes

## Primary brief

- The four-page take-home assessment supplied for this project (read 19 October 2026). This defines the requested manager mobile scenario and deliverables.

## Current product context (checked 19 October 2026)

- [Geotab Support: Video events](https://support.geotab.com/help/mygeotab/cameras-and-video-recordings/coaching-and-video-events/video-events) documents Events, Cameras, filters, high-magnitude and repeat-offender views, event previews, and dismiss/restore behavior in **MyGeotab**. It is context, not proof of the manager mobile UI in the assessment.
- [Geotab: Driver coaching](https://www.geotab.com/fleet-management-solutions/driver-coaching/) describes event severity, critical moments, coaching, and the separate **Geotab Video Driver App**. Product copy should be treated as vendor claims rather than independently tested performance.
- [Geotab Support: Video coaching guide](https://support.geotab.com/camera-devices/doc/video-coaching-go-focus) describes permissions and driver identification dependencies. These matter when choosing what a manager can see or act on, but the assessment does not ask for a permission system.

## Research to do only if needed

Look for one or two documented operational workflows that clarify triage, confidence, offline/slow video, or trends. Capture the pattern and the design implication; do not copy a competitor screen or add a benchmark slide for its own sake.

## Focused competitor examples (checked 19 October 2026)

- [Motive Fleet App: Safety](https://helpcenter.gomotive.com/hc/en-us/articles/30913088528029-Safety) has current mobile screenshots of its safety overview, recent event list, driver/behavior/severity/status filters, event details, and coachable action. We visually inspected the overview, recent-event list, and driver filter. **Pattern to examine:** how quickly a manager moves from a fleet summary to a specific event. This is a competitor example, not evidence that its hierarchy is best.
- [Samsara Safety Inbox](https://www.samsara.com/blog/safety-inbox-faster-easier-management-of-safety-incidents) describes review, follow-up, and dismissal of flagged events. Its public example is older and should inform workflow questions, not current visual treatment. The hard-braking example illustrates why a detected event needs context before the manager judges driver behavior.
- [Samsara Fleet App overview](https://kb.samsara.com/hc/en-us/articles/360051810191-Step-3-Download-Samsara-Apps) confirms a manager-facing mobile app includes a fleet map, vehicle/driver details, and Safety Inbox alerts. Public screenshots of that workflow are limited; do not infer its present UI from the text.

## Mobile benchmark canvas (checked 20 October 2026)

- [Annotated HTML canvas](mobile-benchmark/index.html) and [four-page PDF summary](mobile-benchmark/mobile-benchmark-summary.pdf) compare manager-mobile examples by Home, Cameras, Events, and Drivers, with specific screen observations and clearly marked evidence gaps.
- [Product-grouped version 2](mobile-benchmark/product-flow-v2.html) is a six-slide skim review of Motive and Samsara, with concise + / − findings beside the relevant phone screens. The presentation uses selected screenshots from this review.
- Motive's [Fleet View](https://helpcenter.gomotive.com/hc/en-us/articles/30860908206493-Fleet-View) article explicitly calls it the Fleet App's default home screen. Its [Safety](https://helpcenter.gomotive.com/hc/en-us/articles/30913088528029-Safety) article provides the safety and event flow. Original yellow callouts remain in the screenshots.
- Samsara's [Fleet App page](https://www.samsara.com/fr-ca/fleet/mobile-app) supplies public manager-facing map and vehicle images. Its [Fleet App listing](https://apps.apple.com/us/app/samsara-fleet/id1460639044) supplies promotional Safety Inbox and road/cabin video screens. Those promotional images may not reflect the latest UI, so they support layout observations only.
- Lytx's [privacy and security page](https://www.lytx.com/about-us/privacy-and-security) and [global fleets page](https://www.lytx.com/global-fleets) were reviewed but excluded from the visual canvas: the manager-phone areas are too small to support reliable design findings.
- We did not verify public manager-mobile driver-list/trend screens for Samsara, camera-offline states, or the latest authenticated UI of either product. Design observations are visual interpretations, not measured task times.

## Version 2 additional references (checked 20 October 2026)

- [Motive Safety](https://helpcenter.gomotive.com/hc/en-us/articles/30913088528029-Safety): the Safety preview shows a thumbnail, event type, and driver; the full Events list adds risk and time. The detail screenshot shows a Critical badge, Pending Review control, and playback. The help article says to tap View all before applying driver, behavior, severity, or status filters. These are distinct screen states.
- [Motive Fleet View](https://helpcenter.gomotive.com/hc/en-us/articles/30860908206493-Fleet-View): the camera screen shows two recent still images marked 10 minutes old and a Refresh button. The article says Refresh updates images or Start Live Stream can be used if available; this screenshot does not show camera health or prove that video automatically loads.
- [Samsara Fleet App](https://www.samsara.com/fr-ca/fleet/mobile-app): public map and vehicle-detail images show search and a filter icon, plus vehicle ID, speed, driver, address, and Diagnostics. We found no verified manager-phone screenshot of its vehicle list, opened filter controls, camera list, or camera health. Those gaps are labelled in version 2.
- [Samsara Fleet App Store listing](https://apps.apple.com/us/app/samsara-fleet/id1460639044): promotional phone images show Alerts, Safety Inbox, and road/cabin footage. Screenshot age is unverified; do not treat them as proof of the current interface.
