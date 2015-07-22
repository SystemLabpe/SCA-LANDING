"use strict";
jQuery(document).ready(function($){
var defaultVideoOptions = {
  controls:true,
  autoplay:false,
  preload:'auto',
  width:'auto',
  height:'auto'
};

var videosArray = [];
var video1 = null, video2 = null;

video1 = videojs('v_prueba_1',defaultVideoOptions, function() {
  this.play();
  this.on('ended', function() {
    video2.play();
  });
  videosArray.push({element:this,ratio:3/4});
});

video2 = videojs('v_prueba_2', defaultVideoOptions, function() {
  this.on('ended', function() {
    video1.play();
  });
  videosArray.push({element:this,ratio:16/9});
});

function resizeVideoJS(){
  for(var video in videosArray){
    var width = document.getElementById(videosArray[video].element.id()).parentElement.offsetWidth-50;
    videosArray[video].element.width(width).height( width * videosArray[video].ratio );
  }
}

resizeVideoJS();
window.onresize = resizeVideoJS;

});
