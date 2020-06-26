

function bind(){
  Bindery.makeBook({
    content: '#content',
    pageSetup: {
      size: { width: '14.8cm', height: '21cm' },
      margin: { 
        top:    '1cm', 
        inner:  '1cm', 
        outer:  '1cm', 
        bottom: '2cm' 
      },
    },
    printSetup: {
      layout: Bindery.Layout.SPREADS,
      paper: Bindery.Paper.AUTO,
      marks: Bindery.Marks.NONE,
      bleed: '0pt',
    },
    
    rules: [
      Bindery.PageBreak({ selector: 'header', position: 'before' }),
      Bindery.PageBreak({ selector: '.cover-2', position: 'after' }),
      Bindery.PageBreak({ selector: '#meta', position: 'before' }),
      Bindery.FullBleedPage({ selector: 'header' }),
      Bindery.RunningHeader({
        render: (page) => {
          if(page.number != 1){
            if (page.isLeft) return `${page.number}`;
            else if (page.isRight) return `${page.number}`;
          } else {
            return ""
          }
        },
      }),
    ],
  });
  
 

}


// if(document.body.classList.contains('layout-mode')){
//   prepareCss();
// }


var bind_button = document.querySelector('#bind-button');
var print_button = document.querySelector('#print-button');

function prepareCss(){
  // switch book css media attributes
  var screen_css = document.querySelector('[media="screen"]');
  var bind_css = document.querySelector('[media="bind"]');
  if(screen_css) screen_css.parentElement.removeChild(screen_css);
  if(bind_css) bind_css.removeAttribute('media');
}

bind_button.addEventListener('click', function(){
  // display tuto
  document.querySelector('#tuto').classList.add('visible');
  //document.querySelector('#tuto').style.display = "block";
  
  // set bindery css
  prepareCss();

  // start bindery
  bind();

  // enable le bouton print
  setTimeout(function(){    
    print_button.removeAttribute("disabled");
  }, 1000)

})


print_button.addEventListener('click', function(){
  //document.body.classList.add('bindery-mode');
  //document.querySelector('#tuto').style.display = "none";
  setTimeout(function(){
    window.print();
  }, 1000)
})