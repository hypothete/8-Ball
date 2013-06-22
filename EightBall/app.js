//initial setup of scene qualities
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1/1, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(400,400);
var ndoe = document.getElementById("ball").appendChild(renderer.domElement);
ndoe.setAttribute("id", "icosahedron");

//for controls
var xrot = 0.00;
var yrot = 0.00;
var it = 0;
var origin = new THREE.Vector3(0, 0, 0);
var ico;

var messages = [
    "try again",
    "yes",
    "no",
    "wait for the DNS to propagate"
];

//make shapes
var loader = new THREE.ColladaLoader();
loader.load( 'icosahedron.dae', function ( collada ) {
 
    // Grab the collada scene data:
    ico = collada.scene;
 
    // No skin applied to my model so no need for the following:
    // var skin = collada.skins[ 0 ];
 
    // Scale-up the model so that we can see it:
    ico.scale.x = ico.scale.y = ico.scale.z = 2.0;
    ico.rotation.y = 3*Math.PI/6;
    ico.rotation.z = -Math.PI/6;
 
    // Initialise and then animate the 3D scene
    // since we have now successfully loaded the model:
    scene.add(ico);
    init();
  });



//var geometry = new THREE.SphereGeometry(magicnumber, magicnumber, 0, 30,1, false);
//var material = new THREE.MeshLambertMaterial({color: 0x00ff00});


function init(){
    //set camera position and direction
    console.log('loaded');
    camera.position.z = 20;
    camera.position.y = 0;
    camera.lookAt(origin);
    
    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);
    scene.add(pointLight);
    pointLight.position.z = 50;
    $("#textarea").hide();
    render();
}

$("#ball").on("click", function(){
    if($("#textarea").css("display") === "none"){
        $("#textarea").text(messages[Math.round(Math.random()*(messages.length-1))]);
    }
    $("#textarea").fadeToggle("slow", "linear");
})

//////////////////////////////////////////

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    ico.rotation.x += xrot;
    ico.rotation.y += yrot;
}

//controls ///////////////////////////////////////////////////////////////////////////
/*

renderer.domElement.addEventListener("mousemove", function (evt) {
    if (evt.pageY - renderer.domElement.offsetTop < renderer.domElement.height / 3) {
        xrot = -.03;
    } else if (evt.pageY - renderer.domElement.offsetTop > 2 * renderer.domElement.height / 3) {
        xrot = .03;
    } else {
        xrot = 0;
    }
    if (evt.pageX - renderer.domElement.offsetLeft < renderer.domElement.width / 3) {
        yrot = .03;
    } else if (evt.pageX - renderer.domElement.offsetLeft > 2 * renderer.domElement.width / 3) {
        yrot = -.03;
    } else {
        yrot = 0;
    }
    camera.lookAt(origin);
}, false);

document.addEventListener("mouseout", function (evt) {
    xrot = 0;
    yrot = 0;
    camera.lookAt(origin);
}, false);
*/

