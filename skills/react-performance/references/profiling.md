# Profiling

Profiling should produce before-and-after evidence tied to a specific user scenario. A performance change is not proven until the same scenario improves under comparable conditions.

## React DevTools Profiler

- Profile the exact interaction: opening a dialog, typing in a field, filtering, changing routes, selecting rows, or submitting a form.
- Look for components with high render duration, frequent renders, or renders caused by unrelated state.
- Check why components rendered when the tooling supports it.
- Inspect context providers, memo boundaries, unstable callbacks, derived arrays, and object props.
- Validate that memoization reduces real render work and does not hide stale data bugs.

## Browser Performance Trace

- Capture CPU throttling when the target device class is slower than the development machine.
- Identify long tasks, scripting time, rendering time, painting, forced reflow, layout shifts, and input delay.
- Correlate user interactions with main-thread work.
- Inspect hydration, route transitions, image decode, font load, and third-party scripts.

## Network Waterfall

- Find blocking dependency chains: HTML to CSS to JS to data to image.
- Check request priority, caching, compression, payload size, and duplicate requests.
- Compare cold load, warm cache, slow network, and authenticated states when relevant.
- Look for data waterfalls caused by nested components starting requests after render.

## Evidence To Keep

- Scenario name, route, device profile, viewport, network profile, data size, and test account or fixture.
- Baseline numbers and after numbers.
- Trace, screenshot, profiler export, bundle report, or terminal output when available.
- Remaining risk if local measurements cannot match production.
