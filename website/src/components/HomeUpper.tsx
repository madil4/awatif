export const HomeUpper = () => {
  return (
    <section class="flex flex-col items-center md:flex-row mb-10">
      <div class="md:w-1/2  md:pr-14">
        <h2 class="text-3xl mb-5">
          A New Online 3D parametric (algorithmic) structural engineering
          software
        </h2>
        <p class="mb-5">
          Design and analyze trusses, frames, and beams with ease using our
          modern structural engineering software
        </p>
      </div>
      <img
        class="md:w-1/2 rounded-md"
        src="../3d-truss-analysis.jpg"
        alt="3d truss analysis"
      />
    </section>
  );
};
