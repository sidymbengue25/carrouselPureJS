/**
 * Elle permet de définir un carrousel sur l'élément avec des paramétre optionelles
 * @param {HTMLElement} element     c'est l'élément sur qui on veut définir notre carrousel
 * @param {number} nbrItemVisible     c'est le nombre d'item qu'on veut rendre visible par défaut
 * @param {number} nbrElemtToSlide    c'est le nombre d'item à slider en même temps si on clique sur prev ou next
 * @param {boolean} loop            Si on veut boucler ou pas
 */
function Carrousel(element,nbrItemVisible,nbrElemtToSlide,loop){
  if(nbrItemVisible===undefined||nbrItemVisible==''){
    nbrItemVisible=3;
  }
  if(nbrElemtToSlide===undefined){
    nbrElemtToSlide=1;
  }
  if(loop===undefined){
    loop=false;
  }
  this.root=element;
  this.nbrItemVisible=nbrItemVisible;
  this.currentItem=0;
  this.loop=loop;
  this.nbrElemtToSlide=nbrElemtToSlide;
  this.container=this.root.firstElementChild;
  this.children=[].slice.call(this.container.children);
  this.nbrChildren=this.children.length;
  this.ratio=this.nbrChildren/this.nbrItemVisible;
  /**
   * Partie style définition des width,...
   */
  setWidth(this.container,this.ratio*100);
  //Chaque enfant de container doit prendre 1/3 de ce qui est dispo
  let childEq=(100/this.nbrItemVisible)/this.ratio;
  this.children.forEach(function(child){
    setWidth(child,childEq);
  });
  /**
   * Partie création des 2 boutons de navigation
   */
  this.prevButton=createNavigation('prevButton',this.root);
  this.prevButton.innerHTML='Prev';
  this.nextButton=createNavigation('nextButton',this.root);
  this.nextButton.innerHTML='Next';
  /**
   * Ajout de événement de prev et next
   */
  this.prevButton.addEventListener('click',prev.bind(this),false);
  this.nextButton.addEventListener('click',next.bind(this),false);
  /**
   * On vérifie si on veut boucler si oui on cache par défaut le boutton prev
   * @param  {boolean} this.loop si on veut boucler ou pas
   */
  if(this.loop===true){
    this.prevButton.classList.add('prevNavigationHidden');
  }

  /**
   * Elle sert à définir les styles
   * @param {htmlEment} elem
   * @param {number} equation elle va se baser sur le résultat de ce paramétre pour définir le width
   */
  function setWidth(elem,equation){
    elem.style.width=equation+"%";
  }
  /**
   * Elle permet de créer les boutons de navigation
   * @param  {string} id     c'est le nom qu'elle va mettre sur l'attribut id
   * @param  {HTMLElement} parent l'élément HTML qui doit contenir le bouton
   * @return {HTMLElement}    le bouton créé
   */
  function createNavigation(id,parent){
    let navButton=document.createElement('button');
    navButton.setAttribute('class','navCarrousel');
    navButton.setAttribute('id',id);
    parent.appendChild(navButton);
    return navButton;
  }
  /**
   * Elle permet d'aller au suivant
   * @return {Function} elle retourne rien
   */
  var self=this;
  function next(){
    gotoItem(self.currentItem+self.nbrElemtToSlide);
  }
  function prev(){
    gotoItem(self.currentItem-self.nbrElemtToSlide);
  }
  /**
   * Elle permet d'aller à  un item
   * @param  {number} index
   */
  function gotoItem(index){
    if(index<0){
      index=self.nbrChildren-self.nbrItemVisible;
    }else if(index>=self.nbrChildren||(self.children[self.currentItem+self.nbrItemVisible]===undefined)&&index>self.currentItem){
      index=0;
    }
    let translateX=index*-100/self.nbrChildren;
    self.container.style.transform='translate3d('+translateX+'%,0,0)';
    self.currentItem=index;
    if(self.loop==false){
      return;
    }
    if(index===0){
      this.prevButton.classList.add('prevNavigationHidden');
    }else{
      this.prevButton.classList.remove('prevNavigationHidden');
    }
    if(self.children[self.currentItem+self.nbrItemVisible]===undefined){
      this.nextButton.classList.add('nextNavigationHidden');
    }else{
      this.nextButton.classList.remove('nextNavigationHidden');
    }
  }
}
document.addEventListener('DOMContentLoaded',function (){
  let carrouselToSet=document.querySelector('#carrousel');
  var myCarrousel=new Carrousel(carrouselToSet,3,1,false);
});
