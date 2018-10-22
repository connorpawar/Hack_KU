<!-- Initially hides the side menu. -->
document.getElementById('sideMenu').style.display = "none";

<!-- Toggles the visibility of the parameter. -->
function ShowHide(y) {
    var x = document.getElementById(y);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    pckry.layout()
}

<!-- Parent function to show and hide an element. -->
function Toggle(x){
  var toggle = document.getElementById(x + 'Toggle');
  var card = document.getElementById(x + 'Card');

  ShowHide(x + 'Card');
}

<!-- Creates a new widget and appends it to the top of the grid. -->
function CreateNewWidget(){
  var form = document.getElementById('CreateNewWidget');
  console.log(form.elements[0].value)
  // prepend elements to container
  var card = getItemElement(form.elements[0].value);
  grid.insertBefore( card, grid.firstChild );
  // add and lay out newly prepended elements
  pckry.prepended( card );
  pckry.layout();
}

<!-- Creates a new grid item with the given URL framed. -->
function getItemElement(url) {
  var card = document.createElement('div');
  // add width and height class
  card.className = 'grid-item grid-item-special';


  var ribbon = document.createElement('div');
  ribbon.className = 'ribbon';

  var frame = document.createElement('iframe');
  frame.src = url;
  frame.height = "95%";

  card.innerHTML+= ribbon.outerHTML;
  card.innerHTML+= frame.outerHTML;

  addSizeButtons(card.children[0]);
  add(card.children[0], 'closeButton', Remove);
  add(card.children[0], 'resizeButton', Resize);

  return card;
}
