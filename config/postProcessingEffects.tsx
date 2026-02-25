import vertex from "../shaders/post-processing/plainTexture.vert";
import plainTexture from "../shaders/post-processing/plainTexture.frag";
import boxBlur from "../shaders/post-processing/boxBlur.frag";
import gaussianBlur from "../shaders/post-processing/gaussianBlur.frag";
import grayscale from "../shaders/post-processing/grayscale.frag";
import invert from "../shaders/post-processing/invert.frag";
import sepia from "../shaders/post-processing/sepia.frag";
import sharpenFilter from "../shaders/post-processing/sharpenFilter.frag";
import sobelFilter from "../shaders/post-processing/sobelFilter.frag";
import prewittOperator from "../shaders/post-processing/prewittOperator.frag";
import vignette from "../shaders/post-processing/vignette.frag";
import pixelateFilter from "../shaders/post-processing/pixelateFilter.frag";

import BoxBlurSettings from "@/components/shaderSettings/boxBlurSettings";
import GrayscaleSettings from "@/components/shaderSettings/grayscaleSettings";
import GaussianBlurSettings from "@/components/shaderSettings/gaussianBlurSettings";
import SepiaSettings from "@/components/shaderSettings/sepiaSettings";
import SharpenFilterSettings from "@/components/shaderSettings/sharpenFilterSettings";
import SobelFilterSettings from "@/components/shaderSettings/sobelFilterSettings";
import PrewittOperatorSettings from "@/components/shaderSettings/prewittOperatorSettings";
import VignetteSettings from "@/components/shaderSettings/vignetteSettings";
import PixelateFilterSettings from "@/components/shaderSettings/pixelateFilterSettings";

export type PostProcessingEffect = {
  id: string;
  radioButtonLabel: string;
  shader?: string;
  uniforms?: Record<string, any>;
  settingsPanel?: React.FC<{ uniforms: any; setUniform: (key: string, value: any) => void }>;
};

export const textureVertexShader = vertex;

export const fallbackShader = plainTexture;

export const postProcessingEffects: PostProcessingEffect[] = [
  {
    id: "none",
    radioButtonLabel: "No effect",
    shader: plainTexture,
  },
  {
    id: "boxBlur",
    radioButtonLabel: "Box Blur",
    shader: boxBlur,
    uniforms: {
      uIntensity: { value: 2.0 },
    },
    settingsPanel: BoxBlurSettings,
  },
  {
    id: "gaussianBlur",
    radioButtonLabel: "Gaussian Blur",
    shader: gaussianBlur,
    uniforms: {
      uIntensity: { value: 2.0 },
    },
    settingsPanel: GaussianBlurSettings,
  },
  {
    id: "grayscale",
    radioButtonLabel: "Grayscale",
    shader: grayscale,
    uniforms: {
      uIntensity: { value: 1.0 },
      uRgbWeights: { value: new Float32Array([0.2126, 0.7152, 0.0722]) },
    },
    settingsPanel: GrayscaleSettings,
  },
  {
    id: "invert",
    radioButtonLabel: "Invert",
    shader: invert,
  },
  {
    id: "sepia",
    radioButtonLabel: "Sepia",
    shader: sepia,
    uniforms: {
      uIntensity: { value: 1.0 },
    },
    settingsPanel: SepiaSettings,
  },
  {
    id: "sharpenFilter",
    radioButtonLabel: "Sharpen Filter",
    shader: sharpenFilter,
    uniforms: {
      uIntensity: { value: 1.0 },
    },
    settingsPanel: SharpenFilterSettings,
  },
  {
    id: "prewittOperator",
    radioButtonLabel: "Prewitt Operator",
    shader: prewittOperator,
    uniforms: {
      uIntensity: { value: 1.0 },
    },
    settingsPanel: PrewittOperatorSettings,
  },
  {
    id: "sobelFilter",
    radioButtonLabel: "Sobel Filter",
    shader: sobelFilter,
    uniforms: {
      uIntensity: { value: 1.0 },
    },
    settingsPanel: SobelFilterSettings,
  },
  {
    id: "vignette",
    radioButtonLabel: "Vignette",
    shader: vignette,
    uniforms: {
      uEdgeStart: { value: 0.7 },
      uEdgeEnd: { value: 0.0 },
      uIntensity: { value: 1.0 },
      uColor: { value: new Float32Array([0.0, 0.0, 0.0]) },
    },
    settingsPanel: VignetteSettings,
  },
  {
    id: "pixelateFilter",
    radioButtonLabel: "Pixelate Filter",
    shader: pixelateFilter,
    uniforms: {
      uPixelSize: { value: 10.0 },
      uIntensity: { value: 1.0 },
    },
    settingsPanel: PixelateFilterSettings,
  },
];
