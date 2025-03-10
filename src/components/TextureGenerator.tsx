import { useEffect, useRef } from "react";
import * as THREE from "three";
import styled from "styled-components";
import { TextureSettings } from "../types/texture";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
`;

const CanvasContainer = styled.div`
	width: 512px;
	height: 512px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #2a2a2a;
	border-radius: 8px;
	padding: 20px;
`;

const Canvas = styled.canvas`
	max-width: 100%;
	max-height: 100%;
	image-rendering: pixelated;
	border: 1px solid #3a3a3a;
`;

const Button = styled.button`
	padding: 8px 16px;
	background-color: #4a4a4a;
	border: 1px solid #5a5a5a;
	color: white;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #5a5a5a;
	}
`;

interface TextureGeneratorProps {
	settings: TextureSettings;
}

const TextureGenerator = ({ settings }: TextureGeneratorProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = settings.size;
		canvas.height = settings.size;

		const generateNoise = () => {
			const imageData = ctx.createImageData(canvas.width, canvas.height);
			const data = imageData.data;

			for (let i = 0; i < data.length; i += 4) {
				const noise = Math.random() * settings.noiseIntensity;
				const color1 = new THREE.Color(settings.color1);
				const color2 = new THREE.Color(settings.color2);
				const mixedColor = new THREE.Color().lerpColors(
					color1,
					color2,
					noise
				);

				data[i] = mixedColor.r * 255;
				data[i + 1] = mixedColor.g * 255;
				data[i + 2] = mixedColor.b * 255;
				data[i + 3] = 255;
			}

			ctx.putImageData(imageData, 0, 0);
		};

		const generateGradient = () => {
			const gradient = ctx.createLinearGradient(
				0,
				0,
				canvas.width,
				canvas.height
			);
			gradient.addColorStop(0, settings.color1);
			gradient.addColorStop(1, settings.color2);

			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		};

		const generatePattern = () => {
			ctx.fillStyle = settings.color1;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = settings.color2;
			const size = (canvas.width / 16) * settings.scale;

			if (settings.patternType === "dots") {
				for (let x = 0; x < canvas.width; x += size * 2) {
					for (let y = 0; y < canvas.height; y += size * 2) {
						ctx.beginPath();
						ctx.arc(
							x + size / 2,
							y + size / 2,
							size / 2,
							0,
							Math.PI * 2
						);
						ctx.fill();
					}
				}
			} else if (settings.patternType === "lines") {
				for (let y = 0; y < canvas.height; y += size * 2) {
					ctx.fillRect(0, y, canvas.width, size);
				}
			} else if (settings.patternType === "grid") {
				for (let x = 0; x < canvas.width; x += size * 2) {
					ctx.fillRect(x, 0, size, canvas.height);
				}
				for (let y = 0; y < canvas.height; y += size * 2) {
					ctx.fillRect(0, y, canvas.width, size);
				}
			}
		};

		// Limpa o canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Gera a textura baseada no tipo selecionado
		switch (settings.type) {
			case "noise":
				generateNoise();
				break;
			case "gradient":
				generateGradient();
				break;
			case "pattern":
				generatePattern();
				break;
		}
	}, [settings]);

	const handleExport = () => {
		if (!canvasRef.current) return;

		const link = document.createElement("a");
		link.download = `texture-${settings.type}-${settings.size}x${settings.size}.png`;
		link.href = canvasRef.current.toDataURL("image/png");
		link.click();
	};

	return (
		<Container>
			<CanvasContainer>
				<Canvas ref={canvasRef} />
			</CanvasContainer>
			<Button onClick={handleExport}>Exportar Textura</Button>
		</Container>
	);
};

export default TextureGenerator;
