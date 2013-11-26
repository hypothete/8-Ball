/*global THREE, $, TWEEN*/
'use strict';

//initial setup of scene qualities
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1/1, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(400,400);
var ndoe = document.getElementById('ball').appendChild(renderer.domElement);
ndoe.setAttribute('id', 'icosahedron');

//for controls
var origin = new THREE.Vector3(0, 0, 0);
var ico;

var messages = [
    'check your spam filter for the email',
    'clear your cache',
    'close it and reopen it',
    'wait for the DNS to propagate',
    'I think you hit it during a build',
    'works on my machine...',
    'that wasn\'t in the requirements',
    'that\'s for phase 2'
];

var group = new THREE.Object3D();

var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'shaking.mp3');
    audioElement.setAttribute('loop', 'loop');

//make shapes
var loader = new THREE.ColladaLoader();
loader.load( 'icosahedron.dae', function ( collada ) {
 
    ico = collada.scene;
    ico.scale.x = ico.scale.y = ico.scale.z = 2.0;
    ico.rotation.y = 3*Math.PI/6;
    ico.rotation.z = -Math.PI/6;
    group.add(ico);
    scene.add(group);
    init();
  });

var rotin, rotout, textin, textout; //you'll meet the tweens later

function init(){
    //set camera position and direction
    camera.position.z = 20;
    camera.position.y = 0;
    camera.lookAt(origin);
    
    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);
    scene.add(pointLight);
    pointLight.position.z = 50;
    $('#textarea').css('opacity', 0);


    ////TWEENS, GET OFF MY LAWN
    var rotation = { x : 0, y : 0, z : 0, opacity: 0};
    var target = { x : 0, y : 0, z : 0, zz : -50, opacity: 0};
    var end = { x : 0, y : 2*Math.PI, z : 0, zz: 0, opacity: 1};

    rotin = new TWEEN.Tween(rotation).to(target, 1000);
    rotin.onUpdate(function(){
        group.rotation.x = rotation.x;
        group.rotation.y = rotation.y;
        group.rotation.z = rotation.z;
        group.position.z = rotation.zz;
        $('#icosahedron').css('opacity', rotation.opacity);
    });
    rotin.easing(TWEEN.Easing.Cubic.InOut);

    rotout = new TWEEN.Tween(rotation).to(end, 1000);
    rotout.onUpdate(function(){
        group.rotation.x = rotation.x;
        group.rotation.y = rotation.y;
        group.rotation.z = rotation.z;
        group.position.z = rotation.zz;
        $('#icosahedron').css('opacity', rotation.opacity);
    });
    rotout.easing(TWEEN.Easing.Cubic.InOut);

    var opac = {opacity:0};
    var visible = {opacity:1};
    var invisible = {opacity:0};
    textout = new TWEEN.Tween(opac).to(visible, 500);
    textout.onUpdate(function(){
        $('#textarea').css('opacity', opac.opacity);
    })
    textout.easing(TWEEN.Easing.Cubic.InOut);

    textin = new TWEEN.Tween(opac).to(invisible, 500);
    textin.onUpdate(function(){
        $('#textarea').css('opacity', opac.opacity);
    })
    textin.easing(TWEEN.Easing.Cubic.InOut);

    textin.chain(rotin);
    rotout.chain(textout);
    rotin.start();
    render();
}

var mousepos = 0;
var holding = false;


$('body').on('mousemove', function(e){
    mousepos = e.pageX;
    $('#ball').css('bottom', 300);
});

$('body').on('mousedown', function(){
    holding = true;
    if($('#icosahedron').css('opacity')%1 == 0 && $('#textarea').css('opacity')%1 == 0){
        textin.start();
        audioElement.play();
    }
});

$('body').on('mouseup', function(){
    holding = false;
    if($('#icosahedron').css('opacity')%1 == 0 && $('#textarea').css('opacity')%1 == 0){
        $('#textarea').text(messages[Math.round(Math.random()*(messages.length-1))]);
        rotout.start();
        audioElement.pause();
    }
})

//////////////////////////////////////////

function render() {
    requestAnimationFrame(render);

    if(holding){
        $('#centerer').css('width', mousepos);
    }
    else{
        $('#ball').css('bottom', 150);
    }

    renderer.render(scene, camera);
    TWEEN.update();
 }

