import { useState } from "react";
import styled from "styled-components";
import TextureGenerator from "./components/TextureGenerator";
import TextureControls from "./components/TextureControls";
import { TextureSettings, texturePresets } from "./types/texture";

const AppContainer = styled.div`
	display: flex;
	height: 100vh;
	background-color: #1a1a1a;
	color: #ffffff;
`;

const Sidebar = styled.div`
	width: 300px;
	padding: 20px;
	background-color: #2a2a2a;
	border-right: 1px solid #3a3a3a;
	overflow-y: auto;
`;

const MainContent = styled.div`
	flex: 1;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
`;

export type TextureSize = 16 | 32 | 64 | 128 | 256 | 512;

function App() {
	const [textureSettings, setTextureSettings] = useState<TextureSettings>({
		type: "noise",
		scale: 1,
		color1: "#ffffff",
		color2: "#000000",
		noiseIntensity: 0.5,
		patternType: "dots",
		size: 128,
		hasBorder: false,
		borderColor: "#000000",
		borderWidth: 1,
	});

	return (
		<AppContainer>
			<Sidebar>
				<h1>Gerador de Texturas</h1>
				<TextureControls
					settings={textureSettings}
					onSettingsChange={setTextureSettings}
					presets={texturePresets}
				/>
			</Sidebar>
			<MainContent>
				<TextureGenerator settings={textureSettings} />
			</MainContent>
		</AppContainer>
	);
}

export default App;
