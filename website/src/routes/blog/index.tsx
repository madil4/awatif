import Awatif3D from "./awatif-engine-has-gone-3d";
import InteractStructure from "./how-to-interact-with-your-structure";
import NonlinearFEM from "./linear-fem-vs-non-linear-fem";
import NewWebsite from "./new-website-for-awatif-engine";
import InteractiveSimulation from "./the-first-step-toward-interactive-simulation";
import SimulationExplode from "./when-simulations-explode";

export default function Index() {
  return (
    <div class="flex flex-col space-y-5">
      <Awatif3D showLink={true}></Awatif3D>
      <InteractStructure showLink={true}></InteractStructure>
      <NewWebsite showLink={true}></NewWebsite>
      <NonlinearFEM showLink={true}></NonlinearFEM>
      <SimulationExplode showLink={true}></SimulationExplode>
      <InteractiveSimulation showLink={true}></InteractiveSimulation>
    </div>
  );
}
