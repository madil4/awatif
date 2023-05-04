import { A } from "@solidjs/router";
import { Show } from "solid-js";

export default function Awatif3D(props: any) {
  const title = "Awatif has gone 3D";
  const slug = "awatif-engine-has-gone-3d";

  return (
    <article>
      <h2 class="text-2xl mb-5">
        <Show when={props.showLink} fallback={title}>
          <A href={`/blog/${slug}`}>{title}</A>
        </Show>
      </h2>

      <img src={`../blog/${slug}.gif`} class="mb-5" />

      <p class="mb-5">
        It's been a year since my last post, that is a lot! I have been going
        through some life events but now I’m back on track with more excitement
        than ever.
      </p>

      <p class="mb-5">
        As a structural engineer, most of the time it's sufficient to use 1D
        elements (beams) and 2D elements (shells), then why to bother with 3D?
        the real world is in 3D, we scale it down to one or two dimensions to
        simplify the problem so we can do calculations by hand or use fewer
        finite elements for computer calculation. However, this idealization
        comes with a caveat, it does introduce the concept of curvature (or
        bending), which is, in my opinion, not an easy concept to grasp, and it
        is adding an additional layer of complexity. In the 3D world, there is
        no such thing called curvature (at least in the traditional point of
        view), thus, there are no rotations as degrees of freedom and the
        mathematical equations are much simpler.
      </p>

      <p class="mb-5">
        Although I have simplified the algorithm to run structural analysis,
        rendering a 3D object is a hell of a task, I learned new techniques that
        I didn't intend to learn such as rasterization, perspective projections,
        and lighting. Big thanks to{" "}
        <a href="https://webglfundamentals.org/">webglfundamentals</a> for their
        simple and intuitive explanations of these techniques.
      </p>
    </article>
  );
}
