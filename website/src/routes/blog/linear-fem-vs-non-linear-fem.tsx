import { A } from "@solidjs/router";
import { Show } from "solid-js";

export default function NonlinearFEM(props: any) {
  const title = "Linear FEM vs Non-Linear FEM";
  const slug = "linear-fem-vs-non-linear-fem";

  return (
    <article>
      <h2 class="text-2xl mb-5">
        <Show when={props.showLink} fallback={title}>
          <A href={`/blog/${slug}`}>{title}</A>
        </Show>
      </h2>

      <img src={`../blog/${slug}-1.gif`} class="mb-5" />

      <p class="mb-5">
        The linear elasticity material model is great for structures with small
        deformations such as stiff bridges and buildings. However, as soon as
        the deformations increase it gives inaccurate misleading results. There
        are many methods and techniques to solve this problem but fundamentally
        speaking there are two approaches. First, by extracting the rotation
        part from the deformation gradient (a tool to measure deformation) using
        polar decomposition. Second, by eliminating the rotation part by
        multiplying the deformation gradient by itself (known as Green tensor).
        Both approaches are problematic when using an implicit time integration
        because they result in non-linear systems of equations that have to be
        solved both efficiently and most importantly robustly, which is a
        challenging task.
      </p>

      <img src={`../blog/${slug}-2.gif`} class="mb-5" />
      <img src={`../blog/${slug}-3.gif`} class="mb-5" />

      <p class="mb-5">
        In these examples, I used the polar decomposition approach with explicit
        time-integration to avoid the complexity of computing the force
        derivatives and solving non-linear systems. In the future, when I have
        convincing proof of concept of the project that I'm working on, I will
        definitely use implicit integrator due to its great features that we
        talked about in the previous post.
      </p>
    </article>
  );
}
