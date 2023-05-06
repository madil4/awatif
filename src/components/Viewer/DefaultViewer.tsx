import { ParentProps, Show } from "solid-js";
import { Viewer } from "./Viewer";
import { Grid } from "./objects/Grid";

export function DefaultViewer(props: ParentProps) {
  return (
    <Viewer>
      <Grid />
      {props.children ? props.children : <></>}
    </Viewer>
  );
}
