import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Bunny = ({ isMobile }) => {
  const bunny = useGLTF("./cute_cartoon_bunny/scene.gltf");
  const bunnyRef = useRef();

  // Animate the bunny to jump automatically on every frame
  useFrame(({ clock }) => {
    if (bunnyRef.current) {
      const t = clock.getElapsedTime();
      const amplitude = 0.75; // Height of the jump
      const frequency = 2;    // Speed of the jump
      bunnyRef.current.position.y = -1 + Math.abs(Math.sin(t * frequency)) * amplitude;
    }
  });

  return (
    <group ref={bunnyRef}>
      <hemisphereLight intensity={1} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={bunny.scene}
        scale={isMobile ? 1 : 1.5}
        rotation={[0, 1.25, 0]}
        position={[0, -0.75, 0]}
      />
    </group>
  );
};

const BunnyCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Bunny isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BunnyCanvas;


