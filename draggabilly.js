//Create the grid.
var grid = document.querySelector(".grid");
var pckry = new Packery( '.grid', {
  itemSelector: '.grid-item',
  columnWidth: 415,
  rowHeight: 265
});

//Adds the resize and close buttons to the ribbon of each tile.
addButton(document.getElementsByClassName('ribbon'), 'closeButton', ShowHide);
addResizeButton('resizeButton', Resize);

//Shifts the grid, so there are no weird gaps.
setInterval(function() {
  pckry.shiftLayout()
}, 500);

//Makes each tile draggable.
pckry.getItemElements().forEach( function( itemElem ) {
  var draggie = new Draggabilly( itemElem );
  pckry.bindDraggabillyEvents( draggie );
});
grid.addEventListener( 'click', makeDraggable);

//Makes the tile draggable onclick.
function makeDraggable( event ) {
    pckry.getItemElements().forEach( function( itemElem ) {
      var draggie = new Draggabilly( itemElem );
      pckry.bindDraggabillyEvents( draggie );
    });
}

//Adds the size buttons and the resize button to the ribbon of each tile.
function addResizeButton(name, Resize){
  addReButton(document.getElementsByClassName('ribbon'));
  addButton(document.getElementsByClassName('ribbon'), name, Resize);
}

//Adds the size buttons to each tile.
function addReButton(x){
  for(var i = 0; i < x.length; i++) {
    addSizeButtons(x[i]);
  }
}

//Adds small, medium, and large size buttons to resize the tile.
function addSizeButtons(x){
  var popup = document.createElement('popup');
  popup.type = 'button';
  popup.classList.add('hoverPopup');

  var small = document.createElement('button');
  small.classList.add('smallButton');
  small.type = 'input';
  small.onclick = SmallButton;
  small.innerHTML+= 'Small';
  popup.appendChild(small);

  var medium = document.createElement('button');
  medium.classList.add('mediumButton');
  medium.type = 'input';
  medium.onclick = MediumButton;
  medium.innerHTML+= 'Medium';
  popup.appendChild(medium);

  var large = document.createElement('button');
  large.classList.add('largeButton');
  large.type = 'input';
  large.onclick = LargeButton;
  large.innerHTML+= 'Large';
  popup.appendChild(large);

  popup.style.display = 'none';
  x.parentElement.appendChild(popup);

}

//Changes the tile from it's current size to the small size.
function SmallButton() {
  x = this.parentElement.parentElement;
  if(x.classList.contains('grid-item-small')){
  } else if (x.classList.contains('grid-item-medium')) {
    x.classList.add('grid-item-small');
    x.classList.remove('grid-item-medium');
    pckry.fit( x );

  } else if (x.classList.contains('grid-item-large')){
    x.classList.add('grid-item-small');
    x.classList.remove('grid-item-large');
    pckry.fit( x );

  }else{
    x.classList.add('grid-item-small');
    x.classList.remove('grid-item-2x1');
    pckry.fit( x );
  }
  pckry.shiftLayout();
  var popup = this.parentElement;
  if (popup.style.display === "none") {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
  popup.click();
  pckry.layout()

}

//Changes the tile from it's current size to the medium size.
function MediumButton() {
  x = this.parentElement.parentElement;
  if(x.classList.contains('grid-item-medium')){
  } else if (x.classList.contains('grid-item-small')) {
    x.classList.add('grid-item-medium');
    x.classList.remove('grid-item-small');
    pckry.fit( x );

  } else if (x.classList.contains('grid-item-large')){
    x.classList.add('grid-item-medium');
    x.classList.remove('grid-item-large');
    pckry.fit( x );

  } else{
    x.classList.add('grid-item-medium');
    x.classList.remove('grid-item-2x1');
    pckry.fit( x );
  }
  pckry.shiftLayout();

  var popup = this.parentElement;
  if (popup.style.display === "none") {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
  popup.click();
  pckry.layout()

}

//Changes the tile from it's current size to the large size.
function LargeButton() {
  x = this.parentElement.parentElement;
  if(x.classList.contains('grid-item-large')){
  } else if (x.classList.contains('grid-item-medium')) {
    x.classList.add('grid-item-large');
    x.classList.remove('grid-item-medium');
    pckry.fit( x );
  } else if (x.classList.contains('grid-item-small')){
    x.classList.add('grid-item-large');
    x.classList.remove('grid-item-small');
    pckry.fit( x );

  }else{
    x.classList.add('grid-item-large');
    x.classList.remove('grid-item-2x1');
    pckry.fit( x );
  }
  pckry.shiftLayout();

  var popup = this.parentElement;
  if (popup.style.display === "none") {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
  popup.click();
  pckry.layout()

}

//Adds a button to every element of the list.
function addButton(x, name, func){
  for(var i = 0; i < x.length; i++) {
    add(x[i], name, func);
  }
}

//Adds a button to an element.
function add(x, name, func){
  var element = document.createElement("button");
  element.type = 'button'
  element.classList.add(name);

  if(func == ShowHide){
    if(x.parentElement.id) {
      element.onclick = function() {
        id = this.parentElement.parentElement.id.substr(0, this.parentElement.parentElement.id.length - 4);
      document.getElementById(id + 'Toggle').checked = !document.getElementById(id + 'Toggle').checked;
      ShowHide(this.parentElement.parentElement.id);
    }
  }
  } else{
    element.onclick = func;
  }
  x.appendChild(element);
}

//Displays the size buttons for a tile.
function Resize() {
  var x = this.parentElement.parentElement.children;
  for(var i = 0; i < x.length; i++){
    if(x[i].className === 'hoverPopup') {
      if (x[i].style.display == "none") {
        x[i].style.display = "block";
      } else {
        x[i].style.display = "none";
      }
    }
  }
}

//Deletes the tile from the grid.
function Remove() {
  pckry.remove( this.parentElement.parentElement );
  pckry.shiftLayout();

};
