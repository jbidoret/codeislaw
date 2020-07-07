

function bind(){
  Bindery.makeBook({
    content: '.content',
    pageSetup: {
      size: { width: '14.8cm', height: '20cm' },
      margin: { 
        top:    '1cm', 
        inner:  '1cm', 
        outer:  '2cm', 
        bottom: '1.5cm' 
      },
    },
    printSetup: {
      layout: Bindery.Layout.SPREADS,
      paper: Bindery.Paper.AUTO_BLEED,
      marks: Bindery.Marks.NONE,
      bleed: '0pt'
    },
    pageNumberOffset: -3,
    
    rules: [
      Bindery.PageBreak({ selector: '.cover-2', position: 'after' }),
      // Bindery.PageBreak({ selector: '.breakafter', position: 'after' }),
      // Bindery.PageBreak({ selector: '.breakbefore', position: 'before' }),
      Bindery.PageBreak({ selector: '.cover-4', position: 'after' }),
      Bindery.PageBreak({ selector: '.cover-1', position: 'after' }),
      Bindery.FullBleedPage({ selector: '.cover-1' }),
      Bindery.RunningHeader({
        render: (page) => {
          if (page.isEmpty || page.number < 1) return '';
          if (page.isLeft) return `${page.number}`;
          if (page.isRight) return `${page.number}`;
        },
      }),
    ],
  });
  
 

}



var bind_button = document.querySelector('#bind-button');
var print_button = document.querySelector('#print-button');
var tuto = document.querySelector('#tuto');

function prepareCss(){
  // switch book css href
  var css = document.querySelector('#bind_css');
  if(css) {
    css.href = css.getAttribute('data-bind');
  }
}


if(document.body.classList.contains('layout-mode')){
  prepareCss();
  setTimeout(function(){    
    bind();
  }, 1000)  
}



bind_button.addEventListener('click', function(){
  // display tuto
  tuto.classList.add('visible');
  document.querySelector('#tuto').style.display = "block";
  
  // set bindery css
  prepareCss();

  // start bindery
  bind();
  
  // enable le bouton print on bindery ready
  window.requestAnimationFrame(checkBinderyReady);

})

function checkBinderyReady(){
  var bar  = document.querySelector(".📖-progress-bar");
  if(bar.style.transform !=""){
    window.requestAnimationFrame(checkBinderyReady);
  } else {
    print_button.removeAttribute("disabled");
  }
}


print_button.addEventListener('click', function(){
  document.body.classList.add('print-mode');
  window.print();
})