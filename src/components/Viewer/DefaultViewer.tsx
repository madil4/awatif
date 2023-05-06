import { Viewer } from "./Viewer";
import { Grid } from "./objects/Grid";

export function DefaultViewer() {
  return (
    <Viewer>
      <Grid />
    </Viewer>
  );
}
