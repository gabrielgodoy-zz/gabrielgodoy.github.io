//=========================================================================
// minimalist DOM helpers
//=========================================================================
'use strict';


var Dom = {

  get: function (id) {
    return ((id instanceof HTMLElement) || (id === document)) ? id : document.getElementById(id);
  },
  set: function (id, html) {
    Dom.get(id).innerHTML = html;
  },
  on: function (ele, type, fn, capture) {
    Dom.get(ele).addEventListener(type, fn, capture);
  },
  un: function (ele, type, fn, capture) {
    Dom.get(ele).removeEventListener(type, fn, capture);
  },
  show: function (ele, type) {
    Dom.get(ele).style.display = (type || 'block');
  },
  blur: function (ev) {
    ev.target.blur();
  },

  addClassName: function (ele, name) {
    Dom.toggleClassName(ele, name, true);
  },
  removeClassName: function (ele, name) {
    Dom.toggleClassName(ele, name, false);
  },
  toggleClassName: function (ele, name, on) {
    ele = Dom.get(ele);
    var classes = ele.className.split(' ');
    var n = classes.indexOf(name);
    on = (typeof on === 'undefined') ? (n < 0) : on;
    if (on && (n < 0))
    classes.push(name);
    else if (!on && (n >= 0))
    classes.splice(n, 1);
    ele.className = classes.join(' ');
  },

  storage: window.localStorage || {}

};


//=========================================================================
// general purpose helpers (mostly math)
//=========================================================================

var Util = {

  timestamp: function () {
    return new Date().getTime();
  },
  toInt: function (obj, def) {
    if (obj !== null) {
      var x = parseInt(obj, 10);
      if (!isNaN(x)) return x;
    }
    return Util.toInt(def, 0);
  },
  toFloat: function (obj, def) {
    if (obj !== null) {
      var x = parseFloat(obj);
      if (!isNaN(x)) return x;
    }
    return Util.toFloat(def, 0.0);
  },
  limit: function (value, min, max) {
    return Math.max(min, Math.min(value, max));
  },
  randomInt: function (min, max) {
    return Math.round(Util.interpolate(min, max, Math.random()));
  },
  randomChoice: function (options) {
    return options[Util.randomInt(0, options.length - 1)];
  },
  percentRemaining: function (n, total) {
    return (n % total) / total;
  },
  accelerate: function (v, accel, dt) {
    return v + (accel * dt);
  },
  interpolate: function (a, b, percent) {
    return a + (b - a) * percent;
  },
  easeIn: function (a, b, percent) {
    return a + (b - a) * Math.pow(percent, 2);
  },
  easeOut: function (a, b, percent) {
    return a + (b - a) * (1 - Math.pow(1 - percent, 2));
  },
  easeInOut: function (a, b, percent) {
    return a + (b - a) * ((-Math.cos(percent * Math.PI) / 2) + 0.5);
  },
  exponentialFog: function (distance, density) {
    return 1 / (Math.pow(Math.E, (distance * distance * density)));
  },

  increase: function (start, increment, max) { // with looping
    var result = start + increment;
    while (result >= max)
    result -= max;
    while (result < 0)
    result += max;
    return result;
  },

  project: function (p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {
    p.camera.x = (p.world.x || 0) - cameraX;
    p.camera.y = (p.world.y || 0) - cameraY;
    p.camera.z = (p.world.z || 0) - cameraZ;
    p.screen.scale = cameraDepth / p.camera.z;
    p.screen.x = Math.round((width / 2) + (p.screen.scale * p.camera.x * width / 2));
    p.screen.y = Math.round((height / 2) - (p.screen.scale * p.camera.y * height / 2));
    p.screen.w = Math.round((p.screen.scale * roadWidth * width / 2));
  },

  overlap: function (x1, w1, x2, w2, percent) {
    var half = (percent || 1) / 2;
    var min1 = x1 - (w1 * half);
    var max1 = x1 + (w1 * half);
    var min2 = x2 - (w2 * half);
    var max2 = x2 + (w2 * half);
    return !((max1 < min2) || (min1 > max2));
  },

};

//=========================================================================
// POLYFILL for requestAnimationFrame
//=========================================================================

if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}
//=========================================================================
// GAME LOOP helpers
//=========================================================================
var KEY, COLORS, BACKGROUND, SPRITES;
var Game = { // a modified version of the game loop from my previous boulderdash game - see http://codeincomplete.com/posts/2011/10/25/javascript_boulderdash/#gameloop

  run: function (options) {

    Game.loadImages(options.images, function (images) {

      options.ready(images); // tell caller to initialize itself because images are loaded and we're ready to rumble

      Game.setKeyListener(options.keys);

      var canvas = options.canvas, // canvas render target is provided by caller
      update = options.update, // method to update game logic is provided by caller
      render = options.render, // method to render the game is provided by caller
      step = options.step, // fixed frame step (1/fps) is specified by caller
      now = null,
      last = Util.timestamp(),
      dt = 0,
      gdt = 0;

      function frame() {
        now = Util.timestamp();
        dt = Math.min(1, (now - last) / 1000); // using requestAnimationFrame have to be able to handle large delta's caused when it 'hibernates' in a background or non-visible tab
        gdt = gdt + dt;
        while (gdt > step) {
          gdt = gdt - step;
          update(step);
        }
        render();
        last = now;
        requestAnimationFrame(frame, canvas);
      }
      frame(); // lets get this party started
    });
  },

  //---------------------------------------------------------------------------

  loadImages: function (names, callback) { // load multiple images and callback when ALL images have loaded
    var result = [];
    var count = names.length;

    var onload = function () {
      if (--count === 0)
      callback(result);
    };

    for (var n = 0; n < names.length; n++) {
      var name = names[n];
      result[n] = document.createElement('img');
      Dom.on(result[n], 'load', onload);
      result[n].src = 'images/' + name + '.png';
    }
  },

  //---------------------------------------------------------------------------

  setKeyListener: function (keys) {
    var onkey = function (keyCode, mode) {
      var n, k;
      for (n = 0; n < keys.length; n++) {
        k = keys[n];
        k.mode = k.mode || 'up';
        if ((k.key === keyCode) || (k.keys && (k.keys.indexOf(keyCode) >= 0))) {
          if (k.mode === mode) {
            k.action.call();
          }
        }
      }
    };
    Dom.on(document, 'keydown', function (ev) {
      onkey(ev.keyCode, 'down');
      ev.preventDefault(ev);
    });
    Dom.on(document, 'keyup', function (ev) {
      onkey(ev.keyCode, 'up');
      ev.preventDefault(ev);
    });
  }

};

