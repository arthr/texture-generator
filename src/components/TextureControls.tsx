import styled from "styled-components";
import { TextureSettings, TextureSize, texturePresets } from "../types/texture";

const Controls = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Control = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const Label = styled.label`
	font-size: 14px;
	color: #ccc;
`;

const Select = styled.select`
	padding: 8px;
	background-color: #3a3a3a;
	border: 1px solid #4a4a4a;
	color: white;
	border-radius: 4px;
`;

const Input = styled.input`
	padding: 8px;
	background-color: #3a3a3a;
	border: 1px solid #4a4a4a;
	color: white;
	border-radius: 4px;
`;

interface TextureControlsProps {
	settings: TextureSettings;
	onSettingsChange: (settings: TextureSettings) => void;
	presets: typeof texturePresets;
}

const TEXTURE_SIZES: TextureSize[] = [16, 32, 64, 128, 256, 512];

const TextureControls = ({
	settings,
	onSettingsChange,
	presets,
}: TextureControlsProps) => {
	const handleChange = (
		key: keyof TextureSettings,
		value: TextureSettings[keyof TextureSettings]
	) => {
		onSettingsChange({
			...settings,
			[key]: value,
		});
	};

	return (
		<Controls>
			<Control>
				<Label>Predefinições</Label>
				<Select
					onChange={(e) => {
						const preset =
							presets[e.target.value as keyof typeof presets];
						if (preset) {
							onSettingsChange(preset);
						}
					}}>
					<option value="">Personalizado</option>
					{Object.keys(presets).map((presetName) => (
						<option key={presetName} value={presetName}>
							{presetName}
						</option>
					))}
				</Select>
			</Control>

			<Control>
				<Label>Tamanho da Textura</Label>
				<Select
					value={settings.size}
					onChange={(e) =>
						handleChange("size", parseInt(e.target.value))
					}>
					{TEXTURE_SIZES.map((size) => (
						<option key={size} value={size}>
							{size}x{size}
						</option>
					))}
				</Select>
			</Control>

			<Control>
				<Label>Tipo de Textura</Label>
				<Select
					value={settings.type}
					onChange={(e) => handleChange("type", e.target.value)}>
					<option value="noise">Ruído</option>
					<option value="gradient">Gradiente</option>
					<option value="pattern">Padrão</option>
				</Select>
			</Control>

			<Control>
				<Label>Escala</Label>
				<Input
					type="range"
					min="0.1"
					max="2"
					step="0.1"
					value={settings.scale}
					onChange={(e) =>
						handleChange("scale", parseFloat(e.target.value))
					}
				/>
			</Control>

			<Control>
				<Label>Cor 1</Label>
				<Input
					type="color"
					value={settings.color1}
					onChange={(e) => handleChange("color1", e.target.value)}
				/>
			</Control>

			<Control>
				<Label>Cor 2</Label>
				<Input
					type="color"
					value={settings.color2}
					onChange={(e) => handleChange("color2", e.target.value)}
				/>
			</Control>

			{settings.type === "noise" && (
				<Control>
					<Label>Intensidade do Ruído</Label>
					<Input
						type="range"
						min="0"
						max="1"
						step="0.1"
						value={settings.noiseIntensity}
						onChange={(e) =>
							handleChange(
								"noiseIntensity",
								parseFloat(e.target.value)
							)
						}
					/>
				</Control>
			)}

			{settings.type === "pattern" && (
				<Control>
					<Label>Tipo de Padrão</Label>
					<Select
						value={settings.patternType}
						onChange={(e) =>
							handleChange("patternType", e.target.value)
						}>
						<option value="dots">Pontos</option>
						<option value="lines">Linhas</option>
						<option value="grid">Grade</option>
					</Select>
				</Control>
			)}
		</Controls>
	);
};

export default TextureControls;
