// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { Navbar } from "./components/Navbar";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>
          Awatif - Online 3D parametric (algorithmic) structural engineering
          software
        </Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta
          name="description"
          content="Design and analyze trusses, frames, and beams with ease using our modern structural engineering software"
        />
        <Meta
          name="keywords"
          content="engineering, design, computational, fem, bim, parametric, structural, awatif"
        />
        <Meta name="author" content="Mohamed Adil" />
        <Meta name="robots" content="index, follow" />
      </Head>
      <Body class="container mx-auto px-4">
        <Suspense>
          <ErrorBoundary>
            <Navbar />
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
