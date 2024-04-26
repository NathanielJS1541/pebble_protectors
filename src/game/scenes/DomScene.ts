import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import DomDeduction from './DomDeduction.vue';
import { createApp } from 'vue';

export class DomScene extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    searchContainer: Phaser.GameObjects.DOMElement;

    constructor ()
    {
        super('DomScene');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameText = this.add.text(512, 30, 'Figure out who done it', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 12, align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.searchContainer = this.add.dom(200, 100).createFromHTML(
            "<div id='searchResults'></div>"
        ).setOrigin(0)

        createApp(DomDeduction).mount('#searchResults');

        EventBus.emit('current-scene-ready', this);
    }

    changeScene (scene: string | undefined)
    {
        if (scene) {
            this.scene.start(scene);
        } else {
            this.scene.start("GameOver")
        }
    }
}