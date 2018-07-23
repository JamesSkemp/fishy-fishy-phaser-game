import * as phaser from "phaser";
import MainMenuScene from "./Scenes/MainMenuScene";
import Preloader from "./Scenes/Preloader";
import Boot from "./Scenes/Boot";
import MainGame from "./Scenes/MainGame";

const gameConfig: GameConfig = {
	width: 640,
	height: 480,
	type: Phaser.AUTO,
	parent: "content",
	title: "Fishy-Fishy"
};

export default class Game extends Phaser.Game {
	constructor(config: GameConfig) {
		console.log((new Date).toISOString() + ' : Entered Game constructor()');

		super(config);

		this.scene.add(Boot.Name, Boot);
		this.scene.add(Preloader.Name, Preloader);
		this.scene.add(MainMenuScene.Name, MainMenuScene);
		this.scene.add(MainGame.Name, MainGame);
		this.scene.start(Boot.Name);
	}
};

window.onload = () => {
	var game = new Game(gameConfig);
};