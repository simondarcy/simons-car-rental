/*
game.js
The actual game
*/

var Game = {
    init: function () {
        this.bounceAmount = 10;
        this.backgroundSpeed=5;
    },
    preload: function () {},
    create: function () {


        this.createBackground();


        //Prevent music playing over itself
        if(typeof this.backgroundMusic == "undefined"){
                this.backgroundMusic = game.add.audio('music'); //Load music
                this.backgroundMusic.play(); //Play music
        }

        //Load kicking sound
        this.kickAudio = game.add.audio('kick');

        //Create a ball
        this.car = game.add.sprite(game.world.centerX/2, game.world.height-150, 'car');
        //some ball attributes
        this.car.scale.set(0.5);
        this.car.anchor.set(0.5);

        //Create a ball
        this.head = game.add.sprite(this.car.centerX, this.car.y-130, 'head');
        //some ball attributes
        this.head.scale.set(0.5);
        this.head.anchor.set(0.5);

        //Add some animation to the game logo
        var carTween = game.add.tween(this.car).to({
            y: this.car.y-this.bounceAmount,
        }, 600, "Linear", true, 0, -1);
        carTween.yoyo(true);
        var headTween = game.add.tween(this.head).to({
            y: this.head.y-this.bounceAmount,
        }, 600, "Linear", true, 0, -1);
        headTween.yoyo(true);
        carTween.pause();
        headTween.pause();


        //add some instructions to the bottom of the stage
        let textStyle = { font: "50px Fredoka One" , fill: '#ffffff', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        this.instructionText = game.add.text(game.world.centerX, game.world.height-50, "Tap the explore!", textStyle);
        this.instructionText.anchor.set(0.5);




        game.input.onDown.add(function(pointer) {

            if(!canDrive) {return;}

            carTween.resume();
            headTween.resume();
            this.head.angle=-25;
            this.instructionText.alpha = 0;
        }, this);

        game.input.onUp.add(function(pointer) {
            carTween.pause();
            headTween.pause();
            this.head.angle=0;
            canDrive = false;
            $('#exampleModal').modal('show');

        }, this);



        //GA event
        gtag('event', 'view', {
                'event_category': 'screen',
                'event_label': 'Game',
        });

    },
    update: function () {
        if (game.input.activePointer.isDown) {
            this.backgroundMotion();

        }

    },
    createBackground:function(){


        this.background = game.add.tileSprite(0,
            game.height - game.cache.getImage('background').height,
            game.width,
            game.cache.getImage('background').height,
            'background'
        );

        this.road = game.add.tileSprite(0,
            game.height - game.cache.getImage('road').height,
            game.width,
            game.cache.getImage('road').height,
            'road'
        );
    },
    backgroundMotion:function(){
        this.background.tilePosition.x -= this.backgroundSpeed;
        this.road.tilePosition.x -= this.backgroundSpeed;
    }
};

