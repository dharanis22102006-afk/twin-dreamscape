import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";

export default function useCameraFly() {
  const { camera, controls } = useThree(); // if using OrbitControls from drei

  function flyTo(targetPos = [0,0,0], camPos = [0,2,5], onComplete) {
    gsap.to(camera.position, {
      x: camPos[0], y: camPos[1], z: camPos[2], duration: 1.6, ease: "power2.inOut",
      onUpdate: () => camera.lookAt(...targetPos),
      onComplete: onComplete
    });
  }

  return { flyTo };
}
