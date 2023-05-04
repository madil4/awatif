export const HomeLower = () => {
  return (
    <section class="flex flex-col space-y-10 mb-10 md:flex-row md:justify-between md:items-start md:space-y-0 md:space-x-20">
      <div class="md:w-1/3">
        <h3 class="text-2xl mb-3">Features</h3>
        <ul class="space-y-2">
          <li>🎨 Easy to use user-interface</li>
          <li>🌐 Design and simulate from any browser</li>
          <li>🧱 Create complex designs with parametric modeling</li>
          <li>📈 Supports static, dynamic, and non-linear simulations</li>
        </ul>
      </div>
      <div class="md:w-1/3">
        <h3 class="text-2xl mb-3">Team</h3>
        <div class="flex flex-col space-y-4">
          <div class="flex flex-row items-center">
            <img
              class="w-20 h-20 rounded-full"
              src="/mohamed-adil.jpg"
              alt="Mohamed Adil"
            />
            <div class="ml-5">
              <h4 class="text-xl">Mohamed Adil - Founder</h4>
              <p class="text-sm">
                Structural engineer and software developer passionate about
                optimizing the structural design process.
              </p>
              <a
                class="text-sm font-medium"
                href="https://www.linkedin.com/in/madil4/"
                target="_blank"
              >
                Linkedin
              </a>
            </div>
          </div>
          <div class="flex flex-row items-center">
            <img
              class="w-20 h-20 rounded-full"
              src="/empty-profile.jpg"
              alt="Mohamed Adil"
            />
            <div class="ml-5">
              <h4 class="text-xl">Join our team!</h4>
              <p class="text-sm">
                I am seeking enthusiastic software developers and structural
                engineers. Just send me a message
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-1/3">
        <h3 class="text-2xl mb-3">Links</h3>
        <ul class="space-y-2">
          <li>
            <a href="https://github.com/madil4/awatif" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://app.slack.com/client/T047EBMMPD5/" target="_blank">
              Slack
            </a>
          </li>
          <li>
            <a
              href="https://mohamedadil.us19.list-manage.com/subscribe?u=80eec59eb329b1c9c00258524&id=95cfe71596"
              target="_blank"
            >
              Newsletter
            </a>
          </li>
          <li>
            <a href="mailto:mohamed@awatif.co" target="_blank">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
