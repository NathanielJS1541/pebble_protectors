import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    doms_label: GameObjects.Text;
    kittys_label: GameObjects.Text;
    aedans_label: GameObjects.Text;
    nikas_label: GameObjects.Text;
    nats_label: GameObjects.Text;
    alecs_label: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(512, 384, 'island');

        this.logo = this.add.image(155, 60, 'logo').setDepth(100).setScale(0.5, 0.5);

        const text_params = {
            fontFamily: 'Arial Black', fontSize: 26, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }

        this.doms_label = this.add.text(220, 380, "Dom's Scene", text_params)
            .setOrigin(0.5).setDepth(100).setInteractive()
            .on("pointerdown", () => this.changeScene("DomScene"))

        this.kittys_label = this.add.text(440, 295, "Kitty's Scene", text_params)
            .setOrigin(0.5).setDepth(100).setInteractive()
            .on("pointerdown", () => this.changeScene("KittyScene"))

        this.aedans_label = this.add.text(730, 245, "Aedan's Scene", text_params)
            .setOrigin(0.5).setDepth(100).setInteractive()
            .on("pointerdown", () => this.changeScene("AedanScene"))

        this.nikas_label = this.add.text(610, 450, "Nika's Scene", text_params)
            .setOrigin(0.5).setDepth(100).setInteractive()
            .on("pointerdown", () => this.changeScene("NikaScene"))

        this.nats_label = this.add.text(420, 565, "Nat's Scene", text_params)
            .setOrigin(0.5).setDepth(100).setInteractive()
            .on("pointerdown", () => this.changeScene("NatScene"))

        this.alecs_label = this.add.text(770, 625, "Alec's Scene", text_params)
            .setOrigin(0.5).setDepth(100).setInteractive()
            .on("pointerdown", () => this.changeScene("AlecScene"))

        EventBus.emit('current-scene-ready', this);
    }

    changeScene(scene: string) {
        console.log("Scene", scene)
        if (this.logoTween) {
            this.logoTween.stop();
            this.logoTween = null;
        }

        if (scene) {
            this.scene.start(scene);
        } else {
            this.scene.start('Game');
        }
    }

    moveLogo(vueCallback: ({ x, y }: { x: number, y: number }) => void) {
        if (this.logoTween) {
            if (this.logoTween.isPlaying()) {
                this.logoTween.pause();
            }
            else {
                this.logoTween.play();
            }
        }
        else {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (vueCallback) {
                        vueCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}