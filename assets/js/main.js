/*
main.js
Setup phaser game and various states
*/
var isMobile=navigator.userAgent.indexOf("Mobile");
var canDrive = true;
window.onload = function() {
    var maxWidth = 960;
    var maxHeight = 960;


    var width = Math.max (document.documentElement.clientWidth, window.innerWidth || 0);
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    // var windowRatio = window.innerWidth / window.innerHeight;
    // if(windowRatio < width / height){
    //      height = width / windowRatio;
    // }

    game = new Phaser.Game(width, height, Phaser.AUTO, "");
    game.state.add('BootStrap', Boot);
    game.state.add('Preloader', Preloader);
    game.state.add('Game', Game);
    game.state.start('BootStrap');



    $('#exampleModal').on('hidden.bs.modal', function (e) {
        // do something...
        canDrive = true;
        Game.instructionText.alpha = 1;
    })
};