"use client";

import {
  fallbackShader,
  postProcessingEffects,
} from "@/config/postProcessingEffects";
import { RadioGroup, Radio } from "@heroui/radio";
import LennaImage from "@/components/lennaImage";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [shaderType, setShader] = useState("none");
  const [uniforms, setUniforms] = useState<Record<string, any>>();

  const selectedEffect = postProcessingEffects.find((e) => e.id === shaderType);
  const fragmentShader = selectedEffect?.shader ?? fallbackShader;

  useEffect(() => {
    setUniforms(selectedEffect?.uniforms || {});
  }, [selectedEffect]);

  const setChangedUniform = (key: string, value: any) => {
    setUniforms((prev) => ({
      ...prev,
      [key]: { value },
    }));
  };

  return (
    <div className="flex flex-col p-4 md:flex-row w-full">
      <div className="w-full md:w-1/2 mr-4">
        <RadioGroup
          onChange={(radioBtn) => setShader(radioBtn.target.value)}
          value={shaderType}
        >
          {postProcessingEffects.map((effect) => (
            <React.Fragment key={effect.id}>
              <Radio value={effect.id}>{effect.radioButtonLabel}</Radio>
              {shaderType === effect.id && effect.settingsPanel &&
               <effect.settingsPanel uniforms={uniforms} setUniform={setChangedUniform}/>}
            </React.Fragment>
          ))}
        </RadioGroup>
      </div>
      <div className="w-1/2 flex flex-col items-center min-h-[512px] min-w-[512px]">
        <div className="w-[512px] h-[512px]">
          <Canvas orthographic camera={{ position: [0, 0, 1] }}>
            <LennaImage
              selectedShader={fragmentShader}
              uniforms={uniforms}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