//=========================================================================
// canvas rendering helpers
//=========================================================================

var Render = {

  polygon: function (ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  },

  //---------------------------------------------------------------------------

  segment: function (ctx, width, lanes, x1, y1, w1, x2, y2, w2, fog, color) {

    var r1 = Render.rumbleWidth(w1, lanes),
    r2 = Render.rumbleWidth(w2, lanes),
    l1 = Render.laneMarkerWidth(w1, lanes),
    l2 = Render.laneMarkerWidth(w2, lanes),
    lanew1, lanew2, lanex1, lanex2, lane;

    ctx.fillStyle = color.grass;
    ctx.fillRect(0, y2, width, y1 - y2);

    Render.polygon(ctx, x1 - w1 - r1, y1, x1 - w1, y1, x2 - w2, y2, x2 - w2 - r2, y2, color.rumble);
    Render.polygon(ctx, x1 + w1 + r1, y1, x1 + w1, y1, x2 + w2, y2, x2 + w2 + r2, y2, color.rumble);
    Render.polygon(ctx, x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2, color.road);

    if (color.lane) {
      lanew1 = w1 * 2 / lanes;
      lanew2 = w2 * 2 / lanes;
      lanex1 = x1 - w1 + lanew1;
      lanex2 = x2 - w2 + lanew2;
      for (lane = 1; lane < lanes; lanex1 += lanew1, lanex2 += lanew2, lane++)
      Render.polygon(ctx, lanex1 - l1 / 2, y1, lanex1 + l1 / 2, y1, lanex2 + l2 / 2, y2, lanex2 - l2 / 2, y2, color.lane);
    }

    Render.fog(ctx, 0, y1, width, y2 - y1, fog);
  },

  //---------------------------------------------------------------------------

  background: function (ctx, background, width, height, layer, rotation, offset) {

    rotation = rotation || 0;
    offset = offset || 0;

    var imageW = layer.w / 2;
    var imageH = layer.h;

    var sourceX = layer.x + Math.floor(layer.w * rotation);
    var sourceY = layer.y;
    var sourceW = Math.min(imageW, layer.x + layer.w - sourceX);
    var sourceH = imageH;

    var destX = 0;
    var destY = offset;
    var destW = Math.floor(width * (sourceW / imageW));
    var destH = height;

    ctx.drawImage(background, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
    if (sourceW < imageW)
    ctx.drawImage(background, layer.x, sourceY, imageW - sourceW, sourceH, destW - 1, destY, width - destW, destH);
  },

  //---------------------------------------------------------------------------

  sprite: function (ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY, offsetX, offsetY, clipY) {

    //  scale for projection AND relative to roadWidth (for tweakUI)
    var destW = (sprite.w * scale * width / 2) * (SPRITES.SCALE * roadWidth);
    var destH = (sprite.h * scale * width / 2) * (SPRITES.SCALE * roadWidth);

    destX = destX + (destW * (offsetX || 0));
    destY = destY + (destH * (offsetY || 0));

    var clipH = clipY ? Math.max(0, destY + destH - clipY) : 0;
    if (clipH < destH)
    ctx.drawImage(sprites, sprite.x, sprite.y, sprite.w, sprite.h - (sprite.h * clipH / destH), destX, destY, destW, destH - clipH);

  },

  chess: function (ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY, offsetX, offsetY, clipY) {

    //  scale for projection AND relative to roadWidth (for tweakUI)
    var destW = (sprite.w * scale * width / 2) * (SPRITES.SCALE * roadWidth);
    var destH = (sprite.h * scale * width / 2) * (SPRITES.SCALE * roadWidth);

    destX = destX + (destW * (offsetX || 0));
    destY = destY + (destH * (offsetY || 0));

    var clipH = clipY ? Math.max(0, destY + destH - clipY) : 0;
    if (clipH < destH)
    ctx.drawImage(sprites, sprite.x, sprite.y, sprite.w, sprite.h - (sprite.h * clipH / destH), destX, destY, destW, destH - clipH);

  },

  //---------------------------------------------------------------------------

  player: function (ctx, width, height, resolution, roadWidth, sprites, speedPercent, scale, destX, destY, steer, updown) {

    var bounce = (1.5 * Math.random() * speedPercent * resolution) * Util.randomChoice([-1, 1]);
    var sprite;
    if (steer < 0)
    sprite = (updown > 0) ? SPRITES.PLAYER_UPHILL_LEFT : SPRITES.PLAYER_LEFT;
    else if (steer > 0)
    sprite = (updown > 0) ? SPRITES.PLAYER_UPHILL_RIGHT : SPRITES.PLAYER_RIGHT;
    else
    sprite = (updown > 0) ? SPRITES.PLAYER_UPHILL_STRAIGHT : SPRITES.PLAYER_STRAIGHT;

    Render.sprite(ctx, width, height, resolution, roadWidth, sprites, sprite, scale, destX, destY + bounce, -0.5, -1);
  },

  //---------------------------------------------------------------------------

  fog: function (ctx, x, y, width, height, fog) {
    if (fog < 1) {
      ctx.globalAlpha = (1 - fog);
      ctx.fillStyle = COLORS.FOG;
      ctx.fillRect(x, y, width, height);
      ctx.globalAlpha = 1;
    }
  },

  rumbleWidth: function (projectedRoadWidth, lanes) {
    return projectedRoadWidth / Math.max(6, 2 * lanes);
  },
  laneMarkerWidth: function (projectedRoadWidth, lanes) {
    return projectedRoadWidth / Math.max(32, 8 * lanes);
  }

};

//=============================================================================
// RACING GAME CONSTANTS
//=============================================================================

KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  A: 65,
  D: 68,
  S: 83,
  W: 87
};

