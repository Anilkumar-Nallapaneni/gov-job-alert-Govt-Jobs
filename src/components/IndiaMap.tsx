import { IndiaMap } from './IndiaMap/IndiaMap';

// Thin stable re-export to avoid duplicate implementations and missing-type imports.
// Other parts of the app should import from 'src/components/IndiaMap' and get the folder implementation.
export { IndiaMap };
