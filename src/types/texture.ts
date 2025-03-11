export type TextureSize = 16 | 32 | 64 | 128 | 256 | 512;

export type TextureSettings = {
	type: "noise" | "gradient" | "pattern";
	scale: number;
	color1: string;
	color2: string;
	noiseIntensity: number;
	patternType: "dots" | "lines" | "grid";
	size: TextureSize;
	hasBorder: boolean;
	borderColor: string;
	borderWidth: number;
};

export const texturePresets = {
	"Ruído Suave": {
		type: "noise",
		scale: 1,
		color1: "#4a4a4a",
		color2: "#2a2a2a",
		noiseIntensity: 0.3,
		patternType: "dots",
		size: 128,
		hasBorder: false,
		borderColor: "#000000",
		borderWidth: 1,
	},
	"Gradiente Sunset": {
		type: "gradient",
		scale: 1,
		color1: "#ff7e5f",
		color2: "#feb47b",
		noiseIntensity: 0.5,
		patternType: "dots",
		size: 128,
		hasBorder: false,
		borderColor: "#000000",
		borderWidth: 1,
	},
	"Grade Metálica": {
		type: "pattern",
		scale: 0.5,
		color1: "#303030",
		color2: "#505050",
		noiseIntensity: 0.5,
		patternType: "grid",
		size: 128,
		hasBorder: false,
		borderColor: "#000000",
		borderWidth: 1,
	},
	"Pontos Pixel": {
		type: "pattern",
		scale: 0.3,
		color1: "#000000",
		color2: "#ffffff",
		noiseIntensity: 0.5,
		patternType: "dots",
		size: 128,
		hasBorder: false,
		borderColor: "#000000",
		borderWidth: 1,
	},
} as const;