COLORS = {
  SKY: '#72D7EE',
  TREE: '#005108',
  FOG: '#222',
  LIGHT: {
    road: '#6B6B6B',
    grass: '#363636',
    rumble: '#555555',
    lane: '#CCCCCC'
  },
  DARK: {
    road: '#696969',
    grass: '#262626',
    rumble: '#BBBBBB'
  },
  START: {
    road: 'white',
    grass: 'white',
    rumble: 'white'
  },
  FINISH: {
    road: '#6B6B6B',
    grass: '#363636',
    rumble: '#555555'
  }
};

BACKGROUND = {
  BUILDINGS: {
    x: 5,
    y: 5,
    w: 1290,
    h: 485
  },
  SKY: {
    x: 10,
    y: 500,
    w: 1280,
    h: 481
  }
};

SPRITES = {
  CHESS:                  { x:    5, y:    5, w:  672, h:   50 },
  GARFO:                  { x:    5, y:   65, w:  103, h:  352 },
  PARKEDTRUCK_LEFT1:      { x:  118, y:   65, w:  340, h:  249 },
  PARKEDTRUCK_LEFT2:      { x:    5, y:  427, w:  340, h:  249 },
  PARKEDTRUCK_RIGHT1:     { x:  687, y:    5, w:  340, h:  249 },
  PARKEDTRUCK_RIGHT2:     { x:  687, y:  264, w:  340, h:  249 },
  PLACA04:                { x:    5, y:  686, w:  340, h:  226 },
  PLACA09:                { x:  355, y:  686, w:  340, h:  226 },
  PLACA08:                { x: 1037, y:    5, w:  340, h:  226 },
  PLACA07:                { x: 1037, y:  241, w:  340, h:  226 },
  PLACA06:                { x: 1037, y:  477, w:  340, h:  226 },
  PLACA01:                { x:    5, y:  922, w:  340, h:  226 },
  PLACA02:                { x:  355, y:  922, w:  340, h:  226 },
  PLACA05:                { x:  705, y:  922, w:  340, h:  226 },
  PLACA03:                { x: 1387, y:    5, w:  340, h:  226 },
  MUSTARD:                { x: 1387, y:  241, w:   36, h:  138 },
  PLAYER_UPHILL_RIGHT:    { x: 1433, y:  241, w:  104, h:  105 },
  PLAYER_LEFT:            { x: 1547, y:  241, w:  104, h:  105 },
  PLAYER_UPHILL_LEFT:     { x: 1387, y:  389, w:  104, h:  105 },
  PLAYER_RIGHT:           { x: 1501, y:  389, w:  104, h:  105 },
  TRUCK1:                 { x: 1615, y:  389, w:   94, h:  104 },
  PLAYER_UPHILL_STRAIGHT: { x: 1387, y:  504, w:   85, h:  100 },
  PLAYER_STRAIGHT:        { x: 1482, y:  504, w:   85, h:  100 },
  TRUCK:                  { x: 1577, y:  504, w:   97, h:   92 },
  CAR04:                  { x: 1387, y:  614, w:   91, h:   74 },
  CAR03:                  { x: 1488, y:  614, w:   91, h:   61 },
  CAR02:                  { x: 1387, y:  698, w:   88, h:   70 },
  CAR01:                  { x: 1387, y:  778, w:   80, h:   72 }
};

SPRITES.SCALE = 0.3 * (1 / SPRITES.PLAYER_STRAIGHT.w); // the reference sprite width should be 1/3rd the (half-)roadWidth
SPRITES.PLACAS = [SPRITES.PLACA01, SPRITES.PLACA02, SPRITES.PLACA03, SPRITES.PLACA04, SPRITES.PLACA05, SPRITES.PLACA06, SPRITES.PLACA07, SPRITES.PLACA08, SPRITES.PLACA09];
SPRITES.CARS = [SPRITES.CAR01, SPRITES.CAR02, SPRITES.CAR03, SPRITES.CAR04, SPRITES.TRUCK, SPRITES.TRUCK1];
SPRITES.OBSTACLES = [SPRITES.MUSTARD];
SPRITES.TALHERES = [SPRITES.GARFO];
