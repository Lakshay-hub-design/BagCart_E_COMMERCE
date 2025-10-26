import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { motion } from "framer-motion";

function BagModel() {
  const { scene } = useGLTF("/models/bag.glb"); // 👈 place your 3D model in /public/models
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      // floating up and down
      ref.current.position.y = -0.5 + Math.sin(clock.getElapsedTime()) * 0.2;
      // optional slight rotation
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() / 2) * 0.3;
    }
  });
  return <primitive ref={ref} object={scene} scale={5.5} position={[0, 0, 0]} />;
}

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-blue-100 to-white relative overflow-hidden">
      {/* Left Text */}
      <motion.div
        className="md:w-1/2 text-center md:text-left px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-4">
          Discover Your Perfect Bag
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Premium quality, elegant design, and built for everyday adventure.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.7)" }}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg"
        >
          Shop Now →
        </motion.button>
      </motion.div>

      {/* Right 3D Model */}
      <div className="md:w-1/2 h-[400px] md:h-[600px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <BagModel />
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
          />
        </Canvas>
      </div>
    </section>
  );
};

export default HeroSection;
