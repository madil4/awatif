import { A } from "@solidjs/router";
import { Show } from "solid-js";

export default function InteractStructure(props: any) {
  const title = "How to interact with your structure";
  const slug = "how-to-interact-with-your-structure";

  return (
    <article>
      <h2 class="text-2xl mb-5">
        <Show when={props.showLink} fallback={title}>
          <A href={`/blog/${slug}`}>{title}</A>
        </Show>
      </h2>

      <img src={`../blog/${slug}.gif`} class="mb-5" />

      <p class="mb-5">
        There are multiple ways to interact with physics simulations, the choice
        of the method depends strongly on the simulation type if it is fluid or
        solid. For my case which is deformable solids, there are two common
        approaches: displacement-control or force-control interaction. In the
        case of displacement control the positions of the nodes are directly
        changed according to the mouse location, whereas in the force-control, a
        force is applied instead. I prefer the force-control method because it
        allows me to attached a spring force with a user-defined stiffness
        coefficient. This coefficient gives me control over how smooth or strong
        the movement is. With force-control interaction, I can achieve soft
        movements that wouldn't be possible with the displacement method.
      </p>

      <p class="mb-5">
        Side note: I have used triangular finite-elements or membrane elements
        for this example.
      </p>
    </article>
  );
}
