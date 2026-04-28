"use client";
import Particles from "react-tsparticles";

export default function ParticlesBg() {
    return (
        <Particles
            className="absolute inset-0 -z-10"
            options={{
                background: { color: "#020617" },
                particles: {
                    number: { value: 80 },
                    size: { value: 2 },
                    move: { enable: true, speed: 0.3 },
                    opacity: { value: 0.3 }
                }
            }}
        />
    );
}