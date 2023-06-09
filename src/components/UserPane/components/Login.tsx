type LoginProps = {
  onGoogleClick: () => void;
  onAzureClick: () => void;
};

export function Login(props: LoginProps) {
  return (
    <>
      <p>Sign in to your account</p>
      <button
        class="btn btn-block btn-neutral mt-2"
        onclick={props.onGoogleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="h-4 w-4"
          viewBox="0 0 256 256"
        >
          <path d="M128,228A100,100,0,1,1,198.71069,57.28906,12.0001,12.0001,0,1,1,181.74,74.25977,75.99547,75.99547,0,1,0,203.05371,140H128a12,12,0,0,1,0-24h88a12,12,0,0,1,12,12A100.11332,100.11332,0,0,1,128,228Z" />
        </svg>
        Continue with Google
      </button>
      <button class="btn btn-block btn-neutral" onclick={props.onAzureClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="h-4 w-4"
          viewBox="0 0 512 512"
        >
          <path d="M31.87,30.58H244.7V243.39H31.87Z" />
          <path d="M266.89,30.58H479.7V243.39H266.89Z" />
          <path d="M31.87,265.61H244.7v212.8H31.87Z" />
          <path d="M266.89,265.61H479.7v212.8H266.89Z" />
        </svg>
        Continue with Microsoft
      </button>
    </>
  );
}
